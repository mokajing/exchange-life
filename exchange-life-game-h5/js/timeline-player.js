/**
 * Timeline播放器 - 数据驱动的沉浸式体验控制器
 * 管理事件流转、交互选择、进度追踪
 */

const Renderer = require('./renderer');
const TONE_COLORS = Renderer.TONE_COLORS;

class TimelinePlayer {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.timeline = options.timeline;
    this.onChoiceCallback = options.onChoice || (() => {});
    this.onCompleteCallback = options.onComplete || (() => {});

    // 渲染器
    this.renderer = new Renderer(this.ctx, this.width, this.height);

    // 播放状态
    this.currentEventIndex = 0;
    this.state = 'idle'; // idle | safety_prompt | typing | waiting | choosing | feedback | complete
    this.selectedChoice = -1;
    this.choiceFeedbackTimer = 0;
    this.choiceFeedbackDuration = 3; // 秒

    // 安全提示（PRD V2.1 UESL模型）
    this.safetyLevel = (this.timeline.safetyInfo && this.timeline.safetyInfo.complianceLevel) || 'L1';
    this.requiresSafetyPrompt = this.safetyLevel === 'L2' || this.safetyLevel === 'L3' || this.safetyLevel === 'L4';

    // 触摸检测
    this.touchStartY = 0;
    this.touchStartTime = 0;

    // 预计算选项区域（用于点击检测）
    this.choiceRects = [];

    // 防重复定时器
    this._advanceTimer = null;
  }

  /**
   * 开始体验
   */
  start() {
    this.currentEventIndex = 0;
    // PRD V2.1: L2+故事开始前显示心理安全提示
    if (this.requiresSafetyPrompt) {
      this.state = 'safety_prompt';
      this.renderer.setText(this._getSafetyPromptText(), 0.3);
      this.renderer.fadeAlpha = 0;
      this.renderer.fadeTarget = 1;
    } else {
      this._loadEvent(0);
      this.renderer.fadeAlpha = 0;
      this.renderer.fadeTarget = 1;
    }
  }

  /**
   * 获取安全提示文本（PRD V2.1 UESL模型）
   */
  _getSafetyPromptText() {
    const level = this.safetyLevel;
    if (level === 'L3' || level === 'L4') {
      return '⚠️ 本故事涉及较重情感内容。\n\n如果你正在经历类似困境，请确保有亲友陪伴或寻求专业支持。\n\n体验过程中可随时点击退出。\n\n心理援助热线：400-161-9995\n\n准备好后，点击开始体验。';
    }
    // L2
    return '💡 本故事涉及一些情感话题。\n\n如果感到不适，可以随时暂停或退出。\n\n准备好后，点击开始体验。';
  }

  /**
   * 每帧更新
   */
  update(dt) {
    this.renderer.update(dt);

    // 选择反馈倒计时
    if (this.state === 'feedback') {
      this.choiceFeedbackTimer -= dt;
      if (this.choiceFeedbackTimer <= 0) {
        this._advanceToNextEvent();
      }
    }
  }

  /**
   * 每帧渲染
   */
  render() {
    const event = this.timeline.events[this.currentEventIndex];
    if (!event) return;

    const progress = (this.currentEventIndex) / this.timeline.events.length;

    this.renderer.render({
      title: event.title,
      subtitle: this.currentEventIndex === 0 ? this.timeline.meta.subtitle : null,
      choices: this.state === 'choosing' ? this._getChoices(event) : null,
      selectedChoice: this.selectedChoice,
      progress: progress,
      feedbackText: this.state === 'feedback' ? this._getFeedbackText(event) : null
    });

    // 反馈文本覆盖渲染
    if (this.state === 'feedback') {
      this._renderFeedbackOverlay();
    }
  }

  // === 触摸事件处理 ===

  onTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  onTouchMove(e) {
    // 预留：未来支持滑动翻页
  }

  onTouchEnd(e) {
    const touchY = e.changedTouches[0].clientY;
    const dy = Math.abs(touchY - this.touchStartY);
    const dt = Date.now() - this.touchStartTime;

    // 过滤滑动操作（只处理点击）
    if (dy > 30 || dt > 500) return;

    this._handleTap(e.changedTouches[0].clientX, touchY);
  }

  _handleTap(x, y) {
    switch (this.state) {
      case 'safety_prompt':
        // PRD V2.1: 用户确认安全提示后开始体验
        this._loadEvent(0);
        break;

      case 'typing':
        // 点击跳过打字动画
        this.renderer.skipTyping();
        this.state = this._hasChoices() ? 'choosing' : 'waiting';
        break;

      case 'waiting':
        // 点击进入下一事件或选择
        if (this._hasChoices()) {
          this.state = 'choosing';
          this.selectedChoice = -1;
        } else {
          this._advanceToNextEvent();
        }
        break;

      case 'choosing':
        // 检测点击了哪个选项
        const choiceIdx = this._hitTestChoice(x, y);
        if (choiceIdx >= 0) {
          this.selectedChoice = choiceIdx;
          const event = this.timeline.events[this.currentEventIndex];
          this.onChoiceCallback(event.id, choiceIdx);
          
          // 显示反馈文本（保持情感节拍器节奏）
          this.state = 'feedback';
          this.choiceFeedbackTimer = this.choiceFeedbackDuration;
          const feedbackText = this._getFeedbackText(event);
          // 反馈文本使用中等情绪强度0.5，避免过快或过慢
          this.renderer.setText(feedbackText, 0.5);
        }
        break;

      case 'feedback':
        // 点击跳过反馈等待
        this._advanceToNextEvent();
        break;

      case 'complete':
        // 体验结束，可重新开始
        this.start();
        break;
    }
  }

  // === 事件流转逻辑 ===

  _loadEvent(index) {
    if (index >= this.timeline.events.length) {
      this.state = 'complete';
      this.renderer.setText('体验结束。感谢你的陪伴。');
      this.onCompleteCallback();
      return;
    }

    this.currentEventIndex = index;
    const event = this.timeline.events[index];
    
    // 边界检查：确保event有效
    if (!event) {
      console.warn(`[TimelinePlayer] Event at index ${index} is undefined, skipping`);
      this._advanceToNextEvent();
      return;
    }

    // 设置叙事文本和视觉色调
    const narrativeText = event.narrativeText || event.description || '';
    // PRD V2.1情感节拍器：传入情绪强度调节打字速度
    this.renderer.setText(narrativeText, event.emotionIntensity);
    if (event.visualTone) {
      this.renderer.setTone(event.visualTone);
    }

    this.state = 'typing';
    this.selectedChoice = -1;
  }

  _advanceToNextEvent() {
    // 防止重复触发
    if (this._advanceTimer) return;
    
    // 淡出 → 加载下一事件 → 淡入
    this.renderer.fadeTarget = 0;
    this._advanceTimer = setTimeout(() => {
      this._advanceTimer = null;
      this._loadEvent(this.currentEventIndex + 1);
      this.renderer.fadeTarget = 1;
    }, 500);
  }

  _hasChoices() {
    const event = this.timeline.events[this.currentEventIndex];
    return event && event.isKeyNode && event.interactionChoice && event.interactionChoice.options;
  }

  _getChoices(event) {
    if (!event.interactionChoice) return null;
    return event.interactionChoice.options.map(o => ({ label: o.label }));
  }

  _getFeedbackText(event) {
    if (!event.interactionChoice || this.selectedChoice < 0) return '';
    return event.interactionChoice.options[this.selectedChoice].response || '';
  }

  // === 选项点击检测 ===

  _hitTestChoice(x, y) {
    const event = this.timeline.events[this.currentEventIndex];
    if (!event.interactionChoice) return -1;

    const choices = event.interactionChoice.options;
    const choiceH = 60;
    const gap = 16;
    const totalH = choices.length * (choiceH + gap) - gap;
    const startY = this.height - totalH - 80;
    const padding = 30;

    for (let i = 0; i < choices.length; i++) {
      const cy = startY + i * (choiceH + gap);
      if (x >= padding && x <= this.width - padding && y >= cy && y <= cy + choiceH) {
        return i;
      }
    }
    return -1;
  }

  // === 反馈文字叠加渲染 ===

  _renderFeedbackOverlay() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 半透明遮罩
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, w, h);

    // 反馈文字居中
    const colors = TONE_COLORS[this.renderer.targetTone] || TONE_COLORS.neutral;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '22px "PingFang SC", serif';

    const text = this._getFeedbackText(this.timeline.events[this.currentEventIndex]);
    const lines = this._wrapFeedbackText(ctx, text, w - 80);
    const lineHeight = 38;
    const totalTextH = lines.length * lineHeight;
    const startY = (h - totalTextH) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });

    // 提示
    ctx.globalAlpha = 0.5;
    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.fillText('点击继续', w / 2, h - 60);
    ctx.globalAlpha = 1;
  }

  _wrapFeedbackText(ctx, text, maxWidth) {
    // 复用Renderer的_wrapText方法，避免代码重复
    return this.renderer._wrapText(ctx, text, maxWidth);
  }
}

if (typeof module !== 'undefined' && module.exports) { module.exports = TimelinePlayer; } else { window.TimelinePlayer = TimelinePlayer; }

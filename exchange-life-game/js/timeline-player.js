/**
 * Timeline播放器 - 数据驱动的沉浸式体验控制器
 * 管理事件流转、交互选择、进度追踪
 */

const Renderer = require('./renderer');

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
    this.state = 'idle'; // idle | typing | waiting | choosing | feedback | complete
    this.selectedChoice = -1;
    this.choiceFeedbackTimer = 0;
    this.choiceFeedbackDuration = 3; // 秒

    // 触摸检测
    this.touchStartY = 0;
    this.touchStartTime = 0;

    // 预计算选项区域（用于点击检测）
    this.choiceRects = [];
  }

  /**
   * 开始体验
   */
  start() {
    this.currentEventIndex = 0;
    this._loadEvent(0);
    this.renderer.fadeAlpha = 0;
    this.renderer.fadeTarget = 1;
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
          
          // 显示反馈文本
          this.state = 'feedback';
          this.choiceFeedbackTimer = this.choiceFeedbackDuration;
          this.renderer.setText(this._getFeedbackText(event));
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

    // 设置叙事文本和视觉色调
    this.renderer.setText(event.narrativeText || event.description);
    if (event.visualTone) {
      this.renderer.setTone(event.visualTone);
    }

    this.state = 'typing';
    this.selectedChoice = -1;
  }

  _advanceToNextEvent() {
    // 淡出 → 加载下一事件 → 淡入
    this.renderer.fadeTarget = 0;
    setTimeout(() => {
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
    const colors = require('./renderer').TONE_COLORS || { neutral: { text: '#E0E0E0', accent: '#888888' } };
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
    const lines = [];
    let currentLine = '';
    for (let i = 0; i < text.length; i++) {
      const testLine = currentLine + text[i];
      if (ctx.measureText(testLine).width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = text[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }
}

module.exports = TimelinePlayer;

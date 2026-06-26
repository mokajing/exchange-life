/**
 * Timeline播放器 - 数据驱动的沉浸式体验控制器
 * Phase 1: 打字机变速+停顿 + 暂停安全按钮 + 角色简介支持
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
    this.onBackToMenuCallback = options.onBackToMenu || (() => {});

    // 渲染器
    this.renderer = new Renderer(this.ctx, this.width, this.height);

    // 播放状态
    this.currentEventIndex = 0;
    this.state = 'idle'; // idle | safety_prompt | typing | waiting | choosing | feedback | echo | complete | paused
    this.selectedChoice = -1;
    this.choiceFeedbackTimer = 0;
    this.choiceFeedbackDuration = 3; // 秒

    // Phase 1: 暂停状态
    this._stateBeforePause = null;
    this._pauseBreathPhase = 0; // for breathing animation

    // PRD V3.0 回响环节状态
    this.echoStep = 0; // 0=渐弱音景 1=身份锚定 2=记录入口 3=温和出口
    this.echoTimer = 0;
    this.echoUserInput = '';

    // 安全提示（PRD V2.1 UESL模型）
    this.safetyLevel = (this.timeline.safetyInfo && this.timeline.safetyInfo.complianceLevel) || 'L1';
    this.requiresSafetyPrompt = this.safetyLevel === 'L2' || this.safetyLevel === 'L3' || this.safetyLevel === 'L4';

    // Phase 2: characterProfile support
    this.characterProfile = (this.timeline.meta && this.timeline.meta.characterProfile) || null;
    this._profileShown = false;

    // Phase 3: 后果标签系统
    this._consequenceLabel = null;

    // 触摸检测
    this.touchStartY = 0;
    this.touchStartTime = 0;

    // 预计算选项区域（用于点击检测）
    this.choiceRects = [];

    // 防重复定时器
    this._advanceTimer = null;

    // Phase 1: 暂停按钮区域（右上角）
    this._pauseBtnRect = { x: 0, y: 0, w: 44, h: 44 };
  }

  /**
   * 开始体验
   */
  start() {
    // 清理可能残留的定时器，防止重启时旧timer触发
    if (this._advanceTimer) {
      clearTimeout(this._advanceTimer);
      this._advanceTimer = null;
    }
    this.currentEventIndex = 0;
    this._profileShown = false;

    // Phase 2: Show character profile if available before starting
    if (this.characterProfile && !this._profileShown) {
      this._showCharacterProfile();
      return;
    }

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
   * Phase 2: 展示角色简介
   */
  _showCharacterProfile() {
    this._profileShown = true;
    const profile = this.characterProfile;
    let profileText = '';
    if (typeof profile === 'string') {
      profileText = profile;
    } else {
      const name = profile.name || '';
      const desc = profile.description || profile.bio || '';
      const age = profile.age ? `，${profile.age}岁` : '';
      profileText = `即将进入${name}${age}的人生片段。\n\n${desc}\n\n点击开始体验。`;
    }
    this.state = 'safety_prompt'; // reuse safety_prompt state for profile display
    this.renderer.setText(profileText, 0.3);
    this.renderer.fadeAlpha = 0;
    this.renderer.fadeTarget = 1;
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

    // Phase 1: 暂停状态呼吸动画
    if (this.state === 'paused') {
      this._pauseBreathPhase += dt * 1.5;
      return; // Don't update game logic while paused
    }

    // 选择反馈倒计时
    if (this.state === 'feedback') {
      this.choiceFeedbackTimer -= dt;
      if (this.choiceFeedbackTimer <= 0) {
        this._advanceToNextEvent();
      }
    }

    // PRD V3.0 回响环节更新
    if (this.state === 'echo') {
      this._updateEcho(dt);
    }

    // Phase 1: Check if typing finished → transition to waiting/choosing
    if (this.state === 'typing' && !this.renderer.typing) {
      this.state = this._hasChoices() ? 'choosing' : 'waiting';
    }
  }

  /**
   * 每帧渲染
   */
  render() {
    // Phase 1: 暂停界面渲染
    if (this.state === 'paused') {
      this._renderPauseScreen();
      return;
    }

    // echo状态下不渲染event内容，由回响环节自行处理
    if (this.state === 'echo') {
      const progress = 1;
      this.renderer.render({
        title: '',
        subtitle: null,
        choices: null,
        selectedChoice: -1,
        progress: progress,
        feedbackText: null
      });
      return;
    }

    // complete状态渲染专门的结束界面
    if (this.state === 'complete') {
      this._renderCompleteScreen();
      return;
    }

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

    // Phase 1: 渲染暂停按钮（右上角半透明）
    this._renderPauseButton();
  }

  /**
   * Phase 1: 渲染暂停按钮
   */
  _renderPauseButton() {
    const ctx = this.ctx;
    const btnSize = 44;
    const margin = 16;
    const x = this.width - btnSize - margin;
    const y = margin;
    
    // Update rect for hit testing
    this._pauseBtnRect = { x: x, y: y, w: btnSize, h: btnSize };

    // Semi-transparent circle background
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + btnSize / 2, y + btnSize / 2, btnSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Pause icon (two vertical bars)
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.7;
    const barW = 4;
    const barH = 16;
    const gap = 6;
    const cx = x + btnSize / 2;
    const cy = y + btnSize / 2;
    ctx.fillRect(cx - gap / 2 - barW, cy - barH / 2, barW, barH);
    ctx.fillRect(cx + gap / 2, cy - barH / 2, barW, barH);
    ctx.globalAlpha = 1;
  }

  /**
   * Phase 1: 渲染暂停界面
   */
  _renderPauseScreen() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Neutral dark background
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Breathing circle animation
    const breathCycle = Math.sin(this._pauseBreathPhase) * 0.5 + 0.5; // 0→1
    const radius = 30 + breathCycle * 20;
    const alpha = 0.15 + breathCycle * 0.15;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 - 60, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Breathing guidance text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '18px "PingFang SC", sans-serif';
    ctx.globalAlpha = 0.6 + breathCycle * 0.3;
    ctx.fillText('深呼吸……', w / 2, h / 2 - 60 + 5);
    ctx.globalAlpha = 1;

    // Title
    ctx.fillStyle = '#B0B0B0';
    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.fillText('体验已暂停', w / 2, h / 2 + 20);

    // Buttons
    const btnW = 200;
    const btnH = 48;
    const btnGap = 20;
    const continueY = h / 2 + 60;
    const exitY = continueY + btnH + btnGap;

    // Continue button
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    this._roundRect(ctx, (w - btnW) / 2, continueY, btnW, btnH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    this._roundRect(ctx, (w - btnW) / 2, continueY, btnW, btnH, 10);
    ctx.stroke();
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '16px "PingFang SC", sans-serif';
    ctx.fillText('继续体验', w / 2, continueY + btnH / 2 + 6);

    // Exit button
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    this._roundRect(ctx, (w - btnW) / 2, exitY, btnW, btnH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    this._roundRect(ctx, (w - btnW) / 2, exitY, btnW, btnH, 10);
    ctx.stroke();
    ctx.fillStyle = '#888888';
    ctx.fillText('退出到目录', w / 2, exitY + btnH / 2 + 6);

    // Store button rects for hit testing
    this._pauseContinueBtn = { x: (w - btnW) / 2, y: continueY, w: btnW, h: btnH };
    this._pauseExitBtn = { x: (w - btnW) / 2, y: exitY, w: btnW, h: btnH };
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
    // 防御性检查：changedTouches可能为空
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    
    const touchY = e.changedTouches[0].clientY;
    const dy = Math.abs(touchY - this.touchStartY);
    const dt = Date.now() - this.touchStartTime;

    // 过滤滑动操作（只处理点击）
    if (dy > 30 || dt > 500) return;

    this._handleTap(e.changedTouches[0].clientX, touchY);
  }

  _handleTap(x, y) {
    // Phase 1: 暂停状态处理
    if (this.state === 'paused') {
      this._handlePauseTap(x, y);
      return;
    }

    // Phase 1: Check pause button hit (in all active states)
    if (this._hitTestPauseBtn(x, y)) {
      this._enterPause();
      return;
    }

    switch (this.state) {
      case 'safety_prompt':
        // PRD V2.1: 用户确认安全提示后开始体验
        // Phase 2: If showing profile, proceed to safety prompt or first event
        if (this.characterProfile && !this._profileShown) {
          // Should not happen, but safety fallback
          this._profileShown = true;
        }
        if (this.requiresSafetyPrompt && this._profileShown) {
          // Profile was shown, now show actual safety prompt
          this.state = 'safety_prompt';
          this.renderer.setText(this._getSafetyPromptText(), 0.3);
          this._profileShown = false; // mark as "safety shown"
        } else {
          this._loadEvent(0);
        }
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
          // Phase 3: 提取后果标签
          this._consequenceLabel = this._getConsequenceHint(event);
          // 反馈文本使用中等情绪强度0.5，避免过快或过慢
          this.renderer.setText(feedbackText, 0.5);
        }
        break;

      case 'feedback':
        // 点击跳过反馈等待
        this._advanceToNextEvent();
        break;

      case 'echo':
        // PRD V3.0 回响环节点击处理
        this._handleEchoTap();
        break;

      case 'complete':
        // 体验结束，处理按钮点击
        this._handleCompleteTap(x, y);
        break;
    }
  }

  /**
   * Phase 1: 进入暂停状态
   */
  _enterPause() {
    this._stateBeforePause = this.state;
    this.state = 'paused';
    this._pauseBreathPhase = 0;
  }

  /**
   * Phase 1: 恢复暂停
   */
  _resumeFromPause() {
    if (this._stateBeforePause) {
      this.state = this._stateBeforePause;
      this._stateBeforePause = null;
    } else {
      this.state = 'waiting';
    }
  }

  /**
   * Phase 1: 暂停界面点击处理
   */
  _handlePauseTap(x, y) {
    // Check continue button
    if (this._pauseContinueBtn && this._hitRect(x, y, this._pauseContinueBtn)) {
      this._resumeFromPause();
      return;
    }
    // Check exit button
    if (this._pauseExitBtn && this._hitRect(x, y, this._pauseExitBtn)) {
      this.state = 'idle';
      this._stateBeforePause = null;
      this.destroy();
      this.onBackToMenuCallback();
      return;
    }
  }

  /**
   * Phase 1: 暂停按钮点击检测
   */
  _hitTestPauseBtn(x, y) {
    return this._hitRect(x, y, this._pauseBtnRect);
  }

  _hitRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  }

  // === 事件流转逻辑 ===

  _loadEvent(index) {
    if (index >= this.timeline.events.length) {
      // PRD V3.0: 进入回响环节而非直接complete
      this._startEchoPhase();
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
      // Phase 1: Also apply emotion-tone color mapping if available
      const toneColorMap = Renderer.TONE_COLOR_MAP;
      if (toneColorMap && toneColorMap[event.visualTone]) {
        this.renderer.setBackgroundTone(toneColorMap[event.visualTone]);
      }
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
      try {
        this._loadEvent(this.currentEventIndex + 1);
        this.renderer.fadeTarget = 1;
      } catch (e) {
        console.error('[TimelinePlayer] Failed to load event:', e);
        this.state = 'idle';
      } finally {
        this._advanceTimer = null;
      }
    }, 500);
  }

  /**
   * 销毁播放器，清理所有定时器和资源
   */
  destroy() {
    if (this._advanceTimer) {
      clearTimeout(this._advanceTimer);
      this._advanceTimer = null;
    }
    this.state = 'idle';
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
    const response = event.interactionChoice.options[this.selectedChoice].response;
    
    // Phase 3: 向后兼容 - 支持旧格式(字符串)和新格式(三层对象)
    if (typeof response === 'string') {
      return response;
    }
    if (response && typeof response === 'object') {
      const parts = [];
      if (response.immediateReaction) parts.push(response.immediateReaction);
      if (response.innerThought) parts.push('\n\n' + response.innerThought);
      // consequenceHint不在反馈文本中显示，由后果标签系统单独处理
      return parts.join('');
    }
    return '';
  }

  /**
   * Phase 3: 获取当前选择的后果提示标签
   */
  _getConsequenceHint(event) {
    if (!event.interactionChoice || this.selectedChoice < 0) return null;
    const response = event.interactionChoice.options[this.selectedChoice].response;
    if (response && typeof response === 'object' && response.consequenceHint) {
      return response.consequenceHint;
    }
    return null;
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

    // Phase 3: 后果标签 - 灰色小字显示在底部
    if (this._consequenceLabel) {
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#999999';
      ctx.font = '12px "PingFang SC", sans-serif';
      ctx.fillText(this._consequenceLabel, w / 2, h - 36);
      ctx.globalAlpha = 1;
    }
  }

  _wrapFeedbackText(ctx, text, maxWidth) {
    // 复用Renderer的_wrapText方法，避免代码重复
    return this.renderer._wrapText(ctx, text, maxWidth);
  }

  // Utility: roundRect for pause screen
  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // === PRD V3.0 回响环节 ===

  /**
   * 启动回响环节（体验结束后的结构化过渡）
   * 四步流程：渐弱音景→身份锚定→记录入口→温和出口
   */
  _startEchoPhase() {
    this.state = 'echo';
    this.echoStep = 0;
    this.echoTimer = 0;
    this.echoUserInput = '';
    // 步骤0：渐弱音景（3秒BGM渐弱至静默）
    this.renderer.setText('', 0.1);
    this.renderer.fadeTarget = 1;
    this.onCompleteCallback();
  }

  /**
   * 回响环节每帧更新
   */
  _updateEcho(dt) {
    this.echoTimer += dt;
    if (this.echoStep === 0 && this.echoTimer >= 3) {
      // 步骤0完成，进入身份锚定
      this.echoStep = 1;
      this.echoTimer = 0;
      this.renderer.setText(this._getIdentityAnchorText(), 0.2);
    }
    if (this.echoStep === 1 && this.echoTimer >= 4) {
      // 步骤1完成（身份锚定展示≥3秒），进入记录入口
      this.echoStep = 2;
      this.echoTimer = 0;
      this.renderer.setText(this._getEchoRecordPrompt(), 0.2);
    }
    // 步骤2和3等待用户点击
  }

  /**
   * 回响环节的点击处理
   */
  _handleEchoTap() {
    if (this.echoStep === 0 || this.echoStep === 1) {
      // 渐弱/身份锚定阶段不可跳过（PRD V3.0强制要求身份锚定≥3秒）
      return;
    }
    if (this.echoStep === 2) {
      // 记录入口→温和出口
      this.echoStep = 3;
      this.echoTimer = 0;
      this.renderer.setText(this._getGentleExitText(), 0.2);
    } else if (this.echoStep === 3) {
      // 温和出口→complete
      this.state = 'complete';
      // complete状态由_renderCompleteScreen渲染，无需设置文本
    }
  }

  /**
   * 身份锚定提示文本（PRD V3.0强制要求，不可跳过，展示≥3秒）
   */
  _getIdentityAnchorText() {
    const title = (this.timeline.meta && this.timeline.meta.title) || '这段人生';
    return `你刚刚体验的是「${title}」的人生片段。\n\n现在，请慢慢回到你自己的生活中。\n\n深呼吸一次，感受此刻的自己。`;
  }

  /**
   * 回响记录入口提示（可选文字输入，低门槛引导语）
   */
  _getEchoRecordPrompt() {
    return '如果这段体验让你想起了什么，\n哪怕只是一个词、一种感觉，\n可以轻轻写下来。\n\n（点击继续，或停留片刻）';
  }

  /**
   * 温和出口文本（推荐轻松体验+稍后再来，禁止直接推送付费内容）
   */
  _getGentleExitText() {
    return '每一段人生都值得被温柔对待。\n\n你可以稍后再来，也可以试试其他故事。\n\n不着急，按自己的节奏来。';
  }

  /**
   * 渲染完成界面（包含重新开始和返回目录按钮）
   */
  _renderCompleteScreen() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 深色背景
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // 感谢文本
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '20px "PingFang SC", sans-serif';
    ctx.fillText('感谢你的陪伴', w / 2, h / 2 - 80);

    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.fillStyle = '#888888';
    ctx.fillText('这段人生体验已结束', w / 2, h / 2 - 50);

    // 按钮样式
    const btnW = 200;
    const btnH = 48;
    const btnGap = 20;
    const restartY = h / 2 + 10;
    const menuY = restartY + btnH + btnGap;

    // 重新开始按钮
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    this._roundRect(ctx, (w - btnW) / 2, restartY, btnW, btnH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    this._roundRect(ctx, (w - btnW) / 2, restartY, btnW, btnH, 10);
    ctx.stroke();
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '16px "PingFang SC", sans-serif';
    ctx.fillText('重新开始', w / 2, restartY + btnH / 2 + 6);

    // 返回目录按钮
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    this._roundRect(ctx, (w - btnW) / 2, menuY, btnW, btnH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    this._roundRect(ctx, (w - btnW) / 2, menuY, btnW, btnH, 10);
    ctx.stroke();
    ctx.fillStyle = '#888888';
    ctx.fillText('返回目录', w / 2, menuY + btnH / 2 + 6);

    // 存储按钮区域用于点击检测
    this._completeRestartBtn = { x: (w - btnW) / 2, y: restartY, w: btnW, h: btnH };
    this._completeMenuBtn = { x: (w - btnW) / 2, y: menuY, w: btnW, h: btnH };
  }

  /**
   * 完成界面点击处理
   */
  _handleCompleteTap(x, y) {
    // 检查重新开始按钮
    if (this._completeRestartBtn && this._hitRect(x, y, this._completeRestartBtn)) {
      this.start();
      return;
    }
    // 检查返回目录按钮
    if (this._completeMenuBtn && this._hitRect(x, y, this._completeMenuBtn)) {
      this.state = 'idle';
      this.destroy();
      this.onBackToMenuCallback();
      return;
    }
  }

}

module.exports = TimelinePlayer;

/**
 * 渲染器 - Canvas文字渲染 + 背景色调 + 动画效果
 */

// 视觉色调配色方案
const TONE_COLORS = {
  warm:   { bg: '#2C1810', text: '#F5E6D3', accent: '#D4A574' },
  cool:   { bg: '#0F1923', text: '#D0E0F0', accent: '#6B9BC3' },
  dark:   { bg: '#0A0A0A', text: '#B0B0B0', accent: '#555555' },
  bright: { bg: '#1A1A2E', text: '#FFFFFF', accent: '#FFD700' },
  neutral:{ bg: '#1C1C1C', text: '#E0E0E0', accent: '#888888' }
};

class Renderer {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.currentTone = 'neutral';
    this.targetTone = 'neutral';
    this.toneTransition = 0; // 0-1 过渡进度
    this.bgColor = { ...TONE_COLORS.neutral.bg };
    
    // 文字打字机效果
    this.displayedChars = 0;
    this.totalChars = 0;
    this.typeSpeed = 30; // 字符/秒
    this.currentText = '';
    this.isTyping = false;
    
    // 淡入淡出
    this.fadeAlpha = 0;
    this.fadeTarget = 1;
    this.fadeSpeed = 2;
  }

  /**
   * 设置新的叙事文本（触发打字机效果）
   */
  setText(text) {
    this.currentText = text;
    this.totalChars = text.length;
    this.displayedChars = 0;
    this.isTyping = true;
  }

  /**
   * 切换视觉色调（带过渡）
   */
  setTone(tone) {
    if (tone !== this.currentTone && TONE_COLORS[tone]) {
      this.targetTone = tone;
      this.toneTransition = 0;
    }
  }

  /**
   * 跳过打字机动画，直接显示全部
   */
  skipTyping() {
    this.displayedChars = this.totalChars;
    this.isTyping = false;
  }

  /**
   * 是否正在打字
   */
  get typing() {
    return this.isTyping;
  }

  /**
   * 每帧更新
   */
  update(dt) {
    // 打字机效果
    if (this.isTyping) {
      this.displayedChars += this.typeSpeed * dt;
      if (this.displayedChars >= this.totalChars) {
        this.displayedChars = this.totalChars;
        this.isTyping = false;
      }
    }

    // 色调过渡
    if (this.currentTone !== this.targetTone) {
      this.toneTransition += dt * 0.8; // ~1.25秒完成过渡
      if (this.toneTransition >= 1) {
        this.currentTone = this.targetTone;
        this.toneTransition = 0;
      }
    }

    // 淡入淡出
    if (Math.abs(this.fadeAlpha - this.fadeTarget) > 0.01) {
      const dir = this.fadeTarget > this.fadeAlpha ? 1 : -1;
      this.fadeAlpha += dir * this.fadeSpeed * dt;
      this.fadeAlpha = Math.max(0, Math.min(1, this.fadeAlpha));
    }
  }

  /**
   * 渲染一帧
   */
  render(state) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. 绘制背景（含色调过渡）
    this._renderBackground(ctx, w, h);

    // 2. 绘制标题区
    if (state.title) {
      this._renderTitle(ctx, w, state.title, state.subtitle);
    }

    // 3. 绘制叙事文本
    if (this.currentText) {
      this._renderNarrativeText(ctx, w, h, state);
    }

    // 4. 绘制交互选择
    if (state.choices && !this.isTyping) {
      this._renderChoices(ctx, w, h, state.choices, state.selectedChoice);
    }

    // 5. 绘制进度条
    this._renderProgressBar(ctx, w, h, state.progress || 0);

    // 6. 绘制提示文字
    if (!this.isTyping && !state.choices) {
      this._renderHint(ctx, w, h, '点击继续');
    } else if (this.isTyping) {
      this._renderHint(ctx, w, h, '点击跳过');
    }

    // 7. 全局淡入淡出遮罩
    if (this.fadeAlpha < 1) {
      ctx.fillStyle = `rgba(0,0,0,${1 - this.fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // === 私有渲染方法 ===

  _renderBackground(ctx, w, h) {
    const from = TONE_COLORS[this.currentTone];
    const to = TONE_COLORS[this.targetTone];
    
    if (this.toneTransition > 0) {
      // 简单交叉淡入：先画from色，再叠加to色
      ctx.fillStyle = from.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = this.toneTransition;
      ctx.fillStyle = to.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = from.bg;
      ctx.fillRect(0, 0, w, h);
    }
  }

  _renderTitle(ctx, w, title, subtitle) {
    const colors = TONE_COLORS[this.targetTone] || TONE_COLORS.neutral;
    
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.accent;
    ctx.font = 'bold 28px "PingFang SC", sans-serif';
    ctx.fillText(title, w / 2, 80, w - 60);

    if (subtitle) {
      ctx.fillStyle = colors.text;
      ctx.font = '16px "PingFang SC", sans-serif';
      ctx.globalAlpha = 0.7;
      ctx.fillText(subtitle, w / 2, 115, w - 60);
      ctx.globalAlpha = 1;
    }
  }

  _renderNarrativeText(ctx, w, h, state) {
    const colors = TONE_COLORS[this.targetTone] || TONE_COLORS.neutral;
    const text = this.currentText.substring(0, Math.floor(this.displayedChars));
    
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.text;
    ctx.font = '20px "PingFang SC", serif';
    
    const padding = 40;
    const maxWidth = w - padding * 2;
    const lineHeight = 36;
    const startY = 160;
    const maxLines = Math.floor((h - startY - 120) / lineHeight);

    // 自动换行
    const lines = this._wrapText(ctx, text, maxWidth);
    const visibleLines = lines.slice(0, maxLines);

    visibleLines.forEach((line, i) => {
      // 逐行淡入效果
      const lineAlpha = Math.min(1, (this.displayedChars / this.totalChars) * visibleLines.length - i * 0.3);
      ctx.globalAlpha = Math.max(0.3, Math.min(1, lineAlpha));
      ctx.fillText(line, padding, startY + i * lineHeight);
    });
    ctx.globalAlpha = 1;
  }

  _renderChoices(ctx, w, h, choices, selectedIndex) {
    const colors = TONE_COLORS[this.targetTone] || TONE_COLORS.neutral;
    const choiceH = 60;
    const gap = 16;
    const totalH = choices.length * (choiceH + gap) - gap;
    const startY = h - totalH - 80;
    const padding = 30;
    const choiceW = w - padding * 2;

    choices.forEach((choice, i) => {
      const y = startY + i * (choiceH + gap);
      const isSelected = i === selectedIndex;

      // 选项背景
      ctx.fillStyle = isSelected ? colors.accent : 'rgba(255,255,255,0.08)';
      ctx.globalAlpha = isSelected ? 0.3 : 0.15;
      this._roundRect(ctx, padding, y, choiceW, choiceH, 12);
      ctx.fill();
      ctx.globalAlpha = 1;

      // 选项边框
      ctx.strokeStyle = isSelected ? colors.accent : 'rgba(255,255,255,0.2)';
      ctx.lineWidth = isSelected ? 2 : 1;
      this._roundRect(ctx, padding, y, choiceW, choiceH, 12);
      ctx.stroke();

      // 选项文字
      ctx.fillStyle = isSelected ? colors.accent : colors.text;
      ctx.font = `${isSelected ? 'bold ' : ''}16px "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(choice.label, w / 2, y + choiceH / 2 + 6, choiceW - 20);
    });
  }

  _renderProgressBar(ctx, w, h, progress) {
    const barW = w - 80;
    const barH = 3;
    const x = 40;
    const y = h - 30;
    const colors = TONE_COLORS[this.targetTone] || TONE_COLORS.neutral;

    // 背景条
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x, y, barW, barH);

    // 进度条
    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(x, y, barW * progress, barH);
    ctx.globalAlpha = 1;
  }

  _renderHint(ctx, w, h, text) {
    const colors = TONE_COLORS[this.targetTone] || TONE_COLORS.neutral;
    ctx.fillStyle = colors.text;
    ctx.globalAlpha = 0.4 + Math.sin(Date.now() / 500) * 0.2; // 呼吸效果
    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, h - 55);
    ctx.globalAlpha = 1;
  }

  // === 工具方法 ===

  _wrapText(ctx, text, maxWidth) {
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '\n') {
        lines.push(currentLine);
        currentLine = '';
        continue;
      }
      const testLine = currentLine + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

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
}

module.exports = Renderer;

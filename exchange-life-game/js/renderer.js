/**
 * 渲染器 - Canvas文字渲染 + 背景色调 + 动画效果
 * Phase 1: 情绪色调映射表 + lerp渐变过渡 + 逐字淡入
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
    this.bgColor = TONE_COLORS.neutral.bg;
    
    // Phase 1: lerp渐变状态
    this._lerpStartColor = null; // hex string of source color
    this._lerpEndColor = null;   // hex string of target color
    this._lerpProgress = 1;      // 0→1, 1 = done
    this._lerpDuration = 2;      // seconds
    this._currentBgHex = TONE_COLORS.neutral.bg;
    
    // 文字打字机效果
    this.displayedChars = 0;
    this.totalChars = 0;
    this.typeSpeed = 30; // 字符/秒
    this.currentText = '';
    this.isTyping = false;
    
    // Phase 1: 打字机变速参数
    this._emotionIntensity = 0.5;
    this._pauseTimer = 0;        // >0 means we're in a pause
    this._pausePositions = [];   // char indices where [pause] markers were
    
    // 文本换行缓存（统一使用_precomputedLines/_precomputedTextKey）
    
    // 淡入淡出
    this.fadeAlpha = 0;
    this.fadeTarget = 1;
    this.fadeSpeed = 2;
  }

  /**
   * 设置新的叙事文本（触发打字机效果）
   * @param {string} text - 叙事文本
   * @param {number} emotionIntensity - 情绪强度(0-1)，影响打字速度
   */
  setText(text, emotionIntensity) {
    // Phase 1: 处理[pause]标记
    this._pausePositions = [];
    let cleanText = '';
    let pauseOffset = 0;
    const pauseTag = '[pause]';
    let searchFrom = 0;
    while (true) {
      const idx = text.indexOf(pauseTag, searchFrom);
      if (idx === -1) {
        cleanText += text.substring(searchFrom);
        break;
      }
      cleanText += text.substring(searchFrom, idx);
      // Record the position in clean text where pause should happen (before next char)
      this._pausePositions.push(cleanText.length);
      searchFrom = idx + pauseTag.length;
    }
    
    this.currentText = cleanText;
    this.totalChars = cleanText.length;
    this.displayedChars = 0;
    this.isTyping = true;
    this._pauseTimer = 0;
    
    // Phase 1: 根据emotionIntensity调整打字速度
    // 高强度(0.7-1.0) → 30ms/字 ≈ 33字/秒
    // 低强度(0-0.3) → 120ms/字 ≈ 8.3字/秒
    // 中等强度线性插值
    if (typeof emotionIntensity === 'number') {
      this._emotionIntensity = Math.max(0, Math.min(1, emotionIntensity));
    } else {
      this._emotionIntensity = 0.5;
    }
    this.typeSpeed = this._calcTypeSpeed(this._emotionIntensity);
    
    // 预计算完整文本换行
    this._precomputedLines = null;
    this._precomputedTextKey = '';
  }

  /**
   * Phase 1: 根据情绪强度计算打字速度（字/秒）
   * intensity 0~0.3 → 120ms/字 = 8.33字/秒
   * intensity 0.7~1.0 → 30ms/字 = 33.33字/秒
   * 中间线性插值
   */
  _calcTypeSpeed(intensity) {
    const slowSpeed = 1000 / 120;  // ~8.33 chars/sec
    const fastSpeed = 1000 / 30;   // ~33.33 chars/sec
    if (intensity <= 0.3) {
      return slowSpeed;
    } else if (intensity >= 0.7) {
      return fastSpeed;
    } else {
      // Linear interpolation between 0.3 and 0.7
      const t = (intensity - 0.3) / 0.4;
      return slowSpeed + t * (fastSpeed - slowSpeed);
    }
  }

  /**
   * 切换视觉色调（带lerp渐变过渡，2秒）
   */
  setTone(tone) {
    if (tone !== this.targetTone && TONE_COLORS[tone]) {
      this.targetTone = tone;
      this.toneTransition = 0;
      
      // Phase 1: Start lerp from current displayed color to new target
      this._lerpStartColor = this._currentBgHex;
      this._lerpEndColor = TONE_COLORS[tone].bg;
      this._lerpProgress = 0;
    }
  }

  /**
   * Phase 1: 直接设置背景色调（用于暂停等场景）
   */
  setBackgroundTone(hexColor) {
    this._lerpStartColor = this._currentBgHex;
    this._lerpEndColor = hexColor;
    this._lerpProgress = 0;
  }

  /**
   * 跳过打字机动画，直接显示全部
   */
  skipTyping() {
    this.displayedChars = this.totalChars;
    this.isTyping = false;
    this._pauseTimer = 0;
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
    // Phase 1: lerp背景色渐变
    if (this._lerpProgress < 1 && this._lerpStartColor && this._lerpEndColor) {
      this._lerpProgress += dt / this._lerpDuration;
      if (this._lerpProgress >= 1) {
        this._lerpProgress = 1;
        this._currentBgHex = this._lerpEndColor;
      } else {
        this._currentBgHex = this._lerpHexColor(this._lerpStartColor, this._lerpEndColor, this._lerpProgress);
      }
    }

    // 打字机效果（含停顿逻辑）
    if (this.isTyping) {
      // Phase 1: Check for pause at current position
      if (this._pauseTimer > 0) {
        this._pauseTimer -= dt;
        if (this._pauseTimer <= 0) {
          this._pauseTimer = 0;
        }
        // Don't advance chars during pause
      } else {
        // Check if we just reached a pause position
        const displayedInt = Math.floor(this.displayedChars);
        if (this._pausePositions.includes(displayedInt) && displayedInt > 0 && displayedInt < this.totalChars) {
          this._pauseTimer = 0.8; // 800ms pause
        } else {
          this.displayedChars += this.typeSpeed * dt;
          if (this.displayedChars >= this.totalChars) {
            this.displayedChars = this.totalChars;
            this.isTyping = false;
          }
        }
      }
    }

    // 色调过渡（保留原有逻辑用于accent/text颜色切换）
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
   * Phase 1: Hex颜色线性插值
   */
  _lerpHexColor(hexA, hexB, t) {
    const a = this._hexToRgb(hexA);
    const b = this._hexToRgb(hexB);
    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
  }

  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
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
    // Phase 1: Use lerped background color
    ctx.fillStyle = this._currentBgHex;
    ctx.fillRect(0, 0, w, h);
    
    // If still transitioning tone colors, overlay with crossfade for accent feel
    if (this.toneTransition > 0 && this.currentTone !== this.targetTone) {
      const to = TONE_COLORS[this.targetTone];
      ctx.globalAlpha = this.toneTransition * 0.3; // subtle overlay
      ctx.fillStyle = to.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
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
    
    ctx.textAlign = 'left';
    ctx.fillStyle = colors.text;
    ctx.font = '20px "PingFang SC", serif';
    
    const padding = 40;
    const maxWidth = w - padding * 2;
    const lineHeight = 36;
    const startY = 160;
    const maxLines = Math.floor((h - startY - 120) / lineHeight);

    // 性能优化：使用预计算的完整文本换行
    const fullLines = this._getPrecomputedLines(ctx, maxWidth);
    const displayedCount = Math.floor(this.displayedChars);

    // 根据已显示字符数截取可见行
    let charAccum = 0;
    const visibleLines = [];
    for (let i = 0; i < fullLines.length && visibleLines.length < maxLines; i++) {
      const line = fullLines[i];
      const lineEnd = charAccum + line.length;
      const hasNewline = charAccum + line.length < this.currentText.length && this.currentText[lineEnd] === '\n';
      const lineTotalChars = line.length + (hasNewline ? 1 : 0);

      if (charAccum >= displayedCount) break;

      if (lineEnd <= displayedCount) {
        visibleLines.push({ text: line, charStart: charAccum, charEnd: lineEnd, partial: false });
      } else {
        const partialLen = displayedCount - charAccum;
        visibleLines.push({ text: line.substring(0, partialLen), charStart: charAccum, charEnd: displayedCount, partial: true, fullLine: line, partialLen: partialLen });
      }
      charAccum += lineTotalChars;
    }

    // Phase 2: 逐字淡入效果
    visibleLines.forEach((lineInfo, i) => {
      const y = startY + i * lineHeight;
      
      if (lineInfo.partial && lineInfo.fullLine) {
        // Partially displayed line: render completed chars fully, last char fading in
        const completedText = lineInfo.fullLine.substring(0, Math.max(0, lineInfo.partialLen - 1));
        const fadingChar = lineInfo.fullLine[lineInfo.partialLen - 1] || '';
        
        // Draw completed portion
        if (completedText.length > 0) {
          ctx.globalAlpha = 1;
          ctx.fillText(completedText, padding, y);
        }
        
        // Draw fading character with alpha based on fractional progress
        if (fadingChar) {
          const frac = this.displayedChars - Math.floor(this.displayedChars);
          const charAlpha = 0.1 + frac * 0.9;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, charAlpha));
          const completedWidth = ctx.measureText(completedText).width;
          ctx.fillText(fadingChar, padding + completedWidth, y);
        }
      } else {
        // Fully displayed line: use line-level fade for recently completed lines
        const charProgress = Math.min(1, this.displayedChars / Math.max(1, lineInfo.charEnd));
        const lineAlpha = 0.3 + charProgress * 0.7;
        ctx.globalAlpha = Math.max(0.3, Math.min(1, lineAlpha));
        ctx.fillText(lineInfo.text, padding, y);
      }
    });
    ctx.globalAlpha = 1;
  }

  /**
   * 统一换行计算（带缓存，供内部和外部调用）
   */
  _computeLines(text, maxWidth) {
    const cacheKey = text + '|' + maxWidth + '|' + this.ctx.font;
    if (this._precomputedTextKey === cacheKey && this._precomputedLines) {
      return this._precomputedLines;
    }
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
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    this._precomputedLines = lines;
    this._precomputedTextKey = cacheKey;
    return lines;
  }

  /**
   * 获取预计算的完整文本换行结果
   */
  _getPrecomputedLines(ctx, maxWidth) {
    return this._computeLines(this.currentText, maxWidth);
  }

  /**
   * 兼容旧接口
   * @deprecated 请使用_computeLines
   */
  _wrapText(ctx, text, maxWidth) {
    return this._computeLines(text, maxWidth);
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

  _getLineCharIndex(lineIndex, lines) {
    let charIndex = 0;
    for (let i = 0; i < lineIndex; i++) {
      charIndex += lines[i].length;
      if (charIndex < this.currentText.length && this.currentText[charIndex] === '\n') {
        charIndex++;
      }
    }
    return charIndex;
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

// Phase 1: 情绪-色调映射表（静态属性）
Renderer.TONE_COLOR_MAP = {
  'lonely': '#1a1a2e',
  'warm': '#3d2b1f',
  'tense': '#2d1b1b',
  'hopeful': '#1b2d2a',
  'sad': '#1a1a28',
  'neutral': '#0A0A0A'
};

// 导出TONE_COLORS供其他模块使用
Renderer.TONE_COLORS = TONE_COLORS;
module.exports = Renderer;

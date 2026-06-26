/**
 * SFX引擎 - 程序化生成情境音效
 * Phase 3 P0: 动态音效层(无需外部音频文件)
 */

class SFXEngine {
  constructor() {
    this.audioCtx = null;
    this.oscillatorNodes = []; // 跟踪所有振荡器节点以便清理
    this.gainNodes = [];       // 跟踪增益节点
    this.enabled = true;
  }

  /**
   * 初始化AudioContext(需在用户交互后调用)
   */
  init() {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      console.log('[SFX] AudioContext initialized');
    } catch (e) {
      console.warn('[SFX] Web Audio API not supported:', e.message);
      this.enabled = false;
    }
  }

  /**
   * 播放心跳脉冲音效
   * @param {number} intensity - 情绪强度(0-1),影响频率和音量
   */
  playHeartbeat(intensity = 0.5) {
    if (!this.enabled || !this.audioCtx) return;
    
    // 根据intensity映射频率(60-120Hz)和音量(0.1-0.3)
    const frequency = 60 + intensity * 60; // 60→120 Hz
    const volume = 0.1 + intensity * 0.2;  // 0.1→0.3
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
    
    // 淡入淡出避免爆音
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.start(this.audioCtx.currentTime);
    osc.stop(this.audioCtx.currentTime + 1.5);
    
    // 跟踪节点以便后续清理
    this.oscillatorNodes.push(osc);
    this.gainNodes.push(gainNode);
    
    // 自动清理已停止的节点
    setTimeout(() => {
      const idx = this.oscillatorNodes.indexOf(osc);
      if (idx !== -1) {
        this.oscillatorNodes.splice(idx, 1);
        this.gainNodes.splice(idx, 1);
      }
    }, 1600);
  }

  /**
   * 播放呼吸声(白噪音通过低通滤波器模拟)
   * @param {number} duration - 持续时间(秒)
   */
  playBreath(duration = 1.0) {
    if (!this.enabled || !this.audioCtx) return;
    
    const bufferSize = this.audioCtx.sampleRate * duration;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // 生成白噪音
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // 低通滤波器模拟呼吸声
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // 低频截止
    
    const gainNode = this.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, this.audioCtx.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    noiseSource.start(this.audioCtx.currentTime);
    noiseSource.stop(this.audioCtx.currentTime + duration);
  }

  /**
   * 播放纸张翻动声(短暂宽带噪音burst)
   */
  playPageTurn() {
    if (!this.enabled || !this.audioCtx) return;
    
    const duration = 0.08; // 80ms
    const bufferSize = this.audioCtx.sampleRate * duration;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const gainNode = this.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
    
    noiseSource.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    noiseSource.start(this.audioCtx.currentTime);
    noiseSource.stop(this.audioCtx.currentTime + duration);
  }

  /**
   * Phase 3 P1: 播放记忆闪回音效(高频清脆音+短暂回响)
   */
  playMemoryFlash() {
    if (!this.enabled || !this.audioCtx) return;
    
    // 主音：高频正弦波(800Hz)
    const osc1 = this.audioCtx.createOscillator();
    const gain1 = this.audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    
    gain1.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.15, this.audioCtx.currentTime + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.6);
    
    osc1.connect(gain1);
    gain1.connect(this.audioCtx.destination);
    osc1.start(this.audioCtx.currentTime);
    osc1.stop(this.audioCtx.currentTime + 0.6);
    
    // 回响：延迟的低频泛音(400Hz)
    const osc2 = this.audioCtx.createOscillator();
    const gain2 = this.audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(400, this.audioCtx.currentTime + 0.1);
    
    gain2.gain.setValueAtTime(0, this.audioCtx.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0.08, this.audioCtx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.8);
    
    osc2.connect(gain2);
    gain2.connect(this.audioCtx.destination);
    osc2.start(this.audioCtx.currentTime + 0.1);
    osc2.stop(this.audioCtx.currentTime + 0.8);
    
    // 跟踪节点
    this.oscillatorNodes.push(osc1, osc2);
    this.gainNodes.push(gain1, gain2);
    
    setTimeout(() => {
      [osc1, osc2].forEach(osc => {
        const idx = this.oscillatorNodes.indexOf(osc);
        if (idx !== -1) {
          this.oscillatorNodes.splice(idx, 1);
        }
      });
      [gain1, gain2].forEach(gain => {
        const idx = this.gainNodes.indexOf(gain);
        if (idx !== -1) {
          this.gainNodes.splice(idx, 1);
        }
      });
    }, 900);
  }

  /**
   * 停止所有正在播放的音效
   */
  stopAll() {
    this.oscillatorNodes.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // 可能已经停止
      }
    });
    this.oscillatorNodes = [];
    this.gainNodes = [];
  }

  /**
   * 销毁引擎,释放所有资源
   */
  destroy() {
    this.stopAll();
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.enabled = false;
  }
}

// 导出单例(同时支持module.exports和全局变量)
const sfxEngine = new SFXEngine();
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sfxEngine;
}
// 暴露为全局变量供HTML script标签使用
window.SFXEngine = sfxEngine;

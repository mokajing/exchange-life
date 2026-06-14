/**
 * BGM配置 - 音乐标签到实际音频文件的映射
 * Alpha阶段使用占位符，后续替换为真实音频资源
 */

const BGM_MAP = {
  // 温暖民谣风 - 童年/回忆场景
  gentle_folk:      { file: 'audio/bgm/gentle_folk.mp3',   volume: 0.4, loop: true },
  
  // 专注节奏 - 学习/钻研场景
  focused_rhythm:   { file: 'audio/bgm/focused_rhythm.mp3', volume: 0.35, loop: true },
  
  // 紧张渐强 - 冲突/追逐场景
  tense_buildup:    { file: 'audio/bgm/tense_buildup.mp3',  volume: 0.5, loop: true },
  
  // 驱动节拍 - 奋斗/创业场景
  driving_beat:     { file: 'audio/bgm/driving_beat.mp3',   volume: 0.4, loop: true },
  
  // 坚定进行曲 - 决心/转折场景
  determined_march: { file: 'audio/bgm/determined_march.mp3', volume: 0.45, loop: true },
  
  // 胜利高潮 - 成就/高光时刻
  triumphant_crescendo: { file: 'audio/bgm/triumphant.mp3', volume: 0.6, loop: false },
  
  // 温柔收尾 - 结局/释然
  triumphant_gentle: { file: 'audio/bgm/triumphant_gentle.mp3', volume: 0.4, loop: true },
  
  // 忧郁弦乐 - 悲伤/失去
  melancholic_strings: { file: 'audio/bgm/melancholic.mp3', volume: 0.35, loop: true },
  
  // 希望升起 - 转机/新开始
  hopeful_rise:     { file: 'audio/bgm/hopeful_rise.mp3',   volume: 0.4, loop: true },
  
  // 温暖解决 - 和解/接纳
  warm_resolution:  { file: 'audio/bgm/warm_resolution.mp3', volume: 0.4, loop: true },
  
  // 史诗风景 - 壮阔/自然
  epic_landscape:   { file: 'audio/bgm/epic_landscape.mp3', volume: 0.45, loop: true },
  
  // 苦涩弦乐 - 苦甜交织
  bittersweet_strings: { file: 'audio/bgm/bittersweet.mp3', volume: 0.35, loop: true },
  
  // 沉静钢琴 - 沉思/孤独
  somber_piano:     { file: 'audio/bgm/somber_piano.mp3',   volume: 0.3, loop: true },
  
  // 轻柔原声 - 日常/平静
  gentle_acoustic:  { file: 'audio/bgm/gentle_acoustic.mp3', volume: 0.3, loop: true },
  
  // 情感渐强 - 情绪积累
  emotional_buildup: { file: 'audio/bgm/emotional_buildup.mp3', volume: 0.45, loop: true },

  // === 高考30天专用标签 ===
  piano_slow:        { file: 'audio/bgm/piano_slow.mp3',       volume: 0.3, loop: true },
  silence_tension:   { file: 'audio/bgm/silence_tension.mp3',  volume: 0.2, loop: true },
  ambient_night:     { file: 'audio/bgm/ambient_night.mp3',    volume: 0.25, loop: true },
  warm_quiet:        { file: 'audio/bgm/warm_quiet.mp3',       volume: 0.3, loop: true },
  no_bgm_ambient:    { file: 'audio/bgm/no_bgm_ambient.mp3',   volume: 0.15, loop: true },
  nostalgic_piano:   { file: 'audio/bgm/nostalgic_piano.mp3',  volume: 0.35, loop: true },
  heartbeat_low:     { file: 'audio/bgm/heartbeat_low.mp3',    volume: 0.3, loop: true },
  strings_gentle:    { file: 'audio/bgm/strings_gentle.mp3',   volume: 0.3, loop: true },
  minimal_piano:     { file: 'audio/bgm/minimal_piano.mp3',    volume: 0.25, loop: true },
  summer_nostalgia:  { file: 'audio/bgm/summer_nostalgia.mp3', volume: 0.4, loop: false },

  // === 通用新增标签（曹雪芹/京都老铺等） ===
  morning_calm:      { file: 'audio/bgm/morning_calm.mp3',     volume: 0.3, loop: true },
  tension_rise:      { file: 'audio/bgm/tension_rise.mp3',     volume: 0.45, loop: true },
  night_thoughts:    { file: 'audio/bgm/night_thoughts.mp3',   volume: 0.3, loop: true },
  urban_jazz:        { file: 'audio/bgm/urban_jazz.mp3',       volume: 0.35, loop: true },
  silence:           { file: 'audio/bgm/silence.mp3',          volume: 0.1, loop: true },
  ending_peaceful:   { file: 'audio/bgm/ending_peaceful.mp3',  volume: 0.3, loop: true },

  // === 东京假日本人专用标签 ===
  new_beginning:     { file: 'audio/bgm/new_beginning.mp3',     volume: 0.35, loop: true },
  bittersweet:       { file: 'audio/bgm/bittersweet.mp3',       volume: 0.35, loop: true },
  emotional_peak:    { file: 'audio/bgm/emotional_peak.mp3',    volume: 0.45, loop: true },
  homecoming:        { file: 'audio/bgm/homecoming.mp3',        volume: 0.4, loop: true },
  resolution:        { file: 'audio/bgm/resolution.mp3',        volume: 0.4, loop: true },

  // === 新增标签 (2026-06-14 专家团迭代) ===
  ambient_calm:      { file: 'audio/bgm/ambient_calm.mp3',      volume: 0.25, loop: true },
  emotional_climax:  { file: 'audio/bgm/emotional_climax.mp3',  volume: 0.5, loop: false },
  silence_transition:{ file: 'audio/bgm/silence_transition.mp3',volume: 0.15, loop: true },
  night_quiet:       { file: 'audio/bgm/night_quiet.mp3',       volume: 0.2, loop: true },
  hopeful_dawn:      { file: 'audio/bgm/hopeful_dawn.mp3',      volume: 0.35, loop: true },
  family_warmth:     { file: 'audio/bgm/family_warmth.mp3',     volume: 0.35, loop: true },
  deep_pressure:     { file: 'audio/bgm/deep_pressure.mp3',     volume: 0.4, loop: true },

  // === 秦始皇平行历史专用标签 (2026-06-14 P0新增) ===
  ancient_mystery:   { file: 'audio/bgm/ancient_mystery.mp3',   volume: 0.35, loop: true },
  intellectual:      { file: 'audio/bgm/intellectual.mp3',      volume: 0.3, loop: true },
  triumph:           { file: 'audio/bgm/triumph.mp3',           volume: 0.5, loop: false },
  reflective:        { file: 'audio/bgm/reflective.mp3',        volume: 0.3, loop: true },
  farewell:          { file: 'audio/bgm/farewell.mp3',          volume: 0.3, loop: true }
};

/**
 * 根据bgmTag获取BGM配置
 */
function getBGM(tag) {
  return BGM_MAP[tag] || BGM_MAP.gentle_acoustic;
}

/**
 * BGM管理器 - 追踪当前播放实例和活跃的crossfade定时器，防止内存泄漏
 */
let _currentBGMInstance = null;
let _activeCrossfadeTimer = null;

/**
 * 播放BGM（微信小游戏InnerAudioContext）
 * 自动停止并销毁上一个BGM实例
 */
function playBGM(tag) {
  // 清理活跃的crossfade定时器
  _clearCrossfadeTimer();
  // 清理上一个实例，防止内存泄漏
  if (_currentBGMInstance) {
    try {
      _currentBGMInstance.stop();
      _currentBGMInstance.destroy();
    } catch (e) {
      // ignore cleanup errors
    }
    _currentBGMInstance = null;
  }

  const config = getBGM(tag);
  try {
    const audio = wx.createInnerAudioContext();
    audio.src = config.file;
    audio.volume = config.volume;
    audio.loop = config.loop;
    
    // 错误处理
    audio.onError((err) => {
      console.warn(`[BGM] Failed to play ${tag}:`, err.errMsg || err);
    });
    
    audio.play();
    _currentBGMInstance = audio;
    return audio;
  } catch (e) {
    console.warn(`[BGM] Exception playing ${tag}:`, e.message || e);
    return null;
  }
}

/**
 * 停止当前BGM并释放资源
 */
function stopBGM() {
  _clearCrossfadeTimer();
  if (_currentBGMInstance) {
    try {
      _currentBGMInstance.stop();
      _currentBGMInstance.destroy();
    } catch (e) {
      // ignore
    }
    _currentBGMInstance = null;
  }
}

/**
 * 交叉淡入切换BGM
 */
function crossfadeBGM(currentAudio, nextTag, duration = 1.5) {
  // 清理之前的crossfade定时器
  _clearCrossfadeTimer();
  
  const nextConfig = getBGM(nextTag);
  const nextAudio = wx.createInnerAudioContext();
  nextAudio.src = nextConfig.file;
  nextAudio.volume = 0;
  nextAudio.loop = nextConfig.loop;
  nextAudio.play();

  // 保存初始音量用于线性计算
  const startVolume = currentAudio ? currentAudio.volume : 0;
  const targetVolume = nextConfig.volume;
  
  // 简单线性淡入淡出
  const steps = 20;
  const interval = (duration * 1000) / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    
    if (currentAudio) {
      // 线性衰减：从startVolume到0
      currentAudio.volume = Math.max(0, startVolume * (1 - progress));
    }
    // 线性增长：从0到targetVolume
    nextAudio.volume = Math.min(targetVolume, targetVolume * progress);

    if (step >= steps) {
      clearInterval(timer);
      if (currentAudio) {
        currentAudio.stop();
        currentAudio.destroy();
      }
      nextAudio.volume = targetVolume;
      // 更新全局BGM实例引用，防止内存泄漏
      _currentBGMInstance = nextAudio;
    }
  }, interval);

  // 跟踪定时器以便后续清理
  _activeCrossfadeTimer = timer;

  return nextAudio;
}

/**
 * 内部工具：清理活跃的crossfade定时器
 */
function _clearCrossfadeTimer() {
  if (_activeCrossfadeTimer) {
    clearInterval(_activeCrossfadeTimer);
    _activeCrossfadeTimer = null;
  }
}

module.exports = { BGM_MAP, getBGM, playBGM, stopBGM, crossfadeBGM };

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
  emotional_buildup: { file: 'audio/bgm/emotional_buildup.mp3', volume: 0.45, loop: true }
};

/**
 * 根据bgmTag获取BGM配置
 */
function getBGM(tag) {
  return BGM_MAP[tag] || BGM_MAP.gentle_acoustic;
}

/**
 * 播放BGM（微信小游戏InnerAudioContext）
 */
function playBGM(tag) {
  const config = getBGM(tag);
  const audio = wx.createInnerAudioContext();
  audio.src = config.file;
  audio.volume = config.volume;
  audio.loop = config.loop;
  audio.play();
  return audio;
}

/**
 * 交叉淡入切换BGM
 */
function crossfadeBGM(currentAudio, nextTag, duration = 1.5) {
  const nextConfig = getBGM(nextTag);
  const nextAudio = wx.createInnerAudioContext();
  nextAudio.src = nextConfig.file;
  nextAudio.volume = 0;
  nextAudio.loop = nextConfig.loop;
  nextAudio.play();

  // 简单线性淡入淡出
  const steps = 20;
  const interval = (duration * 1000) / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    
    if (currentAudio) {
      currentAudio.volume = Math.max(0, (1 - progress) * currentAudio.volume);
    }
    nextAudio.volume = Math.min(nextConfig.volume, progress * nextConfig.volume);

    if (step >= steps) {
      clearInterval(timer);
      if (currentAudio) {
        currentAudio.stop();
        currentAudio.destroy();
      }
    }
  }, interval);

  return nextAudio;
}

module.exports = { BGM_MAP, getBGM, playBGM, crossfadeBGM };

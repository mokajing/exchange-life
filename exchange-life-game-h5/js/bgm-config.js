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
  farewell:          { file: 'audio/bgm/farewell.mp3',          volume: 0.3, loop: true },

  // === 末班车司机专用标签 (2026-06-14 P0第50卷) ===
  urban_night:       { file: 'audio/bgm/urban_night.mp3',       volume: 0.25, loop: true },
  melancholy_piano:  { file: 'audio/bgm/melancholy_piano.mp3',  volume: 0.3, loop: true },
  emotional_strings: { file: 'audio/bgm/emotional_strings.mp3', volume: 0.4, loop: true },
  solitude_piano:    { file: 'audio/bgm/solitude_piano.mp3',    volume: 0.25, loop: true },
  nostalgic_warm:    { file: 'audio/bgm/nostalgic_warm.mp3',    volume: 0.35, loop: true },
  warm_ending:       { file: 'audio/bgm/warm_ending.mp3',       volume: 0.35, loop: false },

  // === 清朝宫女出宫专用标签 (2026-06-15 P0第87卷) ===
  ancient_morning:   { file: 'audio/bgm/ancient_morning.mp3',   volume: 0.3, loop: true },
  street_market:     { file: 'audio/bgm/street_market.mp3',     volume: 0.35, loop: true },
  urban_confusion:   { file: 'audio/bgm/urban_confusion.mp3',   volume: 0.3, loop: true },
  gentle_hope:       { file: 'audio/bgm/gentle_hope.mp3',       volume: 0.35, loop: true },
  quiet_night:       { file: 'audio/bgm/quiet_night.mp3',       volume: 0.25, loop: true },

  // === 海上钻井平台工人专用标签 (2026-06-15 P0第85卷) ===
  industrial_tension:{ file: 'audio/bgm/industrial_tension.mp3',volume: 0.4, loop: true },
  ocean_waves:       { file: 'audio/bgm/ocean_waves.mp3',       volume: 0.3, loop: true },
  monotone_loop:     { file: 'audio/bgm/monotone_loop.mp3',     volume: 0.25, loop: true },
  lonely_piano:      { file: 'audio/bgm/lonely_piano.mp3',      volume: 0.3, loop: true },
  emergency_alarm:   { file: 'audio/bgm/emergency_alarm.mp3',   volume: 0.5, loop: false },
  warm_gathering:    { file: 'audio/bgm/warm_gathering.mp3',    volume: 0.35, loop: true },
  farewell_ocean:    { file: 'audio/bgm/farewell_ocean.mp3',    volume: 0.35, loop: true },

  // === 灯塔守护人专用标签 (2026-06-15 P0第90卷) ===
  ocean_calm:        { file: 'audio/bgm/ocean_calm.mp3',        volume: 0.3, loop: true },
  storm_tension:     { file: 'audio/bgm/storm_tension.mp3',     volume: 0.45, loop: true },
  lonely_waves:      { file: 'audio/bgm/lonely_waves.mp3',      volume: 0.25, loop: true },
  silence_after_storm:{ file: 'audio/bgm/silence_after_storm.mp3',volume: 0.2, loop: true },
  piano_farewell:    { file: 'audio/bgm/piano_farewell.mp3',    volume: 0.3, loop: true },
  cello_solitude:    { file: 'audio/bgm/cello_solitude.mp3',    volume: 0.3, loop: true },
  vocal_hope:        { file: 'audio/bgm/vocal_hope.mp3',        volume: 0.4, loop: true },
  piano_ascend:      { file: 'audio/bgm/piano_ascend.mp3',      volume: 0.35, loop: false },

  // === 退休第一天老干部专用标签 (2026-06-15 P0第110卷) ===
  empty_room_echo:   { file: 'audio/bgm/empty_room_echo.mp3',   volume: 0.25, loop: true },
  warm_acoustic:     { file: 'audio/bgm/warm_acoustic.mp3',     volume: 0.3, loop: true },
  nostalgic_music_box:{ file: 'audio/bgm/nostalgic_music_box.mp3',volume: 0.3, loop: true },
  warm_family:       { file: 'audio/bgm/warm_family.mp3',       volume: 0.35, loop: true },
  lonely_night:      { file: 'audio/bgm/lonely_night.mp3',      volume: 0.25, loop: true },
  deep_night_ambient:{ file: 'audio/bgm/deep_night_ambient.mp3',volume: 0.2, loop: true },

  // === 明朝海禁平行历史专用标签 (2026-06-15 P0第118卷) ===
  temple_ambient:    { file: 'audio/bgm/temple_ambient.mp3',    volume: 0.25, loop: true },
  harbor_morning:    { file: 'audio/bgm/harbor_morning.mp3',    volume: 0.35, loop: true },
  tea_house_negotiation: { file: 'audio/bgm/tea_house_negotiation.mp3', volume: 0.3, loop: true },
  letter_reading:    { file: 'audio/bgm/letter_reading.mp3',    volume: 0.3, loop: true },
  bureaucracy_tension: { file: 'audio/bgm/bureaucracy_tension.mp3', volume: 0.35, loop: true },
  family_dinner:     { file: 'audio/bgm/family_dinner.mp3',     volume: 0.3, loop: true },
  tension_rising:    { file: 'audio/bgm/tension_rising.mp3',    volume: 0.4, loop: true },
  night_sea_reflection: { file: 'audio/bgm/night_sea_reflection.mp3', volume: 0.3, loop: true },

  // === 雨水记忆师专用标签 (2026-06-15 P0第192轮) ===
  ambient_sparse:    { file: 'audio/bgm/ambient_sparse.mp3',    volume: 0.25, loop: true },
  warm_strings:      { file: 'audio/bgm/warm_strings.mp3',      volume: 0.35, loop: true },
  silence_metallic:  { file: 'audio/bgm/silence_metallic.mp3',  volume: 0.2, loop: true },
  symphony_rainbow:  { file: 'audio/bgm/symphony_rainbow.mp3',  volume: 0.5, loop: false },

  // === 明朝航海补充标签 (2026-06-15 P0第118卷扩展) ===
  ancient_ritual:    { file: 'audio/bgm/ancient_ritual.mp3',    volume: 0.25, loop: true },
  harbor_bustle:     { file: 'audio/bgm/harbor_bustle.mp3',     volume: 0.35, loop: true },
  tea_negotiation:   { file: 'audio/bgm/tea_negotiation.mp3',   volume: 0.3, loop: true },
  nostalgic_strings: { file: 'audio/bgm/nostalgic_strings.mp3', volume: 0.35, loop: true },
  // family_warmth 已在上方定义（volume: 0.35），此处移除重复定义
  uneasy_whispers:   { file: 'audio/bgm/uneasy_whispers.mp3',   volume: 0.3, loop: true },
  ocean_night:       { file: 'audio/bgm/ocean_night.mp3',       volume: 0.3, loop: true },

  // === 性别交换体验专用标签 (2026-06-15 P0第135卷) ===
  dreamy_electronic: { file: 'audio/bgm/dreamy_electronic.mp3', volume: 0.35, loop: true },
  ambient_noise:     { file: 'audio/bgm/ambient_noise.mp3',     volume: 0.2, loop: true },
  gentle_piano:      { file: 'audio/bgm/gentle_piano.mp3',      volume: 0.3, loop: true },
  upbeat_acoustic:   { file: 'audio/bgm/upbeat_acoustic.mp3',   volume: 0.4, loop: true },
  piano_solo:        { file: 'audio/bgm/piano_solo.mp3',        volume: 0.35, loop: false },
  warm_guitar:       { file: 'audio/bgm/warm_guitar.mp3',       volume: 0.35, loop: true },

  // === 重度口吃者求职面试专用标签 (2026-06-15 P0第140卷) ===
  morning_quiet:     { file: 'audio/bgm/morning_quiet.mp3',     volume: 0.25, loop: true },
  urban_anxiety:     { file: 'audio/bgm/urban_anxiety.mp3',     volume: 0.3, loop: true },
  tension_silence:   { file: 'audio/bgm/tension_silence.mp3',   volume: 0.2, loop: true },
  focus_flow:        { file: 'audio/bgm/focus_flow.mp3',        volume: 0.35, loop: true },
  city_afternoon:    { file: 'audio/bgm/city_afternoon.mp3',    volume: 0.3, loop: true },
  reflection_gentle: { file: 'audio/bgm/reflection_gentle.mp3', volume: 0.3, loop: true },

  // === 无火人类/马里商队专用标签 (2026-06-15 P0第143-144卷) ===
  primal_wind:       { file: 'audio/bgm/primal_wind.mp3',       volume: 0.3, loop: true },
  primal_mourn:      { file: 'audio/bgm/primal_mourn.mp3',      volume: 0.25, loop: true },
  primal_tension:    { file: 'audio/bgm/primal_tension.mp3',    volume: 0.35, loop: true },
  primal_dawn:       { file: 'audio/bgm/primal_dawn.mp3',       volume: 0.4, loop: true },
  desert_caravan:    { file: 'audio/bgm/desert_caravan.mp3',    volume: 0.35, loop: true },
  desert_storm:      { file: 'audio/bgm/desert_storm.mp3',      volume: 0.4, loop: true },
  desert_market:     { file: 'audio/bgm/desert_market.mp3',     volume: 0.3, loop: true },
  desert_night:      { file: 'audio/bgm/desert_night.mp3',      volume: 0.25, loop: true },

  // === 中年危机/铁路道口专用标签 (2026-06-15 P0第141-142卷) ===
  warm_morning:      { file: 'audio/bgm/warm_morning.mp3',      volume: 0.3, loop: true },
  silent_shock:      { file: 'audio/bgm/silent_shock.mp3',      volume: 0.2, loop: true },
  urban_solitude:    { file: 'audio/bgm/urban_solitude.mp3',    volume: 0.25, loop: true },
  anxiety_pulse:     { file: 'audio/bgm/anxiety_pulse.mp3',     volume: 0.3, loop: true },
  bittersweet_home:  { file: 'audio/bgm/bittersweet_home.mp3',  volume: 0.35, loop: true },
  quiet_resilience:  { file: 'audio/bgm/quiet_resilience.mp3',  volume: 0.25, loop: true },
  railway_dawn:      { file: 'audio/bgm/railway_dawn.mp3',      volume: 0.3, loop: true },
  farewell_whistle:  { file: 'audio/bgm/farewell_whistle.mp3',  volume: 0.35, loop: true },
  nostalgic_lunch:   { file: 'audio/bgm/nostalgic_lunch.mp3',   volume: 0.3, loop: true },
  quiet_companionship:{ file: 'audio/bgm/quiet_companionship.mp3', volume: 0.25, loop: true },
  unexpected_witness:{ file: 'audio/bgm/unexpected_witness.mp3',volume: 0.3, loop: true },
  vanishing_speed:   { file: 'audio/bgm/vanishing_speed.mp3',   volume: 0.35, loop: true },
  dignified_farewell:{ file: 'audio/bgm/dignified_farewell.mp3',volume: 0.3, loop: true },

  // === 唐朝胡姬酒肆专用标签 (2026-06-15 P0第147卷) ===
  market_morning:    { file: 'audio/bgm/market_morning.mp3',    volume: 0.3, loop: true },
  silk_road_bustle:  { file: 'audio/bgm/silk_road_bustle.mp3',  volume: 0.35, loop: true },
  guqin_pipa:        { file: 'audio/bgm/guqin_pipa.mp3',        volume: 0.3, loop: true },
  tension_resolve:   { file: 'audio/bgm/tension_resolve.mp3',   volume: 0.35, loop: true },
  homesick_night:    { file: 'audio/bgm/homesick_night.mp3',    volume: 0.25, loop: true },
  silence_heavy:     { file: 'audio/bgm/silence_heavy.mp3',     volume: 0.2, loop: true },

  // === 失读症大学生专用标签 (2026-06-15 P0第146卷) ===
  childhood_confusion:{ file: 'audio/bgm/childhood_confusion.mp3', volume: 0.25, loop: true },
  hospital_quiet:    { file: 'audio/bgm/hospital_quiet.mp3',    volume: 0.2, loop: true },
  achievement_warm:  { file: 'audio/bgm/achievement_warm.mp3',  volume: 0.35, loop: true },
  night_breakdown:   { file: 'audio/bgm/night_breakdown.mp3',   volume: 0.3, loop: true },
  healing_gentle:    { file: 'audio/bgm/healing_gentle.mp3',    volume: 0.3, loop: true },
  sunrise_hope:      { file: 'audio/bgm/sunrise_hope.mp3',      volume: 0.4, loop: false },

  // === 先天性无痛症患者专用标签 (2026-06-15 P0第157卷) ===
  metronome_beep:    { file: 'audio/bgm/metronome_beep.mp3',    volume: 0.25, loop: true },
  tense_pulse:       { file: 'audio/bgm/tense_pulse.mp3',       volume: 0.35, loop: true },
  muffled_playground:{ file: 'audio/bgm/muffled_playground.mp3',volume: 0.2, loop: true },
  cello_solo:        { file: 'audio/bgm/cello_solo.mp3',        volume: 0.3, loop: true },
  cello_maternal:    { file: 'audio/bgm/cello_maternal.mp3',    volume: 0.35, loop: true },
  gentle_strings:    { file: 'audio/bgm/gentle_strings.mp3',    volume: 0.3, loop: true },
  warm_quartet:      { file: 'audio/bgm/warm_quartet.mp3',      volume: 0.4, loop: false },

  // === 宋朝汴京夜市专用标签 (2026-06-15 P0第162卷) ===
  ancient_china_day:   { file: 'audio/bgm/ancient_china_day.mp3',   volume: 0.35, loop: true },
  ancient_china_tense: { file: 'audio/bgm/ancient_china_tense.mp3', volume: 0.4, loop: true },
  ancient_china_bustle:{ file: 'audio/bgm/ancient_china_bustle.mp3',volume: 0.45, loop: true },
  ancient_china_warm:  { file: 'audio/bgm/ancient_china_warm.mp3',  volume: 0.35, loop: true },
  ancient_china_night: { file: 'audio/bgm/ancient_china_night.mp3', volume: 0.3, loop: true },

  // === 火山科学家专用标签 (2026-06-15 P0第166卷) ===
  tension_low:         { file: 'audio/bgm/tension_low.mp3',         volume: 0.25, loop: true },
  tension_rising:      { file: 'audio/bgm/tension_rising.mp3',      volume: 0.35, loop: true },
  tension_silence:     { file: 'audio/bgm/tension_silence.mp3',     volume: 0.2, loop: true },
  solitude_calm:       { file: 'audio/bgm/solitude_calm.mp3',       volume: 0.25, loop: true },
  tension_peak:        { file: 'audio/bgm/tension_peak.mp3',        volume: 0.45, loop: true },
  resolution_peaceful: { file: 'audio/bgm/resolution_peaceful.mp3', volume: 0.35, loop: false },

  // === 百科编辑专用标签 (2026-06-15 P0第167卷) ===
  office_quiet:        { file: 'audio/bgm/office_quiet.mp3',        volume: 0.25, loop: true },
  melancholy_gentle:   { file: 'audio/bgm/melancholy_gentle.mp3',   volume: 0.3, loop: true },
  nature_peaceful:     { file: 'audio/bgm/nature_peaceful.mp3',     volume: 0.3, loop: true },
  industrial_rhythm:   { file: 'audio/bgm/industrial_rhythm.mp3',   volume: 0.35, loop: true },
  triumph_warm:        { file: 'audio/bgm/triumph_warm.mp3',        volume: 0.4, loop: false },

  // === 城中村拆迁户专用标签 (2026-06-15 P0第197卷) ===
  urban_morning:       { file: 'audio/bgm/urban_morning.mp3',       volume: 0.3, loop: true },

  // === 非遗传承人专用标签 (2026-06-16 P0第202卷) ===
  traditional_morning:    { file: 'audio/bgm/traditional_morning.mp3',    volume: 0.3, loop: true },
  melancholic_traditional:{ file: 'audio/bgm/melancholic_traditional.mp3',volume: 0.3, loop: true },
  craftsman_focus:        { file: 'audio/bgm/craftsman_focus.mp3',        volume: 0.35, loop: true },
  silent_moment:          { file: 'audio/bgm/silent_moment.mp3',          volume: 0.2, loop: true },
  urban_cold:             { file: 'audio/bgm/urban_cold.mp3',             volume: 0.3, loop: true },
  reflective_silence:     { file: 'audio/bgm/reflective_silence.mp3',     volume: 0.25, loop: true },
  generational_gap:       { file: 'audio/bgm/generational_gap.mp3',       volume: 0.3, loop: true },
  farewell_gentle:        { file: 'audio/bgm/farewell_gentle.mp3',        volume: 0.3, loop: true },

  // === 阅读障碍程序员专用标签 (2026-06-16 P0第207卷) ===
  discovery_spark:        { file: 'audio/bgm/discovery_spark.mp3',        volume: 0.35, loop: true },
  workplace_tension:      { file: 'audio/bgm/workplace_tension.mp3',      volume: 0.3, loop: true },
  breakthrough_light:     { file: 'audio/bgm/breakthrough_light.mp3',     volume: 0.4, loop: true },
  emotional_release:      { file: 'audio/bgm/emotional_release.mp3',      volume: 0.45, loop: false },
  connection_warm:        { file: 'audio/bgm/connection_warm.mp3',        volume: 0.35, loop: true },
  daily_peace:            { file: 'audio/bgm/daily_peace.mp3',            volume: 0.25, loop: true },
  academic_quiet:         { file: 'audio/bgm/academic_quiet.mp3',         volume: 0.25, loop: true },

  // === 水下考古队员专用标签 (2026-06-16 P0第225卷) ===
  ocean_night:            { file: 'audio/bgm/ocean_night.mp3',            volume: 0.25, loop: true },
  ocean_morning:          { file: 'audio/bgm/ocean_morning.mp3',          volume: 0.3, loop: true },
  deep_sea_silence:       { file: 'audio/bgm/deep_sea_silence.mp3',       volume: 0.2, loop: true },
  deep_sea_work:          { file: 'audio/bgm/deep_sea_work.mp3',          volume: 0.25, loop: true },
  discovery_cello:        { file: 'audio/bgm/discovery_cello.mp3',        volume: 0.4, loop: false },
  decompression_wait:     { file: 'audio/bgm/decompression_wait.mp3',     volume: 0.2, loop: true },
  surface_return:         { file: 'audio/bgm/surface_return.mp3',         volume: 0.35, loop: true },
  tension_underwater:     { file: 'audio/bgm/tension_underwater.mp3',     volume: 0.4, loop: true },
  lab_precision:          { file: 'audio/bgm/lab_precision.mp3',          volume: 0.25, loop: true },
  reunion_piano:          { file: 'audio/bgm/reunion_piano.mp3',          volume: 0.4, loop: false },
  evening_reflection:     { file: 'audio/bgm/evening_reflection.mp3',     volume: 0.3, loop: true },
  team_warmth:            { file: 'audio/bgm/team_warmth.mp3',            volume: 0.35, loop: true },
  night_ocean:            { file: 'audio/bgm/night_ocean.mp3',            volume: 0.2, loop: true },

  // === 模拟葬礼体验专用标签 (2026-06-16 P0第231卷) ===
  solemn_cello:           { file: 'audio/bgm/solemn_cello.mp3',           volume: 0.3, loop: true },
  mourning_vocal:         { file: 'audio/bgm/mourning_vocal.mp3',         volume: 0.35, loop: true },
  silence_heartbeat:      { file: 'audio/bgm/silence_heartbeat.mp3',      volume: 0.2, loop: true },
  ink_writing:            { file: 'audio/bgm/ink_writing.mp3',            volume: 0.25, loop: true },
  rebirth_piano:          { file: 'audio/bgm/rebirth_piano.mp3',          volume: 0.4, loop: false },
  evening_warmth:         { file: 'audio/bgm/evening_warmth.mp3',         volume: 0.3, loop: true },

  // === 地震搜救犬训导员专用标签 (2026-06-16 P0第272卷) ===
  urgent_drums:           { file: 'audio/bgm/urgent_drums.mp3',           volume: 0.45, loop: true },
  tension_strings:        { file: 'audio/bgm/tension_strings.mp3',        volume: 0.35, loop: true },
  dissonant_piano:        { file: 'audio/bgm/dissonant_piano.mp3',        volume: 0.3, loop: true },
  campfire_guitar:        { file: 'audio/bgm/campfire_guitar.mp3',        volume: 0.3, loop: true },
  hope_strings:           { file: 'audio/bgm/hope_strings.mp3',           volume: 0.4, loop: true },
  farewell_melody:        { file: 'audio/bgm/farewell_melody.mp3',        volume: 0.35, loop: false },

  // === 强迫症患者专用标签 (2026-06-16 P0第271卷) ===
  ticking_clock:          { file: 'audio/bgm/ticking_clock.mp3',          volume: 0.3, loop: true },
  anxiety_loop:           { file: 'audio/bgm/anxiety_loop.mp3',           volume: 0.35, loop: true },
  intrusive_pulse:        { file: 'audio/bgm/intrusive_pulse.mp3',        volume: 0.3, loop: true },
  breakthrough_clarinet:  { file: 'audio/bgm/breakthrough_clarinet.mp3',  volume: 0.4, loop: false },
  gentle_piano:           { file: 'audio/bgm/gentle_piano.mp3',           volume: 0.3, loop: true },
  morning_birds:          { file: 'audio/bgm/morning_birds.mp3',          volume: 0.35, loop: false },

  // === 选择性缄默症儿童专用标签 (2026-06-16 P0第270卷) ===
  silence_pressure:       { file: 'audio/bgm/silence_pressure.mp3',       volume: 0.25, loop: true },
  water_echo:             { file: 'audio/bgm/water_echo.mp3',             volume: 0.2, loop: true },
  crayon_asmr:            { file: 'audio/bgm/crayon_asmr.mp3',            volume: 0.25, loop: true },
  wind_chime_connection:  { file: 'audio/bgm/wind_chime_connection.mp3',  volume: 0.3, loop: false },
  lullaby_warmth:         { file: 'audio/bgm/lullaby_warmth.mp3',         volume: 0.35, loop: false },

  // === 全职妈妈与职场爸爸互换角色专用标签 (2026-06-16 P0第336卷) ===
  morning_rush_piano:     { file: 'audio/bgm/morning_rush_piano.mp3',     volume: 0.35, loop: true },
  office_tension_strings: { file: 'audio/bgm/office_tension_strings.mp3', volume: 0.3, loop: true },
  lonely_playground:      { file: 'audio/bgm/lonely_playground.mp3',      volume: 0.25, loop: true },
  emotional_release_piano:{ file: 'audio/bgm/emotional_release_piano.mp3',volume: 0.45, loop: false },
  reunion_warm_strings:   { file: 'audio/bgm/reunion_warm_strings.mp3',   volume: 0.4, loop: false },
  // county-bride-rich-family BGM tags
  tense_family_dinner:    { file: 'audio/bgm/tense_family_dinner.mp3',    volume: 0.35, loop: true },
  lonely_mansion_night:   { file: 'audio/bgm/lonely_mansion_night.mp3',   volume: 0.25, loop: true },
  painful_beauty_strings: { file: 'audio/bgm/painful_beauty_strings.mp3', volume: 0.35, loop: true },
  social_isolation_piano: { file: 'audio/bgm/social_isolation_piano.mp3', volume: 0.3, loop: true },
  bittersweet_homecoming: { file: 'audio/bgm/bittersweet_homecoming.mp3', volume: 0.35, loop: true },
  warm_storytelling_guitar:{ file: 'audio/bgm/warm_storytelling_guitar.mp3', volume: 0.4, loop: true },
  hopeful_growth_piano:   { file: 'audio/bgm/hopeful_growth_piano.mp3',   volume: 0.4, loop: false },
  // mortician-hand-warmth BGM tags
  solo_piano_night:       { file: 'audio/bgm/solo_piano_night.mp3',       volume: 0.3, loop: true },
  white_noise_heartbeat:  { file: 'audio/bgm/white_noise_heartbeat.mp3',  volume: 0.2, loop: true },
  // === 战地摄影师专用标签 (2026-06-16 P0第351卷) ===
  tense_strings_low:      { file: 'audio/bgm/tense_strings_low.mp3',      volume: 0.35, loop: true },
  ambient_war_distant:    { file: 'audio/bgm/ambient_war_distant.mp3',    volume: 0.25, loop: true },
  solo_cello_meditation:  { file: 'audio/bgm/solo_cello_meditation.mp3',  volume: 0.3, loop: true },
  silence_heartbeat:      { file: 'audio/bgm/silence_heartbeat.mp3',      volume: 0.2, loop: true },
  acoustic_guitar_farewell:{ file: 'audio/bgm/acoustic_guitar_farewell.mp3', volume: 0.35, loop: true },
  piano_echo_applause:    { file: 'audio/bgm/piano_echo_applause.mp3',    volume: 0.4, loop: false },
  warm_kitchen_piano:     { file: 'audio/bgm/warm_kitchen_piano.mp3',     volume: 0.3, loop: true },

  // === 记忆保鲜师专用标签 (2026-06-16 P0第357卷) ===
  ambient_memory_haze:    { file: 'audio/bgm/ambient_memory_haze.mp3',    volume: 0.25, loop: true },
  offkey_music_box:       { file: 'audio/bgm/offkey_music_box.mp3',       volume: 0.3, loop: true },
  ukulele_comedy:         { file: 'audio/bgm/ukulele_comedy.mp3',         volume: 0.35, loop: true },

  // === 色觉异常者专用标签 (2026-06-16 P0第374卷) ===
  string_melancholy:      { file: 'audio/bgm/string_melancholy.mp3',      volume: 0.3, loop: true },
  city_ambience:          { file: 'audio/bgm/city_ambience.mp3',          volume: 0.25, loop: true },
  office_tension_strings: { file: 'audio/bgm/office_tension_strings.mp3', volume: 0.3, loop: true },
  solo_piano_night:       { file: 'audio/bgm/solo_piano_night.mp3',       volume: 0.3, loop: true },
  emotional_release_piano:{ file: 'audio/bgm/emotional_release_piano.mp3',volume: 0.35, loop: false },
  reunion_warm_strings:   { file: 'audio/bgm/reunion_warm_strings.mp3',   volume: 0.35, loop: true },
  piano_reconciliation:   { file: 'audio/bgm/piano_reconciliation.mp3',   volume: 0.35, loop: false }
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

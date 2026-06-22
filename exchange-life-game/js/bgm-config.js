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
  piano_reconciliation:   { file: 'audio/bgm/piano_reconciliation.mp3',   volume: 0.35, loop: false },

  // === 北极种子库守门人专用标签 (2026-06-16 P0第379卷) ===
  arctic_wind_ambient:    { file: 'audio/bgm/arctic_wind_ambient.mp3',    volume: 0.25, loop: true },
  minimal_piano_arctic:   { file: 'audio/bgm/minimal_piano_arctic.mp3',   volume: 0.3, loop: true },
  blue_moment_piano:      { file: 'audio/bgm/blue_moment_piano.mp3',      volume: 0.3, loop: true },
  emotional_strings_cold: { file: 'audio/bgm/emotional_strings_cold.mp3', volume: 0.35, loop: true },
  lonely_white_noise:     { file: 'audio/bgm/lonely_white_noise.mp3',     volume: 0.2, loop: true },
  tense_arctic_silence:   { file: 'audio/bgm/tense_arctic_silence.mp3',   volume: 0.3, loop: true },
  urgent_minimal_beat:    { file: 'audio/bgm/urgent_minimal_beat.mp3',    volume: 0.4, loop: true },
  sunrise_warm_strings:   { file: 'audio/bgm/sunrise_warm_strings.mp3',   volume: 0.35, loop: false },

  // === 中年转型农民工专用标签 (2026-06-16 P0第383卷) ===
  urban_construction_ambient: { file: 'audio/bgm/urban_construction_ambient.mp3', volume: 0.25, loop: true },
  tense_minimal_piano:    { file: 'audio/bgm/tense_minimal_piano.mp3',    volume: 0.3, loop: true },
  urban_night_cool:       { file: 'audio/bgm/urban_night_cool.mp3',       volume: 0.3, loop: true },
  nostalgic_strings_warm: { file: 'audio/bgm/nostalgic_strings_warm.mp3', volume: 0.35, loop: true },
  rain_emotional_piano:   { file: 'audio/bgm/rain_emotional_piano.mp3',   volume: 0.3, loop: true },
  tense_minimal_beat:     { file: 'audio/bgm/tense_minimal_beat.mp3',     volume: 0.4, loop: true },
  family_warm_strings:    { file: 'audio/bgm/family_warm_strings.mp3',    volume: 0.35, loop: true },
  sunrise_gentle_strings: { file: 'audio/bgm/sunrise_gentle_strings.mp3', volume: 0.35, loop: false },

  // === 联觉者感官混融专用标签 (2026-06-16 P0第387卷) ===
  gentle_piano_curious:   { file: 'audio/bgm/gentle_piano_curious.mp3',   volume: 0.3, loop: true },
  morning_ambient_soft:   { file: 'audio/bgm/morning_ambient_soft.mp3',   volume: 0.25, loop: true },
  urban_transit_ambient:  { file: 'audio/bgm/urban_transit_ambient.mp3',  volume: 0.25, loop: true },
  peaceful_strings_warm:  { file: 'audio/bgm/peaceful_strings_warm.mp3',  volume: 0.35, loop: true },
  social_ambient_warm:    { file: 'audio/bgm/social_ambient_warm.mp3',    volume: 0.3, loop: true },
  night_calm_piano:       { file: 'audio/bgm/night_calm_piano.mp3',       volume: 0.3, loop: true },
  hopeful_strings_gentle: { file: 'audio/bgm/hopeful_strings_gentle.mp3', volume: 0.35, loop: false },

  // === 三国蜀汉木牛流马工匠专用标签 (2026-06-17 P0第472卷) ===
  ancient_court_tension:   { file: 'audio/bgm/ancient_court_tension.mp3',   volume: 0.35, loop: true },
  workshop_night_silence:  { file: 'audio/bgm/workshop_night_silence.mp3',  volume: 0.2, loop: true },
  guqin_epiphany_moment:   { file: 'audio/bgm/guqin_epiphany_moment.mp3',   volume: 0.4, loop: false },
  solemn_strings_ancient:  { file: 'audio/bgm/solemn_strings_ancient.mp3',  volume: 0.35, loop: true },
  triumph_drums_guqin:     { file: 'audio/bgm/triumph_drums_guqin.mp3',     volume: 0.45, loop: false },
  farewell_xiao_solo:      { file: 'audio/bgm/farewell_xiao_solo.mp3',      volume: 0.3, loop: false },
  legacy_guqin_fade:       { file: 'audio/bgm/legacy_guqin_fade.mp3',       volume: 0.3, loop: true },


  // === 蒙古戈壁游牧民专用标签 (2026-06-16 P0第398卷) ===
  gobi_wind_ambient:      { file: 'audio/bgm/gobi_wind_ambient.mp3',      volume: 0.25, loop: true },
  morin_khuur_tense:      { file: 'audio/bgm/morin_khuur_tense.mp3',      volume: 0.35, loop: true },
  camel_bell_distant:     { file: 'audio/bgm/camel_bell_distant.mp3',     volume: 0.3, loop: true },
  storm_white_noise:      { file: 'audio/bgm/storm_white_noise.mp3',      volume: 0.3, loop: true },
  warm_fire_tea:          { file: 'audio/bgm/warm_fire_tea.mp3',          volume: 0.35, loop: true },
  emotional_morin_khuur:  { file: 'audio/bgm/emotional_morin_khuur.mp3',  volume: 0.35, loop: true },
  night_camp_quiet:       { file: 'audio/bgm/night_camp_quiet.mp3',       volume: 0.25, loop: true },
  sunrise_gobi_warm:      { file: 'audio/bgm/sunrise_gobi_warm.mp3',      volume: 0.35, loop: false },

  // === 浏览器搜索历史纪录片专用标签 (2026-06-16 P0第404卷) ===
  search_history_opening: { file: 'audio/bgm/search_history_opening.mp3', volume: 0.3, loop: true },
  tense_minimal_beat:     { file: 'audio/bgm/tense_minimal_beat.mp3',     volume: 0.3, loop: true },
  emotional_strings_warm: { file: 'audio/bgm/emotional_strings_warm.mp3', volume: 0.35, loop: true },
  urban_night_cool:       { file: 'audio/bgm/urban_night_cool.mp3',       volume: 0.25, loop: true },
  nostalgic_piano_soft:   { file: 'audio/bgm/nostalgic_piano_soft.mp3',   volume: 0.3, loop: true },
  hopeful_strings_gentle_search: { file: 'audio/bgm/hopeful_strings_gentle_search.mp3', volume: 0.35, loop: false },
  sunrise_gentle_strings: { file: 'audio/bgm/sunrise_gentle_strings.mp3', volume: 0.35, loop: false },
  // 影子关系调解员 - 第417卷
  gentle_piano_curious:    { file: 'audio/bgm/gentle_piano_curious.mp3', volume: 0.35, loop: true },
  tense_minimal_piano:     { file: 'audio/bgm/tense_minimal_piano.mp3', volume: 0.4, loop: true },
  emotional_strings_cold:  { file: 'audio/bgm/emotional_strings_cold.mp3', volume: 0.35, loop: true },
  night_calm_piano:        { file: 'audio/bgm/night_calm_piano.mp3', volume: 0.3, loop: true },
  peaceful_strings_warm:   { file: 'audio/bgm/peaceful_strings_warm.mp3', volume: 0.35, loop: true },
  morning_ambient_soft:    { file: 'audio/bgm/morning_ambient_soft.mp3', volume: 0.3, loop: true },
  sunrise_gentle_strings:  { file: 'audio/bgm/sunrise_gentle_strings.mp3', volume: 0.35, loop: true },
  hopeful_strings_gentle:  { file: 'audio/bgm/hopeful_strings_gentle.mp3', volume: 0.35, loop: true },

  // === 兰纳佛牌铸造匠人专用标签 (2026-06-16 P0第412卷) ===
  temple_morning_chant:   { file: 'audio/bgm/temple_morning_chant.mp3',   volume: 0.25, loop: true },
  charcoal_crackling:     { file: 'audio/bgm/charcoal_crackling.mp3',     volume: 0.3, loop: true },
  molten_metal_pour:      { file: 'audio/bgm/molten_metal_pour.mp3',      volume: 0.35, loop: true },
  salaw_melancholy:       { file: 'audio/bgm/salaw_melancholy.mp3',       volume: 0.3, loop: true },
  gentle_strings_warm:    { file: 'audio/bgm/gentle_strings_warm.mp3',    volume: 0.35, loop: true },
  night_market_distant:   { file: 'audio/bgm/night_market_distant.mp3',   volume: 0.25, loop: true },
  incense_burning:        { file: 'audio/bgm/incense_burning.mp3',        volume: 0.2, loop: true },
  filing_rhythm:          { file: 'audio/bgm/filing_rhythm.mp3',          volume: 0.3, loop: true }
,

  // === AI人生评分日专用标签 (2026-06-16 P0第423卷) ===
  morning_electronic_light:   { file: 'audio/bgm/morning_electronic_light.mp3',   volume: 0.3, loop: true },
  tense_mechanical_beat:      { file: 'audio/bgm/tense_mechanical_beat.mp3',      volume: 0.35, loop: true },
  urban_cafeteria_ambient:    { file: 'audio/bgm/urban_cafeteria_ambient.mp3',    volume: 0.25, loop: true },
  tense_corporate_ambient:    { file: 'audio/bgm/tense_corporate_ambient.mp3',    volume: 0.3, loop: true },
  night_emotional_piano:      { file: 'audio/bgm/night_emotional_piano.mp3',      volume: 0.35, loop: true },
  emotional_silence_then_strings: { file: 'audio/bgm/emotional_silence_then_strings.mp3', volume: 0.4, loop: false },
  night_nature_ambient:       { file: 'audio/bgm/night_nature_ambient.mp3',       volume: 0.25, loop: true },
  // === ADHD成人女性职场伪装专用标签 (2026-06-16 P0第431卷) ===
  morning_ambient_slow:    { file: 'audio/bgm/morning_ambient_slow.mp3',    volume: 0.25, loop: true },
  tense_minimal_beat:      { file: 'audio/bgm/tense_minimal_beat.mp3',      volume: 0.3, loop: true },
  office_ambient_quiet:    { file: 'audio/bgm/office_ambient_quiet.mp3',    volume: 0.2, loop: true },
  metronome_ticking:       { file: 'audio/bgm/metronome_ticking.mp3',       volume: 0.25, loop: true },
  light_piano_flow:        { file: 'audio/bgm/light_piano_flow.mp3',        volume: 0.35, loop: true },
  cafe_ambient_distant:    { file: 'audio/bgm/cafe_ambient_distant.mp3',    volume: 0.2, loop: true },
  glitch_static_tone:      { file: 'audio/bgm/glitch_static_tone.mp3',      volume: 0.3, loop: true },
  enclosed_breathing:      { file: 'audio/bgm/enclosed_breathing.mp3',      volume: 0.25, loop: true },
  office_evening_calm:     { file: 'audio/bgm/office_evening_calm.mp3',     volume: 0.25, loop: true },
  evening_silence:         { file: 'audio/bgm/evening_silence.mp3',         volume: 0.2, loop: true },
  lofi_night_loop:         { file: 'audio/bgm/lofi_night_loop.mp3',         volume: 0.3, loop: true },
  // === 产后第一年新手妈妈专用标签 ===
  minimal_piano_single:   { file: 'audio/bgm/minimal_piano_single.mp3',   volume: 0.25, loop: true },
  night_silence_breath:   { file: 'audio/bgm/night_silence_breath.mp3',   volume: 0.2, loop: true },
  low_freq_white_noise:   { file: 'audio/bgm/low_freq_white_noise.mp3',   volume: 0.15, loop: true },
  heartbeat_muffled:      { file: 'audio/bgm/heartbeat_muffled.mp3',      volume: 0.25, loop: true },
  phone_screen_glow:      { file: 'audio/bgm/phone_screen_glow.mp3',      volume: 0.2, loop: true },
  crossroads_ambient:     { file: 'audio/bgm/crossroads_ambient.mp3',     volume: 0.3, loop: true },
  cello_warm_synth:       { file: 'audio/bgm/cello_warm_synth.mp3',       volume: 0.35, loop: true },
  morning_birds_dream:    { file: 'audio/bgm/morning_birds_dream.mp3',    volume: 0.3, loop: true },
  gentle_resolution:      { file: 'audio/bgm/gentle_resolution.mp3',      volume: 0.35, loop: true },

  // === 镜中平行人生专用标签 (2026-06-16 P0第439卷) ===
  glass_resonance_tone:   { file: 'audio/bgm/glass_resonance_tone.mp3',   volume: 0.3, loop: true },
  dissonant_strings_loop: { file: 'audio/bgm/dissonant_strings_loop.mp3', volume: 0.35, loop: true },
  melancholy_cello_drone: { file: 'audio/bgm/melancholy_cello_drone.mp3', volume: 0.3, loop: true },
  warm_acoustic_resolve:  { file: 'audio/bgm/warm_acoustic_resolve.mp3',  volume: 0.35, loop: false },

  // === 排爆警察拆弹现场专用标签 (2026-06-16 P0第450卷) ===
  bomb_disposal_tension:   { file: 'audio/bgm/bomb_disposal_tension.mp3',   volume: 0.4, loop: true },
  heartbeat_isolated:     { file: 'audio/bgm/heartbeat_isolated.mp3',     volume: 0.35, loop: true },
  timer_countdown_low:    { file: 'audio/bgm/timer_countdown_low.mp3',    volume: 0.3, loop: true },
  silence_after_blast:    { file: 'audio/bgm/silence_after_blast.mp3',    volume: 0.2, loop: false },

  // === 独自过年年轻人专用标签 (2026-06-16 P0第453卷) ===
  warm_family_distant:    { file: 'audio/bgm/warm_family_distant.mp3',    volume: 0.3, loop: true },
  festive_bgm_muffled:    { file: 'audio/bgm/festive_bgm_muffled.mp3',    volume: 0.25, loop: true },
  lofi_afternoon_quiet:   { file: 'audio/bgm/lofi_afternoon_quiet.mp3',   volume: 0.25, loop: true },
  afternoon_silence_loop: { file: 'audio/bgm/afternoon_silence_loop.mp3', volume: 0.2, loop: true },
  dusk_strings_low:       { file: 'audio/bgm/dusk_strings_low.mp3',       volume: 0.3, loop: true },
  tv_ambient_warm:        { file: 'audio/bgm/tv_ambient_warm.mp3',        volume: 0.25, loop: true },
  silence_with_water:     { file: 'audio/bgm/silence_with_water.mp3',     volume: 0.2, loop: true },
  fireworks_piano_high:   { file: 'audio/bgm/fireworks_piano_high.mp3',   volume: 0.4, loop: false },
  night_silence_soft:     { file: 'audio/bgm/night_silence_soft.mp3',     volume: 0.15, loop: true },
  electronic_tension_low:     { file: 'audio/bgm/electronic_tension_low.mp3', volume: 0.35, loop: true },
  notification_ping_cold:     { file: 'audio/bgm/notification_ping_cold.mp3', volume: 0.3, loop: false },
  typing_frantic_loop:     { file: 'audio/bgm/typing_frantic_loop.mp3', volume: 0.3, loop: true },
  piano_guilt_soft:     { file: 'audio/bgm/piano_guilt_soft.mp3', volume: 0.3, loop: true },
  silence_pressure_low:     { file: 'audio/bgm/silence_pressure_low.mp3', volume: 0.2, loop: true },
  synth_moral_ambiguity:     { file: 'audio/bgm/synth_moral_ambiguity.mp3', volume: 0.35, loop: true },
  alarm_social_dread:     { file: 'audio/bgm/alarm_social_dread.mp3', volume: 0.4, loop: false },
  piano_warmth_return:     { file: 'audio/bgm/piano_warmth_return.mp3', volume: 0.35, loop: true },
  acoustic_release_gentle:     { file: 'audio/bgm/acoustic_release_gentle.mp3', volume: 0.3, loop: true },
  rain_strings_melancholy:     { file: 'audio/bgm/rain_strings_melancholy.mp3', volume: 0.35, loop: true },
  rejection_loop_cold:     { file: 'audio/bgm/rejection_loop_cold.mp3', volume: 0.3, loop: true },
  transition_quiet_resolve:     { file: 'audio/bgm/transition_quiet_resolve.mp3', volume: 0.3, loop: true },
  repetitive_rhythm_work:     { file: 'audio/bgm/repetitive_rhythm_work.mp3', volume: 0.25, loop: true },
  silence_dignity_hold:     { file: 'audio/bgm/silence_dignity_hold.mp3', volume: 0.2, loop: true },
  silence_tension_unspoken:     { file: 'audio/bgm/silence_tension_unspoken.mp3', volume: 0.25, loop: true },
  warmth_human_connection:     { file: 'audio/bgm/warmth_human_connection.mp3', volume: 0.35, loop: true },
  growth_gentle_ascent:     { file: 'audio/bgm/growth_gentle_ascent.mp3', volume: 0.35, loop: true },
  applause_emotional_peak:     { file: 'audio/bgm/applause_emotional_peak.mp3', volume: 0.5, loop: false },
  night_hope_acoustic:     { file: 'audio/bgm/night_hope_acoustic.mp3', volume: 0.3, loop: true },
  dawn_acoustic_walk:     { file: 'audio/bgm/dawn_acoustic_walk.mp3', volume: 0.3, loop: true },
  village_morning_warmth:     { file: 'audio/bgm/village_morning_warmth.mp3', volume: 0.35, loop: true },
  wind_cliff_tension:     { file: 'audio/bgm/wind_cliff_tension.mp3', volume: 0.35, loop: true },
  letter_reading_silence:     { file: 'audio/bgm/letter_reading_silence.mp3', volume: 0.25, loop: true },
  stream_nature_peace:     { file: 'audio/bgm/stream_nature_peace.mp3', volume: 0.25, loop: true },
  remote_village_quiet:     { file: 'audio/bgm/remote_village_quiet.mp3', volume: 0.25, loop: true },
  rain_heroic_mission:     { file: 'audio/bgm/rain_heroic_mission.mp3', volume: 0.4, loop: true },
  sunset_return_gentle:     { file: 'audio/bgm/sunset_return_gentle.mp3', volume: 0.3, loop: true },
  farewell_bittersweet_strings:     { file: 'audio/bgm/farewell_bittersweet_strings.mp3', volume: 0.35, loop: true },
  ending_mountains_memory:     { file: 'audio/bgm/ending_mountains_memory.mp3', volume: 0.35, loop: true },
  // === 阿克苏姆方尖碑雕刻匠专用标签 (2026-06-17 P0第464卷) ===
  ancient_stone_chisel:   { file: 'audio/bgm/ancient_stone_chisel.mp3',   volume: 0.3, loop: true },

  // === 网红主播转实体店专用标签 (2026-06-17 P0第463卷) ===
  lofi_afternoon_quiet:   { file: 'audio/bgm/lofi_afternoon_quiet.mp3',   volume: 0.25, loop: true },
  afternoon_silence_loop: { file: 'audio/bgm/afternoon_silence_loop.mp3', volume: 0.2, loop: true },
  tv_ambient_warm:        { file: 'audio/bgm/tv_ambient_warm.mp3',        volume: 0.25, loop: true },

  // === 航空灾难调查员专用标签 (2026-06-17 P0第462卷) ===
  enclosed_breathing:     { file: 'audio/bgm/enclosed_breathing.mp3',     volume: 0.25, loop: true },
  glitch_static_tone:     { file: 'audio/bgm/glitch_static_tone.mp3',     volume: 0.3, loop: true },
  metronome_ticking:      { file: 'audio/bgm/metronome_ticking.mp3',      volume: 0.3, loop: true }


,

  // === 刑警与心理咨询师互换专用标签 (2026-06-17 P0第465卷) ===
  high_tension_suspense:   { file: 'audio/bgm/high_tension_suspense.mp3',   volume: 0.4, loop: true },
  urban_night_tension:     { file: 'audio/bgm/urban_night_tension.mp3',     volume: 0.35, loop: true },
  silence_with_piano:      { file: 'audio/bgm/silence_with_piano.mp3',      volume: 0.25, loop: true },
  gentle_strings_slow:     { file: 'audio/bgm/gentle_strings_slow.mp3',     volume: 0.3, loop: true },
  tension_release_chord:   { file: 'audio/bgm/tension_release_chord.mp3',   volume: 0.4, loop: false },
  triumph_warm_strings:    { file: 'audio/bgm/triumph_warm_strings.mp3',    volume: 0.45, loop: false },
  // === 胡里族假发匠人 & 退休干部专用标签 (2026-06-17 P0第466-467卷) ===
  silence_with_water       : { file: 'audio/bgm/silence_with_water.mp3', volume: 0.2, loop: true },
  afternoon_silence_loop   : { file: 'audio/bgm/afternoon_silence_loop.mp3', volume: 0.2, loop: true },
  dusk_strings_low         : { file: 'audio/bgm/dusk_strings_low.mp3', volume: 0.3, loop: true },
  warm_family_distant      : { file: 'audio/bgm/warm_family_distant.mp3', volume: 0.3, loop: true },
  festive_bgm_muffled      : { file: 'audio/bgm/festive_bgm_muffled.mp3', volume: 0.35, loop: true },
  fireworks_piano_high     : { file: 'audio/bgm/fireworks_piano_high.mp3', volume: 0.4, loop: false },
  night_silence_soft       : { file: 'audio/bgm/night_silence_soft.mp3', volume: 0.2, loop: true },
  morning_silence_soft     : { file: 'audio/bgm/morning_silence_soft.mp3', volume: 0.2, loop: true },
  silence_with_piano       : { file: 'audio/bgm/silence_with_piano.mp3', volume: 0.25, loop: true },
  lofi_afternoon_quiet     : { file: 'audio/bgm/lofi_afternoon_quiet.mp3', volume: 0.25, loop: true },

  // === 古墓壁画修复师专用标签 (2026-06-17 P0第470卷) ===
  tomb_ambient_low:        { file: 'audio/bgm/tomb_ambient_low.mp3',        volume: 0.2, loop: true },
  silence_with_drip:       { file: 'audio/bgm/silence_with_drip.mp3',       volume: 0.15, loop: true },
  asmr_scratch_soft:       { file: 'audio/bgm/asmr_scratch_soft.mp3',       volume: 0.25, loop: true },
  ancient_reveal_chime:    { file: 'audio/bgm/ancient_reveal_chime.mp3',    volume: 0.4, loop: false },
  tension_heartbeat:       { file: 'audio/bgm/tension_heartbeat.mp3',       volume: 0.35, loop: true },
  mystery_glow_soft:       { file: 'audio/bgm/mystery_glow_soft.mp3',       volume: 0.25, loop: true },
  farewell_guqin:          { file: 'audio/bgm/farewell_guqin.mp3',          volume: 0.3, loop: false },

  // === 菜鸟驿站取件员专用标签 (2026-06-17 P0第469卷) ===
  urban_morning_bustle:    { file: 'audio/bgm/urban_morning_bustle.mp3',    volume: 0.3, loop: true },
  warm_strings_gentle:     { file: 'audio/bgm/warm_strings_gentle.mp3',     volume: 0.35, loop: true },
  tense_beat_fast:         { file: 'audio/bgm/tense_beat_fast.mp3',         volume: 0.4, loop: true },
  warm_piano_gentle:       { file: 'audio/bgm/warm_piano_gentle.mp3',       volume: 0.3, loop: true },
  tension_minimal:         { file: 'audio/bgm/tension_minimal.mp3',         volume: 0.3, loop: true },
  night_farewell_piano:    { file: 'audio/bgm/night_farewell_piano.mp3',    volume: 0.3, loop: false },
  // === 玛雅天文祭司专用标签 (2026-06-17 P0第472卷) ===
  ancient_flute_calm:      { file: 'audio/bgm/ancient_flute_calm.mp3',      volume: 0.3, loop: true },
  tension_distant_drums:   { file: 'audio/bgm/tension_distant_drums.mp3',   volume: 0.35, loop: true },
  ritual_drums_tension:    { file: 'audio/bgm/ritual_drums_tension.mp3',    volume: 0.4, loop: true },
  silence_then_flute:      { file: 'audio/bgm/silence_then_flute.mp3',      volume: 0.25, loop: false },
  melancholy_flute_long:   { file: 'audio/bgm/melancholy_flute_long.mp3',   volume: 0.35, loop: true },
  hopeful_strings_gentle:  { file: 'audio/bgm/hopeful_strings_gentle.mp3',  volume: 0.35, loop: false },

  // === 死刑执行法警专用标签 (2026-06-17 P0第471卷) ===
  rain_piano_minimal:      { file: 'audio/bgm/rain_piano_minimal.mp3',      volume: 0.25, loop: true },
  silence_with_rain:       { file: 'audio/bgm/silence_with_rain.mp3',       volume: 0.2, loop: true },
  silence_tension_low:     { file: 'audio/bgm/silence_tension_low.mp3',     volume: 0.2, loop: true },
  heartbeat_slow:          { file: 'audio/bgm/heartbeat_slow.mp3',          volume: 0.3, loop: true },
  silence_three_seconds:   { file: 'audio/bgm/silence_three_seconds.mp3',   volume: 0.0, loop: false },
  empty_corridor_echo:     { file: 'audio/bgm/empty_corridor_echo.mp3',     volume: 0.2, loop: true },
  pen_on_paper_quiet:      { file: 'audio/bgm/pen_on_paper_quiet.mp3',      volume: 0.2, loop: true },
  muted_restaurant_warm:   { file: 'audio/bgm/muted_restaurant_warm.mp3',   volume: 0.25, loop: true },
  warm_home_evening:       { file: 'audio/bgm/warm_home_evening.mp3',       volume: 0.3, loop: true },
  night_strings_gentle:    { file: 'audio/bgm/night_strings_gentle.mp3',    volume: 0.25, loop: true },

  // === 气味翻译师专用标签 (2026-06-17 P0第470卷) ===
  lofi_chill_piano:        { file: 'audio/bgm/lofi_chill_piano.mp3',        volume: 0.3, loop: true },
  gentle_strings_slow:     { file: 'audio/bgm/gentle_strings_slow.mp3',     volume: 0.3, loop: true },
  tension_low_synth:       { file: 'audio/bgm/tension_low_synth.mp3',       volume: 0.3, loop: true },
  cello_solo_gentle:       { file: 'audio/bgm/cello_solo_gentle.mp3',       volume: 0.35, loop: false },
  warm_piano_simple:       { file: 'audio/bgm/warm_piano_simple.mp3',       volume: 0.3, loop: true },
  love_theme_gentle:       { file: 'audio/bgm/love_theme_gentle.mp3',       volume: 0.35, loop: false },
  reflection_piano_soft:   { file: 'audio/bgm/reflection_piano_soft.mp3',   volume: 0.3, loop: true },

  // === 闹钟语音批评家的一周专用标签 (2026-06-17 P0第462卷) ===
  urban_night_ambient:    { file: 'audio/bgm/urban_night_ambient.mp3',    volume: 0.25, loop: true },
  electronic_beep_soft:   { file: 'audio/bgm/electronic_beep_soft.mp3',   volume: 0.2, loop: true },
  anxiety_pulse_digital:  { file: 'audio/bgm/anxiety_pulse_digital.mp3',  volume: 0.3, loop: true },
  social_media_noise:     { file: 'audio/bgm/social_media_noise.mp3',     volume: 0.25, loop: true },
  morning_silence_warm:   { file: 'audio/bgm/morning_silence_warm.mp3',   volume: 0.25, loop: true }
,

  // === 男消防员与女产科医生互换身体专用标签 (2026-06-18 P0第517卷) ===
  tense_heartbeat:         { file: 'audio/bgm/tense_heartbeat.mp3',         volume: 0.35, loop: true },
  silence_then_cry:        { file: 'audio/bgm/silence_then_cry.mp3',        volume: 0.4, loop: false },
  low_hum_fever:           { file: 'audio/bgm/low_hum_fever.mp3',           volume: 0.2, loop: true },

  // === 三国蜀汉木牛流马工匠专用标签 (2026-06-17 P0第472卷) ===
  ancient_qin_tension:     { file: 'audio/bgm/ancient_qin_tension.mp3',     volume: 0.35, loop: true },
  workshop_silence_night:  { file: 'audio/bgm/workshop_silence_night.mp3',  volume: 0.2, loop: true },
  insight_strings_rising:  { file: 'audio/bgm/insight_strings_rising.mp3',  volume: 0.4, loop: false },
  solemn_guqin_moment:     { file: 'audio/bgm/solemn_guqin_moment.mp3',     volume: 0.35, loop: true },
  triumph_drums_qin:       { file: 'audio/bgm/triumph_drums_qin.mp3',       volume: 0.45, loop: false },
  dawn_workshop_quiet:     { file: 'audio/bgm/dawn_workshop_quiet.mp3',     volume: 0.25, loop: true },
  farewell_xiao_distant:   { file: 'audio/bgm/farewell_xiao_distant.mp3',   volume: 0.3, loop: true },
  echo_guqin_fade:         { file: 'audio/bgm/echo_guqin_fade.mp3',         volume: 0.25, loop: true },


  // === 穆尔西族唇盘成人礼专用标签 (2026-06-17 P0第471卷) ===
  african_drums_gentle:    { file: 'audio/bgm/african_drums_gentle.mp3',    volume: 0.3, loop: true },
  ritual_chant_morning:    { file: 'audio/bgm/ritual_chant_morning.mp3',    volume: 0.35, loop: true },
  healing_silence_wind:    { file: 'audio/bgm/healing_silence_wind.mp3',    volume: 0.25, loop: true },
  market_bustle_colors:    { file: 'audio/bgm/market_bustle_colors.mp3',    volume: 0.4, loop: true },
  time_passing_river:      { file: 'audio/bgm/time_passing_river.mp3',      volume: 0.3, loop: true },
  river_reflection_krar:   { file: 'audio/bgm/river_reflection_krar.mp3',   volume: 0.35, loop: false },
  legacy_warm_strings:     { file: 'audio/bgm/legacy_warm_strings.mp3',     volume: 0.35, loop: true },

  // === 三国蜀汉木牛流马工匠专用标签 (2026-06-17 P0第472卷) ===
  ancient_qin_tension:    { file: 'audio/bgm/ancient_qin_tension.mp3',    volume: 0.35, loop: true },
  workshop_silence_night: { file: 'audio/bgm/workshop_silence_night.mp3', volume: 0.2, loop: true },
  insight_strings_rising: { file: 'audio/bgm/insight_strings_rising.mp3', volume: 0.4, loop: false },
  solemn_guqin_moment:    { file: 'audio/bgm/solemn_guqin_moment.mp3',    volume: 0.3, loop: true },
  triumph_drums_qin:      { file: 'audio/bgm/triumph_drums_qin.mp3',      volume: 0.5, loop: false },
  dawn_workshop_quiet:    { file: 'audio/bgm/dawn_workshop_quiet.mp3',    volume: 0.25, loop: true },
  farewell_xiao_distant:  { file: 'audio/bgm/farewell_xiao_distant.mp3',  volume: 0.3, loop: true },
  echo_guqin_fade:        { file: 'audio/bgm/echo_guqin_fade.mp3',        volume: 0.25, loop: true },

  // === 气味翻译师的第一个月专用标签 (2026-06-17 P0第470卷) ===
  lofi_chill_piano:       { file: 'audio/bgm/lofi_chill_piano.mp3',       volume: 0.3, loop: true },
  gentle_strings_slow:    { file: 'audio/bgm/gentle_strings_slow.mp3',    volume: 0.3, loop: true },
  tension_low_synth:      { file: 'audio/bgm/tension_low_synth.mp3',      volume: 0.35, loop: true },
  cello_solo_gentle:      { file: 'audio/bgm/cello_solo_gentle.mp3',      volume: 0.3, loop: true },
  warm_piano_simple:      { file: 'audio/bgm/warm_piano_simple.mp3',      volume: 0.3, loop: true },
  love_theme_gentle:      { file: 'audio/bgm/love_theme_gentle.mp3',      volume: 0.35, loop: true },
  reflection_piano_soft:  { file: 'audio/bgm/reflection_piano_soft.mp3',  volume: 0.25, loop: true },


  // === PTSD患者日常生活专用标签 (2026-06-17 P0第477卷) ===
  dark_ambient_heartbeat:     { file: 'audio/bgm/dark_ambient_heartbeat.mp3',     volume: 0.25, loop: true },
  tension_low_synth_ptsd:     { file: 'audio/bgm/tension_low_synth_ptsd.mp3',     volume: 0.3, loop: true },
  distorted_heartbeat_rising: { file: 'audio/bgm/distorted_heartbeat_rising.mp3', volume: 0.4, loop: true },
  office_muffled_ambient:     { file: 'audio/bgm/office_muffled_ambient.mp3',     volume: 0.2, loop: true },
  silence_then_piano:         { file: 'audio/bgm/silence_then_piano.mp3',         volume: 0.3, loop: false },
  white_noise_gentle:         { file: 'audio/bgm/white_noise_gentle.mp3',         volume: 0.2, loop: true },
  minimal_piano_repeat:       { file: 'audio/bgm/minimal_piano_repeat.mp3',       volume: 0.25, loop: true },

  // === 迈锡尼线形文字B书吏专用标签 (2026-06-17 P0第475卷) ===
  ancient_lyre_morning:       { file: 'audio/bgm/ancient_lyre_morning.mp3',       volume: 0.3, loop: true },
  tension_bronze_drums:       { file: 'audio/bgm/tension_bronze_drums.mp3',       volume: 0.35, loop: true },
  solemn_chant_ancient:       { file: 'audio/bgm/solemn_chant_ancient.mp3',       volume: 0.3, loop: true },
  fire_crackling_silence:     { file: 'audio/bgm/fire_crackling_silence.mp3',     volume: 0.35, loop: true },
  wind_ruins_lament:          { file: 'audio/bgm/wind_ruins_lament.mp3',          volume: 0.25, loop: true },
  museum_quiet_wonder:        { file: 'audio/bgm/museum_quiet_wonder.mp3',        volume: 0.3, loop: false },

  // === 明朝紫禁城更夫专用标签 (2026-06-17 P0第478卷) ===
  ancient_night_silence:    { file: 'audio/bgm/ancient_night_silence.mp3',    volume: 0.25, loop: true },
  solemn_bangzi_echo:       { file: 'audio/bgm/solemn_bangzi_echo.mp3',       volume: 0.3, loop: false },
  tension_night_alert:      { file: 'audio/bgm/tension_night_alert.mp3',      volume: 0.35, loop: true },
  warm_strings_gentle:      { file: 'audio/bgm/warm_strings_gentle.mp3',      volume: 0.3, loop: true },
  lonely_wind_cold:         { file: 'audio/bgm/lonely_wind_cold.mp3',         volume: 0.25, loop: true },
  ancient_guard_tension:    { file: 'audio/bgm/ancient_guard_tension.mp3',    volume: 0.3, loop: true },
  dawn_triumph_drum:        { file: 'audio/bgm/dawn_triumph_drum.mp3',        volume: 0.4, loop: false },
  morning_calm_fade:        { file: 'audio/bgm/morning_calm_fade.mp3',        volume: 0.25, loop: true },

  // === 社区团购团长专用标签 (2026-06-17 P0第478卷) ===
  morning_quiet_start:      { file: 'audio/bgm/morning_quiet_start.mp3',      volume: 0.3, loop: true },
  busy_morning_rhythm:      { file: 'audio/bgm/busy_morning_rhythm.mp3',      volume: 0.35, loop: true },
  gentle_care_warmth:       { file: 'audio/bgm/gentle_care_warmth.mp3',       volume: 0.3, loop: true },
  busy_evening_pulse:       { file: 'audio/bgm/busy_evening_pulse.mp3',       volume: 0.35, loop: true }
,

  // === 北非柏柏尔纹身师专用标签 (2026-06-17 P0第487卷) ===
  morning_oud_meditation:   { file: 'audio/bgm/morning_oud_meditation.mp3',   volume: 0.3, loop: true },
  ahidous_chant_distant:    { file: 'audio/bgm/ahidous_chant_distant.mp3',    volume: 0.35, loop: false },
  sunset_oud_farewell:      { file: 'audio/bgm/sunset_oud_farewell.mp3',      volume: 0.3, loop: true }
,
  // === 印度梅加拉亚邦活根桥守护者专用标签 (2026-06-18 P0第497卷) ===
  rain_forest_ambient:     { file: 'audio/bgm/rain_forest_ambient.mp3',     volume: 0.25, loop: true },
  gentle_growth_patience:  { file: 'audio/bgm/gentle_growth_patience.mp3',  volume: 0.3, loop: true },
  weaving_rhythm_ancient:  { file: 'audio/bgm/weaving_rhythm_ancient.mp3',  volume: 0.3, loop: true },
  tension_low_strings:     { file: 'audio/bgm/tension_low_strings.mp3',     volume: 0.3, loop: true },
  triumph_after_storm:     { file: 'audio/bgm/triumph_after_storm.mp3',     volume: 0.4, loop: false },
  silence_rain_distant:    { file: 'audio/bgm/silence_rain_distant.mp3',    volume: 0.2, loop: true },
  legacy_hope_gentle:      { file: 'audio/bgm/legacy_hope_gentle.mp3',      volume: 0.35, loop: false },

  // === 智龙人智慧爬行文明专用标签 (2026-06-18 P0第499卷) ===
  alien_awakening_ambient:  { file: 'audio/bgm/alien_awakening_ambient.mp3',  volume: 0.3, loop: true },
  warm_clutch_heartbeat:    { file: 'audio/bgm/warm_clutch_heartbeat.mp3',    volume: 0.35, loop: true },
  organic_steam_city:       { file: 'audio/bgm/organic_steam_city.mp3',       volume: 0.3, loop: true },
  assembly_tension_drums:   { file: 'audio/bgm/assembly_tension_drums.mp3',   volume: 0.35, loop: true },
  two_heartbeats_converge:  { file: 'audio/bgm/two_heartbeats_converge.mp3',  volume: 0.3, loop: false },
  clutch_warmth_fadeout:    { file: 'audio/bgm/clutch_warmth_fadeout.mp3',    volume: 0.35, loop: true },
  gentle_return_piano:      { file: 'audio/bgm/gentle_return_piano.mp3',      volume: 0.3, loop: false }
,
  // === 凌晨菜市场摊贩专用标签 (2026-06-18 P0第502卷) ===
  dawn_silence_piano:      { file: 'audio/bgm/dawn_silence_piano.mp3',      volume: 0.25, loop: true },
  market_bustle_strings:   { file: 'audio/bgm/market_bustle_strings.mp3',   volume: 0.35, loop: true },
  morning_routine_guitar:  { file: 'audio/bgm/morning_routine_guitar.mp3',  volume: 0.3, loop: true },
  warm_interaction_piano:  { file: 'audio/bgm/warm_interaction_piano.mp3',  volume: 0.35, loop: true },
  absence_melancholy_cello:{ file: 'audio/bgm/absence_melancholy_cello.mp3',volume: 0.3, loop: true },
  dusk_fade_piano:         { file: 'audio/bgm/dusk_fade_piano.mp3',         volume: 0.3, loop: false },

  // === 共情经纪人FeelMarket专用标签 (2026-06-18 P0第508卷) ===
  synth_light_tech:        { file: 'audio/bgm/synth_light_tech.mp3',        volume: 0.3, loop: true },
  piano_gentle_reflective: { file: 'audio/bgm/piano_gentle_reflective.mp3', volume: 0.3, loop: true },
  silence_wind_room:       { file: 'audio/bgm/silence_wind_room.mp3',       volume: 0.2, loop: true },
  whisper_love_fragments:  { file: 'audio/bgm/whisper_love_fragments.mp3',  volume: 0.25, loop: true },
  piano_slow_hope:         { file: 'audio/bgm/piano_slow_hope.mp3',         volume: 0.35, loop: true },
  piano_fade_citylife:     { file: 'audio/bgm/piano_fade_citylife.mp3',     volume: 0.3, loop: false },
  // T1D儿童校园日常 - 第518卷
  gentle_piano_morning:       { file: 'audio/bgm/gentle_piano_morning.mp3',       volume: 0.3, loop: true },
  quiet_school_ambience:      { file: 'audio/bgm/quiet_school_ambience.mp3',      volume: 0.25, loop: true },
  tense_heartbeat_low:        { file: 'audio/bgm/tense_heartbeat_low.mp3',        volume: 0.4, loop: true },
  melancholy_music_box:       { file: 'audio/bgm/melancholy_music_box.mp3',       volume: 0.3, loop: true },
  silent_frustration_strings: { file: 'audio/bgm/silent_frustration_strings.mp3', volume: 0.35, loop: true },
  lonely_afternoon_piano:     { file: 'audio/bgm/lonely_afternoon_piano.mp3',     volume: 0.3, loop: true },
  warm_lullaby_piano:         { file: 'audio/bgm/warm_lullaby_piano.mp3',         volume: 0.35, loop: true },

  // === 末日废土拾荒者专用标签 (2026-06-18) ===
  wasteland_dawn_wind:       { file: 'audio/bgm/wasteland_dawn_wind.mp3',       volume: 0.25, loop: true },
  ruins_morning_silence:     { file: 'audio/bgm/ruins_morning_silence.mp3',     volume: 0.2, loop: true },
  dust_and_rust:             { file: 'audio/bgm/dust_and_rust.mp3',             volume: 0.3, loop: true },
  silent_wind_ruins:         { file: 'audio/bgm/silent_wind_ruins.mp3',         volume: 0.2, loop: true },
  music_box_fur_elise:       { file: 'audio/bgm/music_box_fur_elise.mp3',       volume: 0.4, loop: false },
  shelter_warmth:            { file: 'audio/bgm/shelter_warmth.mp3',            volume: 0.3, loop: true },
  campfire_humming_chorus:   { file: 'audio/bgm/campfire_humming_chorus.mp3',   volume: 0.45, loop: false },


  'operating_room_monitor_beep': { name: 'operating_room_monitor_beep', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'mountain_road_cicada': { name: 'mountain_road_cicada', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'stethoscope_silence': { name: 'stethoscope_silence', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'rainy_night_rescue_drone': { name: 'rainy_night_rescue_drone', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'morning_sun_erhu': { name: 'morning_sun_erhu', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'phone_call_wind_pause': { name: 'phone_call_wind_pause', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'pipa_tree_guitar_strum': { name: 'pipa_tree_guitar_strum', loop: true, fadeIn: 1.5, fadeOut: 2.0 },

  // === 法律援助律师专用标签 (2026-06-21 P0第766卷) ===
  gentle_strings_slow: { file: 'audio/bgm/gentle_strings_slow.mp3', volume: 0.3, loop: true },
  warm_piano:          { file: 'audio/bgm/warm_piano.mp3',          volume: 0.35, loop: true },
  quiet_contemplation: { file: 'audio/bgm/quiet_contemplation.mp3', volume: 0.25, loop: true },
  silence_then_cry:    { file: 'audio/bgm/silence_then_cry.mp3',    volume: 0.4, loop: false },

  cello_solo_low:          { file: 'audio/bgm/cello_solo_low.mp3',          volume: 0.35, loop: true },
  tension_low_strings:     { file: 'audio/bgm/tension_low_strings.mp3',     volume: 0.4,  loop: true },
  gentle_piano_learning:   { file: 'audio/bgm/gentle_piano_learning.mp3',   volume: 0.3,  loop: true },
  solemn_cello_transition: { file: 'audio/bgm/solemn_cello_transition.mp3', volume: 0.4,  loop: true },
  melancholy_cello:        { file: 'audio/bgm/melancholy_cello.mp3',        volume: 0.35, loop: true },
  warm_piano_discovery:    { file: 'audio/bgm/warm_piano_discovery.mp3',    volume: 0.35, loop: true },
  triumph_piano_cello:     { file: 'audio/bgm/triumph_piano_cello.mp3',     volume: 0.5,  loop: false },
  space_ambient_intro:     { file: 'audio/bgm/space_ambient_intro.mp3',     volume: 0.35, loop: true },
  tension_space_capture:   { file: 'audio/bgm/tension_space_capture.mp3',   volume: 0.45, loop: true },
  alarm_tension_orbital:   { file: 'audio/bgm/alarm_tension_orbital.mp3',   volume: 0.5,  loop: true },
  synth_light_tech:        { file: 'audio/bgm/synth_light_tech.mp3',        volume: 0.35, loop: true },
  piano_gentle_reflective: { file: 'audio/bgm/piano_gentle_reflective.mp3', volume: 0.3,  loop: true },
  strings_sunrise_orbital: { file: 'audio/bgm/strings_sunrise_orbital.mp3', volume: 0.4,  loop: true },
  warm_piano_simple:       { file: 'audio/bgm/warm_piano_simple.mp3',       volume: 0.35, loop: true },
  quiet_indoor_pencil:     { file: 'audio/bgm/quiet_indoor_pencil.mp3',     volume: 0.25, loop: true },
  hallway_echo_muffled:    { file: 'audio/bgm/hallway_echo_muffled.mp3',    volume: 0.2,  loop: true },
  sensory_overload_multi:  { file: 'audio/bgm/sensory_overload_multi.mp3',  volume: 0.45, loop: true },
  cognitive_loop_tension:  { file: 'audio/bgm/cognitive_loop_tension.mp3',  volume: 0.35, loop: true },
  heartbeat_close_space:   { file: 'audio/bgm/heartbeat_close_space.mp3',   volume: 0.3,  loop: true },
  silence_pause_tension:   { file: 'audio/bgm/silence_pause_tension.mp3',   volume: 0.25, loop: true },
  gentle_release_birds:    { file: 'audio/bgm/gentle_release_birds.mp3',    volume: 0.3,  loop: true },
  gentle_worldbuilding:    { file: 'audio/bgm/gentle_worldbuilding.mp3',    volume: 0.3,  loop: true },
  space_silence_gentle:    { file: 'audio/bgm/space_silence_gentle.mp3',    volume: 0.25, loop: true },
  youth_confusion_soft:    { file: 'audio/bgm/youth_confusion_soft.mp3',    volume: 0.3,  loop: true },
  collective_silence_tension: { file: 'audio/bgm/collective_silence_tension.mp3', volume: 0.35, loop: true },
  night_doubt_piano:       { file: 'audio/bgm/night_doubt_piano.mp3',       volume: 0.3,  loop: true },
  hope_gentle_strings:     { file: 'audio/bgm/hope_gentle_strings.mp3',     volume: 0.35, loop: true },
  chrono_implant_awakening: { file: 'audio/bgm/chrono_implant_awakening.mp3', volume: 0.4, loop: true },
  bell_tower_solemn_strike: { file: 'audio/bgm/bell_tower_solemn_strike.mp3', volume: 0.5, loop: true },
  eternal_garden_wisdom:    { file: 'audio/bgm/eternal_garden_wisdom.mp3',    volume: 0.3, loop: true },
  chrono_crisis_alarm:      { file: 'audio/bgm/chrono_crisis_alarm.mp3',      volume: 0.5, loop: true },
  dawn_bell_triumph:        { file: 'audio/bgm/dawn_bell_triumph.mp3',        volume: 0.55, loop: false },
  sunrise_silence_peace:    { file: 'audio/bgm/sunrise_silence_peace.mp3',    volume: 0.3, loop: true },
  ancient_drums_slow:       { file: 'audio/bgm/ancient_drums_slow.mp3',       volume: 0.4, loop: true },
  water_flow_tension:       { file: 'audio/bgm/water_flow_tension.mp3',       volume: 0.45, loop: true },
  wind_howl_silence:        { file: 'audio/bgm/wind_howl_silence.mp3',        volume: 0.35, loop: true },
  mourning_strings:         { file: 'audio/bgm/mourning_strings.mp3',         volume: 0.35, loop: true },
  dawn_warm_strings:        { file: 'audio/bgm/dawn_warm_strings.mp3',        volume: 0.4, loop: true },
  mountain_wind_gentle:     { file: 'audio/bgm/mountain_wind_gentle.mp3',     volume: 0.35, loop: true },
  silence_heartbeat:        { file: 'audio/bgm/silence_heartbeat.mp3',        volume: 0.3, loop: true },
  mourning_flute:           { file: 'audio/bgm/mourning_flute.mp3',           volume: 0.35, loop: true },
  tense_drums_low:          { file: 'audio/bgm/tense_drums_low.mp3',          volume: 0.45, loop: true },
  summit_silence:           { file: 'audio/bgm/summit_silence.mp3',           volume: 0.3, loop: false },
  subway_hum_muted:         { file: 'audio/bgm/subway_hum_muted.mp3',         volume: 0.25, loop: true },
  nostalgic_piano_soft:     { file: 'audio/bgm/nostalgic_piano_soft.mp3',     volume: 0.3, loop: true },
  silence_room_tone:        { file: 'audio/bgm/silence_room_tone.mp3',        volume: 0.2, loop: true },
  office_ambient_low:       { file: 'audio/bgm/office_ambient_low.mp3',       volume: 0.2, loop: true },
  home_evening_quiet:       { file: 'audio/bgm/home_evening_quiet.mp3',       volume: 0.3, loop: true },
  night_lamp_gentle:        { file: 'audio/bgm/night_lamp_gentle.mp3',        volume: 0.25, loop: true },

  // === 额外BGM标签（从module.exports移回） ===
  'workshop_morning_silence': { name: 'workshop_morning_silence', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'fading_tradition_bell': { name: 'fading_tradition_bell', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'apprentice_silence_tension': { name: 'apprentice_silence_tension', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'pencil_on_paper_rhythm': { name: 'pencil_on_paper_rhythm', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'fireworks_finale_crescendo': { name: 'fireworks_finale_crescendo', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'crossroads_wind_pause': { name: 'crossroads_wind_pause', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  'farewell_earth_gentle': { name: 'farewell_earth_gentle', loop: true, fadeIn: 1.5, fadeOut: 2.0 },
  // === 记忆原片鉴定师专用标签 ===
  lofi_electronic:          { file: 'audio/bgm/lofi_electronic.mp3',      volume: 0.3, loop: true },
  melancholy_piano:         { file: 'audio/bgm/melancholy_piano.mp3',     volume: 0.35, loop: true },
  ambient_rain:             { file: 'audio/bgm/ambient_rain.mp3',         volume: 0.25, loop: true },
  tension_strings:          { file: 'audio/bgm/tension_strings.mp3',      volume: 0.4, loop: true },
  silence_then_single_note: { file: 'audio/bgm/silence_single_note.mp3', volume: 0.2, loop: false },
  // === 达纳基尔硫磺矿工专用标签 (2026-06-21 专家团迭代) ===
  ethiopian_krar_dawn:    { file: 'audio/bgm/ethiopian_krar_dawn.mp3',    volume: 0.3, loop: true },
  camel_bells_desert:     { file: 'audio/bgm/camel_bells_desert.mp3',     volume: 0.35, loop: true },
  sulfur_hiss_ambient:    { file: 'audio/bgm/sulfur_hiss_ambient.mp3',    volume: 0.25, loop: true },
  iron_shovel_rhythm:     { file: 'audio/bgm/iron_shovel_rhythm.mp3',     volume: 0.4, loop: true },
  coughing_breath_tension:{ file: 'audio/bgm/coughing_breath_tension.mp3',volume: 0.3, loop: true },
  heavy_load_march:       { file: 'audio/bgm/heavy_load_march.mp3',       volume: 0.45, loop: true },
  acid_spring_tension:    { file: 'audio/bgm/acid_spring_tension.mp3',    volume: 0.3, loop: true },
  scale_clink_quiet:      { file: 'audio/bgm/scale_clink_quiet.mp3',      volume: 0.25, loop: true },
  afar_folk_humming:      { file: 'audio/bgm/afar_folk_humming.mp3',      volume: 0.35, loop: true },
  desert_silence_stars:   { file: 'audio/bgm/desert_silence_stars.mp3',   volume: 0.2, loop: true },
  // === 记忆原片鉴定师 + 法援律师专用标签 (2026-06-22) ===
  lo_fi_electronic:         { file: 'audio/bgm/lo_fi_electronic.mp3',         volume: 0.3, loop: true },
  melancholic_piano:        { file: 'audio/bgm/melancholic_piano.mp3',        volume: 0.35, loop: true },
  ambient_rain:             { file: 'audio/bgm/ambient_rain.mp3',             volume: 0.25, loop: true },
  tense_strings:            { file: 'audio/bgm/tense_strings.mp3',            volume: 0.4, loop: true },
  silence_then_single_note: { file: 'audio/bgm/silence_then_single_note.mp3', volume: 0.2, loop: false },
  gentle_strings_slow:      { file: 'audio/bgm/gentle_strings_slow.mp3',      volume: 0.3, loop: true },
  urban_night:              { file: 'audio/bgm/urban_night.mp3',              volume: 0.3, loop: true },
  tension_pulse:            { file: 'audio/bgm/tension_pulse.mp3',            volume: 0.4, loop: true },
  silence_then_piano:       { file: 'audio/bgm/silence_then_piano.mp3',       volume: 0.2, loop: false },
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
    nextAudio.volume = Math.min(targetVolume, targetVolume * progress);
    if (step >= steps) {
      clearInterval(timer);
      if (currentAudio) {
        currentAudio.stop();
        currentAudio.destroy();
      }
      nextAudio.volume = targetVolume;
      _currentBGMInstance = nextAudio;
    }
  }, interval);
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

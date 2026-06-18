/**
 * 交换人生 - H5版本入口
 * 使用标准Web API替代微信小游戏API
 */

// === wx API polyfill for H5 ===
const wx = {
  createCanvas: () => document.getElementById('gameCanvas'),
  getSystemInfoSync: () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }),
  onTouchStart: (cb) => document.addEventListener('touchstart', (e) => cb(e), { passive: false }),
  onTouchMove: (cb) => document.addEventListener('touchmove', (e) => cb(e), { passive: false }),
  onTouchEnd: (cb) => document.addEventListener('touchend', (e) => cb(e), { passive: false }),
  createInnerAudioContext: () => {
    const audio = new Audio();
    return {
      src: '', volume: 1, loop: false,
      play: () => audio.play().catch(() => {}),
      stop: () => { audio.pause(); audio.currentTime = 0; },
      destroy: () => { audio.pause(); audio.src = ''; },
      set src(v) { audio.src = v; },
      set volume(v) { audio.volume = Math.max(0, Math.min(1, v)); },
      set loop(v) { audio.loop = v; },
      get volume() { return audio.volume; }
    };
  }
};

// Make wx globally available for shared modules
window.wx = wx;

// Timeline故事列表（按安全等级排序，L1优先）
const TIMELINE_LIST = [
  { id: '2026-06-14-1435-第142轮创作者激励体系第四轮循环深化', label: '\[2026-06-14 14:35\] 第142轮·创作者...', level: 'L1' },
  { id: '2026-06-14-自动化轮次-第40轮心理安全机制第四轮循环全新维度', label: '\[2026-06-14 自动化轮次\] 第40轮·心理安全...', level: 'L1' },
  { id: 'alien-office-worker', label: '外星人伪装成人类上班的第一天', level: 'L1' },
  { id: 'antarctic-winter', label: '南极越冬站的极夜90天', level: 'L1' },
  { id: 'aymara-weaver', label: '安第斯山脉艾马拉织布妇人的最后一代', level: 'L1' },
  { id: 'bianjing-night-market', label: '宋朝汴京夜市摆摊指南', level: 'L1' },
  { id: 'bus-night-driver', label: '公交车末班车司机的午夜归程', level: 'L1' },
  { id: 'cai-yongbin', label: '盲人程序员蔡勇斌——用代码点亮黑暗，为视障者修筑数字盲道', level: 'L1' },
  { id: 'cao-xueqin-modern', label: '如果曹雪芹生在当代', level: 'L1' },
  { id: 'cip-patient-daily', label: '无痛之境：用伤疤代替警报的人生', level: 'L1' },
  { id: 'danmu-world', label: '活在弹幕世界：你的人生从此自带实时评论', level: 'L1' },
  { id: 'dyslexia-exam-week', label: '失读症大学生的期末考试周', level: 'L1' },
  { id: 'easter-island-speaker', label: '复活节岛最后的母语者', level: 'L1' },
  { id: 'emotion-weather-forecaster', label: '情绪天气预报员的混乱第一天', level: 'L1' },
  { id: 'emperor-delivery', label: '朕的外卖生涯：从龙椅到电动车', level: 'L1' },
  { id: 'encyclopedia-editor', label: '没有互联网世界的纸质百科全书编辑', level: 'L1' },
  { id: 'er-nurse-newyear', label: '急诊科护士的跨年值班夜', level: 'L1' },
  { id: 'gaokao-100days', label: '重返高三：距离高考还有100天', level: 'L1' },
  { id: 'gaokao-30days', label: '高三学生高考前最后30天', level: 'L1' },
  { id: 'gender-swap-week', label: '性别交换体验·钢铁直男程序员与美妆博主互换身体的一周', level: 'L1' },
  { id: 'haiyun-ayi', label: '海云阿姨', level: 'L1' },
  { id: 'jiang-yanchen', label: '反向折叠人姜延琛——从Z字形畸形到重新站立', level: 'L1' },
  { id: 'jin-xiaoyu', label: '《我们的天才儿子》：躁郁症翻译家金晓宇的苦难与光芒', level: 'L1' },
  { id: 'john-davidson', label: '失控的嘴，不屈的魂', level: 'L1' },
  { id: 'kyoto-wagashi-heir', label: '京都百年老铺第四代传人', level: 'L1' },
  { id: 'li-jia', label: '从环卫工到研究生：8小时外求上进的母亲', level: 'L1' },
  { id: 'lighthouse-keeper', label: '灯塔守护人的最后一次值守', level: 'L1' },
  { id: 'liu-xuelian', label: '从388分到双一流硕士——刘雪莲的七年逆袭路', level: 'L1' },
  { id: 'lu-hong', label: '从傻子到千万厂长：脑瘫少年陆鸿的逆袭人生', level: 'L1' },
  { id: 'mali-gold-merchant', label: '马里帝国黄金商队', level: 'L1' },
  { id: 'miao-jie', label: '苗婕的金腰带——35岁单亲妈妈重返柔术赛场', level: 'L1' },
  { id: 'midlife-crisis-day1', label: '中年危机的第一天', level: 'L1' },
  { id: 'min-denghua', label: '羽言之声——脑瘫博士闵登华的26年', level: 'L1' },
  { id: 'ming-no-sea-ban', label: '如果明朝没有海禁', level: 'L1' },
  { id: 'mortuary-makeup-artist', label: '殡仪馆化妆师', level: 'L1' },
  { id: 'no-fire-humanity', label: '如果人类从未学会用火', level: 'L1' },
  { id: 'oil-rig-worker', label: '海上石油钻井平台工人', level: 'L1' },
  { id: 'pompeii-baker', label: '庞贝末日：一个面包师的最后24小时', level: 'L1' },
  { id: 'qin-no-burning-books', label: '如果秦始皇没有焚书坑儒', level: 'L1' },
  { id: 'qing-palace-maid', label: '清朝宫女出宫后的第一天', level: 'L1' },
  { id: 'quanzhou-maritime-merchant', label: '如果明朝没有海禁', level: 'L1' },
  { id: 'railway-crossing-keeper', label: '铁路道口看守员的最后一班岗', level: 'L1' },
  { id: 'rain-memory-collector', label: '雨水记忆师', level: 'L1' },
  { id: 'retired-cadre-day1', label: '退休第一天的老干部', level: 'L1' },
  { id: 'sat-diver-rescue', label: '深海饱和潜水员的水下救援72小时', level: 'L1' },
  { id: 'song-yuansheng', label: '从煤矿深处到大学讲台——宋远升的逆袭人生', level: 'L1' },
  { id: 'stutterer-interview', label: '重度口吃者的求职面试', level: 'L1' },
  { id: 'su-min', label: '50岁离家出走——苏敏的觉醒之路', level: 'L1' },
  { id: 'tang-huji-wine-shop', label: '唐朝长安胡姬酒肆的当垆女', level: 'L1' },
  { id: 'tokyo-fake-japanese', label: '我在东京当了三年「假日本人」', level: 'L1' },
  { id: 'urban-demolition-windfall', label: '城中村拆迁户的一夜暴富', level: 'L1' },
  { id: 'intangible-heritage-last-day', label: '非遗传承人的最后一天', level: 'L2' },
  { id: 'dyslexia-programmer', label: '阅读障碍程序员的代码人生', level: 'L3' },
  { id: 'miner-to-streamer', label: '从煤矿工人到直播带货主播', level: 'L2' },
  { id: 'underwater-archaeologist', label: '文物水下考古队员的南海沉船发掘', level: 'L2' },
  { id: 'mock-funeral', label: '提前体验自己的追悼会', level: 'L3' },
  { id: 'shadow-roast-day1', label: '影子吐槽大会第一天', level: 'L2' },
  { id: 'convenience-store-newyear', label: '便利店除夕夜值班', level: 'L1' },
  { id: 'truth-translator-day', label: '真相翻译官的一天', level: 'L2' },
  { id: 'tourette-classroom', label: '抽动秽语综合征患者的课堂日常', level: 'L3' },
  { id: 'irish-traveller-memory', label: '爱尔兰旅人家族的游牧记忆', level: 'L2' },
  { id: 'inca-quipu-keeper', label: '印加帝国奇普结绳记事官的最后岁月', level: 'L1' },
  { id: 'bullet-train-mechanic', label: '高铁动车组机械师的凌晨检修', level: 'L1' },
  { id: 'wechat-exposure-day', label: '微信聊天记录被公开播放的社死第一天', level: 'L1' },
  { id: 'qin-great-wall-guard', label: '秦朝修筑长城的戍卒家书——在夯土与烽火之间用竹简写下「勿念」', level: 'L2' },
  { id: 'funeral-ceremony-host', label: '殡仪馆司仪的告别仪式——在别人的终点站里用声音搭建最后一座桥', level: 'L2' },
  { id: 'earthquake-search-dog-handler', label: '地震搜救犬训导员的废墟72小时——在瓦砾与绝望之间用鼻子和信任寻找生命信号', level: 'L2' },
  { id: 'ocd-morning-ritual', label: '强迫症患者的出门仪式——在所有人都能轻松推开门的世界里用一遍遍检查才能迈出第一步', level: 'L3' },
  { id: 'selective-mutism-kindergarten', label: '选择性缄默症儿童的幼儿园日常——不是不想说话而是恐惧把声音锁在了喉咙里', level: 'L3' },
  { id: 'oral-historian-last-day', label: '口述史传承人的最后一天——在没有文字的世界里当记忆开始裂缝三千年的链条第一次面临断裂', level: 'L1' },
  { id: 'volcano-scientist', label: '火山爆发前夜的监测站值守科学家', level: 'L1' },
  { id: 'wang-jibing', label: '外卖诗人王计兵——从工地到春晚，用诗句丈量人间', level: 'L1' },
  { id: 'wu-shaoqing', label: '寻找你的名字', level: 'L1' },
  { id: 'xiao-yuting', label: '单手擎起风雨家——残臂农妇肖玉亭17年不离不弃守至亲', level: 'L1' },
  { id: 'xie-lin', label: '一路风尘——大漠独行女侠谢琳的500万公里人生', level: 'L1' },
  { id: 'zhang-guimei', label: '大山里的女校长——张桂梅', level: 'L1' },
  { id: 'zhang-xue', label: '修车少年张雪——20年死磕，打破世界摩托车37年垄断', level: 'L1' },
{ id: 'shu-carpenter-wooden-ox', label: '三国蜀汉木牛流马工匠的发明日夜', level: 'L1' },
  'mursi-lip-plate-coming-of-age',
  'smell-translator-first-month',
  { id: 'firefighter-obstetrician-swap', title: '男消防员与女产科医生互换身体的一周', file: 'timelines/firefighter-obstetrician-swap.json' },
  'benin-bronze-caster',
  'cat-perspective-day',
  'civil-servant-to-blogger',
  'iceland-volcano-monitor',
  'mediocre-cultivator',
  'scrap-yard-sorting-philosophy',
  'tuareg-salt-caravan',
  'wei-monk-sutra-copyist',
  'alarm-voice-critic-week',
  'ptsd-daily-life',
  'mycenaean-scribe-linear-b',
  'ming-forbidden-city-night-watchman',
  'community-group-leader-day',
  'amazigh-tattoo-master',
  'meghalaya-living-root-bridge',
  'sauranthropus-industrial-revolution',
  'market-vendor-dawn',
  'waste-sorter-supervisor',
  'orbital-debris-cleaner',
  'autism-supermarket-shopping',
  'motivation-awakener-first-month',
  't1d-child-school-day',
  'wasteland-scavenger-music-box',
  'time-guardian-first-month',
  { id: 'zheng-jinxing', label: '金刚——一米一三的\'高大\'人生', level: 'L1' },
  { id: '一战略定位', label: '一、战略定位', level: 'L1' },
  { id: '中国古代生活-三国蜀汉丞相府书佐的一天', label: '中国古代生活 · 三国蜀汉丞相府书佐的一天', level: 'L1' },
  { id: '中国古代生活-元朝泉州港阿拉伯商人的蕃坊日常', label: '中国古代生活 · 元朝泉州港阿拉伯商人的蕃坊日常', level: 'L1' },
  { id: '中国古代生活-唐朝长安西市小贩的一天', label: '中国古代生活 · 唐朝长安西市小贩的一天', level: 'L1' },
  { id: '中国古代生活-商朝甲骨占卜师', label: '中国古代生活 · 商朝甲骨占卜师', level: 'L1' },
  { id: '中国古代生活-明朝江南织造府的织工', label: '中国古代生活 · 明朝江南织造府的织工', level: 'L1' },
  { id: '中国古代生活-清朝宫女出宫后的第一天', label: '中国古代生活 · 清朝宫女出宫后的第一天', level: 'L1' },
  { id: '中国古代生活唐朝长安胡姬酒肆的当垆女', label: '中国古代生活·唐朝长安胡姬酒肆的当垆女', level: 'L1' },
  { id: '中国古代生活唐朝长安西市小贩的一天', label: '中国古代生活·唐朝长安西市小贩的一天', level: 'L1' },
  { id: '中国古代生活宋朝汴京夜市摆摊指南', label: '中国古代生活·宋朝汴京夜市摆摊指南', level: 'L1' },
  { id: '中国古代生活明朝锦衣卫基层缇骑的日常', label: '中国古代生活·明朝锦衣卫基层缇骑的日常', level: 'L1' },
  { id: '中国古代生活秦朝长城筑城工匠', label: '中国古代生活·秦朝长城筑城工匠', level: 'L1' },
  { id: '交换人生剧本产出-20260614-01', label: '交换人生·剧本产出 #20260614-01', level: 'L1' },
  { id: '交换人生剧本产出-9896645-阶层跨越体验-城中村拆迁户的一夜暴富-2026-06-14', label: '交换人生·剧本产出 #9896645 \| 阶层跨越体验 ·...', level: 'L1' },
  { id: '交换人生剧本素材库第2卷', label: '交换人生·剧本素材库（第2卷）', level: 'L1' },
  { id: '剧本产出-007-外国古代文明-罗马边境军团士兵的家书-2026-06-14-0655', label: '剧本产出 #007 \| 外国古代文明 \| 罗马边境军团士...', level: 'L1' },
  { id: '剧本产出-011-生命阶段体验-提前体验自己的葬礼-2026-06-14', label: '剧本产出 #011 \| 生命阶段体验 \| 提前体验自己的...', level: 'L1' },
  { id: '剧本产出-2026-06-14-0509-如果李白生在现代', label: '剧本产出 · 2026-06-14 05:09 · 如果李白...', level: 'L1' },
  { id: '剧本产出-auto-001-极端地理体验-南极越冬站的极夜90天', label: '剧本产出 #AUTO-001 \| 极端地理体验 · 南极越...', level: 'L1' },
  { id: '剧本产出-auto-20260614-听障舞者的无声排练厅', label: '剧本产出 #AUTO-20260614 \| 听障舞者的无声...', level: 'L1' },
  { id: '剧本产出-new-2026-06-14-末日废土拾荒者的生存日记', label: '剧本产出 #NEW \| 2026-06-14 \| 末日废...', level: 'L1' },
  { id: '剧本产出-r001-2026-06-14-乡村邮递员的最后一公里', label: '剧本产出 #R001 \| 2026-06-14 \| 乡村...', level: 'L1' },
  { id: '剧本素材产出-r001-2026-06-14-外卖骑手算法困局里的12小时', label: '剧本素材产出 #R001 \| 2026-06-14 \| ...', level: 'L1' },
  { id: '在每一滴雨都承载一段记忆的世界里为干旱城市收集最后一滴记忆之雨的人', label: '在每一滴雨都承载一段记忆的世界里，为干旱城市收集最后一滴记忆...', level: 'L1' },
  { id: '在气味是灵魂指纹的世界里为逝者调配最后的气味肖像', label: '在气味是灵魂指纹的世界里，为逝者调配最后的气味肖像', level: 'L1' },
  { id: '外国古代文明-古埃及金字塔建造工匠的一天', label: '外国古代文明 · 古埃及金字塔建造工匠的一天', level: 'L1' },
  { id: '外国古代文明-维京长船水手横渡北大西洋', label: '外国古代文明 · 维京长船水手横渡北大西洋', level: 'L1' },
  { id: '外国古代文明-马里帝国黄金商队', label: '外国古代文明 · 马里帝国黄金商队', level: 'L1' },
  { id: '外国古代文明古印度哈拉帕文明的印章商人', label: '外国古代文明·古印度哈拉帕文明的印章商人', level: 'L1' },
  { id: '外国古代文明古希腊雅典陶片放逐投票日-2026-06-14t120728z', label: '外国古代文明·古希腊雅典陶片放逐投票日 \| 2026-06...', level: 'L1' },
  { id: '外国古代文明奥斯曼帝国宫廷建筑师的一天', label: '外国古代文明·奥斯曼帝国宫廷建筑师的一天', level: 'L1' },
  { id: '外国古代文明拜占庭帝国竞技党车赛手', label: '外国古代文明·拜占庭帝国竞技党车赛手', level: 'L1' },
  { id: '平行人生假设-如果人类从未发展出数学', label: '平行人生假设 · 如果人类从未发展出数学', level: 'L1' },
  { id: '平行人生假设-如果人类从未发明轮子', label: '平行人生假设 · 如果人类从未发明轮子', level: 'L1' },
  { id: '平行人生假设-如果人类从未发现电力', label: '平行人生假设 · 如果人类从未发现电力', level: 'L1' },
  { id: '平行人生假设-如果宋朝没有灭亡', label: '平行人生假设 · 如果宋朝没有灭亡', level: 'L1' },
  { id: '平行人生假设如果中国没有经历闭关锁国', label: '平行人生假设·如果中国没有经历闭关锁国', level: 'L1' },
  { id: '平行人生假设如果互联网从未被发明', label: '平行人生假设·如果互联网从未被发明', level: 'L1' },
  { id: '平行人生假设如果人类从未学会用火', label: '平行人生假设·如果人类从未学会用火', level: 'L1' },
  { id: '平行人生假设如果你的初恋没有分手', label: '平行人生假设·如果你的初恋没有分手', level: 'L1' },
  { id: '平行人生假设如果地球自转速度突然减半', label: '平行人生假设·如果地球自转速度突然减半', level: 'L1' },
  { id: '平行人生假设如果恐龙没有灭绝', label: '平行人生假设·如果恐龙没有灭绝', level: 'L1' },
  { id: '平行人生假设如果文字从未被发明', label: '平行人生假设·如果文字从未被发明', level: 'L1' },
  { id: '平行人生假设如果明朝没有海禁', label: '平行人生假设·如果明朝没有海禁', level: 'L1' },
  { id: '平行人生假设如果秦始皇没有焚书坑儒', label: '平行人生假设·如果秦始皇没有焚书坑儒', level: 'L1' },
  { id: '平行人生假设如果货币从未被发明', label: '平行人生假设·如果货币从未被发明', level: 'L1' },
  { id: '平行人生假设如果郑和船队发现了美洲', label: '平行人生假设·如果郑和船队发现了美洲', level: 'L1' },
  { id: '性别交换体验-健身房私教与瑜伽教练互换身体的一周', label: '性别交换体验 · 健身房私教与瑜伽教练互换身体的一周', level: 'L1' },
  { id: '性别交换体验-全职爸爸与职场妈妈互换身体的一周', label: '性别交换体验 · 全职爸爸与职场妈妈互换身体的一周', level: 'L1' },
  { id: '性别交换体验-女生变男生的职场一周', label: '性别交换体验 · 女生变男生的职场一周', level: 'L1' },
  { id: '性别交换体验体育生与芭蕾舞者互换身体的一周', label: '性别交换体验·体育生与芭蕾舞者互换身体的一周', level: 'L1' },
  { id: '性别交换体验单亲爸爸与单亲妈妈互换身体的一周', label: '性别交换体验·单亲爸爸与单亲妈妈互换身体的一周', level: 'L1' },
  { id: '性别交换体验女生变男生的职场一周', label: '性别交换体验·女生变男生的职场一周', level: 'L1' },
  { id: '性别交换体验男外科医生与女护士互换身体的一周', label: '性别交换体验·男外科医生与女护士互换身体的一周', level: 'L1' },
  { id: '性别交换体验男性妇科医生与女患者互换身体的一周', label: '性别交换体验·男性妇科医生与女患者互换身体的一周', level: 'L1' },
  { id: '性别交换体验钢铁直男程序员与美妆博主互换身体的一周', label: '性别交换体验·钢铁直男程序员与美妆博主互换身体的一周', level: 'L1' },
  { id: '文化身份体验-印尼爪哇皮影戏wayang-kulit达郎的最后一代', label: '文化身份体验 · 印尼爪哇皮影戏（Wayang Kulit）...', level: 'L1' },
  { id: '文化身份体验-安第斯山脉艾马拉织布妇人的最后一代', label: '文化身份体验 · 安第斯山脉艾马拉织布妇人的最后一代', level: 'L1' },
  { id: '文化身份体验-爱尔兰阿伦群岛传统渔网编织者的最后一代', label: '文化身份体验 · 爱尔兰阿伦群岛传统渔网编织者的最后一代', level: 'L1' },
  { id: '文化身份体验-缅甸蒲甘漆器作坊的最后一代传人', label: '文化身份体验 · 缅甸蒲甘漆器作坊的最后一代传人', level: 'L1' },
  { id: '文化身份体验-蒙古族最后的驯鹿人之冬', label: '文化身份体验 · 蒙古族最后的驯鹿人之冬', level: 'L1' },
  { id: '文化身份体验京都百年老铺第四代传人', label: '文化身份体验·京都百年老铺第四代传人', level: 'L1' },
  { id: '文化身份体验印度恒河边的苦行僧', label: '文化身份体验·印度恒河边的苦行僧', level: 'L1' },
  { id: '文化身份体验埃塞俄比亚咖啡仪式的最后一代传承人', label: '文化身份体验·埃塞俄比亚咖啡仪式的最后一代传承人', level: 'L1' },
  { id: '文化身份体验威尼斯贡多拉船夫的最后一代', label: '文化身份体验·威尼斯贡多拉船夫的最后一代', level: 'L1' },
  { id: '文化身份体验维吾尔族木卡姆乐师在乌鲁木齐与喀什之间', label: '文化身份体验·维吾尔族木卡姆乐师在乌鲁木齐与喀什之间', level: 'L1' },
  { id: '日常奇迹-乡村邮递员的最后一公里', label: '日常奇迹 · 乡村邮递员的最后一公里', level: 'L1' },
  { id: '日常奇迹-凌晨四点菜市场摊贩的备货时光', label: '日常奇迹 · 凌晨四点菜市场摊贩的备货时光', level: 'L1' },
  { id: '日常奇迹-废品回收站老板的分类哲学', label: '日常奇迹 · 废品回收站老板的分类哲学', level: 'L1' },
  { id: '日常奇迹-急诊科护士的跨年值班夜', label: '日常奇迹 · 急诊科护士的跨年值班夜', level: 'L1' },
  { id: '日常奇迹-铁路道口看守员的最后一班岗', label: '日常奇迹 · 铁路道口看守员的最后一班岗', level: 'L1' },
  { id: '日常奇迹凌晨四点菜市场摊贩的备货时光', label: '日常奇迹·凌晨四点菜市场摊贩的备货时光', level: 'L1' },
  { id: '日常奇迹天桥下理发师的流动人生', label: '日常奇迹·天桥下理发师的流动人生', level: 'L1' },
  { id: '日常奇迹急诊科护士的跨年值班夜', label: '日常奇迹·急诊科护士的跨年值班夜', level: 'L1' },
  { id: '日常奇迹深夜代驾司机的城市折叠人生', label: '日常奇迹·深夜代驾司机的城市折叠人生', level: 'L1' },
  { id: '日常奇迹深夜便利店员的城市守夜', label: '日常奇迹·深夜便利店员的城市守夜', level: 'L1' },
  { id: '极端地理体验-亚马逊雨林树冠层生物学家', label: '极端地理体验 · 亚马逊雨林树冠层生物学家', level: 'L1' },
  { id: '极端地理体验-北极斯瓦尔巴群岛的极昼护林员', label: '极端地理体验 · 北极斯瓦尔巴群岛的极昼护林员', level: 'L1' },
  { id: '极端地理体验-挪威斯瓦尔巴群岛种子库守门人', label: '极端地理体验 · 挪威斯瓦尔巴群岛种子库守门人', level: 'L1' },
  { id: '极端地理体验-深海热泉载人潜水器驾驶员', label: '极端地理体验 · 深海热泉载人潜水器驾驶员', level: 'L1' },
  { id: '极端地理体验-西伯利亚铁路列车员的最长班次', label: '极端地理体验 · 西伯利亚铁路列车员的最长班次', level: 'L1' },
  { id: '极端地理体验中亚草原驯鹰人的冬季狩猎', label: '极端地理体验·中亚草原驯鹰人的冬季狩猎', level: 'L1' },
  { id: '极端地理体验撒哈拉游牧民族的迁徙季', label: '极端地理体验·撒哈拉游牧民族的迁徙季', level: 'L1' },
  { id: '极端地理体验格陵兰岛因纽特猎人的极冬海豹狩猎', label: '极端地理体验·格陵兰岛因纽特猎人的极冬海豹狩猎', level: 'L1' },
  { id: '极端地理体验西伯利亚铁路列车员的最长班次', label: '极端地理体验·西伯利亚铁路列车员的最长班次', level: 'L1' },
  { id: '极端情境体验-极地冰窟潜水员', label: '极端情境体验 · 极地冰窟潜水员', level: 'L1' },
  { id: '极端情境体验台风眼中的海上救援直升机飞行员', label: '极端情境体验·台风眼中的海上救援直升机飞行员', level: 'L1' },
  { id: '极端情境体验国际空间站宇航员的圣诞节', label: '极端情境体验·国际空间站宇航员的圣诞节', level: 'L1' },
  { id: '极端情境体验战区无国界医生的72小时', label: '极端情境体验·战区无国界医生的72小时', level: 'L1' },
  { id: '极端情境体验火山爆发前夜的火山监测站值守科学家', label: '极端情境体验·火山爆发前夜的火山监测站值守科学家', level: 'L1' },
  { id: '极端情境体验珠峰夏尔巴向导的攀登季', label: '极端情境体验·珠峰夏尔巴向导的攀登季', level: 'L1' },
  { id: '极端情境体验高空跳伞教练的失控自由落体', label: '极端情境体验·高空跳伞教练的失控自由落体', level: 'L1' },
  { id: '深海饱和潜水员的水下救援72小时', label: '📖 深海饱和潜水员的水下救援72小时', level: 'L1' },
  { id: '特殊职业体验-入殓师的第一具遗体', label: '特殊职业体验 · 入殓师的第一具遗体', level: 'L1' },
  { id: '特殊职业体验-刑侦画像师', label: '特殊职业体验 · 刑侦画像师', level: 'L1' },
  { id: '特殊职业体验-地铁隧道巡检工的地下十二年', label: '特殊职业体验 · 地铁隧道巡检工的地下十二年', level: 'L1' },
  { id: '特殊职业体验-战地摄影师的取景框', label: '特殊职业体验 · 战地摄影师的取景框', level: 'L1' },
  { id: '特殊职业体验-殡仪馆化妆师', label: '特殊职业体验 · 殡仪馆化妆师', level: 'L1' },
  { id: '特殊职业体验-消防员的最后一次出警', label: '特殊职业体验 · 消防员的最后一次出警', level: 'L1' },
  { id: '特殊职业体验-深海焊接工程师', label: '特殊职业体验 · 深海焊接工程师', level: 'L1' },
  { id: '特殊职业体验-远洋货轮厨师的跨洋航程', label: '特殊职业体验 · 远洋货轮厨师的跨洋航程', level: 'L1' },
  { id: '特殊职业体验-野生动物救助站兽医的第一年', label: '特殊职业体验 · 野生动物救助站兽医的第一年', level: 'L1' },
  { id: '特殊职业体验-高空玻璃幕墙清洁工', label: '特殊职业体验 · 高空玻璃幕墙清洁工', level: 'L1' },
  { id: '特殊职业体验南极冰芯钻探科学家', label: '特殊职业体验·南极冰芯钻探科学家', level: 'L1' },
  { id: '特殊职业体验急诊科麻醉医生的夜班', label: '特殊职业体验·急诊科麻醉医生的夜班', level: 'L1' },
  { id: '特殊职业体验法医的第一年', label: '特殊职业体验·法医的第一年', level: 'L1' },
  { id: '特殊职业体验深夜电台dj的最后一档节目', label: '特殊职业体验·深夜电台DJ的最后一档节目', level: 'L1' },
  { id: '特殊职业体验深夜电台dj的最后一班岗', label: '特殊职业体验·深夜电台DJ的最后一班岗', level: 'L1' },
  { id: '特殊职业体验深海饱和潜水员的水下28天', label: '特殊职业体验·深海饱和潜水员的水下28天', level: 'L1' },
  { id: '特殊职业体验火山学家', label: '特殊职业体验·火山学家', level: 'L1' },
  { id: '特殊职业体验灯塔守夜人的孤岛三十年', label: '特殊职业体验·灯塔守夜人的孤岛三十年', level: 'L1' },
  { id: '特殊职业体验烟花设计师的最后一场烟火表演', label: '特殊职业体验·烟花设计师的最后一场烟火表演', level: 'L1' },
  { id: '特殊职业体验野生动物救助站兽医的第一年', label: '特殊职业体验·野生动物救助站兽医的第一年', level: 'L1' },
  { id: '特殊职业体验非遗传承人的最后一天', label: '特殊职业体验·非遗传承人的最后一天', level: 'L1' },
  { id: '特殊职业体验高空塔吊操作员的一天', label: '特殊职业体验·高空塔吊操作员的一天', level: 'L1' },
  { id: '生命阶段体验-中年危机的第一天', label: '生命阶段体验 · 中年危机的第一天', level: 'L1' },
  { id: '生命阶段体验-产后第一年新手妈妈的深夜三点', label: '生命阶段体验 · 产后第一年新手妈妈的深夜三点', level: 'L1' },
  { id: '生命阶段体验-八十五岁老人的回忆录式一天', label: '生命阶段体验 · 八十五岁老人的回忆录式一天', level: 'L1' },
  { id: '生命阶段体验-退休第一天的老干部', label: '生命阶段体验 · 退休第一天的老干部', level: 'L1' },
  { id: '生命阶段体验-高三学生高考前最后30天', label: '生命阶段体验 · 高三学生高考前最后30天', level: 'L1' },
  { id: '生命阶段体验产后第一年新手妈妈的深夜三点', label: '生命阶段体验·产后第一年新手妈妈的深夜三点', level: 'L1' },
  { id: '第182轮-文化身份体验伊朗波斯地毯编织世家的最后一代传人', label: '第182轮 文化身份体验：伊朗波斯地毯编织世家的最后一代传人', level: 'L1' },
  { id: '第53轮素材产出', label: '第53轮素材产出', level: 'L1' },
  { id: '第59轮-外国古代文明-江户时代寿司摊贩的清晨', label: '第59轮 外国古代文明 江户时代寿司摊贩的清晨', level: 'L1' },
  { id: '第89轮-性别交换体验-直男癌患者体验性别歧视的一周2026-06-14', label: '\## 第89轮 · 性别交换体验 · 直男癌患者体验性别歧...', level: 'L1' },
  { id: '类型化虚拟人生-天空诗人', label: '类型化虚拟人生 · 天空诗人', level: 'L1' },
  { id: '类型化虚拟人生-情绪瘟疫医生', label: '类型化虚拟人生 · 情绪瘟疫医生', level: 'L1' },
  { id: '类型化虚拟人生-星际货船船员的深空航行日志', label: '类型化虚拟人生 · 星际货船船员的深空航行日志', level: 'L1' },
  { id: '类型化虚拟人生-深海记忆银行', label: '类型化虚拟人生 · 深海记忆银行', level: 'L1' },
  { id: '类型化虚拟人生-记忆当铺的鉴定师', label: '类型化虚拟人生 · 记忆当铺的鉴定师', level: 'L1' },
  { id: '类型化虚拟人生-赛博朋克黑市义体医生的24小时', label: '类型化虚拟人生 · 赛博朋克黑市义体医生的24小时', level: 'L1' },
  { id: '类型化虚拟人生ai觉醒纪元第一个拥有自我意识的ai服务员的咖啡馆日常', label: '类型化虚拟人生·AI觉醒纪元·第一个拥有自我意识的AI服务员...', level: 'L1' },
  { id: '类型化虚拟人生地底末日避难所重新开门的第1000年', label: '类型化虚拟人生·地底末日避难所重新开门的第1000年', level: 'L1' },
  { id: '类型化虚拟人生寿命交易员', label: '类型化虚拟人生·寿命交易员', level: 'L1' },
  { id: '耶路撒冷安息日守门人的黄昏到黄昏', label: '耶路撒冷安息日守门人的黄昏到黄昏', level: 'L1' },
  { id: '趣味恶搞体验-如果动物会说话', label: '趣味恶搞体验 · 如果动物会说话', level: 'L1' },
  { id: '趣味恶搞体验-如果动物能听懂人话但拒绝服从', label: '趣味恶搞体验 · 如果动物能听懂人话但拒绝服从', level: 'L1' },
  { id: '趣味恶搞体验-如果所有人的情绪都会变成天气', label: '趣味恶搞体验 · 如果所有人的情绪都会变成天气', level: 'L1' },
  { id: '趣味恶搞体验-如果植物会说话', label: '趣味恶搞体验 · 如果植物会说话', level: 'L1' },
  { id: '趣味恶搞体验-宠物猫视角的一天', label: '趣味恶搞体验 · 宠物猫视角的一天', level: 'L1' },
  { id: '趣味恶搞体验古代皇帝穿越到现代当外卖骑手', label: '趣味恶搞体验·古代皇帝穿越到现代当外卖骑手', level: 'L1' },
  { id: '趣味恶搞体验如果所有谎言都会变成头顶弹幕', label: '趣味恶搞体验·如果所有谎言都会变成头顶弹幕', level: 'L1' },
  { id: '趣味恶搞体验如果记忆可以一键清空', label: '趣味恶搞体验·如果记忆可以一键清空', level: 'L1' },
  { id: '边缘群体体验-先天性无痛症患者的日常', label: '边缘群体体验 · 先天性无痛症患者的日常', level: 'L1' },
  { id: '边缘群体体验-自闭症谱系者的超市购物', label: '边缘群体体验 · 自闭症谱系者的超市购物', level: 'L1' },
  { id: '边缘群体体验-轮椅使用者的通勤之路', label: '边缘群体体验 · 轮椅使用者的通勤之路', level: 'L1' },
  { id: '边缘群体体验全色盲设计师的配色困境', label: '边缘群体体验·全色盲设计师的配色困境', level: 'L1' },
  { id: '边缘群体体验听障舞者的无声排练厅', label: '边缘群体体验·听障舞者的无声排练厅', level: 'L1' },
  { id: '边缘群体体验听障舞者的无声排练厅-2026-06-14', label: '边缘群体体验·听障舞者的无声排练厅 — 2026-06-14', level: 'L1' },
  { id: '边缘群体体验失语症患者的一天', label: '边缘群体体验·失语症患者的一天', level: 'L1' },
  { id: '边缘群体体验失读症大学生的期末考试周', label: '边缘群体体验·失读症大学生的期末考试周', level: 'L1' },
  { id: '边缘群体体验白化病患者的日常生活', label: '边缘群体体验·白化病患者的日常生活', level: 'L1' },
  { id: '边缘群体体验自闭症谱系者的超市购物', label: '边缘群体体验·自闭症谱系者的超市购物', level: 'L1' },
  { id: '阶层跨越体验-从月薪三千到年薪百万', label: '阶层跨越体验 · 从月薪三千到年薪百万', level: 'L1' },
  { id: '阶层跨越体验-城中村拆迁户的一夜暴富', label: '阶层跨越体验 · 城中村拆迁户的一夜暴富', level: 'L1' },
  { id: '阶层跨越体验-富二代创业失败后回老家种地', label: '阶层跨越体验 · 富二代创业失败后回老家种地', level: 'L1' },
  { id: '阶层跨越体验-顶级私厨眼中的富豪餐桌', label: '阶层跨越体验 · 顶级私厨眼中的富豪餐桌', level: 'L1' },
  { id: '阶层跨越体验从网瘾少年到电竞世界冠军', label: '阶层跨越体验·从网瘾少年到电竞世界冠军', level: 'L1' },
  { id: '阶层跨越体验外卖骑手算法困局里的12小时', label: '阶层跨越体验·外卖骑手算法困局里的12小时', level: 'L1' },
  { id: '阶层跨越体验富豪破产后送外卖的第一年-2026-06-14-1218-utc', label: '阶层跨越体验·富豪破产后送外卖的第一年 — 2026-06-...', level: 'L1' },
  { id: '阶层跨越体验小镇做题家考入名校后的第一个寒假回家', label: '阶层跨越体验·小镇做题家考入名校后的第一个寒假回家', level: 'L1' },
  { id: '阶层跨越体验顶级私厨眼中的富豪餐桌', label: '阶层跨越体验·顶级私厨眼中的富豪餐桌', level: 'L1' },
  { id: 'parent-role-swap-week', label: '全职妈妈与职场爸爸互换角色的一周 (P0第336卷)', level: 'L2' },
  { id: 'county-bride-rich-family', label: '从县城体制内家庭嫁入一线城市豪门的第一年 (P0第338卷)', level: 'L1' },
  { id: 'mortician-hand-warmth', label: '入殓师的手温 (P0第345卷)', level: 'L2' },
  { id: 'war-photographer-viewfinder', label: '战地摄影师的取景框 (P0第351卷)', level: 'L2' },
  { id: 'memory-freshman-first-month', label: '记忆保鲜师的第一个月 (P0第357卷)', level: 'L1' },
  { id: 'colorblind-daily-vision', label: '色觉异常者的日常视觉世界 (P0第374卷)', level: 'L3' },
    { id: 'search-history-documentary', label: '浏览器搜索历史纪录片 (P0第404卷)', level: 'L1' },
  { id: 'lanna-amulet-caster', label: '炉火守艺人：清迈佛牌铸造匠人的千年传承 (P0第412卷)', level: 'L2' }
    { id: 'shadow-relation-mediator', title: '影子关系调解员', subtitle: '替人与自己的影子谈判的第一个月' },
  { id: 'ai-life-score-daily', label: '被AI量化的人生评分日 (P0第423卷)', level: 'L1' },
  { id: 'adhd-woman-workplace-masking', label: 'ADHD成人女性的职场伪装日常 (P0第431卷)', level: 'L3' },
  { id: 'new-mom-3am-first-year', label: '产后第一年新手妈妈的深夜三点 (P0第436卷)', level: 'L2' },
  { id: 'mirror-parallel-life', label: '镜中平行人生：如果镜子显示的是另一个选择下的你 (P0第439卷)', level: 'L1' },
  { id: 'bomb-disposal-officer', label: '排爆警察的拆弹现场 (P0第450卷)', level: 'L3' },
  'solo-chinese-new-year-eve',
  'read-reply-credit-score',
  'bankrupt-heir-waiter',
  'rural-postman-last-mile',
  'aksum-obelisk-carver',
  'streamer-to-shopkeeper',
  'air-crash-investigator',
  'detective-counselor-swap-week',
  'huli-wigman-coming-of-age',
  'retired-cadre-first-day',
  'tomb-mural-restorer',
  'cainiao-station-clerk',
  'maya-astronomer-priest',
  'shu-carpenter-wooden-ox',
];

let player = null;

// Load timeline data (H5 uses fetch instead of require)
async function init() {
  try {
    // 显示故事选择界面
    showStorySelector();
  } catch (err) {
    console.error('初始化失败:', err);
    document.body.innerHTML = '<div style="color:#fff;padding:40px;font-size:18px;">加载失败，请确保通过HTTP服务器访问（非file://协议）</div>';
  }
}

function showStorySelector() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let selectedIndex = -1;
  const itemH = 50;
  const gap = 10;
  const padding = 30;
  const startY = 100;
  const maxVisible = Math.floor((canvas.height - startY - 60) / (itemH + gap));

  function renderSelector() {
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 标题
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4A574';
    ctx.font = 'bold 28px "PingFang SC", sans-serif';
    ctx.fillText('交换人生', canvas.width / 2, 50);
    ctx.fillStyle = '#888';
    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.fillText('选择一个人生开始体验', canvas.width / 2, 78);

    // 故事列表
    TIMELINE_LIST.forEach((story, i) => {
      if (i >= maxVisible) return;
      const y = startY + i * (itemH + gap);
      const isSelected = i === selectedIndex;

      // 背景
      ctx.fillStyle = isSelected ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.05)';
      ctx.beginPath();
      ctx.roundRect(padding, y, canvas.width - padding * 2, itemH, 8);
      ctx.fill();

      // 边框
      ctx.strokeStyle = isSelected ? '#D4A574' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.stroke();

      // 文字
      ctx.textAlign = 'left';
      ctx.fillStyle = isSelected ? '#D4A574' : '#E0E0E0';
      ctx.font = `${isSelected ? 'bold ' : ''}16px "PingFang SC", sans-serif`;
      ctx.fillText(story.label, padding + 16, y + itemH / 2 + 6);

      // 等级标签
      ctx.textAlign = 'right';
      ctx.fillStyle = story.level === 'L1' ? '#4CAF50' : story.level === 'L2' ? '#FFC107' : '#FF5722';
      ctx.font = '12px "PingFang SC", sans-serif';
      ctx.fillText(story.level, canvas.width - padding - 16, y + itemH / 2 + 4);
    });

    // 提示
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px "PingFang SC", sans-serif';
    ctx.fillText('点击选择 · 共' + TIMELINE_LIST.length + '个故事', canvas.width / 2, canvas.height - 20);
  }

  renderSelector();

  // 点击处理
  function handleSelect(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    for (let i = 0; i < Math.min(TIMELINE_LIST.length, maxVisible); i++) {
      const iy = startY + i * (itemH + gap);
      if (x >= padding && x <= canvas.width - padding && y >= iy && y <= iy + itemH) {
        selectedIndex = i;
        renderSelector();
        // 延迟后加载故事
        setTimeout(() => loadStory(TIMELINE_LIST[i].id), 200);
        canvas.removeEventListener('click', handleSelect);
        canvas.removeEventListener('touchstart', handleTouchSelect);
        return;
      }
    }
  }

  function handleTouchSelect(e) {
    e.preventDefault();
    handleSelect(e);
  }

  canvas.addEventListener('click', handleSelect);
  canvas.addEventListener('touchstart', handleTouchSelect, { passive: false });
}

async function loadStory(storyId) {
  try {
    const response = await fetch('timelines/' + storyId + '.json');
    const timelineData = await response.json();

    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (player) {
        player.width = canvas.width;
        player.height = canvas.height;
      }
    });

    // Create player (using global TimelinePlayer from script tag)
    player = new TimelinePlayer({
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
      timeline: timelineData,
      onChoice: (eventId, choiceIndex) => {
        console.log(`用户选择: ${eventId} -> 选项${choiceIndex}`);
      },
      onComplete: () => {
        console.log('体验完成');
      }
    });

    // Touch events (H5 uses standard DOM events, not wx API)
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      player.onTouchStart(e);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      player.onTouchMove(e);
    }, { passive: false });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      player.onTouchEnd(e);
    }, { passive: false });

    // Mouse fallback for desktop
    canvas.addEventListener('mousedown', (e) => {
      player.onTouchStart({ touches: [{ clientX: e.clientX, clientY: e.clientY }] });
    });
    canvas.addEventListener('mouseup', (e) => {
      player.onTouchEnd({ changedTouches: [{ clientX: e.clientX, clientY: e.clientY }] });
    });

    // Game loop
    let lastTime = Date.now();
    function gameLoop() {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      player.update(dt);
      player.render();

      requestAnimationFrame(gameLoop);
    }

    player.start();
    gameLoop();
  } catch (err) {
    console.error('加载故事失败:', err);
    alert('加载故事失败: ' + err.message);
    showStorySelector();
  }
}

init();

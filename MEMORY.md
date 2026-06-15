交换人生项目需同时维护两套源码：H5版本（exchange-life-game-h5/）和微信小游戏版本（exchange-life-wechat-minigame/）。每次迭代时必须同步更新两套代码。

共享模块（js/renderer.js、js/timeline-player.js、js/bgm-config.js）和timelines/目录内容完全一致，修改一处后需同步到另一处。

差异点仅在game.js入口文件：
- H5版使用wx polyfill + DOM API + fetch加载JSON
- 小游戏版使用原生wx API + FileSystemManager读取JSON

Why: 产品要按微信小游戏形式上传至微信开放平台，H5代码不能直接用于小游戏提审。
How to apply: 后续开发、部署、素材更新时需同步考虑两套代码的差异与共用逻辑；涉及小游戏相关改动时确认目标目录为小游戏源码而非H5目录；修改共享模块后必须双向同步。
交换人生项目需同时维护两套源码：H5版本（exchange-life-game-h5/）和微信小游戏版本（exchange-life-wechat-minigame/）。每次迭代时必须同步更新两套代码。

共享模块（js/renderer.js、js/timeline-player.js、js/bgm-config.js）和timelines/目录内容完全一致，修改一处后需同步到另一处。

差异点仅在game.js入口文件：
- H5版使用wx polyfill + DOM API + fetch加载JSON
- 小游戏版使用原生wx API + FileSystemManager读取JSON

Why: 产品要按微信小游戏形式上传至微信开放平台，H5代码不能直接用于小游戏提审。
How to apply: 后续开发、部署、素材更新时需同步考虑两套代码的差异与共用逻辑；涉及小游戏相关改动时确认目标目录为小游戏源码而非H5目录；修改共享模块后必须双向同步。

## 2026-06-16 02:32 UTC
用户售卖素材（英语单词卡片等）需添加高密度水印，参数如下：文字"vx:mokajing"，字体大小min(w,h)×0.05，间距text_w×1.5/text_h×2.0，倾斜-30°，透明度alpha=90，颜色RGB(100,100,100)。输出到原目录下_watermarked子文件夹。Why: 保护售卖素材版权，防止盗用。How to apply: 后续处理该目录(D:\公司AI\#产出\英语文章、联想记忆法小程序\@套件\###真实售卖素材\)下图片时默认使用此水印配置；调整前需先出测试图让用户确认效果再批量处理。

## 2026-06-22 05:53 UTC
交换人生H5项目远程仓库：https://github.com/mokajing/exchange-life-game。Git不在PATH中，需使用完整路径 `C:\Users\eleme\AppData\Local\PortableGit\bin\git.exe` 或通过Node脚本封装调用。HTTPS推送需PAT认证（用户已配置过），SSH方式备选为 git@github.com:mokajing/exchange-life-game.git。Why: 后续推送/拉取操作需要这些信息，避免重复询问用户。How to apply: 执行git操作时直接用完整路径或Node脚本；推送失败时优先检查token是否过期而非重新询问URL。

## 2026-06-22 06:42 UTC
交换人生H5游戏待优化体验问题（用户反馈）：
1. 体验结束后缺少“返回目录”按钮，当前只能点击“重新开始”，需补充返回入口。
2. 体验过程中极度缺乏代入感，需专家团构思优化方案（如音效、视觉反馈、叙事节奏等）。

Why: 用户明确指出的产品体验短板，影响留存与沉浸感。
How to apply: 后续迭代优先排期修复返回按钮；针对代入感问题组织专项讨论或调研竞品交互设计。

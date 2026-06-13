---
name: exchange-life-expert-team-ceo
description: 交换人生专家团增加CEO角色+定时任务配置
type: project
---

**专家团新增CEO角色**（2026-06-13）：
- CEO为最终决策者，当遇到需要用户决策的问题时先提问
- 若用户5分钟内无响应，CEO直接做出最优决策并记录决策理由
- 不用每次询问用户，减少打断

**定时任务已创建**：
- 任务ID: cron-1781319727653
- 频率: 每30分钟
- 三阶段流程: PRD取材迭代 → 专家团磋商优化 → 代码推送(GitHub+AoneCode)
- PRD链接: https://alidocs.dingtalk.com/i/nodes/Obva6QBXJwxNZoMOC2AxbnRZ8n4qY5Pr
- 素材库链接: https://alidocs.dingtalk.com/i/nodes/EpGBa2Lm8aZxe5myCEPP6ZPjWgN7R35y

**待完成**：
- Git未安装，需用户安装后配置GitHub和AoneCode远程仓库
- H5版本目录(exchange-life-game-h5/)尚未创建，由定时任务自动生成

Why: 用户要求自动化迭代闭环，减少手动干预。
How to apply: 每次会话涉及专家团讨论时自动纳入CEO角色；定时任务会自动执行无需手动触发。

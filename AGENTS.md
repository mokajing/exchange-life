
## 2026-06-13 02:14 UTC
每次会话中第一条记忆写入应使用共享记忆（shared memory），确保内容可在其他平台被查询到。Why: 用户要求跨平台可检索性，避免记忆仅存在于当前会话/平台孤岛中。How to apply: 在会话首次调用 memory_write 时，优先选择可跨平台访问的存储方式；后续写入仍按正常 rubric 判断目标文件。

## 2026-06-19 10:18 UTC
ask_human工具single_select模式必须使用questions数组格式：{"question_type": "single_select", "questions": [{"id": "...", "input_type": "single_select", "question": "...", "options": [...]}]}。顶层question/options字段已废弃，即使传入仍会报Missing required parameter错误。Why: 2026-06-19连续5次调用失败均因此参数结构错误。How to apply: 每次调用ask_human single_select时，务必构造questions数组而非使用顶层字段。

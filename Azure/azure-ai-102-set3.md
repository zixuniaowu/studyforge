# Microsoft Azure AI Engineer Associate (AI-102) - Set 3

> **考试代码**: AI-102  
> **题目数量**: 50  
> **及格分数**: 70%  
> **考试时间**: 100分钟  
> **语言**: zh-CN

## Domains

| ID | 名称 | 权重 |
|:---|:-----|:-----|
| 1 | Plan and manage an Azure AI solution | 15-20% |
| 2 | Implement decision support solutions | 10-15% |
| 3 | Implement Azure AI vision solutions | 15-20% |
| 4 | Implement natural language processing solutions | 25-30% |
| 5 | Implement knowledge mining and document intelligence solutions | 10-15% |
| 6 | Implement generative AI solutions | 10-15% |

---

## Questions

---

### Q1
<!-- domain: 1 | difficulty: medium | tags: SDK, REST -->

在调用Azure AI服务时，以下哪种方法提供最佳的开发体验和类型安全？

- A. REST API直接调用
- B. 使用官方SDK（如Azure.AI.TextAnalytics）
- C. 使用curl命令
- D. 使用Postman

**答案**: B

**解析**:
官方SDK优势：
- 类型安全
- 自动重试和错误处理
- 简化认证
- IntelliSense支持
- 版本兼容性管理

---

### Q2
<!-- domain: 1 | difficulty: hard | tags: disaster-recovery -->

一家公司需要确保Azure AI服务在区域故障时仍可用。应该如何设计？

- A. 在单一区域部署
- B. 在多个区域部署资源，配置故障转移
- C. 使用本地容器
- D. 增加实例数量

**答案**: B

**解析**:
灾难恢复设计：
- 在配对区域部署
- 使用Traffic Manager或Front Door
- 配置自动故障转移
- 定期测试恢复流程

---

### Q3
<!-- domain: 2 | difficulty: hard | tags: Metrics-Advisor -->

Azure Metrics Advisor的主要功能是什么？

- A. 图像分析
- B. 时间序列异常检测和根因分析
- C. 文本翻译
- D. 语音识别

**答案**: B

**解析**:
Metrics Advisor：
- 多维度时间序列监控
- 自动异常检测
- 智能警报
- 根因分析
- 适合业务指标监控

---

### Q4
<!-- domain: 3 | difficulty: medium | tags: Computer-Vision, captioning -->

一家公司想要为上传的图片自动生成alt文本以提高网站可访问性。应该使用什么？

- A. 对象检测
- B. 图像标题生成 (Image Captioning)
- C. OCR
- D. 人脸检测

**答案**: B

**解析**:
图像标题生成：
- 生成自然语言描述
- 适合Alt文本
- 辅助视障用户
- Image Analysis API的Caption功能

---

### Q5
<!-- domain: 3 | difficulty: hard | tags: Custom-Vision, domain -->

在Custom Vision中，选择"Compact"域模型与"General"域的主要区别是什么？

- A. Compact更准确
- B. Compact可以导出到边缘设备运行
- C. General可以导出
- D. 没有区别

**答案**: B

**解析**:
域选择：
- General：云端运行，更准确
- Compact：可导出（ONNX, TensorFlow, Docker）
- 边缘部署必须使用Compact域
- Compact牺牲一些准确性换取可移植性

---

### Q6
<!-- domain: 3 | difficulty: medium | tags: Face-API, similar -->

一家安全公司想要在数据库中找到与给定人脸最相似的人脸。应该使用Face API的什么功能？

- A. Detect
- B. Find Similar
- C. Verify
- D. Group

**答案**: B

**解析**:
Face API功能：
- Detect：检测人脸
- Find Similar：查找相似人脸（1:N搜索）
- Verify：验证两张是否同一人（1:1）
- Identify：在Person Group中识别身份

---

### Q7
<!-- domain: 4 | difficulty: medium | tags: Language-Service, health -->

一家医院想要从临床笔记中提取医学实体（如药物、剂量、诊断）。应该使用什么？

- A. 通用NER
- B. Text Analytics for Health
- C. 情感分析
- D. 关键词提取

**答案**: B

**解析**:
Text Analytics for Health：
- 专门针对医疗文本
- 识别医学实体
- 理解医学关系
- 符合HIPAA

---

### Q8
<!-- domain: 4 | difficulty: hard | tags: CLU, active-learning -->

如何持续改进已部署的CLU模型？

- A. 不需要改进
- B. 使用活动学习审核预测并添加到训练数据
- C. 删除并重建
- D. 只增加训练数据量

**答案**: B

**解析**:
活动学习流程：
1. 审核模型预测
2. 修正错误预测
3. 添加到训练数据
4. 重新训练
5. 部署新版本

---

### Q9
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, keyword -->

一家公司想要使用语音唤醒设备（如"Hey Assistant"）。应该使用什么功能？

- A. 语音转文本
- B. 自定义关键字 (Custom Keyword)
- C. 说话人识别
- D. 文本转语音

**答案**: B

**解析**:
自定义关键字：
- 创建唤醒词
- 低功耗检测
- 边缘设备运行
- 唤醒后再进行语音识别

---

### Q10
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, Neural-Voice -->

一家公司想要创建品牌专属的语音合成声音。应该使用什么？

- A. 标准语音
- B. 自定义神经语音 (Custom Neural Voice)
- C. 预构建神经语音
- D. SSML

**答案**: B

**解析**:
自定义神经语音：
- 训练独特的品牌声音
- 需要录制语音数据
- 高质量自然语音
- 有道德使用要求

---

### Q11
<!-- domain: 4 | difficulty: hard | tags: Bot-Framework, proactive -->

如何让Bot主动向用户发送消息（而不是等待用户输入）？

- A. 使用轮询
- B. 使用主动消息 (Proactive Messages)
- C. 创建多个Bot
- D. 使用Webhook

**答案**: B

**解析**:
主动消息：
- 保存conversation reference
- 后台触发时发送消息
- 需要用户先与Bot交互过
- 适合通知、提醒

---

### Q12
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, ID -->

一家公司想要从身份证件中提取信息。应该使用Document Intelligence的什么模型？

- A. 发票模型
- B. ID文档模型
- C. 自定义模型
- D. 布局模型

**答案**: B

**解析**:
ID文档模型支持：
- 护照
- 驾照
- 身份证
- 提取姓名、出生日期、证件号等

---

### Q13
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, debug -->

Azure AI Search索引器运行失败。如何诊断问题？

- A. 删除并重建
- B. 查看索引器执行历史和错误详情
- C. 增加分区
- D. 更换数据源

**答案**: B

**解析**:
诊断索引器问题：
- 查看执行历史
- 检查错误消息
- 查看跳过的文档
- 查看警告
- 使用Debug Sessions

---

### Q14
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, playground -->

Azure OpenAI Studio的Chat Playground用于什么？

- A. 训练模型
- B. 测试和调整提示词
- C. 部署模型
- D. 监控成本

**答案**: B

**解析**:
Chat Playground功能：
- 交互式测试
- 调整系统消息
- 修改参数（temperature等）
- 导出代码
- 配置数据源

---

### Q15
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, RBAC -->

一家公司想要让开发人员使用Azure OpenAI进行测试，但不能查看或修改部署配置。应该分配什么角色？

- A. Cognitive Services OpenAI Contributor
- B. Cognitive Services OpenAI User
- C. Owner
- D. Reader

**答案**: B

**解析**:
Azure OpenAI RBAC角色：
- Contributor：管理资源和部署
- User：只能调用API
- 最小权限原则

---

### Q16
<!-- domain: 1 | difficulty: medium | tags: compliance, data-residency -->

一家欧洲公司需要确保数据处理符合GDPR。在选择Azure AI服务区域时应该考虑什么？

- A. 选择最便宜的区域
- B. 选择欧洲区域以满足数据驻留要求
- C. 随机选择
- D. 只选择美国区域

**答案**: B

**解析**:
数据驻留考虑：
- GDPR要求数据在欧盟处理
- 选择西欧、北欧等区域
- 检查服务可用性
- 审查数据传输政策

---

### Q17
<!-- domain: 3 | difficulty: medium | tags: Video-Indexer, timeline -->

Video Indexer可以生成什么类型的时间线？

- A. 只有音频时间线
- B. 视觉和音频时间线（场景、说话人、关键词）
- C. 只有视觉时间线
- D. 不支持时间线

**答案**: B

**解析**:
Video Indexer时间线包括：
- 场景/镜头切换
- 说话人发言时间
- 关键词出现时间
- 情感变化
- 人脸出现时间

---

### Q18
<!-- domain: 4 | difficulty: medium | tags: Language-Service, linked-entities -->

链接实体识别(Entity Linking)与命名实体识别(NER)的主要区别是什么？

- A. 没有区别
- B. Entity Linking将实体链接到知识库（如Wikipedia）
- C. NER更快
- D. Entity Linking只识别人名

**答案**: B

**解析**:
Entity Linking：
- 识别实体并链接到知识库
- 提供Wikipedia/Bing链接
- 消除歧义（如"Apple"是公司还是水果）
- NER只识别类型，不链接

---

### Q19
<!-- domain: 4 | difficulty: hard | tags: Bot-Framework, state -->

在Bot Framework中，如何在多轮对话中保持状态？

- A. 使用全局变量
- B. 使用状态管理（UserState, ConversationState）
- C. 每次重新开始
- D. 存储在文件

**答案**: B

**解析**:
Bot状态管理：
- UserState：用户级别，跨对话保持
- ConversationState：对话级别
- PrivateConversationState：用户+对话
- 可存储在Memory、Blob、CosmosDB

---

### Q20
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, W2 -->

一家公司需要从美国W-2税务表格中提取数据。应该使用什么模型？

- A. 自定义模型
- B. 预构建W-2模型
- C. 发票模型
- D. 通用文档

**答案**: B

**解析**:
Document Intelligence预构建模型包括：
- W-2税务表
- 1099表格
- 发票
- 收据
- 身份证
- 名片

---

### Q21
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, analyzer -->

在Azure AI Search中，如何正确处理中文文本搜索？

- A. 使用默认分析器
- B. 使用中文语言分析器（zh-Hans或zh-Hant）
- C. 不需要配置
- D. 只使用英文

**答案**: B

**解析**:
语言分析器：
- 正确分词（中文没有空格）
- 处理语言特性
- 提高搜索质量
- 在索引字段定义中配置

---

### Q22
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, context -->

当Azure OpenAI的回答不够具体或缺少上下文时，应该怎么做？

- A. 使用更大的模型
- B. 在系统消息或用户消息中提供更多上下文
- C. 增加temperature
- D. 减少max_tokens

**答案**: B

**解析**:
改善回答质量：
- 在System message中定义角色和背景
- 在User message中提供具体上下文
- 使用少量示例（Few-shot）
- 明确指定输出格式

---

### Q23
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, token-counting -->

如何估算发送到Azure OpenAI的请求将消耗多少tokens？

- A. 字数等于token数
- B. 使用tokenizer库（如tiktoken）
- C. API自动计算不需要关心
- D. 每个字符一个token

**答案**: B

**解析**:
Token估算：
- 使用tiktoken（OpenAI的tokenizer）
- 英文约4字符=1token
- 中文约1-2字符=1-2tokens
- 影响计费和上下文限制

---

### Q24
<!-- domain: 1 | difficulty: medium | tags: tagging, resource-management -->

如何按项目或团队跟踪Azure AI服务的成本？

- A. 创建单独的订阅
- B. 使用资源标签(Tags)
- C. 手动记录
- D. 不可能

**答案**: B

**解析**:
资源标签：
- 添加键值对标签（如Project:ChatBot）
- 在Cost Management中按标签筛选
- 创建成本报告
- 设置预算警报

---

### Q25
<!-- domain: 3 | difficulty: medium | tags: Computer-Vision, people -->

一家零售店想要计算进入商店的人数。应该使用什么？

- A. 人脸识别
- B. 空间分析 - 人员计数
- C. 对象检测
- D. 图像分类

**答案**: B

**解析**:
空间分析人员计数：
- 计算进入/离开的人数
- 实时分析
- 需要边缘设备
- 不识别身份（隐私友好）

---

### Q26
<!-- domain: 4 | difficulty: medium | tags: Translator, document-types -->

Azure文档翻译支持哪些文件格式？

- A. 只有TXT
- B. DOCX, PDF, PPTX, XLSX, HTML等
- C. 只有PDF
- D. 只有Word

**答案**: B

**解析**:
支持的格式：
- Microsoft Office（Word, Excel, PowerPoint）
- PDF
- HTML
- 纯文本
- Markdown
- 保持原始格式

---

### Q27
<!-- domain: 4 | difficulty: hard | tags: Bot-Framework, OAuth -->

一家公司想要让Bot使用用户的Microsoft 365身份执行操作。应该使用什么？

- A. 硬编码凭据
- B. Bot Framework OAuth连接
- C. API密钥
- D. 匿名访问

**答案**: B

**解析**:
Bot OAuth：
- 在Bot注册中配置OAuth连接
- 用户授权
- 获取访问令牌
- 代表用户调用API（Graph API等）

---

### Q28
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, autocomplete -->

一家公司想要在搜索框中提供自动补全建议。应该配置什么？

- A. 分面导航
- B. 建议器(Suggester)
- C. 同义词
- D. 评分配置

**答案**: B

**解析**:
建议器配置：
- 在索引上定义建议器
- 指定source字段
- 选择模式（analyzingInfixMatching等）
- 调用Suggest或Autocomplete API

---

### Q29
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, streaming -->

如何使Azure OpenAI API返回流式响应（边生成边返回）？

- A. 使用更小的max_tokens
- B. 设置stream=true
- C. 使用不同的端点
- D. 不支持

**答案**: B

**解析**:
流式响应：
- 设置stream: true
- 使用Server-Sent Events
- 边生成边返回
- 改善用户体验

---

### Q30
<!-- domain: 6 | difficulty: hard | tags: prompt-injection, security -->

如何防止用户通过提示注入绕过Azure OpenAI应用的安全限制？

- A. 不需要防护
- B. 输入验证、使用系统消息强化规则、内容过滤
- C. 只限制输出长度
- D. 使用更小的模型

**答案**: B

**解析**:
防护措施：
- 验证和清理用户输入
- 系统消息中强调限制
- 分离用户输入和系统指令
- 使用内容过滤
- 监控异常模式

---

### Q31
<!-- domain: 1 | difficulty: medium | tags: endpoint-selection -->

一家公司在东亚有大量用户。为了最小化延迟，应该将Azure AI服务部署在哪里？

- A. 美国西部
- B. 东亚或东南亚区域
- C. 欧洲西部
- D. 随机选择

**答案**: B

**解析**:
区域选择考虑：
- 用户地理位置
- 延迟要求
- 服务可用性
- 合规要求
- 成本差异

---

### Q32
<!-- domain: 3 | difficulty: hard | tags: Face-API, consent -->

在使用Face API时，以下哪项是合规使用的要求？

- A. 不需要任何同意
- B. 获取用户同意、明确告知用途、遵守隐私法规
- C. 只需要技术实现
- D. 只需要内部批准

**答案**: B

**解析**:
Face API合规要求：
- 获取知情同意
- 透明告知用途
- 数据保护措施
- 遵守GDPR等法规
- 定期审核使用

---

### Q33
<!-- domain: 4 | difficulty: medium | tags: Language-Service, extractive-summarization -->

抽取式摘要(Extractive Summarization)和抽象式摘要(Abstractive Summarization)的区别是什么？

- A. 没有区别
- B. 抽取式选择原文句子，抽象式生成新文本
- C. 抽象式更快
- D. 抽取式只用于英文

**答案**: B

**解析**:
摘要类型：
- 抽取式：从原文选择关键句子
- 抽象式：生成新的摘要文本
- 抽取式更可靠（不会编造）
- 抽象式更流畅自然

---

### Q34
<!-- domain: 4 | difficulty: hard | tags: Speech-Service, diarization -->

一家公司想要从会议录音中识别不同发言者。应该使用什么功能？

- A. 标准转录
- B. 说话人分离(Diarization)
- C. 关键词检测
- D. 翻译

**答案**: B

**解析**:
说话人分离：
- 识别不同说话人
- 标记每段话的说话人
- 支持实时和批量
- 适合会议、电话录音

---

### Q35
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, read -->

Document Intelligence的Read API与Computer Vision的OCR有什么区别？

- A. 完全相同
- B. Read API针对文档优化，支持更多格式和更好的表格识别
- C. OCR更准确
- D. Read只支持打印文本

**答案**: B

**解析**:
Document Intelligence Read优势：
- 针对文档优化
- 更好的表格识别
- 支持PDF（多页）
- 段落结构识别
- 读取顺序检测

---

### Q36
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, stop-sequences -->

在Azure OpenAI中，"stop sequences"参数的作用是什么？

- A. 限制输入长度
- B. 指定遇到特定字符串时停止生成
- C. 停止API服务
- D. 限制并发

**答案**: B

**解析**:
Stop sequences：
- 遇到指定字符串停止
- 控制输出格式
- 例如：遇到"\n\n"停止
- 防止无限生成

---

### Q37
<!-- domain: 1 | difficulty: hard | tags: SLA -->

Azure AI服务的SLA通常是多少？

- A. 100%
- B. 99.9%（大多数服务）
- C. 50%
- D. 没有SLA

**答案**: B

**解析**:
Azure SLA：
- 大多数AI服务99.9%
- 需要合理配置
- 读取官方SLA文档
- 可能因区域和服务而异

---

### Q38
<!-- domain: 3 | difficulty: medium | tags: Custom-Vision, negative -->

在Custom Vision中，什么是"负样本(Negative Samples)"，为什么重要？

- A. 质量差的图片
- B. 不属于任何类别的图像，帮助模型学习"什么不是"
- C. 黑白图片
- D. 小尺寸图片

**答案**: B

**解析**:
负样本：
- 不包含目标对象的图像
- 帮助减少误报
- 特别对对象检测重要
- 标记为"Negative"标签

---

### Q39
<!-- domain: 4 | difficulty: medium | tags: Translator, profanity -->

Azure Translator如何处理翻译中的不雅词汇？

- A. 总是保留
- B. 可配置：保留、删除或标记
- C. 总是删除
- D. 总是替换为***

**答案**: B

**解析**:
不雅内容处理选项：
- NoAction：保留原样
- Deleted：删除
- Marked：用标签标记
- 根据应用需求选择

---

### Q40
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, skillset-caching -->

如何避免每次重建索引时重新运行耗时的技能集？

- A. 无法避免
- B. 启用增量增强和技能集缓存
- C. 使用更快的技能
- D. 减少技能数量

**答案**: B

**解析**:
增量增强：
- 缓存技能输出
- 只处理更改的文档
- 减少API调用成本
- 加快索引时间

---

### Q41
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, seed -->

Azure OpenAI的"seed"参数用于什么？

- A. 生成随机数
- B. 使输出更可重现（相同输入相同输出）
- C. 加速生成
- D. 减少成本

**答案**: B

**解析**:
Seed参数：
- 增加输出可重现性
- 相同seed+输入倾向于产生相同输出
- 测试和调试有用
- 不是100%确定性

---

### Q42
<!-- domain: 2 | difficulty: medium | tags: Personalizer, exploration -->

在Personalizer中，"exploration"设置控制什么？

- A. 用户可以访问的内容
- B. 模型尝试新选择而非已知最优选择的比例
- C. API响应时间
- D. 数据保留期

**答案**: B

**解析**:
探索vs利用：
- 利用：选择已知最佳选项
- 探索：尝试其他选项以发现更好的
- 平衡两者才能持续学习
- 通过设置控制探索比例

---

### Q43
<!-- domain: 3 | difficulty: medium | tags: Video-Indexer, brands -->

如何让Video Indexer识别公司特定的品牌名称？

- A. 自动识别所有品牌
- B. 创建自定义品牌模型
- C. 无法识别自定义品牌
- D. 使用不同的服务

**答案**: B

**解析**:
自定义品牌模型：
- 添加品牌名称和描述
- 可以包含/排除特定品牌
- 在转录和视觉中检测
- 账户级别配置

---

### Q44
<!-- domain: 4 | difficulty: hard | tags: CLU, orchestration -->

如何在一个应用中组合多个CLU项目？

- A. 无法组合
- B. 使用编排项目(Orchestration)
- C. 合并为一个项目
- D. 使用多个端点

**答案**: B

**解析**:
编排工作流程：
- 创建编排项目
- 连接多个CLU和QnA项目
- 自动路由到正确的子项目
- 统一的入口点

---

### Q45
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, debug-session -->

Azure AI Search的Debug Sessions功能用于什么？

- A. 代码调试
- B. 可视化调试技能集处理流程
- C. 性能测试
- D. 成本分析

**答案**: B

**解析**:
Debug Sessions：
- 交互式技能集调试
- 查看每个技能的输入/输出
- 修改技能定义并测试
- 诊断增强问题

---

### Q46
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, abuse-monitoring -->

Azure OpenAI的滥用监控如何工作？

- A. 不监控
- B. 自动检测并记录潜在滥用，可触发审核
- C. 完全手动
- D. 只监控成本

**答案**: B

**解析**:
滥用监控：
- 自动检测违规内容
- 记录用于审核（可选择退出部分）
- 严重违规可能暂停账户
- 符合负责任AI原则

---

### Q47
<!-- domain: 1 | difficulty: medium | tags: throttling -->

当Azure AI服务返回429错误时，应该如何处理？

- A. 立即重试
- B. 实现指数退避重试
- C. 放弃请求
- D. 换一个账户

**答案**: B

**解析**:
429 Too Many Requests处理：
- 等待后重试
- 指数退避（逐渐增加等待时间）
- 检查Retry-After头
- 考虑申请更高配额

---

### Q48
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, conversation -->

Azure Speech Service的Conversation Transcription用于什么场景？

- A. 单人独白
- B. 多人会议的实时转录和说话人识别
- C. 文本转语音
- D. 翻译

**答案**: B

**解析**:
Conversation Transcription：
- 多人对话场景
- 实时转录
- 说话人分离
- 适合会议、电话会议

---

### Q49
<!-- domain: 5 | difficulty: hard | tags: Form-Recognizer, accuracy -->

如何提高Document Intelligence自定义模型的准确性？

- A. 使用更少的训练文档
- B. 增加多样化的训练样本，确保标签准确
- C. 只使用一种类型的文档
- D. 降低置信度阈值

**答案**: B

**解析**:
提高准确性：
- 增加训练样本（最少5个，推荐更多）
- 样本多样性（不同质量、布局）
- 准确一致的标签
- 包含边界情况

---

### Q50
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, responsible -->

以下哪项是Azure OpenAI负责任使用的最佳实践？

- A. 不需要任何限制
- B. 实施用户认证、内容过滤、人工审核、使用监控
- C. 只限制调用次数
- D. 只用于内部测试

**答案**: B

**解析**:
负责任使用实践：
- 用户认证和授权
- 内容过滤（输入和输出）
- 人工审核高风险场景
- 监控使用模式
- 明确AI使用的透明度
- 有反馈和投诉渠道

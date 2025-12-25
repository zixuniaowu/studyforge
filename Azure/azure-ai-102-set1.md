# Microsoft Azure AI Engineer Associate (AI-102) - Set 1

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
<!-- domain: 1 | difficulty: easy | tags: Azure-AI-Services, multi-service -->

一家公司想要使用单个端点和密钥访问多个Azure AI服务（如视觉、语言、语音）。应该创建哪种类型的资源？

- A. Computer Vision资源
- B. Language资源
- C. Azure AI Services多服务资源
- D. 每个服务分别创建资源

**答案**: C

**解析**:
Azure AI Services多服务资源（以前称为Cognitive Services）提供单个端点和密钥访问多个AI服务，简化管理和计费。适合需要使用多个AI功能的应用程序。

---

### Q2
<!-- domain: 1 | difficulty: medium | tags: container, deployment -->

一家公司想要在本地数据中心运行Azure AI服务以满足数据驻留要求。应该使用什么部署方式？

- A. 使用公共云端点
- B. 部署Azure AI服务容器
- C. 使用Azure Functions
- D. 使用Azure Logic Apps

**答案**: B

**解析**:
Azure AI服务容器允许在本地或任何支持Docker的环境中运行AI服务，满足数据隐私和驻留要求。容器仍需要连接Azure进行计费。

---

### Q3
<!-- domain: 1 | difficulty: medium | tags: diagnostic, logging -->

一家公司需要监控其Azure AI服务的API调用和性能。应该启用什么功能？

- A. Azure Monitor诊断日志
- B. Azure Backup
- C. Azure Site Recovery
- D. Azure Traffic Manager

**答案**: A

**解析**:
Azure Monitor诊断日志记录API调用、延迟、错误等信息，可发送到Log Analytics、存储账户或Event Hub进行分析和监控。

---

### Q4
<!-- domain: 1 | difficulty: easy | tags: RBAC, security -->

一家公司想要限制只有特定用户可以管理Azure AI服务资源，而其他用户只能调用API。应该使用什么？

- A. 网络安全组
- B. Azure RBAC角色分配
- C. 防火墙规则
- D. 加密密钥

**答案**: B

**解析**:
RBAC（基于角色的访问控制）可以分配不同角色：
- Cognitive Services Contributor：管理资源
- Cognitive Services User：只能调用API

---

### Q5
<!-- domain: 1 | difficulty: medium | tags: virtual-network, private-endpoint -->

一家公司想要确保Azure AI服务的流量不经过公共互联网。应该配置什么？

- A. 公共IP地址
- B. 私有端点（Private Endpoint）
- C. 负载均衡器
- D. CDN

**答案**: B

**解析**:
私有端点在虚拟网络中创建私有IP地址，流量通过Azure骨干网络传输，不经过公共互联网，提高安全性。

---

### Q6
<!-- domain: 2 | difficulty: medium | tags: Anomaly-Detector -->

一家公司想要检测IoT传感器数据中的异常。应该使用哪个Azure AI服务？

- A. Computer Vision
- B. Anomaly Detector
- C. Language Understanding
- D. Text Analytics

**答案**: B

**解析**:
Anomaly Detector专门检测时间序列数据中的异常，适用于IoT监控、业务指标监控、欺诈检测等场景。

---

### Q7
<!-- domain: 2 | difficulty: medium | tags: Personalizer, reinforcement-learning -->

一家公司想要为用户提供个性化的内容推荐，并根据用户反馈不断优化。应该使用哪个Azure AI服务？

- A. Content Moderator
- B. Personalizer
- C. QnA Maker
- D. Form Recognizer

**答案**: B

**解析**:
Personalizer使用强化学习根据用户上下文和反馈提供个性化推荐，并不断优化模型。适用于内容推荐、产品推荐等场景。

---

### Q8
<!-- domain: 2 | difficulty: easy | tags: Content-Moderator -->

一家公司想要自动检测用户上传图片中的不当内容。应该使用哪个Azure AI服务？

- A. Computer Vision
- B. Content Moderator
- C. Face API
- D. Custom Vision

**答案**: B

**解析**:
Content Moderator专门检测图像、文本和视频中的不当、冒犯性或潜在有害内容，支持自定义审核列表。

---

### Q9
<!-- domain: 3 | difficulty: easy | tags: Computer-Vision, image-analysis -->

一家公司想要自动为上传的图片生成描述性标签和标题。应该使用哪个Azure AI服务功能？

- A. Face API
- B. Computer Vision - 图像分析
- C. Custom Vision
- D. Video Indexer

**答案**: B

**解析**:
Computer Vision的图像分析功能可以：
- 生成图像描述和标签
- 检测对象和品牌
- 识别名人和地标
- 生成智能裁剪缩略图

---

### Q10
<!-- domain: 3 | difficulty: medium | tags: Custom-Vision, classification -->

一家公司想要创建一个模型来识别自家产品的不同类型。Azure中没有预构建的模型可以识别这些产品。应该使用什么？

- A. Computer Vision API
- B. Custom Vision - 训练自定义分类模型
- C. Form Recognizer
- D. Language Understanding

**答案**: B

**解析**:
Custom Vision允许使用自己的图像训练自定义分类或对象检测模型，适用于特定领域的视觉识别需求。

---

### Q11
<!-- domain: 3 | difficulty: medium | tags: Custom-Vision, object-detection -->

一家公司想要在图像中检测多个产品并标记它们的位置。应该使用Custom Vision的哪种项目类型？

- A. 分类 (Classification)
- B. 对象检测 (Object Detection)
- C. 多标签分类
- D. 图像分割

**答案**: B

**解析**:
- 分类：识别图像属于哪个类别（整张图一个标签）
- 对象检测：在图像中找到多个对象并标记位置（边界框）

---

### Q12
<!-- domain: 3 | difficulty: medium | tags: Face-API, verification -->

一家公司想要实现员工人脸识别打卡系统。应该使用Face API的哪个功能？

- A. 人脸检测 (Face Detection)
- B. 人脸验证 (Face Verification)
- C. 人脸分组 (Face Grouping)
- D. 情绪检测

**答案**: B

**解析**:
- 人脸检测：找到图像中的人脸
- 人脸验证：比较两张人脸是否为同一人（1:1比对）
- 人脸识别：在人群中找到特定人（1:N比对）

---

### Q13
<!-- domain: 3 | difficulty: hard | tags: Face-API, PersonGroup -->

使用Face API进行人脸识别时，需要先创建什么来存储已知人员的人脸数据？

- A. Face List
- B. Person Group
- C. Blob Container
- D. Cosmos DB

**答案**: B

**解析**:
Person Group是用于存储人员信息和人脸数据的容器，工作流程：
1. 创建Person Group
2. 添加Person（人员）
3. 为每个Person添加人脸
4. 训练Person Group
5. 使用Identify进行识别

---

### Q14
<!-- domain: 3 | difficulty: medium | tags: OCR, Read-API -->

一家公司想要从扫描的发票图像中提取文字。应该使用Computer Vision的哪个功能？

- A. Analyze Image
- B. Read API (OCR)
- C. Detect Objects
- D. Tag Image

**答案**: B

**解析**:
Read API是Azure的OCR服务，可以从图像和PDF中提取打印和手写文字，支持多种语言，适用于文档处理场景。

---

### Q15
<!-- domain: 3 | difficulty: medium | tags: Video-Indexer -->

一家公司想要自动从视频中提取见解，包括说话人识别、情感分析和主题检测。应该使用什么服务？

- A. Computer Vision
- B. Azure Video Indexer
- C. Azure Media Services
- D. Stream Analytics

**答案**: B

**解析**:
Video Indexer从视频中提取丰富的见解：
- 语音转录
- 说话人识别
- 人脸识别
- 情感检测
- 关键词和主题
- 场景分割

---

### Q16
<!-- domain: 4 | difficulty: easy | tags: Language-Service, sentiment -->

一家公司想要分析客户评论的情感倾向。应该使用Azure AI Language的哪个功能？

- A. 命名实体识别
- B. 情感分析
- C. 关键词提取
- D. 语言检测

**答案**: B

**解析**:
情感分析返回：
- 文档级别情感（正面/负面/中性/混合）
- 句子级别情感
- 置信度分数

---

### Q17
<!-- domain: 4 | difficulty: easy | tags: Language-Service, NER -->

一家公司想要从文本中自动提取人名、地点、组织等实体。应该使用什么功能？

- A. 情感分析
- B. 命名实体识别 (NER)
- C. 文本摘要
- D. 问答

**答案**: B

**解析**:
命名实体识别 (NER) 识别文本中的实体类别：
- 人名、地点、组织
- 日期、时间
- 数量、货币
- 电话、邮箱、URL

---

### Q18
<!-- domain: 4 | difficulty: medium | tags: CLU, intent -->

一家公司想要创建一个能够理解用户自然语言命令的聊天机器人。应该使用什么Azure服务来训练意图识别？

- A. QnA Maker
- B. Conversational Language Understanding (CLU)
- C. Text Analytics
- D. Translator

**答案**: B

**解析**:
CLU（原LUIS）用于构建自然语言理解模型：
- 定义意图 (Intents)
- 定义实体 (Entities)
- 提供示例话语
- 训练和发布模型

---

### Q19
<!-- domain: 4 | difficulty: medium | tags: CLU, entities -->

在CLU模型中，"我想订2张明天下午3点去上海的机票"这句话中，"2张"、"明天下午3点"、"上海"应该标记为什么？

- A. 意图 (Intents)
- B. 实体 (Entities)
- C. 话语 (Utterances)
- D. 特征 (Features)

**答案**: B

**解析**:
实体是话语中需要提取的关键信息：
- 数量实体：2张
- 日期时间实体：明天下午3点
- 地点实体：上海

意图是用户的目的（如"订机票"）。

---

### Q20
<!-- domain: 4 | difficulty: easy | tags: Translator -->

一家公司想要将网站内容翻译成多种语言。应该使用哪个Azure服务？

- A. Language Understanding
- B. Azure Translator
- C. Text Analytics
- D. Speech Service

**答案**: B

**解析**:
Azure Translator提供：
- 文本翻译（支持100+语言）
- 文档翻译
- 自定义翻译器（领域特定术语）
- 字典查询

---

### Q21
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, STT -->

一家公司想要将客服电话录音转换为文本进行分析。应该使用Speech Service的哪个功能？

- A. 文本转语音 (TTS)
- B. 语音转文本 (STT)
- C. 语音翻译
- D. 说话人识别

**答案**: B

**解析**:
语音转文本 (Speech-to-Text)：
- 实时转录
- 批量转录
- 支持自定义模型
- 支持多种语言

---

### Q22
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, TTS -->

一家公司想要为其应用程序添加语音播报功能，使用自然的人类声音。应该使用什么？

- A. 语音转文本
- B. 文本转语音 (TTS)
- C. 语音翻译
- D. 关键词识别

**答案**: B

**解析**:
文本转语音 (TTS)：
- 神经网络语音（最自然）
- 自定义语音（训练独特声音）
- SSML控制（语速、音调、停顿）

---

### Q23
<!-- domain: 4 | difficulty: hard | tags: Speech-Service, custom-model -->

一家公司的语音识别准确率较低，因为其行业有很多专业术语。应该如何改进？

- A. 使用更高的采样率
- B. 训练自定义语音模型
- C. 增加音频音量
- D. 使用更长的音频文件

**答案**: B

**解析**:
自定义语音模型可以：
- 添加领域特定词汇
- 使用特定音频数据训练
- 提高专业术语识别准确率

---

### Q24
<!-- domain: 4 | difficulty: medium | tags: QnA-Maker, knowledge-base -->

一家公司想要创建一个FAQ机器人，从现有文档自动回答常见问题。应该使用什么？

- A. Language Understanding
- B. 自定义问答 (Custom Question Answering)
- C. Text Analytics
- D. Personalizer

**答案**: B

**解析**:
自定义问答（原QnA Maker）：
- 从文档、网页、FAQ自动提取问答对
- 支持多轮对话
- 可以手动添加和编辑
- 与Bot Framework集成

---

### Q25
<!-- domain: 4 | difficulty: medium | tags: Bot-Framework, channels -->

一家公司创建了一个Azure Bot，想要让用户可以通过Microsoft Teams和网站使用。应该如何配置？

- A. 创建多个Bot
- B. 在Bot中配置多个通道 (Channels)
- C. 使用不同的语言模型
- D. 创建多个资源组

**答案**: B

**解析**:
Bot Framework通道允许一个Bot连接到多个平台：
- Microsoft Teams
- Web Chat
- Facebook Messenger
- Slack
- Line等

---

### Q26
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, prebuilt -->

一家公司想要从发票中自动提取供应商名称、金额、日期等信息。应该使用Azure AI Document Intelligence的哪个模型？

- A. 自定义模型
- B. 预构建发票模型
- C. 布局模型
- D. 通用文档模型

**答案**: B

**解析**:
Azure AI Document Intelligence（原Form Recognizer）预构建模型：
- 发票：供应商、金额、行项目
- 收据：商家、总额、日期
- 身份证件：姓名、证件号
- 名片：联系信息

---

### Q27
<!-- domain: 5 | difficulty: hard | tags: Form-Recognizer, custom -->

一家公司有特殊格式的内部表单，预构建模型无法识别。应该怎么做？

- A. 使用布局API
- B. 训练自定义模型
- C. 使用OCR
- D. 手动输入数据

**答案**: B

**解析**:
自定义模型训练步骤：
1. 收集样本文档（至少5个）
2. 标记字段
3. 训练模型
4. 测试和优化
5. 部署使用

---

### Q28
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, indexer -->

一家公司想要让用户能够搜索存储在Azure Blob中的PDF文档内容。应该使用什么服务？

- A. Azure SQL Search
- B. Azure AI Search
- C. Cosmos DB
- D. Azure Files

**答案**: B

**解析**:
Azure AI Search（原Cognitive Search）：
- 索引器自动抓取Blob中的文档
- 内置技能提取文本、实体、关键词
- 支持全文搜索
- 支持分面导航和过滤

---

### Q29
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, skillset -->

在Azure AI Search中，想要在索引时自动从文档中提取关键短语和实体。应该配置什么？

- A. 索引器 (Indexer)
- B. 技能集 (Skillset)
- C. 索引 (Index)
- D. 数据源 (Data Source)

**答案**: B

**解析**:
技能集是AI增强的管道：
- 内置技能：OCR、关键短语、实体识别、语言检测
- 自定义技能：调用Azure Functions或其他API
- 在索引时自动处理文档

---

### Q30
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, enrichment -->

Azure AI Search的知识挖掘管道按什么顺序处理？

- A. 索引 → 索引器 → 技能集 → 数据源
- B. 数据源 → 索引器 → 技能集 → 索引
- C. 技能集 → 数据源 → 索引器 → 索引
- D. 数据源 → 技能集 → 索引 → 索引器

**答案**: B

**解析**:
知识挖掘管道流程：
1. 数据源：指向原始数据（Blob、SQL等）
2. 索引器：抓取和解析数据
3. 技能集：AI增强处理
4. 索引：存储可搜索的内容

---

### Q31
<!-- domain: 6 | difficulty: easy | tags: Azure-OpenAI, models -->

一家公司想要使用GPT模型在Azure上构建生成式AI应用。应该使用什么服务？

- A. Azure Machine Learning
- B. Azure OpenAI Service
- C. Azure Bot Service
- D. Azure Cognitive Search

**答案**: B

**解析**:
Azure OpenAI Service提供：
- GPT-4, GPT-4o, GPT-3.5-Turbo等模型
- DALL-E图像生成
- 嵌入模型
- Azure级别的安全和合规

---

### Q32
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, deployment -->

在使用Azure OpenAI之前，需要先做什么？

- A. 直接调用API
- B. 创建部署（Deployment）
- C. 训练模型
- D. 上传数据

**答案**: B

**解析**:
Azure OpenAI使用流程：
1. 创建Azure OpenAI资源
2. 创建模型部署（选择模型和容量）
3. 使用端点和密钥调用API

---

### Q33
<!-- domain: 6 | difficulty: medium | tags: prompt-engineering -->

以下哪种提示工程技术最适合让模型执行复杂推理任务？

- A. Zero-shot prompting
- B. Few-shot prompting
- C. Chain-of-thought prompting
- D. 简单指令

**答案**: C

**解析**:
Chain-of-thought提示让模型逐步推理：
- 在提示中展示推理过程
- 或使用"让我们一步一步思考"
- 适合数学、逻辑、多步骤问题

---

### Q34
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, embedding -->

一家公司想要实现语义搜索，让用户可以用自然语言查找相关文档。应该使用Azure OpenAI的什么功能？

- A. Chat Completion
- B. Embeddings
- C. DALL-E
- D. Fine-tuning

**答案**: B

**解析**:
Embeddings将文本转换为向量：
- 语义相似的文本向量接近
- 用于语义搜索、推荐
- 是RAG系统的基础

---

### Q35
<!-- domain: 6 | difficulty: hard | tags: RAG, Azure-OpenAI -->

一家公司想要让GPT模型基于公司内部文档回答问题。最佳实践是什么？

- A. 将所有文档作为系统提示
- B. 实现RAG（检索增强生成）
- C. 微调模型
- D. 使用更大的模型

**答案**: B

**解析**:
RAG工作流程：
1. 将文档分块并生成嵌入向量
2. 存储到向量数据库
3. 用户提问时检索相关块
4. 将检索结果和问题一起给模型
5. 模型基于上下文生成答案

---

### Q36
<!-- domain: 6 | difficulty: medium | tags: content-filtering -->

Azure OpenAI Service内置了什么功能来防止生成有害内容？

- A. 网络防火墙
- B. 内容过滤
- C. 数据加密
- D. 访问控制

**答案**: B

**解析**:
Azure OpenAI内容过滤：
- 仇恨内容
- 性内容
- 暴力内容
- 自残内容
- 可配置严格程度

---

### Q37
<!-- domain: 1 | difficulty: medium | tags: managed-identity -->

一家公司想要从Azure Function安全地调用Azure AI服务，而不在代码中存储密钥。应该使用什么？

- A. 环境变量
- B. Azure Key Vault
- C. 托管标识 (Managed Identity)
- D. 硬编码密钥

**答案**: C

**解析**:
托管标识：
- 自动管理身份验证
- 无需管理凭据
- 与Azure AD集成
- 更安全的最佳实践

---

### Q38
<!-- domain: 3 | difficulty: medium | tags: Spatial-Analysis -->

一家零售公司想要分析店内顾客的移动模式和停留时间。应该使用什么？

- A. Face API
- B. Spatial Analysis
- C. Custom Vision
- D. Video Indexer

**答案**: B

**解析**:
Spatial Analysis（空间分析）：
- 人员计数
- 社交距离监控
- 进入/退出检测
- 区域停留时间
- 需要部署到边缘设备

---

### Q39
<!-- domain: 4 | difficulty: medium | tags: PII-detection -->

一家公司需要在处理客户文本之前检测并屏蔽个人身份信息(PII)。应该使用什么？

- A. 情感分析
- B. PII检测
- C. 命名实体识别
- D. 关键词提取

**答案**: B

**解析**:
PII检测是Language服务的功能：
- 识别姓名、地址、电话等
- 可以自动编辑/屏蔽
- 符合隐私合规要求

---

### Q40
<!-- domain: 4 | difficulty: easy | tags: language-detection -->

一家公司收到来自全球客户的消息，需要先确定消息使用的语言再进行后续处理。应该使用什么？

- A. 语言检测
- B. 翻译
- C. 情感分析
- D. 文本摘要

**答案**: A

**解析**:
语言检测返回：
- 检测到的语言ISO代码
- 置信度分数
- 支持检测120+语言

---

### Q41
<!-- domain: 5 | difficulty: medium | tags: knowledge-store -->

在Azure AI Search中，想要将AI增强的输出保存到Blob存储以供其他应用使用。应该配置什么？

- A. 索引
- B. 知识存储 (Knowledge Store)
- C. 数据源
- D. 同义词映射

**答案**: B

**解析**:
知识存储将技能集的输出投影到：
- Azure Blob Storage（文档、图像）
- Azure Table Storage（表格数据）
- 可供Power BI等工具使用

---

### Q42
<!-- domain: 6 | difficulty: medium | tags: system-message -->

在Azure OpenAI中，如何设置模型的行为、角色和约束？

- A. User message
- B. System message
- C. Assistant message
- D. Function message

**答案**: B

**解析**:
System message用于：
- 定义AI助手的角色
- 设置回答的风格和格式
- 添加约束和规则
- 提供背景上下文

---

### Q43
<!-- domain: 6 | difficulty: hard | tags: fine-tuning -->

什么情况下应该考虑微调(Fine-tuning) Azure OpenAI模型？

- A. 需要模型遵循特定格式
- B. 需要访问最新信息
- C. 需要降低延迟
- D. 需要减少计算成本

**答案**: A

**解析**:
微调适用于：
- 需要特定的输出格式/风格
- 需要学习特定领域的表达方式
- 需要一致的行为模式

不需要微调的情况：
- 最新信息 → 使用RAG
- 特定知识 → 使用RAG

---

### Q44
<!-- domain: 1 | difficulty: medium | tags: pricing, commitment-tier -->

一家公司有稳定的Azure AI服务使用量。如何降低成本？

- A. 使用按需付费
- B. 使用承诺层级 (Commitment Tier)
- C. 减少API调用
- D. 使用更小的模型

**答案**: B

**解析**:
承诺层级：
- 预付费一定使用量
- 获得折扣价格
- 适合可预测的工作负载
- 超出部分按标准价格计费

---

### Q45
<!-- domain: 3 | difficulty: medium | tags: Custom-Vision, export -->

一家公司训练了Custom Vision模型，想要在没有网络连接的设备上运行。应该怎么做？

- A. 使用云端点
- B. 导出为ONNX、TensorFlow或Docker格式
- C. 使用Azure IoT Hub
- D. 使用Azure Stack

**答案**: B

**解析**:
Custom Vision支持导出：
- ONNX（通用格式）
- TensorFlow
- CoreML（iOS）
- Docker容器
- 导出后可离线运行

---

### Q46
<!-- domain: 4 | difficulty: medium | tags: summarization -->

一家公司想要自动生成长文档的摘要。应该使用Azure AI Language的什么功能？

- A. 关键词提取
- B. 文档摘要
- C. 情感分析
- D. 文本分类

**答案**: B

**解析**:
文档摘要功能：
- 抽取式摘要：提取关键句子
- 抽象式摘要：生成新的摘要文本
- 支持会议转录摘要

---

### Q47
<!-- domain: 5 | difficulty: hard | tags: semantic-ranking -->

在Azure AI Search中，如何提高搜索结果的相关性，使其理解查询的语义意图？

- A. 增加索引字段
- B. 使用语义排名 (Semantic Ranking)
- C. 增加分区数
- D. 使用更多过滤器

**答案**: B

**解析**:
语义排名：
- 使用机器学习理解查询意图
- 重新排序搜索结果
- 提取语义答案
- 生成标题摘要

---

### Q48
<!-- domain: 6 | difficulty: medium | tags: function-calling -->

在Azure OpenAI中，如何让模型调用外部API或执行特定操作？

- A. 在提示中包含API文档
- B. 使用Function Calling
- C. 微调模型
- D. 使用RAG

**答案**: B

**解析**:
Function Calling：
- 定义可用函数的schema
- 模型决定何时调用哪个函数
- 返回函数参数
- 开发者执行函数并返回结果

---

### Q49
<!-- domain: 4 | difficulty: medium | tags: Speech-translation -->

一家公司想要实现实时语音翻译，用户说中文可以实时翻译成英语语音输出。应该使用什么？

- A. 语音转文本 + 翻译 + 文本转语音
- B. Speech Translation服务
- C. 只使用翻译服务
- D. 只使用语音服务

**答案**: B

**解析**:
Speech Translation服务：
- 端到端语音翻译
- 实时或批量模式
- 支持语音到语音翻译
- 比分步调用更高效

---

### Q50
<!-- domain: 6 | difficulty: hard | tags: responsible-AI, Azure-OpenAI -->

使用Azure OpenAI构建应用时，以下哪项是负责任AI的最佳实践？

- A. 允许所有类型的用户输入
- B. 实施输入验证、内容过滤和人工审核
- C. 只依赖模型的内置安全性
- D. 不限制模型的输出长度

**答案**: B

**解析**:
负责任AI实践：
- 输入验证和清理
- 内容过滤（Azure OpenAI内置）
- 人工审核机制
- 监控和日志记录
- 透明度（告知用户在与AI交互）
- 定期评估和更新

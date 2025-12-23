# AWS Certified AI Practitioner (AIF-C01) 完整答案解析 - 第一套

> 📝 包含题目 + 正确答案 + 详细解析

---

## 快速答案对照表

| 题号 | 答案 | 题号 | 答案 | 题号 | 答案 | 题号 | 答案 | 题号 | 答案 |
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| Q1  | B | Q11 | A | Q21 | B | Q31 | B | Q41 | C |
| Q2  | A | Q12 | B | Q22 | B | Q32 | B | Q42 | B |
| Q3  | B | Q13 | B | Q23 | C | Q33 | B | Q43 | B |
| Q4  | B | Q14 | B | Q24 | B | Q34 | B | Q44 | B |
| Q5  | B | Q15 | B | Q25 | C | Q35 | B | Q45 | B |
| Q6  | C | Q16 | B | Q26 | A | Q36 | B | Q46 | B |
| Q7  | B | Q17 | B | Q27 | A | Q37 | C | Q47 | B |
| Q8  | C | Q18 | B | Q28 | B | Q38 | B | Q48 | B |
| Q9  | B | Q19 | B | Q29 | B | Q39 | B | Q49 | B |
| Q10 | C | Q20 | B | Q30 | B | Q40 | B | Q50 | B |

---

## Domain 1: Fundamentals of AI and ML

---

### Q1
**题目**：一家公司每季度进行预测以优化运营来满足预期需求。公司使用ML模型进行这些预测。一位AI从业者正在撰写关于已训练ML模型的报告，以向公司利益相关者提供透明度和可解释性。AI从业者应在报告中包含什么以满足透明度和可解释性要求？

A. 模型训练代码  
B. 部分依赖图 (PDPs)  
C. 训练样本数据  
D. 模型收敛表  

**✅ 答案：B - 部分依赖图 (PDPs)**

**解析**：部分依赖图 (Partial Dependence Plots, PDPs) 是机器学习可解释性的重要工具：
- 展示特征对预测结果的边际效应
- 帮助理解模型决策过程
- 为非技术利益相关者提供直观解释

其他选项：代码(A)、样本数据(C)、收敛表(D)都不能直接解释模型行为。

---

### Q2
**题目**：一家公司想要将人类基因分类为20个类别。公司需要一种ML算法来记录模型内部机制如何影响输出。哪种ML算法满足这些要求？

A. 决策树 (Decision trees)  
B. 线性回归 (Linear regression)  
C. 逻辑回归 (Logistic regression)  
D. 神经网络 (Neural networks)  

**✅ 答案：A - 决策树 (Decision trees)**

**解析**：决策树是最具可解释性的ML算法：
- 可视化整个决策过程
- 每个节点有明确规则
- 可追踪完整决策路径
- 属于"白盒"模型

神经网络(D)是"黑盒"，难以解释内部机制。线性/逻辑回归用于回归或二分类，不适合20类分类。

---

### Q3
**题目**：一家公司建立了一个图像分类模型来预测植物叶片照片中的植物疾病。公司想要评估模型正确分类了多少张图像。应该使用哪个评估指标来衡量模型性能？

A. R-squared score (R²分数)  
B. Accuracy (准确率)  
C. Root mean squared error (RMSE)  
D. Learning rate (学习率)  

**✅ 答案：B - Accuracy (准确率)**

**解析**：
- **Accuracy** = 正确预测数 / 总预测数
- 直接衡量"正确分类了多少"
- R²和RMSE是回归指标，不适用于分类
- Learning rate是训练参数，不是评估指标

---

### Q4
**题目**：一家公司正在使用领域特定模型。公司希望避免从头创建新模型，而是想调整预训练模型来为新的相关任务创建模型。哪种ML策略满足这些要求？

A. 增加epochs数量  
B. 使用迁移学习 (Transfer learning)  
C. 减少epochs数量  
D. 使用无监督学习  

**✅ 答案：B - 使用迁移学习 (Transfer learning)**

**解析**：迁移学习将预训练模型的知识转移到新任务：
- 不需要从零开始
- 利用已有知识
- 节省时间和资源
- 只需要少量新数据即可适应新任务

---

### Q5
**题目**：在机器学习中，模型在训练数据上表现很好，但在新数据上表现差。这种现象叫什么？

A. 欠拟合 (Underfitting)  
B. 过拟合 (Overfitting)  
C. 数据漂移 (Data drift)  
D. 模型偏见 (Model bias)  

**✅ 答案：B - 过拟合 (Overfitting)**

**解析**：过拟合特征：
- 训练集表现好
- 新数据/测试集表现差
- 模型"记住"了训练数据而非学习规律

欠拟合(A)是两边都表现差。数据漂移(C)是生产数据分布变化。

---

### Q6
**题目**：以下哪种学习类型使用带标签的数据进行训练？

A. 强化学习 (Reinforcement Learning)  
B. 无监督学习 (Unsupervised Learning)  
C. 监督学习 (Supervised Learning)  
D. 自监督学习 (Self-supervised Learning)  

**✅ 答案：C - 监督学习 (Supervised Learning)**

**解析**：
- **监督学习**：带标签数据（输入-输出对）
- **无监督学习**：无标签数据，发现模式
- **强化学习**：通过奖励信号学习
- **自监督学习**：从数据自身生成标签

---

### Q7
**题目**：预测房屋价格属于哪种类型的ML问题？

A. 分类 (Classification)  
B. 回归 (Regression)  
C. 聚类 (Clustering)  
D. 降维 (Dimensionality Reduction)  

**✅ 答案：B - 回归 (Regression)**

**解析**：
- **回归**：预测连续数值（价格、温度、销量）
- **分类**：预测离散类别（是/否、A/B/C）
- 房价是连续数值 → 回归问题

---

### Q8
**题目**：一家公司想要根据客户特征将客户分成不同的群组，但没有预定义的标签。应该使用哪种ML方法？

A. 监督学习 - 分类  
B. 监督学习 - 回归  
C. 无监督学习 - 聚类  
D. 强化学习  

**✅ 答案：C - 无监督学习 - 聚类**

**解析**：没有预定义标签，要分组 → 聚类（无监督学习）
- K-means
- 层次聚类
- DBSCAN

监督学习需要标签，这里没有标签。

---

### Q9
**题目**：在神经网络中，什么是"Epoch"？

A. 模型的层数  
B. 训练数据被完整遍历一次  
C. 神经网络的类型  
D. 学习率的值  

**✅ 答案：B - 训练数据被完整遍历一次**

**解析**：
- **Epoch**：整个数据集遍历一次
- **Batch**：一次更新使用的样本数
- **Iteration**：一次batch训练

例如：1000个样本，batch=100，则1个epoch = 10个iterations

---

### Q10
**题目**：以下哪项不是防止过拟合的方法？

A. 增加训练数据  
B. 使用正则化 (Regularization)  
C. 增加模型复杂度  
D. 使用Dropout  

**✅ 答案：C - 增加模型复杂度**

**解析**：增加模型复杂度会**加重**过拟合！

防止过拟合的方法：
- ✅ 增加训练数据
- ✅ 正则化 (L1, L2)
- ✅ Dropout
- ✅ 早停 (Early Stopping)
- ✅ 数据增强
- ❌ 增加复杂度（会加重过拟合）

---

## Domain 2: Fundamentals of Generative AI

---

### Q11
**题目**：一家公司正在使用预训练的大语言模型 (LLM) 构建产品推荐聊天机器人。公司需要LLM输出简短并以特定语言编写。哪种解决方案可以使LLM响应质量符合公司期望？

A. 调整提示词 (Adjust the prompt)  
B. 选择不同大小的LLM  
C. 增加温度 (temperature)  
D. 增加 Top K 值  

**✅ 答案：A - 调整提示词 (Adjust the prompt)**

**解析**：Prompt Engineering是控制LLM输出最直接的方法：
- 指定长度："请用50字以内回答"
- 指定语言："请用中文回答"
- 指定格式和风格

增加temperature会使输出更随机，不是控制长度和语言的方法。

---

### Q12
**题目**：在生成式AI中，"temperature" 参数的作用是什么？

A. 控制模型的训练速度  
B. 控制输出的随机性/创造性  
C. 控制模型使用的GPU数量  
D. 控制输入文本的最大长度  

**✅ 答案：B - 控制输出的随机性/创造性**

**解析**：Temperature参数：
- **温度=0**：最确定、最保守、最一致
- **温度=0.5-0.7**：平衡创造性和一致性
- **温度=1**：标准采样
- **温度>1**：非常随机、更有创造性

---

### Q13
**题目**：大语言模型生成看似合理但实际上不正确或虚构的信息，这种现象叫什么？

A. 过拟合 (Overfitting)  
B. 幻觉 (Hallucination)  
C. 偏见 (Bias)  
D. 漂移 (Drift)  

**✅ 答案：B - 幻觉 (Hallucination)**

**解析**：LLM幻觉指：
- 生成看似合理但错误的信息
- 编造不存在的事实、引用、数据
- 对不确定的事情表现得很自信

减少幻觉的方法：RAG、Grounding、降低temperature

---

### Q14
**题目**：RAG (Retrieval-Augmented Generation) 的主要优势是什么？

A. 减少模型训练时间  
B. 使模型能够访问最新的外部知识  
C. 提高模型的推理速度  
D. 减少模型的参数数量  

**✅ 答案：B - 使模型能够访问最新的外部知识**

**解析**：RAG (检索增强生成)：
1. 从知识库检索相关信息
2. 将信息与查询一起给LLM
3. LLM基于上下文生成回答

优势：访问最新信息、减少幻觉、无需重新训练。

---

### Q15
**题目**：在Amazon Bedrock中，"continued pre-training"和"fine-tuning"的主要区别是什么？

A. Continued pre-training使用标注数据，fine-tuning使用未标注数据  
B. Continued pre-training使用未标注数据，fine-tuning使用标注数据  
C. 两者完全相同  
D. Fine-tuning不改变模型权重  

**✅ 答案：B - Continued pre-training使用未标注数据，fine-tuning使用标注数据**

**解析**：

| 方法 | 数据类型 | 目的 |
|:-----|:---------|:-----|
| **Continued Pre-training** | 未标注数据 | 让模型熟悉领域知识 |
| **Fine-tuning** | 标注数据(输入-输出对) | 优化特定任务表现 |

---

### Q16
**题目**：什么是"Token"在大语言模型中的含义？

A. 身份验证凭证  
B. 模型处理文本的基本单位  
C. API密钥  
D. 计费货币  

**✅ 答案：B - 模型处理文本的基本单位**

**解析**：Token可以是：
- 完整单词
- 子词（如"playing" → "play" + "ing"）
- 字符
- 一个英文单词约1-2个token
- 一个中文字约1-2个token

---

### Q17
**题目**：如果想让LLM的输出更加确定和一致，应该如何调整temperature参数？

A. 增加temperature  
B. 降低temperature  
C. 设置temperature为1  
D. Temperature与输出一致性无关  

**✅ 答案：B - 降低temperature**

**解析**：
- **低温度 (0-0.3)** → 输出更确定、更一致、更保守
- **高温度 (0.7-1+)** → 输出更随机、更多样、更有创意

---

### Q18
**题目**：以下哪种Prompt技术最适合复杂推理任务？

A. Zero-shot prompting  
B. Chain-of-thought prompting  
C. One-shot prompting  
D. Completion prompting  

**✅ 答案：B - Chain-of-thought prompting**

**解析**：思维链提示 (Chain-of-thought)：
- 引导模型逐步推理
- 适合数学、逻辑、多步推理任务
- 在提示中展示推理过程
- 例如："让我们一步一步思考..."

---

### Q19
**题目**：什么是"上下文窗口 (Context Window)"？

A. 模型的训练时间  
B. 模型能处理的最大token数量  
C. 模型的层数  
D. 模型的参数数量  

**✅ 答案：B - 模型能处理的最大token数量**

**解析**：上下文窗口限制：
- 输入 + 输出的总token数
- 不同模型有不同限制（如4K, 8K, 32K, 128K）
- 影响能处理的文档长度
- 超出限制的内容会被截断

---

### Q20
**题目**：以下哪项最能有效减少LLM的幻觉问题？

A. 增加模型大小  
B. 使用RAG提供相关上下文  
C. 增加temperature  
D. 减少训练数据  

**✅ 答案：B - 使用RAG提供相关上下文**

**解析**：减少幻觉的方法：
- ✅ RAG提供真实、相关的信息
- ✅ 降低temperature
- ✅ 明确的提示词
- ✅ Grounding到可靠来源
- ❌ 增加temperature会加剧幻觉

---

### Q21
**题目**：Amazon Titan 是什么？

A. AWS的服务器硬件  
B. Amazon的基础模型系列  
C. 数据库服务  
D. 容器服务  

**✅ 答案：B - Amazon的基础模型系列**

**解析**：Amazon Titan包括：
- Titan Text（文本生成）
- Titan Embeddings（向量化）
- Titan Image Generator（图像生成）
- Titan Multimodal Embeddings
- 通过Amazon Bedrock访问

---

### Q22
**题目**：在Few-shot prompting中，"few-shot"指的是什么？

A. 使用很少的训练数据  
B. 在提示中提供少量示例  
C. 模型只能生成很短的回答  
D. 快速推理模式  

**✅ 答案：B - 在提示中提供少量示例**

**解析**：
- **Zero-shot**：不提供示例，直接问
- **One-shot**：提供1个示例
- **Few-shot**：提供2-5个示例
- 示例帮助模型理解任务格式和期望输出

---

## Domain 3: Applications of Foundation Models

---

### Q23
**题目**：一家律师事务所想使用大语言模型 (LLM) 构建AI应用程序。该应用程序将阅读法律文件并从文件中提取关键点。哪种解决方案满足这些要求？

A. 构建自动命名实体识别系统  
B. 创建推荐引擎  
C. 开发摘要聊天机器人  
D. 开发多语言翻译系统  

**✅ 答案：C - 开发摘要聊天机器人**

**解析**：阅读文档 + 提取关键点 = 摘要任务
- 命名实体识别只识别实体名称，不提取关键点
- 推荐引擎用于推荐内容
- 翻译系统只做语言转换

---

### Q24
**题目**：一家公司想要创建一个聊天机器人，使用Amazon Bedrock上的基础模型 (FM)。FM需要访问存储在Amazon S3存储桶中的加密数据。FM在尝试访问S3数据时遇到失败。最可能的原因是什么？

A. S3数据格式不正确  
B. Bedrock角色缺少解密权限  
C. 提示词写得不好  
D. 模型太小  

**✅ 答案：B - Bedrock角色缺少解密权限**

**解析**：访问加密S3数据需要：
- S3读取权限 (s3:GetObject)
- KMS解密权限 (kms:Decrypt)
- 这是IAM权限配置问题，不是数据格式或模型问题

---

### Q25
**题目**：一家公司使用Amazon SageMaker作为其生产环境中的ML管道。公司有高达1GB的大型输入数据和长达1小时的处理时间。公司需要接近实时的延迟。哪种SageMaker推理选项满足这些要求？

A. 实时推理 (Real-time inference)  
B. 无服务器推理 (Serverless inference)  
C. 异步推理 (Asynchronous inference)  
D. 批量转换 (Batch transform)  

**✅ 答案：C - 异步推理 (Asynchronous inference)**

**解析**：

| 选项 | 输入大小 | 处理时间 | 延迟 |
|:-----|:---------|:---------|:-----|
| 实时推理 | <6MB | <60秒 | 毫秒级 |
| 无服务器推理 | <4MB | <60秒 | 有冷启动 |
| **异步推理** | **最高1GB** | **可达1小时** | **近实时** |
| 批量转换 | 大 | 长 | 非实时 |

---

### Q26
**题目**：一家公司想使用语言模型在边缘设备上创建推理应用程序。推理必须具有尽可能低的延迟。哪种解决方案满足这些要求？

A. 在边缘设备上部署优化的小型语言模型 (SLM)  
B. 在边缘设备上部署优化的大型语言模型 (LLM)  
C. 使用集中式API异步通信  
D. 使用云端大型模型实时调用  

**✅ 答案：A - 在边缘设备上部署优化的小型语言模型 (SLM)**

**解析**：最低延迟需要：
- 本地部署（无网络延迟）
- 小型模型（推理快，资源占用少）
- 优化后的SLM是最佳选择

LLM太大，边缘设备资源有限跑不动。

---

### Q27
**题目**：一家公司正在构建解决方案来生成防护眼镜的图像标注。解决方案必须具有高准确性并最小化错误注释的风险。哪种解决方案满足这些要求？

A. 使用Amazon SageMaker Ground Truth Plus进行人机循环验证  
B. 使用Amazon Bedrock知识库进行数据增强  
C. 使用Amazon Rekognition进行图像识别  
D. 使用Amazon QuickSight Q进行数据摘要  

**✅ 答案：A - 使用Amazon SageMaker Ground Truth Plus进行人机循环验证**

**解析**：Ground Truth Plus提供：
- 托管数据标注服务
- 专家团队审核
- 人机循环验证确保高准确性
- 最小化错误标注

---

### Q28
**题目**：一家公司想要从产品图像中提取文字信息。应该使用哪个AWS服务？

A. Amazon Rekognition  
B. Amazon Textract  
C. Amazon Comprehend  
D. Amazon Polly  

**✅ 答案：B - Amazon Textract**

**解析**：AWS服务对照：
- **Textract**：图像/PDF文字提取(OCR) ← 正确答案
- **Rekognition**：图像/视频分析（人脸、物体检测）
- **Comprehend**：文本分析（情感、实体）
- **Polly**：文字转语音

---

### Q29
**题目**：一家公司想要分析客户评论的情感（正面/负面/中性）。应该使用哪个AWS服务？

A. Amazon Lex  
B. Amazon Comprehend  
C. Amazon Transcribe  
D. Amazon Translate  

**✅ 答案：B - Amazon Comprehend**

**解析**：Comprehend是NLP服务：
- ✅ 情感分析（正面/负面/中性/混合）
- ✅ 命名实体识别
- ✅ 关键词提取
- ✅ 语言检测
- ✅ 主题建模

---

### Q30
**题目**：一家公司想要将客服电话录音转换为文本。应该使用哪个AWS服务？

A. Amazon Polly  
B. Amazon Transcribe  
C. Amazon Comprehend  
D. Amazon Textract  

**✅ 答案：B - Amazon Transcribe**

**解析**：
- **Transcribe**：语音→文字 (ASR/STT) ← 正确答案
- **Polly**：文字→语音 (TTS)
- 两者功能相反！

记忆：Transcribe = 转录 = 把听到的写下来

---

### Q31
**题目**：一家公司想要构建一个智能搜索功能，让用户可以用自然语言搜索内部文档。应该使用哪个AWS服务？

A. Amazon OpenSearch  
B. Amazon Kendra  
C. Amazon S3  
D. Amazon DynamoDB  

**✅ 答案：B - Amazon Kendra**

**解析**：Kendra是智能企业搜索：
- 理解自然语言查询意图
- 提供答案而非仅链接
- 专为企业文档搜索设计
- 支持多种数据源连接

OpenSearch是全文搜索引擎，不理解自然语言。

---

### Q32
**题目**：一家电商公司想要为用户提供个性化产品推荐。应该使用哪个AWS服务？

A. Amazon Comprehend  
B. Amazon Personalize  
C. Amazon Forecast  
D. Amazon Lex  

**✅ 答案：B - Amazon Personalize**

**解析**：Personalize用于：
- 个性化产品推荐
- 基于用户行为学习
- 适合电商、内容推荐、营销

Forecast用于时间序列预测（销量预测），不是推荐。

---

### Q33
**题目**：Amazon Bedrock 和 Amazon SageMaker 的主要区别是什么？

A. Bedrock用于数据存储，SageMaker用于计算  
B. Bedrock提供预训练基础模型，SageMaker用于构建自定义模型  
C. 两者功能完全相同  
D. Bedrock只支持文本，SageMaker只支持图像  

**✅ 答案：B - Bedrock提供预训练基础模型，SageMaker用于构建自定义模型**

**解析**：
- **Bedrock**：预训练基础模型API、无需管理基础设施、快速使用
- **SageMaker**：完整ML平台、构建训练部署自定义模型、更多控制

---

### Q34
**题目**：公司想要构建一个能够理解客户意图的聊天机器人。应该使用哪个AWS服务？

A. Amazon Rekognition  
B. Amazon Lex  
C. Amazon Transcribe  
D. Amazon Polly  

**✅ 答案：B - Amazon Lex**

**解析**：Lex用于构建对话式AI：
- 自然语言理解 (NLU)
- 意图识别
- 槽位填充
- 对话管理
- 聊天机器人首选服务

---

### Q35
**题目**：什么是"向量数据库 (Vector Database)"在生成式AI中的主要作用？

A. 存储关系型数据  
B. 存储文本嵌入向量以支持语义搜索  
C. 执行SQL查询  
D. 管理用户权限  

**✅ 答案：B - 存储文本嵌入向量以支持语义搜索**

**解析**：向量数据库在生成式AI中：
- 存储嵌入向量 (embeddings)
- 支持语义相似度搜索
- RAG系统核心组件
- 例如：Amazon OpenSearch Serverless Vector Engine

---

### Q36
**题目**：Amazon Q 的主要用途是什么？

A. 传统数据库查询  
B. AI助手，用于回答问题和辅助工作任务  
C. 图像生成  
D. 语音合成  

**✅ 答案：B - AI助手，用于回答问题和辅助工作任务**

**解析**：Amazon Q：
- Q Business：企业知识问答助手
- Q Developer：编程辅助（类似GitHub Copilot）
- 基于企业数据回答问题
- 类似企业版AI助手

---

## Domain 4: Guidelines for Responsible AI

---

### Q37
**题目**：以下哪项是负责任AI (Responsible AI) 的核心原则？

A. 最大化模型准确率  
B. 降低计算成本  
C. 确保公平性、透明度和可解释性  
D. 使用最新的模型架构  

**✅ 答案：C - 确保公平性、透明度和可解释性**

**解析**：负责任AI核心原则：
- 公平性 (Fairness)
- 透明度 (Transparency)
- 可解释性 (Explainability)
- 隐私保护 (Privacy)
- 安全性 (Security)
- 问责制 (Accountability)

---

### Q38
**题目**：AI中的"偏见 (Bias)"指的是什么？

A. 模型训练速度太慢  
B. 系统性的错误导致对某些群体的不公平对待  
C. 模型无法处理大量数据  
D. 模型需要太多计算资源  

**✅ 答案：B - 系统性的错误导致对某些群体的不公平对待**

**解析**：AI偏见：
- 对特定群体（性别、种族、年龄等）不公平
- 可能来自训练数据中的历史偏见
- 可能来自数据采样不均
- 需要使用SageMaker Clarify检测

---

### Q39
**题目**：Amazon SageMaker Clarify 的主要功能是什么？

A. 优化模型训练速度  
B. 检测机器学习模型中的偏见并提供可解释性  
C. 自动部署模型到生产环境  
D. 管理ML实验版本  

**✅ 答案：B - 检测机器学习模型中的偏见并提供可解释性**

**解析**：SageMaker Clarify：
- 偏见检测（训练前和训练后）
- 可解释性（SHAP值、特征重要性）
- 公平性监控
- 生成偏见报告

---

### Q40
**题目**：Amazon Bedrock Guardrails 的主要用途是什么？

A. 优化模型推理速度  
B. 过滤和阻止不安全或不当的内容  
C. 管理AWS账单  
D. 自动化模型训练  

**✅ 答案：B - 过滤和阻止不安全或不当的内容**

**解析**：Bedrock Guardrails：
- 内容过滤（有害、暴力、仇恨内容）
- PII检测和屏蔽
- 主题限制（阻止特定话题）
- 词汇过滤
- 在应用层保护模型输出

---

### Q41
**题目**：一个数据科学团队发现他们的贷款审批模型对女性申请者的批准率明显低于男性。这是什么问题？

A. 过拟合  
B. 欠拟合  
C. 模型偏见  
D. 数据泄露  

**✅ 答案：C - 模型偏见**

**解析**：女性批准率低于男性 = 性别偏见
- 系统性地对某一群体不公平
- 可能来自历史数据中的偏见
- 需要调查数据和模型
- 使用Clarify检测

---

### Q42
**题目**：在AI应用中，如何最好地保护用户隐私？

A. 使用最强大的模型  
B. 对个人身份信息 (PII) 进行数据脱敏或匿名化  
C. 增加训练数据量  
D. 提高模型准确率  

**✅ 答案：B - 对个人身份信息 (PII) 进行数据脱敏或匿名化**

**解析**：隐私保护方法：
- 数据脱敏/匿名化
- 数据最小化（只收集必要数据）
- 差分隐私
- 联邦学习
- 加密处理

---

### Q43
**题目**：使用Amazon Bedrock时，如何确保模型不会讨论公司禁止的话题？

A. 调整模型权重  
B. 使用Bedrock Guardrails设置主题过滤  
C. 重新训练模型  
D. 更换不同的模型  

**✅ 答案：B - 使用Bedrock Guardrails设置主题过滤**

**解析**：Guardrails可以：
- 配置"拒绝的主题"列表
- 阻止特定话题讨论
- 无需改变模型
- 在应用层实现控制

---

## Domain 5: Security, Compliance, and Governance

---

### Q44
**题目**：在AWS上保护AI模型数据的最佳实践是什么？

A. 使所有数据公开可访问  
B. 使用AWS KMS加密静态数据，使用TLS加密传输中的数据  
C. 将所有数据存储在本地服务器上  
D. 避免使用任何加密以提高性能  

**✅ 答案：B - 使用AWS KMS加密静态数据，使用TLS加密传输中的数据**

**解析**：AWS数据安全最佳实践：
- 静态加密：AWS KMS管理密钥
- 传输加密：TLS/SSL
- 访问控制：IAM最小权限
- 审计日志：CloudTrail

---

### Q45
**题目**：AWS Shared Responsibility Model（共享责任模型）中，客户负责什么？

A. 物理数据中心安全  
B. 数据的加密和访问控制  
C. 网络基础设施硬件  
D. AWS服务的可用性  

**✅ 答案：B - 数据的加密和访问控制**

**解析**：共享责任模型：
- **AWS负责**：物理安全、基础设施、网络硬件
- **客户负责**：数据加密、访问控制、应用安全、IAM配置

---

### Q46
**题目**：哪个AWS服务用于管理AI/ML资源的访问权限？

A. Amazon S3  
B. AWS IAM (Identity and Access Management)  
C. Amazon SageMaker  
D. Amazon Bedrock  

**✅ 答案：B - AWS IAM (Identity and Access Management)**

**解析**：IAM用于：
- 用户和角色管理
- 权限策略定义
- 最小权限原则
- 多因素认证 (MFA)
- 控制谁可以访问什么AWS资源

---

### Q47
**题目**：AWS CloudTrail 在AI治理中的作用是什么？

A. 训练机器学习模型  
B. 记录和监控AWS API调用以进行审计  
C. 存储训练数据  
D. 优化模型推理性能  

**✅ 答案：B - 记录和监控AWS API调用以进行审计**

**解析**：CloudTrail提供：
- 记录所有AWS API调用
- 谁在什么时候做了什么
- 合规审计支持
- 安全分析和故障排查

---

### Q48
**题目**：一个ML模型在训练时使用了包含个人健康信息的数据集。根据HIPAA合规要求，应该采取什么措施？

A. 不采取任何额外措施  
B. 确保数据加密、访问控制，并签署商业伙伴协议 (BAA)  
C. 将数据移至非AWS服务器  
D. 公开数据以提高透明度  

**✅ 答案：B - 确保数据加密、访问控制，并签署商业伙伴协议 (BAA)**

**解析**：HIPAA合规要求：
- 数据加密（静态和传输中）
- 严格访问控制
- 审计日志
- 与AWS签署BAA（商业伙伴协议）
- 使用HIPAA合规的AWS服务

---

### Q49
**题目**：Amazon Macie 的主要功能是什么？

A. 训练机器学习模型  
B. 自动发现、分类和保护敏感数据（如PII）  
C. 管理容器部署  
D. 优化数据库性能  

**✅ 答案：B - 自动发现、分类和保护敏感数据（如PII）**

**解析**：Amazon Macie：
- 自动扫描S3中的敏感数据
- 识别PII（姓名、地址、信用卡号等）
- 分类数据敏感级别
- 生成安全发现报告

---

### Q50
**题目**：一个ML模型在测试集上的准确率是95%，但在生产环境中表现很差。可能的原因是什么？

A. 模型太简单  
B. 训练和生产数据分布不同（数据漂移）  
C. 使用的评估指标不对  
D. 测试集太大  

**✅ 答案：B - 训练和生产数据分布不同（数据漂移）**

**解析**：数据漂移 (Data Drift)：
- 训练数据分布 ≠ 生产数据分布
- 用户行为变化
- 季节性变化
- 需要使用SageMaker Model Monitor监控
- 可能需要重新训练模型

---

## 📊 各领域得分统计

| 领域 | 题目范围 | 你的正确数 | 满分 | 正确率 |
|------|---------|-----------|------|--------|
| Domain 1 | Q1-Q10 | ___/10 | 10 | ___% |
| Domain 2 | Q11-Q22 | ___/12 | 12 | ___% |
| Domain 3 | Q23-Q36 | ___/14 | 14 | ___% |
| Domain 4 | Q37-Q43 | ___/7 | 7 | ___% |
| Domain 5 | Q44-Q50 | ___/7 | 7 | ___% |
| **总计** | Q1-Q50 | ___/50 | 50 | ___% |

---

*祝你考试顺利！🎉*

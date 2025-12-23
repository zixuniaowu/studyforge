# AWS Certified AI Practitioner (AIF-C01) 练习题集

> 📝 **说明**: 本练习题集整理自 ExamTopics 免费题目及其他资源，共50+道题目，涵盖所有五个考试领域。
> 
> 🎯 **目标**: 在模拟测试中达到 85% 以上正确率再去参加正式考试

---

## 📊 考试信息速览

| 项目 | 详情 |
|------|------|
| 考试代码 | AIF-C01 |
| 题目数量 | 65题 (50题计分) |
| 考试时长 | 90分钟 |
| 及格分数 | 700/1000 |
| 费用 | $100 USD |

---

## Domain 1: Fundamentals of AI and ML (20%)

### 题目 1
**一家公司每季度进行预测以优化运营来满足预期需求。公司使用ML模型进行这些预测。一位AI从业者正在撰写关于已训练ML模型的报告，以向公司利益相关者提供透明度和可解释性。AI从业者应在报告中包含什么以满足透明度和可解释性要求？**

A. 模型训练代码  
B. 部分依赖图 (PDPs)  
C. 训练样本数据  
D. 模型收敛表  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：部分依赖图 (Partial Dependence Plots, PDPs) 是机器学习可解释性的重要工具，用于展示一个或两个特征对模型预测结果的边际效应。PDPs 帮助利益相关者理解特征如何影响预测，这正是透明度和可解释性所需要的。

- 选项A（代码）不直接解释模型行为
- 选项C（样本数据）不解释模型决策过程
- 选项D（收敛表）只显示训练过程，不解释预测

</details>

---

### 题目 2
**一家公司想要将人类基因分类为20个类别。公司需要一种ML算法来记录模型内部机制如何影响输出。哪种ML算法满足这些要求？**

A. 决策树 (Decision trees)  
B. 线性回归 (Linear regression)  
C. 逻辑回归 (Logistic regression)  
D. 神经网络 (Neural networks)  

<details>
<summary>💡 查看答案与解析</summary>

**答案：A**

**解析**：决策树是最具可解释性的ML算法之一，因为：
- 可以可视化整个决策过程
- 每个决策节点都有明确的规则
- 可以追踪从根到叶的完整路径

神经网络虽然强大，但通常被视为"黑盒"，难以解释内部机制。线性回归和逻辑回归虽然也有一定可解释性，但对于20类分类问题，决策树更直观。

</details>

---

### 题目 3
**一家公司建立了一个图像分类模型来预测植物叶片照片中的植物疾病。公司想要评估模型正确分类了多少张图像。应该使用哪个评估指标来衡量模型性能？**

A. R-squared score (R²分数)  
B. Accuracy (准确率)  
C. Root mean squared error (RMSE)  
D. Learning rate (学习率)  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：
- **Accuracy（准确率）** = 正确预测数 / 总预测数，直接衡量"正确分类了多少"
- R² 和 RMSE 是回归问题的指标，不适用于分类
- Learning rate 是训练超参数，不是评估指标

**注意**：在类别不平衡的情况下，还需要考虑 Precision、Recall、F1-score 等指标。

</details>

---

### 题目 4
**一家公司正在使用领域特定模型。公司希望避免从头创建新模型，而是想调整预训练模型来为新的相关任务创建模型。哪种ML策略满足这些要求？**

A. 增加epochs数量  
B. 使用迁移学习 (Transfer learning)  
C. 减少epochs数量  
D. 使用无监督学习  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**迁移学习 (Transfer Learning)** 是将一个任务上训练好的模型知识转移到另一个相关任务的技术。这正是题目描述的场景：
- 不需要从零开始训练
- 利用预训练模型的知识
- 适配到新的相关任务

迁移学习在 AI/ML 中非常重要，特别是在数据有限的情况下。

</details>

---

### 题目 5
**在机器学习中，什么是"过拟合 (Overfitting)"？**

A. 模型在训练数据和测试数据上表现都很差  
B. 模型在训练数据上表现很好，但在新数据上表现差  
C. 模型训练时间过长  
D. 模型使用了太少的特征  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**过拟合**是指模型过度学习了训练数据的特征（包括噪声），导致：
- 在训练集上表现优异
- 但无法泛化到新数据

**解决方法包括**：
- 正则化 (Regularization)
- 交叉验证 (Cross-validation)
- 早停 (Early stopping)
- 增加训练数据
- Dropout (神经网络)

选项A描述的是"欠拟合 (Underfitting)"。

</details>

---

### 题目 6
**以下哪种学习类型使用带标签的数据进行训练？**

A. 强化学习 (Reinforcement Learning)  
B. 无监督学习 (Unsupervised Learning)  
C. 监督学习 (Supervised Learning)  
D. 半监督学习 (Semi-supervised Learning)  

<details>
<summary>💡 查看答案与解析</summary>

**答案：C**

**解析**：
- **监督学习**：使用带标签的数据（输入-输出对），如分类、回归
- **无监督学习**：使用无标签数据，如聚类、降维
- **强化学习**：通过与环境交互获得奖励信号学习
- **半监督学习**：结合少量标签数据和大量无标签数据

</details>

---

### 题目 7
**哪种类型的ML问题是预测房屋价格？**

A. 分类 (Classification)  
B. 回归 (Regression)  
C. 聚类 (Clustering)  
D. 降维 (Dimensionality Reduction)  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：
- **回归**：预测连续数值（如价格、温度、销量）
- **分类**：预测离散类别（如垃圾邮件/非垃圾邮件）
- **聚类**：将相似数据分组
- **降维**：减少特征数量

房屋价格是一个连续的数值，所以是回归问题。

</details>

---

## Domain 2: Fundamentals of Generative AI (24%)

### 题目 8
**一家公司正在使用预训练的大语言模型 (LLM) 构建产品推荐聊天机器人。公司需要LLM输出简短并以特定语言编写。哪种解决方案可以使LLM响应质量符合公司期望？**

A. 调整提示词 (Adjust the prompt)  
B. 选择不同大小的LLM  
C. 增加温度 (temperature)  
D. 增加 Top K 值  

<details>
<summary>💡 查看答案与解析</summary>

**答案：A**

**解析**：**调整提示词 (Prompt Engineering)** 是控制LLM输出最直接有效的方法：
- 可以指定输出长度（"请用50字以内回答"）
- 可以指定语言（"请用中文回答"）
- 可以指定格式和风格

其他选项：
- 选项B：更换模型不能直接控制输出格式
- 选项C：增加温度会使输出更随机
- 选项D：Top K 控制采样多样性，不控制语言或长度

</details>

---

### 题目 9
**在生成式AI中，"temperature" 参数的作用是什么？**

A. 控制模型的训练速度  
B. 控制输出的随机性/创造性  
C. 控制模型使用的GPU数量  
D. 控制输入文本的最大长度  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Temperature（温度）** 是控制LLM输出随机性的关键参数：
- **温度 = 0**：输出最确定、最保守，每次相同输入产生相同输出
- **温度 > 0**：输出更随机、更有创造性
- **温度 = 1**：标准采样
- **温度 > 1**：非常随机，可能产生无意义输出

使用场景：
- 低温度：事实性问答、代码生成
- 高温度：创意写作、头脑风暴

</details>

---

### 题目 10
**什么是"幻觉 (Hallucination)"在大语言模型的上下文中？**

A. 模型运行速度过慢  
B. 模型生成看似合理但实际上不正确或虚构的信息  
C. 模型无法理解用户输入  
D. 模型重复输出相同的内容  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**幻觉 (Hallucination)** 是LLM的一个已知问题，指模型：
- 生成听起来合理但事实上错误的信息
- 编造不存在的引用、统计数据或事件
- 对不确定的事情表现得非常自信

**减轻幻觉的方法**：
- 使用 RAG (检索增强生成)
- 设置适当的温度参数
- 添加事实验证步骤
- 使用 Amazon Bedrock Guardrails

</details>

---

### 题目 11
**RAG (Retrieval-Augmented Generation) 的主要优势是什么？**

A. 减少模型训练时间  
B. 使模型能够访问最新的外部知识  
C. 提高模型的推理速度  
D. 减少模型的参数数量  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**RAG（检索增强生成）** 是一种将信息检索与文本生成相结合的技术：
1. 先从外部知识库检索相关信息
2. 将检索到的信息与用户查询一起提供给LLM
3. LLM基于这些上下文生成回答

**优势**：
- 访问最新信息（不受训练数据时间限制）
- 减少幻觉
- 可以引用具体来源
- 不需要重新训练模型

在 AWS 上可以使用 **Amazon Bedrock Knowledge Bases** 实现 RAG。

</details>

---

### 题目 12
**在Amazon Bedrock中，"continued pre-training"和"fine-tuning"的主要区别是什么？**

A. Continued pre-training使用标注数据，fine-tuning使用未标注数据  
B. Continued pre-training使用未标注数据让模型熟悉特定类型输入，fine-tuning使用标注数据针对特定任务优化  
C. 两者完全相同  
D. Fine-tuning不改变模型权重  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：

**Continued Pre-training（继续预训练）**：
- 使用**未标注数据**
- 目的是让模型熟悉特定领域的语言和概念
- 例如：用医学文献继续训练，让模型理解医学术语

**Fine-tuning（微调）**：
- 使用**标注数据**（输入-输出对）
- 目的是优化模型在特定任务上的表现
- 例如：用问答对微调，让模型更好地回答特定类型的问题

两者都会改变模型权重，但数据类型和目的不同。

</details>

---

## Domain 3: Applications of Foundation Models (28%) ⭐重点

### 题目 13
**一家律师事务所想使用大语言模型 (LLM) 构建AI应用程序。该应用程序将阅读法律文件并从文件中提取关键点。哪种解决方案满足这些要求？**

A. 构建自动命名实体识别系统  
B. 创建推荐引擎  
C. 开发摘要聊天机器人  
D. 开发多语言翻译系统  

<details>
<summary>💡 查看答案与解析</summary>

**答案：C**

**解析**：**摘要聊天机器人**最适合"阅读文档并提取关键点"的需求：
- 可以理解长文档内容
- 可以识别和提取关键信息
- 可以以结构化方式呈现要点

其他选项分析：
- A：命名实体识别只能识别实体（人名、地名等），不能提取关键点
- B：推荐引擎用于推荐内容，与文档提取无关
- D：翻译系统只做语言转换，不提取信息

</details>

---

### 题目 14
**一家公司想要创建一个聊天机器人，使用Amazon Bedrock上的基础模型 (FM)。FM需要访问存储在Amazon S3存储桶中的加密数据。数据使用Amazon S3托管密钥 (SSE-S3) 加密。FM在尝试访问S3存储桶数据时遇到失败。哪种解决方案满足这些要求？**

A. 确保Amazon Bedrock承担的角色有权使用正确的加密密钥解密数据  
B. 将S3存储桶的访问权限设置为允许公共访问  
C. 使用提示工程技术告诉模型在Amazon S3中查找信息  
D. 确保S3数据不包含敏感信息  

<details>
<summary>💡 查看答案与解析</summary>

**答案：A**

**解析**：这是一个 **IAM权限** 问题。要让Amazon Bedrock访问加密的S3数据，需要：
1. Bedrock服务角色需要S3读取权限
2. 需要KMS密钥解密权限（用于解密SSE-S3加密的数据）

其他选项问题：
- B：公共访问是安全隐患，不是正确做法
- C：提示工程无法解决权限问题
- D：数据敏感性与访问失败无关

</details>

---

### 题目 15
**一家公司使用Amazon SageMaker作为其生产环境中的ML管道。公司有高达1GB的大型输入数据和长达1小时的处理时间。公司需要接近实时的延迟。哪种SageMaker推理选项满足这些要求？**

A. 实时推理 (Real-time inference)  
B. 无服务器推理 (Serverless inference)  
C. 异步推理 (Asynchronous inference)  
D. 批量转换 (Batch transform)  

<details>
<summary>💡 查看答案与解析</summary>

**答案：C**

**解析**：**异步推理 (Asynchronous Inference)** 专为以下场景设计：
- 大型输入（最高1GB）
- 长时间处理（可超过60秒）
- 需要近实时响应（不是立即，但也不是批处理）

各选项适用场景：
- **实时推理**：小负载、毫秒级响应
- **无服务器推理**：间歇性流量、小负载
- **异步推理**：大负载、长处理时间
- **批量转换**：离线批处理大量数据

</details>

---

### 题目 16
**一家公司想使用语言模型在边缘设备上创建推理应用程序。推理必须具有尽可能低的延迟。哪种解决方案满足这些要求？**

A. 在边缘设备上部署优化的小型语言模型 (SLM)  
B. 在边缘设备上部署优化的大型语言模型 (LLM)  
C. 合并一个集中式小型语言模型 (SLM) API用于与边缘设备的异步通信  
D. 合并一个集中式大型语言模型 (LLM) API用于与边缘设备的异步通信  

<details>
<summary>💡 查看答案与解析</summary>

**答案：A**

**解析**：为了在边缘设备上实现**最低延迟**：
- **本地部署**比调用远程API延迟更低
- **小型语言模型 (SLM)** 比大型模型推理更快
- 优化后的SLM可以在资源受限的边缘设备上高效运行

选项B的LLM通常太大，无法在边缘设备上高效运行。选项C和D涉及网络通信，增加了延迟。

</details>

---

### 题目 17
**一家公司正在构建解决方案来生成防护眼镜的图像。解决方案必须具有高准确性并最小化错误注释的风险。哪种解决方案满足这些要求？**

A. 使用Amazon SageMaker Ground Truth Plus进行人机循环验证  
B. 使用Amazon Bedrock知识库进行数据增强  
C. 使用Amazon Rekognition进行图像识别  
D. 使用Amazon QuickSight Q进行数据摘要  

<details>
<summary>💡 查看答案与解析</summary>

**答案：A**

**解析**：**Amazon SageMaker Ground Truth Plus** 提供人机循环 (Human-in-the-Loop) 数据标注服务：
- 结合ML和人类审核
- 确保高质量的数据标注
- 最小化错误注释

这对于需要高准确性的AI解决方案至关重要，特别是在安全相关的应用（如防护眼镜）中。

</details>

---

### 题目 18
**什么是Prompt Engineering的最佳实践？**

A. 使用尽可能短的提示以节省token  
B. 提供清晰的指令、上下文和期望的输出格式  
C. 每次使用完全相同的提示模板  
D. 避免使用示例以防止模型过拟合  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**有效的Prompt Engineering**包括：
- **清晰的指令**：明确告诉模型要做什么
- **提供上下文**：给出相关背景信息
- **指定输出格式**：说明期望的响应格式
- **使用示例**：Few-shot learning可以显著提高质量
- **设定角色**：让模型扮演特定角色

</details>

---

### 题目 19
**以下哪种Prompt技术最适合复杂推理任务？**

A. Zero-shot prompting  
B. Chain-of-thought prompting  
C. One-shot prompting  
D. Completion prompting  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Chain-of-thought (CoT) Prompting（思维链提示）**：
- 引导模型逐步推理
- 在提示中展示推理过程的示例
- 特别适合数学、逻辑、多步推理任务

示例：
```
问题：小明有5个苹果，给了小红3个，又买了2个。现在有几个苹果？
让我们一步步思考：
1. 开始：5个苹果
2. 给出去：5 - 3 = 2个
3. 买入：2 + 2 = 4个
答案：4个苹果
```

</details>

---

## Domain 4: Guidelines for Responsible AI (14%)

### 题目 20
**以下哪项是负责任AI (Responsible AI) 的核心原则？**

A. 最大化模型准确率  
B. 降低计算成本  
C. 确保公平性、透明度和可解释性  
D. 使用最新的模型架构  

<details>
<summary>💡 查看答案与解析</summary>

**答案：C**

**解析**：**负责任AI的核心原则**包括：
- **公平性 (Fairness)**：避免偏见和歧视
- **透明度 (Transparency)**：清楚说明AI如何工作
- **可解释性 (Explainability)**：能够解释AI的决策
- **隐私保护 (Privacy)**：保护用户数据
- **安全性 (Security)**：防止恶意使用
- **问责制 (Accountability)**：明确责任归属

</details>

---

### 题目 21
**什么是AI中的"偏见 (Bias)"？**

A. 模型训练速度太慢  
B. 系统性的错误导致对某些群体的不公平对待  
C. 模型无法处理大量数据  
D. 模型需要太多计算资源  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**AI偏见**是指模型中的系统性错误，导致：
- 对某些群体（性别、种族、年龄等）的不公平对待
- 可能来自训练数据的偏见
- 可能来自特征选择或模型设计

**AWS工具检测偏见**：
- **Amazon SageMaker Clarify**：检测数据和模型偏见
- 可以分析不同群体的预测差异

</details>

---

### 题目 22
**Amazon SageMaker Clarify 的主要功能是什么？**

A. 优化模型训练速度  
B. 检测机器学习模型中的偏见并提供可解释性  
C. 自动部署模型到生产环境  
D. 管理ML实验版本  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon SageMaker Clarify** 专注于：
- **偏见检测**：分析训练数据和模型预测中的偏见
- **可解释性**：使用SHAP值解释模型预测
- **公平性监控**：持续监控生产模型的公平性

这是AWS负责任AI工具集的重要组成部分。

</details>

---

### 题目 23
**在AI应用中，如何最好地保护用户隐私？**

A. 使用最强大的模型  
B. 对个人身份信息 (PII) 进行数据脱敏或匿名化  
C. 增加训练数据量  
D. 提高模型准确率  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：保护隐私的方法包括：
- **数据脱敏**：移除或掩盖敏感信息
- **匿名化**：使数据无法追溯到个人
- **差分隐私**：在数据中添加噪声
- **联邦学习**：数据不离开本地设备

AWS 服务：**Amazon Macie** 可以自动发现和保护敏感数据。

</details>

---

### 题目 24
**Amazon Bedrock Guardrails 的主要用途是什么？**

A. 优化模型推理速度  
B. 过滤和阻止不安全或不当的内容  
C. 管理AWS账单  
D. 自动化模型训练  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Bedrock Guardrails** 提供：
- **内容过滤**：阻止有害、不当内容
- **PII检测**：识别和屏蔽个人信息
- **主题限制**：限制模型讨论某些话题
- **词汇过滤**：阻止特定词汇

这是确保生成式AI应用安全和合规的重要工具。

</details>

---

## Domain 5: Security, Compliance, and Governance (14%)

### 题目 25
**在AWS上保护AI模型数据的最佳实践是什么？**

A. 使所有数据公开可访问  
B. 使用AWS KMS加密静态数据，使用TLS加密传输中的数据  
C. 将所有数据存储在本地服务器上  
D. 避免使用任何加密以提高性能  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：AWS数据安全最佳实践：
- **静态数据加密**：使用AWS KMS管理加密密钥
- **传输中数据加密**：使用TLS/SSL
- **访问控制**：使用IAM策略
- **审计**：使用AWS CloudTrail记录访问

</details>

---

### 题目 26
**AWS Shared Responsibility Model（共享责任模型）中，客户负责什么？**

A. 物理数据中心安全  
B. 数据的加密和访问控制  
C. 网络基础设施硬件  
D. AWS服务的可用性  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**共享责任模型**：

**AWS负责（云的安全）**：
- 物理安全
- 网络基础设施
- 硬件和软件
- 服务可用性

**客户负责（云中的安全）**：
- 数据加密
- 访问管理
- 操作系统和应用程序安全
- 网络流量保护
- 数据分类和合规

</details>

---

### 题目 27
**哪个AWS服务用于管理AI/ML资源的访问权限？**

A. Amazon S3  
B. AWS IAM (Identity and Access Management)  
C. Amazon SageMaker  
D. Amazon Bedrock  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**AWS IAM** 是访问管理的核心服务：
- 创建和管理用户和角色
- 定义权限策略
- 实现最小权限原则
- 支持多因素认证 (MFA)

IAM用于控制谁可以访问AWS资源，包括AI/ML服务。

</details>

---

### 题目 28
**AWS CloudTrail 在AI治理中的作用是什么？**

A. 训练机器学习模型  
B. 记录和监控AWS API调用以进行审计  
C. 存储训练数据  
D. 优化模型推理性能  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**AWS CloudTrail** 提供：
- 记录所有AWS API调用
- 谁在什么时候做了什么操作
- 支持合规审计
- 安全分析和故障排除

对于AI治理，CloudTrail帮助追踪：
- 模型访问记录
- 数据访问记录
- 配置变更历史

</details>

---

### 题目 29
**一个ML模型在训练时使用了包含个人健康信息的数据集。根据HIPAA合规要求，应该采取什么措施？**

A. 不采取任何额外措施  
B. 确保数据加密、访问控制，并签署商业伙伴协议 (BAA)  
C. 将数据移至非AWS服务器  
D. 公开数据以提高透明度  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**HIPAA合规**（医疗健康信息保护）要求：
- 数据加密（静态和传输中）
- 严格的访问控制
- 审计日志
- 与AWS签署**商业伙伴协议 (BAA)**
- 使用HIPAA合规的AWS服务

AWS提供HIPAA eligible服务列表供参考。

</details>

---

### 题目 30
**Amazon Macie 的主要功能是什么？**

A. 训练机器学习模型  
B. 自动发现、分类和保护敏感数据（如PII）  
C. 管理容器部署  
D. 优化数据库性能  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Macie** 使用机器学习：
- 自动发现S3中的敏感数据
- 识别个人身份信息 (PII)
- 分类数据敏感级别
- 监控数据访问模式
- 生成安全警报

这是数据治理和合规的重要工具。

</details>

---

## AWS AI 服务专题

### 题目 31
**一家公司想要从产品图像中提取文字信息。应该使用哪个AWS服务？**

A. Amazon Rekognition  
B. Amazon Textract  
C. Amazon Comprehend  
D. Amazon Polly  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Textract** 专门用于：
- 从图像和PDF中提取文字（OCR）
- 识别表格和表单结构
- 保留文档布局信息

**服务对比**：
- **Rekognition**：图像/视频分析（人脸、物体、场景）
- **Textract**：文档文字提取
- **Comprehend**：文本分析（情感、实体、主题）
- **Polly**：文字转语音

</details>

---

### 题目 32
**一家公司想要分析客户评论的情感（正面/负面/中性）。应该使用哪个AWS服务？**

A. Amazon Lex  
B. Amazon Comprehend  
C. Amazon Transcribe  
D. Amazon Translate  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Comprehend** 是自然语言处理 (NLP) 服务：
- **情感分析**：正面/负面/中性/混合
- 命名实体识别
- 关键词提取
- 语言检测
- 主题建模

**其他服务**：
- **Lex**：构建聊天机器人
- **Transcribe**：语音转文字
- **Translate**：语言翻译

</details>

---

### 题目 33
**一家公司想要将客服电话录音转换为文本。应该使用哪个AWS服务？**

A. Amazon Polly  
B. Amazon Transcribe  
C. Amazon Comprehend  
D. Amazon Textract  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Transcribe** 提供：
- 自动语音识别 (ASR)
- 支持多种语言
- 说话人识别
- 自定义词汇
- 实时和批量转录

**Amazon Polly** 则相反，是文字转语音 (TTS)。

</details>

---

### 题目 34
**一家公司想要构建一个智能搜索功能，让用户可以用自然语言搜索内部文档。应该使用哪个AWS服务？**

A. Amazon OpenSearch  
B. Amazon Kendra  
C. Amazon S3  
D. Amazon DynamoDB  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Kendra** 是智能企业搜索服务：
- 使用机器学习理解自然语言查询
- 从多个数据源索引文档
- 提供准确的答案而不只是链接
- 支持常见问题自动回答

**OpenSearch** 是传统的搜索引擎，功能强大但不专门针对自然语言。

</details>

---

### 题目 35
**一家电商公司想要为用户提供个性化产品推荐。应该使用哪个AWS服务？**

A. Amazon Comprehend  
B. Amazon Personalize  
C. Amazon Forecast  
D. Amazon Lex  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Personalize** 专为推荐系统设计：
- 个性化产品推荐
- 个性化搜索结果
- 个性化营销内容
- 基于用户行为数据学习

**Amazon Forecast** 用于时间序列预测（如销量预测），不是推荐。

</details>

---

### 题目 36
**Amazon Bedrock 和 Amazon SageMaker 的主要区别是什么？**

A. Bedrock用于数据存储，SageMaker用于计算  
B. Bedrock提供预训练基础模型，SageMaker用于构建和训练自定义模型  
C. 两者功能完全相同  
D. Bedrock只支持文本，SageMaker只支持图像  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：

**Amazon Bedrock**：
- 提供多个预训练基础模型（Claude, Llama, Titan等）
- 无需管理基础设施
- 通过API调用使用模型
- 支持模型微调和RAG

**Amazon SageMaker**：
- 完整的ML平台
- 构建、训练、部署自定义模型
- 需要更多ML专业知识
- 更灵活但也更复杂

</details>

---

## 综合题目

### 题目 37
**一家公司有大量历史销售数据，想要预测未来6个月的销售趋势。应该使用什么类型的ML模型？**

A. 分类模型  
B. 时间序列预测模型  
C. 图像识别模型  
D. 聚类模型  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**时间序列预测**用于预测随时间变化的数值：
- 销售预测
- 需求预测
- 库存预测
- 金融预测

AWS服务：**Amazon Forecast** 专为时间序列预测设计。

</details>

---

### 题目 38
**什么是模型的"推理 (Inference)"？**

A. 训练模型的过程  
B. 使用训练好的模型进行预测的过程  
C. 收集训练数据的过程  
D. 评估模型性能的过程  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：
- **训练 (Training)**：使用数据教会模型
- **推理 (Inference)**：使用训练好的模型进行预测
- **推理延迟**：从输入到获得预测结果的时间
- **推理成本**：运行预测所需的计算资源

</details>

---

### 题目 39
**为什么要将数据分为训练集、验证集和测试集？**

A. 减少存储成本  
B. 评估模型泛化能力并调整超参数  
C. 加快训练速度  
D. 满足合规要求  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：
- **训练集**：用于训练模型
- **验证集**：用于调整超参数、模型选择
- **测试集**：最终评估模型泛化性能

这样分割确保我们评估的是模型在"未见过"数据上的表现，而不只是记忆训练数据。

</details>

---

### 题目 40
**什么是"特征工程 (Feature Engineering)"？**

A. 构建软件功能  
B. 从原始数据中创建有意义的输入变量以改善模型性能  
C. 修复代码bug  
D. 设计用户界面  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**特征工程**是ML中的关键步骤：
- 从原始数据提取有用信息
- 创建新特征（如从日期提取星期几）
- 转换特征（如标准化、归一化）
- 选择最相关的特征

好的特征工程可以显著提高模型性能。

</details>

---

### 题目 41
**在深度学习中，什么是"Epoch"？**

A. 模型的层数  
B. 训练数据被完整遍历一次  
C. 神经网络的类型  
D. 学习率的值  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：
- **Epoch**：整个训练数据集被遍历一次
- 通常需要多个epoch来训练模型
- 太少epoch：欠拟合
- 太多epoch：可能过拟合

相关概念：
- **Batch**：一次更新权重使用的样本数
- **Iteration**：一次batch的训练

</details>

---

### 题目 42
**Amazon Q 的主要用途是什么？**

A. 传统数据库查询  
B. AI助手，用于回答问题和辅助工作任务  
C. 图像生成  
D. 语音合成  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Q** 是AWS的企业级AI助手：
- **Amazon Q Business**：企业知识问答
- **Amazon Q Developer**：编程辅助（类似GitHub Copilot）
- 可以与企业数据源集成
- 支持自然语言交互

</details>

---

### 题目 43
**什么是"Token"在大语言模型中的含义？**

A. 身份验证凭证  
B. 模型处理文本的基本单位（可能是单词、子词或字符）  
C. API密钥  
D. 计费货币  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Token** 是LLM处理文本的基本单位：
- 可能是完整单词、子词或字符
- 一个英文单词约1-2个token
- 一个中文字符约1-2个token
- 模型有最大token限制（上下文窗口）
- 费用通常按token计算

例如："Hello, world!" 可能被分为 ["Hello", ",", " world", "!"]

</details>

---

### 题目 44
**如何减少大语言模型的"幻觉"问题？**

A. 增加模型大小  
B. 使用RAG (检索增强生成) 提供相关上下文  
C. 增加温度参数  
D. 减少训练数据  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：减少幻觉的方法：
- **RAG**：提供检索到的真实信息作为上下文
- **降低温度**：使输出更确定
- **明确的提示**：要求模型只基于提供的信息回答
- **Guardrails**：过滤不可靠的输出
- **人工审核**：重要场景需要人工确认

增加温度(C)会增加随机性，可能加剧幻觉。

</details>

---

### 题目 45
**Amazon Titan 是什么？**

A. AWS的服务器硬件  
B. Amazon的基础模型系列，在Amazon Bedrock中提供  
C. 数据库服务  
D. 容器服务  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Titan** 是AWS自己的基础模型系列：
- **Titan Text**：文本生成
- **Titan Embeddings**：文本向量化
- **Titan Image Generator**：图像生成
- **Titan Multimodal Embeddings**：多模态向量化

通过Amazon Bedrock访问，与第三方模型（Claude, Llama等）一起提供。

</details>

---

## 模拟测试题

### 题目 46
**一个数据科学团队发现他们的贷款审批模型对女性申请者的批准率明显低于男性。这是什么问题？**

A. 过拟合  
B. 欠拟合  
C. 模型偏见  
D. 数据泄露  

<details>
<summary>💡 查看答案与解析</summary>

**答案：C**

**解析**：这是典型的**模型偏见 (Bias)** 问题：
- 对某一群体（女性）系统性地不公平对待
- 可能来源于训练数据的历史偏见
- 需要使用SageMaker Clarify检测
- 可能需要重新平衡数据或调整模型

这是负责任AI (Domain 4) 的核心考点。

</details>

---

### 题目 47
**公司想要构建一个能够理解客户意图的聊天机器人。应该使用哪个AWS服务？**

A. Amazon Rekognition  
B. Amazon Lex  
C. Amazon Transcribe  
D. Amazon Polly  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Lex** 用于构建对话式AI：
- 自然语言理解 (NLU)
- 意图识别
- 槽位填充
- 与Lambda集成实现业务逻辑
- 与Connect集成实现客服中心

这是构建聊天机器人的首选服务。

</details>

---

### 题目 48
**什么是"向量数据库 (Vector Database)"在生成式AI中的作用？**

A. 存储关系型数据  
B. 存储文本嵌入向量以支持语义搜索和RAG  
C. 执行SQL查询  
D. 管理用户权限  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**向量数据库**在生成式AI中至关重要：
- 存储文本/图像的嵌入向量
- 支持语义相似度搜索
- 是RAG系统的核心组件
- 比关键词搜索更能理解语义

AWS选项：**Amazon OpenSearch with k-NN**, **Amazon Aurora with pgvector**

</details>

---

### 题目 49
**在使用Amazon Bedrock时，如何确保模型不会讨论公司禁止的话题？**

A. 调整模型权重  
B. 使用Bedrock Guardrails设置主题过滤  
C. 重新训练模型  
D. 更换不同的模型  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**Amazon Bedrock Guardrails** 提供：
- **主题过滤**：阻止特定话题
- **内容过滤**：阻止不当内容
- **PII过滤**：保护个人信息
- **词汇过滤**：阻止特定词语

无需改变模型本身，在应用层实现安全控制。

</details>

---

### 题目 50
**一个ML模型在测试集上的准确率是95%，但在生产环境中表现很差。可能的原因是什么？**

A. 模型太简单  
B. 训练和生产数据分布不同（数据漂移）  
C. 使用的评估指标不对  
D. 测试集太大  

<details>
<summary>💡 查看答案与解析</summary>

**答案：B**

**解析**：**数据漂移 (Data Drift)** 是常见问题：
- 训练数据和生产数据分布不同
- 用户行为随时间变化
- 外部因素变化（如季节、经济）

解决方案：
- 监控模型性能
- 定期重新训练
- 使用更有代表性的训练数据
- SageMaker Model Monitor可以检测数据漂移

</details>

---

## 📝 学习检查清单

完成这些题目后，确保你理解以下概念：

### Domain 1: AI/ML基础
- [ ] 监督学习 vs 无监督学习 vs 强化学习
- [ ] 分类 vs 回归
- [ ] 过拟合 vs 欠拟合
- [ ] 训练集/验证集/测试集
- [ ] 常见评估指标

### Domain 2: 生成式AI基础
- [ ] LLM工作原理
- [ ] Temperature, Top-K, Top-P参数
- [ ] Token和上下文窗口
- [ ] 幻觉问题及解决方案
- [ ] RAG原理

### Domain 3: 基础模型应用
- [ ] Prompt Engineering技术
- [ ] Fine-tuning vs Continued Pre-training
- [ ] Amazon Bedrock服务
- [ ] Knowledge Bases和Agents

### Domain 4: 负责任AI
- [ ] 公平性、透明度、可解释性
- [ ] 偏见检测和缓解
- [ ] SageMaker Clarify
- [ ] Bedrock Guardrails

### Domain 5: 安全与合规
- [ ] IAM和访问控制
- [ ] 数据加密
- [ ] CloudTrail审计
- [ ] 合规要求（HIPAA, GDPR等）

---

## 🔗 推荐资源

1. **AWS官方免费资源**
   - AWS Skill Builder Exam Prep Plan
   - AWS白皮书和文档

2. **免费视频**
   - Andrew Brown (FreeCodeCamp) - 15小时完整课程

3. **练习题**
   - ExamTopics (部分免费)
   - AWS官方样题

4. **动手实验**
   - AWS Free Tier
   - Amazon Bedrock Playground

---

*祝你考试顺利！🎉*

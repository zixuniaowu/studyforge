# Google Cloud Professional Machine Learning Engineer - Set 1

> **考试代码**: Professional-MLE  
> **题目数量**: 50  
> **及格分数**: 70%  
> **考试时间**: 120分钟  
> **语言**: zh-CN

## Domains

| ID | 名称 | 权重 |
|:---|:-----|:-----|
| 1 | Architecting ML Solutions | 15-20% |
| 2 | Data Preparation and Processing | 15-20% |
| 3 | Developing ML Models | 20-25% |
| 4 | Training and Evaluating ML Models | 15-20% |
| 5 | Deploying and Scaling ML Solutions | 15-20% |
| 6 | ML Pipeline Automation and Orchestration | 10-15% |

---

## Questions

---

### Q1
<!-- domain: 1 | difficulty: easy | tags: Vertex-AI, overview -->

一家公司想要在Google Cloud上构建端到端的机器学习解决方案。哪个服务提供统一的ML平台，包括数据准备、训练、部署和监控？

- A. BigQuery ML
- B. Vertex AI
- C. Cloud Functions
- D. Dataflow

**答案**: B

**解析**:
Vertex AI是Google Cloud的统一ML平台，提供：
- AutoML和自定义训练
- Feature Store
- 模型注册和部署
- Pipelines
- 实验跟踪
- 模型监控

---

### Q2
<!-- domain: 1 | difficulty: medium | tags: BigQuery-ML, use-case -->

一家公司的数据科学团队主要使用SQL，想要快速构建ML模型而不需要将数据移出BigQuery。应该使用什么？

- A. Vertex AI AutoML
- B. BigQuery ML
- C. Dataproc
- D. Cloud AI Platform

**答案**: B

**解析**:
BigQuery ML允许使用SQL直接在BigQuery中训练ML模型：
- 无需移动数据
- 支持线性回归、逻辑回归、K-means等
- 适合SQL熟练的用户
- 快速原型开发

---

### Q3
<!-- domain: 1 | difficulty: medium | tags: AutoML, Vertex-AI -->

一家公司想要构建图像分类模型，但团队没有深度学习专业知识。最简单的方法是什么？

- A. 使用TensorFlow从头训练
- B. 使用Vertex AI AutoML
- C. 使用Cloud TPU训练
- D. 使用Dataproc

**答案**: B

**解析**:
Vertex AI AutoML：
- 自动化模型架构搜索
- 自动化超参数调优
- 无需ML专业知识
- 支持图像、文本、表格、视频数据

---

### Q4
<!-- domain: 1 | difficulty: hard | tags: Model-Garden, foundation-models -->

一家公司想要使用预训练的大语言模型（如PaLM 2或Gemini）构建生成式AI应用。应该使用什么？

- A. BigQuery ML
- B. Vertex AI Model Garden
- C. Cloud Natural Language API
- D. Dialogflow

**答案**: B

**解析**:
Vertex AI Model Garden提供：
- Google基础模型（PaLM 2、Gemini等）
- 开源模型（Llama 2、Stable Diffusion等）
- 一键部署和微调
- Vertex AI Agent Builder集成

---

### Q5
<!-- domain: 2 | difficulty: easy | tags: BigQuery, data-storage -->

一家公司有大量结构化数据需要用于ML训练。哪个服务最适合存储和查询这些数据？

- A. Cloud Storage
- B. BigQuery
- C. Cloud SQL
- D. Firestore

**答案**: B

**解析**:
BigQuery适合ML数据存储：
- PB级数据仓库
- 与Vertex AI集成
- 支持BigQuery ML
- 支持特征工程SQL

---

### Q6
<!-- domain: 2 | difficulty: medium | tags: Dataflow, preprocessing -->

一家公司需要对实时流数据进行预处理，然后用于ML推理。应该使用什么服务？

- A. Cloud Dataproc
- B. Cloud Dataflow
- C. Cloud Composer
- D. Cloud Pub/Sub

**答案**: B

**解析**:
Dataflow是托管的Apache Beam服务：
- 支持批处理和流处理
- 统一编程模型
- 自动扩展
- 与Vertex AI集成

---

### Q7
<!-- domain: 2 | difficulty: medium | tags: Feature-Store -->

一家公司想要在多个ML项目中重用特征，并确保训练和推理时使用相同的特征。应该使用什么？

- A. BigQuery
- B. Vertex AI Feature Store
- C. Cloud Storage
- D. Cloud Spanner

**答案**: B

**解析**:
Vertex AI Feature Store：
- 集中管理特征
- 训练-推理一致性
- 特征共享和发现
- 时间点查询（避免数据泄露）
- 在线和离线服务

---

### Q8
<!-- domain: 2 | difficulty: hard | tags: TFX, data-validation -->

一家公司想要在ML管道中自动检测数据质量问题（如模式变化、异常值）。TensorFlow Extended (TFX)的哪个组件专门用于此目的？

- A. Transform
- B. Trainer
- C. ExampleValidator
- D. Pusher

**答案**: C

**解析**:
TFX组件：
- StatisticsGen：生成数据统计
- SchemaGen：推断数据模式
- ExampleValidator：验证数据是否符合模式
- Transform：特征工程
- Trainer：模型训练

---

### Q9
<!-- domain: 2 | difficulty: medium | tags: handling-missing-data -->

在准备ML训练数据时，处理缺失值的最佳方法取决于什么？

- A. 总是删除缺失值的行
- B. 总是用平均值填充
- C. 根据数据类型、缺失原因和业务上下文选择策略
- D. 总是用零填充

**答案**: C

**解析**:
处理缺失值的策略：
- 删除：缺失比例小，随机缺失
- 均值/中位数填充：数值型
- 众数填充：分类型
- 插值：时间序列
- 模型预测填充：复杂场景
- 添加"缺失"指示特征

---

### Q10
<!-- domain: 2 | difficulty: medium | tags: data-leakage -->

什么是"数据泄露 (Data Leakage)"，为什么它在ML中是一个问题？

- A. 训练数据被未授权访问
- B. 模型在训练时使用了推理时不可用的信息
- C. 数据存储空间不足
- D. 网络传输数据丢失

**答案**: B

**解析**:
数据泄露导致模型在测试/验证集上表现好，但在生产环境中失败：
- 使用未来信息（时间泄露）
- 测试数据参与预处理（如整体数据的均值）
- 目标泄露（特征包含目标信息）

---

### Q11
<!-- domain: 3 | difficulty: easy | tags: TensorFlow, framework -->

以下哪个是Google开发的开源机器学习框架？

- A. PyTorch
- B. TensorFlow
- C. Scikit-learn
- D. MXNet

**答案**: B

**解析**:
TensorFlow是Google开发的ML框架：
- Keras高级API
- TensorFlow Extended (TFX)生产流水线
- TensorFlow Lite（移动/边缘）
- TensorFlow.js（浏览器）

---

### Q12
<!-- domain: 3 | difficulty: medium | tags: Vertex-AI-Workbench -->

一家公司的数据科学家想要在Google Cloud上进行交互式ML开发。应该使用什么？

- A. Cloud Shell
- B. Vertex AI Workbench
- C. Cloud Functions
- D. App Engine

**答案**: B

**解析**:
Vertex AI Workbench（原AI Platform Notebooks）：
- 托管Jupyter环境
- 预装ML框架
- 与Vertex AI服务集成
- 支持GPU/TPU
- Git集成

---

### Q13
<!-- domain: 3 | difficulty: medium | tags: regularization -->

在训练神经网络时，以下哪种技术可以帮助防止过拟合？

- A. 增加学习率
- B. L2正则化
- C. 减少训练数据
- D. 增加层数

**答案**: B

**解析**:
防止过拟合的技术：
- L1/L2正则化
- Dropout
- 早停 (Early Stopping)
- 数据增强
- 减少模型复杂度
- 批量归一化

---

### Q14
<!-- domain: 3 | difficulty: hard | tags: transfer-learning -->

一家公司有少量标注的医学图像，想要构建分类模型。最有效的方法是什么？

- A. 从头训练大型CNN
- B. 使用迁移学习，微调预训练模型
- C. 使用简单的决策树
- D. 收集更多数据再训练

**答案**: B

**解析**:
迁移学习在小数据集上特别有效：
- 使用ImageNet预训练的模型
- 冻结早期层（通用特征）
- 微调后期层（任务特定）
- 或只训练新的分类头

---

### Q15
<!-- domain: 3 | difficulty: medium | tags: hyperparameter-tuning -->

在Vertex AI中，什么服务可以自动搜索最佳超参数组合？

- A. AutoML Tables
- B. Vertex AI Hyperparameter Tuning
- C. BigQuery ML
- D. Cloud TPU

**答案**: B

**解析**:
Vertex AI Hyperparameter Tuning：
- 贝叶斯优化
- 网格搜索
- 随机搜索
- 并行试验
- 与训练作业集成

---

### Q16
<!-- domain: 3 | difficulty: medium | tags: activation-function -->

在二分类问题的神经网络输出层，应该使用什么激活函数？

- A. ReLU
- B. Sigmoid
- C. Tanh
- D. Softmax

**答案**: B

**解析**:
激活函数选择：
- 二分类输出：Sigmoid（0-1概率）
- 多分类输出：Softmax
- 隐藏层：ReLU及其变体
- 回归输出：线性（无激活）

---

### Q17
<!-- domain: 3 | difficulty: hard | tags: attention, transformer -->

Transformer架构的核心创新是什么？

- A. 卷积层
- B. 循环连接
- C. 自注意力机制
- D. 池化层

**答案**: C

**解析**:
自注意力机制：
- 并行处理所有位置
- 捕捉长距离依赖
- 可学习的位置权重
- 是GPT、BERT等模型的基础

---

### Q18
<!-- domain: 4 | difficulty: easy | tags: train-test-split -->

在划分训练集和测试集时，最佳实践是什么？

- A. 随机打乱后划分
- B. 取前80%作为训练集
- C. 对于时间序列数据，按时间顺序划分
- D. A和C都是，取决于数据类型

**答案**: D

**解析**:
数据划分最佳实践：
- 一般数据：随机打乱后分层划分
- 时间序列：按时间顺序划分（避免数据泄露）
- 通常比例：70-80%训练，10-15%验证，10-15%测试

---

### Q19
<!-- domain: 4 | difficulty: medium | tags: cross-validation -->

当数据量有限时，哪种评估策略可以更可靠地估计模型性能？

- A. 单次训练-测试划分
- B. K折交叉验证
- C. 使用全部数据训练
- D. 增加测试集比例

**答案**: B

**解析**:
K折交叉验证：
- 数据分成K份
- 每次用K-1份训练，1份验证
- 重复K次，平均结果
- 更稳健的性能估计

---

### Q20
<!-- domain: 4 | difficulty: medium | tags: AUC-ROC -->

AUC-ROC指标衡量的是什么？

- A. 模型的训练速度
- B. 模型在不同阈值下区分正负类的能力
- C. 模型的内存使用
- D. 模型的参数数量

**答案**: B

**解析**:
AUC-ROC：
- ROC曲线：真阳性率 vs 假阳性率
- AUC：曲线下面积
- 1.0 = 完美分类器
- 0.5 = 随机猜测
- 不受阈值和类别不平衡影响

---

### Q21
<!-- domain: 4 | difficulty: hard | tags: distributed-training -->

训练大型模型时，什么技术可以将模型分布到多个GPU上？

- A. 数据并行 (Data Parallelism)
- B. 模型并行 (Model Parallelism)
- C. 两者都可以
- D. 只能使用单GPU

**答案**: C

**解析**:
分布式训练策略：
- 数据并行：每个GPU有完整模型副本，处理不同数据批次
- 模型并行：模型太大无法放入单GPU，分割到多个GPU
- 管道并行：模型分层，不同层在不同GPU

---

### Q22
<!-- domain: 4 | difficulty: medium | tags: TPU -->

在Google Cloud上训练大规模深度学习模型时，什么硬件可以提供最高性能？

- A. CPU
- B. GPU
- C. TPU
- D. FPGA

**答案**: C

**解析**:
TPU（Tensor Processing Unit）：
- 专为ML工作负载设计
- 矩阵运算优化
- 适合大规模训练和推理
- 与TensorFlow深度集成
- 成本效益高于等效GPU集群

---

### Q23
<!-- domain: 4 | difficulty: medium | tags: early-stopping -->

什么是"早停 (Early Stopping)"技术？

- A. 在训练开始时停止
- B. 当验证损失不再改善时停止训练
- C. 减少训练数据量
- D. 降低学习率

**答案**: B

**解析**:
早停：
- 监控验证集性能
- 连续多个epoch无改善时停止
- 防止过拟合
- 节省训练时间
- 保存最佳模型检查点

---

### Q24
<!-- domain: 5 | difficulty: easy | tags: Vertex-AI-Endpoints -->

在Vertex AI中，如何将训练好的模型部署为可调用的API？

- A. 上传到Cloud Storage
- B. 创建Vertex AI Endpoint
- C. 使用Cloud Functions
- D. 使用App Engine

**答案**: B

**解析**:
Vertex AI Endpoint：
- 托管模型推理
- 自动扩展
- A/B测试（流量分割）
- 监控和日志
- 支持在线和批量预测

---

### Q25
<!-- domain: 5 | difficulty: medium | tags: batch-prediction -->

一家公司需要对数百万条记录进行预测，但不需要实时响应。最经济高效的方法是什么？

- A. 创建高配置的在线端点
- B. 使用Vertex AI批量预测
- C. 创建多个端点并行处理
- D. 使用Cloud Functions

**答案**: B

**解析**:
批量预测：
- 处理大量数据
- 成本低于持续运行的端点
- 结果输出到Cloud Storage或BigQuery
- 适合非实时场景

---

### Q26
<!-- domain: 5 | difficulty: medium | tags: Model-Monitor -->

在生产环境中，如何检测模型性能随时间下降（模型漂移）？

- A. 定期重新训练
- B. 使用Vertex AI Model Monitoring
- C. 增加模型复杂度
- D. 使用更多训练数据

**答案**: B

**解析**:
Vertex AI Model Monitoring：
- 检测特征漂移
- 检测预测漂移
- 检测目标漂移（需标签）
- 自动警报
- 触发重新训练

---

### Q27
<!-- domain: 5 | difficulty: hard | tags: canary-deployment -->

一家公司想要安全地发布新版本模型，先让少量流量测试新模型。应该使用什么部署策略？

- A. 蓝绿部署
- B. 金丝雀部署 (Canary)
- C. 滚动更新
- D. 直接替换

**答案**: B

**解析**:
金丝雀部署：
- 逐步增加新版本流量（如5%→20%→50%→100%）
- 监控新版本性能
- 问题时快速回滚
- Vertex AI Endpoint支持流量分割

---

### Q28
<!-- domain: 5 | difficulty: medium | tags: Edge-deployment -->

一家公司想要在没有网络连接的设备上运行ML推理。应该使用什么？

- A. Vertex AI Endpoint
- B. TensorFlow Lite或TensorFlow.js
- C. BigQuery ML
- D. Cloud Functions

**答案**: B

**解析**:
边缘部署选项：
- TensorFlow Lite：移动设备和嵌入式
- TensorFlow.js：浏览器
- TensorRT：NVIDIA硬件
- Edge TPU：Google边缘设备

---

### Q29
<!-- domain: 5 | difficulty: medium | tags: explainability -->

一家金融公司需要解释其贷款审批模型的决策。Vertex AI提供什么功能？

- A. Model Monitoring
- B. Explainable AI (特征归因)
- C. AutoML
- D. Feature Store

**答案**: B

**解析**:
Vertex Explainable AI：
- 特征归因（哪些特征影响预测）
- 基于采样的解释
- 集成梯度（神经网络）
- 可在端点上启用

---

### Q30
<!-- domain: 6 | difficulty: medium | tags: Vertex-Pipelines -->

一家公司想要自动化其ML工作流程，从数据处理到模型部署。应该使用什么？

- A. Cloud Scheduler
- B. Vertex AI Pipelines
- C. Cloud Functions
- D. Cloud Composer

**答案**: B

**解析**:
Vertex AI Pipelines：
- 定义可重复的ML工作流
- 基于Kubeflow Pipelines
- 版本控制和追踪
- 与Vertex AI服务集成
- 支持调度和触发

---

### Q31
<!-- domain: 6 | difficulty: hard | tags: Kubeflow -->

Kubeflow的主要目的是什么？

- A. 训练单个模型
- B. 在Kubernetes上编排ML工作流
- C. 数据存储
- D. 网络管理

**答案**: B

**解析**:
Kubeflow：
- 在Kubernetes上运行ML工作流
- 可移植性（本地、云端）
- Pipelines定义工作流
- Notebooks交互开发
- 训练和推理组件

---

### Q32
<!-- domain: 6 | difficulty: medium | tags: CI-CD-ML -->

什么是MLOps中的持续集成/持续部署 (CI/CD)？

- A. 只自动化代码部署
- B. 自动化ML代码、数据和模型的测试、训练和部署
- C. 只自动化数据处理
- D. 手动部署模型

**答案**: B

**解析**:
ML中的CI/CD包括：
- 代码测试和集成
- 数据验证
- 自动化训练
- 模型验证
- 自动化部署
- 持续监控

---

### Q33
<!-- domain: 1 | difficulty: medium | tags: cost-optimization -->

一家公司想要降低ML训练成本。以下哪种方法最有效？

- A. 使用抢占式VM
- B. 只在工作时间运行
- C. 减少数据量
- D. 使用更复杂的模型

**答案**: A

**解析**:
降低训练成本：
- 抢占式/Spot VM（60-80%折扣）
- 正确选择机器类型
- 混合精度训练
- 使用检查点恢复
- 超参数调优减少试验次数

---

### Q34
<!-- domain: 2 | difficulty: medium | tags: one-hot-encoding -->

在处理分类特征时，"One-hot Encoding"的作用是什么？

- A. 压缩数据
- B. 将分类值转换为二进制向量
- C. 删除缺失值
- D. 规范化数值

**答案**: B

**解析**:
One-hot Encoding：
- 每个类别成为一个特征列
- 该类别为1，其他为0
- 例如：颜色[红,绿,蓝] → [1,0,0], [0,1,0], [0,0,1]
- 避免分类变量被当作数值处理

---

### Q35
<!-- domain: 3 | difficulty: medium | tags: batch-normalization -->

批量归一化 (Batch Normalization) 的主要优势是什么？

- A. 减少模型参数
- B. 稳定训练并允许使用更高的学习率
- C. 增加模型复杂度
- D. 减少训练数据需求

**答案**: B

**解析**:
批量归一化：
- 标准化每层的输入
- 减少内部协变量偏移
- 允许更高的学习率
- 一定的正则化效果
- 加速收敛

---

### Q36
<!-- domain: 3 | difficulty: hard | tags: embedding -->

在处理高基数分类变量（如用户ID）时，什么技术比One-hot Encoding更有效？

- A. 标签编码
- B. 嵌入 (Embedding)
- C. 二进制编码
- D. 频率编码

**答案**: B

**解析**:
嵌入层：
- 将高维稀疏向量映射到低维密集向量
- 可学习语义关系
- 减少维度灾难
- 常用于推荐系统、NLP

---

### Q37
<!-- domain: 4 | difficulty: medium | tags: confusion-matrix -->

在混淆矩阵中，"假阴性 (False Negative)"代表什么？

- A. 正确预测为正
- B. 正确预测为负
- C. 错误预测为正
- D. 错误预测为负（实际为正）

**答案**: D

**解析**:
混淆矩阵：
- 真阳性(TP)：实际正，预测正
- 真阴性(TN)：实际负，预测负
- 假阳性(FP)：实际负，预测正（误报）
- 假阴性(FN)：实际正，预测负（漏报）

---

### Q38
<!-- domain: 4 | difficulty: hard | tags: imbalanced-data -->

在处理类别极度不平衡的数据时（如欺诈检测），以下哪种方法最有效？

- A. 使用准确率作为主要指标
- B. 使用SMOTE过采样、欠采样或类权重
- C. 增加训练轮次
- D. 使用更复杂的模型

**答案**: B

**解析**:
处理不平衡数据：
- 过采样少数类（SMOTE）
- 欠采样多数类
- 类权重调整
- 使用AUC、F1而非准确率
- Focal Loss

---

### Q39
<!-- domain: 5 | difficulty: medium | tags: A-B-testing -->

一家公司想要比较两个ML模型在生产中的效果。最佳实践是什么？

- A. 只看离线指标
- B. 进行在线A/B测试
- C. 选择更复杂的模型
- D. 使用更多训练数据

**答案**: B

**解析**:
A/B测试：
- 将流量分配给不同模型版本
- 测量实际业务指标
- 统计显著性验证
- Vertex AI Endpoint支持流量分割

---

### Q40
<!-- domain: 5 | difficulty: medium | tags: latency-optimization -->

一家公司的模型推理延迟过高。以下哪种方法可以降低延迟？

- A. 增加模型复杂度
- B. 使用模型蒸馏或量化
- C. 增加批量大小
- D. 使用更慢的硬件

**答案**: B

**解析**:
降低推理延迟：
- 模型蒸馏（小模型学习大模型）
- 量化（FP32→INT8）
- 剪枝（去除不重要的连接）
- 使用GPU/TPU
- 优化批处理策略

---

### Q41
<!-- domain: 6 | difficulty: medium | tags: Experiments -->

在Vertex AI中，如何跟踪和比较多次训练运行的结果？

- A. 使用Cloud Logging
- B. 使用Vertex AI Experiments
- C. 使用BigQuery
- D. 手动记录

**答案**: B

**解析**:
Vertex AI Experiments：
- 记录超参数和指标
- 比较不同运行
- 可视化结果
- 与Pipelines集成
- 可重复实验

---

### Q42
<!-- domain: 1 | difficulty: medium | tags: Responsible-AI -->

在构建ML模型时，以下哪项是负责任AI的核心考虑因素？

- A. 只关注准确率
- B. 确保公平性、可解释性和隐私保护
- C. 使用最新的算法
- D. 最大化模型复杂度

**答案**: B

**解析**:
Google负责任AI原则：
- 对社会有益
- 避免创造或加强不公平的偏见
- 安全构建和测试
- 对人负责
- 隐私设计原则
- 坚持高标准的科学卓越性

---

### Q43
<!-- domain: 2 | difficulty: medium | tags: Dataproc, Spark -->

一家公司想要使用Apache Spark进行大规模数据处理。Google Cloud上应该使用什么服务？

- A. Dataflow
- B. Dataproc
- C. BigQuery
- D. Cloud Functions

**答案**: B

**解析**:
Dataproc：
- 托管Hadoop和Spark
- 快速创建集群
- 与Cloud Storage、BigQuery集成
- 支持Spark MLlib

---

### Q44
<!-- domain: 3 | difficulty: medium | tags: gradient-descent, optimizer -->

Adam优化器相比标准SGD的优势是什么？

- A. 计算更简单
- B. 自适应学习率，对不同参数使用不同学习率
- C. 内存使用更少
- D. 不需要设置超参数

**答案**: B

**解析**:
Adam（Adaptive Moment Estimation）：
- 结合Momentum和RMSprop
- 为每个参数维护自适应学习率
- 对稀疏梯度表现好
- 是深度学习中最常用的优化器之一

---

### Q45
<!-- domain: 4 | difficulty: hard | tags: bias-variance -->

模型的"偏差-方差权衡"是什么意思？

- A. 训练速度和精度的权衡
- B. 欠拟合（高偏差）和过拟合（高方差）之间的平衡
- C. 成本和性能的权衡
- D. 数据量和模型大小的权衡

**答案**: B

**解析**:
偏差-方差权衡：
- 高偏差：模型过于简单，欠拟合
- 高方差：模型过于复杂，过拟合
- 目标：找到复杂度平衡点
- 通过正则化、模型选择控制

---

### Q46
<!-- domain: 5 | difficulty: medium | tags: Model-Registry -->

在Vertex AI中，什么功能用于管理模型版本和元数据？

- A. Feature Store
- B. Model Registry
- C. Experiments
- D. Pipelines

**答案**: B

**解析**:
Vertex AI Model Registry：
- 模型版本管理
- 元数据存储
- 部署历史
- 模型血缘
- 与Endpoints集成

---

### Q47
<!-- domain: 6 | difficulty: hard | tags: TFX-components -->

在TFX管道中，哪个组件负责模型验证，确保新模型比当前生产模型更好？

- A. Evaluator
- B. Trainer
- C. Pusher
- D. Transform

**答案**: A

**解析**:
TFX Evaluator：
- 评估模型性能
- 与基准模型比较
- 验证阈值
- 只有通过验证的模型才能部署
- 使用TensorFlow Model Analysis

---

### Q48
<!-- domain: 1 | difficulty: medium | tags: IAM, security -->

一家公司想要限制只有特定团队可以部署模型到生产环境。应该使用什么？

- A. VPC
- B. IAM角色和权限
- C. 防火墙
- D. 加密

**答案**: B

**解析**:
GCP IAM：
- Vertex AI User：使用预测服务
- Vertex AI Developer：开发和训练
- Vertex AI Admin：完全管理权限
- 最小权限原则

---

### Q49
<!-- domain: 3 | difficulty: hard | tags: gradient-clipping -->

在训练循环神经网络时，什么技术可以防止"梯度爆炸"问题？

- A. Dropout
- B. 梯度裁剪 (Gradient Clipping)
- C. 批量归一化
- D. 权重初始化

**答案**: B

**解析**:
梯度裁剪：
- 限制梯度的最大范数
- 防止参数更新过大
- 常用于RNN、LSTM
- 稳定训练过程

---

### Q50
<!-- domain: 5 | difficulty: medium | tags: serving-optimization -->

一家公司想要优化模型服务成本，同时保持可用性。应该使用什么Vertex AI Endpoint配置？

- A. 最大实例数设为1
- B. 使用自动缩放，设置最小和最大实例数
- C. 使用最大实例数而不缩放
- D. 完全禁用缩放

**答案**: B

**解析**:
自动缩放最佳实践：
- 设置最小实例（保证可用性）
- 设置最大实例（控制成本）
- 根据流量自动缩放
- 使用预热请求减少冷启动

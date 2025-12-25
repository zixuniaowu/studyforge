# Google Cloud Professional Machine Learning Engineer - Set 2

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
<!-- domain: 1 | difficulty: medium | tags: Vertex-AI-Agent-Builder -->

一家公司想要构建一个能够搜索内部文档并回答问题的AI助手。最简单的方法是什么？

- A. 从头训练LLM
- B. 使用Vertex AI Agent Builder
- C. 使用BigQuery ML
- D. 使用Cloud Functions

**答案**: B

**解析**:
Vertex AI Agent Builder（原Enterprise Search）：
- 快速构建搜索和对话应用
- 无代码/低代码
- 自动RAG实现
- 支持多种数据源
- 与Gemini集成

---

### Q2
<!-- domain: 1 | difficulty: hard | tags: model-selection -->

一家公司需要选择ML方法来预测客户流失。以下哪种方法最合适？

- A. 无监督聚类
- B. 二分类监督学习
- C. 回归分析
- D. 强化学习

**答案**: B

**解析**:
客户流失预测：
- 有标签数据（流失/不流失）
- 两个类别 = 二分类
- 可以使用逻辑回归、随机森林、XGBoost、神经网络等

---

### Q3
<!-- domain: 1 | difficulty: medium | tags: latency-requirements -->

一家金融公司需要在50ms内完成欺诈检测推理。应该考虑什么架构？

- A. 批量预测
- B. 在线预测端点，使用小型优化模型
- C. BigQuery ML
- D. 手动审核

**答案**: B

**解析**:
低延迟要求：
- 在线端点（非批量）
- 模型优化（量化、蒸馏）
- 适当的硬件（GPU）
- 模型缓存
- 减少网络跳数

---

### Q4
<!-- domain: 2 | difficulty: medium | tags: TFX-Transform -->

在TFX管道中，哪个组件负责将原始数据转换为模型可用的特征？

- A. ExampleGen
- B. Transform
- C. Trainer
- D. Evaluator

**答案**: B

**解析**:
TFX Transform：
- 特征工程
- 归一化、标准化
- 词汇表构建
- 生成预处理图（训练和推理一致）

---

### Q5
<!-- domain: 2 | difficulty: hard | tags: training-serving-skew -->

什么是"训练-服务偏差 (Training-Serving Skew)"？如何避免？

- A. 模型在训练和测试上的性能差异
- B. 训练时和推理时的数据处理不一致
- C. 数据集大小差异
- D. 模型版本差异

**答案**: B

**解析**:
训练-服务偏差：
- 训练时用Python预处理
- 推理时用不同实现
- 导致不一致的结果

避免方法：
- 使用TFX Transform生成统一预处理
- 使用Feature Store确保一致性

---

### Q6
<!-- domain: 2 | difficulty: medium | tags: data-validation, TFDV -->

TensorFlow Data Validation (TFDV) 的主要功能是什么？

- A. 训练模型
- B. 生成数据统计、检测异常和数据漂移
- C. 部署模型
- D. 可视化结果

**答案**: B

**解析**:
TFDV功能：
- 生成数据统计
- 推断schema
- 检测数据异常
- 可视化数据分布
- 比较不同数据集

---

### Q7
<!-- domain: 2 | difficulty: medium | tags: class-imbalance -->

处理类别不平衡数据时，以下哪种采样策略在训练集上使用？

- A. 对测试集过采样
- B. 对训练集的少数类过采样或多数类欠采样
- C. 不做任何处理
- D. 对验证集欠采样

**答案**: B

**解析**:
采样策略只应用于训练集：
- 保持测试/验证集原始分布
- 真实评估模型性能
- 训练集可以SMOTE过采样或欠采样

---

### Q8
<!-- domain: 3 | difficulty: medium | tags: Keras-API -->

在TensorFlow/Keras中，创建神经网络最常用的高级API是什么？

- A. tf.Session
- B. tf.keras.Sequential 或 Functional API
- C. tf.raw_ops
- D. tf.data

**答案**: B

**解析**:
Keras构建模型：
- Sequential：线性堆叠层
- Functional API：复杂拓扑（多输入/输出）
- Subclassing：完全自定义

---

### Q9
<!-- domain: 3 | difficulty: hard | tags: XGBoost, tree -->

对于表格数据的分类/回归问题，以下哪种算法通常表现最好？

- A. 深度神经网络
- B. 梯度提升树（如XGBoost、LightGBM）
- C. 线性回归
- D. K近邻

**答案**: B

**解析**:
表格数据：
- 梯度提升树通常是首选
- 对特征工程要求较低
- 处理缺失值和类别特征
- 比DNN更易调优

---

### Q10
<!-- domain: 3 | difficulty: medium | tags: learning-rate -->

学习率设置过高会导致什么问题？

- A. 收敛太慢
- B. 训练不收敛或震荡
- C. 内存不足
- D. 数据泄露

**答案**: B

**解析**:
学习率影响：
- 过高：震荡、发散、错过最优解
- 过低：收敛慢、可能陷入局部最优
- 常用策略：学习率调度（逐渐降低）

---

### Q11
<!-- domain: 3 | difficulty: hard | tags: BERT, NLP -->

BERT模型的预训练任务是什么？

- A. 机器翻译
- B. 掩码语言模型(MLM)和下一句预测(NSP)
- C. 情感分析
- D. 命名实体识别

**答案**: B

**解析**:
BERT预训练：
- MLM：随机掩盖15%的词，预测被掩盖的词
- NSP：判断两句是否连续
- 双向上下文理解
- 然后在下游任务微调

---

### Q12
<!-- domain: 3 | difficulty: medium | tags: CNN, architecture -->

在CNN中，池化层(Pooling)的主要作用是什么？

- A. 增加参数数量
- B. 降低特征图维度，减少计算量
- C. 学习新特征
- D. 正则化

**答案**: B

**解析**:
池化层：
- 下采样（减小尺寸）
- 提供平移不变性
- 减少参数和计算
- 常用：Max Pooling, Average Pooling

---

### Q13
<!-- domain: 4 | difficulty: medium | tags: stratified-sampling -->

在分类问题中划分数据集时，为什么要使用分层采样(Stratified Sampling)？

- A. 加快训练速度
- B. 确保每个子集中各类别的比例与原始数据一致
- C. 增加数据量
- D. 减少过拟合

**答案**: B

**解析**:
分层采样：
- 保持类别分布
- 特别重要于不平衡数据
- sklearn: train_test_split(stratify=y)

---

### Q14
<!-- domain: 4 | difficulty: medium | tags: tensorboard -->

如何在训练过程中可视化损失曲线和指标？

- A. 打印到控制台
- B. 使用TensorBoard
- C. 保存到文件
- D. 使用matplotlib

**答案**: B

**解析**:
TensorBoard功能：
- 标量（损失、准确率）
- 图像
- 直方图（权重分布）
- 计算图
- 与Vertex AI集成

---

### Q15
<!-- domain: 4 | difficulty: hard | tags: L1-L2-difference -->

L1正则化和L2正则化的主要区别是什么？

- A. L1更快
- B. L1产生稀疏权重（特征选择），L2产生小但非零权重
- C. L2产生稀疏权重
- D. 没有区别

**答案**: B

**解析**:
正则化区别：
- L1（Lasso）：权重可变为0 → 特征选择
- L2（Ridge）：权重趋向于小但不为0
- Elastic Net：L1 + L2组合

---

### Q16
<!-- domain: 4 | difficulty: medium | tags: GPU-training -->

在Vertex AI中，如何指定使用GPU进行训练？

- A. 自动使用GPU
- B. 在训练作业配置中指定机器类型和加速器
- C. 只能在本地使用GPU
- D. 使用特殊的代码

**答案**: B

**解析**:
Vertex AI GPU配置：
- 选择包含GPU的机器类型
- 指定加速器类型（如NVIDIA Tesla T4、V100、A100）
- 指定GPU数量
- 代码需使用GPU框架

---

### Q17
<!-- domain: 4 | difficulty: hard | tags: mixed-precision -->

什么是混合精度训练(Mixed Precision Training)？

- A. 使用多种优化器
- B. 使用FP16和FP32混合计算，加速训练
- C. 使用多种损失函数
- D. 使用多个GPU

**答案**: B

**解析**:
混合精度训练：
- FP16计算（更快）
- FP32存储权重（精度）
- 减少内存使用
- 加速训练
- TensorFlow: tf.keras.mixed_precision

---

### Q18
<!-- domain: 5 | difficulty: medium | tags: online-prediction -->

在Vertex AI Endpoint上部署模型时，如何确保高可用性？

- A. 使用单个节点
- B. 配置多个副本和自动扩展
- C. 使用批量预测
- D. 降低模型复杂度

**答案**: B

**解析**:
高可用配置：
- 最小副本数 ≥ 2
- 自动扩展
- 多区域部署
- 健康检查

---

### Q19
<!-- domain: 5 | difficulty: hard | tags: shadow-deployment -->

什么是"影子部署 (Shadow Deployment)"？

- A. 在夜间部署
- B. 新模型接收流量副本但不返回结果给用户，用于测试
- C. 部署到测试环境
- D. 加密部署

**答案**: B

**解析**:
影子部署：
- 新模型接收实际流量的副本
- 不影响用户（结果不返回）
- 比较新旧模型性能
- 验证后再正式切换

---

### Q20
<!-- domain: 5 | difficulty: medium | tags: feature-drift -->

以下哪种漂移类型指的是输入特征分布的变化？

- A. 概念漂移
- B. 数据/特征漂移
- C. 标签漂移
- D. 模型漂移

**答案**: B

**解析**:
漂移类型：
- 特征漂移：输入分布变化
- 概念漂移：输入和输出关系变化
- 标签漂移：标签分布变化
- 预测漂移：模型输出分布变化

---

### Q21
<!-- domain: 5 | difficulty: medium | tags: ONNX -->

将TensorFlow模型转换为ONNX格式的主要优势是什么？

- A. 减少模型大小
- B. 跨框架和平台的互操作性
- C. 提高准确率
- D. 加密保护

**答案**: B

**解析**:
ONNX（Open Neural Network Exchange）：
- 跨框架标准格式
- TensorFlow → PyTorch可用
- 多种推理引擎支持
- 边缘设备部署

---

### Q22
<!-- domain: 6 | difficulty: medium | tags: Vertex-Pipelines, components -->

在Vertex AI Pipelines中，什么是"组件 (Component)"？

- A. 物理硬件
- B. 可重用的代码单元，执行特定任务
- C. 数据存储
- D. 网络配置

**答案**: B

**解析**:
Pipeline组件：
- 封装特定功能（数据处理、训练等）
- 可重用
- 有输入/输出定义
- Python函数或容器化

---

### Q23
<!-- domain: 6 | difficulty: hard | tags: CI-CD-trigger -->

在ML CI/CD流程中，什么事件应该触发重新训练管道？

- A. 只有代码更改
- B. 数据更改、模型性能下降、代码更改
- C. 只有手动触发
- D. 每天固定时间

**答案**: B

**解析**:
重新训练触发器：
- 代码更改（新特征、算法）
- 数据更新（新数据可用）
- 性能下降（监控检测到）
- 定期调度（保持新鲜度）

---

### Q24
<!-- domain: 1 | difficulty: medium | tags: Gemini, multimodal -->

Google Cloud的Gemini模型能够处理哪些类型的输入？

- A. 只有文本
- B. 文本、图像、视频、音频
- C. 只有图像
- D. 只有代码

**答案**: B

**解析**:
Gemini多模态能力：
- 文本理解和生成
- 图像分析
- 视频理解
- 音频处理
- 代码生成

---

### Q25
<!-- domain: 2 | difficulty: medium | tags: Dataproc-Spark -->

使用Dataproc进行大规模特征工程时，什么格式最适合存储特征数据？

- A. CSV
- B. Parquet
- C. JSON
- D. XML

**答案**: B

**解析**:
Parquet优势：
- 列式存储（快速列读取）
- 高效压缩
- 支持复杂嵌套结构
- 与Spark、BigQuery兼容

---

### Q26
<!-- domain: 3 | difficulty: medium | tags: loss-function -->

多分类问题应该使用什么损失函数？

- A. 均方误差 (MSE)
- B. 分类交叉熵 (Categorical Cross-entropy)
- C. 二元交叉熵
- D. Hinge Loss

**答案**: B

**解析**:
损失函数选择：
- 回归：MSE, MAE
- 二分类：Binary Cross-entropy
- 多分类（互斥）：Categorical Cross-entropy
- 多标签：Binary Cross-entropy per label

---

### Q27
<!-- domain: 3 | difficulty: hard | tags: ResNet, skip-connection -->

ResNet架构中的"跳跃连接 (Skip Connection)"解决什么问题？

- A. 过拟合
- B. 梯度消失，允许训练更深的网络
- C. 数据不平衡
- D. 过度拟合

**答案**: B

**解析**:
跳跃连接：
- 直接将输入传递到后面的层
- 梯度可以直接流回
- 解决深度网络的梯度消失
- 允许训练100+层的网络

---

### Q28
<!-- domain: 4 | difficulty: medium | tags: validation-curve -->

验证曲线(Validation Curve)用于分析什么？

- A. 数据分布
- B. 超参数对训练和验证性能的影响
- C. 特征重要性
- D. 预测结果

**答案**: B

**解析**:
验证曲线：
- X轴：超参数值
- Y轴：训练和验证分数
- 找到最佳超参数
- 诊断欠拟合/过拟合

---

### Q29
<!-- domain: 4 | difficulty: medium | tags: callbacks -->

在Keras中，如何在每个epoch后保存模型检查点？

- A. 手动保存
- B. 使用ModelCheckpoint回调
- C. 训练结束后保存
- D. 使用TensorBoard

**答案**: B

**解析**:
Keras回调：
```python
checkpoint = ModelCheckpoint(
    filepath='model_{epoch}.h5',
    save_best_only=True,
    monitor='val_loss'
)
model.fit(x, y, callbacks=[checkpoint])
```

---

### Q30
<!-- domain: 5 | difficulty: medium | tags: pre-warming -->

为什么在部署新模型到Vertex AI Endpoint时要使用预热(Pre-warming)？

- A. 测试模型
- B. 减少首次请求的冷启动延迟
- C. 验证数据
- D. 训练模型

**答案**: B

**解析**:
预热请求：
- 在接收真实流量前发送测试请求
- 加载模型到内存
- 初始化依赖
- 减少用户感知的延迟

---

### Q31
<!-- domain: 5 | difficulty: hard | tags: prediction-caching -->

对于频繁请求相同输入的场景，如何优化推理性能？

- A. 增加模型复杂度
- B. 实现预测缓存
- C. 使用更多GPU
- D. 减少批量大小

**答案**: B

**解析**:
预测缓存：
- 缓存常见输入的预测结果
- 使用Memorystore或Redis
- 减少冗余计算
- 适合输入有限的场景

---

### Q32
<!-- domain: 6 | difficulty: medium | tags: Artifact-Lineage -->

在Vertex AI中，如何追踪模型是从哪个数据集和代码版本训练的？

- A. 手动记录
- B. 使用Vertex ML Metadata和血缘追踪
- C. 查看日志
- D. 检查存储

**答案**: B

**解析**:
ML Metadata：
- 自动记录artifact血缘
- 数据集→训练作业→模型→端点
- 可视化依赖关系
- 支持复现和审计

---

### Q33
<!-- domain: 1 | difficulty: medium | tags: VPC-Service-Controls -->

一家金融公司想要确保ML训练数据不会离开其VPC。应该配置什么？

- A. 防火墙规则
- B. VPC Service Controls
- C. IAM权限
- D. 加密

**答案**: B

**解析**:
VPC Service Controls：
- 定义安全边界
- 防止数据外泄
- 限制服务之间的通信
- 即使有权限也无法跨边界访问

---

### Q34
<!-- domain: 2 | difficulty: hard | tags: windowing -->

在处理时间序列数据进行ML时，"滑动窗口"(Sliding Window)方法的作用是什么？

- A. 加密数据
- B. 创建固定长度的历史输入序列用于预测
- C. 压缩数据
- D. 去除异常值

**答案**: B

**解析**:
滑动窗口：
- 将时间序列转换为监督学习
- 例如：用过去7天预测第8天
- 创建多个训练样本
- 窗口大小是重要超参数

---

### Q35
<!-- domain: 3 | difficulty: medium | tags: data-augmentation -->

在图像分类任务中，数据增强(Data Augmentation)的作用是什么？

- A. 减少数据量
- B. 通过变换增加训练样本多样性，提高泛化能力
- C. 压缩图像
- D. 加速训练

**答案**: B

**解析**:
图像数据增强：
- 旋转、翻转、缩放
- 颜色变换
- 裁剪
- 增加多样性，减少过拟合
- 使用tf.image或albumentations

---

### Q36
<!-- domain: 4 | difficulty: hard | tags: learning-rate-schedule -->

以下哪种学习率调度策略在训练初期使用较小学习率，然后逐渐增加？

- A. 指数衰减
- B. 学习率预热 (Warmup)
- C. 余弦衰减
- D. 阶梯衰减

**答案**: B

**解析**:
学习率预热：
- 开始用小学习率
- 逐渐增加到目标值
- 然后再衰减
- 常用于Transformer训练

---

### Q37
<!-- domain: 4 | difficulty: medium | tags: log-loss -->

对于二分类问题，Log Loss（对数损失）值越低表示什么？

- A. 模型越差
- B. 模型的概率预测越准确
- C. 训练时间越长
- D. 数据量越少

**答案**: B

**解析**:
Log Loss：
- 衡量预测概率与真实标签的差距
- 范围：0到无穷大
- 0表示完美预测
- 惩罚错误的自信预测

---

### Q38
<!-- domain: 5 | difficulty: medium | tags: model-versioning -->

在Vertex AI Model Registry中，为什么要为模型创建不同版本？

- A. 减少存储成本
- B. 追踪模型演进，支持回滚和A/B测试
- C. 加速训练
- D. 简化代码

**答案**: B

**解析**:
模型版本管理：
- 追踪模型历史
- 比较不同版本性能
- 快速回滚问题版本
- 支持A/B测试不同版本

---

### Q39
<!-- domain: 5 | difficulty: hard | tags: TF-Serving, batching -->

TensorFlow Serving中的"动态批处理 (Dynamic Batching)"如何提高吞吐量？

- A. 使用更大的模型
- B. 将多个请求合并成一个批次进行推理
- C. 使用更多内存
- D. 减少并发

**答案**: B

**解析**:
动态批处理：
- 在短时间窗口收集请求
- 合并成批次处理
- 利用GPU批处理能力
- 提高吞吐量，可能稍增延迟

---

### Q40
<!-- domain: 6 | difficulty: medium | tags: Cloud-Composer -->

Cloud Composer与Vertex AI Pipelines的主要区别是什么？

- A. 没有区别
- B. Composer是通用编排(Airflow)，Pipelines专为ML工作流设计
- C. Composer更便宜
- D. Pipelines不支持调度

**答案**: B

**解析**:
服务比较：
- Cloud Composer：通用工作流编排（Airflow）
- Vertex Pipelines：ML专用，Kubeflow基础
- Composer可调用Pipelines
- 复杂ETL + ML可能需要两者结合

---

### Q41
<!-- domain: 1 | difficulty: medium | tags: pricing-ML -->

以下哪种定价模式最适合有稳定ML推理需求的公司？

- A. 按需付费
- B. 预留容量
- C. 抢占式实例
- D. 免费层

**答案**: B

**解析**:
预留/承诺使用折扣：
- 1年或3年承诺
- 获得显著折扣
- 适合可预测的工作负载
- 抢占式适合可中断的训练

---

### Q42
<!-- domain: 2 | difficulty: medium | tags: label-encoding -->

什么情况下应该使用标签编码(Label Encoding)而非One-hot Encoding？

- A. 总是使用标签编码
- B. 有序分类变量（如：低、中、高）
- C. 任何分类变量
- D. 数值变量

**答案**: B

**解析**:
编码选择：
- 有序变量：标签编码（保留顺序）
- 无序变量：One-hot（避免错误顺序）
- 高基数：嵌入

---

### Q43
<!-- domain: 3 | difficulty: hard | tags: attention-score -->

在注意力机制中，如何计算注意力分数？

- A. 随机生成
- B. Query和Key的点积，然后Softmax
- C. 简单相加
- D. 取最大值

**答案**: B

**解析**:
注意力计算：
1. Query × Key^T = 相似度矩阵
2. 除以sqrt(d_k)缩放
3. Softmax得到权重
4. 权重 × Value = 输出

---

### Q44
<!-- domain: 4 | difficulty: medium | tags: MAP-metric -->

在信息检索和推荐系统中，MAP (Mean Average Precision) 衡量什么？

- A. 训练速度
- B. 排序结果的质量，考虑相关项的位置
- C. 模型大小
- D. 数据质量

**答案**: B

**解析**:
MAP（平均精度均值）：
- 衡量排序质量
- 考虑相关项的位置
- 越靠前的相关项贡献越大
- 常用于搜索和推荐评估

---

### Q45
<!-- domain: 5 | difficulty: medium | tags: blue-green-deployment -->

蓝绿部署(Blue-Green Deployment)的工作方式是什么？

- A. 逐渐增加流量
- B. 同时运行两个完整环境，一键切换
- C. 只部署到测试环境
- D. 滚动更新

**答案**: B

**解析**:
蓝绿部署：
- 蓝色：当前生产
- 绿色：新版本
- 测试绿色环境
- 一键切换流量
- 问题时快速回滚

---

### Q46
<!-- domain: 6 | difficulty: hard | tags: artifact-store -->

在Vertex AI Pipelines中，管道运行产生的输出存储在哪里？

- A. 本地文件系统
- B. Cloud Storage（作为Artifact Store）
- C. 内存
- D. BigQuery

**答案**: B

**解析**:
Pipeline Artifact存储：
- 输出存储在Cloud Storage
- 自动记录到ML Metadata
- 可以在后续步骤使用
- 支持血缘追踪

---

### Q47
<!-- domain: 1 | difficulty: hard | tags: hybrid-ML -->

一家公司部分数据因法规不能离开本地。如何构建混合ML架构？

- A. 全部在云端
- B. 使用Anthos和GKE连接本地和云端
- C. 全部在本地
- D. 不使用ML

**答案**: B

**解析**:
混合ML架构：
- Anthos：统一的混合/多云平台
- 敏感数据保留本地
- 使用Vertex AI管理
- 统一的ML工作流

---

### Q48
<!-- domain: 3 | difficulty: medium | tags: dropout-inference -->

在推理时应该如何处理Dropout层？

- A. 保持训练时的行为
- B. 禁用Dropout，使用所有神经元
- C. 增加Dropout率
- D. 删除Dropout层

**答案**: B

**解析**:
Dropout推理行为：
- 训练时：随机关闭神经元
- 推理时：使用所有神经元
- Keras自动处理：model.predict()
- 或设置training=False

---

### Q49
<!-- domain: 4 | difficulty: medium | tags: hold-out -->

为什么需要单独的测试集而不只是验证集？

- A. 增加数据量
- B. 测试集提供对未见数据的无偏估计，验证集用于调参可能过拟合
- C. 加速训练
- D. 简化流程

**答案**: B

**解析**:
数据集划分目的：
- 训练集：学习模型参数
- 验证集：调整超参数（可能过拟合）
- 测试集：最终无偏评估
- 测试集只在最后使用一次

---

### Q50
<!-- domain: 5 | difficulty: hard | tags: resource-allocation -->

一个端点需要在高峰期处理10倍于平时的流量。最佳资源配置策略是什么？

- A. 始终配置最大容量
- B. 使用自动扩展，设置合适的指标和阈值
- C. 始终配置最小容量
- D. 手动监控和调整

**答案**: B

**解析**:
自动扩展配置：
- 设置最小/最大副本数
- 选择扩展指标（CPU、请求数）
- 设置目标利用率
- 配置扩展冷却时间
- 平衡成本和性能

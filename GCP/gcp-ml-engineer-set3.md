# Google Cloud Professional Machine Learning Engineer - Set 3

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
<!-- domain: 1 | difficulty: hard | tags: Gemini, prompting -->

使用Vertex AI上的Gemini模型时，如何最有效地引导模型执行特定任务？

- A. 只发送简短指令
- B. 使用详细的系统提示、示例和明确的输出格式说明
- C. 发送大量无关上下文
- D. 不需要任何提示工程

**答案**: B

**解析**:
有效的提示工程：
- 明确角色和任务
- 提供少量示例（Few-shot）
- 指定输出格式
- 分步骤指导复杂任务

---

### Q2
<!-- domain: 1 | difficulty: medium | tags: Dialogflow-CX -->

Dialogflow CX与Dialogflow ES的主要区别是什么？

- A. 完全相同
- B. CX支持更复杂的对话流程和状态机模型
- C. ES更新
- D. CX只支持语音

**答案**: B

**解析**:
Dialogflow CX特点：
- 可视化流程构建器
- 页面和流程概念
- 更复杂的对话管理
- 适合企业级应用

---

### Q3
<!-- domain: 2 | difficulty: hard | tags: BigQuery-ML, TRANSFORM -->

在BigQuery ML中，如何确保训练时的特征转换在预测时自动应用？

- A. 手动复制转换逻辑
- B. 使用TRANSFORM子句
- C. 使用Python预处理
- D. 不需要

**答案**: B

**解析**:
BigQuery ML TRANSFORM：
```sql
CREATE MODEL `project.dataset.model`
TRANSFORM(
  ML.BUCKETIZE(age, [20, 40, 60]) AS age_bucket,
  ...
)
AS SELECT * FROM training_data
```
预测时自动应用相同转换。

---

### Q4
<!-- domain: 2 | difficulty: medium | tags: Pub-Sub, streaming -->

在实时ML推理管道中，Pub/Sub的作用是什么？

- A. 存储模型
- B. 解耦消息生产者和消费者，提供可靠的消息传递
- C. 训练模型
- D. 可视化结果

**答案**: B

**解析**:
Pub/Sub在ML管道中：
- 接收实时事件
- 缓冲流量峰值
- 触发推理服务
- 与Dataflow集成

---

### Q5
<!-- domain: 2 | difficulty: hard | tags: Feature-Store, online-serving -->

Vertex AI Feature Store的在线服务(Online Serving)和离线服务(Batch Serving)的主要区别是什么？

- A. 没有区别
- B. 在线提供低延迟实时特征，离线提供大规模批量特征
- C. 只有成本差异
- D. 在线只支持数值特征

**答案**: B

**解析**:
Feature Store服务模式：
- 在线：低延迟，实时推理
- 离线：批量导出，模型训练
- 确保两者特征一致性

---

### Q6
<!-- domain: 3 | difficulty: medium | tags: AutoML-Tables -->

一家公司想要快速建立表格数据分类模型，但没有ML专业知识。应该使用什么？

- A. 从头编写TensorFlow
- B. Vertex AI AutoML Tabular
- C. BigQuery直接查询
- D. 手动特征工程

**答案**: B

**解析**:
AutoML Tabular：
- 自动化特征工程
- 自动模型选择
- 超参数调优
- 可解释性支持

---

### Q7
<!-- domain: 3 | difficulty: hard | tags: GAN -->

生成对抗网络(GAN)由哪两个主要组件组成？

- A. 编码器和解码器
- B. 生成器和判别器
- C. 输入层和输出层
- D. 正向和反向传播

**答案**: B

**解析**:
GAN架构：
- 生成器：生成假数据
- 判别器：区分真假数据
- 对抗训练
- 用于图像生成、数据增强

---

### Q8
<!-- domain: 3 | difficulty: medium | tags: sequence-model -->

处理可变长度序列数据（如文本）时，以下哪种架构最常用？

- A. 全连接网络
- B. Transformer或RNN/LSTM
- C. CNN
- D. 随机森林

**答案**: B

**解析**:
序列模型选择：
- Transformer：并行处理，长距离依赖
- RNN/LSTM：顺序处理
- Transformer现在是主流
- 适合文本、时间序列

---

### Q9
<!-- domain: 4 | difficulty: medium | tags: overfitting-detection -->

如何判断模型正在过拟合？

- A. 训练损失和验证损失都下降
- B. 训练损失下降但验证损失开始上升
- C. 训练损失和验证损失都上升
- D. 无法判断

**答案**: B

**解析**:
过拟合信号：
- 训练性能持续改善
- 验证性能停滞或下降
- 训练-验证差距增大
- 解决：正则化、早停、更多数据

---

### Q10
<!-- domain: 4 | difficulty: hard | tags: class-weight -->

在处理类别不平衡时，如何在TensorFlow/Keras中使用类权重？

- A. 忽略类权重
- B. 在model.fit()中设置class_weight参数
- C. 修改模型架构
- D. 只修改数据

**答案**: B

**解析**:
类权重使用：
```python
class_weight = {0: 1., 1: 10.}  # 少数类权重更高
model.fit(x, y, class_weight=class_weight)
```
让模型更关注少数类。

---

### Q11
<!-- domain: 4 | difficulty: medium | tags: distributed-strategy -->

TensorFlow中，以下哪种分布式策略适合单机多GPU训练？

- A. ParameterServerStrategy
- B. MirroredStrategy
- C. TPUStrategy
- D. CentralStorageStrategy

**答案**: B

**解析**:
分布式策略选择：
- MirroredStrategy：单机多GPU
- MultiWorkerMirroredStrategy：多机多GPU
- TPUStrategy：TPU
- ParameterServerStrategy：大规模异步

---

### Q12
<!-- domain: 5 | difficulty: medium | tags: batch-vs-online -->

一家公司需要为数百万用户生成推荐，但不需要实时。应该选择什么方式？

- A. 在线端点
- B. 批量预测
- C. 流处理
- D. 手动计算

**答案**: B

**解析**:
批量预测适用于：
- 大规模数据
- 非实时需求
- 成本敏感
- 定期更新的推荐

---

### Q13
<!-- domain: 5 | difficulty: hard | tags: model-optimization -->

以下哪种技术可以减少模型大小同时保持大部分准确性？

- A. 增加层数
- B. 模型剪枝(Pruning)
- C. 增加特征
- D. 使用更大的batch

**答案**: B

**解析**:
模型压缩技术：
- 剪枝：移除不重要的权重
- 量化：减少精度（FP32→INT8）
- 蒸馏：小模型学习大模型
- 结构化剪枝：移除整个神经元/通道

---

### Q14
<!-- domain: 6 | difficulty: medium | tags: scheduling -->

如何在Vertex AI中定期自动运行训练管道？

- A. 手动运行
- B. 使用Cloud Scheduler触发
- C. 只在数据更新时运行
- D. 每次API调用时

**答案**: B

**解析**:
管道调度选项：
- Cloud Scheduler：cron表达式
- 事件触发：Cloud Functions + Pub/Sub
- 手动触发
- 编程触发

---

### Q15
<!-- domain: 6 | difficulty: hard | tags: conditional-execution -->

在Vertex AI Pipelines中，如何实现条件执行（如只有当准确率>阈值时才部署）？

- A. 手动检查
- B. 使用dsl.Condition条件组件
- C. 不支持条件
- D. 创建多个管道

**答案**: B

**解析**:
条件执行：
```python
with dsl.Condition(accuracy > 0.9):
    deploy_model(model)
```
基于运行时值决定执行路径。

---

### Q16
<!-- domain: 1 | difficulty: medium | tags: Cloud-Run-inference -->

对于轻量级ML推理，以下哪个服务提供无服务器容器托管？

- A. Compute Engine
- B. Cloud Run
- C. GKE
- D. Cloud Functions

**答案**: B

**解析**:
Cloud Run用于ML推理：
- 无服务器容器
- 自动扩缩容
- 按请求付费
- 适合轻量模型

---

### Q17
<!-- domain: 2 | difficulty: medium | tags: data-labeling -->

一家公司需要为图像分类项目标注大量图片。GCP提供什么服务？

- A. BigQuery
- B. Vertex AI Data Labeling
- C. Cloud Storage
- D. Dataflow

**答案**: B

**解析**:
Vertex AI Data Labeling：
- 人工标注服务
- 支持图像、文本、视频
- 质量控制
- 与Vertex AI集成

---

### Q18
<!-- domain: 3 | difficulty: hard | tags: RLHF -->

RLHF (Reinforcement Learning from Human Feedback) 主要用于什么？

- A. 图像分类
- B. 根据人类偏好对齐大语言模型
- C. 时间序列预测
- D. 聚类

**答案**: B

**解析**:
RLHF流程：
1. 收集人类偏好数据
2. 训练奖励模型
3. 使用RL优化生成模型
4. 使模型输出符合人类期望

---

### Q19
<!-- domain: 4 | difficulty: medium | tags: tf-data -->

TensorFlow的tf.data API的主要优势是什么？

- A. 模型训练
- B. 高效的数据加载和预处理管道
- C. 模型部署
- D. 可视化

**答案**: B

**解析**:
tf.data优势：
- 高效数据管道
- 并行处理
- 预取(prefetch)
- 支持大数据集

---

### Q20
<!-- domain: 5 | difficulty: medium | tags: request-batching -->

以下哪种技术可以提高ML推理的吞吐量？

- A. 减少模型大小
- B. 请求批处理
- C. 使用更小的输入
- D. 减少副本数

**答案**: B

**解析**:
请求批处理：
- 合并多个请求
- 利用GPU并行能力
- 提高吞吐量
- 可能略增延迟

---

### Q21
<!-- domain: 5 | difficulty: hard | tags: traffic-management -->

在Vertex AI Endpoint上如何安全地从旧模型切换到新模型？

- A. 直接替换
- B. 使用流量分割逐步迁移
- C. 删除后重新部署
- D. 手动通知用户

**答案**: B

**解析**:
安全切换策略：
1. 部署新模型到同一端点
2. 分配10%流量到新模型
3. 监控性能
4. 逐步增加到100%
5. 移除旧模型

---

### Q22
<!-- domain: 6 | difficulty: medium | tags: model-validation -->

在ML管道中，模型验证步骤应该验证什么？

- A. 只有准确率
- B. 准确率、公平性、性能基准、数据统计
- C. 只有训练时间
- D. 只有模型大小

**答案**: B

**解析**:
模型验证检查：
- 性能指标（准确率、F1等）
- 与基准比较
- 偏见检测
- 预测延迟
- 数据质量

---

### Q23
<!-- domain: 1 | difficulty: medium | tags: cost-efficiency -->

在GCP上运行ML训练时，如何最大化成本效益？

- A. 使用最大的机器
- B. 使用抢占式VM、正确选择机器类型、优化代码
- C. 永不停止训练
- D. 使用最多的GPU

**答案**: B

**解析**:
成本优化策略：
- 抢占式/Spot VM（60-80%折扣）
- 正确的机器类型
- 高效的代码
- 早停避免过度训练
- 使用检查点恢复

---

### Q24
<!-- domain: 2 | difficulty: hard | tags: time-series-split -->

对于时间序列预测，为什么不能使用普通的随机训练-测试分割？

- A. 随机分割更快
- B. 随机分割会导致数据泄露（未来数据泄露到训练中）
- C. 时间序列数据太小
- D. 没有影响

**答案**: B

**解析**:
时间序列分割：
- 必须按时间顺序
- 训练：较早的数据
- 测试：较晚的数据
- 避免未来信息泄露

---

### Q25
<!-- domain: 3 | difficulty: medium | tags: Word2Vec -->

Word2Vec的主要目的是什么？

- A. 语音识别
- B. 将词语转换为密集向量表示
- C. 图像处理
- D. 数据清洗

**答案**: B

**解析**:
Word2Vec：
- 词嵌入方法
- 捕捉语义关系
- Skip-gram和CBOW两种架构
- 是现代NLP的基础

---

### Q26
<!-- domain: 4 | difficulty: medium | tags: gradient-accumulation -->

当GPU内存不足以容纳大batch时，可以使用什么技术？

- A. 减少模型大小
- B. 梯度累积(Gradient Accumulation)
- C. 减少数据量
- D. 使用CPU

**答案**: B

**解析**:
梯度累积：
- 多个小batch累积梯度
- 然后一次更新权重
- 等效于大batch训练
- 不增加内存需求

---

### Q27
<!-- domain: 4 | difficulty: hard | tags: focal-loss -->

Focal Loss主要用于解决什么问题？

- A. 过拟合
- B. 类别不平衡中的困难样本学习
- C. 梯度消失
- D. 学习率调整

**答案**: B

**解析**:
Focal Loss：
- 降低易分类样本的权重
- 关注困难样本
- 特别适合目标检测
- 解决极端类别不平衡

---

### Q28
<!-- domain: 5 | difficulty: medium | tags: logging -->

如何监控生产环境中ML模型的预测？

- A. 不需要监控
- B. 使用Cloud Logging记录预测，Cloud Monitoring设置警报
- C. 只看成本
- D. 手动检查

**答案**: B

**解析**:
生产监控：
- 记录预测输入/输出
- 监控延迟和错误率
- 设置异常警报
- 使用Model Monitoring检测漂移

---

### Q29
<!-- domain: 6 | difficulty: hard | tags: feature-pipeline -->

在生产ML系统中，特征管道应该如何设计？

- A. 每次手动计算
- B. 分离特征工程管道，确保训练和推理一致
- C. 只在训练时计算
- D. 使用静态特征

**答案**: B

**解析**:
特征管道设计：
- 独立的特征工程组件
- 版本控制
- 训练-推理一致性
- 使用Feature Store

---

### Q30
<!-- domain: 1 | difficulty: medium | tags: model-registry-governance -->

Vertex AI Model Registry如何支持模型治理？

- A. 不支持
- B. 版本控制、元数据跟踪、部署历史
- C. 只存储模型文件
- D. 只支持删除

**答案**: B

**解析**:
Model Registry治理功能：
- 模型版本管理
- 元数据和描述
- 血缘追踪
- 部署和评估历史

---

### Q31
<!-- domain: 2 | difficulty: medium | tags: data-catalog -->

如何在GCP中发现和管理ML项目使用的数据资产？

- A. 手动文档
- B. Data Catalog
- C. Cloud Storage列表
- D. 无法管理

**答案**: B

**解析**:
Data Catalog：
- 自动元数据发现
- 标签和分类
- 血缘追踪
- 搜索数据资产

---

### Q32
<!-- domain: 3 | difficulty: hard | tags: multi-task-learning -->

多任务学习(Multi-task Learning)的主要优势是什么？

- A. 减少数据量
- B. 共享表示，提高泛化能力
- C. 加速推理
- D. 减少参数

**答案**: B

**解析**:
多任务学习：
- 多个相关任务共享底层表示
- 隐式数据增强
- 正则化效果
- 知识迁移

---

### Q33
<!-- domain: 4 | difficulty: medium | tags: learning-curve -->

学习曲线(Learning Curve)分析可以帮助诊断什么？

- A. 网络问题
- B. 模型是否需要更多数据或正则化
- C. 成本问题
- D. 部署问题

**答案**: B

**解析**:
学习曲线分析：
- X轴：训练样本数
- Y轴：性能
- 高偏差：增加数据无帮助
- 高方差：增加数据有帮助

---

### Q34
<!-- domain: 5 | difficulty: hard | tags: inference-optimization -->

以下哪种技术专门用于优化推理性能？

- A. 增加训练轮次
- B. TensorRT优化
- C. 增加数据增强
- D. 更改损失函数

**答案**: B

**解析**:
TensorRT：
- NVIDIA推理优化器
- 层融合
- 精度校准
- 内核自动调优
- 显著提升推理速度

---

### Q35
<!-- domain: 6 | difficulty: medium | tags: experiment-tracking -->

在ML实验中，为什么实验跟踪很重要？

- A. 不重要
- B. 可复现性、比较不同运行、协作
- C. 只为了日志
- D. 只为了成本

**答案**: B

**解析**:
实验跟踪价值：
- 复现结果
- 比较超参数效果
- 团队协作
- 避免重复实验

---

### Q36
<!-- domain: 1 | difficulty: hard | tags: federated-learning -->

什么是联邦学习(Federated Learning)？

- A. 在一台机器上训练
- B. 在分散的设备上训练，不共享原始数据
- C. 使用联邦数据库
- D. 政府合作训练

**答案**: B

**解析**:
联邦学习：
- 数据保留在本地
- 只共享模型更新
- 隐私保护
- 适合手机、医疗等场景

---

### Q37
<!-- domain: 3 | difficulty: medium | tags: seq2seq -->

Seq2Seq模型的典型应用是什么？

- A. 图像分类
- B. 机器翻译
- C. 聚类
- D. 异常检测

**答案**: B

**解析**:
Seq2Seq应用：
- 机器翻译
- 文本摘要
- 对话生成
- 问答系统

---

### Q38
<!-- domain: 4 | difficulty: hard | tags: label-smoothing -->

标签平滑(Label Smoothing)如何帮助模型训练？

- A. 加速训练
- B. 防止模型过度自信，提高泛化
- C. 减少内存
- D. 减少数据量

**答案**: B

**解析**:
标签平滑：
- 软化one-hot标签
- 例如：[1,0,0] → [0.9,0.05,0.05]
- 正则化效果
- 改善校准

---

### Q39
<!-- domain: 5 | difficulty: medium | tags: rolling-update -->

什么是滚动更新(Rolling Update)部署策略？

- A. 一次替换所有实例
- B. 逐个实例更新，保持服务可用
- C. 创建新环境
- D. 手动更新

**答案**: B

**解析**:
滚动更新：
- 逐个替换实例
- 保持服务可用
- 无需额外资源
- 更新时间较长

---

### Q40
<!-- domain: 6 | difficulty: hard | tags: data-trigger -->

如何在新数据可用时自动触发ML管道？

- A. 手动触发
- B. 使用Cloud Functions监听GCS事件，触发管道
- C. 轮询检查
- D. 定时运行

**答案**: B

**解析**:
数据触发管道：
1. 数据上传到GCS
2. GCS触发Cloud Functions
3. Cloud Functions启动Vertex Pipeline
4. 自动处理新数据

---

### Q41
<!-- domain: 2 | difficulty: medium | tags: BigQuery-export -->

如何高效地将BigQuery数据导出到Vertex AI训练？

- A. CSV下载
- B. 使用BigQuery Storage API或直接引用
- C. 手动复制
- D. 使用SQL SELECT

**答案**: B

**解析**:
高效数据导出：
- BigQuery Storage API快速读取
- 直接从BigQuery读取到训练
- 导出为Parquet
- 避免本地下载

---

### Q42
<!-- domain: 3 | difficulty: medium | tags: contrastive-learning -->

对比学习(Contrastive Learning)的核心思想是什么？

- A. 对比模型大小
- B. 学习相似样本接近、不相似样本远离的表示
- C. 对比训练和测试
- D. 对比不同算法

**答案**: B

**解析**:
对比学习：
- 正样本对：拉近
- 负样本对：推远
- 自监督学习
- SimCLR、CLIP等

---

### Q43
<!-- domain: 4 | difficulty: medium | tags: calibration -->

什么是模型校准(Calibration)？为什么重要？

- A. 调整硬件
- B. 确保预测概率反映真实概率
- C. 校准传感器
- D. 调整学习率

**答案**: B

**解析**:
模型校准：
- 预测概率=真实概率
- 例如：预测90%应该有90%准确
- 对决策重要
- 使用温度缩放等方法

---

### Q44
<!-- domain: 5 | difficulty: hard | tags: multi-model-serving -->

如何在单个Vertex AI Endpoint上服务多个模型？

- A. 不可能
- B. 部署多个模型版本或使用路由逻辑
- C. 只能一个模型
- D. 创建多个端点

**答案**: B

**解析**:
多模型服务：
- 同一端点多个模型版本
- 流量分割
- 或自定义路由逻辑
- 减少端点数量

---

### Q45
<!-- domain: 6 | difficulty: medium | tags: pipeline-component -->

创建可重用的Vertex AI Pipeline组件时，最佳实践是什么？

- A. 硬编码所有参数
- B. 参数化输入/输出，使用容器化
- C. 只用Python脚本
- D. 每次创建新组件

**答案**: B

**解析**:
可重用组件设计：
- 参数化配置
- 清晰的输入/输出定义
- 容器化
- 版本控制
- 文档化

---

### Q46
<!-- domain: 1 | difficulty: medium | tags: TPU-pod -->

TPU Pod是什么？

- A. 单个TPU芯片
- B. 多个TPU设备连接，提供更大计算能力
- C. 虚拟机
- D. 存储设备

**答案**: B

**解析**:
TPU Pod：
- 多个TPU连接
- 高速互联
- 超大规模训练
- 用于LLM等大模型

---

### Q47
<!-- domain: 3 | difficulty: hard | tags: knowledge-distillation -->

知识蒸馏中，"教师模型"和"学生模型"的关系是什么？

- A. 完全相同
- B. 学生学习模仿教师的输出（软标签）
- C. 教师学习学生
- D. 无关系

**答案**: B

**解析**:
知识蒸馏：
- 教师：大型准确模型
- 学生：小型高效模型
- 学生学习教师的软标签
- 压缩模型同时保持性能

---

### Q48
<!-- domain: 4 | difficulty: medium | tags: checkpoint -->

为什么在训练期间保存检查点(Checkpoint)很重要？

- A. 减少存储
- B. 从中断恢复、保存最佳模型
- C. 加速训练
- D. 不重要

**答案**: B

**解析**:
检查点价值：
- 抢占式VM中断后恢复
- 保存最佳验证性能模型
- 避免重新训练
- 调试和分析

---

### Q49
<!-- domain: 5 | difficulty: medium | tags: Triton -->

NVIDIA Triton Inference Server的主要优势是什么？

- A. 训练模型
- B. 高性能多框架模型服务
- C. 数据存储
- D. 可视化

**答案**: B

**解析**:
Triton特点：
- 支持多框架（TensorFlow、PyTorch、ONNX）
- 动态批处理
- 模型集成
- GPU优化
- 与GKE集成

---

### Q50
<!-- domain: 6 | difficulty: hard | tags: A-B-testing-ML -->

在ML实验中进行A/B测试时，以下哪项是关键考虑因素？

- A. 只看点击率
- B. 统计显著性、样本大小、业务指标、外部因素
- C. 只看准确率
- D. 只看成本

**答案**: B

**解析**:
ML A/B测试考虑：
- 足够的样本大小
- 统计显著性检验
- 业务指标（不只是ML指标）
- 控制外部变量
- 运行足够长时间

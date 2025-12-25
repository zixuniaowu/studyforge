# Microsoft Azure AI Engineer Associate (AI-102) - Set 2

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
<!-- domain: 1 | difficulty: medium | tags: container, billing -->

一家公司在本地部署了Azure AI服务容器。容器需要什么才能正常运行？

- A. 完全离线运行，无需任何连接
- B. 需要连接到Azure进行计量计费
- C. 需要持续高速网络连接
- D. 需要本地GPU

**答案**: B

**解析**:
Azure AI容器：
- 可以离线处理数据
- 但必须定期连接Azure进行计费验证
- 通常每15分钟需要连接一次
- 断开连接后有宽限期

---

### Q2
<!-- domain: 1 | difficulty: medium | tags: key-rotation -->

一家公司想要定期轮换Azure AI服务的API密钥以提高安全性。最佳实践是什么？

- A. 同时更换两个密钥
- B. 使用Key1时轮换Key2，然后切换到Key2
- C. 每次都删除并重新创建资源
- D. 不需要轮换密钥

**答案**: B

**解析**:
密钥轮换最佳实践：
1. Azure AI服务有两个密钥(Key1, Key2)
2. 应用使用Key1时，重新生成Key2
3. 更新应用使用Key2
4. 重新生成Key1
5. 确保零停机时间

---

### Q3
<!-- domain: 1 | difficulty: hard | tags: cost-management -->

一家公司想要预测和控制Azure AI服务的成本。应该使用什么工具？

- A. Azure Monitor
- B. Azure Cost Management + Billing
- C. Azure Advisor
- D. Azure Policy

**答案**: B

**解析**:
Azure Cost Management：
- 成本分析和报告
- 预算设置和警报
- 成本预测
- 按资源/标签分析
- 优化建议

---

### Q4
<!-- domain: 2 | difficulty: medium | tags: Anomaly-Detector, multivariate -->

一家公司想要同时监控多个相关指标（如温度、压力、振动）来检测设备异常。应该使用Anomaly Detector的哪种模式？

- A. 单变量异常检测
- B. 多变量异常检测
- C. 批量检测
- D. 实时检测

**答案**: B

**解析**:
多变量异常检测：
- 同时分析多个时间序列
- 捕捉变量之间的相关性
- 检测复杂的异常模式
- 适合IoT和工业监控

---

### Q5
<!-- domain: 2 | difficulty: medium | tags: Personalizer, reward -->

在Azure Personalizer中，"reward"（奖励）的作用是什么？

- A. 支付API调用费用
- B. 告诉系统推荐是否成功，用于改进未来推荐
- C. 给用户的积分
- D. 模型的评估指标

**答案**: B

**解析**:
Personalizer强化学习流程：
1. Rank API：获取个性化推荐
2. 用户互动
3. Reward API：发送奖励分数（0-1）
4. 系统学习并优化模型

---

### Q6
<!-- domain: 3 | difficulty: medium | tags: Computer-Vision, smart-crop -->

一家公司想要为不同尺寸的设备生成图像的智能裁剪版本，保留最重要的内容。应该使用什么功能？

- A. 对象检测
- B. 智能裁剪 (Smart Crop)
- C. 图像分类
- D. OCR

**答案**: B

**解析**:
智能裁剪：
- 自动识别图像中的重要区域
- 生成不同纵横比的缩略图
- 保留主要主题和内容
- 适合响应式网页设计

---

### Q7
<!-- domain: 3 | difficulty: hard | tags: Custom-Vision, iteration -->

在Custom Vision中训练模型后，如何发布模型以供API调用？

- A. 模型自动发布
- B. 需要发布特定的训练迭代 (Iteration)
- C. 导出模型文件
- D. 创建新的资源

**答案**: B

**解析**:
Custom Vision工作流程：
1. 上传和标记图像
2. 训练模型（创建迭代）
3. 评估性能
4. 发布迭代（指定名称）
5. 使用预测API调用已发布的迭代

---

### Q8
<!-- domain: 3 | difficulty: medium | tags: Face-API, LargePersonGroup -->

一家公司需要在超过10000人的数据库中进行人脸识别。应该使用什么？

- A. Person Group
- B. Large Person Group
- C. Face List
- D. Large Face List

**答案**: B

**解析**:
Face API容器类型：
- Person Group：最多10,000人
- Large Person Group：最多1,000,000人
- Face List：最多1,000张人脸
- Large Face List：最多1,000,000张人脸

---

### Q9
<!-- domain: 3 | difficulty: medium | tags: Face-API, attributes -->

使用Face API检测人脸时，以下哪些属性可以被检测到？

- A. 只有人脸位置
- B. 人脸位置、年龄估计、情绪、头部姿态
- C. 只有人脸和姓名
- D. 只有情绪

**答案**: B

**解析**:
Face API检测的属性：
- 人脸边界框
- 面部特征点(landmarks)
- 年龄估计
- 情绪
- 性别
- 头部姿态
- 眼镜、模糊度、遮挡等

---

### Q10
<!-- domain: 3 | difficulty: hard | tags: Video-Indexer, custom-model -->

一家公司使用Video Indexer，想要识别视频中的自定义人物（如公司高管）。应该如何配置？

- A. 使用默认的名人识别
- B. 创建自定义人员模型并上传人脸
- C. 使用Computer Vision
- D. 无法识别自定义人物

**答案**: B

**解析**:
Video Indexer自定义模型：
- 人员模型：添加自定义人员和人脸
- 品牌模型：添加自定义品牌词汇
- 语言模型：添加领域特定词汇
- 这些模型可用于特定账户的所有视频

---

### Q11
<!-- domain: 4 | difficulty: medium | tags: Language-Service, custom-NER -->

一家法律公司想要从合同中提取自定义实体（如合同编号、当事方名称）。应该使用什么？

- A. 预构建NER
- B. 自定义命名实体识别 (Custom NER)
- C. 情感分析
- D. 关键词提取

**答案**: B

**解析**:
自定义NER：
- 训练识别领域特定的实体
- 需要标注训练数据
- 与预构建NER结合使用
- 适合法律、医疗、金融等专业领域

---

### Q12
<!-- domain: 4 | difficulty: medium | tags: CLU, prebuilt-domains -->

在创建CLU应用时，如何快速添加常见的意图和实体？

- A. 手动创建所有内容
- B. 使用预构建领域 (Prebuilt Domains)
- C. 从LUIS迁移
- D. 使用模板

**答案**: B

**解析**:
预构建领域提供现成的意图和实体：
- Calendar（日历操作）
- Communication（通信）
- Places（地点搜索）
- Utilities（常用操作）
- 可直接添加并自定义

---

### Q13
<!-- domain: 4 | difficulty: hard | tags: CLU, machine-learned-entity -->

在CLU中，什么类型的实体可以从上下文学习识别，即使没有确切匹配？

- A. 列表实体 (List Entity)
- B. 机器学习实体 (Machine Learned Entity)
- C. 正则表达式实体
- D. 预构建实体

**答案**: B

**解析**:
实体类型比较：
- 机器学习实体：从上下文学习，灵活识别
- 列表实体：精确匹配预定义的词汇
- 正则表达式实体：模式匹配
- 预构建实体：日期、数字等标准类型

---

### Q14
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, custom-speech -->

一家医疗公司发现语音识别对医学术语准确率低。如何改进？

- A. 提高音频质量
- B. 训练自定义语音模型
- C. 使用更慢的语速
- D. 更换语言

**答案**: B

**解析**:
自定义语音模型训练：
1. 准备音频+文本转录
2. 或只提供文本数据（领域词汇）
3. 训练适应特定领域
4. 部署自定义端点
5. 与标准模型比较改进

---

### Q15
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, SSML -->

一家公司想要控制文本转语音的发音、停顿和语调。应该使用什么？

- A. 纯文本输入
- B. SSML (Speech Synthesis Markup Language)
- C. 自定义语音
- D. 音频后处理

**答案**: B

**解析**:
SSML功能：
- `<break>`：添加停顿
- `<prosody>`：控制语速、音调、音量
- `<say-as>`：控制发音方式（日期、数字）
- `<phoneme>`：自定义发音
- `<emphasis>`：强调

---

### Q16
<!-- domain: 4 | difficulty: medium | tags: Translator, custom-translator -->

一家公司想要翻译包含大量行业术语的文档，确保术语翻译一致。应该使用什么？

- A. 标准翻译API
- B. 自定义翻译器 (Custom Translator)
- C. 词典API
- D. 音译

**答案**: B

**解析**:
自定义翻译器：
- 上传双语训练文档
- 学习领域特定翻译
- 保持术语一致性
- 与标准翻译结合使用

---

### Q17
<!-- domain: 4 | difficulty: easy | tags: Translator, document -->

一家公司想要翻译整个Word文档并保持格式。应该使用什么功能？

- A. 文本翻译API
- B. 文档翻译
- C. 批量翻译
- D. 字典查询

**答案**: B

**解析**:
文档翻译：
- 支持Word、PDF、Excel等格式
- 保持原始格式和布局
- 支持多种语言
- 异步处理大文档

---

### Q18
<!-- domain: 4 | difficulty: medium | tags: Bot-Framework, adaptive-cards -->

一家公司想要在聊天机器人中显示丰富的交互式内容（如按钮、图片、表单）。应该使用什么？

- A. 纯文本消息
- B. 自适应卡片 (Adaptive Cards)
- C. HTML页面
- D. 图像附件

**答案**: B

**解析**:
自适应卡片：
- 跨平台的UI框架
- 支持文本、图像、按钮、输入
- JSON格式定义
- 适用于Teams、Web Chat等

---

### Q19
<!-- domain: 4 | difficulty: hard | tags: Bot-Framework, dialog -->

在Bot Framework中，如何实现多轮对话来收集用户信息？

- A. 单次消息处理
- B. 使用对话框 (Dialogs) 和瀑布流 (Waterfall)
- C. 使用多个机器人
- D. 存储在数据库中

**答案**: B

**解析**:
对话框和瀑布流：
- Waterfall Dialog：按步骤收集信息
- Prompt Dialogs：文本、数字、日期等输入
- 对话状态管理
- 支持嵌套和分支

---

### Q20
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, composed-model -->

一家公司有多种不同格式的表单（如发票、收据、申请表）。如何用一个API处理所有类型？

- A. 为每种类型创建独立端点
- B. 使用组合模型 (Composed Model)
- C. 使用通用OCR
- D. 手动分类后处理

**答案**: B

**解析**:
组合模型：
- 将多个自定义模型组合
- 自动识别表单类型
- 路由到正确的子模型
- 统一的API调用

---

### Q21
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, layout -->

一家公司只需要从文档中提取表格和文本结构，不需要理解内容语义。应该使用什么？

- A. 预构建模型
- B. 布局API (Layout)
- C. 自定义模型
- D. 通用文档模型

**答案**: B

**解析**:
布局API提取：
- 文本和位置
- 表格结构
- 选择标记（复选框）
- 段落和标题
- 不识别特定字段的语义

---

### Q22
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, custom-skill -->

一家公司想要在Azure AI Search索引过程中调用自定义的ML模型。应该如何实现？

- A. 修改索引器代码
- B. 创建自定义技能 (Custom Skill) 连接到Azure Function
- C. 使用内置技能
- D. 后处理索引数据

**答案**: B

**解析**:
自定义技能：
- 实现Web API接口
- 通常托管在Azure Functions
- 接收文档内容，返回增强数据
- 在技能集中配置
- 可调用任何外部服务

---

### Q23
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, facets -->

一家公司想要在搜索结果中提供分类筛选（如按类别、日期范围过滤）。应该使用什么？

- A. 全文搜索
- B. 分面导航 (Faceted Navigation)
- C. 同义词
- D. 评分配置文件

**答案**: B

**解析**:
分面导航：
- 在索引字段上启用facetable
- 搜索时请求facets
- 返回每个值的计数
- 用于构建筛选器UI

---

### Q24
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, scoring -->

一家公司想要让较新的文档在搜索结果中排名更高。应该配置什么？

- A. 索引器调度
- B. 评分配置文件 (Scoring Profile) 使用freshness函数
- C. 增加索引分区
- D. 使用不同的分析器

**答案**: B

**解析**:
评分配置文件支持：
- Freshness：基于日期的加权
- Magnitude：基于数值范围的加权
- Distance：基于地理位置的加权
- Tag：基于标签匹配的加权

---

### Q25
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, quota -->

一家公司发现Azure OpenAI API调用经常被限流。应该如何解决？

- A. 降低模型版本
- B. 申请增加配额或使用Provisioned Throughput
- C. 减少提示长度
- D. 更换区域

**答案**: B

**解析**:
解决限流：
- 查看当前配额和使用情况
- 在Azure Portal申请增加配额
- 使用Provisioned Throughput获得专用容量
- 实现指数退避重试
- 优化请求批处理

---

### Q26
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, token-limit -->

用户报告Azure OpenAI返回的回答被截断。最可能的原因是什么？

- A. 网络超时
- B. 响应超过了max_tokens限制
- C. 模型故障
- D. 账户问题

**答案**: B

**解析**:
Token限制问题：
- max_tokens控制生成的最大长度
- 如果设置太小，回答会被截断
- 上下文窗口 = 输入tokens + 输出tokens
- 需要根据需求调整max_tokens

---

### Q27
<!-- domain: 6 | difficulty: medium | tags: prompt-engineering, few-shot -->

什么是"Few-shot prompting"？

- A. 使用很少的API调用
- B. 在提示中提供少量示例来指导模型输出
- C. 训练小型模型
- D. 限制输出长度

**答案**: B

**解析**:
Few-shot prompting示例：
```
将英文翻译成法文：
English: Hello -> French: Bonjour
English: Goodbye -> French: Au revoir
English: Thank you -> French:
```
模型根据示例模式完成输出。

---

### Q28
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, on-your-data -->

一家公司想要让Azure OpenAI基于自己的文档回答问题。最简单的方法是什么？

- A. 微调模型
- B. 使用Azure OpenAI on your data
- C. 重新训练模型
- D. 手动复制文档到提示

**答案**: B

**解析**:
Azure OpenAI on your data：
- 连接到Azure AI Search索引
- 或上传文档到Azure Blob
- 自动实现RAG
- 无需编写检索代码
- 在Azure OpenAI Studio配置

---

### Q29
<!-- domain: 1 | difficulty: medium | tags: diagnostic, metrics -->

以下哪些指标可以通过Azure Monitor监控Azure AI服务？

- A. 只有调用次数
- B. 调用次数、延迟、错误率、成功率
- C. 只有成本
- D. 只有错误

**答案**: B

**解析**:
Azure AI服务监控指标：
- Total Calls：总调用次数
- Successful Calls：成功调用
- Total Errors：错误数
- Latency：响应时间
- Data In/Out：数据传输量

---

### Q30
<!-- domain: 3 | difficulty: medium | tags: Computer-Vision, dense-captions -->

一家公司想要获取图像中每个检测到的对象的详细描述。应该使用什么功能？

- A. 标签 (Tags)
- B. 密集标题 (Dense Captions)
- C. 对象检测
- D. 品牌检测

**答案**: B

**解析**:
Dense Captions（Image Analysis 4.0）：
- 为图像中的每个区域生成描述
- 不只是整体描述
- 包含边界框
- 更详细的图像理解

---

### Q31
<!-- domain: 4 | difficulty: medium | tags: Language-Service, opinion-mining -->

一家公司想要分析评论中用户对具体方面（如服务、价格、质量）的看法。应该使用什么？

- A. 整体情感分析
- B. 观点挖掘 (Opinion Mining)
- C. 关键词提取
- D. 实体识别

**答案**: B

**解析**:
观点挖掘：
- 识别评论中的方面（aspect）
- 提取对每个方面的观点
- 分析每个观点的情感
- 例如："服务很好（正面），但价格太贵（负面）"

---

### Q32
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, speaker-recognition -->

一家公司想要使用语音来验证用户身份。应该使用Speech Service的什么功能？

- A. 语音转文本
- B. 说话人识别 (Speaker Recognition)
- C. 关键词识别
- D. 发音评估

**答案**: B

**解析**:
说话人识别：
- 验证模式：确认是否为特定人（1:1）
- 识别模式：识别是哪个人（1:N）
- 基于语音特征
- 需要先注册语音样本

---

### Q33
<!-- domain: 4 | difficulty: hard | tags: Bot-Framework, skill -->

一家公司有多个Bot，想要让一个主Bot调用其他专业Bot的功能。应该使用什么？

- A. 多个端点
- B. Bot Framework Skills
- C. 复制代码
- D. 数据库共享

**答案**: B

**解析**:
Bot Framework Skills：
- 将Bot能力封装为可重用的技能
- 主Bot可以调用技能Bot
- 技能可以独立开发和部署
- 通过Skill Manifest描述能力

---

### Q34
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, confidence -->

在使用Azure AI Document Intelligence时，如何判断提取结果的可靠性？

- A. 检查文档页数
- B. 查看每个字段的置信度分数
- C. 检查处理时间
- D. 查看文件大小

**答案**: B

**解析**:
置信度分数：
- 每个提取字段都有0-1的置信度
- 低置信度需要人工审核
- 可设置阈值自动标记
- 用于构建人机协作流程

---

### Q35
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, incremental -->

一家公司的Azure AI Search索引需要处理大量文档，想要只重新处理已更改的文档。应该使用什么？

- A. 每次完全重建索引
- B. 增量索引 (Change Detection)
- C. 手动跟踪更改
- D. 使用更多分区

**答案**: B

**解析**:
增量索引：
- 高水位标记策略：基于时间戳列
- 软删除策略：基于标记列
- 自动检测更改
- 只处理新增/修改的文档

---

### Q36
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, chat-history -->

在构建多轮对话应用时，如何让Azure OpenAI"记住"之前的对话？

- A. 模型自动记住
- B. 将之前的消息包含在messages数组中
- C. 使用数据库存储
- D. 使用更大的模型

**答案**: B

**解析**:
Chat Completion API对话管理：
```json
{
  "messages": [
    {"role": "system", "content": "你是助手"},
    {"role": "user", "content": "你好"},
    {"role": "assistant", "content": "你好！"},
    {"role": "user", "content": "继续我们的对话"}
  ]
}
```
需要应用管理对话历史。

---

### Q37
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, json-mode -->

一家公司想要确保Azure OpenAI始终返回有效的JSON格式。应该使用什么？

- A. 在提示中说明
- B. 使用JSON Mode或Structured Outputs
- C. 后处理解析
- D. 使用正则表达式

**答案**: B

**解析**:
JSON Mode：
- 设置response_format为json_object
- 模型保证输出有效JSON
- 减少解析错误
- 仍需在提示中说明JSON结构

---

### Q38
<!-- domain: 1 | difficulty: medium | tags: network, firewall -->

一家公司想要限制只有特定IP地址可以访问Azure AI服务。应该配置什么？

- A. Azure RBAC
- B. 网络防火墙和IP规则
- C. 托管标识
- D. API版本

**答案**: B

**解析**:
网络安全配置：
- 启用防火墙
- 添加允许的IP范围
- 或允许特定虚拟网络
- 也可以完全禁用公共访问

---

### Q39
<!-- domain: 3 | difficulty: medium | tags: Custom-Vision, performance -->

Custom Vision模型的"精确率"和"召回率"分别代表什么？

- A. 训练速度和推理速度
- B. 精确率：预测正确的比例；召回率：实际正类被正确识别的比例
- C. 模型大小和准确度
- D. 训练数据量和测试数据量

**答案**: B

**解析**:
评估指标：
- 精确率(Precision)：预测为正的样本中真正为正的比例
- 召回率(Recall)：实际为正的样本中被正确预测的比例
- 需要根据应用场景权衡（如医疗诊断重视召回率）

---

### Q40
<!-- domain: 4 | difficulty: medium | tags: Language-Service, text-classification -->

一家公司想要自动将客户邮件分类到不同部门（销售、支持、投诉）。应该使用什么？

- A. 情感分析
- B. 自定义文本分类
- C. 实体识别
- D. 问答

**答案**: B

**解析**:
自定义文本分类：
- 单标签分类：每个文档一个类别
- 多标签分类：每个文档可多个类别
- 需要训练数据
- 适合自动化文档路由

---

### Q41
<!-- domain: 4 | difficulty: hard | tags: Speech-Service, pronunciation -->

一家语言学习应用想要评估用户的发音准确性。应该使用什么功能？

- A. 语音转文本
- B. 发音评估 (Pronunciation Assessment)
- C. 说话人识别
- D. 语音翻译

**答案**: B

**解析**:
发音评估提供：
- 准确度分数
- 流畅度分数
- 完整度分数
- 单词级别反馈
- 适合语言学习应用

---

### Q42
<!-- domain: 5 | difficulty: medium | tags: Form-Recognizer, add-on -->

一家公司想要从文档中提取条形码和二维码。应该使用什么功能？

- A. 布局API
- B. 附加功能 (Add-on) - 条形码
- C. 自定义模型
- D. OCR

**答案**: B

**解析**:
Document Intelligence附加功能：
- 条形码：支持多种格式
- 公式：数学公式提取
- 字体样式：检测手写/打印
- 高分辨率：大文档支持
- 查询字段：预定义问题

---

### Q43
<!-- domain: 5 | difficulty: hard | tags: Cognitive-Search, vector -->

一家公司想要在Azure AI Search中实现语义搜索，使用向量相似性查找相关文档。应该如何配置？

- A. 只使用全文搜索
- B. 配置向量搜索和嵌入模型
- C. 使用更多同义词
- D. 增加索引分区

**答案**: B

**解析**:
向量搜索配置：
1. 索引字段类型设为Collection(Edm.Single)
2. 配置向量搜索算法（HNSW或exhaustive）
3. 使用嵌入模型（如Azure OpenAI）生成向量
4. 执行向量搜索查询
5. 可与全文搜索混合使用

---

### Q44
<!-- domain: 6 | difficulty: medium | tags: Azure-OpenAI, vision -->

一家公司想要使用Azure OpenAI分析图像内容。应该使用什么模型？

- A. GPT-3.5 Turbo
- B. GPT-4o或GPT-4 Turbo with Vision
- C. DALL-E
- D. Whisper

**答案**: B

**解析**:
多模态模型：
- GPT-4o：原生多模态，支持图像和文本
- GPT-4 Turbo with Vision：支持图像输入
- 可以描述、分析、理解图像
- 支持多图像输入

---

### Q45
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, assistants -->

Azure OpenAI Assistants API与Chat Completion API的主要区别是什么？

- A. 没有区别
- B. Assistants管理对话状态、支持工具、持久化消息
- C. Assistants更便宜
- D. Assistants更快

**答案**: B

**解析**:
Assistants API特点：
- 服务端对话状态管理
- 内置工具（Code Interpreter、File Search）
- 线程和消息持久化
- 函数调用支持
- 更适合复杂的助手应用

---

### Q46
<!-- domain: 1 | difficulty: medium | tags: governance, logging -->

一家公司需要记录所有Azure OpenAI API调用的完整输入和输出以进行合规审计。应该如何配置？

- A. 使用应用日志
- B. 启用内容日志记录到存储账户
- C. 使用Azure Monitor
- D. 手动记录

**答案**: B

**解析**:
Azure OpenAI诊断设置：
- 可记录请求和响应内容
- 发送到Azure Blob Storage
- 或发送到Log Analytics
- 需要注意隐私和成本

---

### Q47
<!-- domain: 3 | difficulty: medium | tags: Vision, background-removal -->

一家电商公司想要自动移除产品图片的背景。应该使用什么功能？

- A. 对象检测
- B. 背景移除 (Background Removal)
- C. 图像分类
- D. 智能裁剪

**答案**: B

**解析**:
Image Analysis 4.0背景移除：
- 分离前景和背景
- 返回带透明背景的图像
- 或返回前景遮罩
- 适合产品图片处理

---

### Q48
<!-- domain: 4 | difficulty: medium | tags: Speech-Service, batch -->

一家公司有大量录音需要转录，但不需要实时结果。应该使用什么？

- A. 实时语音转文本
- B. 批量转录 (Batch Transcription)
- C. 自定义语音
- D. 说话人分离

**答案**: B

**解析**:
批量转录：
- 处理存储在Blob中的音频
- 异步处理
- 支持大文件
- 成本比实时更低
- 适合离线处理场景

---

### Q49
<!-- domain: 5 | difficulty: medium | tags: Cognitive-Search, synonym -->

一家公司想要让搜索"汽车"也能找到包含"轿车"、"车辆"的文档。应该配置什么？

- A. 分面筛选
- B. 同义词映射 (Synonym Map)
- C. 评分配置文件
- D. 建议器

**答案**: B

**解析**:
同义词映射：
- 定义等价词汇
- 格式：汽车, 轿车, 车辆 => 汽车
- 在索引器中应用
- 提高搜索召回率

---

### Q50
<!-- domain: 6 | difficulty: hard | tags: Azure-OpenAI, DALL-E -->

使用Azure OpenAI DALL-E生成图像时，以下哪项是最佳实践？

- A. 使用尽可能短的提示
- B. 提供详细、描述性的提示，包括风格、主题、细节
- C. 只使用英文
- D. 每次只生成一张图像

**答案**: B

**解析**:
DALL-E提示最佳实践：
- 详细描述场景、风格、颜色
- 指定艺术风格（如"油画风格"、"写实照片"）
- 说明构图和视角
- 避免模糊的描述
- 可以参考艺术家风格（公开领域）

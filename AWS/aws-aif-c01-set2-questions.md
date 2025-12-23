# AWS Certified AI Practitioner (AIF-C01) 自测题 - 第二套

> 📝 共50题 | ⏱️ 建议时间：75分钟 | 🎯 目标：70%以上
> 
> 完成第一套后，用这套继续练习

---

## Domain 1: Fundamentals of AI and ML (10题)

### Q1
一家研究实验室发现他们的模型在训练数据上准确率很高，但在测试数据上准确率很低。这种情况最可能的原因是什么？

A. 训练时间不够  
B. 过拟合 (Overfitting)  
C. 学习率太低  
D. 特征数量不足  

---

### Q2
一家公司想要根据历史销售数据预测未来产品需求。这属于哪种类型的机器学习问题？

A. 分类  
B. 聚类  
C. 回归  
D. 强化学习  

---

### Q3
以下哪种算法最适合检测信用卡欺诈交易（正常交易远多于欺诈交易）？

A. 线性回归  
B. K-means聚类  
C. 异常检测 (Anomaly Detection)  
D. 简单决策树  

---

### Q4
一家公司使用Amazon SageMaker进行ML模型开发。团队需要一个解决方案来存储和跨团队共享特征集。应该使用哪个SageMaker功能？

A. Amazon SageMaker Data Wrangler  
B. Amazon SageMaker Feature Store  
C. Amazon SageMaker Clarify  
D. Amazon SageMaker Model Registry  

---

### Q5
在训练神经网络时，"梯度消失 (Vanishing Gradient)"问题最常发生在什么情况下？

A. 网络层数太少  
B. 网络层数太多  
C. 学习率太高  
D. 批量大小太大  

---

### Q6
以下哪个指标最适合评估类别不平衡数据集上的分类模型？

A. 准确率 (Accuracy)  
B. F1分数 (F1 Score)  
C. 均方误差 (MSE)  
D. R²分数  

---

### Q7
一家公司想要预测客户是否会在未来30天内流失。这是什么类型的问题？

A. 回归问题  
B. 二分类问题  
C. 多分类问题  
D. 聚类问题  

---

### Q8
什么是"特征缩放 (Feature Scaling)"的主要目的？

A. 减少特征数量  
B. 使不同尺度的特征具有可比性  
C. 增加模型复杂度  
D. 加快数据收集速度  

---

### Q9
一个ML模型的精确率 (Precision) 为90%，召回率 (Recall) 为60%。这意味着什么？

A. 模型很少产生假阳性，但会遗漏很多真阳性  
B. 模型很少遗漏真阳性，但会产生很多假阳性  
C. 模型在所有方面都表现很好  
D. 模型需要更多训练数据  

---

### Q10
以下哪种方法可以帮助选择最重要的特征？

A. 数据增强  
B. 特征重要性分析  
C. 增加训练轮次  
D. 减少批量大小  

---

## Domain 2: Fundamentals of Generative AI (12题)

### Q11
一家公司想要使用LLM生成营销文案。为了使输出更加多样化和有创意，应该如何调整参数？

A. 降低temperature  
B. 增加temperature  
C. 减少max_tokens  
D. 增加top_k到1  

---

### Q12
什么是"Embedding"在NLP中的含义？

A. 将模型部署到生产环境  
B. 将文本转换为数值向量表示  
C. 压缩模型大小  
D. 加密敏感数据  

---

### Q13
一家公司想要让LLM基于公司内部文档回答问题，而不需要重新训练模型。最适合的技术是什么？

A. 从头训练新模型  
B. Fine-tuning  
C. RAG (检索增强生成)  
D. 增加模型参数  

---

### Q14
在Amazon Bedrock中，哪种定价模式最适合有限预算且不需要长期承诺的公司？

A. On-Demand (按需)  
B. Provisioned Throughput (预置吞吐量)  
C. Model Customization  
D. Reserved Capacity  

---

### Q15
以下哪项不是大语言模型的常见局限性？

A. 可能产生幻觉  
B. 知识有截止日期  
C. 无法处理文本输入  
D. 可能产生有偏见的输出  

---

### Q16
什么是"Zero-shot Learning"？

A. 模型不需要任何训练  
B. 模型在没有特定任务示例的情况下执行任务  
C. 模型只能执行一种任务  
D. 模型训练时不使用GPU  

---

### Q17
一家转录公司想要评估Amazon Bedrock上部署的基础模型的文本生成性能。应该使用哪种评估指标？

A. BLEU分数  
B. 均方误差  
C. R²分数  
D. 准确率  

---

### Q18
什么是"Prompt Injection"攻击？

A. 向模型注入新的训练数据  
B. 恶意用户通过特殊提示绕过模型的安全限制  
C. 提高模型推理速度的技术  
D. 一种模型压缩方法  

---

### Q19
以下哪种模型类型最适合生成图像？

A. BERT  
B. GPT  
C. Diffusion模型  
D. LSTM  

---

### Q20
什么是"多模态模型 (Multi-modal Model)"？

A. 只能处理文本的模型  
B. 可以处理多种类型输入（如文本、图像）的模型  
C. 有多个输出层的模型  
D. 部署在多个区域的模型  

---

### Q21
一家公司使用Amazon Bedrock，想要追踪所有模型调用以进行审计。应该启用什么功能？

A. Amazon CloudWatch Metrics  
B. Model Invocation Logging  
C. AWS X-Ray  
D. Amazon Inspector  

---

### Q22
什么是"Semantic Search"与传统关键词搜索的主要区别？

A. 更快的搜索速度  
B. 理解查询的含义而不仅仅是匹配关键词  
C. 支持更多语言  
D. 更低的成本  

---

## Domain 3: Applications of Foundation Models (14题)

### Q23
一家国际航空公司想要使用预训练的生成式AI模型为营销材料生成背景图像。公司没有ML专业知识，也不想托管模型。应该使用哪个服务？

A. Amazon SageMaker  
B. Amazon Bedrock  
C. Amazon EC2  
D. AWS Lambda  

---

### Q24
一家媒体公司想要分析观众行为并提供个性化内容推荐。公司还想监控模型质量是否随时间漂移。应该使用哪个AWS服务或功能？

A. Amazon Rekognition  
B. Amazon SageMaker Clarify  
C. Amazon Comprehend  
D. Amazon SageMaker Model Monitor  

---

### Q25
一家艺术拍卖公司使用Amazon SageMaker进行ML模型开发。公司想要为模型创建信息记录，包括预期用途、风险评级、训练细节和评估结果。应该使用什么功能？

A. SageMaker Experiments  
B. SageMaker Model Cards  
C. SageMaker Debugger  
D. SageMaker Pipelines  

---

### Q26
一家银行想要使用开源基础模型评估信贷合同是否符合合规规则，以减少人工审计工作。哪种方法最合适？

A. 使用Amazon Rekognition  
B. 使用SageMaker JumpStart配合RAG  
C. 使用Amazon Translate  
D. 使用Amazon Polly  

---

### Q27
一家公司想要创建一个内部知识AI助手，能够基于公司的PDF文档、CSV文件和提取的图像文本回答问题。哪种解决方案最合适且运营开销最小？

A. 使用SageMaker训练自定义模型  
B. 使用Amazon Bedrock Knowledge Bases  
C. 使用Amazon Comprehend  
D. 使用Amazon Rekognition  

---

### Q28
使用Amazon Bedrock进行情感分析时，什么因素决定了单个提示中可以容纳多少信息？

A. 模型的参数数量  
B. 上下文窗口 (Context Window)  
C. 模型的训练数据量  
D. AWS区域  

---

### Q29
一家医疗公司正在为诊断目的定制基础模型。公司需要模型透明且可解释以满足监管要求。应该使用哪个解决方案？

A. 使用Amazon Inspector配置安全合规  
B. 使用Amazon SageMaker Clarify生成报告和解释  
C. 使用Amazon Macie加密训练数据  
D. 使用Amazon Rekognition添加自定义标签  

---

### Q30
一家公司想要在Amazon Bedrock上部署对话式聊天机器人，需要符合多个监管框架。以下哪些是AWS可以帮助证明合规的能力？（选择最佳答案）

A. AWS Artifact提供合规报告和文档  
B. Amazon Rekognition提供合规认证  
C. AWS无法帮助合规  
D. 只能通过第三方审计  

---

### Q31
一家公司想要使用基础模型，但需要确保数据不会离开公司的VPC。应该使用什么配置？

A. 公共端点  
B. PrivateLink / VPC端点  
C. 互联网网关  
D. NAT网关  

---

### Q32
AI从业者在Amazon Bedrock上用包含机密数据的训练数据集训练了自定义模型。如何确保模型不会基于机密数据生成推理响应？

A. 删除模型，从训练数据集中删除机密数据，重新训练  
B. 使用动态数据屏蔽掩盖推理响应中的机密数据  
C. 使用SageMaker加密推理响应中的机密数据  
D. 使用AWS KMS加密模型中的机密数据  

---

### Q33
一家公司想要使用Amazon Polly将文本转换为语音。以下哪项是Amazon Polly的正确用途？

A. 语音转文本  
B. 文本转语音  
C. 情感分析  
D. 图像识别  

---

### Q34
Amazon SageMaker Canvas 的主要目标用户是谁？

A. 深度学习研究人员  
B. 没有编码经验的业务分析师  
C. DevOps工程师  
D. 数据库管理员  

---

### Q35
一家公司想要检测视频中的不当内容。应该使用哪个AWS服务？

A. Amazon Transcribe  
B. Amazon Rekognition Content Moderation  
C. Amazon Comprehend  
D. Amazon Textract  

---

### Q36
Amazon SageMaker JumpStart 的主要优势是什么？

A. 提供无限的计算资源  
B. 提供预构建的解决方案和预训练模型，可快速启动ML项目  
C. 自动编写所有代码  
D. 免费使用所有功能  

---

## Domain 4: Guidelines for Responsible AI (7题)

### Q37
一家公司在开发用于招聘的AI系统。以下哪项最能体现负责任AI的"公平性"原则？

A. 使模型运行更快  
B. 评估不同人群受到的影响是否相同  
C. 降低模型成本  
D. 增加模型准确率  

---

### Q38
以下哪种做法有助于提高AI系统的透明度？

A. 使用更复杂的模型  
B. 提供模型决策的解释和文档  
C. 增加训练数据量  
D. 使用更多GPU  

---

### Q39
一家公司发现其AI模型对某些地理区域的用户表现较差。这可能是什么类型的偏见？

A. 历史偏见  
B. 采样偏见  
C. 确认偏见  
D. 算法偏见  

---

### Q40
使用Amazon Bedrock时，如何防止模型生成有害或不当内容？

A. 使用更大的模型  
B. 配置Bedrock Guardrails  
C. 增加temperature  
D. 使用更多训练数据  

---

### Q41
以下哪项是AI可解释性 (Explainability) 的主要目的？

A. 提高模型准确率  
B. 让用户和利益相关者理解模型如何做出决策  
C. 减少模型训练时间  
D. 降低计算成本  

---

### Q42
一家金融公司使用AI进行贷款审批。监管机构要求公司能够解释每个拒绝决定。应该使用什么？

A. 更复杂的深度学习模型  
B. 可解释的ML模型或解释工具（如SHAP）  
C. 更多的训练数据  
D. 更快的推理速度  

---

### Q43
在负责任AI中，"问责制 (Accountability)"意味着什么？

A. 模型运行得更快  
B. 明确AI系统决策的责任归属  
C. 使用更少的计算资源  
D. 模型输出更准确  

---

## Domain 5: Security, Compliance, and Governance (7题)

### Q44
一家公司想要确保其Amazon Bedrock应用程序符合GDPR要求。以下哪项是必要的？

A. 使用最大的模型  
B. 实施数据保护措施，包括数据最小化和用户同意  
C. 使用免费层  
D. 部署在所有AWS区域  

---

### Q45
AWS Artifact 的主要用途是什么？

A. 存储训练数据  
B. 提供AWS合规报告和安全文档  
C. 训练ML模型  
D. 监控模型性能  

---

### Q46
一家公司想要限制特定用户只能访问某些Amazon Bedrock模型。应该使用什么？

A. Amazon S3 bucket策略  
B. AWS IAM策略  
C. Amazon VPC  
D. AWS CloudFormation  

---

### Q47
以下哪项最能保护传输中的数据？

A. AWS KMS  
B. TLS/SSL加密  
C. Amazon S3加密  
D. AWS Secrets Manager  

---

### Q48
一家公司使用敏感的客户数据训练ML模型。为了数据治理，应该首先做什么？

A. 立即开始训练  
B. 对数据进行分类和标记敏感级别  
C. 使用最大的模型  
D. 部署到生产环境  

---

### Q49
Amazon Inspector 在AI/ML环境中的作用是什么？

A. 训练模型  
B. 扫描工作负载以发现安全漏洞  
C. 存储数据  
D. 生成报告  

---

### Q50
一家公司需要证明其AI系统符合SOC 2标准。应该使用什么资源？

A. Amazon SageMaker  
B. AWS Artifact获取合规报告  
C. Amazon Bedrock  
D. AWS Lambda  

---

## 📊 答题卡

| 题号 | 你的答案 | 题号 | 你的答案 | 题号 | 你的答案 |
|:----:|:--------:|:----:|:--------:|:----:|:--------:|
| Q1  |          | Q18 |          | Q35 |          |
| Q2  |          | Q19 |          | Q36 |          |
| Q3  |          | Q20 |          | Q37 |          |
| Q4  |          | Q21 |          | Q38 |          |
| Q5  |          | Q22 |          | Q39 |          |
| Q6  |          | Q23 |          | Q40 |          |
| Q7  |          | Q24 |          | Q41 |          |
| Q8  |          | Q25 |          | Q42 |          |
| Q9  |          | Q26 |          | Q43 |          |
| Q10 |          | Q27 |          | Q44 |          |
| Q11 |          | Q28 |          | Q45 |          |
| Q12 |          | Q29 |          | Q46 |          |
| Q13 |          | Q30 |          | Q47 |          |
| Q14 |          | Q31 |          | Q48 |          |
| Q15 |          | Q32 |          | Q49 |          |
| Q16 |          | Q33 |          | Q50 |          |
| Q17 |          | Q34 |          |     |          |

---

*做完后请查看第二套答案解析！*

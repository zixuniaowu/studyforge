# AI 云平台与服务

## 云服务商 AI 平台

### AWS AI/ML 服务
**官方网站**: [aws.amazon.com/machine-learning](https://aws.amazon.com/machine-learning/)

**核心服务：**

| 服务 | 用途 |
|------|------|
| Amazon SageMaker | 端到端 ML 平台 |
| Amazon Bedrock | 托管 LLM 服务 |
| Amazon Rekognition | 图像视频分析 |
| Amazon Comprehend | NLP 服务 |
| Amazon Transcribe | 语音转文字 |
| Amazon Polly | 文字转语音 |

**Amazon Bedrock 支持的模型：**
- Claude (Anthropic)
- Titan (Amazon)
- LLaMA 2 (Meta)
- Stable Diffusion
- Mistral

**SageMaker 快速入门：**
```python
import sagemaker
from sagemaker.pytorch import PyTorch

estimator = PyTorch(
    entry_point='train.py',
    role=role,
    instance_count=1,
    instance_type='ml.p3.2xlarge',
    framework_version='2.0'
)

estimator.fit({'training': s3_input})
```

---

### Azure AI
**官方网站**: [azure.microsoft.com/en-us/products/ai-services](https://azure.microsoft.com/en-us/products/ai-services)

**核心服务：**

| 服务 | 用途 |
|------|------|
| Azure OpenAI Service | GPT-4, DALL-E 托管服务 |
| Azure Machine Learning | 端到端 ML 平台 |
| Azure Cognitive Services | AI API 集合 |
| Azure AI Search | 向量搜索服务 |

**Azure OpenAI 示例：**
```python
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version="2024-02-15-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

### Google Cloud AI
**官方网站**: [cloud.google.com/products/ai](https://cloud.google.com/products/ai)

**核心服务：**

| 服务 | 用途 |
|------|------|
| Vertex AI | 统一 ML 平台 |
| Gemini API | Google LLM 服务 |
| Cloud Vision | 图像分析 |
| Cloud Natural Language | NLP 服务 |
| Cloud Speech | 语音服务 |

**Vertex AI 特点：**
- AutoML 自动化建模
- Model Garden 模型市场
- 与 BigQuery 深度集成
- TPU 加速支持

---

## 开发环境

### Google Colab
**官方网站**: [colab.research.google.com](https://colab.research.google.com/)

免费的云端 Jupyter 环境，提供 GPU 加速。

**特点：**
- 免费 T4 GPU（限时）
- 预装 ML 库
- Google Drive 集成
- 协作编辑

**Pro 版本：**
- 更长运行时间
- 更好的 GPU（V100, A100）
- 更多内存

---

### Kaggle Notebooks
**官方网站**: [kaggle.com/code](https://www.kaggle.com/code)

Kaggle 提供的免费云端环境。

**特点：**
- 免费 GPU/TPU
- 30小时/周 GPU 配额
- 数据集直接访问
- 比赛提交集成

---

### Lightning AI
**官方网站**: [lightning.ai](https://lightning.ai/)

PyTorch Lightning 团队的云开发平台。

**特点：**
- 即时 GPU 访问
- VS Code 云端环境
- 团队协作
- 一键部署

---

### Paperspace Gradient
**官方网站**: [paperspace.com/gradient](https://www.paperspace.com/gradient)

ML 开发和部署平台。

**特点：**
- 免费 GPU 层级
- Jupyter 和 VS Code
- 模型部署
- 工作流编排

---

## 模型托管平台

### Hugging Face Hub
**官方网站**: [huggingface.co/models](https://huggingface.co/models)

全球最大的开源模型社区。

**功能：**
- 50万+ 模型
- 15万+ 数据集
- Spaces 应用托管
- 推理 API
- 模型评估排行榜

**使用模型：**
```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love this!")
```

---

### Replicate
**官方网站**: [replicate.com](https://replicate.com/)

一键运行开源模型的云平台。

**特点：**
- 按秒计费
- 无需管理基础设施
- API 简单
- 支持自定义模型

---

### Modal
**官方网站**: [modal.com](https://modal.com/)

Python 优先的无服务器 ML 平台。

```python
import modal

app = modal.App()

@app.function(gpu="A100")
def inference(prompt: str):
    # 运行在 A100 GPU 上
    return model.generate(prompt)
```

---

## 向量数据库服务

### Pinecone
**官方网站**: [pinecone.io](https://www.pinecone.io/)

全托管向量数据库。

**特点：**
- 毫秒级查询
- 自动扩展
- 混合搜索
- 元数据过滤

---

### Weaviate Cloud
**官方网站**: [weaviate.io/developers/wcs](https://weaviate.io/developers/wcs)

开源向量数据库的云服务。

---

### Qdrant Cloud
**官方网站**: [qdrant.tech/cloud](https://qdrant.tech/cloud/)

高性能向量搜索云服务。

---

## 平台对比

### 价格对比（GPU 服务）

| 平台 | 免费层级 | 付费起步 |
|------|----------|----------|
| Google Colab | T4 GPU 限时 | $9.99/月 |
| Kaggle | 30h/周 GPU | 无 |
| Lightning AI | 22 GPU 小时/月 | $10/月 |
| Paperspace | 免费 GPU | $8/月 |
| AWS SageMaker | 免费试用 | 按用量 |

### 功能对比

| 平台 | 适用场景 | 优势 |
|------|----------|------|
| AWS | 企业级生产 | 服务全面 |
| Azure | 企业+OpenAI | OpenAI 独家 |
| GCP | 研究+生产 | TPU 支持 |
| Colab | 学习实验 | 简单免费 |
| Hugging Face | 开源社区 | 模型生态 |

## 选择建议

### 学习入门
1. Google Colab - 免费 GPU，即开即用
2. Kaggle - 免费 GPU，数据集丰富
3. Hugging Face - 模型社区，教程完善

### 个人项目
1. Lightning AI - 专业环境
2. Modal - 按需计费
3. Replicate - 一键部署

### 企业生产
1. AWS SageMaker + Bedrock
2. Azure ML + Azure OpenAI
3. Google Vertex AI

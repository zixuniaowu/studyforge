# 大语言模型（LLM）入门

## 什么是大语言模型？

大语言模型（Large Language Model，LLM）是一类基于 Transformer 架构的深度学习模型，通过在海量文本数据上进行预训练，具备理解和生成人类语言的能力。

## LLM 的发展历程

### 2017 - Transformer 诞生
- Google 发布论文《Attention Is All You Need》
- Self-Attention 机制彻底改变 NLP

### 2018 - 预训练时代开启
- **GPT-1**：OpenAI 发布，1.17 亿参数
- **BERT**：Google 发布，双向预训练

### 2019 - 规模扩大
- **GPT-2**：15 亿参数，因"太危险"延迟发布
- **RoBERTa**、**ALBERT**、**XLNet** 等改进版本

### 2020 - 规模效应
- **GPT-3**：1750 亿参数，少样本学习能力
- 发现 Scaling Laws（规模法则）

### 2022-2023 - ChatGPT 时代
- **ChatGPT**：基于 GPT-3.5，对话能力突破
- **GPT-4**：多模态能力
- **Claude**：Anthropic 发布
- **LLaMA**：Meta 开源模型
- **Gemini**：Google 多模态模型

### 2024 - 持续演进
- 更长上下文窗口
- 多模态融合
- 推理能力增强
- 开源模型崛起

## 核心技术原理

### Transformer 架构

```
输入文本
    ↓
Token Embedding + Positional Encoding
    ↓
┌─────────────────┐
│  Multi-Head     │
│  Self-Attention │ × N 层
│       +         │
│  Feed Forward   │
└─────────────────┘
    ↓
输出
```

### 自注意力机制（Self-Attention）

计算序列中每个位置与其他位置的关联：

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

- Q (Query)：查询向量
- K (Key)：键向量
- V (Value)：值向量

### 预训练任务

| 任务类型 | 描述 | 代表模型 |
|----------|------|----------|
| 因果语言模型（CLM） | 预测下一个 token | GPT 系列 |
| 掩码语言模型（MLM） | 预测被遮盖的 token | BERT |
| Seq2Seq | 序列到序列 | T5, BART |

## 主流 LLM 对比

| 模型 | 公司 | 参数量 | 特点 |
|------|------|--------|------|
| GPT-4 | OpenAI | 未公开 | 多模态、最强推理 |
| Claude 3 | Anthropic | 未公开 | 安全、长上下文 |
| Gemini | Google | 未公开 | 多模态、多版本 |
| LLaMA 3 | Meta | 8B-70B | 开源、可商用 |
| Mistral | Mistral AI | 7B-8x22B | 开源、高效 |
| Qwen | 阿里云 | 0.5B-72B | 中文优化 |
| DeepSeek | DeepSeek | 7B-67B | 代码能力强 |

## 使用 LLM 的方式

### 1. API 调用

```python
from openai import OpenAI

client = OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)
```

### 2. 本地部署

使用 Ollama 本地运行：
```bash
# 安装 Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 运行模型
ollama run llama3

# 或使用 API
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Hello!"
}'
```

### 3. 微调（Fine-tuning）

```python
from transformers import AutoModelForCausalLM, Trainer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")

trainer = Trainer(
    model=model,
    train_dataset=dataset,
    # ... 配置
)

trainer.train()
```

## Prompt Engineering

### 基础技巧

1. **明确指令**
```
请用简洁的语言解释什么是机器学习，控制在100字以内。
```

2. **提供示例（Few-shot）**
```
将以下句子翻译成英文：
中文：今天天气很好
英文：The weather is nice today

中文：我喜欢编程
英文：
```

3. **角色设定**
```
你是一位资深的 Python 开发专家，请帮我优化以下代码...
```

4. **思维链（Chain of Thought）**
```
请一步一步思考这个问题：
如果一个人每天存10元，一年能存多少钱？
```

### 高级技巧

- **ReAct**：推理 + 行动
- **Tree of Thought**：树状思维
- **Self-Consistency**：多次采样取一致
- **RAG**：检索增强生成

## LLM 应用开发

### 主流框架

| 框架 | 特点 |
|------|------|
| LangChain | 功能全面，生态丰富 |
| LlamaIndex | 专注数据索引 |
| Semantic Kernel | 微软出品，企业级 |
| Haystack | 搜索和问答 |

### LangChain 示例

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4")
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个翻译助手"),
    ("user", "将以下内容翻译成英文：{text}")
])

chain = prompt | llm
result = chain.invoke({"text": "你好世界"})
```

## RAG（检索增强生成）

将外部知识与 LLM 结合：

```
用户问题
    ↓
向量检索相关文档
    ↓
文档 + 问题 → LLM
    ↓
生成答案
```

### 实现步骤
1. 文档分块
2. 向量化（Embedding）
3. 存入向量数据库
4. 检索相关片段
5. 构建 Prompt
6. LLM 生成回答

## 学习资源

### 课程
- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course)
- [DeepLearning.AI - ChatGPT Prompt Engineering](https://www.deeplearning.ai/short-courses/)
- [LangChain 官方教程](https://python.langchain.com/docs/get_started/introduction)

### 论文
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [BERT](https://arxiv.org/abs/1810.04805)
- [GPT-3](https://arxiv.org/abs/2005.14165)
- [LLaMA](https://arxiv.org/abs/2302.13971)

### 社区
- [Hugging Face](https://huggingface.co/)
- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/)
- [LangChain Discord](https://discord.gg/langchain)

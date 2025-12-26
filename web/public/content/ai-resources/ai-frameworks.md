# AI 开发框架

## 深度学习框架

### PyTorch
**官方网站**: [pytorch.org](https://pytorch.org/)

Meta 开发的开源深度学习框架，以动态计算图和 Python 优先的设计理念著称。

**特点：**
- 动态计算图（Eager Execution）
- Pythonic API，调试友好
- 强大的 GPU 加速支持
- 丰富的预训练模型生态

**安装：**
```bash
pip install torch torchvision torchaudio
```

**快速示例：**
```python
import torch
import torch.nn as nn

# 定义简单模型
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 10)
)

# 前向传播
x = torch.randn(32, 784)
output = model(x)
```

---

### TensorFlow / Keras
**官方网站**: [tensorflow.org](https://www.tensorflow.org/)

Google 开发的端到端机器学习平台，Keras 作为高级 API 提供简洁的模型构建方式。

**特点：**
- 生产部署成熟（TF Serving, TF Lite）
- TensorBoard 可视化
- 跨平台支持（移动端、嵌入式）
- Keras 简化开发流程

**安装：**
```bash
pip install tensorflow
```

**快速示例：**
```python
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(256, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
model.fit(x_train, y_train, epochs=5)
```

---

### JAX
**官方网站**: [github.com/google/jax](https://github.com/google/jax)

Google 研究团队开发的高性能数值计算库，支持自动微分和 XLA 编译。

**特点：**
- 函数式编程风格
- 自动向量化（vmap）
- JIT 编译加速
- 适合研究和实验

**安装：**
```bash
pip install jax jaxlib
```

---

## LLM 开发框架

### LangChain
**官方网站**: [langchain.com](https://www.langchain.com/)

构建 LLM 应用的最流行框架，提供完整的开发工具链。

**核心功能：**
- 多模型支持（OpenAI, Anthropic, 开源模型）
- 链式调用（Chains）
- 智能体（Agents）
- 检索增强生成（RAG）
- 记忆系统（Memory）

**安装：**
```bash
pip install langchain langchain-openai
```

**快速示例：**
```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4")
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个有帮助的助手"),
    ("user", "{input}")
])

chain = prompt | llm
response = chain.invoke({"input": "你好"})
```

---

### LlamaIndex
**官方网站**: [llamaindex.ai](https://www.llamaindex.ai/)

专注于数据索引和检索的 LLM 框架，构建知识增强应用的首选。

**核心功能：**
- 多种数据连接器
- 智能索引构建
- 高效检索策略
- 查询引擎

**安装：**
```bash
pip install llama-index
```

---

### Semantic Kernel
**官方网站**: [github.com/microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel)

微软开发的企业级 AI 编排框架。

**特点：**
- 企业级安全
- 多语言支持（C#, Python, Java）
- 插件系统
- Azure 深度集成

---

## 模型推理框架

### vLLM
**官方网站**: [vllm.ai](https://vllm.ai/)

高吞吐量 LLM 推理引擎，专为生产环境设计。

**特点：**
- PagedAttention 技术
- 连续批处理
- 高吞吐量推理
- OpenAI 兼容 API

**安装：**
```bash
pip install vllm
```

---

### Ollama
**官方网站**: [ollama.ai](https://ollama.ai/)

本地运行大语言模型的最简单方式。

**特点：**
- 一键安装运行
- 支持主流开源模型
- 本地 API 服务
- 跨平台支持

**安装：**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama run llama3
```

---

### llama.cpp
**官方网站**: [github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)

纯 C/C++ 实现的 LLaMA 推理引擎，支持多种量化格式。

**特点：**
- CPU 高效推理
- 多种量化支持（GGUF）
- 最小依赖
- 嵌入式友好

---

## 向量数据库

### Chroma
**官方网站**: [trychroma.com](https://www.trychroma.com/)

开源嵌入式向量数据库，适合原型开发。

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_collection")
collection.add(documents=["doc1", "doc2"], ids=["id1", "id2"])
```

---

### Pinecone
**官方网站**: [pinecone.io](https://www.pinecone.io/)

云原生向量数据库，专为生产环境设计。

---

### Milvus
**官方网站**: [milvus.io](https://milvus.io/)

开源分布式向量数据库，支持大规模部署。

---

### Weaviate
**官方网站**: [weaviate.io](https://weaviate.io/)

支持混合搜索的开源向量数据库。

---

## Agent 框架

### AutoGPT
**官方网站**: [github.com/Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)

自主 AI Agent 框架，可以自动完成复杂任务。

---

### CrewAI
**官方网站**: [crewai.com](https://www.crewai.com/)

多 Agent 协作框架，模拟团队协作完成任务。

```python
from crewai import Agent, Task, Crew

researcher = Agent(role="研究员", goal="收集信息")
writer = Agent(role="作者", goal="撰写报告")

crew = Crew(agents=[researcher, writer], tasks=[...])
result = crew.kickoff()
```

---

### LangGraph
**官方网站**: [langchain-ai.github.io/langgraph](https://langchain-ai.github.io/langgraph/)

LangChain 团队开发的状态化 Agent 框架。

---

## 框架对比

| 框架 | 类型 | 适用场景 | 学习曲线 |
|------|------|----------|----------|
| PyTorch | 深度学习 | 研究、生产 | 中等 |
| TensorFlow | 深度学习 | 生产部署 | 中等 |
| LangChain | LLM 应用 | 通用 LLM 开发 | 低 |
| LlamaIndex | LLM 应用 | RAG 应用 | 低 |
| vLLM | 推理引擎 | 高性能推理 | 低 |
| Ollama | 本地推理 | 本地开发测试 | 极低 |

## 选择建议

1. **入门学习**：PyTorch + Ollama
2. **LLM 应用开发**：LangChain + Chroma
3. **生产部署**：vLLM + Pinecone
4. **企业应用**：Semantic Kernel + Azure

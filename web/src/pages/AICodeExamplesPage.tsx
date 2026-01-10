import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Code2,
  Copy,
  Check,
  Terminal,
  MessageSquare,
  Database,
  Zap,
  Play,
  FileText
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { ColabButton, StackBlitzButton } from '../components/CodeRunner';

type Category = 'langchain' | 'ollama' | 'openai' | 'rag' | 'prompts';

interface CodeExample {
  id: string;
  title: { zh: string; ja: string };
  description: { zh: string; ja: string };
  code: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const codeExamples: Record<Category, {
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: React.ElementType;
  gradient: string;
  examples: CodeExample[];
}> = {
  langchain: {
    name: { zh: 'LangChain 基础', ja: 'LangChain 基礎' },
    description: { zh: 'LangChain 核心概念与使用方法', ja: 'LangChain のコア概念と使い方' },
    icon: Zap,
    gradient: 'from-green-500 to-emerald-600',
    examples: [
      {
        id: 'lc-1',
        title: { zh: '简单对话链', ja: 'シンプルな会話チェーン' },
        description: { zh: '使用 LangChain 创建基本的对话链', ja: 'LangChain で基本的な会話チェーンを作成' },
        code: `# LangChain 简单对话示例
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 初始化模型
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# 创建提示模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个友好的AI助手，用简洁的语言回答问题。"),
    ("human", "{input}")
])

# 创建链
chain = prompt | llm | StrOutputParser()

# 运行
response = chain.invoke({"input": "什么是机器学习？"})
print(response)`,
        language: 'python',
        difficulty: 'beginner',
        tags: ['LangChain', 'Chat', 'Chain']
      },
      {
        id: 'lc-2',
        title: { zh: '带记忆的对话', ja: 'メモリ付き会話' },
        description: { zh: '使用 ConversationBufferMemory 保持上下文', ja: 'ConversationBufferMemory でコンテキストを保持' },
        code: `# LangChain 带记忆对话示例
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# 初始化模型和记忆
llm = ChatOpenAI(model="gpt-4o-mini")
memory = ConversationBufferMemory()

# 创建对话链
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True  # 显示中间过程
)

# 多轮对话
print(conversation.predict(input="我叫小明"))
print(conversation.predict(input="我刚才说我叫什么？"))
# 输出：你刚才说你叫小明。

# 查看记忆内容
print(memory.buffer)`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['LangChain', 'Memory', 'Conversation']
      },
      {
        id: 'lc-3',
        title: { zh: 'LCEL 表达式', ja: 'LCEL 式' },
        description: { zh: 'LangChain Expression Language 链式调用', ja: 'LangChain Expression Language のチェーン呼び出し' },
        code: `# LCEL (LangChain Expression Language) 示例
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

llm = ChatOpenAI(model="gpt-4o-mini")

# 使用 LCEL 创建复杂链
template = """
根据以下上下文回答问题。

上下文：{context}

问题：{question}

回答："""

prompt = ChatPromptTemplate.from_template(template)

# LCEL 链式语法
chain = (
    {"context": RunnablePassthrough(), "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 批量处理
questions = ["什么是深度学习？", "神经网络如何工作？"]
results = chain.batch([
    {"context": "AI基础知识", "question": q}
    for q in questions
])`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['LangChain', 'LCEL', 'Batch']
      }
    ]
  },
  ollama: {
    name: { zh: 'Ollama 本地部署', ja: 'Ollama ローカルデプロイ' },
    description: { zh: '在本地运行开源大语言模型', ja: 'ローカルでオープンソースLLMを実行' },
    icon: Terminal,
    gradient: 'from-slate-600 to-zinc-700',
    examples: [
      {
        id: 'ol-1',
        title: { zh: '安装和运行', ja: 'インストールと実行' },
        description: { zh: 'Ollama 基础安装和模型下载', ja: 'Ollama の基本インストールとモデルダウンロード' },
        code: `# Ollama 安装和使用

# 1. 安装 Ollama (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# 2. 启动服务
ollama serve

# 3. 下载模型（另开终端）
ollama pull llama3.2        # 下载 Llama 3.2 (3B)
ollama pull qwen2.5:7b      # 下载 Qwen 2.5 (7B)
ollama pull deepseek-r1:8b  # 下载 DeepSeek-R1 (8B)

# 4. 命令行对话
ollama run llama3.2

# 5. 查看已下载模型
ollama list

# 6. 查看模型信息
ollama show llama3.2`,
        language: 'bash',
        difficulty: 'beginner',
        tags: ['Ollama', 'Installation', 'CLI']
      },
      {
        id: 'ol-2',
        title: { zh: 'Python API 调用', ja: 'Python API 呼び出し' },
        description: { zh: '使用 Python 调用 Ollama API', ja: 'Python で Ollama API を呼び出す' },
        code: `# Ollama Python API 示例
import requests
import json

# 方法1：使用 requests 直接调用 API
def chat_with_ollama(message: str, model: str = "llama3.2"):
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": model,
            "messages": [{"role": "user", "content": message}],
            "stream": False
        }
    )
    return response.json()["message"]["content"]

# 调用
result = chat_with_ollama("用一句话解释什么是AI")
print(result)

# 方法2：使用官方 ollama 库
# pip install ollama
import ollama

response = ollama.chat(
    model='llama3.2',
    messages=[
        {'role': 'user', 'content': '写一首关于编程的短诗'}
    ]
)
print(response['message']['content'])

# 流式输出
for chunk in ollama.chat(
    model='llama3.2',
    messages=[{'role': 'user', 'content': '讲个笑话'}],
    stream=True
):
    print(chunk['message']['content'], end='', flush=True)`,
        language: 'python',
        difficulty: 'beginner',
        tags: ['Ollama', 'Python', 'API']
      },
      {
        id: 'ol-3',
        title: { zh: 'LangChain + Ollama', ja: 'LangChain + Ollama' },
        description: { zh: '用 LangChain 连接本地 Ollama 模型', ja: 'LangChain でローカル Ollama モデルに接続' },
        code: `# LangChain + Ollama 集成
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 连接本地 Ollama
llm = ChatOllama(
    model="llama3.2",
    temperature=0.7,
    base_url="http://localhost:11434"  # 默认地址
)

# 创建翻译链
prompt = ChatPromptTemplate.from_template(
    "将以下文本翻译成{target_lang}：\\n\\n{text}"
)

chain = prompt | llm | StrOutputParser()

# 使用
result = chain.invoke({
    "target_lang": "日语",
    "text": "人工智能正在改变世界"
})
print(result)

# 批量翻译
texts = ["你好", "谢谢", "再见"]
results = chain.batch([
    {"target_lang": "英语", "text": t} for t in texts
])`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['LangChain', 'Ollama', 'Integration']
      }
    ]
  },
  openai: {
    name: { zh: 'OpenAI API', ja: 'OpenAI API' },
    description: { zh: 'OpenAI GPT 系列 API 使用', ja: 'OpenAI GPT シリーズ API の使用' },
    icon: MessageSquare,
    gradient: 'from-teal-500 to-cyan-600',
    examples: [
      {
        id: 'oa-1',
        title: { zh: '基础对话', ja: '基本対話' },
        description: { zh: 'OpenAI Chat Completions API 基础用法', ja: 'OpenAI Chat Completions API の基本的な使い方' },
        code: `# OpenAI 基础对话
from openai import OpenAI

# 初始化客户端
client = OpenAI(api_key="your-api-key")

# 简单对话
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "你是一个专业的编程导师。"},
        {"role": "user", "content": "解释一下什么是递归？"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)

# 流式输出
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "写一个快速排序的代码"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,
        language: 'python',
        difficulty: 'beginner',
        tags: ['OpenAI', 'Chat', 'Streaming']
      },
      {
        id: 'oa-2',
        title: { zh: 'Function Calling', ja: 'Function Calling' },
        description: { zh: '让 GPT 调用自定义函数', ja: 'GPT にカスタム関数を呼び出させる' },
        code: `# OpenAI Function Calling 示例
from openai import OpenAI
import json

client = OpenAI()

# 定义可调用的函数
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如：北京、上海"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位"
                    }
                },
                "required": ["city"]
            }
        }
    }
]

# 调用
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto"
)

# 解析函数调用
tool_call = response.choices[0].message.tool_calls[0]
function_name = tool_call.function.name
arguments = json.loads(tool_call.function.arguments)
print(f"调用函数：{function_name}")
print(f"参数：{arguments}")  # {"city": "北京"}`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['OpenAI', 'Functions', 'Tools']
      },
      {
        id: 'oa-3',
        title: { zh: '图像理解', ja: '画像理解' },
        description: { zh: 'GPT-4o 视觉能力', ja: 'GPT-4o のビジョン機能' },
        code: `# GPT-4o 图像理解示例
from openai import OpenAI
import base64

client = OpenAI()

# 方法1：使用图片 URL
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "这张图片里有什么？"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=300
)

print(response.choices[0].message.content)

# 方法2：使用 base64 编码的本地图片
def encode_image(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

base64_image = encode_image("my_image.jpg")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "描述这张图片的内容"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]
)`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['OpenAI', 'Vision', 'GPT-4o']
      }
    ]
  },
  rag: {
    name: { zh: 'RAG 检索增强', ja: 'RAG 検索拡張' },
    description: { zh: '构建知识库问答系统', ja: '知識ベースQ&Aシステムの構築' },
    icon: Database,
    gradient: 'from-purple-500 to-violet-600',
    examples: [
      {
        id: 'rag-1',
        title: { zh: '简单 RAG 实现', ja: 'シンプルな RAG 実装' },
        description: { zh: '使用 ChromaDB 构建基础 RAG', ja: 'ChromaDB で基本的な RAG を構築' },
        code: `# 简单 RAG 实现
# pip install chromadb langchain-chroma langchain-openai

from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. 准备文档
documents = [
    "LangChain 是一个用于开发 LLM 应用的框架。",
    "RAG 全称是 Retrieval-Augmented Generation，检索增强生成。",
    "向量数据库可以存储文本的嵌入向量，支持语义搜索。",
    "ChromaDB 是一个轻量级的向量数据库，适合本地开发。"
]

# 2. 文本分割（如果文档较长）
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
splits = splitter.create_documents(documents)

# 3. 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(splits, embeddings)

# 4. 创建检索器
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# 5. 构建 RAG 链
llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("""
基于以下上下文回答问题。如果无法从上下文中找到答案，请说"我不知道"。

上下文：
{context}

问题：{question}
""")

def format_docs(docs):
    return "\\n\\n".join(doc.page_content for doc in docs)

# 6. 问答
question = "什么是 RAG？"
docs = retriever.invoke(question)
context = format_docs(docs)
response = llm.invoke(prompt.format(context=context, question=question))
print(response.content)`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['RAG', 'ChromaDB', 'Retrieval']
      },
      {
        id: 'rag-2',
        title: { zh: '处理 PDF 文档', ja: 'PDF ドキュメント処理' },
        description: { zh: '从 PDF 构建知识库', ja: 'PDF から知識ベースを構築' },
        code: `# PDF 文档 RAG
# pip install pypdf langchain-community

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# 1. 加载 PDF
loader = PyPDFLoader("document.pdf")
pages = loader.load()  # 每页一个文档

print(f"共 {len(pages)} 页")
print(f"第一页内容预览：{pages[0].page_content[:200]}...")

# 2. 分割文档
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\\n\\n", "\\n", "。", "，", " ", ""]
)
chunks = splitter.split_documents(pages)
print(f"分割成 {len(chunks)} 个块")

# 3. 创建向量存储（持久化）
vectorstore = Chroma.from_documents(
    chunks,
    OpenAIEmbeddings(),
    persist_directory="./chroma_db"  # 持久化目录
)

# 4. 后续使用（加载已有数据库）
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=OpenAIEmbeddings()
)

# 5. 相似度搜索
results = vectorstore.similarity_search("查询内容", k=3)
for doc in results:
    print(f"来源：{doc.metadata.get('source', 'unknown')}")
    print(f"内容：{doc.page_content[:100]}...")`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['RAG', 'PDF', 'Persistence']
      },
      {
        id: 'rag-3',
        title: { zh: 'Hybrid Search 混合检索', ja: 'Hybrid Search ハイブリッド検索' },
        description: { zh: '结合关键词搜索和语义搜索', ja: 'キーワード検索と意味検索の組み合わせ' },
        code: `# 混合检索示例
# pip install rank-bm25

from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    """结合 BM25 关键词搜索和向量语义搜索"""

    def __init__(self, documents: list[str]):
        self.documents = documents

        # BM25 初始化
        tokenized = [doc.split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized)

        # 向量存储初始化
        self.vectorstore = Chroma.from_texts(
            documents,
            OpenAIEmbeddings()
        )

    def search(self, query: str, k: int = 3, alpha: float = 0.5):
        """
        混合检索
        alpha: 向量搜索权重 (0-1)，1-alpha 是 BM25 权重
        """
        # BM25 搜索
        bm25_scores = self.bm25.get_scores(query.split())
        bm25_scores = bm25_scores / (bm25_scores.max() + 1e-6)  # 归一化

        # 向量搜索
        vector_results = self.vectorstore.similarity_search_with_score(query, k=len(self.documents))
        vector_scores = {doc.page_content: 1 - score for doc, score in vector_results}
        vector_scores = np.array([vector_scores.get(doc, 0) for doc in self.documents])
        vector_scores = vector_scores / (vector_scores.max() + 1e-6)

        # 融合分数
        hybrid_scores = alpha * vector_scores + (1 - alpha) * bm25_scores

        # 返回 top-k
        top_indices = np.argsort(hybrid_scores)[::-1][:k]
        return [(self.documents[i], hybrid_scores[i]) for i in top_indices]

# 使用
docs = ["LangChain 开发框架", "RAG 检索增强生成", "向量数据库技术"]
retriever = HybridRetriever(docs)
results = retriever.search("LangChain RAG", k=2, alpha=0.7)`,
        language: 'python',
        difficulty: 'advanced',
        tags: ['RAG', 'BM25', 'Hybrid Search']
      }
    ]
  },
  prompts: {
    name: { zh: '提示词工程', ja: 'プロンプトエンジニアリング' },
    description: { zh: '高效提示词设计模式', ja: '効果的なプロンプト設計パターン' },
    icon: FileText,
    gradient: 'from-amber-500 to-orange-600',
    examples: [
      {
        id: 'pr-1',
        title: { zh: 'Few-Shot 示例', ja: 'Few-Shot 例' },
        description: { zh: '通过示例引导模型输出', ja: '例を通じてモデル出力を誘導' },
        code: `# Few-Shot Prompting 示例

few_shot_prompt = """
你是一个情感分析专家。分析文本的情感倾向。

示例 1：
文本：这家餐厅的菜真好吃，服务也很周到！
情感：正面
置信度：0.95

示例 2：
文本：等了一个小时才上菜，太慢了。
情感：负面
置信度：0.85

示例 3：
文本：味道一般，价格还行。
情感：中性
置信度：0.70

现在分析以下文本：
文本：{input_text}
"""

# 使用
from openai import OpenAI
client = OpenAI()

def analyze_sentiment(text: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": few_shot_prompt.format(input_text=text)}
        ],
        temperature=0  # 减少随机性
    )
    return response.choices[0].message.content

result = analyze_sentiment("产品质量不错，但物流太慢了")
print(result)`,
        language: 'python',
        difficulty: 'beginner',
        tags: ['Prompts', 'Few-Shot', 'Sentiment']
      },
      {
        id: 'pr-2',
        title: { zh: 'Chain of Thought', ja: 'Chain of Thought' },
        description: { zh: '引导模型逐步推理', ja: 'モデルに段階的な推論を促す' },
        code: `# Chain of Thought (CoT) 提示词

cot_prompt = """
请一步一步思考并解决以下问题。

问题：一个班级有 32 名学生，其中 60% 是女生。如果 1/4 的女生参加了篮球队，
那么有多少女生参加了篮球队？

让我们逐步分析：
1. 首先，计算女生总数
2. 然后，计算参加篮球队的女生数量
3. 最后，给出答案

思考过程：
"""

# 使用 LangChain
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 通用 CoT 模板
cot_template = ChatPromptTemplate.from_messages([
    ("system", """你是一个擅长逻辑推理的助手。
回答问题时请遵循以下步骤：
1. 理解问题，提取关键信息
2. 分解问题为子步骤
3. 逐步计算/推理
4. 验证答案
5. 给出最终结论"""),
    ("human", "{question}")
])

chain = cot_template | llm

# 使用
response = chain.invoke({
    "question": "如果一个数的 3 倍加上 15 等于这个数的 5 倍减去 9，这个数是多少？"
})
print(response.content)`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['Prompts', 'CoT', 'Reasoning']
      },
      {
        id: 'pr-3',
        title: { zh: 'Structured Output', ja: '構造化出力' },
        description: { zh: '让模型输出结构化 JSON', ja: 'モデルに構造化 JSON を出力させる' },
        code: `# 结构化输出示例
from openai import OpenAI
from pydantic import BaseModel
from typing import Literal

client = OpenAI()

# 使用 Pydantic 定义输出结构
class ProductReview(BaseModel):
    sentiment: Literal["positive", "negative", "neutral"]
    confidence: float
    key_points: list[str]
    suggested_improvements: list[str]

# 方法1：使用 response_format
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "分析产品评论，提取结构化信息。"},
        {"role": "user", "content": "这个耳机音质很好，但续航太短了，只能用4小时。"}
    ],
    response_format={"type": "json_object"}
)

import json
result = json.loads(response.choices[0].message.content)
print(result)

# 方法2：使用 Instructor 库（推荐）
# pip install instructor
import instructor

client = instructor.from_openai(OpenAI())

review = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=ProductReview,  # 使用 Pydantic 模型
    messages=[
        {"role": "user", "content": "这个耳机音质很好，但续航太短了，只能用4小时。"}
    ]
)

print(f"情感：{review.sentiment}")
print(f"要点：{review.key_points}")`,
        language: 'python',
        difficulty: 'intermediate',
        tags: ['Prompts', 'JSON', 'Structured']
      }
    ]
  }
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      title="Copy code"
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} className="text-gray-400 hover:text-white" />
      )}
    </button>
  );
};

const CodeBlock: React.FC<{ example: CodeExample; language: string }> = ({ example, language: lang }) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };

  const difficultyLabels = {
    beginner: { zh: '入门', ja: '入門' },
    intermediate: { zh: '中级', ja: '中級' },
    advanced: { zh: '高级', ja: '上級' }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-800">
            {example.title[lang === 'ja' ? 'ja' : 'zh']}
          </h3>
          <span className={`px-2 py-0.5 text-xs font-medium rounded ${difficultyColors[example.difficulty]}`}>
            {difficultyLabels[example.difficulty][lang === 'ja' ? 'ja' : 'zh']}
          </span>
        </div>
        <p className="text-sm text-slate-500">
          {example.description[lang === 'ja' ? 'ja' : 'zh']}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {example.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
            {example.language}
          </span>
          {/* Run buttons based on language */}
          {example.language === 'python' && (
            <ColabButton
              code={example.code}
              title={example.title[lang === 'ja' ? 'ja' : 'zh']}
            />
          )}
          {(example.language === 'javascript' || example.language === 'typescript') && (
            <StackBlitzButton
              code={example.code}
              language={example.language as 'javascript' | 'typescript'}
              title={example.title[lang === 'ja' ? 'ja' : 'zh']}
            />
          )}
          <CopyButton text={example.code} />
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm">
          <code>{example.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function AICodeExamplesPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const [selectedCategory, setSelectedCategory] = useState<Category>('langchain');

  const category = codeExamples[selectedCategory];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Home size={20} />
                <span className="hidden sm:inline">{language === 'ja' ? 'ホーム' : '首页'}</span>
              </button>
              <ChevronRight size={16} className="text-slate-500" />
              <h1 className="text-lg font-semibold">
                {language === 'ja' ? 'AI コード実践例' : 'AI 代码实战'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 lg:px-10">
          <div className="flex overflow-x-auto gap-1 py-2">
            {(Object.keys(codeExamples) as Category[]).map((cat) => {
              const Icon = codeExamples[cat].icon;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{codeExamples[cat].name[language === 'ja' ? 'ja' : 'zh']}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 lg:px-10 py-8">
        {/* Category Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient}`}>
              <category.icon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {category.name[language === 'ja' ? 'ja' : 'zh']}
              </h2>
              <p className="text-sm text-slate-500">
                {category.description[language === 'ja' ? 'ja' : 'zh']}
              </p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="grid gap-6">
          {category.examples.map((example) => (
            <CodeBlock key={example.id} example={example} language={language} />
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Play size={20} className="text-cyan-600" />
            {language === 'ja' ? '他のカテゴリを見る' : '查看其他分类'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.keys(codeExamples) as Category[]).map((cat) => {
              if (cat === selectedCategory) return null;
              const Icon = codeExamples[cat].icon;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                >
                  <Icon size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    {codeExamples[cat].name[language === 'ja' ? 'ja' : 'zh']}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 mt-auto">
        <div className="px-6 lg:px-10 text-center">
          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
}

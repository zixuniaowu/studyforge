import{c as x,g as _,u as b,r as o,E as y,n as v,K as j,M as w,j as e,C as N,o as z,N as C,B as k,m as R,O as I,P as T}from"./index-B2xJFW01.js";import{L as A}from"./layers-1EzP2D7L.js";import{I as q}from"./image-Df3-Och4.js";import{S as P}from"./search-CGWBQdMV.js";import{H as X}from"./house-Bce2Judw.js";import{C as L}from"./copy-BTFqIG5t.js";const S=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],M=x("message-square",S),m={intro:{name:{zh:"入门教程",ja:"入門チュートリアル"},description:{zh:"从零开始学习 AI/ML 基础，无需 API Key",ja:"ゼロからAI/MLの基礎を学ぶ、APIキー不要"},icon:w,gradient:"from-purple-500 to-indigo-600",examples:[{id:"intro-1",title:{zh:"Hello Transformers - 第一个 AI 程序",ja:"Hello Transformers - 初めてのAIプログラム"},description:{zh:"使用 Hugging Face 免费模型进行文本生成（Colab 可直接运行）",ja:"Hugging Faceの無料モデルでテキスト生成（Colabで直接実行可能）"},code:`"""
============================================
Hello Transformers - 你的第一个 AI 程序
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 Hugging Face 免费开源模型
============================================
"""

# 第一步：安装依赖（Colab 中运行）
!pip install transformers torch -q

# 第二步：导入库
from transformers import pipeline

# 第三步：创建文本生成管道
# 使用 GPT-2 模型（免费，约 500MB）
print("正在加载模型...")
generator = pipeline("text-generation", model="gpt2")
print("✅ 模型加载完成！")

# 第四步：生成文本
prompt = "Artificial Intelligence is"
result = generator(prompt, max_length=50, num_return_sequences=1)

print("\\n" + "="*50)
print("📝 输入提示:", prompt)
print("="*50)
print("🤖 AI 生成:")
print(result[0]['generated_text'])
print("="*50)

# 试试中文模型
print("\\n正在加载中文模型...")
chinese_generator = pipeline("text-generation", model="uer/gpt2-chinese-cluecorpussmall")
print("✅ 中文模型加载完成！")

chinese_prompt = "人工智能的未来"
chinese_result = chinese_generator(chinese_prompt, max_length=50)

print("\\n" + "="*50)
print("📝 中文提示:", chinese_prompt)
print("="*50)
print("🤖 AI 生成:")
print(chinese_result[0]['generated_text'])
print("="*50)

print("\\n🎉 恭喜！你已完成第一个 AI 程序！")`,language:"python",difficulty:"beginner",tags:["入门","Transformers","GPT-2","Colab"],colabReady:!0},{id:"intro-2",title:{zh:"问答系统 - AI 阅读理解",ja:"Q&Aシステム - AI読解"},description:{zh:"让 AI 阅读文章并回答问题（Colab 可直接运行）",ja:"AIに文章を読ませて質問に答えさせる（Colabで直接実行可能）"},code:`"""
============================================
问答系统 - 让 AI 阅读并回答问题
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用预训练的 BERT 问答模型
============================================
"""

# 安装依赖
!pip install transformers torch -q

from transformers import pipeline

# 创建问答管道
print("正在加载问答模型...")
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")
print("✅ 模型加载完成！")

# 准备文章和问题
context = """
Hugging Face is a company that develops tools for building applications using machine learning.
It is most notable for its Transformers library built for natural language processing applications
and its platform that allows users to share machine learning models and datasets.
The company was founded in 2016 and is headquartered in New York City.
"""

questions = [
    "What does Hugging Face develop?",
    "What is their most notable product?",
    "When was Hugging Face founded?",
    "Where is the company headquartered?"
]

print("\\n" + "="*60)
print("📖 文章内容:")
print(context)
print("="*60)

# 回答问题
print("\\n🤖 AI 问答:")
print("-"*60)

for q in questions:
    result = qa_pipeline(question=q, context=context)
    print(f"❓ 问题: {q}")
    print(f"✅ 答案: {result['answer']} (置信度: {result['score']:.2%})")
    print("-"*60)

# 中文问答示例
print("\\n正在加载中文问答模型...")
chinese_qa = pipeline("question-answering", model="uer/roberta-base-chinese-extractive-qa")
print("✅ 中文模型加载完成！")

chinese_context = """
华为技术有限公司是一家中国跨国科技公司，总部位于广东省深圳市。
公司成立于1987年，由任正非创立。华为主要从事通信设备、消费电子产品
和企业解决方案的研发与销售。截至2023年，华为是全球最大的电信设备制造商。
"""

chinese_questions = ["华为是哪一年成立的？", "华为的创始人是谁？", "华为总部在哪里？"]

print("\\n📖 中文文章:")
print(chinese_context)
print("="*60)

for q in chinese_questions:
    result = chinese_qa(question=q, context=chinese_context)
    print(f"❓ {q}")
    print(f"✅ {result['answer']}")
    print("-"*40)

print("\\n🎉 问答系统演示完成！")`,language:"python",difficulty:"beginner",tags:["问答","QA","BERT","Colab"],colabReady:!0}]},text:{name:{zh:"文本生成与处理",ja:"テキスト生成と処理"},description:{zh:"文本生成、摘要、翻译等 NLP 任务",ja:"テキスト生成、要約、翻訳などのNLPタスク"},icon:M,gradient:"from-blue-500 to-cyan-600",examples:[{id:"text-1",title:{zh:"文本摘要 - AI 自动总结",ja:"テキスト要約 - AI自動サマリー"},description:{zh:"让 AI 自动总结长文章（Colab 可直接运行）",ja:"AIに長い文章を自動要約させる（Colabで直接実行可能）"},code:`"""
============================================
文本摘要 - AI 自动生成摘要
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 BART 摘要模型
============================================
"""

!pip install transformers torch -q

from transformers import pipeline

# 创建摘要管道
print("正在加载摘要模型...")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
print("✅ 模型加载完成！")

# 长文章示例
article = """
Machine learning is a subset of artificial intelligence (AI) that provides systems the ability
to automatically learn and improve from experience without being explicitly programmed.
Machine learning focuses on the development of computer programs that can access data and
use it to learn for themselves. The process of learning begins with observations or data,
such as examples, direct experience, or instruction, in order to look for patterns in data
and make better decisions in the future based on the examples that we provide.

The primary aim is to allow the computers to learn automatically without human intervention
or assistance and adjust actions accordingly. Traditional programming requires explicit
instructions for every task, while machine learning allows systems to learn from data patterns.
This approach is particularly useful for tasks that are too complex to program explicitly,
such as image recognition, natural language processing, and autonomous driving.
"""

print("\\n📖 原文 ({} 字):".format(len(article)))
print("-"*60)
print(article[:300] + "...")
print("-"*60)

# 生成摘要
print("\\n🤖 AI 生成摘要:")
print("-"*60)
summary = summarizer(article, max_length=80, min_length=30, do_sample=False)
print(summary[0]['summary_text'])
print("-"*60)

# 多段摘要
print("\\n📝 演示：调整摘要长度")
for max_len in [50, 100, 150]:
    result = summarizer(article, max_length=max_len, min_length=20, do_sample=False)
    print(f"\\n[max_length={max_len}]:")
    print(result[0]['summary_text'])

print("\\n🎉 文本摘要演示完成！")`,language:"python",difficulty:"beginner",tags:["摘要","Summarization","BART","Colab"],colabReady:!0},{id:"text-2",title:{zh:"机器翻译 - 多语言互译",ja:"機械翻訳 - 多言語翻訳"},description:{zh:"使用免费模型进行多语言翻译",ja:"無料モデルを使用した多言語翻訳"},code:`"""
============================================
机器翻译 - 多语言互译
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 Helsinki-NLP 翻译模型
============================================
"""

!pip install transformers torch sentencepiece -q

from transformers import pipeline

# 英语到中文翻译
print("正在加载英中翻译模型...")
en_to_zh = pipeline("translation", model="Helsinki-NLP/opus-mt-en-zh")
print("✅ 英中模型加载完成！")

# 中文到英语翻译
print("正在加载中英翻译模型...")
zh_to_en = pipeline("translation", model="Helsinki-NLP/opus-mt-zh-en")
print("✅ 中英模型加载完成！")

# 演示翻译
english_texts = [
    "Hello, how are you today?",
    "Machine learning is changing the world.",
    "I love programming with Python."
]

chinese_texts = [
    "人工智能正在改变我们的生活",
    "今天天气很好，适合出去散步",
    "学习编程是一件有趣的事情"
]

print("\\n" + "="*60)
print("🌐 英语 → 中文 翻译")
print("="*60)

for text in english_texts:
    result = en_to_zh(text)
    print(f"EN: {text}")
    print(f"ZH: {result[0]['translation_text']}")
    print("-"*40)

print("\\n" + "="*60)
print("🌐 中文 → 英语 翻译")
print("="*60)

for text in chinese_texts:
    result = zh_to_en(text)
    print(f"ZH: {text}")
    print(f"EN: {result[0]['translation_text']}")
    print("-"*40)

# 其他语言翻译
print("\\n📚 支持的其他语言对:")
print("- Helsinki-NLP/opus-mt-en-de (英语→德语)")
print("- Helsinki-NLP/opus-mt-en-fr (英语→法语)")
print("- Helsinki-NLP/opus-mt-ja-en (日语→英语)")
print("- 更多模型: https://huggingface.co/Helsinki-NLP")

print("\\n🎉 翻译演示完成！")`,language:"python",difficulty:"beginner",tags:["翻译","Translation","Helsinki-NLP","Colab"],colabReady:!0}]},sentiment:{name:{zh:"情感分析",ja:"感情分析"},description:{zh:"文本情感分类、评论分析",ja:"テキスト感情分類、レビュー分析"},icon:j,gradient:"from-green-500 to-emerald-600",examples:[{id:"sentiment-1",title:{zh:"情感分析 - 判断文本情绪",ja:"感情分析 - テキストの感情判定"},description:{zh:"自动判断文本是正面还是负面",ja:"テキストがポジティブかネガティブかを自動判定"},code:`"""
============================================
情感分析 - 判断文本情绪
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 DistilBERT 情感分析模型
============================================
"""

!pip install transformers torch -q

from transformers import pipeline

# 创建情感分析管道
print("正在加载情感分析模型...")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
print("✅ 模型加载完成！")

# 测试文本
texts = [
    "I love this product! It's amazing and works perfectly.",
    "This is the worst experience I've ever had.",
    "The weather is nice today.",
    "I'm disappointed with the quality of service.",
    "This movie was absolutely fantastic, highly recommend!",
    "The food was okay, nothing special."
]

print("\\n" + "="*60)
print("😊😢 情感分析结果")
print("="*60)

for text in texts:
    result = sentiment_analyzer(text)[0]
    emoji = "😊" if result['label'] == 'POSITIVE' else "😢"
    print(f"\\n{emoji} [{result['label']}] (置信度: {result['score']:.2%})")
    print(f"   "{text}"")

# 批量分析
print("\\n" + "="*60)
print("📊 批量分析演示")
print("="*60)

reviews = [
    "Great product, fast shipping!",
    "Poor quality, waste of money",
    "Average performance, expected more",
    "Excellent customer service!",
    "Not worth the price at all"
]

results = sentiment_analyzer(reviews)

positive_count = sum(1 for r in results if r['label'] == 'POSITIVE')
negative_count = len(results) - positive_count

print(f"\\n总评论数: {len(results)}")
print(f"正面评价: {positive_count} ({positive_count/len(results)*100:.0f}%)")
print(f"负面评价: {negative_count} ({negative_count/len(results)*100:.0f}%)")

print("\\n🎉 情感分析演示完成！")`,language:"python",difficulty:"beginner",tags:["情感分析","Sentiment","BERT","Colab"],colabReady:!0},{id:"sentiment-2",title:{zh:"中文情感分析",ja:"中国語感情分析"},description:{zh:"分析中文文本的情感倾向",ja:"中国語テキストの感情傾向を分析"},code:`"""
============================================
中文情感分析
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用中文 BERT 情感模型
============================================
"""

!pip install transformers torch -q

from transformers import pipeline

# 加载中文情感分析模型
print("正在加载中文情感分析模型...")
chinese_sentiment = pipeline("sentiment-analysis", model="uer/roberta-base-finetuned-chinanews-chinese")
print("✅ 中文模型加载完成！")

# 中文测试文本
chinese_texts = [
    "这个产品太棒了，我非常满意！",
    "服务态度很差，再也不会来了",
    "今天心情不错，阳光明媚",
    "这部电影让我非常失望",
    "餐厅的菜品口味一般",
    "快递很快就到了，包装完好"
]

print("\\n" + "="*60)
print("🇨🇳 中文情感分析结果")
print("="*60)

for text in chinese_texts:
    result = chinese_sentiment(text)[0]
    # 根据标签显示不同表情
    if 'positive' in result['label'].lower() or result['label'] == 'LABEL_1':
        emoji = "😊"
        sentiment = "正面"
    else:
        emoji = "😢"
        sentiment = "负面"

    print(f"\\n{emoji} [{sentiment}] (置信度: {result['score']:.2%})")
    print(f"   "{text}"")

# 统计分析
print("\\n" + "="*60)
print("📊 评论统计分析")
print("="*60)

product_reviews = [
    "质量很好，值得购买",
    "价格太贵了",
    "物流速度很快",
    "颜色和图片不符",
    "非常满意这次购物体验",
    "客服态度恶劣"
]

results = chinese_sentiment(product_reviews)
for review, result in zip(product_reviews, results):
    label = "👍" if 'positive' in result['label'].lower() or result['label'] == 'LABEL_1' else "👎"
    print(f"{label} {review}")

print("\\n🎉 中文情感分析演示完成！")`,language:"python",difficulty:"beginner",tags:["中文","情感分析","RoBERTa","Colab"],colabReady:!0}]},embedding:{name:{zh:"文本嵌入与相似度",ja:"テキスト埋め込みと類似度"},description:{zh:"语义搜索、文本相似度计算",ja:"セマンティック検索、テキスト類似度計算"},icon:P,gradient:"from-orange-500 to-amber-600",examples:[{id:"embedding-1",title:{zh:"语义相似度 - 找出相似文本",ja:"意味的類似度 - 類似テキストを見つける"},description:{zh:"计算文本之间的语义相似度",ja:"テキスト間の意味的類似度を計算"},code:`"""
============================================
语义相似度 - 找出相似文本
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 Sentence Transformers
============================================
"""

!pip install sentence-transformers -q

from sentence_transformers import SentenceTransformer, util

# 加载模型
print("正在加载语义模型...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ 模型加载完成！")

# 示例文本
sentences = [
    "I love programming in Python",
    "Python is my favorite programming language",
    "The weather is sunny today",
    "I enjoy coding with Python",
    "It's a beautiful day outside",
    "Machine learning is fascinating"
]

# 计算嵌入向量
print("\\n计算嵌入向量...")
embeddings = model.encode(sentences, convert_to_tensor=True)

print("\\n" + "="*60)
print("📊 文本相似度矩阵")
print("="*60)

# 计算相似度
cosine_scores = util.cos_sim(embeddings, embeddings)

# 显示结果
print("\\n文本列表:")
for i, s in enumerate(sentences):
    print(f"  [{i}] {s}")

print("\\n相似度矩阵 (相似度 > 0.5 高亮):")
print("      ", end="")
for i in range(len(sentences)):
    print(f"[{i}]   ", end="")
print()

for i in range(len(sentences)):
    print(f"[{i}]  ", end="")
    for j in range(len(sentences)):
        score = cosine_scores[i][j].item()
        if i == j:
            print(f"1.00  ", end="")
        elif score > 0.5:
            print(f"\\033[92m{score:.2f}\\033[0m  ", end="")  # 绿色高亮
        else:
            print(f"{score:.2f}  ", end="")
    print()

# 找出最相似的句子对
print("\\n" + "="*60)
print("🔍 最相似的句子对 (排除自身)")
print("="*60)

pairs = []
for i in range(len(sentences)):
    for j in range(i+1, len(sentences)):
        pairs.append({
            'i': i, 'j': j,
            'score': cosine_scores[i][j].item()
        })

pairs.sort(key=lambda x: x['score'], reverse=True)

for p in pairs[:3]:
    print(f"\\n相似度: {p['score']:.4f}")
    print(f"  文本1: {sentences[p['i']]}")
    print(f"  文本2: {sentences[p['j']]}")

print("\\n🎉 语义相似度演示完成！")`,language:"python",difficulty:"intermediate",tags:["Embedding","语义搜索","Sentence-BERT","Colab"],colabReady:!0},{id:"embedding-2",title:{zh:"语义搜索引擎",ja:"セマンティック検索エンジン"},description:{zh:"构建简单的语义搜索系统",ja:"シンプルなセマンティック検索システムを構築"},code:`"""
============================================
语义搜索引擎 - 找出最相关的文档
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 Sentence Transformers
============================================
"""

!pip install sentence-transformers -q

from sentence_transformers import SentenceTransformer, util
import torch

# 加载模型
print("正在加载语义模型...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ 模型加载完成！")

# 文档库
documents = [
    "Python is a popular programming language for AI and machine learning",
    "JavaScript is mainly used for web development and frontend applications",
    "Machine learning allows computers to learn from data",
    "Deep learning uses neural networks with many layers",
    "Natural language processing helps computers understand human language",
    "Computer vision enables machines to interpret visual information",
    "Reinforcement learning trains agents through rewards and penalties",
    "Transfer learning uses pre-trained models for new tasks",
    "Data preprocessing is essential before training ML models",
    "Model deployment puts trained models into production"
]

# 预计算文档嵌入
print("\\n预计算文档嵌入...")
doc_embeddings = model.encode(documents, convert_to_tensor=True)

def semantic_search(query, top_k=3):
    """语义搜索函数"""
    query_embedding = model.encode(query, convert_to_tensor=True)
    scores = util.cos_sim(query_embedding, doc_embeddings)[0]
    top_results = torch.topk(scores, k=top_k)

    results = []
    for score, idx in zip(top_results.values, top_results.indices):
        results.append({
            'document': documents[idx],
            'score': score.item()
        })
    return results

# 演示搜索
print("\\n" + "="*60)
print("🔍 语义搜索演示")
print("="*60)

queries = [
    "How can AI understand human text?",
    "What programming language should I learn for AI?",
    "How do neural networks work?",
    "How to use trained models?"
]

for query in queries:
    print(f"\\n❓ 查询: {query}")
    print("-"*50)
    results = semantic_search(query)
    for i, r in enumerate(results, 1):
        print(f"  {i}. [相关度: {r['score']:.4f}]")
        print(f"     {r['document']}")

print("\\n🎉 语义搜索引擎演示完成！")`,language:"python",difficulty:"intermediate",tags:["搜索","Embedding","语义匹配","Colab"],colabReady:!0}]},image:{name:{zh:"图像识别与分类",ja:"画像認識と分類"},description:{zh:"图像分类、物体检测",ja:"画像分類、物体検出"},icon:q,gradient:"from-pink-500 to-rose-600",examples:[{id:"image-1",title:{zh:"图像分类 - 识别图片内容",ja:"画像分類 - 画像の内容を識別"},description:{zh:"使用预训练模型识别图像",ja:"事前学習モデルを使用して画像を識別"},code:`"""
============================================
图像分类 - 识别图片内容
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用预训练的 ResNet/ViT 模型
============================================
"""

!pip install transformers torch pillow requests -q

from transformers import pipeline
from PIL import Image
import requests
from io import BytesIO

# 创建图像分类管道
print("正在加载图像分类模型...")
classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
print("✅ 模型加载完成！")

# 测试图片 URL
image_urls = [
    ("猫", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"),
    ("狗", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/1200px-YellowLabradorLooking_new.jpg"),
]

print("\\n" + "="*60)
print("🖼️ 图像分类结果")
print("="*60)

for name, url in image_urls:
    try:
        print(f"\\n正在分析: {name}")
        response = requests.get(url, timeout=10)
        image = Image.open(BytesIO(response.content))

        # 进行分类
        results = classifier(image)

        print(f"\\n📷 图片: {name}")
        print("-"*40)
        for r in results[:5]:
            bar = "█" * int(r['score'] * 20)
            print(f"  {r['label'][:30]:30} {bar} {r['score']:.2%}")
    except Exception as e:
        print(f"  ⚠️ 加载图片失败: {e}")

# 使用本地图片（如果有）
print("\\n" + "="*60)
print("💡 使用本地图片的方法:")
print("="*60)
print("""
from PIL import Image

# 方法1: 从文件加载
image = Image.open("your_image.jpg")
results = classifier(image)

# 方法2: 从 URL 加载
import requests
response = requests.get("https://example.com/image.jpg")
image = Image.open(BytesIO(response.content))
results = classifier(image)
""")

print("\\n🎉 图像分类演示完成！")`,language:"python",difficulty:"beginner",tags:["图像","Vision","ViT","Colab"],colabReady:!0},{id:"image-2",title:{zh:"MNIST 手写数字识别",ja:"MNIST 手書き数字認識"},description:{zh:"经典的手写数字识别入门项目",ja:"古典的な手書き数字認識入門プロジェクト"},code:`"""
============================================
MNIST 手写数字识别 - 深度学习入门
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 PyTorch 构建 CNN
============================================
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt

# 检查设备
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"使用设备: {device}")

# 数据预处理
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# 下载 MNIST 数据集
print("\\n正在下载 MNIST 数据集...")
train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000)

print(f"训练集: {len(train_dataset)} 样本")
print(f"测试集: {len(test_dataset)} 样本")

# 定义 CNN 模型
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.relu(self.conv2(x))
        x = torch.max_pool2d(x, 2)
        x = torch.flatten(x, 1)
        x = self.dropout(x)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# 创建模型
model = SimpleCNN().to(device)
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

print("\\n模型结构:")
print(model)

# 训练函数
def train_epoch(model, loader, optimizer, criterion):
    model.train()
    total_loss = 0
    correct = 0
    for data, target in loader:
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
        pred = output.argmax(dim=1)
        correct += pred.eq(target).sum().item()
    return total_loss / len(loader), correct / len(loader.dataset)

# 测试函数
def test(model, loader):
    model.eval()
    correct = 0
    with torch.no_grad():
        for data, target in loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
    return correct / len(loader.dataset)

# 训练模型
print("\\n开始训练...")
print("="*50)

epochs = 3  # 快速演示
for epoch in range(1, epochs + 1):
    train_loss, train_acc = train_epoch(model, train_loader, optimizer, criterion)
    test_acc = test(model, test_loader)
    print(f"Epoch {epoch}: 训练损失={train_loss:.4f}, 训练准确率={train_acc:.2%}, 测试准确率={test_acc:.2%}")

# 可视化预测结果
print("\\n" + "="*50)
print("🔍 预测示例")
print("="*50)

model.eval()
examples = enumerate(test_loader)
_, (example_data, example_targets) = next(examples)

with torch.no_grad():
    output = model(example_data[:10].to(device))
    predictions = output.argmax(dim=1).cpu()

print("\\n真实标签:", example_targets[:10].tolist())
print("预测结果:", predictions.tolist())
print("是否正确:", ["✓" if p == t else "✗" for p, t in zip(predictions, example_targets[:10])])

print("\\n🎉 MNIST 手写数字识别演示完成！")`,language:"python",difficulty:"intermediate",tags:["MNIST","CNN","PyTorch","Colab"],colabReady:!0}]},"ml-basics":{name:{zh:"机器学习基础",ja:"機械学習の基礎"},description:{zh:"Scikit-learn 经典算法实践",ja:"Scikit-learnによる古典的アルゴリズム実践"},icon:v,gradient:"from-violet-500 to-purple-600",examples:[{id:"ml-1",title:{zh:"分类算法对比",ja:"分類アルゴリズム比較"},description:{zh:"使用鸢尾花数据集对比多种分类算法",ja:"アヤメデータセットで複数の分類アルゴリズムを比較"},code:`"""
============================================
分类算法对比 - Scikit-learn 入门
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用经典的鸢尾花数据集
============================================
"""

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# 加载数据
print("正在加载鸢尾花数据集...")
iris = load_iris()
X, y = iris.data, iris.target

print(f"数据集大小: {X.shape[0]} 样本, {X.shape[1]} 特征")
print(f"类别: {iris.target_names}")
print(f"特征: {iris.feature_names}")

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 定义模型
models = {
    '逻辑回归': LogisticRegression(max_iter=200),
    '决策树': DecisionTreeClassifier(max_depth=5),
    '随机森林': RandomForestClassifier(n_estimators=100),
    'SVM': SVC(kernel='rbf'),
    'KNN': KNeighborsClassifier(n_neighbors=5)
}

print("\\n" + "="*60)
print("🔬 分类算法对比")
print("="*60)

results = []
for name, model in models.items():
    # 训练
    model.fit(X_train_scaled, y_train)

    # 测试准确率
    test_acc = model.score(X_test_scaled, y_test)

    # 交叉验证
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)

    results.append({
        'name': name,
        'test_acc': test_acc,
        'cv_mean': cv_scores.mean(),
        'cv_std': cv_scores.std()
    })

    bar = "█" * int(test_acc * 30)
    print(f"\\n{name:10}")
    print(f"  测试准确率: {bar} {test_acc:.2%}")
    print(f"  交叉验证:   {cv_scores.mean():.2%} (±{cv_scores.std():.2%})")

# 排名
print("\\n" + "="*60)
print("🏆 算法排名 (按测试准确率)")
print("="*60)

results.sort(key=lambda x: x['test_acc'], reverse=True)
for i, r in enumerate(results, 1):
    medal = ["🥇", "🥈", "🥉", "4.", "5."][i-1]
    print(f"{medal} {r['name']:12} - {r['test_acc']:.2%}")

print("\\n🎉 分类算法对比演示完成！")`,language:"python",difficulty:"beginner",tags:["分类","Scikit-learn","鸢尾花","Colab"],colabReady:!0},{id:"ml-2",title:{zh:"回归预测 - 房价预测",ja:"回帰予測 - 住宅価格予測"},description:{zh:"使用波士顿房价数据集学习回归算法",ja:"ボストン住宅価格データセットで回帰アルゴリズムを学ぶ"},code:`"""
============================================
回归预测 - 房价预测
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 California Housing 数据集
============================================
"""

from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 加载数据
print("正在加载 California Housing 数据集...")
housing = fetch_california_housing()
X, y = housing.data, housing.target

print(f"数据集大小: {X.shape[0]} 样本, {X.shape[1]} 特征")
print(f"特征: {housing.feature_names}")
print(f"目标: 房价中位数 (单位: $100,000)")

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 定义模型
models = {
    '线性回归': LinearRegression(),
    'Ridge回归': Ridge(alpha=1.0),
    'Lasso回归': Lasso(alpha=0.1),
    '随机森林': RandomForestRegressor(n_estimators=50, max_depth=10),
    '梯度提升': GradientBoostingRegressor(n_estimators=50, max_depth=5)
}

print("\\n" + "="*60)
print("📊 回归算法对比")
print("="*60)

results = []
for name, model in models.items():
    print(f"\\n训练 {name}...")

    # 训练
    model.fit(X_train_scaled, y_train)

    # 预测
    y_pred = model.predict(X_test_scaled)

    # 评估
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    results.append({
        'name': name,
        'rmse': rmse,
        'r2': r2
    })

    print(f"  RMSE: {rmse:.4f} ($100k)")
    print(f"  R²:   {r2:.4f}")

# 排名
print("\\n" + "="*60)
print("🏆 算法排名 (按 R² 分数)")
print("="*60)

results.sort(key=lambda x: x['r2'], reverse=True)
for i, r in enumerate(results, 1):
    medal = ["🥇", "🥈", "🥉", "4.", "5."][i-1]
    bar = "█" * int(r['r2'] * 20)
    print(f"{medal} {r['name']:12} R²={r['r2']:.4f} {bar}")

# 特征重要性（使用随机森林）
print("\\n" + "="*60)
print("📈 特征重要性 (随机森林)")
print("="*60)

rf_model = models['随机森林']
importances = rf_model.feature_importances_
indices = np.argsort(importances)[::-1]

for i, idx in enumerate(indices):
    bar = "█" * int(importances[idx] * 50)
    print(f"  {housing.feature_names[idx]:15} {bar} {importances[idx]:.3f}")

print("\\n🎉 回归预测演示完成！")`,language:"python",difficulty:"beginner",tags:["回归","预测","Scikit-learn","Colab"],colabReady:!0}]},neural:{name:{zh:"神经网络从零实现",ja:"ニューラルネットワークをゼロから実装"},description:{zh:"不使用框架，纯 NumPy 实现神经网络",ja:"フレームワークを使わず、NumPyだけでニューラルネットワークを実装"},icon:A,gradient:"from-cyan-500 to-blue-600",examples:[{id:"neural-1",title:{zh:"感知机 - 最简单的神经网络",ja:"パーセプトロン - 最もシンプルなニューラルネットワーク"},description:{zh:"用 NumPy 实现单层感知机",ja:"NumPyで単層パーセプトロンを実装"},code:`"""
============================================
感知机 - 最简单的神经网络
============================================
✅ Colab 可直接运行，无需 API Key
✅ 纯 NumPy 实现，理解神经网络原理
============================================
"""

import numpy as np
import matplotlib.pyplot as plt

# 设置随机种子
np.random.seed(42)

class Perceptron:
    """单层感知机"""

    def __init__(self, learning_rate=0.1):
        self.lr = learning_rate
        self.weights = None
        self.bias = None
        self.errors = []

    def activation(self, x):
        """阶跃激活函数"""
        return np.where(x >= 0, 1, 0)

    def fit(self, X, y, epochs=100):
        """训练感知机"""
        n_samples, n_features = X.shape

        # 初始化权重
        self.weights = np.random.randn(n_features) * 0.01
        self.bias = 0

        print("开始训练感知机...")
        print(f"样本数: {n_samples}, 特征数: {n_features}")
        print("-" * 40)

        for epoch in range(epochs):
            errors = 0
            for xi, yi in zip(X, y):
                # 前向传播
                linear_output = np.dot(xi, self.weights) + self.bias
                prediction = self.activation(linear_output)

                # 更新权重（如果预测错误）
                error = yi - prediction
                if error != 0:
                    self.weights += self.lr * error * xi
                    self.bias += self.lr * error
                    errors += 1

            self.errors.append(errors)

            # 每10轮或最后一轮打印
            if (epoch + 1) % 10 == 0 or epoch == 0:
                print(f"Epoch {epoch+1:3d}: 错误数 = {errors}")

            # 如果没有错误，提前停止
            if errors == 0:
                print(f"\\n✅ 在第 {epoch+1} 轮收敛！")
                break

        return self

    def predict(self, X):
        """预测"""
        linear_output = np.dot(X, self.weights) + self.bias
        return self.activation(linear_output)

# 创建 AND 门数据
print("\\n" + "="*50)
print("🔧 实现 AND 逻辑门")
print("="*50)

X_and = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_and = np.array([0, 0, 0, 1])  # AND 门

perceptron = Perceptron(learning_rate=0.1)
perceptron.fit(X_and, y_and, epochs=20)

print("\\n预测结果:")
print("输入    |  真实  | 预测")
print("-" * 30)
for xi, yi in zip(X_and, y_and):
    pred = perceptron.predict(xi.reshape(1, -1))[0]
    status = "✓" if pred == yi else "✗"
    print(f"{xi}  |   {yi}   |   {pred}  {status}")

# 创建 OR 门数据
print("\\n" + "="*50)
print("🔧 实现 OR 逻辑门")
print("="*50)

y_or = np.array([0, 1, 1, 1])  # OR 门

perceptron_or = Perceptron(learning_rate=0.1)
perceptron_or.fit(X_and, y_or, epochs=20)

print("\\n预测结果:")
print("输入    |  真实  | 预测")
print("-" * 30)
for xi, yi in zip(X_and, y_or):
    pred = perceptron_or.predict(xi.reshape(1, -1))[0]
    status = "✓" if pred == yi else "✗"
    print(f"{xi}  |   {yi}   |   {pred}  {status}")

print("\\n" + "="*50)
print("💡 感知机的局限性")
print("="*50)
print("感知机只能解决线性可分问题")
print("XOR 问题就无法用单层感知机解决")
print("这就是为什么我们需要多层神经网络！")

print("\\n🎉 感知机演示完成！")`,language:"python",difficulty:"intermediate",tags:["感知机","NumPy","神经网络","Colab"],colabReady:!0},{id:"neural-2",title:{zh:"多层神经网络 - 解决 XOR 问题",ja:"多層ニューラルネットワーク - XOR問題を解く"},description:{zh:"用 NumPy 实现带反向传播的神经网络",ja:"NumPyで逆伝播付きニューラルネットワークを実装"},code:`"""
============================================
多层神经网络 - 解决 XOR 问题
============================================
✅ Colab 可直接运行，无需 API Key
✅ 纯 NumPy 实现，包含反向传播
============================================
"""

import numpy as np

np.random.seed(42)

class NeuralNetwork:
    """多层神经网络（前馈 + 反向传播）"""

    def __init__(self, layer_sizes, learning_rate=0.5):
        """
        layer_sizes: 各层神经元数量，如 [2, 4, 1] 表示输入2，隐藏4，输出1
        """
        self.layer_sizes = layer_sizes
        self.lr = learning_rate
        self.weights = []
        self.biases = []

        # 初始化权重和偏置
        for i in range(len(layer_sizes) - 1):
            w = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * 0.5
            b = np.zeros((1, layer_sizes[i+1]))
            self.weights.append(w)
            self.biases.append(b)

    def sigmoid(self, x):
        """Sigmoid 激活函数"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def sigmoid_derivative(self, x):
        """Sigmoid 导数"""
        return x * (1 - x)

    def forward(self, X):
        """前向传播"""
        self.activations = [X]

        for i in range(len(self.weights)):
            z = np.dot(self.activations[-1], self.weights[i]) + self.biases[i]
            a = self.sigmoid(z)
            self.activations.append(a)

        return self.activations[-1]

    def backward(self, X, y):
        """反向传播"""
        m = X.shape[0]

        # 计算输出层误差
        error = y - self.activations[-1]
        deltas = [error * self.sigmoid_derivative(self.activations[-1])]

        # 反向计算每层的误差
        for i in range(len(self.weights) - 1, 0, -1):
            error = deltas[-1].dot(self.weights[i].T)
            delta = error * self.sigmoid_derivative(self.activations[i])
            deltas.append(delta)

        deltas.reverse()

        # 更新权重和偏置
        for i in range(len(self.weights)):
            self.weights[i] += self.lr * self.activations[i].T.dot(deltas[i]) / m
            self.biases[i] += self.lr * np.sum(deltas[i], axis=0, keepdims=True) / m

    def train(self, X, y, epochs=10000, print_every=1000):
        """训练网络"""
        print("开始训练多层神经网络...")
        print(f"网络结构: {self.layer_sizes}")
        print("-" * 50)

        for epoch in range(epochs):
            # 前向传播
            output = self.forward(X)

            # 反向传播
            self.backward(X, y)

            # 打印损失
            if (epoch + 1) % print_every == 0:
                loss = np.mean((y - output) ** 2)
                print(f"Epoch {epoch+1:5d}: Loss = {loss:.6f}")

        print("-" * 50)
        print("训练完成！")

    def predict(self, X):
        """预测"""
        return self.forward(X)

# XOR 问题
print("="*50)
print("🧠 解决 XOR 问题")
print("="*50)
print("XOR 真值表:")
print("0 XOR 0 = 0")
print("0 XOR 1 = 1")
print("1 XOR 0 = 1")
print("1 XOR 1 = 0")
print("="*50)

# 数据
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# 创建网络：2个输入，4个隐藏神经元，1个输出
nn = NeuralNetwork([2, 4, 1], learning_rate=1.0)

# 训练
nn.train(X, y, epochs=10000, print_every=2000)

# 预测
print("\\n预测结果:")
print("输入    |  真实  |  预测  | 四舍五入")
print("-" * 45)

predictions = nn.predict(X)
for xi, yi, pred in zip(X, y, predictions):
    rounded = 1 if pred[0] > 0.5 else 0
    status = "✓" if rounded == yi[0] else "✗"
    print(f"{xi}  |   {yi[0]}   | {pred[0]:.4f} |    {rounded}  {status}")

print("\\n" + "="*50)
print("💡 关键概念")
print("="*50)
print("1. 隐藏层让网络能学习非线性关系")
print("2. 反向传播计算每个权重对损失的贡献")
print("3. 梯度下降沿着损失减小的方向更新权重")
print("4. 这就是深度学习的基础！")

print("\\n🎉 多层神经网络演示完成！")`,language:"python",difficulty:"intermediate",tags:["神经网络","反向传播","NumPy","Colab"],colabReady:!0}]},"rag-local":{name:{zh:"本地 RAG 系统",ja:"ローカルRAGシステム"},description:{zh:"使用免费模型构建检索增强生成系统",ja:"無料モデルを使用した検索拡張生成システム"},icon:y,gradient:"from-teal-500 to-green-600",examples:[{id:"rag-1",title:{zh:"简单 RAG - 文档问答系统",ja:"シンプルRAG - 文書Q&Aシステム"},description:{zh:"基于向量检索的文档问答",ja:"ベクトル検索に基づく文書Q&A"},code:`"""
============================================
简单 RAG - 文档问答系统
============================================
✅ Colab 可直接运行，无需 API Key
✅ 使用 Sentence Transformers + 本地搜索
============================================
"""

!pip install sentence-transformers -q

from sentence_transformers import SentenceTransformer, util
import numpy as np

# 加载嵌入模型
print("正在加载嵌入模型...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ 模型加载完成！")

# 知识库（模拟文档）
knowledge_base = [
    {
        "title": "Python 简介",
        "content": "Python 是一种高级编程语言，以其简洁易读的语法著称。它支持多种编程范式，包括面向对象、函数式和过程式编程。Python 广泛应用于 Web 开发、数据分析、人工智能和科学计算等领域。"
    },
    {
        "title": "机器学习基础",
        "content": "机器学习是人工智能的一个分支，它使计算机能够从数据中学习并做出预测或决策。主要类型包括监督学习、无监督学习和强化学习。常用算法有线性回归、决策树、神经网络等。"
    },
    {
        "title": "深度学习介绍",
        "content": "深度学习是机器学习的子集，使用多层神经网络来学习数据的复杂表示。它在图像识别、自然语言处理和语音识别等领域取得了突破性进展。常见架构包括 CNN、RNN 和 Transformer。"
    },
    {
        "title": "自然语言处理",
        "content": "自然语言处理（NLP）是人工智能领域，专注于计算机与人类语言的交互。主要任务包括文本分类、命名实体识别、机器翻译、问答系统和文本生成。BERT 和 GPT 是当前最流行的 NLP 模型。"
    },
    {
        "title": "Transformer 架构",
        "content": "Transformer 是一种神经网络架构，由 Google 在 2017 年提出。它的核心是自注意力机制，能够并行处理序列数据。Transformer 是 BERT、GPT、T5 等模型的基础，revolutionized 了 NLP 领域。"
    }
]

# 预计算文档嵌入
print("\\n预计算文档嵌入...")
doc_texts = [doc["content"] for doc in knowledge_base]
doc_embeddings = embedder.encode(doc_texts, convert_to_tensor=True)

class SimpleRAG:
    """简单的 RAG 系统"""

    def __init__(self, embedder, documents, doc_embeddings):
        self.embedder = embedder
        self.documents = documents
        self.doc_embeddings = doc_embeddings

    def retrieve(self, query, top_k=2):
        """检索最相关的文档"""
        query_embedding = self.embedder.encode(query, convert_to_tensor=True)
        scores = util.cos_sim(query_embedding, self.doc_embeddings)[0]
        top_indices = scores.argsort(descending=True)[:top_k]

        results = []
        for idx in top_indices:
            results.append({
                'document': self.documents[idx.item()],
                'score': scores[idx.item()].item()
            })
        return results

    def answer(self, query):
        """基于检索结果回答问题"""
        # 检索相关文档
        retrieved = self.retrieve(query, top_k=2)

        # 构建上下文
        context = "\\n\\n".join([
            f"【{r['document']['title']}】\\n{r['document']['content']}"
            for r in retrieved
        ])

        # 这里我们只返回相关文档
        # 在实际应用中，会将 context + query 送入 LLM 生成答案
        return {
            'query': query,
            'retrieved_docs': retrieved,
            'context': context
        }

# 创建 RAG 系统
rag = SimpleRAG(embedder, knowledge_base, doc_embeddings)

# 测试查询
print("\\n" + "="*60)
print("🔍 RAG 文档问答演示")
print("="*60)

queries = [
    "什么是深度学习？",
    "Python 可以用来做什么？",
    "Transformer 是什么？",
    "机器学习有哪些类型？"
]

for query in queries:
    print(f"\\n❓ 问题: {query}")
    print("-"*50)

    result = rag.answer(query)

    print("📚 检索到的相关文档:")
    for i, doc in enumerate(result['retrieved_docs'], 1):
        print(f"\\n  [{i}] {doc['document']['title']} (相关度: {doc['score']:.4f})")
        print(f"      {doc['document']['content'][:100]}...")

print("\\n" + "="*60)
print("💡 RAG 工作流程")
print("="*60)
print("1. 用户提问")
print("2. 将问题转换为向量")
print("3. 在文档库中搜索相似向量")
print("4. 返回最相关的文档")
print("5. 将文档 + 问题送入 LLM 生成答案")

print("\\n🎉 RAG 文档问答演示完成！")`,language:"python",difficulty:"intermediate",tags:["RAG","检索","向量搜索","Colab"],colabReady:!0}]}},D=()=>{const f=_(),t=b(r=>r.language)==="ja"?"ja":"zh",[a,u]=o.useState("intro"),[l,p]=o.useState(0),[d,c]=o.useState(!1),g=Object.entries(m),s=m[a],i=s.examples[l],h=async()=>{await navigator.clipboard.writeText(i.code),c(!0),setTimeout(()=>c(!1),2e3)};return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",children:[e.jsx("header",{className:"bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 py-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("button",{onClick:()=>f("/"),className:"flex items-center gap-2 text-white/60 hover:text-white transition-colors",children:[e.jsx(X,{size:18}),e.jsx(N,{size:14}),e.jsx("span",{className:"text-sm",children:t==="ja"?"ホーム":"首页"})]}),e.jsxs("h1",{className:"text-lg font-bold text-white flex items-center gap-2",children:[e.jsx(z,{size:20,className:"text-purple-400"}),t==="ja"?"AI コード実践":"AI 代码实战"]}),e.jsx("div",{className:"text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full",children:"✅ Colab Ready"})]})})}),e.jsxs("div",{className:"max-w-7xl mx-auto px-4 py-6",children:[e.jsx("div",{className:"mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(C,{className:"text-emerald-400 flex-shrink-0 mt-0.5",size:20}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-emerald-400",children:t==="ja"?"全てのコードは Colab で直接実行可能":"所有代码均可在 Colab 中直接运行"}),e.jsx("p",{className:"text-sm text-slate-400 mt-1",children:t==="ja"?"APIキー不要！Hugging Face の無料モデルと scikit-learn を使用。コードをコピーして Colab に貼り付けるだけ。":"无需 API Key！使用 Hugging Face 免费模型和 scikit-learn。复制代码粘贴到 Colab 即可运行。"})]})]})}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-6",children:[e.jsx("aside",{className:"lg:w-72 flex-shrink-0",children:e.jsxs("div",{className:"bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 sticky top-20",children:[e.jsxs("h2",{className:"font-semibold text-white mb-4 flex items-center gap-2",children:[e.jsx(k,{size:18,className:"text-purple-400"}),t==="ja"?"カテゴリ":"分类"]}),e.jsx("nav",{className:"space-y-1",children:g.map(([r,n])=>e.jsxs("button",{onClick:()=>{u(r),p(0)},className:`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${a===r?"bg-white/10 border border-white/20":"hover:bg-white/5 border border-transparent"}`,children:[e.jsx("div",{className:`p-1.5 rounded-lg bg-gradient-to-br ${n.gradient}`,children:e.jsx(n.icon,{size:14,className:"text-white"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:`text-sm font-medium truncate ${a===r?"text-white":"text-slate-300"}`,children:n.name[t]}),e.jsxs("div",{className:"text-xs text-slate-500",children:[n.examples.length," ",t==="ja"?"例":"个示例"]})]})]},r))})]})}),e.jsxs("main",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"mb-6",children:e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:`p-2 rounded-xl bg-gradient-to-br ${s.gradient}`,children:e.jsx(s.icon,{size:24,className:"text-white"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold text-white",children:s.name[t]}),e.jsx("p",{className:"text-sm text-slate-400",children:s.description[t]})]})]})}),e.jsx("div",{className:"flex gap-2 mb-4 overflow-x-auto pb-2",children:s.examples.map((r,n)=>e.jsx("button",{onClick:()=>p(n),className:`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${l===n?"bg-white/10 text-white border border-white/20":"text-slate-400 hover:text-white hover:bg-white/5"}`,children:r.title[t]},r.id))}),e.jsxs("div",{className:"bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:`px-2 py-0.5 rounded text-xs font-medium ${i.difficulty==="beginner"?"bg-green-500/20 text-green-400":i.difficulty==="intermediate"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}`,children:i.difficulty==="beginner"?t==="ja"?"初級":"入门":i.difficulty==="intermediate"?t==="ja"?"中級":"中级":t==="ja"?"上級":"高级"}),i.colabReady&&e.jsx("span",{className:"px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400",children:"✅ Colab Ready"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:h,className:"flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors",children:[d?e.jsx(R,{size:14,className:"text-green-400"}):e.jsx(L,{size:14}),d?t==="ja"?"コピー済み":"已复制":t==="ja"?"コピー":"复制"]}),e.jsxs("a",{href:"https://colab.research.google.com/",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg transition-colors",children:[e.jsx(I,{size:14}),t==="ja"?"Colabで開く":"在 Colab 中运行"]})]})]}),e.jsxs("div",{className:"px-4 py-3 border-b border-white/10 bg-slate-800/50",children:[e.jsx("p",{className:"text-sm text-slate-300",children:i.description[t]}),e.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:i.tags.map(r=>e.jsx("span",{className:"px-2 py-0.5 text-xs bg-white/10 text-slate-400 rounded",children:r},r))})]}),e.jsx("div",{className:"relative",children:e.jsx("pre",{className:"p-4 overflow-x-auto text-sm leading-relaxed max-h-[600px] overflow-y-auto",children:e.jsx("code",{className:"text-slate-300 font-mono whitespace-pre",children:i.code})})})]}),e.jsxs("div",{className:"mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl",children:[e.jsxs("h3",{className:"font-semibold text-blue-400 mb-2 flex items-center gap-2",children:[e.jsx(T,{size:16}),t==="ja"?"実行方法":"运行方法"]}),e.jsxs("ol",{className:"text-sm text-slate-400 space-y-1 list-decimal list-inside",children:[e.jsx("li",{children:t==="ja"?"コードをコピー":"复制代码"}),e.jsxs("li",{children:[t==="ja"?"Google Colab を開く":"打开 Google Colab"," (colab.research.google.com)"]}),e.jsx("li",{children:t==="ja"?"新しいノートブックを作成":"新建笔记本"}),e.jsx("li",{children:t==="ja"?"コードを貼り付けて実行":"粘贴代码并运行"})]})]})]})]})]})]})};export{D as default};

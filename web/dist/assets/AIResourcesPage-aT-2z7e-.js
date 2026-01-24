import{c as E,u as F,g as R,r as g,j as e,B as T,G as U,n as H,o as _,C as x,p as k,m as B}from"./index-C6rNVC4f.js";import{X as K}from"./x-CfqPSX6y.js";import{M as q}from"./menu-MB-_K8Hn.js";import{H as X}from"./house-CDyYd-Q8.js";import{C as j}from"./circle-check-BLJwdBtm.js";import{C as $}from"./copy-kVLU2Mff.js";const W=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],C=E("external-link",W),V={id:"frameworks",title:"AI 框架",gradient:"from-blue-500 to-cyan-500",description:"深度学习和机器学习的核心开发框架",items:[{name:"PyTorch",url:"https://pytorch.org",tagline:"Meta 开源，研究领域首选的深度学习框架",description:"PyTorch 是由 Meta AI 开发的开源深度学习框架，以其动态计算图（Define-by-Run）而闻名。它提供了灵活的张量计算和自动微分功能，深受研究人员喜爱。目前在学术论文中使用率超过 80%，是 AI 研究的事实标准。",features:["动态计算图，调试方便","TorchScript 支持生产部署","torchvision/torchaudio/torchtext 生态","CUDA 加速，多 GPU 训练","活跃的社区和丰富的预训练模型"],useCases:["学术研究和论文复现","计算机视觉","自然语言处理","强化学习","生成模型"],pros:["代码直观，像写 Python 一样","调试体验好","社区活跃","Hugging Face 集成"],cons:["生产部署相对复杂","移动端支持不如 TF","分布式配置繁琐"],difficulty:"intermediate",pricing:"完全免费开源",tutorial:[{step:1,title:"安装 PyTorch",content:"访问 pytorch.org 选择你的系统配置，获取安装命令。推荐使用 conda 或 pip 安装。",code:`# CPU 版本
pip install torch torchvision torchaudio

# GPU 版本 (CUDA 12.1)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121`},{step:2,title:"验证安装",content:"检查 PyTorch 是否正确安装，以及 GPU 是否可用。",code:`import torch
print(f"PyTorch 版本: {torch.__version__}")
print(f"CUDA 可用: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")`},{step:3,title:"张量基础操作",content:"PyTorch 的核心是张量（Tensor），类似于 NumPy 数组但支持 GPU 加速。",code:`# 创建张量
x = torch.randn(3, 4)  # 随机张量
y = torch.zeros(3, 4)  # 全零张量
z = torch.ones(3, 4)   # 全一张量

# 张量运算
result = x + y
result = torch.matmul(x, x.T)  # 矩阵乘法

# 移动到 GPU
if torch.cuda.is_available():
    x = x.cuda()`},{step:4,title:"构建神经网络",content:"使用 torch.nn 模块构建神经网络。继承 nn.Module 类定义模型。",code:`import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleNN()`},{step:5,title:"训练循环",content:"定义损失函数和优化器，编写训练循环。",code:`criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for batch_x, batch_y in dataloader:
        optimizer.zero_grad()           # 清空梯度
        outputs = model(batch_x)         # 前向传播
        loss = criterion(outputs, batch_y)
        loss.backward()                  # 反向传播
        optimizer.step()                 # 更新参数
    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`}],codeExamples:[{title:"图像分类（使用预训练模型）",description:"使用 torchvision 的预训练 ResNet 进行图像分类",code:`import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# 加载预训练模型
model = models.resnet50(pretrained=True)
model.eval()

# 图像预处理
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# 推理
img = Image.open("cat.jpg")
input_tensor = transform(img).unsqueeze(0)
with torch.no_grad():
    output = model(input_tensor)
    pred = output.argmax(dim=1)`},{title:"保存和加载模型",description:"模型持久化的两种方式",code:`# 方式1：只保存参数（推荐）
torch.save(model.state_dict(), "model.pth")

# 加载参数
model = SimpleNN()
model.load_state_dict(torch.load("model.pth"))

# 方式2：保存整个模型
torch.save(model, "full_model.pth")
model = torch.load("full_model.pth")`},{title:"使用 DataLoader",description:"高效加载和批处理数据",code:`from torch.utils.data import DataLoader, Dataset

class MyDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

dataset = MyDataset(X, y)
loader = DataLoader(
    dataset, 
    batch_size=32, 
    shuffle=True,
    num_workers=4
)`}],tips:["使用 model.eval() 和 torch.no_grad() 进行推理，可以节省内存并加速","遇到显存不足时，减小 batch_size 或使用 gradient accumulation","使用 torch.cuda.amp 进行混合精度训练，可以加速训练并减少显存占用",'DataLoader 的 num_workers > 0 可以加速数据加载，但在 Windows 上可能需要 if __name__ == "__main__"',"使用 torchinfo 库可以方便地查看模型结构和参数量"],resources:[{name:"PyTorch 官方教程",url:"https://pytorch.org/tutorials/",type:"official"},{name:"60分钟入门",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"tutorial"},{name:"PyTorch 官方示例",url:"https://github.com/pytorch/examples",type:"official"}]},{name:"TensorFlow",url:"https://tensorflow.org",tagline:"Google 开源，生产部署最成熟的 ML 平台",description:"TensorFlow 是 Google 开发的端到端机器学习平台，提供从研究到生产的完整工具链。TF 2.x 版本采用 Keras 作为高级 API，大幅简化了使用体验。",features:["Keras 高级 API","TensorBoard 可视化","TF Lite 移动端","TF Serving 部署","SavedModel 格式"],useCases:["大规模生产系统","移动端 AI","浏览器 ML","Google Cloud","推荐系统"],pros:["部署生态完善","跨平台好","Google 维护","企业级支持"],cons:["学习曲线陡","调试不如 PyTorch","API 变化多"],difficulty:"intermediate",pricing:"完全免费开源",tutorial:[{step:1,title:"安装 TensorFlow",content:"使用 pip 安装 TensorFlow。GPU 版本会自动检测 CUDA。",code:`# 安装（自动支持 GPU）
pip install tensorflow

# 验证安装
import tensorflow as tf
print(f"TensorFlow 版本: {tf.__version__}")
print(f"GPU 可用: {len(tf.config.list_physical_devices('GPU')) > 0}")`},{step:2,title:"使用 Keras Sequential API",content:"最简单的方式构建模型，适合线性堆叠的网络。",code:`from tensorflow import keras
from keras import layers

model = keras.Sequential([
    layers.Dense(128, activation="relu", input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(64, activation="relu"),
    layers.Dense(10, activation="softmax")
])

model.summary()`},{step:3,title:"编译和训练模型",content:"指定优化器、损失函数和评估指标，然后训练。",code:`model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=3),
        keras.callbacks.TensorBoard(log_dir="./logs")
    ]
)`},{step:4,title:"使用 TensorBoard 可视化",content:"训练过程可视化是 TensorFlow 的一大优势。",code:`# 在训练时添加 TensorBoard callback（见上一步）

# 启动 TensorBoard
# 终端运行: tensorboard --logdir=./logs
# 浏览器访问: http://localhost:6006`},{step:5,title:"保存和加载模型",content:"TensorFlow 提供多种模型保存格式。",code:`# SavedModel 格式（推荐，完整保存）
model.save("my_model")  # 保存为目录
loaded = keras.models.load_model("my_model")

# H5 格式
model.save("model.h5")
loaded = keras.models.load_model("model.h5")

# 只保存权重
model.save_weights("weights.h5")
model.load_weights("weights.h5")`}],codeExamples:[{title:"Functional API 构建复杂模型",description:"适合有多输入/多输出或共享层的模型",code:`inputs = keras.Input(shape=(784,))
x = layers.Dense(128, activation="relu")(inputs)
x = layers.Dense(64, activation="relu")(x)
outputs = layers.Dense(10, activation="softmax")(x)

model = keras.Model(inputs=inputs, outputs=outputs)`},{title:"自定义训练循环",description:"更灵活的训练控制",code:`@tf.function
def train_step(x, y):
    with tf.GradientTape() as tape:
        predictions = model(x, training=True)
        loss = loss_fn(y, predictions)
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss`}],tips:["使用 @tf.function 装饰器可以将 Python 函数编译为计算图，显著提升性能","TensorFlow 2.x 默认开启 Eager Execution，调试更方便","使用 tf.data.Dataset 可以构建高效的数据输入管道","TensorFlow Lite 可以将模型部署到移动端和嵌入式设备"],resources:[{name:"TensorFlow 官方教程",url:"https://tensorflow.org/tutorials",type:"official"},{name:"Keras 官方文档",url:"https://keras.io",type:"official"},{name:"TensorFlow 官方认证",url:"https://tensorflow.org/certificate",type:"official"}]},{name:"scikit-learn",url:"https://scikit-learn.org",tagline:"传统机器学习库，数据科学必备工具",description:"scikit-learn 是 Python 中最流行的传统机器学习库，提供分类、回归、聚类、降维等算法的统一接口。对于表格数据和传统 ML 任务，它仍是首选工具。",features:["统一的 fit/predict API","丰富的 ML 算法","数据预处理工具","模型评估和选择","Pipeline 流水线"],useCases:["表格数据分析","特征工程","模型基线","数据预处理","A/B 测试"],pros:["API 设计优雅统一","文档和示例丰富","稳定可靠","与 pandas 集成"],cons:["不支持深度学习","不支持 GPU","大数据集性能受限"],difficulty:"beginner",pricing:"完全免费开源",tutorial:[{step:1,title:"安装 scikit-learn",content:"使用 pip 安装，通常与 numpy、pandas 一起使用。",code:`pip install scikit-learn pandas numpy matplotlib

# 验证安装
import sklearn
print(f"scikit-learn 版本: {sklearn.__version__}")`},{step:2,title:"数据加载和分割",content:"sklearn 提供了示例数据集和数据分割工具。",code:`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# 加载数据
iris = load_iris()
X, y = iris.data, iris.target

# 分割训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`},{step:3,title:"训练模型",content:"所有模型都使用统一的 fit/predict 接口。",code:`from sklearn.ensemble import RandomForestClassifier

# 创建模型
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 训练
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)`},{step:4,title:"模型评估",content:"使用多种指标评估模型性能。",code:`from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 准确率
print(f"准确率: {accuracy_score(y_test, y_pred):.4f}")

# 详细报告
print(classification_report(y_test, y_pred))

# 混淆矩阵
print(confusion_matrix(y_test, y_pred))`},{step:5,title:"使用 Pipeline",content:"Pipeline 可以将预处理和模型训练组合成一个流程。",code:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# 创建流水线
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", RandomForestClassifier())
])

# 一步完成预处理和训练
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`}],codeExamples:[{title:"交叉验证",description:"使用 K 折交叉验证评估模型稳定性",code:`from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
print(f"交叉验证准确率: {scores.mean():.4f} (+/- {scores.std()*2:.4f})")`},{title:"网格搜索调参",description:"自动搜索最佳超参数",code:`from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [None, 10, 20]
}

grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid_search.fit(X_train, y_train)
print(f"最佳参数: {grid_search.best_params_}")`},{title:"特征重要性",description:"查看哪些特征对预测最重要",code:`import pandas as pd

importance = pd.DataFrame({
    "feature": iris.feature_names,
    "importance": model.feature_importances_
}).sort_values("importance", ascending=False)
print(importance)`}],tips:["始终在训练前对数据进行标准化（StandardScaler）或归一化（MinMaxScaler）","使用 Pipeline 可以避免数据泄露，确保预处理只在训练集上拟合",'对于不平衡数据集，使用 class_weight="balanced" 或 SMOTE 过采样',"使用 joblib.dump() 保存模型比 pickle 更高效"],resources:[{name:"sklearn 官方用户指南",url:"https://scikit-learn.org/stable/user_guide.html",type:"official"},{name:"sklearn 官方示例",url:"https://scikit-learn.org/stable/auto_examples/",type:"tutorial"}]}]},J={id:"llm-tools",title:"LLM 开发工具",gradient:"from-violet-500 to-purple-500",description:"大语言模型应用开发框架和工具",items:[{name:"LangChain",url:"https://langchain.com",tagline:"LLM 应用开发框架，链式调用和 Agent 首选",description:"LangChain 是构建 LLM 应用的主流框架，提供了链（Chain）、代理（Agent）、记忆（Memory）等抽象，是开发 ChatGPT 类应用的瑞士军刀。",features:["Chain 链式调用","Agent 自主决策","Memory 对话记忆","RAG 检索增强","100+ 集成"],useCases:["聊天机器人","RAG 问答","文档分析","Agent 自动化","LLM 应用"],pros:["生态丰富","社区活跃","文档丰富","LangSmith 可观测"],cons:["抽象层多","API 不稳定","过度封装"],difficulty:"intermediate",pricing:"开源免费，LangSmith 有付费版",tutorial:[{step:1,title:"安装 LangChain",content:"LangChain 分为核心包和集成包，按需安装。",code:`# 核心包
pip install langchain langchain-core

# OpenAI 集成
pip install langchain-openai

# Anthropic 集成
pip install langchain-anthropic

# 设置 API Key
export OPENAI_API_KEY="your-key"`},{step:2,title:"基础对话",content:"使用 ChatModel 进行基础对话。",code:`from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

# 创建模型
llm = ChatOpenAI(model="gpt-4o-mini")

# 发送消息
messages = [
    SystemMessage(content="你是一个有帮助的助手"),
    HumanMessage(content="你好！")
]
response = llm.invoke(messages)
print(response.content)`},{step:3,title:"使用 Prompt Template",content:"模板化 Prompt 可以更好地管理和复用。",code:`from langchain_core.prompts import ChatPromptTemplate

# 创建模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}，擅长{skill}"),
    ("human", "{input}")
])

# 创建链
chain = prompt | llm

# 调用
response = chain.invoke({
    "role": "Python专家",
    "skill": "代码优化",
    "input": "如何优化这段代码？"
})`},{step:4,title:"构建 RAG 应用",content:"RAG（检索增强生成）是 LLM 应用的核心场景。",code:`from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

# 1. 加载文档
loader = TextLoader("document.txt")
docs = loader.load()

# 2. 分割文档
splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = splitter.split_documents(docs)

# 3. 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(chunks, embeddings)

# 4. 检索
retriever = vectorstore.as_retriever()
results = retriever.invoke("相关问题")`},{step:5,title:"创建 Agent",content:"Agent 可以自主决定使用哪些工具来完成任务。",code:`from langchain.agents import create_react_agent, AgentExecutor
from langchain_community.tools import DuckDuckGoSearchRun
from langchain import hub

# 定义工具
tools = [DuckDuckGoSearchRun()]

# 获取 Prompt
prompt = hub.pull("hwchase17/react")

# 创建 Agent
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools)

# 执行
result = agent_executor.invoke({"input": "今天的新闻有什么？"})`}],codeExamples:[{title:"带记忆的对话",description:"使用 Memory 保持对话上下文",code:`from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
chain = ConversationChain(llm=llm, memory=memory)

chain.invoke({"input": "我叫小明"})
chain.invoke({"input": "我叫什么？"})  # 会记住名字`},{title:"流式输出",description:"实时获取 LLM 的输出",code:`for chunk in llm.stream("给我讲个故事"):
    print(chunk.content, end="", flush=True)`}],tips:["使用 LCEL（LangChain Expression Language）构建链，代码更简洁：chain = prompt | llm | parser","对于生产环境，使用 LangSmith 进行追踪和调试","合理设置 chunk_size 和 chunk_overlap 对 RAG 效果影响很大","使用 RunnablePassthrough 和 RunnableLambda 处理复杂的数据流"],resources:[{name:"LangChain 官方文档",url:"https://python.langchain.com/docs/",type:"official"},{name:"LangChain 模板",url:"https://github.com/langchain-ai/langchain/tree/master/templates",type:"tutorial"}]},{name:"Ollama",url:"https://ollama.com",tagline:"本地运行开源 LLM，一键部署，隐私保护",description:"Ollama 让你在本地轻松运行 Llama、Mistral、Gemma 等开源模型。一条命令即可下载运行，适合隐私敏感场景和离线使用。",features:["一键安装","50+ 模型","OpenAI 兼容 API","多平台支持","Modelfile 自定义"],useCases:["本地开发","隐私场景","离线 AI","模型实验","成本节省"],pros:["极简体验","无需 API Key","数据本地","完全免费"],cons:["需要好硬件","能力不如 GPT-4","显存要求高"],difficulty:"beginner",pricing:"完全免费",tutorial:[{step:1,title:"安装 Ollama",content:"访问 ollama.com 下载安装包，支持 macOS、Linux、Windows。",code:`# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# 或从官网下载安装包
# https://ollama.com/download`},{step:2,title:"下载并运行模型",content:"使用 ollama run 命令下载并启动模型。",code:`# 运行 Llama 3.2（推荐入门）
ollama run llama3.2

# 运行其他模型
ollama run mistral
ollama run gemma2
ollama run codellama  # 代码专用

# 查看已下载的模型
ollama list`},{step:3,title:"使用 API",content:"Ollama 提供 REST API，兼容 OpenAI 格式。",code:`# 生成文本
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "为什么天空是蓝色的？"
}'

# 对话模式
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "你好"}]
}'`},{step:4,title:"Python 集成",content:"使用 ollama 库或 OpenAI 库调用。",code:`# 方式1：ollama 库
pip install ollama

import ollama
response = ollama.chat(model="llama3.2", messages=[
    {"role": "user", "content": "你好"}
])
print(response["message"]["content"])

# 方式2：OpenAI 兼容（推荐）
from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "你好"}]
)`},{step:5,title:"自定义模型",content:"使用 Modelfile 自定义模型参数和系统提示。",code:`# 创建 Modelfile
FROM llama3.2
SYSTEM 你是一个专业的Python编程助手
PARAMETER temperature 0.7

# 构建自定义模型
ollama create my-assistant -f Modelfile

# 使用自定义模型
ollama run my-assistant`}],codeExamples:[{title:"LangChain 集成",description:"在 LangChain 中使用 Ollama",code:`from langchain_community.llms import Ollama

llm = Ollama(model="llama3.2")
response = llm.invoke("写一首关于春天的诗")`},{title:"流式输出",description:"实时获取生成结果",code:`import ollama

for chunk in ollama.chat(
    model="llama3.2",
    messages=[{"role": "user", "content": "讲个故事"}],
    stream=True
):
    print(chunk["message"]["content"], end="")`}],tips:["8GB 显存可以运行 7B 参数模型，16GB 可以运行 13B","使用 ollama pull 预先下载模型，避免首次运行等待","设置 OLLAMA_HOST=0.0.0.0 可以在局域网内共享服务","Modelfile 中的 PARAMETER num_ctx 可以调整上下文长度"],resources:[{name:"Ollama 官方文档",url:"https://github.com/ollama/ollama",type:"official"},{name:"Ollama 模型库",url:"https://ollama.com/library",type:"official"}]}]},Y={id:"platforms",title:"AI 平台与 API",gradient:"from-emerald-500 to-green-500",description:"主流 AI 服务提供商和 API 平台",items:[{name:"OpenAI API",url:"https://platform.openai.com",tagline:"GPT-4/ChatGPT 官方 API，AI 应用首选",description:"OpenAI 提供 GPT-4、GPT-4o、DALL-E、Whisper 等模型的 API 服务。作为 AI 领域的领导者，其模型在多数任务上表现最优。",features:["GPT-4o 多模态","Function Calling","JSON 模式","Vision","Assistants API"],useCases:["智能对话","代码生成","内容创作","数据分析","多模态应用"],pros:["模型能力最强","API 设计成熟","生态丰富","持续更新"],cons:["成本较高","数据隐私","速率限制"],difficulty:"beginner",pricing:"GPT-4o: $2.5/1M tokens 输入",tutorial:[{step:1,title:"获取 API Key",content:"注册 OpenAI 账户，在 platform.openai.com 创建 API Key。",code:`# 1. 访问 https://platform.openai.com/api-keys
# 2. 点击 "Create new secret key"
# 3. 复制并保存 Key（只显示一次）

# 设置环境变量
export OPENAI_API_KEY="sk-..."`},{step:2,title:"安装和基础使用",content:"安装 openai 库并进行基础调用。",code:`pip install openai

from openai import OpenAI

client = OpenAI()  # 自动读取环境变量

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手"},
        {"role": "user", "content": "你好！"}
    ]
)

print(response.choices[0].message.content)`},{step:3,title:"使用 Function Calling",content:"Function Calling 让模型调用你定义的函数，实现结构化输出。",code:`tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名"}
            },
            "required": ["city"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "北京天气如何？"}],
    tools=tools
)

# 解析函数调用
tool_call = response.choices[0].message.tool_calls[0]
print(tool_call.function.name)  # get_weather
print(tool_call.function.arguments)  # {"city": "北京"}`},{step:4,title:"流式输出",content:"使用流式 API 实现打字机效果。",code:`stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "讲一个故事"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`},{step:5,title:"图像理解（Vision）",content:"GPT-4o 支持图像输入，可以理解和分析图片。",code:`import base64

# 方式1：URL
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "描述这张图片"},
            {"type": "image_url", "image_url": {"url": "https://..."}}
        ]
    }]
)

# 方式2：Base64
with open("image.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
# 然后使用 data:image/jpeg;base64,{b64}`}],codeExamples:[{title:"JSON 模式",description:"强制模型返回有效的 JSON",code:`response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={"type": "json_object"},
    messages=[{
        "role": "user",
        "content": "以JSON格式返回三种水果及其颜色"
    }]
)`},{title:"嵌入向量",description:"生成文本的向量表示，用于语义搜索",code:`response = client.embeddings.create(
    model="text-embedding-3-small",
    input="这是一段文本"
)
vector = response.data[0].embedding  # 1536维向量`}],tips:["使用 gpt-4o-mini 进行开发测试，成本更低","设置 max_tokens 限制输出长度，避免意外高消费",'使用 response_format={"type": "json_object"} 获取结构化输出',"批量请求使用 Batch API 可以节省 50% 成本"],resources:[{name:"OpenAI API 文档",url:"https://platform.openai.com/docs",type:"official"},{name:"OpenAI Cookbook",url:"https://cookbook.openai.com",type:"tutorial"}]},{name:"Anthropic Claude",url:"https://anthropic.com",tagline:"Claude 系列，长文本和安全性领先",description:"Anthropic 的 Claude 以安全性和长上下文闻名。Claude 3.5 Sonnet 在多项基准上表现优秀，支持 200K 上下文窗口。",features:["200K 超长上下文","Artifacts 可视化","Computer Use","AI 安全","Claude Code"],useCases:["长文档分析","代码开发","学术研究","内容写作","复杂推理"],pros:["长文本强","质量高","安全性好","幻觉率低"],cons:["价格不便宜","某些国家不可用"],difficulty:"beginner",pricing:"Sonnet: $3/1M tokens 输入",tutorial:[{step:1,title:"获取 API Key",content:"在 Anthropic Console 创建账户并获取 API Key。",code:`# 1. 访问 https://console.anthropic.com
# 2. 创建账户并添加付款方式
# 3. 在 API Keys 页面创建新 Key

export ANTHROPIC_API_KEY="sk-ant-..."`},{step:2,title:"安装和基础使用",content:"安装 anthropic 库并进行调用。",code:`pip install anthropic

from anthropic import Anthropic

client = Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "你好！介绍一下你自己"}
    ]
)

print(message.content[0].text)`},{step:3,title:"使用 System Prompt",content:"设置系统提示词来定制 Claude 的行为。",code:`message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="你是一个专业的Python编程导师，用简洁清晰的方式解释代码概念。",
    messages=[
        {"role": "user", "content": "解释什么是装饰器？"}
    ]
)`},{step:4,title:"流式输出",content:"使用流式 API 实时获取响应。",code:`with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "写一首诗"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`},{step:5,title:"图像理解",content:"Claude 3 支持图像输入分析。",code:`import base64

with open("image.jpg", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": image_data
                }
            },
            {"type": "text", "text": "描述这张图片"}
        ]
    }]
)`}],codeExamples:[{title:"多轮对话",description:"保持对话上下文",code:`messages = []

# 第一轮
messages.append({"role": "user", "content": "我叫小明"})
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=256,
    messages=messages
)
messages.append({"role": "assistant", "content": response.content[0].text})

# 第二轮
messages.append({"role": "user", "content": "我叫什么？"})
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=256,
    messages=messages
)`},{title:"Tool Use",description:"Claude 的函数调用功能",code:`tools = [{
    "name": "get_weather",
    "description": "获取城市天气",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {"type": "string"}
        },
        "required": ["city"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "北京天气如何"}]
)`}],tips:["Claude 擅长长文档分析，可以一次性处理整本书","使用 XML 标签组织 Prompt 效果更好：<context>...</context>","Claude 3.5 Sonnet 是性价比最高的选择","设置合理的 max_tokens 避免输出被截断"],resources:[{name:"Anthropic API 文档",url:"https://docs.anthropic.com",type:"official"},{name:"Claude Prompt 设计指南",url:"https://docs.anthropic.com/claude/docs/prompt-engineering",type:"tutorial"}]}]},Q={id:"learning",title:"学习资源",gradient:"from-amber-500 to-orange-500",description:"AI/ML 学习课程和模型资源库",items:[{name:"Hugging Face",url:"https://huggingface.co",tagline:"AI 社区的 GitHub，模型和数据集中心",description:"Hugging Face 是 AI 领域最大的开源社区，托管了 50万+ 模型、10万+ 数据集。它提供了 Transformers 库、Spaces 应用托管等服务。",features:["50万+ 模型","10万+ 数据集","Spaces 应用托管","Inference API","模型卡片文档"],useCases:["下载预训练模型","托管 AI 应用","分享数据集","模型微调","社区交流"],pros:["资源最丰富","社区活跃","免费使用","文档完善"],cons:["大模型下载慢","部分资源需付费"],difficulty:"beginner",pricing:"基础免费，Pro $9/月",tutorial:[{step:1,title:"创建账户",content:"访问 huggingface.co 注册账户，可以使用 GitHub 登录。",code:`# 1. 访问 https://huggingface.co/join
# 2. 注册账户
# 3. 获取 Access Token: Settings -> Access Tokens`},{step:2,title:"安装 Hugging Face Hub",content:"使用 huggingface_hub 库管理模型和数据集。",code:`pip install huggingface_hub

# 登录（可选，下载私有模型需要）
huggingface-cli login
# 或在代码中
from huggingface_hub import login
login(token="hf_...")`},{step:3,title:"使用 Transformers 加载模型",content:"一行代码加载任意预训练模型。",code:`from transformers import pipeline

# 文本分类
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.99}]

# 文本生成
generator = pipeline("text-generation", model="gpt2")
text = generator("Hello, I am", max_length=50)

# 问答
qa = pipeline("question-answering")
qa(question="What is AI?", context="AI is artificial intelligence...")`},{step:4,title:"下载特定模型",content:"直接加载 Hub 上的模型。",code:`from transformers import AutoModel, AutoTokenizer

# 加载 BERT 中文模型
tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
model = AutoModel.from_pretrained("bert-base-chinese")

# 加载 LLM
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2-7B-Instruct",
    torch_dtype="auto",
    device_map="auto"
)`},{step:5,title:"使用 Datasets 加载数据",content:"datasets 库可以轻松加载各种数据集。",code:`from datasets import load_dataset

# 加载数据集
dataset = load_dataset("imdb")
print(dataset["train"][0])

# 加载部分数据
dataset = load_dataset("wikipedia", "20220301.zh", split="train[:1000]")

# 流式加载大数据集
dataset = load_dataset("mc4", "zh", streaming=True)`}],codeExamples:[{title:"上传模型到 Hub",description:"分享你训练的模型",code:`from huggingface_hub import HfApi

api = HfApi()
api.upload_folder(
    folder_path="./my_model",
    repo_id="username/my-model",
    repo_type="model"
)`},{title:"创建 Gradio Space",description:"快速部署 AI 应用",code:`# 创建 app.py
import gradio as gr

def greet(name):
    return f"Hello {name}!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()

# 推送到 Space
# git push 到 https://huggingface.co/spaces/username/my-app`}],tips:["使用 cache_dir 参数指定模型下载位置，避免占用系统盘",'大模型使用 device_map="auto" 自动分配到多 GPU',"使用 Optimum 库可以优化模型推理速度","Spaces 支持 Gradio、Streamlit、Docker 多种部署方式"],resources:[{name:"HF 官方课程",url:"https://huggingface.co/learn",type:"official"},{name:"Transformers 文档",url:"https://huggingface.co/docs/transformers",type:"official"}]},{name:"fast.ai",url:"https://fast.ai",tagline:"最佳深度学习入门课程，自顶向下教学",description:'fast.ai 提供免费的深度学习课程，采用"自顶向下"的教学方法，先实践后理论。课程配套的 fastai 库让深度学习变得简单。',features:["免费视频课程","fastai 库","自顶向下教学","实战项目","活跃论坛"],useCases:["深度学习入门","计算机视觉","NLP","表格数据","迁移学习"],pros:["完全免费","实用导向","社区活跃","更新及时"],cons:["英文授课","需要一定编程基础"],difficulty:"beginner",pricing:"完全免费",tutorial:[{step:1,title:"观看课程",content:"访问 course.fast.ai 开始学习，建议从 Practical Deep Learning 开始。",code:`# 课程地址
# https://course.fast.ai/

# 推荐学习路径：
# 1. Practical Deep Learning for Coders
# 2. Deep Learning from the Foundations
# 3. NLP Course`},{step:2,title:"安装 fastai",content:"fastai 是课程配套的高级深度学习库。",code:`# 安装
pip install fastai

# 或使用 conda
conda install -c fastai fastai`},{step:3,title:"图像分类示例",content:"几行代码完成图像分类模型训练。",code:`from fastai.vision.all import *

# 下载数据
path = untar_data(URLs.PETS)

# 创建数据加载器
dls = ImageDataLoaders.from_name_func(
    path, get_image_files(path/"images"),
    label_func=lambda x: x[0].isupper(),
    item_tfms=Resize(224)
)

# 创建并训练模型
learn = vision_learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(1)`},{step:4,title:"文本分类示例",content:"使用 fastai 进行 NLP 任务。",code:`from fastai.text.all import *

# 加载 IMDB 数据集
dls = TextDataLoaders.from_folder(untar_data(URLs.IMDB))

# 创建语言模型
learn = text_classifier_learner(dls, AWD_LSTM, metrics=accuracy)
learn.fine_tune(4)`},{step:5,title:"导出和部署",content:"导出训练好的模型。",code:`# 导出模型
learn.export("model.pkl")

# 加载并使用
learn = load_learner("model.pkl")
pred, _, probs = learn.predict("path/to/image.jpg")`}],codeExamples:[{title:"学习率查找",description:"找到最佳学习率",code:`learn.lr_find()
learn.recorder.plot_lr_find()`},{title:"数据增强",description:"使用 aug_transforms 增强数据",code:`dls = ImageDataLoaders.from_folder(
    path,
    train="train",
    valid="valid",
    item_tfms=Resize(460),
    batch_tfms=aug_transforms(size=224)
)`}],tips:["先跑通代码再理解原理，这是 fast.ai 的核心教学理念","使用 learn.lr_find() 找到最佳学习率","fine_tune() 会自动使用迁移学习策略","论坛 forums.fast.ai 有大量问答资源"],resources:[{name:"fast.ai 课程",url:"https://course.fast.ai",type:"official"},{name:"fastai 文档",url:"https://docs.fast.ai",type:"official"},{name:"《Deep Learning for Coders》书",url:"https://github.com/fastai/fastbook",type:"book"}]}]},Z=[V,J,Y,Q],ee={id:"frameworks",title:"AIフレームワーク",gradient:"from-blue-500 to-cyan-500",description:"深層学習・機械学習の主要開発フレームワーク",items:[{name:"PyTorch",url:"https://pytorch.org",tagline:"Meta開発、研究分野で最も人気の深層学習フレームワーク",description:"PyTorchはMeta AIが開発したオープンソースの深層学習フレームワークです。動的計算グラフ（Define-by-Run）で知られ、柔軟なテンソル計算と自動微分機能を提供します。学術論文での使用率は80%を超え、AI研究のデファクトスタンダードです。",features:["動的計算グラフでデバッグが容易","TorchScriptで本番デプロイ対応","torchvision/torchaudio/torchtext エコシステム","CUDA加速、マルチGPU訓練","活発なコミュニティと豊富な事前学習モデル"],useCases:["学術研究と論文再現","コンピュータビジョン","自然言語処理","強化学習","生成モデル"],pros:["Pythonらしい直感的なコード","デバッグ体験が良い","コミュニティが活発","Hugging Face統合"],cons:["本番デプロイがやや複雑","モバイル対応はTFに劣る","分散設定が煩雑"],difficulty:"intermediate",pricing:"完全無料・オープンソース",tutorial:[{step:1,title:"PyTorchのインストール",content:"pytorch.orgでシステム構成を選択し、インストールコマンドを取得します。condaまたはpipでのインストールを推奨。",code:`# CPU版
pip install torch torchvision torchaudio

# GPU版 (CUDA 12.1)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121`},{step:2,title:"インストール確認",content:"PyTorchが正しくインストールされ、GPUが利用可能か確認します。",code:`import torch
print(f"PyTorch バージョン: {torch.__version__}")
print(f"CUDA 利用可能: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")`},{step:3,title:"テンソル基本操作",content:"PyTorchの核心はテンソル（Tensor）です。NumPy配列に似ていますがGPU加速をサポートします。",code:`# テンソル作成
x = torch.randn(3, 4)  # ランダムテンソル
y = torch.zeros(3, 4)  # ゼロテンソル
z = torch.ones(3, 4)   # 1テンソル

# テンソル演算
result = x + y
result = torch.matmul(x, x.T)  # 行列積

# GPUへ移動
if torch.cuda.is_available():
    x = x.cuda()`},{step:4,title:"ニューラルネットワーク構築",content:"torch.nnモジュールでニューラルネットワークを構築。nn.Moduleクラスを継承してモデルを定義します。",code:`import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleNN()`},{step:5,title:"訓練ループ",content:"損失関数とオプティマイザを定義し、訓練ループを実装します。",code:`criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for batch_x, batch_y in dataloader:
        optimizer.zero_grad()           # 勾配クリア
        outputs = model(batch_x)         # 順伝播
        loss = criterion(outputs, batch_y)
        loss.backward()                  # 逆伝播
        optimizer.step()                 # パラメータ更新
    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")`}],codeExamples:[{title:"画像分類（事前学習モデル使用）",description:"torchvisionの事前学習ResNetで画像分類",code:`import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# 事前学習モデル読み込み
model = models.resnet50(pretrained=True)
model.eval()

# 画像前処理
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# 推論
img = Image.open("cat.jpg")
input_tensor = transform(img).unsqueeze(0)
with torch.no_grad():
    output = model(input_tensor)
    pred = output.argmax(dim=1)`},{title:"モデルの保存と読み込み",description:"モデル永続化の2つの方法",code:`# 方法1：パラメータのみ保存（推奨）
torch.save(model.state_dict(), "model.pth")

# パラメータ読み込み
model = SimpleNN()
model.load_state_dict(torch.load("model.pth"))

# 方法2：モデル全体を保存
torch.save(model, "full_model.pth")
model = torch.load("full_model.pth")`},{title:"DataLoaderの使用",description:"効率的なデータ読み込みとバッチ処理",code:`from torch.utils.data import DataLoader, Dataset

class MyDataset(Dataset):
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

dataset = MyDataset(X, y)
loader = DataLoader(
    dataset, 
    batch_size=32, 
    shuffle=True,
    num_workers=4
)`}],tips:["推論時はmodel.eval()とtorch.no_grad()を使用し、メモリ節約と高速化を図る","メモリ不足時はbatch_sizeを減らすかgradient accumulationを使用","torch.cuda.ampで混合精度訓練を行い、訓練の高速化とメモリ削減を実現",'DataLoaderのnum_workers > 0でデータ読み込みを高速化（Windowsではif __name__ == "__main__"が必要な場合あり）',"torchinfoライブラリでモデル構造とパラメータ数を簡単に確認可能"],resources:[{name:"PyTorch公式チュートリアル",url:"https://pytorch.org/tutorials/",type:"official"},{name:"60分入門",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"tutorial"},{name:"PyTorch公式サンプル",url:"https://github.com/pytorch/examples",type:"official"}]},{name:"TensorFlow",url:"https://tensorflow.org",tagline:"Google開発、本番デプロイに最も成熟したMLプラットフォーム",description:"TensorFlowはGoogleが開発したエンドツーエンドの機械学習プラットフォームで、研究から本番までの完全なツールチェーンを提供します。TF 2.xではKerasを高レベルAPIとして採用し、使いやすさが大幅に向上しました。",features:["Keras高レベルAPI","TensorBoard可視化","TF Liteモバイル対応","TF Servingデプロイ","SavedModel形式"],useCases:["大規模本番システム","モバイルAI","ブラウザML","Google Cloud","レコメンドシステム"],pros:["デプロイエコシステムが充実","クロスプラットフォーム対応","Googleがメンテナンス","エンタープライズサポート"],cons:["学習曲線が急","デバッグはPyTorchに劣る","API変更が多い"],difficulty:"intermediate",pricing:"完全無料・オープンソース",tutorial:[{step:1,title:"TensorFlowのインストール",content:"pipでTensorFlowをインストール。GPU版は自動でCUDAを検出します。",code:`# インストール（GPU自動対応）
pip install tensorflow

# インストール確認
import tensorflow as tf
print(f"TensorFlow バージョン: {tf.__version__}")
print(f"GPU 利用可能: {len(tf.config.list_physical_devices('GPU')) > 0}")`},{step:2,title:"Keras Sequential APIの使用",content:"最もシンプルなモデル構築方法で、線形に積み重ねるネットワークに適しています。",code:`from tensorflow import keras
from keras import layers

model = keras.Sequential([
    layers.Dense(128, activation="relu", input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(64, activation="relu"),
    layers.Dense(10, activation="softmax")
])

model.summary()`},{step:3,title:"モデルのコンパイルと訓練",content:"オプティマイザ、損失関数、評価指標を指定して訓練します。",code:`model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=3),
        keras.callbacks.TensorBoard(log_dir="./logs")
    ]
)`},{step:4,title:"TensorBoardで可視化",content:"訓練プロセスの可視化はTensorFlowの大きな強みです。",code:`# 訓練時にTensorBoard callbackを追加（前のステップ参照）

# TensorBoard起動
# ターミナルで実行: tensorboard --logdir=./logs
# ブラウザでアクセス: http://localhost:6006`},{step:5,title:"モデルの保存と読み込み",content:"TensorFlowは複数のモデル保存形式を提供します。",code:`# SavedModel形式（推奨、完全保存）
model.save("my_model")  # ディレクトリとして保存
loaded = keras.models.load_model("my_model")

# H5形式
model.save("model.h5")
loaded = keras.models.load_model("model.h5")

# 重みのみ保存
model.save_weights("weights.h5")
model.load_weights("weights.h5")`}],codeExamples:[{title:"Functional APIで複雑なモデル構築",description:"複数入力/出力や共有レイヤーを持つモデルに適している",code:`inputs = keras.Input(shape=(784,))
x = layers.Dense(128, activation="relu")(inputs)
x = layers.Dense(64, activation="relu")(x)
outputs = layers.Dense(10, activation="softmax")(x)

model = keras.Model(inputs=inputs, outputs=outputs)`},{title:"カスタム訓練ループ",description:"より柔軟な訓練制御",code:`@tf.function
def train_step(x, y):
    with tf.GradientTape() as tape:
        predictions = model(x, training=True)
        loss = loss_fn(y, predictions)
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss`}],tips:["@tf.functionデコレータでPython関数を計算グラフにコンパイルし、パフォーマンスを大幅に向上","TensorFlow 2.xはデフォルトでEager Executionが有効、デバッグが容易","tf.data.Datasetで効率的なデータ入力パイプラインを構築可能","TensorFlow Liteでモバイル・組み込みデバイスへのデプロイが可能"],resources:[{name:"TensorFlow公式チュートリアル",url:"https://tensorflow.org/tutorials",type:"official"},{name:"Keras公式ドキュメント",url:"https://keras.io",type:"official"},{name:"TensorFlow認定資格",url:"https://tensorflow.org/certificate",type:"official"}]},{name:"scikit-learn",url:"https://scikit-learn.org",tagline:"従来型機械学習ライブラリ、データサイエンス必須ツール",description:"scikit-learnはPythonで最も人気のある従来型機械学習ライブラリで、分類、回帰、クラスタリング、次元削減などのアルゴリズムを統一インターフェースで提供します。表形式データと従来型MLタスクには今でも第一選択です。",features:["統一されたfit/predict API","豊富なMLアルゴリズム","データ前処理ツール","モデル評価と選択","Pipelineワークフロー"],useCases:["表形式データ分析","特徴量エンジニアリング","モデルベースライン","データ前処理","A/Bテスト"],pros:["エレガントで統一されたAPI設計","ドキュメントとサンプルが充実","安定して信頼性が高い","pandasとの統合"],cons:["深層学習非対応","GPU非対応","大規模データセットでパフォーマンス制限"],difficulty:"beginner",pricing:"完全無料・オープンソース",tutorial:[{step:1,title:"scikit-learnのインストール",content:"pipでインストール。通常numpy、pandasと一緒に使用します。",code:`pip install scikit-learn pandas numpy matplotlib

# インストール確認
import sklearn
print(f"scikit-learn バージョン: {sklearn.__version__}")`},{step:2,title:"データ読み込みと分割",content:"sklearnはサンプルデータセットとデータ分割ツールを提供します。",code:`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# データ読み込み
iris = load_iris()
X, y = iris.data, iris.target

# 訓練セットとテストセットに分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`},{step:3,title:"モデル訓練",content:"すべてのモデルは統一されたfit/predictインターフェースを使用します。",code:`from sklearn.ensemble import RandomForestClassifier

# モデル作成
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 訓練
model.fit(X_train, y_train)

# 予測
y_pred = model.predict(X_test)`},{step:4,title:"モデル評価",content:"複数の指標でモデル性能を評価します。",code:`from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 正解率
print(f"正解率: {accuracy_score(y_test, y_pred):.4f}")

# 詳細レポート
print(classification_report(y_test, y_pred))

# 混同行列
print(confusion_matrix(y_test, y_pred))`},{step:5,title:"Pipelineの使用",content:"Pipelineで前処理とモデル訓練を一つのフローにまとめます。",code:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# パイプライン作成
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", RandomForestClassifier())
])

# 前処理と訓練を一度に
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`}],codeExamples:[{title:"交差検証",description:"K分割交差検証でモデルの安定性を評価",code:`from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
print(f"交差検証正解率: {scores.mean():.4f} (+/- {scores.std()*2:.4f})")`},{title:"グリッドサーチでハイパーパラメータ調整",description:"最適なハイパーパラメータを自動探索",code:`from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [None, 10, 20]
}

grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid_search.fit(X_train, y_train)
print(f"最適パラメータ: {grid_search.best_params_}")`},{title:"特徴量重要度",description:"どの特徴量が予測に最も重要か確認",code:`import pandas as pd

importance = pd.DataFrame({
    "feature": iris.feature_names,
    "importance": model.feature_importances_
}).sort_values("importance", ascending=False)
print(importance)`}],tips:["訓練前に必ずデータを標準化（StandardScaler）または正規化（MinMaxScaler）する","Pipelineを使用することでデータ漏洩を防ぎ、前処理が訓練セットのみでフィットされることを保証",'不均衡データにはclass_weight="balanced"またはSMOTEオーバーサンプリングを使用',"joblib.dump()でモデル保存するとpickleより効率的"],resources:[{name:"sklearn公式ユーザーガイド",url:"https://scikit-learn.org/stable/user_guide.html",type:"official"},{name:"sklearn公式サンプル",url:"https://scikit-learn.org/stable/auto_examples/",type:"tutorial"}]}]},ne={id:"llm-tools",title:"LLM開発ツール",gradient:"from-violet-500 to-purple-500",description:"大規模言語モデルアプリケーション開発フレームワークとツール",items:[{name:"LangChain",url:"https://langchain.com",tagline:"LLMアプリ開発フレームワーク、チェーンとAgentの第一選択",description:"LangChainはLLMアプリケーション構築の主流フレームワークで、Chain（チェーン）、Agent（エージェント）、Memory（メモリ）などの抽象化を提供し、ChatGPTのようなアプリを開発するためのスイスアーミーナイフです。",features:["Chainチェーン呼び出し","Agent自律的意思決定","Memory会話記憶","RAG検索拡張生成","100以上の統合"],useCases:["チャットボット","RAG質問応答","ドキュメント分析","Agent自動化","LLMアプリ"],pros:["エコシステムが充実","コミュニティが活発","ドキュメントが充実","LangSmithで可観測性"],cons:["抽象レイヤーが多い","APIが不安定","過度なカプセル化"],difficulty:"intermediate",pricing:"オープンソース無料、LangSmithは有料版あり",tutorial:[{step:1,title:"LangChainのインストール",content:"LangChainはコアパッケージと統合パッケージに分かれており、必要に応じてインストールします。",code:`# コアパッケージ
pip install langchain langchain-core

# OpenAI統合
pip install langchain-openai

# Anthropic統合
pip install langchain-anthropic

# API Key設定
export OPENAI_API_KEY="your-key"`},{step:2,title:"基本的なLLM呼び出し",content:"LangChainで最もシンプルなLLM呼び出し方法。",code:`from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

# モデル初期化
llm = ChatOpenAI(model="gpt-4")

# 呼び出し
response = llm.invoke([HumanMessage(content="こんにちは！")])
print(response.content)`},{step:3,title:"プロンプトテンプレート",content:"プロンプトテンプレートで変数を動的に挿入。",code:`from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "あなたは{role}です。"),
    ("human", "{question}")
])

chain = prompt | llm
response = chain.invoke({"role": "優秀なプログラマー", "question": "Pythonって何？"})`},{step:4,title:"RAG実装",content:"検索拡張生成（RAG）でドキュメントを検索して回答。",code:`from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.runnables import RunnablePassthrough

# ベクトルストア作成
vectorstore = Chroma.from_texts(texts, OpenAIEmbeddings())
retriever = vectorstore.as_retriever()

# RAGチェーン
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
)`},{step:5,title:"Agent構築",content:"ツールを使って自律的に意思決定するAgent。",code:`from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain_community.tools import WikipediaQueryRun

# ツール定義
tools = [WikipediaQueryRun()]

# Agent作成
agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

# 実行
result = executor.invoke({"input": "東京の人口は？"})`}],codeExamples:[{title:"会話メモリ",description:"会話履歴を保持してコンテキストを維持",code:`from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)

# 会話追加
memory.save_context(
    {"input": "私の名前は田中です"},
    {"output": "こんにちは、田中さん！"}
)

# 履歴取得
print(memory.load_memory_variables({}))`},{title:"ストリーミング出力",description:"リアルタイムでトークンを出力",code:`for chunk in llm.stream("長い物語を書いてください"):
    print(chunk.content, end="", flush=True)`}],tips:["LCEL（LangChain Expression Language）を使用すると、チェーンをより簡潔に書ける","LangSmithでチェーン実行をトレースしてデバッグを効率化","シンプルなユースケースではLangChainは過剰かも、直接OpenAI APIを使用することも検討","本番環境ではキャッシュ、リトライ、タイムアウト設定を忘れずに"],resources:[{name:"LangChain公式ドキュメント",url:"https://python.langchain.com/docs/",type:"official"},{name:"LangSmith",url:"https://smith.langchain.com",type:"official"}]},{name:"Ollama",url:"https://ollama.ai",tagline:"ローカルでLLMを実行、プライバシー重視のオープンソースソリューション",description:"Ollamaはローカルで大規模言語モデルを実行するためのツールで、Llama、Mistral、Gemmaなど多くのオープンソースモデルをサポートします。インストールが簡単で、APIはOpenAIと互換性があります。",features:["ワンクリックインストール","OpenAI互換API","複数モデル対応","カスタムモデル対応","プライバシー保護"],useCases:["ローカル開発テスト","プライバシー重視アプリ","オフライン使用","カスタムファインチューニング","教育学習"],pros:["完全無料","プライバシー保護","インストール簡単","API互換"],cons:["ハードウェア要件が高い","大モデルはGPU必須","推論速度は遅め"],difficulty:"beginner",pricing:"完全無料・オープンソース",tutorial:[{step:1,title:"Ollamaのインストール",content:"公式サイトからダウンロードするか、コマンドラインでインストール。",code:`# macOS/Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# ollama.aiからインストーラーをダウンロード

# インストール確認
ollama --version`},{step:2,title:"モデルのダウンロードと実行",content:"ollamaコマンドでモデルをダウンロードして対話。",code:`# Llama 2をダウンロードして実行
ollama run llama2

# 他のモデル
ollama run mistral
ollama run codellama
ollama run gemma:7b

# モデル一覧
ollama list`},{step:3,title:"API呼び出し",content:"OllamaはOpenAI互換のREST APIを提供します。",code:`# APIサーバーはデフォルトで起動
# http://localhost:11434

# curlで呼び出し
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "なぜ空は青いですか？"
}'`},{step:4,title:"Pythonでの使用",content:"ollamaライブラリまたはOpenAIクライアントで呼び出し。",code:`# 方法1：ollamaライブラリ
import ollama

response = ollama.chat(model="llama2", messages=[
    {"role": "user", "content": "こんにちは！"}
])
print(response["message"]["content"])

# 方法2：OpenAIクライアント
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(
    model="llama2",
    messages=[{"role": "user", "content": "こんにちは！"}]
)`},{step:5,title:"LangChainとの統合",content:"LangChainでOllamaモデルを使用。",code:`from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate

llm = Ollama(model="llama2")

prompt = ChatPromptTemplate.from_template("あなたはAIアシスタントです。質問: {question}")
chain = prompt | llm

response = chain.invoke({"question": "機械学習とは？"})
print(response)`}],codeExamples:[{title:"カスタムモデル作成",description:"Modelfileでカスタムモデルを定義",code:`# Modelfile作成
echo 'FROM llama2
SYSTEM あなたは優秀なプログラマーです。' > Modelfile

# カスタムモデル作成
ollama create my-coder -f Modelfile

# カスタムモデル実行
ollama run my-coder`},{title:"ストリーミング出力",description:"リアルタイムで回答を出力",code:`import ollama

for chunk in ollama.chat(
    model="llama2",
    messages=[{"role": "user", "content": "長い物語を書いてください"}],
    stream=True
):
    print(chunk["message"]["content"], end="", flush=True)`}],tips:["7Bモデルは8GB RAM、13Bモデルは16GB RAMが必要","GPUがある場合、ollamaは自動でGPU加速を使用","プロンプトエンジニアリングでモデルの出力品質を向上","カスタムModelfileでシステムプロンプトとパラメータを設定可能"],resources:[{name:"Ollama公式サイト",url:"https://ollama.ai",type:"official"},{name:"モデルライブラリ",url:"https://ollama.ai/library",type:"official"}]}]},te={id:"platforms",title:"AIプラットフォームとAPI",gradient:"from-emerald-500 to-teal-500",description:"クラウドAIサービスとモデルホスティングプラットフォーム",items:[{name:"OpenAI API",url:"https://platform.openai.com",tagline:"GPT-4、DALL-E、Whisperなど最先端AIモデルAPI",description:"OpenAI APIはGPT-4、GPT-4o、DALL-E 3、Whisperなどの最先端AIモデルへのアクセスを提供します。シンプルなAPIでテキスト生成、画像生成、音声認識などの機能を実現できます。",features:["GPT-4/4oテキスト生成","DALL-E 3画像生成","Whisper音声認識","Embeddings","Function Calling"],useCases:["チャットボット","コンテンツ生成","コード補完","画像生成","音声転写"],pros:["最先端モデル","API設計が優れている","ドキュメントが充実","安定した運用"],cons:["コストが高め","レート制限あり","プライバシー懸念"],difficulty:"beginner",pricing:"従量課金、GPT-4oは$5/100万入力トークン",tutorial:[{step:1,title:"API Keyの取得",content:"platform.openai.comでアカウント作成、API Keyを取得します。",code:`# 環境変数に設定
export OPENAI_API_KEY="sk-..."

# または.envファイル
echo 'OPENAI_API_KEY=sk-...' > .env`},{step:2,title:"Pythonライブラリのインストール",content:"OpenAI公式Pythonライブラリをインストール。",code:`pip install openai

# バージョン確認
import openai
print(openai.__version__)  # 1.x以上`},{step:3,title:"基本的なChat Completions",content:"GPT-4oで対話を生成。",code:`from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "あなたは優秀なアシスタントです。"},
        {"role": "user", "content": "Pythonって何？"}
    ]
)

print(response.choices[0].message.content)`},{step:4,title:"画像生成（DALL-E 3）",content:"テキストプロンプトから画像を生成。",code:`response = client.images.generate(
    model="dall-e-3",
    prompt="夕焼けの富士山、浮世絵スタイル",
    size="1024x1024",
    quality="hd",
    n=1
)

image_url = response.data[0].url
print(image_url)`},{step:5,title:"音声認識（Whisper）",content:"音声ファイルをテキストに変換。",code:`audio_file = open("speech.mp3", "rb")

transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file
)

print(transcript.text)`}],codeExamples:[{title:"ストリーミング出力",description:"リアルタイムでトークンを取得",code:`stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "短い物語を書いてください"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`},{title:"Function Calling",description:"関数呼び出しで外部ツールを使用",code:`tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "現在の天気を取得",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "都市名"}
            },
            "required": ["location"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "東京の天気は？"}],
    tools=tools
)`}],tips:["システムプロンプトでモデルの動作をカスタマイズ","temperatureを低くすると出力が安定、高くすると創造的に","max_tokensで出力長を制限してコストを管理","Batch APIで大量リクエストを50%割引で処理可能"],resources:[{name:"OpenAI APIドキュメント",url:"https://platform.openai.com/docs",type:"official"},{name:"OpenAI Cookbook",url:"https://cookbook.openai.com",type:"tutorial"}]},{name:"Hugging Face",url:"https://huggingface.co",tagline:"AIコミュニティのGitHub、モデルとデータセットのホーム",description:"Hugging FaceはAI/MLコミュニティの中心的プラットフォームで、モデル、データセット、Spacesアプリのホスティングを提供します。Transformersライブラリは事実上の標準となっています。",features:["40万以上のモデル","10万以上のデータセット","Spacesアプリホスティング","Transformersライブラリ","Inference API"],useCases:["モデル共有","ファインチューニング","デモアプリデプロイ","データセット利用","API推論"],pros:["巨大なモデルエコシステム","無料モデルホスティング","コミュニティが活発","Transformersの標準"],cons:["無料Spacesは遅め","モデル品質にばらつき","依存関係が複雑な場合あり"],difficulty:"beginner",pricing:"基本無料、Pro版$9/月、Inference API従量課金",tutorial:[{step:1,title:"Transformersのインストール",content:"Hugging Face Transformersライブラリをインストール。",code:`pip install transformers torch

# オプション：高速tokenizer
pip install transformers[torch] accelerate`},{step:2,title:"Pipelineでクイックスタート",content:"Pipelineで数行で推論を実行。",code:`from transformers import pipeline

# 感情分析
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.99}]

# テキスト生成
generator = pipeline("text-generation", model="gpt2")
text = generator("Once upon a time", max_length=50)
print(text)`},{step:3,title:"モデルとTokenizerの直接使用",content:"より細かい制御が必要な場合。",code:`from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

inputs = tokenizer("Hello world!", return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)`},{step:4,title:"モデルの共有",content:"トレーニングしたモデルを共有。",code:`from huggingface_hub import HfApi

api = HfApi()
api.upload_folder(
    folder_path="./my_model",
    repo_id="username/my-model",
    repo_type="model"
)`},{step:5,title:"Gradio Spaceの作成",content:"AIアプリを素早くデプロイ。",code:`# app.pyを作成
import gradio as gr

def greet(name):
    return f"Hello {name}!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()

# Spaceにプッシュ
# git push to https://huggingface.co/spaces/username/my-app`}],codeExamples:[{title:"Inference APIの使用",description:"APIでモデル推論（GPU不要）",code:`import requests

API_URL = "https://api-inference.huggingface.co/models/gpt2"
headers = {"Authorization": "Bearer hf_..."}

response = requests.post(API_URL, headers=headers, json={"inputs": "Hello"})
print(response.json())`},{title:"データセットの読み込み",description:"datasetsライブラリでデータセットを読み込み",code:`from datasets import load_dataset

# IMDBデータセット
dataset = load_dataset("imdb")
print(dataset["train"][0])

# 日本語データセット
jp_dataset = load_dataset("llm-jp/llm-jp-corpus-v2")`}],tips:["cache_dirパラメータでモデルのダウンロード場所を指定し、システムドライブの圧迫を防ぐ",'大規模モデルはdevice_map="auto"で自動的にマルチGPUに分散',"Optimumライブラリでモデル推論を最適化可能","SpacesはGradio、Streamlit、Docker複数の方式でデプロイ可能"],resources:[{name:"HF公式コース",url:"https://huggingface.co/learn",type:"official"},{name:"Transformersドキュメント",url:"https://huggingface.co/docs/transformers",type:"official"}]}]},se={id:"learning",title:"学習リソース",gradient:"from-rose-500 to-pink-500",description:"AI/ML学習のための推奨コースと教材",items:[{name:"Hugging Face Course",url:"https://huggingface.co/learn",tagline:"Transformersを学ぶ最良の無料コース",description:"Hugging Face公式の無料コースで、NLPからDiffusionモデルまで幅広いトピックをカバーしています。実践的なコード例が豊富で、すぐに使える知識が身につきます。",features:["完全無料","NLPコース","RL Course","Diffusionコース","実践的なコード"],useCases:["NLP入門","Transformers学習","ファインチューニング","モデルデプロイ","Diffusionモデル"],pros:["完全無料","公式が提供","実践的","コミュニティサポート"],cons:["英語のみ","一部内容が古い場合あり"],difficulty:"beginner",pricing:"完全無料",tutorial:[{step:1,title:"コースを選択",content:"huggingface.co/learnで自分のレベルと興味に合ったコースを選択。",code:`# 推奨学習パス
# 1. NLP Course - Transformersの基礎
# 2. Deep RL Course - 強化学習
# 3. Diffusion Course - 画像生成
# 4. Audio Course - 音声処理`},{step:2,title:"環境セットアップ",content:"Google Colabで実行するか、ローカル環境をセットアップ。",code:`# 必要なライブラリ
pip install transformers datasets evaluate accelerate

# オプション
pip install torch torchvision torchaudio`},{step:3,title:"コース受講",content:"各章のコンテンツを読み、コードを実行して学習。",code:`# NLP Courseの例
from transformers import pipeline

# 様々なNLPタスク
classifier = pipeline("text-classification")
ner = pipeline("ner")
qa = pipeline("question-answering")`}],codeExamples:[{title:"ファインチューニング例",description:"Trainerでモデルをファインチューニング",code:`from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset
)

trainer.train()`}],tips:["Google Colabの無料GPUを活用して学習","コース修了後は自分のプロジェクトで実践","Discordコミュニティで質問可能","コースは定期的に更新されるので最新版をチェック"],resources:[{name:"HF Learn",url:"https://huggingface.co/learn",type:"official"},{name:"HF Discord",url:"https://huggingface.co/discord",type:"official"}]},{name:"fast.ai",url:"https://fast.ai",tagline:"最高の深層学習入門コース、トップダウン教育法",description:"fast.aiは無料の深層学習コースを提供し、「トップダウン」の教育法を採用しています。まず実践してから理論を学びます。付属のfastaiライブラリで深層学習がシンプルになります。",features:["無料動画コース","fastaiライブラリ","トップダウン教育","実践プロジェクト","活発なフォーラム"],useCases:["深層学習入門","コンピュータビジョン","NLP","表形式データ","転移学習"],pros:["完全無料","実践的","コミュニティが活発","定期更新"],cons:["英語での講義","プログラミング基礎が必要"],difficulty:"beginner",pricing:"完全無料",tutorial:[{step:1,title:"コース視聴",content:"course.fast.aiで学習開始。Practical Deep Learningから始めることを推奨。",code:`# コースURL
# https://course.fast.ai/

# 推奨学習パス
# 1. Practical Deep Learning for Coders
# 2. Deep Learning from the Foundations
# 3. NLP Course`},{step:2,title:"fastaiのインストール",content:"fastaiはコース付属の高レベル深層学習ライブラリ。",code:`# インストール
pip install fastai

# またはconda
conda install -c fastai fastai`},{step:3,title:"画像分類例",content:"数行のコードで画像分類モデルを訓練。",code:`from fastai.vision.all import *

# データダウンロード
path = untar_data(URLs.PETS)

# データローダー作成
dls = ImageDataLoaders.from_name_func(
    path, get_image_files(path/"images"),
    label_func=lambda x: x[0].isupper(),
    item_tfms=Resize(224)
)

# モデル作成と訓練
learn = vision_learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(1)`},{step:4,title:"テキスト分類例",content:"fastaiでNLPタスクを実行。",code:`from fastai.text.all import *

# IMDBデータセット読み込み
dls = TextDataLoaders.from_folder(untar_data(URLs.IMDB))

# 言語モデル作成
learn = text_classifier_learner(dls, AWD_LSTM, metrics=accuracy)
learn.fine_tune(4)`},{step:5,title:"エクスポートとデプロイ",content:"訓練済みモデルをエクスポート。",code:`# モデルエクスポート
learn.export("model.pkl")

# 読み込みと使用
learn = load_learner("model.pkl")
pred, _, probs = learn.predict("path/to/image.jpg")`}],codeExamples:[{title:"学習率探索",description:"最適な学習率を見つける",code:`learn.lr_find()
learn.recorder.plot_lr_find()`},{title:"データ拡張",description:"aug_transformsでデータ拡張",code:`dls = ImageDataLoaders.from_folder(
    path,
    train="train",
    valid="valid",
    item_tfms=Resize(460),
    batch_tfms=aug_transforms(size=224)
)`}],tips:["まずコードを動かしてから原理を理解する、これがfast.aiの核心的な教育理念","learn.lr_find()で最適な学習率を見つける","fine_tune()は自動で転移学習戦略を使用","フォーラムforums.fast.aiに大量のQ&Aリソースがある"],resources:[{name:"fast.aiコース",url:"https://course.fast.ai",type:"official"},{name:"fastaiドキュメント",url:"https://docs.fast.ai",type:"official"},{name:"書籍「Deep Learning for Coders」",url:"https://github.com/fastai/fastbook",type:"book"}]}]},ae=[ee,ne,te,se],N={frameworks:_,"llm-tools":H,platforms:U,learning:T},de=()=>{const t=F(s=>s.language),m=R(),[r,p]=g.useState(!0),[u,f]=g.useState(new Set(["frameworks"])),[n,d]=g.useState({categoryIndex:0,itemIndex:0}),[a,o]=g.useState(null),l=t==="ja"?ae:Z,c=l[n.categoryIndex],w=c.items[n.itemIndex],M=s=>{const i=new Set(u);i.has(s)?i.delete(s):i.add(s),f(i)},S=async(s,i)=>{await navigator.clipboard.writeText(s),o(i),setTimeout(()=>o(null),2e3)},y=s=>({beginner:{zh:"入门",ja:"入門"},intermediate:{zh:"中级",ja:"中級"},advanced:{zh:"进阶",ja:"上級"}})[s]?.[t==="ja"?"ja":"zh"]||s,b=s=>({beginner:"bg-green-100 text-green-700",intermediate:"bg-amber-100 text-amber-700",advanced:"bg-red-100 text-red-700"})[s]||"bg-slate-100 text-slate-700",G=l.reduce((s,i)=>s+i.items.length,0),D=l.slice(0,n.categoryIndex).reduce((s,i)=>s+i.items.length,0)+n.itemIndex+1,A=Math.round(D/G*100);return e.jsxs("div",{className:"min-h-screen bg-slate-50",children:[e.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm",children:e.jsxs("div",{className:"flex items-center justify-between h-14 px-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("button",{onClick:()=>p(!r),className:"p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden",children:r?e.jsx(K,{size:20}):e.jsx(q,{size:20})}),e.jsxs("button",{onClick:()=>m("/"),className:"flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors",children:[e.jsx(X,{size:20}),e.jsx("span",{className:"text-base font-medium hidden sm:inline",children:t==="ja"?"ホーム":"首页"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(T,{size:20,className:"text-rose-600"}),e.jsx("span",{className:"font-serif text-lg text-slate-800 hidden sm:inline",children:t==="ja"?"AIリソースまとめ":"AI 资源汇总"})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-24 h-2 bg-slate-200 rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-rose-500 transition-all duration-500",style:{width:`${A}%`}})}),e.jsxs("span",{className:"text-sm text-slate-500",children:[A,"%"]})]})})]})}),e.jsxs("div",{className:"flex pt-14",children:[e.jsx("aside",{className:`fixed lg:sticky top-14 left-0 h-[calc(100vh-56px)] bg-white border-r border-slate-200 transition-all duration-300 z-40 overflow-hidden ${r?"w-80":"w-0 lg:w-80"}`,children:e.jsxs("div",{className:"w-80 h-full overflow-y-auto",children:[e.jsxs("div",{className:"p-4 border-b border-slate-100",children:[e.jsx("h2",{className:"font-serif text-2xl font-semibold text-slate-800",children:t==="ja"?"AIリソース":"AI 资源"}),e.jsx("p",{className:"text-base text-slate-500 mt-1",children:t==="ja"?"フレームワーク・ツール・プラットフォーム":"框架、工具、平台详解"})]}),e.jsx("nav",{className:"p-2",children:l.map((s,i)=>{const O=N[s.id]||_,I=u.has(s.id),z=n.categoryIndex===i;return e.jsxs("div",{className:"mb-1",children:[e.jsxs("button",{onClick:()=>M(s.id),className:"w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left",children:[e.jsx("span",{className:`transition-transform ${I?"rotate-90":""}`,children:e.jsx(x,{size:16,className:"text-slate-400"})}),e.jsx("div",{className:`p-1.5 rounded-lg bg-gradient-to-br ${s.gradient}`,children:e.jsx(O,{size:14,className:"text-white"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("span",{className:"text-rose-600 font-medium text-sm",children:s.title})}),e.jsxs("span",{className:"text-slate-400 text-xs",children:[s.items.length," ",t==="ja"?"件":"个资源"]})]})]}),I&&e.jsx("div",{className:"ml-4 border-l-2 border-slate-100 pl-2",children:s.items.map((h,v)=>{const P=z&&n.itemIndex===v;return e.jsx("button",{onClick:()=>{d({categoryIndex:i,itemIndex:v}),window.innerWidth<1024&&p(!1)},className:`w-full text-left p-2 rounded-lg transition-colors text-base ${P?"bg-rose-50 text-rose-800 font-medium":"text-slate-600 hover:bg-slate-50"}`,children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:`w-2 h-2 rounded-full flex-shrink-0 ${P?"bg-rose-500":"bg-slate-300"}`}),e.jsx("span",{className:"truncate",children:h.name}),e.jsx("span",{className:`ml-auto px-1.5 py-0.5 rounded text-xs ${b(h.difficulty)}`,children:y(h.difficulty)})]})},h.name)})})]},s.id)})})]})}),r&&e.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 lg:hidden",onClick:()=>p(!1)}),e.jsx("main",{className:"flex-1 min-w-0",children:e.jsxs("div",{className:"w-full px-6 sm:px-10 lg:px-16 py-8",children:[e.jsx(oe,{item:w,category:c,language:t,getDifficultyLabel:y,getDifficultyColor:b,copyToClipboard:S,copiedCode:a}),e.jsxs("div",{className:"mt-8 flex items-center justify-between gap-4",children:[e.jsxs("button",{onClick:()=>{if(n.itemIndex>0)d({...n,itemIndex:n.itemIndex-1});else if(n.categoryIndex>0){const s=l[n.categoryIndex-1];d({categoryIndex:n.categoryIndex-1,itemIndex:s.items.length-1}),f(new Set([...u,s.id]))}},disabled:n.categoryIndex===0&&n.itemIndex===0,className:`flex-1 max-w-xs text-left p-4 rounded-xl border transition-colors ${n.categoryIndex===0&&n.itemIndex===0?"border-slate-200 text-slate-300 cursor-not-allowed":"border-slate-200 hover:border-rose-300 hover:bg-rose-50"}`,children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm mb-1",children:[e.jsx(x,{size:16,className:"rotate-180"}),e.jsx("span",{children:t==="ja"?"前へ":"上一个"})]}),(n.categoryIndex>0||n.itemIndex>0)&&e.jsx("div",{className:"text-slate-800 font-medium truncate",children:n.itemIndex>0?c.items[n.itemIndex-1].name:l[n.categoryIndex-1]?.items.slice(-1)[0]?.name})]}),e.jsxs("button",{onClick:()=>{if(n.itemIndex<c.items.length-1)d({...n,itemIndex:n.itemIndex+1});else if(n.categoryIndex<l.length-1){const s=l[n.categoryIndex+1];d({categoryIndex:n.categoryIndex+1,itemIndex:0}),f(new Set([...u,s.id]))}},disabled:n.categoryIndex===l.length-1&&n.itemIndex===c.items.length-1,className:`flex-1 max-w-xs text-right p-4 rounded-xl border transition-colors ${n.categoryIndex===l.length-1&&n.itemIndex===c.items.length-1?"border-slate-200 text-slate-300 cursor-not-allowed":"border-slate-200 hover:border-rose-300 hover:bg-rose-50"}`,children:[e.jsxs("div",{className:"flex items-center justify-end gap-2 text-sm mb-1",children:[e.jsx("span",{children:t==="ja"?"次へ":"下一个"}),e.jsx(x,{size:16})]}),(n.categoryIndex<l.length-1||n.itemIndex<c.items.length-1)&&e.jsx("div",{className:"text-slate-800 font-medium truncate",children:n.itemIndex<c.items.length-1?c.items[n.itemIndex+1].name:l[n.categoryIndex+1]?.items[0]?.name})]})]})]})})]})]})},oe=({item:t,category:m,language:r,getDifficultyLabel:p,getDifficultyColor:u,copyToClipboard:f,copiedCode:n})=>{const d=N[m.id]||_;return e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 text-rose-600 text-sm font-medium mb-4",children:[e.jsx("span",{children:m.title}),e.jsx(x,{size:14}),e.jsx("span",{children:t.name})]}),e.jsxs("div",{className:"flex items-start gap-4 mb-6",children:[e.jsx("div",{className:`p-4 rounded-xl bg-gradient-to-br ${m.gradient}`,children:e.jsx(d,{size:32,className:"text-white"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("h1",{className:"font-serif text-3xl sm:text-4xl font-bold text-slate-900",children:t.name}),e.jsx("span",{className:`px-2 py-1 rounded text-sm font-medium ${u(t.difficulty)}`,children:p(t.difficulty)})]}),e.jsx("p",{className:"text-lg text-slate-600",children:t.tagline}),e.jsxs("div",{className:"flex items-center gap-4 mt-3",children:[e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors",children:[e.jsx(C,{size:16}),r==="ja"?"公式サイトを開く":"访问官网"]}),e.jsx("span",{className:"text-slate-500",children:t.pricing})]})]})]}),e.jsx("div",{className:"bg-white rounded-xl border border-slate-200 p-6 mb-6",children:e.jsx("p",{className:"text-slate-700 leading-relaxed text-lg",children:t.description})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200 p-6",children:[e.jsxs("h3",{className:"font-semibold text-slate-800 mb-4 flex items-center gap-2",children:[e.jsx(j,{size:20,className:"text-green-500"}),r==="ja"?"主な機能":"主要功能"]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.features.map((a,o)=>e.jsx("span",{className:"px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm",children:a},o))})]}),e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200 p-6",children:[e.jsxs("h3",{className:"font-semibold text-slate-800 mb-4 flex items-center gap-2",children:[e.jsx(k,{size:20,className:"text-amber-500"}),r==="ja"?"使用シーン":"使用场景"]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.useCases.map((a,o)=>e.jsx("span",{className:"px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm",children:a},o))})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-green-50 rounded-xl border border-green-200 p-6",children:[e.jsx("h3",{className:"font-semibold text-green-800 mb-4",children:r==="ja"?"✓ メリット":"✓ 优点"}),e.jsx("ul",{className:"space-y-2",children:t.pros.map((a,o)=>e.jsxs("li",{className:"flex items-start gap-2 text-green-700",children:[e.jsx(j,{size:16,className:"flex-shrink-0 mt-1"}),e.jsx("span",{children:a})]},o))})]}),e.jsxs("div",{className:"bg-amber-50 rounded-xl border border-amber-200 p-6",children:[e.jsx("h3",{className:"font-semibold text-amber-800 mb-4",children:r==="ja"?"⚠ 注意点":"⚠ 注意事项"}),e.jsx("ul",{className:"space-y-2",children:t.cons.map((a,o)=>e.jsxs("li",{className:"flex items-start gap-2 text-amber-700",children:[e.jsx("span",{className:"flex-shrink-0",children:"•"}),e.jsx("span",{children:a})]},o))})]})]}),e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200 p-6 mb-8",children:[e.jsx("h2",{className:"font-serif text-2xl font-bold text-slate-800 mb-6",children:r==="ja"?"📚 使い方ガイド":"📚 使用教程"}),e.jsx("div",{className:"space-y-8",children:t.tutorial.map((a,o)=>e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-lg font-bold flex-shrink-0",children:a.step}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"font-semibold text-lg text-slate-800 mb-2",children:a.title}),e.jsx("p",{className:"text-slate-600 mb-4",children:a.content}),a.code&&e.jsx(L,{code:a.code,id:`tutorial-${o}`,copyToClipboard:f,copiedCode:n})]})]}),o<t.tutorial.length-1&&e.jsx("div",{className:"absolute left-5 top-12 bottom-0 w-px bg-rose-100",style:{height:"calc(100% - 48px)"}})]},o))})]}),e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200 p-6 mb-8",children:[e.jsx("h2",{className:"font-serif text-2xl font-bold text-slate-800 mb-6",children:r==="ja"?"💻 コード例":"💻 代码示例"}),e.jsx("div",{className:"space-y-6",children:t.codeExamples.map((a,o)=>e.jsxs("div",{children:[e.jsx("h4",{className:"font-semibold text-slate-800 mb-1",children:a.title}),e.jsx("p",{className:"text-slate-500 text-sm mb-3",children:a.description}),e.jsx(L,{code:a.code,id:`example-${o}`,copyToClipboard:f,copiedCode:n})]},o))})]}),e.jsxs("div",{className:"bg-amber-50 rounded-xl border border-amber-200 p-6 mb-8",children:[e.jsx("h2",{className:"font-serif text-2xl font-bold text-amber-800 mb-6",children:r==="ja"?"💡 実用ヒント":"💡 实用技巧"}),e.jsx("div",{className:"space-y-3",children:t.tips.map((a,o)=>e.jsxs("div",{className:"flex gap-3 p-3 bg-white rounded-lg",children:[e.jsx(k,{size:20,className:"text-amber-500 flex-shrink-0 mt-0.5"}),e.jsx("p",{className:"text-slate-700",children:a})]},o))})]}),e.jsxs("div",{className:"bg-white rounded-xl border border-slate-200 p-6",children:[e.jsx("h2",{className:"font-serif text-2xl font-bold text-slate-800 mb-6",children:r==="ja"?"🔗 参考リソース":"🔗 参考资源"}),e.jsx("div",{className:"flex flex-wrap gap-3",children:t.resources.map((a,o)=>e.jsxs("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors",children:[e.jsx(C,{size:16}),a.name]},o))})]})]})},L=({code:t,id:m,copyToClipboard:r,copiedCode:p})=>e.jsxs("div",{className:"relative group",children:[e.jsx("pre",{className:"bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono",children:e.jsx("code",{children:t})}),e.jsx("button",{onClick:()=>r(t,m),className:"absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity",children:p===m?e.jsx(B,{size:16}):e.jsx($,{size:16})})]});export{de as AIResourcesPage,de as default};

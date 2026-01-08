// AI Resources 详细数据 - 第一部分：接口定义和 AI 框架

export interface CodeExample {
  title: string;
  code: string;
  description: string;
}

export interface TutorialStep {
  step: number;
  title: string;
  content: string;
  code?: string;
}

export interface ResourceLink {
  name: string;
  url: string;
  type: 'official' | 'tutorial' | 'video' | 'book';
}

export interface ResourceItem {
  name: string;
  url: string;
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pricing: string;
  // 新增详细内容
  tutorial: TutorialStep[];
  codeExamples: CodeExample[];
  tips: string[];
  resources: ResourceLink[];
}

export interface Category {
  id: string;
  title: string;
  gradient: string;
  description: string;
  items: ResourceItem[];
}

// ============================================
// AI 框架类别
// ============================================

export const aiFrameworksZh: Category = {
  id: 'frameworks',
  title: 'AI 框架',
  gradient: 'from-blue-500 to-cyan-500',
  description: '深度学习和机器学习的核心开发框架',
  items: [
    {
      name: 'PyTorch',
      url: 'https://pytorch.org',
      tagline: 'Meta 开源，研究领域首选的深度学习框架',
      description: 'PyTorch 是由 Meta AI 开发的开源深度学习框架，以其动态计算图（Define-by-Run）而闻名。它提供了灵活的张量计算和自动微分功能，深受研究人员喜爱。目前在学术论文中使用率超过 80%，是 AI 研究的事实标准。',
      features: ['动态计算图，调试方便', 'TorchScript 支持生产部署', 'torchvision/torchaudio/torchtext 生态', 'CUDA 加速，多 GPU 训练', '活跃的社区和丰富的预训练模型'],
      useCases: ['学术研究和论文复现', '计算机视觉', '自然语言处理', '强化学习', '生成模型'],
      pros: ['代码直观，像写 Python 一样', '调试体验好', '社区活跃', 'Hugging Face 集成'],
      cons: ['生产部署相对复杂', '移动端支持不如 TF', '分布式配置繁琐'],
      difficulty: 'intermediate',
      pricing: '完全免费开源',
      tutorial: [
        {
          step: 1,
          title: '安装 PyTorch',
          content: '访问 pytorch.org 选择你的系统配置，获取安装命令。推荐使用 conda 或 pip 安装。',
          code: '# CPU 版本\npip install torch torchvision torchaudio\n\n# GPU 版本 (CUDA 12.1)\npip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121'
        },
        {
          step: 2,
          title: '验证安装',
          content: '检查 PyTorch 是否正确安装，以及 GPU 是否可用。',
          code: 'import torch\nprint(f"PyTorch 版本: {torch.__version__}")\nprint(f"CUDA 可用: {torch.cuda.is_available()}")\nif torch.cuda.is_available():\n    print(f"GPU: {torch.cuda.get_device_name(0)}")'
        },
        {
          step: 3,
          title: '张量基础操作',
          content: 'PyTorch 的核心是张量（Tensor），类似于 NumPy 数组但支持 GPU 加速。',
          code: '# 创建张量\nx = torch.randn(3, 4)  # 随机张量\ny = torch.zeros(3, 4)  # 全零张量\nz = torch.ones(3, 4)   # 全一张量\n\n# 张量运算\nresult = x + y\nresult = torch.matmul(x, x.T)  # 矩阵乘法\n\n# 移动到 GPU\nif torch.cuda.is_available():\n    x = x.cuda()'
        },
        {
          step: 4,
          title: '构建神经网络',
          content: '使用 torch.nn 模块构建神经网络。继承 nn.Module 类定义模型。',
          code: 'import torch.nn as nn\n\nclass SimpleNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.fc2 = nn.Linear(128, 10)\n        self.relu = nn.ReLU()\n    \n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.fc2(x)\n        return x\n\nmodel = SimpleNN()'
        },
        {
          step: 5,
          title: '训练循环',
          content: '定义损失函数和优化器，编写训练循环。',
          code: 'criterion = nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\n\nfor epoch in range(10):\n    for batch_x, batch_y in dataloader:\n        optimizer.zero_grad()           # 清空梯度\n        outputs = model(batch_x)         # 前向传播\n        loss = criterion(outputs, batch_y)\n        loss.backward()                  # 反向传播\n        optimizer.step()                 # 更新参数\n    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")'
        }
      ],
      codeExamples: [
        {
          title: '图像分类（使用预训练模型）',
          description: '使用 torchvision 的预训练 ResNet 进行图像分类',
          code: 'import torchvision.models as models\nimport torchvision.transforms as transforms\nfrom PIL import Image\n\n# 加载预训练模型\nmodel = models.resnet50(pretrained=True)\nmodel.eval()\n\n# 图像预处理\ntransform = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),\n    transforms.Normalize(\n        mean=[0.485, 0.456, 0.406],\n        std=[0.229, 0.224, 0.225]\n    )\n])\n\n# 推理\nimg = Image.open("cat.jpg")\ninput_tensor = transform(img).unsqueeze(0)\nwith torch.no_grad():\n    output = model(input_tensor)\n    pred = output.argmax(dim=1)'
        },
        {
          title: '保存和加载模型',
          description: '模型持久化的两种方式',
          code: '# 方式1：只保存参数（推荐）\ntorch.save(model.state_dict(), "model.pth")\n\n# 加载参数\nmodel = SimpleNN()\nmodel.load_state_dict(torch.load("model.pth"))\n\n# 方式2：保存整个模型\ntorch.save(model, "full_model.pth")\nmodel = torch.load("full_model.pth")'
        },
        {
          title: '使用 DataLoader',
          description: '高效加载和批处理数据',
          code: 'from torch.utils.data import DataLoader, Dataset\n\nclass MyDataset(Dataset):\n    def __init__(self, data, labels):\n        self.data = data\n        self.labels = labels\n    \n    def __len__(self):\n        return len(self.data)\n    \n    def __getitem__(self, idx):\n        return self.data[idx], self.labels[idx]\n\ndataset = MyDataset(X, y)\nloader = DataLoader(\n    dataset, \n    batch_size=32, \n    shuffle=True,\n    num_workers=4\n)'
        }
      ],
      tips: [
        '使用 model.eval() 和 torch.no_grad() 进行推理，可以节省内存并加速',
        '遇到显存不足时，减小 batch_size 或使用 gradient accumulation',
        '使用 torch.cuda.amp 进行混合精度训练，可以加速训练并减少显存占用',
        'DataLoader 的 num_workers > 0 可以加速数据加载，但在 Windows 上可能需要 if __name__ == "__main__"',
        '使用 torchinfo 库可以方便地查看模型结构和参数量'
      ],
      resources: [
        { name: 'PyTorch 官方教程', url: 'https://pytorch.org/tutorials/', type: 'official' },
        { name: '60分钟入门', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'tutorial' },
        { name: 'PyTorch 官方示例', url: 'https://github.com/pytorch/examples', type: 'official' }
      ]
    },
    {
      name: 'TensorFlow',
      url: 'https://tensorflow.org',
      tagline: 'Google 开源，生产部署最成熟的 ML 平台',
      description: 'TensorFlow 是 Google 开发的端到端机器学习平台，提供从研究到生产的完整工具链。TF 2.x 版本采用 Keras 作为高级 API，大幅简化了使用体验。',
      features: ['Keras 高级 API', 'TensorBoard 可视化', 'TF Lite 移动端', 'TF Serving 部署', 'SavedModel 格式'],
      useCases: ['大规模生产系统', '移动端 AI', '浏览器 ML', 'Google Cloud', '推荐系统'],
      pros: ['部署生态完善', '跨平台好', 'Google 维护', '企业级支持'],
      cons: ['学习曲线陡', '调试不如 PyTorch', 'API 变化多'],
      difficulty: 'intermediate',
      pricing: '完全免费开源',
      tutorial: [
        {
          step: 1,
          title: '安装 TensorFlow',
          content: '使用 pip 安装 TensorFlow。GPU 版本会自动检测 CUDA。',
          code: '# 安装（自动支持 GPU）\npip install tensorflow\n\n# 验证安装\nimport tensorflow as tf\nprint(f"TensorFlow 版本: {tf.__version__}")\nprint(f"GPU 可用: {len(tf.config.list_physical_devices(\'GPU\')) > 0}")'
        },
        {
          step: 2,
          title: '使用 Keras Sequential API',
          content: '最简单的方式构建模型，适合线性堆叠的网络。',
          code: 'from tensorflow import keras\nfrom keras import layers\n\nmodel = keras.Sequential([\n    layers.Dense(128, activation="relu", input_shape=(784,)),\n    layers.Dropout(0.2),\n    layers.Dense(64, activation="relu"),\n    layers.Dense(10, activation="softmax")\n])\n\nmodel.summary()'
        },
        {
          step: 3,
          title: '编译和训练模型',
          content: '指定优化器、损失函数和评估指标，然后训练。',
          code: 'model.compile(\n    optimizer="adam",\n    loss="sparse_categorical_crossentropy",\n    metrics=["accuracy"]\n)\n\nhistory = model.fit(\n    x_train, y_train,\n    epochs=10,\n    batch_size=32,\n    validation_split=0.2,\n    callbacks=[\n        keras.callbacks.EarlyStopping(patience=3),\n        keras.callbacks.TensorBoard(log_dir="./logs")\n    ]\n)'
        },
        {
          step: 4,
          title: '使用 TensorBoard 可视化',
          content: '训练过程可视化是 TensorFlow 的一大优势。',
          code: '# 在训练时添加 TensorBoard callback（见上一步）\n\n# 启动 TensorBoard\n# 终端运行: tensorboard --logdir=./logs\n# 浏览器访问: http://localhost:6006'
        },
        {
          step: 5,
          title: '保存和加载模型',
          content: 'TensorFlow 提供多种模型保存格式。',
          code: '# SavedModel 格式（推荐，完整保存）\nmodel.save("my_model")  # 保存为目录\nloaded = keras.models.load_model("my_model")\n\n# H5 格式\nmodel.save("model.h5")\nloaded = keras.models.load_model("model.h5")\n\n# 只保存权重\nmodel.save_weights("weights.h5")\nmodel.load_weights("weights.h5")'
        }
      ],
      codeExamples: [
        {
          title: 'Functional API 构建复杂模型',
          description: '适合有多输入/多输出或共享层的模型',
          code: 'inputs = keras.Input(shape=(784,))\nx = layers.Dense(128, activation="relu")(inputs)\nx = layers.Dense(64, activation="relu")(x)\noutputs = layers.Dense(10, activation="softmax")(x)\n\nmodel = keras.Model(inputs=inputs, outputs=outputs)'
        },
        {
          title: '自定义训练循环',
          description: '更灵活的训练控制',
          code: '@tf.function\ndef train_step(x, y):\n    with tf.GradientTape() as tape:\n        predictions = model(x, training=True)\n        loss = loss_fn(y, predictions)\n    gradients = tape.gradient(loss, model.trainable_variables)\n    optimizer.apply_gradients(zip(gradients, model.trainable_variables))\n    return loss'
        }
      ],
      tips: [
        '使用 @tf.function 装饰器可以将 Python 函数编译为计算图，显著提升性能',
        'TensorFlow 2.x 默认开启 Eager Execution，调试更方便',
        '使用 tf.data.Dataset 可以构建高效的数据输入管道',
        'TensorFlow Lite 可以将模型部署到移动端和嵌入式设备'
      ],
      resources: [
        { name: 'TensorFlow 官方教程', url: 'https://tensorflow.org/tutorials', type: 'official' },
        { name: 'Keras 官方文档', url: 'https://keras.io', type: 'official' },
        { name: 'TensorFlow 官方认证', url: 'https://tensorflow.org/certificate', type: 'official' }
      ]
    },
    {
      name: 'scikit-learn',
      url: 'https://scikit-learn.org',
      tagline: '传统机器学习库，数据科学必备工具',
      description: 'scikit-learn 是 Python 中最流行的传统机器学习库，提供分类、回归、聚类、降维等算法的统一接口。对于表格数据和传统 ML 任务，它仍是首选工具。',
      features: ['统一的 fit/predict API', '丰富的 ML 算法', '数据预处理工具', '模型评估和选择', 'Pipeline 流水线'],
      useCases: ['表格数据分析', '特征工程', '模型基线', '数据预处理', 'A/B 测试'],
      pros: ['API 设计优雅统一', '文档和示例丰富', '稳定可靠', '与 pandas 集成'],
      cons: ['不支持深度学习', '不支持 GPU', '大数据集性能受限'],
      difficulty: 'beginner',
      pricing: '完全免费开源',
      tutorial: [
        {
          step: 1,
          title: '安装 scikit-learn',
          content: '使用 pip 安装，通常与 numpy、pandas 一起使用。',
          code: 'pip install scikit-learn pandas numpy matplotlib\n\n# 验证安装\nimport sklearn\nprint(f"scikit-learn 版本: {sklearn.__version__}")'
        },
        {
          step: 2,
          title: '数据加载和分割',
          content: 'sklearn 提供了示例数据集和数据分割工具。',
          code: 'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\n# 加载数据\niris = load_iris()\nX, y = iris.data, iris.target\n\n# 分割训练集和测试集\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)'
        },
        {
          step: 3,
          title: '训练模型',
          content: '所有模型都使用统一的 fit/predict 接口。',
          code: 'from sklearn.ensemble import RandomForestClassifier\n\n# 创建模型\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\n\n# 训练\nmodel.fit(X_train, y_train)\n\n# 预测\ny_pred = model.predict(X_test)'
        },
        {
          step: 4,
          title: '模型评估',
          content: '使用多种指标评估模型性能。',
          code: 'from sklearn.metrics import accuracy_score, classification_report, confusion_matrix\n\n# 准确率\nprint(f"准确率: {accuracy_score(y_test, y_pred):.4f}")\n\n# 详细报告\nprint(classification_report(y_test, y_pred))\n\n# 混淆矩阵\nprint(confusion_matrix(y_test, y_pred))'
        },
        {
          step: 5,
          title: '使用 Pipeline',
          content: 'Pipeline 可以将预处理和模型训练组合成一个流程。',
          code: 'from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\n\n# 创建流水线\npipeline = Pipeline([\n    ("scaler", StandardScaler()),\n    ("classifier", RandomForestClassifier())\n])\n\n# 一步完成预处理和训练\npipeline.fit(X_train, y_train)\ny_pred = pipeline.predict(X_test)'
        }
      ],
      codeExamples: [
        {
          title: '交叉验证',
          description: '使用 K 折交叉验证评估模型稳定性',
          code: 'from sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(model, X, y, cv=5, scoring="accuracy")\nprint(f"交叉验证准确率: {scores.mean():.4f} (+/- {scores.std()*2:.4f})")'
        },
        {
          title: '网格搜索调参',
          description: '自动搜索最佳超参数',
          code: 'from sklearn.model_selection import GridSearchCV\n\nparam_grid = {\n    "n_estimators": [50, 100, 200],\n    "max_depth": [None, 10, 20]\n}\n\ngrid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)\ngrid_search.fit(X_train, y_train)\nprint(f"最佳参数: {grid_search.best_params_}")'
        },
        {
          title: '特征重要性',
          description: '查看哪些特征对预测最重要',
          code: 'import pandas as pd\n\nimportance = pd.DataFrame({\n    "feature": iris.feature_names,\n    "importance": model.feature_importances_\n}).sort_values("importance", ascending=False)\nprint(importance)'
        }
      ],
      tips: [
        '始终在训练前对数据进行标准化（StandardScaler）或归一化（MinMaxScaler）',
        '使用 Pipeline 可以避免数据泄露，确保预处理只在训练集上拟合',
        '对于不平衡数据集，使用 class_weight="balanced" 或 SMOTE 过采样',
        '使用 joblib.dump() 保存模型比 pickle 更高效'
      ],
      resources: [
        { name: 'sklearn 官方用户指南', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'official' },
        { name: 'sklearn 官方示例', url: 'https://scikit-learn.org/stable/auto_examples/', type: 'tutorial' }
      ]
    }
  ]
};

// ============================================
// LLM 开发工具类别
// ============================================

export const llmToolsZh: Category = {
  id: 'llm-tools',
  title: 'LLM 开发工具',
  gradient: 'from-violet-500 to-purple-500',
  description: '大语言模型应用开发框架和工具',
  items: [
    {
      name: 'LangChain',
      url: 'https://langchain.com',
      tagline: 'LLM 应用开发框架，链式调用和 Agent 首选',
      description: 'LangChain 是构建 LLM 应用的主流框架，提供了链（Chain）、代理（Agent）、记忆（Memory）等抽象，是开发 ChatGPT 类应用的瑞士军刀。',
      features: ['Chain 链式调用', 'Agent 自主决策', 'Memory 对话记忆', 'RAG 检索增强', '100+ 集成'],
      useCases: ['聊天机器人', 'RAG 问答', '文档分析', 'Agent 自动化', 'LLM 应用'],
      pros: ['生态丰富', '社区活跃', '文档丰富', 'LangSmith 可观测'],
      cons: ['抽象层多', 'API 不稳定', '过度封装'],
      difficulty: 'intermediate',
      pricing: '开源免费，LangSmith 有付费版',
      tutorial: [
        {
          step: 1,
          title: '安装 LangChain',
          content: 'LangChain 分为核心包和集成包，按需安装。',
          code: '# 核心包\npip install langchain langchain-core\n\n# OpenAI 集成\npip install langchain-openai\n\n# Anthropic 集成\npip install langchain-anthropic\n\n# 设置 API Key\nexport OPENAI_API_KEY="your-key"'
        },
        {
          step: 2,
          title: '基础对话',
          content: '使用 ChatModel 进行基础对话。',
          code: 'from langchain_openai import ChatOpenAI\nfrom langchain_core.messages import HumanMessage, SystemMessage\n\n# 创建模型\nllm = ChatOpenAI(model="gpt-4o-mini")\n\n# 发送消息\nmessages = [\n    SystemMessage(content="你是一个有帮助的助手"),\n    HumanMessage(content="你好！")\n]\nresponse = llm.invoke(messages)\nprint(response.content)'
        },
        {
          step: 3,
          title: '使用 Prompt Template',
          content: '模板化 Prompt 可以更好地管理和复用。',
          code: 'from langchain_core.prompts import ChatPromptTemplate\n\n# 创建模板\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "你是一个{role}，擅长{skill}"),\n    ("human", "{input}")\n])\n\n# 创建链\nchain = prompt | llm\n\n# 调用\nresponse = chain.invoke({\n    "role": "Python专家",\n    "skill": "代码优化",\n    "input": "如何优化这段代码？"\n})'
        },
        {
          step: 4,
          title: '构建 RAG 应用',
          content: 'RAG（检索增强生成）是 LLM 应用的核心场景。',
          code: 'from langchain_community.document_loaders import TextLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nfrom langchain_openai import OpenAIEmbeddings\nfrom langchain_community.vectorstores import FAISS\n\n# 1. 加载文档\nloader = TextLoader("document.txt")\ndocs = loader.load()\n\n# 2. 分割文档\nsplitter = RecursiveCharacterTextSplitter(chunk_size=1000)\nchunks = splitter.split_documents(docs)\n\n# 3. 创建向量存储\nembeddings = OpenAIEmbeddings()\nvectorstore = FAISS.from_documents(chunks, embeddings)\n\n# 4. 检索\nretriever = vectorstore.as_retriever()\nresults = retriever.invoke("相关问题")'
        },
        {
          step: 5,
          title: '创建 Agent',
          content: 'Agent 可以自主决定使用哪些工具来完成任务。',
          code: 'from langchain.agents import create_react_agent, AgentExecutor\nfrom langchain_community.tools import DuckDuckGoSearchRun\nfrom langchain import hub\n\n# 定义工具\ntools = [DuckDuckGoSearchRun()]\n\n# 获取 Prompt\nprompt = hub.pull("hwchase17/react")\n\n# 创建 Agent\nagent = create_react_agent(llm, tools, prompt)\nagent_executor = AgentExecutor(agent=agent, tools=tools)\n\n# 执行\nresult = agent_executor.invoke({"input": "今天的新闻有什么？"})'
        }
      ],
      codeExamples: [
        {
          title: '带记忆的对话',
          description: '使用 Memory 保持对话上下文',
          code: 'from langchain.memory import ConversationBufferMemory\nfrom langchain.chains import ConversationChain\n\nmemory = ConversationBufferMemory()\nchain = ConversationChain(llm=llm, memory=memory)\n\nchain.invoke({"input": "我叫小明"})\nchain.invoke({"input": "我叫什么？"})  # 会记住名字'
        },
        {
          title: '流式输出',
          description: '实时获取 LLM 的输出',
          code: 'for chunk in llm.stream("给我讲个故事"):\n    print(chunk.content, end="", flush=True)'
        }
      ],
      tips: [
        '使用 LCEL（LangChain Expression Language）构建链，代码更简洁：chain = prompt | llm | parser',
        '对于生产环境，使用 LangSmith 进行追踪和调试',
        '合理设置 chunk_size 和 chunk_overlap 对 RAG 效果影响很大',
        '使用 RunnablePassthrough 和 RunnableLambda 处理复杂的数据流'
      ],
      resources: [
        { name: 'LangChain 官方文档', url: 'https://python.langchain.com/docs/', type: 'official' },
        { name: 'LangChain 模板', url: 'https://github.com/langchain-ai/langchain/tree/master/templates', type: 'tutorial' }
      ]
    },
    {
      name: 'Ollama',
      url: 'https://ollama.com',
      tagline: '本地运行开源 LLM，一键部署，隐私保护',
      description: 'Ollama 让你在本地轻松运行 Llama、Mistral、Gemma 等开源模型。一条命令即可下载运行，适合隐私敏感场景和离线使用。',
      features: ['一键安装', '50+ 模型', 'OpenAI 兼容 API', '多平台支持', 'Modelfile 自定义'],
      useCases: ['本地开发', '隐私场景', '离线 AI', '模型实验', '成本节省'],
      pros: ['极简体验', '无需 API Key', '数据本地', '完全免费'],
      cons: ['需要好硬件', '能力不如 GPT-4', '显存要求高'],
      difficulty: 'beginner',
      pricing: '完全免费',
      tutorial: [
        {
          step: 1,
          title: '安装 Ollama',
          content: '访问 ollama.com 下载安装包，支持 macOS、Linux、Windows。',
          code: '# macOS / Linux\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# 或从官网下载安装包\n# https://ollama.com/download'
        },
        {
          step: 2,
          title: '下载并运行模型',
          content: '使用 ollama run 命令下载并启动模型。',
          code: '# 运行 Llama 3.2（推荐入门）\nollama run llama3.2\n\n# 运行其他模型\nollama run mistral\nollama run gemma2\nollama run codellama  # 代码专用\n\n# 查看已下载的模型\nollama list'
        },
        {
          step: 3,
          title: '使用 API',
          content: 'Ollama 提供 REST API，兼容 OpenAI 格式。',
          code: '# 生成文本\ncurl http://localhost:11434/api/generate -d \'{\n  "model": "llama3.2",\n  "prompt": "为什么天空是蓝色的？"\n}\'\n\n# 对话模式\ncurl http://localhost:11434/api/chat -d \'{\n  "model": "llama3.2",\n  "messages": [{"role": "user", "content": "你好"}]\n}\''
        },
        {
          step: 4,
          title: 'Python 集成',
          content: '使用 ollama 库或 OpenAI 库调用。',
          code: '# 方式1：ollama 库\npip install ollama\n\nimport ollama\nresponse = ollama.chat(model="llama3.2", messages=[\n    {"role": "user", "content": "你好"}\n])\nprint(response["message"]["content"])\n\n# 方式2：OpenAI 兼容（推荐）\nfrom openai import OpenAI\nclient = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")\nresponse = client.chat.completions.create(\n    model="llama3.2",\n    messages=[{"role": "user", "content": "你好"}]\n)'
        },
        {
          step: 5,
          title: '自定义模型',
          content: '使用 Modelfile 自定义模型参数和系统提示。',
          code: '# 创建 Modelfile\nFROM llama3.2\nSYSTEM 你是一个专业的Python编程助手\nPARAMETER temperature 0.7\n\n# 构建自定义模型\nollama create my-assistant -f Modelfile\n\n# 使用自定义模型\nollama run my-assistant'
        }
      ],
      codeExamples: [
        {
          title: 'LangChain 集成',
          description: '在 LangChain 中使用 Ollama',
          code: 'from langchain_community.llms import Ollama\n\nllm = Ollama(model="llama3.2")\nresponse = llm.invoke("写一首关于春天的诗")'
        },
        {
          title: '流式输出',
          description: '实时获取生成结果',
          code: 'import ollama\n\nfor chunk in ollama.chat(\n    model="llama3.2",\n    messages=[{"role": "user", "content": "讲个故事"}],\n    stream=True\n):\n    print(chunk["message"]["content"], end="")'
        }
      ],
      tips: [
        '8GB 显存可以运行 7B 参数模型，16GB 可以运行 13B',
        '使用 ollama pull 预先下载模型，避免首次运行等待',
        '设置 OLLAMA_HOST=0.0.0.0 可以在局域网内共享服务',
        'Modelfile 中的 PARAMETER num_ctx 可以调整上下文长度'
      ],
      resources: [
        { name: 'Ollama 官方文档', url: 'https://github.com/ollama/ollama', type: 'official' },
        { name: 'Ollama 模型库', url: 'https://ollama.com/library', type: 'official' }
      ]
    }
  ]
};

// ============================================
// AI 平台与 API 类别
// ============================================

export const aiPlatformsZh: Category = {
  id: 'platforms',
  title: 'AI 平台与 API',
  gradient: 'from-emerald-500 to-green-500',
  description: '主流 AI 服务提供商和 API 平台',
  items: [
    {
      name: 'OpenAI API',
      url: 'https://platform.openai.com',
      tagline: 'GPT-4/ChatGPT 官方 API，AI 应用首选',
      description: 'OpenAI 提供 GPT-4、GPT-4o、DALL-E、Whisper 等模型的 API 服务。作为 AI 领域的领导者，其模型在多数任务上表现最优。',
      features: ['GPT-4o 多模态', 'Function Calling', 'JSON 模式', 'Vision', 'Assistants API'],
      useCases: ['智能对话', '代码生成', '内容创作', '数据分析', '多模态应用'],
      pros: ['模型能力最强', 'API 设计成熟', '生态丰富', '持续更新'],
      cons: ['成本较高', '数据隐私', '速率限制'],
      difficulty: 'beginner',
      pricing: 'GPT-4o: $2.5/1M tokens 输入',
      tutorial: [
        {
          step: 1,
          title: '获取 API Key',
          content: '注册 OpenAI 账户，在 platform.openai.com 创建 API Key。',
          code: '# 1. 访问 https://platform.openai.com/api-keys\n# 2. 点击 "Create new secret key"\n# 3. 复制并保存 Key（只显示一次）\n\n# 设置环境变量\nexport OPENAI_API_KEY="sk-..."'
        },
        {
          step: 2,
          title: '安装和基础使用',
          content: '安装 openai 库并进行基础调用。',
          code: 'pip install openai\n\nfrom openai import OpenAI\n\nclient = OpenAI()  # 自动读取环境变量\n\nresponse = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[\n        {"role": "system", "content": "你是一个有帮助的助手"},\n        {"role": "user", "content": "你好！"}\n    ]\n)\n\nprint(response.choices[0].message.content)'
        },
        {
          step: 3,
          title: '使用 Function Calling',
          content: 'Function Calling 让模型调用你定义的函数，实现结构化输出。',
          code: 'tools = [{\n    "type": "function",\n    "function": {\n        "name": "get_weather",\n        "description": "获取指定城市的天气",\n        "parameters": {\n            "type": "object",\n            "properties": {\n                "city": {"type": "string", "description": "城市名"}\n            },\n            "required": ["city"]\n        }\n    }\n}]\n\nresponse = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[{"role": "user", "content": "北京天气如何？"}],\n    tools=tools\n)\n\n# 解析函数调用\ntool_call = response.choices[0].message.tool_calls[0]\nprint(tool_call.function.name)  # get_weather\nprint(tool_call.function.arguments)  # {"city": "北京"}'
        },
        {
          step: 4,
          title: '流式输出',
          content: '使用流式 API 实现打字机效果。',
          code: 'stream = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[{"role": "user", "content": "讲一个故事"}],\n    stream=True\n)\n\nfor chunk in stream:\n    if chunk.choices[0].delta.content:\n        print(chunk.choices[0].delta.content, end="", flush=True)'
        },
        {
          step: 5,
          title: '图像理解（Vision）',
          content: 'GPT-4o 支持图像输入，可以理解和分析图片。',
          code: 'import base64\n\n# 方式1：URL\nresponse = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[{\n        "role": "user",\n        "content": [\n            {"type": "text", "text": "描述这张图片"},\n            {"type": "image_url", "image_url": {"url": "https://..."}}\n        ]\n    }]\n)\n\n# 方式2：Base64\nwith open("image.jpg", "rb") as f:\n    b64 = base64.b64encode(f.read()).decode()\n# 然后使用 data:image/jpeg;base64,{b64}'
        }
      ],
      codeExamples: [
        {
          title: 'JSON 模式',
          description: '强制模型返回有效的 JSON',
          code: 'response = client.chat.completions.create(\n    model="gpt-4o-mini",\n    response_format={"type": "json_object"},\n    messages=[{\n        "role": "user",\n        "content": "以JSON格式返回三种水果及其颜色"\n    }]\n)'
        },
        {
          title: '嵌入向量',
          description: '生成文本的向量表示，用于语义搜索',
          code: 'response = client.embeddings.create(\n    model="text-embedding-3-small",\n    input="这是一段文本"\n)\nvector = response.data[0].embedding  # 1536维向量'
        }
      ],
      tips: [
        '使用 gpt-4o-mini 进行开发测试，成本更低',
        '设置 max_tokens 限制输出长度，避免意外高消费',
        '使用 response_format={"type": "json_object"} 获取结构化输出',
        '批量请求使用 Batch API 可以节省 50% 成本'
      ],
      resources: [
        { name: 'OpenAI API 文档', url: 'https://platform.openai.com/docs', type: 'official' },
        { name: 'OpenAI Cookbook', url: 'https://cookbook.openai.com', type: 'tutorial' }
      ]
    },
    {
      name: 'Anthropic Claude',
      url: 'https://anthropic.com',
      tagline: 'Claude 系列，长文本和安全性领先',
      description: 'Anthropic 的 Claude 以安全性和长上下文闻名。Claude 3.5 Sonnet 在多项基准上表现优秀，支持 200K 上下文窗口。',
      features: ['200K 超长上下文', 'Artifacts 可视化', 'Computer Use', 'AI 安全', 'Claude Code'],
      useCases: ['长文档分析', '代码开发', '学术研究', '内容写作', '复杂推理'],
      pros: ['长文本强', '质量高', '安全性好', '幻觉率低'],
      cons: ['价格不便宜', '某些国家不可用'],
      difficulty: 'beginner',
      pricing: 'Sonnet: $3/1M tokens 输入',
      tutorial: [
        {
          step: 1,
          title: '获取 API Key',
          content: '在 Anthropic Console 创建账户并获取 API Key。',
          code: '# 1. 访问 https://console.anthropic.com\n# 2. 创建账户并添加付款方式\n# 3. 在 API Keys 页面创建新 Key\n\nexport ANTHROPIC_API_KEY="sk-ant-..."'
        },
        {
          step: 2,
          title: '安装和基础使用',
          content: '安装 anthropic 库并进行调用。',
          code: 'pip install anthropic\n\nfrom anthropic import Anthropic\n\nclient = Anthropic()\n\nmessage = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[\n        {"role": "user", "content": "你好！介绍一下你自己"}\n    ]\n)\n\nprint(message.content[0].text)'
        },
        {
          step: 3,
          title: '使用 System Prompt',
          content: '设置系统提示词来定制 Claude 的行为。',
          code: 'message = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    system="你是一个专业的Python编程导师，用简洁清晰的方式解释代码概念。",\n    messages=[\n        {"role": "user", "content": "解释什么是装饰器？"}\n    ]\n)'
        },
        {
          step: 4,
          title: '流式输出',
          content: '使用流式 API 实时获取响应。',
          code: 'with client.messages.stream(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[{"role": "user", "content": "写一首诗"}]\n) as stream:\n    for text in stream.text_stream:\n        print(text, end="", flush=True)'
        },
        {
          step: 5,
          title: '图像理解',
          content: 'Claude 3 支持图像输入分析。',
          code: 'import base64\n\nwith open("image.jpg", "rb") as f:\n    image_data = base64.standard_b64encode(f.read()).decode()\n\nmessage = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[{\n        "role": "user",\n        "content": [\n            {\n                "type": "image",\n                "source": {\n                    "type": "base64",\n                    "media_type": "image/jpeg",\n                    "data": image_data\n                }\n            },\n            {"type": "text", "text": "描述这张图片"}\n        ]\n    }]\n)'
        }
      ],
      codeExamples: [
        {
          title: '多轮对话',
          description: '保持对话上下文',
          code: 'messages = []\n\n# 第一轮\nmessages.append({"role": "user", "content": "我叫小明"})\nresponse = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=256,\n    messages=messages\n)\nmessages.append({"role": "assistant", "content": response.content[0].text})\n\n# 第二轮\nmessages.append({"role": "user", "content": "我叫什么？"})\nresponse = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=256,\n    messages=messages\n)'
        },
        {
          title: 'Tool Use',
          description: 'Claude 的函数调用功能',
          code: 'tools = [{\n    "name": "get_weather",\n    "description": "获取城市天气",\n    "input_schema": {\n        "type": "object",\n        "properties": {\n            "city": {"type": "string"}\n        },\n        "required": ["city"]\n    }\n}]\n\nresponse = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    tools=tools,\n    messages=[{"role": "user", "content": "北京天气如何"}]\n)'
        }
      ],
      tips: [
        'Claude 擅长长文档分析，可以一次性处理整本书',
        '使用 XML 标签组织 Prompt 效果更好：<context>...</context>',
        'Claude 3.5 Sonnet 是性价比最高的选择',
        '设置合理的 max_tokens 避免输出被截断'
      ],
      resources: [
        { name: 'Anthropic API 文档', url: 'https://docs.anthropic.com', type: 'official' },
        { name: 'Claude Prompt 设计指南', url: 'https://docs.anthropic.com/claude/docs/prompt-engineering', type: 'tutorial' }
      ]
    }
  ]
};

// ============================================
// 学习资源类别
// ============================================

export const learningResourcesZh: Category = {
  id: 'learning',
  title: '学习资源',
  gradient: 'from-amber-500 to-orange-500',
  description: 'AI/ML 学习课程和模型资源库',
  items: [
    {
      name: 'Hugging Face',
      url: 'https://huggingface.co',
      tagline: 'AI 社区的 GitHub，模型和数据集中心',
      description: 'Hugging Face 是 AI 领域最大的开源社区，托管了 50万+ 模型、10万+ 数据集。它提供了 Transformers 库、Spaces 应用托管等服务。',
      features: ['50万+ 模型', '10万+ 数据集', 'Spaces 应用托管', 'Inference API', '模型卡片文档'],
      useCases: ['下载预训练模型', '托管 AI 应用', '分享数据集', '模型微调', '社区交流'],
      pros: ['资源最丰富', '社区活跃', '免费使用', '文档完善'],
      cons: ['大模型下载慢', '部分资源需付费'],
      difficulty: 'beginner',
      pricing: '基础免费，Pro $9/月',
      tutorial: [
        {
          step: 1,
          title: '创建账户',
          content: '访问 huggingface.co 注册账户，可以使用 GitHub 登录。',
          code: '# 1. 访问 https://huggingface.co/join\n# 2. 注册账户\n# 3. 获取 Access Token: Settings -> Access Tokens'
        },
        {
          step: 2,
          title: '安装 Hugging Face Hub',
          content: '使用 huggingface_hub 库管理模型和数据集。',
          code: 'pip install huggingface_hub\n\n# 登录（可选，下载私有模型需要）\nhuggingface-cli login\n# 或在代码中\nfrom huggingface_hub import login\nlogin(token="hf_...")'
        },
        {
          step: 3,
          title: '使用 Transformers 加载模型',
          content: '一行代码加载任意预训练模型。',
          code: 'from transformers import pipeline\n\n# 文本分类\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love this product!")\nprint(result)  # [{\'label\': \'POSITIVE\', \'score\': 0.99}]\n\n# 文本生成\ngenerator = pipeline("text-generation", model="gpt2")\ntext = generator("Hello, I am", max_length=50)\n\n# 问答\nqa = pipeline("question-answering")\nqa(question="What is AI?", context="AI is artificial intelligence...")'
        },
        {
          step: 4,
          title: '下载特定模型',
          content: '直接加载 Hub 上的模型。',
          code: 'from transformers import AutoModel, AutoTokenizer\n\n# 加载 BERT 中文模型\ntokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")\nmodel = AutoModel.from_pretrained("bert-base-chinese")\n\n# 加载 LLM\nfrom transformers import AutoModelForCausalLM\nmodel = AutoModelForCausalLM.from_pretrained(\n    "Qwen/Qwen2-7B-Instruct",\n    torch_dtype="auto",\n    device_map="auto"\n)'
        },
        {
          step: 5,
          title: '使用 Datasets 加载数据',
          content: 'datasets 库可以轻松加载各种数据集。',
          code: 'from datasets import load_dataset\n\n# 加载数据集\ndataset = load_dataset("imdb")\nprint(dataset["train"][0])\n\n# 加载部分数据\ndataset = load_dataset("wikipedia", "20220301.zh", split="train[:1000]")\n\n# 流式加载大数据集\ndataset = load_dataset("mc4", "zh", streaming=True)'
        }
      ],
      codeExamples: [
        {
          title: '上传模型到 Hub',
          description: '分享你训练的模型',
          code: 'from huggingface_hub import HfApi\n\napi = HfApi()\napi.upload_folder(\n    folder_path="./my_model",\n    repo_id="username/my-model",\n    repo_type="model"\n)'
        },
        {
          title: '创建 Gradio Space',
          description: '快速部署 AI 应用',
          code: '# 创建 app.py\nimport gradio as gr\n\ndef greet(name):\n    return f"Hello {name}!"\n\ndemo = gr.Interface(fn=greet, inputs="text", outputs="text")\ndemo.launch()\n\n# 推送到 Space\n# git push 到 https://huggingface.co/spaces/username/my-app'
        }
      ],
      tips: [
        '使用 cache_dir 参数指定模型下载位置，避免占用系统盘',
        '大模型使用 device_map="auto" 自动分配到多 GPU',
        '使用 Optimum 库可以优化模型推理速度',
        'Spaces 支持 Gradio、Streamlit、Docker 多种部署方式'
      ],
      resources: [
        { name: 'HF 官方课程', url: 'https://huggingface.co/learn', type: 'official' },
        { name: 'Transformers 文档', url: 'https://huggingface.co/docs/transformers', type: 'official' }
      ]
    },
    {
      name: 'fast.ai',
      url: 'https://fast.ai',
      tagline: '最佳深度学习入门课程，自顶向下教学',
      description: 'fast.ai 提供免费的深度学习课程，采用"自顶向下"的教学方法，先实践后理论。课程配套的 fastai 库让深度学习变得简单。',
      features: ['免费视频课程', 'fastai 库', '自顶向下教学', '实战项目', '活跃论坛'],
      useCases: ['深度学习入门', '计算机视觉', 'NLP', '表格数据', '迁移学习'],
      pros: ['完全免费', '实用导向', '社区活跃', '更新及时'],
      cons: ['英文授课', '需要一定编程基础'],
      difficulty: 'beginner',
      pricing: '完全免费',
      tutorial: [
        {
          step: 1,
          title: '观看课程',
          content: '访问 course.fast.ai 开始学习，建议从 Practical Deep Learning 开始。',
          code: '# 课程地址\n# https://course.fast.ai/\n\n# 推荐学习路径：\n# 1. Practical Deep Learning for Coders\n# 2. Deep Learning from the Foundations\n# 3. NLP Course'
        },
        {
          step: 2,
          title: '安装 fastai',
          content: 'fastai 是课程配套的高级深度学习库。',
          code: '# 安装\npip install fastai\n\n# 或使用 conda\nconda install -c fastai fastai'
        },
        {
          step: 3,
          title: '图像分类示例',
          content: '几行代码完成图像分类模型训练。',
          code: 'from fastai.vision.all import *\n\n# 下载数据\npath = untar_data(URLs.PETS)\n\n# 创建数据加载器\ndls = ImageDataLoaders.from_name_func(\n    path, get_image_files(path/"images"),\n    label_func=lambda x: x[0].isupper(),\n    item_tfms=Resize(224)\n)\n\n# 创建并训练模型\nlearn = vision_learner(dls, resnet34, metrics=error_rate)\nlearn.fine_tune(1)'
        },
        {
          step: 4,
          title: '文本分类示例',
          content: '使用 fastai 进行 NLP 任务。',
          code: 'from fastai.text.all import *\n\n# 加载 IMDB 数据集\ndls = TextDataLoaders.from_folder(untar_data(URLs.IMDB))\n\n# 创建语言模型\nlearn = text_classifier_learner(dls, AWD_LSTM, metrics=accuracy)\nlearn.fine_tune(4)'
        },
        {
          step: 5,
          title: '导出和部署',
          content: '导出训练好的模型。',
          code: '# 导出模型\nlearn.export("model.pkl")\n\n# 加载并使用\nlearn = load_learner("model.pkl")\npred, _, probs = learn.predict("path/to/image.jpg")'
        }
      ],
      codeExamples: [
        {
          title: '学习率查找',
          description: '找到最佳学习率',
          code: 'learn.lr_find()\nlearn.recorder.plot_lr_find()'
        },
        {
          title: '数据增强',
          description: '使用 aug_transforms 增强数据',
          code: 'dls = ImageDataLoaders.from_folder(\n    path,\n    train="train",\n    valid="valid",\n    item_tfms=Resize(460),\n    batch_tfms=aug_transforms(size=224)\n)'
        }
      ],
      tips: [
        '先跑通代码再理解原理，这是 fast.ai 的核心教学理念',
        '使用 learn.lr_find() 找到最佳学习率',
        'fine_tune() 会自动使用迁移学习策略',
        '论坛 forums.fast.ai 有大量问答资源'
      ],
      resources: [
        { name: 'fast.ai 课程', url: 'https://course.fast.ai', type: 'official' },
        { name: 'fastai 文档', url: 'https://docs.fast.ai', type: 'official' },
        { name: '《Deep Learning for Coders》书', url: 'https://github.com/fastai/fastbook', type: 'book' }
      ]
    }
  ]
};

// ============================================
// 导出所有类别
// ============================================

export const allCategoriesZh: Category[] = [
  aiFrameworksZh,
  llmToolsZh,
  aiPlatformsZh,
  learningResourcesZh
];

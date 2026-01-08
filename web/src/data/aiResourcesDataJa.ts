// AI Resources 日本語版データ

import type { Category } from './aiResourcesData';

// ============================================
// AI フレームワーク
// ============================================

export const aiFrameworksJa: Category = {
  id: 'frameworks',
  title: 'AIフレームワーク',
  gradient: 'from-blue-500 to-cyan-500',
  description: '深層学習・機械学習の主要開発フレームワーク',
  items: [
    {
      name: 'PyTorch',
      url: 'https://pytorch.org',
      tagline: 'Meta開発、研究分野で最も人気の深層学習フレームワーク',
      description: 'PyTorchはMeta AIが開発したオープンソースの深層学習フレームワークです。動的計算グラフ（Define-by-Run）で知られ、柔軟なテンソル計算と自動微分機能を提供します。学術論文での使用率は80%を超え、AI研究のデファクトスタンダードです。',
      features: ['動的計算グラフでデバッグが容易', 'TorchScriptで本番デプロイ対応', 'torchvision/torchaudio/torchtext エコシステム', 'CUDA加速、マルチGPU訓練', '活発なコミュニティと豊富な事前学習モデル'],
      useCases: ['学術研究と論文再現', 'コンピュータビジョン', '自然言語処理', '強化学習', '生成モデル'],
      pros: ['Pythonらしい直感的なコード', 'デバッグ体験が良い', 'コミュニティが活発', 'Hugging Face統合'],
      cons: ['本番デプロイがやや複雑', 'モバイル対応はTFに劣る', '分散設定が煩雑'],
      difficulty: 'intermediate',
      pricing: '完全無料・オープンソース',
      tutorial: [
        {
          step: 1,
          title: 'PyTorchのインストール',
          content: 'pytorch.orgでシステム構成を選択し、インストールコマンドを取得します。condaまたはpipでのインストールを推奨。',
          code: '# CPU版\npip install torch torchvision torchaudio\n\n# GPU版 (CUDA 12.1)\npip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121'
        },
        {
          step: 2,
          title: 'インストール確認',
          content: 'PyTorchが正しくインストールされ、GPUが利用可能か確認します。',
          code: 'import torch\nprint(f"PyTorch バージョン: {torch.__version__}")\nprint(f"CUDA 利用可能: {torch.cuda.is_available()}")\nif torch.cuda.is_available():\n    print(f"GPU: {torch.cuda.get_device_name(0)}")'
        },
        {
          step: 3,
          title: 'テンソル基本操作',
          content: 'PyTorchの核心はテンソル（Tensor）です。NumPy配列に似ていますがGPU加速をサポートします。',
          code: '# テンソル作成\nx = torch.randn(3, 4)  # ランダムテンソル\ny = torch.zeros(3, 4)  # ゼロテンソル\nz = torch.ones(3, 4)   # 1テンソル\n\n# テンソル演算\nresult = x + y\nresult = torch.matmul(x, x.T)  # 行列積\n\n# GPUへ移動\nif torch.cuda.is_available():\n    x = x.cuda()'
        },
        {
          step: 4,
          title: 'ニューラルネットワーク構築',
          content: 'torch.nnモジュールでニューラルネットワークを構築。nn.Moduleクラスを継承してモデルを定義します。',
          code: 'import torch.nn as nn\n\nclass SimpleNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc1 = nn.Linear(784, 128)\n        self.fc2 = nn.Linear(128, 10)\n        self.relu = nn.ReLU()\n    \n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.fc2(x)\n        return x\n\nmodel = SimpleNN()'
        },
        {
          step: 5,
          title: '訓練ループ',
          content: '損失関数とオプティマイザを定義し、訓練ループを実装します。',
          code: 'criterion = nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\n\nfor epoch in range(10):\n    for batch_x, batch_y in dataloader:\n        optimizer.zero_grad()           # 勾配クリア\n        outputs = model(batch_x)         # 順伝播\n        loss = criterion(outputs, batch_y)\n        loss.backward()                  # 逆伝播\n        optimizer.step()                 # パラメータ更新\n    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")'
        }
      ],
      codeExamples: [
        {
          title: '画像分類（事前学習モデル使用）',
          description: 'torchvisionの事前学習ResNetで画像分類',
          code: 'import torchvision.models as models\nimport torchvision.transforms as transforms\nfrom PIL import Image\n\n# 事前学習モデル読み込み\nmodel = models.resnet50(pretrained=True)\nmodel.eval()\n\n# 画像前処理\ntransform = transforms.Compose([\n    transforms.Resize(256),\n    transforms.CenterCrop(224),\n    transforms.ToTensor(),\n    transforms.Normalize(\n        mean=[0.485, 0.456, 0.406],\n        std=[0.229, 0.224, 0.225]\n    )\n])\n\n# 推論\nimg = Image.open("cat.jpg")\ninput_tensor = transform(img).unsqueeze(0)\nwith torch.no_grad():\n    output = model(input_tensor)\n    pred = output.argmax(dim=1)'
        },
        {
          title: 'モデルの保存と読み込み',
          description: 'モデル永続化の2つの方法',
          code: '# 方法1：パラメータのみ保存（推奨）\ntorch.save(model.state_dict(), "model.pth")\n\n# パラメータ読み込み\nmodel = SimpleNN()\nmodel.load_state_dict(torch.load("model.pth"))\n\n# 方法2：モデル全体を保存\ntorch.save(model, "full_model.pth")\nmodel = torch.load("full_model.pth")'
        },
        {
          title: 'DataLoaderの使用',
          description: '効率的なデータ読み込みとバッチ処理',
          code: 'from torch.utils.data import DataLoader, Dataset\n\nclass MyDataset(Dataset):\n    def __init__(self, data, labels):\n        self.data = data\n        self.labels = labels\n    \n    def __len__(self):\n        return len(self.data)\n    \n    def __getitem__(self, idx):\n        return self.data[idx], self.labels[idx]\n\ndataset = MyDataset(X, y)\nloader = DataLoader(\n    dataset, \n    batch_size=32, \n    shuffle=True,\n    num_workers=4\n)'
        }
      ],
      tips: [
        '推論時はmodel.eval()とtorch.no_grad()を使用し、メモリ節約と高速化を図る',
        'メモリ不足時はbatch_sizeを減らすかgradient accumulationを使用',
        'torch.cuda.ampで混合精度訓練を行い、訓練の高速化とメモリ削減を実現',
        'DataLoaderのnum_workers > 0でデータ読み込みを高速化（Windowsではif __name__ == "__main__"が必要な場合あり）',
        'torchinfoライブラリでモデル構造とパラメータ数を簡単に確認可能'
      ],
      resources: [
        { name: 'PyTorch公式チュートリアル', url: 'https://pytorch.org/tutorials/', type: 'official' },
        { name: '60分入門', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'tutorial' },
        { name: 'PyTorch公式サンプル', url: 'https://github.com/pytorch/examples', type: 'official' }
      ]
    },
    {
      name: 'TensorFlow',
      url: 'https://tensorflow.org',
      tagline: 'Google開発、本番デプロイに最も成熟したMLプラットフォーム',
      description: 'TensorFlowはGoogleが開発したエンドツーエンドの機械学習プラットフォームで、研究から本番までの完全なツールチェーンを提供します。TF 2.xではKerasを高レベルAPIとして採用し、使いやすさが大幅に向上しました。',
      features: ['Keras高レベルAPI', 'TensorBoard可視化', 'TF Liteモバイル対応', 'TF Servingデプロイ', 'SavedModel形式'],
      useCases: ['大規模本番システム', 'モバイルAI', 'ブラウザML', 'Google Cloud', 'レコメンドシステム'],
      pros: ['デプロイエコシステムが充実', 'クロスプラットフォーム対応', 'Googleがメンテナンス', 'エンタープライズサポート'],
      cons: ['学習曲線が急', 'デバッグはPyTorchに劣る', 'API変更が多い'],
      difficulty: 'intermediate',
      pricing: '完全無料・オープンソース',
      tutorial: [
        {
          step: 1,
          title: 'TensorFlowのインストール',
          content: 'pipでTensorFlowをインストール。GPU版は自動でCUDAを検出します。',
          code: '# インストール（GPU自動対応）\npip install tensorflow\n\n# インストール確認\nimport tensorflow as tf\nprint(f"TensorFlow バージョン: {tf.__version__}")\nprint(f"GPU 利用可能: {len(tf.config.list_physical_devices(\'GPU\')) > 0}")'
        },
        {
          step: 2,
          title: 'Keras Sequential APIの使用',
          content: '最もシンプルなモデル構築方法で、線形に積み重ねるネットワークに適しています。',
          code: 'from tensorflow import keras\nfrom keras import layers\n\nmodel = keras.Sequential([\n    layers.Dense(128, activation="relu", input_shape=(784,)),\n    layers.Dropout(0.2),\n    layers.Dense(64, activation="relu"),\n    layers.Dense(10, activation="softmax")\n])\n\nmodel.summary()'
        },
        {
          step: 3,
          title: 'モデルのコンパイルと訓練',
          content: 'オプティマイザ、損失関数、評価指標を指定して訓練します。',
          code: 'model.compile(\n    optimizer="adam",\n    loss="sparse_categorical_crossentropy",\n    metrics=["accuracy"]\n)\n\nhistory = model.fit(\n    x_train, y_train,\n    epochs=10,\n    batch_size=32,\n    validation_split=0.2,\n    callbacks=[\n        keras.callbacks.EarlyStopping(patience=3),\n        keras.callbacks.TensorBoard(log_dir="./logs")\n    ]\n)'
        },
        {
          step: 4,
          title: 'TensorBoardで可視化',
          content: '訓練プロセスの可視化はTensorFlowの大きな強みです。',
          code: '# 訓練時にTensorBoard callbackを追加（前のステップ参照）\n\n# TensorBoard起動\n# ターミナルで実行: tensorboard --logdir=./logs\n# ブラウザでアクセス: http://localhost:6006'
        },
        {
          step: 5,
          title: 'モデルの保存と読み込み',
          content: 'TensorFlowは複数のモデル保存形式を提供します。',
          code: '# SavedModel形式（推奨、完全保存）\nmodel.save("my_model")  # ディレクトリとして保存\nloaded = keras.models.load_model("my_model")\n\n# H5形式\nmodel.save("model.h5")\nloaded = keras.models.load_model("model.h5")\n\n# 重みのみ保存\nmodel.save_weights("weights.h5")\nmodel.load_weights("weights.h5")'
        }
      ],
      codeExamples: [
        {
          title: 'Functional APIで複雑なモデル構築',
          description: '複数入力/出力や共有レイヤーを持つモデルに適している',
          code: 'inputs = keras.Input(shape=(784,))\nx = layers.Dense(128, activation="relu")(inputs)\nx = layers.Dense(64, activation="relu")(x)\noutputs = layers.Dense(10, activation="softmax")(x)\n\nmodel = keras.Model(inputs=inputs, outputs=outputs)'
        },
        {
          title: 'カスタム訓練ループ',
          description: 'より柔軟な訓練制御',
          code: '@tf.function\ndef train_step(x, y):\n    with tf.GradientTape() as tape:\n        predictions = model(x, training=True)\n        loss = loss_fn(y, predictions)\n    gradients = tape.gradient(loss, model.trainable_variables)\n    optimizer.apply_gradients(zip(gradients, model.trainable_variables))\n    return loss'
        }
      ],
      tips: [
        '@tf.functionデコレータでPython関数を計算グラフにコンパイルし、パフォーマンスを大幅に向上',
        'TensorFlow 2.xはデフォルトでEager Executionが有効、デバッグが容易',
        'tf.data.Datasetで効率的なデータ入力パイプラインを構築可能',
        'TensorFlow Liteでモバイル・組み込みデバイスへのデプロイが可能'
      ],
      resources: [
        { name: 'TensorFlow公式チュートリアル', url: 'https://tensorflow.org/tutorials', type: 'official' },
        { name: 'Keras公式ドキュメント', url: 'https://keras.io', type: 'official' },
        { name: 'TensorFlow認定資格', url: 'https://tensorflow.org/certificate', type: 'official' }
      ]
    },
    {
      name: 'scikit-learn',
      url: 'https://scikit-learn.org',
      tagline: '従来型機械学習ライブラリ、データサイエンス必須ツール',
      description: 'scikit-learnはPythonで最も人気のある従来型機械学習ライブラリで、分類、回帰、クラスタリング、次元削減などのアルゴリズムを統一インターフェースで提供します。表形式データと従来型MLタスクには今でも第一選択です。',
      features: ['統一されたfit/predict API', '豊富なMLアルゴリズム', 'データ前処理ツール', 'モデル評価と選択', 'Pipelineワークフロー'],
      useCases: ['表形式データ分析', '特徴量エンジニアリング', 'モデルベースライン', 'データ前処理', 'A/Bテスト'],
      pros: ['エレガントで統一されたAPI設計', 'ドキュメントとサンプルが充実', '安定して信頼性が高い', 'pandasとの統合'],
      cons: ['深層学習非対応', 'GPU非対応', '大規模データセットでパフォーマンス制限'],
      difficulty: 'beginner',
      pricing: '完全無料・オープンソース',
      tutorial: [
        {
          step: 1,
          title: 'scikit-learnのインストール',
          content: 'pipでインストール。通常numpy、pandasと一緒に使用します。',
          code: 'pip install scikit-learn pandas numpy matplotlib\n\n# インストール確認\nimport sklearn\nprint(f"scikit-learn バージョン: {sklearn.__version__}")'
        },
        {
          step: 2,
          title: 'データ読み込みと分割',
          content: 'sklearnはサンプルデータセットとデータ分割ツールを提供します。',
          code: 'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\n# データ読み込み\niris = load_iris()\nX, y = iris.data, iris.target\n\n# 訓練セットとテストセットに分割\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)'
        },
        {
          step: 3,
          title: 'モデル訓練',
          content: 'すべてのモデルは統一されたfit/predictインターフェースを使用します。',
          code: 'from sklearn.ensemble import RandomForestClassifier\n\n# モデル作成\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\n\n# 訓練\nmodel.fit(X_train, y_train)\n\n# 予測\ny_pred = model.predict(X_test)'
        },
        {
          step: 4,
          title: 'モデル評価',
          content: '複数の指標でモデル性能を評価します。',
          code: 'from sklearn.metrics import accuracy_score, classification_report, confusion_matrix\n\n# 正解率\nprint(f"正解率: {accuracy_score(y_test, y_pred):.4f}")\n\n# 詳細レポート\nprint(classification_report(y_test, y_pred))\n\n# 混同行列\nprint(confusion_matrix(y_test, y_pred))'
        },
        {
          step: 5,
          title: 'Pipelineの使用',
          content: 'Pipelineで前処理とモデル訓練を一つのフローにまとめます。',
          code: 'from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\n\n# パイプライン作成\npipeline = Pipeline([\n    ("scaler", StandardScaler()),\n    ("classifier", RandomForestClassifier())\n])\n\n# 前処理と訓練を一度に\npipeline.fit(X_train, y_train)\ny_pred = pipeline.predict(X_test)'
        }
      ],
      codeExamples: [
        {
          title: '交差検証',
          description: 'K分割交差検証でモデルの安定性を評価',
          code: 'from sklearn.model_selection import cross_val_score\n\nscores = cross_val_score(model, X, y, cv=5, scoring="accuracy")\nprint(f"交差検証正解率: {scores.mean():.4f} (+/- {scores.std()*2:.4f})")'
        },
        {
          title: 'グリッドサーチでハイパーパラメータ調整',
          description: '最適なハイパーパラメータを自動探索',
          code: 'from sklearn.model_selection import GridSearchCV\n\nparam_grid = {\n    "n_estimators": [50, 100, 200],\n    "max_depth": [None, 10, 20]\n}\n\ngrid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)\ngrid_search.fit(X_train, y_train)\nprint(f"最適パラメータ: {grid_search.best_params_}")'
        },
        {
          title: '特徴量重要度',
          description: 'どの特徴量が予測に最も重要か確認',
          code: 'import pandas as pd\n\nimportance = pd.DataFrame({\n    "feature": iris.feature_names,\n    "importance": model.feature_importances_\n}).sort_values("importance", ascending=False)\nprint(importance)'
        }
      ],
      tips: [
        '訓練前に必ずデータを標準化（StandardScaler）または正規化（MinMaxScaler）する',
        'Pipelineを使用することでデータ漏洩を防ぎ、前処理が訓練セットのみでフィットされることを保証',
        '不均衡データにはclass_weight="balanced"またはSMOTEオーバーサンプリングを使用',
        'joblib.dump()でモデル保存するとpickleより効率的'
      ],
      resources: [
        { name: 'sklearn公式ユーザーガイド', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'official' },
        { name: 'sklearn公式サンプル', url: 'https://scikit-learn.org/stable/auto_examples/', type: 'tutorial' }
      ]
    }
  ]
};

// ============================================
// LLM 開発ツール
// ============================================

export const llmToolsJa: Category = {
  id: 'llm-tools',
  title: 'LLM開発ツール',
  gradient: 'from-violet-500 to-purple-500',
  description: '大規模言語モデルアプリケーション開発フレームワークとツール',
  items: [
    {
      name: 'LangChain',
      url: 'https://langchain.com',
      tagline: 'LLMアプリ開発フレームワーク、チェーンとAgentの第一選択',
      description: 'LangChainはLLMアプリケーション構築の主流フレームワークで、Chain（チェーン）、Agent（エージェント）、Memory（メモリ）などの抽象化を提供し、ChatGPTのようなアプリを開発するためのスイスアーミーナイフです。',
      features: ['Chainチェーン呼び出し', 'Agent自律的意思決定', 'Memory会話記憶', 'RAG検索拡張生成', '100以上の統合'],
      useCases: ['チャットボット', 'RAG質問応答', 'ドキュメント分析', 'Agent自動化', 'LLMアプリ'],
      pros: ['エコシステムが充実', 'コミュニティが活発', 'ドキュメントが充実', 'LangSmithで可観測性'],
      cons: ['抽象レイヤーが多い', 'APIが不安定', '過度なカプセル化'],
      difficulty: 'intermediate',
      pricing: 'オープンソース無料、LangSmithは有料版あり',
      tutorial: [
        {
          step: 1,
          title: 'LangChainのインストール',
          content: 'LangChainはコアパッケージと統合パッケージに分かれており、必要に応じてインストールします。',
          code: '# コアパッケージ\npip install langchain langchain-core\n\n# OpenAI統合\npip install langchain-openai\n\n# Anthropic統合\npip install langchain-anthropic\n\n# API Key設定\nexport OPENAI_API_KEY="your-key"'
        },
        {
          step: 2,
          title: '基本的なLLM呼び出し',
          content: 'LangChainで最もシンプルなLLM呼び出し方法。',
          code: 'from langchain_openai import ChatOpenAI\nfrom langchain_core.messages import HumanMessage\n\n# モデル初期化\nllm = ChatOpenAI(model="gpt-4")\n\n# 呼び出し\nresponse = llm.invoke([HumanMessage(content="こんにちは！")])\nprint(response.content)'
        },
        {
          step: 3,
          title: 'プロンプトテンプレート',
          content: 'プロンプトテンプレートで変数を動的に挿入。',
          code: 'from langchain_core.prompts import ChatPromptTemplate\n\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "あなたは{role}です。"),\n    ("human", "{question}")\n])\n\nchain = prompt | llm\nresponse = chain.invoke({"role": "優秀なプログラマー", "question": "Pythonって何？"})'
        },
        {
          step: 4,
          title: 'RAG実装',
          content: '検索拡張生成（RAG）でドキュメントを検索して回答。',
          code: 'from langchain_community.vectorstores import Chroma\nfrom langchain_openai import OpenAIEmbeddings\nfrom langchain_core.runnables import RunnablePassthrough\n\n# ベクトルストア作成\nvectorstore = Chroma.from_texts(texts, OpenAIEmbeddings())\nretriever = vectorstore.as_retriever()\n\n# RAGチェーン\nrag_chain = (\n    {"context": retriever, "question": RunnablePassthrough()}\n    | prompt\n    | llm\n)'
        },
        {
          step: 5,
          title: 'Agent構築',
          content: 'ツールを使って自律的に意思決定するAgent。',
          code: 'from langchain.agents import create_openai_functions_agent, AgentExecutor\nfrom langchain_community.tools import WikipediaQueryRun\n\n# ツール定義\ntools = [WikipediaQueryRun()]\n\n# Agent作成\nagent = create_openai_functions_agent(llm, tools, prompt)\nexecutor = AgentExecutor(agent=agent, tools=tools)\n\n# 実行\nresult = executor.invoke({"input": "東京の人口は？"})'
        }
      ],
      codeExamples: [
        {
          title: '会話メモリ',
          description: '会話履歴を保持してコンテキストを維持',
          code: 'from langchain.memory import ConversationBufferMemory\n\nmemory = ConversationBufferMemory(return_messages=True)\n\n# 会話追加\nmemory.save_context(\n    {"input": "私の名前は田中です"},\n    {"output": "こんにちは、田中さん！"}\n)\n\n# 履歴取得\nprint(memory.load_memory_variables({}))'
        },
        {
          title: 'ストリーミング出力',
          description: 'リアルタイムでトークンを出力',
          code: 'for chunk in llm.stream("長い物語を書いてください"):\n    print(chunk.content, end="", flush=True)'
        }
      ],
      tips: [
        'LCEL（LangChain Expression Language）を使用すると、チェーンをより簡潔に書ける',
        'LangSmithでチェーン実行をトレースしてデバッグを効率化',
        'シンプルなユースケースではLangChainは過剰かも、直接OpenAI APIを使用することも検討',
        '本番環境ではキャッシュ、リトライ、タイムアウト設定を忘れずに'
      ],
      resources: [
        { name: 'LangChain公式ドキュメント', url: 'https://python.langchain.com/docs/', type: 'official' },
        { name: 'LangSmith', url: 'https://smith.langchain.com', type: 'official' }
      ]
    },
    {
      name: 'Ollama',
      url: 'https://ollama.ai',
      tagline: 'ローカルでLLMを実行、プライバシー重視のオープンソースソリューション',
      description: 'Ollamaはローカルで大規模言語モデルを実行するためのツールで、Llama、Mistral、Gemmaなど多くのオープンソースモデルをサポートします。インストールが簡単で、APIはOpenAIと互換性があります。',
      features: ['ワンクリックインストール', 'OpenAI互換API', '複数モデル対応', 'カスタムモデル対応', 'プライバシー保護'],
      useCases: ['ローカル開発テスト', 'プライバシー重視アプリ', 'オフライン使用', 'カスタムファインチューニング', '教育学習'],
      pros: ['完全無料', 'プライバシー保護', 'インストール簡単', 'API互換'],
      cons: ['ハードウェア要件が高い', '大モデルはGPU必須', '推論速度は遅め'],
      difficulty: 'beginner',
      pricing: '完全無料・オープンソース',
      tutorial: [
        {
          step: 1,
          title: 'Ollamaのインストール',
          content: '公式サイトからダウンロードするか、コマンドラインでインストール。',
          code: '# macOS/Linux\ncurl -fsSL https://ollama.ai/install.sh | sh\n\n# Windows\n# ollama.aiからインストーラーをダウンロード\n\n# インストール確認\nollama --version'
        },
        {
          step: 2,
          title: 'モデルのダウンロードと実行',
          content: 'ollamaコマンドでモデルをダウンロードして対話。',
          code: '# Llama 2をダウンロードして実行\nollama run llama2\n\n# 他のモデル\nollama run mistral\nollama run codellama\nollama run gemma:7b\n\n# モデル一覧\nollama list'
        },
        {
          step: 3,
          title: 'API呼び出し',
          content: 'OllamaはOpenAI互換のREST APIを提供します。',
          code: '# APIサーバーはデフォルトで起動\n# http://localhost:11434\n\n# curlで呼び出し\ncurl http://localhost:11434/api/generate -d \'{\n  "model": "llama2",\n  "prompt": "なぜ空は青いですか？"\n}\''
        },
        {
          step: 4,
          title: 'Pythonでの使用',
          content: 'ollamaライブラリまたはOpenAIクライアントで呼び出し。',
          code: '# 方法1：ollamaライブラリ\nimport ollama\n\nresponse = ollama.chat(model="llama2", messages=[\n    {"role": "user", "content": "こんにちは！"}\n])\nprint(response["message"]["content"])\n\n# 方法2：OpenAIクライアント\nfrom openai import OpenAI\n\nclient = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")\nresponse = client.chat.completions.create(\n    model="llama2",\n    messages=[{"role": "user", "content": "こんにちは！"}]\n)'
        },
        {
          step: 5,
          title: 'LangChainとの統合',
          content: 'LangChainでOllamaモデルを使用。',
          code: 'from langchain_community.llms import Ollama\nfrom langchain_core.prompts import ChatPromptTemplate\n\nllm = Ollama(model="llama2")\n\nprompt = ChatPromptTemplate.from_template("あなたはAIアシスタントです。質問: {question}")\nchain = prompt | llm\n\nresponse = chain.invoke({"question": "機械学習とは？"})\nprint(response)'
        }
      ],
      codeExamples: [
        {
          title: 'カスタムモデル作成',
          description: 'Modelfileでカスタムモデルを定義',
          code: '# Modelfile作成\necho \'FROM llama2\nSYSTEM あなたは優秀なプログラマーです。\' > Modelfile\n\n# カスタムモデル作成\nollama create my-coder -f Modelfile\n\n# カスタムモデル実行\nollama run my-coder'
        },
        {
          title: 'ストリーミング出力',
          description: 'リアルタイムで回答を出力',
          code: 'import ollama\n\nfor chunk in ollama.chat(\n    model="llama2",\n    messages=[{"role": "user", "content": "長い物語を書いてください"}],\n    stream=True\n):\n    print(chunk["message"]["content"], end="", flush=True)'
        }
      ],
      tips: [
        '7Bモデルは8GB RAM、13Bモデルは16GB RAMが必要',
        'GPUがある場合、ollamaは自動でGPU加速を使用',
        'プロンプトエンジニアリングでモデルの出力品質を向上',
        'カスタムModelfileでシステムプロンプトとパラメータを設定可能'
      ],
      resources: [
        { name: 'Ollama公式サイト', url: 'https://ollama.ai', type: 'official' },
        { name: 'モデルライブラリ', url: 'https://ollama.ai/library', type: 'official' }
      ]
    }
  ]
};

// ============================================
// AIプラットフォームとAPI
// ============================================

export const aiPlatformsJa: Category = {
  id: 'platforms',
  title: 'AIプラットフォームとAPI',
  gradient: 'from-emerald-500 to-teal-500',
  description: 'クラウドAIサービスとモデルホスティングプラットフォーム',
  items: [
    {
      name: 'OpenAI API',
      url: 'https://platform.openai.com',
      tagline: 'GPT-4、DALL-E、Whisperなど最先端AIモデルAPI',
      description: 'OpenAI APIはGPT-4、GPT-4o、DALL-E 3、Whisperなどの最先端AIモデルへのアクセスを提供します。シンプルなAPIでテキスト生成、画像生成、音声認識などの機能を実現できます。',
      features: ['GPT-4/4oテキスト生成', 'DALL-E 3画像生成', 'Whisper音声認識', 'Embeddings', 'Function Calling'],
      useCases: ['チャットボット', 'コンテンツ生成', 'コード補完', '画像生成', '音声転写'],
      pros: ['最先端モデル', 'API設計が優れている', 'ドキュメントが充実', '安定した運用'],
      cons: ['コストが高め', 'レート制限あり', 'プライバシー懸念'],
      difficulty: 'beginner',
      pricing: '従量課金、GPT-4oは$5/100万入力トークン',
      tutorial: [
        {
          step: 1,
          title: 'API Keyの取得',
          content: 'platform.openai.comでアカウント作成、API Keyを取得します。',
          code: '# 環境変数に設定\nexport OPENAI_API_KEY="sk-..."\n\n# または.envファイル\necho \'OPENAI_API_KEY=sk-...\' > .env'
        },
        {
          step: 2,
          title: 'Pythonライブラリのインストール',
          content: 'OpenAI公式Pythonライブラリをインストール。',
          code: 'pip install openai\n\n# バージョン確認\nimport openai\nprint(openai.__version__)  # 1.x以上'
        },
        {
          step: 3,
          title: '基本的なChat Completions',
          content: 'GPT-4oで対話を生成。',
          code: 'from openai import OpenAI\n\nclient = OpenAI()\n\nresponse = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[\n        {"role": "system", "content": "あなたは優秀なアシスタントです。"},\n        {"role": "user", "content": "Pythonって何？"}\n    ]\n)\n\nprint(response.choices[0].message.content)'
        },
        {
          step: 4,
          title: '画像生成（DALL-E 3）',
          content: 'テキストプロンプトから画像を生成。',
          code: 'response = client.images.generate(\n    model="dall-e-3",\n    prompt="夕焼けの富士山、浮世絵スタイル",\n    size="1024x1024",\n    quality="hd",\n    n=1\n)\n\nimage_url = response.data[0].url\nprint(image_url)'
        },
        {
          step: 5,
          title: '音声認識（Whisper）',
          content: '音声ファイルをテキストに変換。',
          code: 'audio_file = open("speech.mp3", "rb")\n\ntranscript = client.audio.transcriptions.create(\n    model="whisper-1",\n    file=audio_file\n)\n\nprint(transcript.text)'
        }
      ],
      codeExamples: [
        {
          title: 'ストリーミング出力',
          description: 'リアルタイムでトークンを取得',
          code: 'stream = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[{"role": "user", "content": "短い物語を書いてください"}],\n    stream=True\n)\n\nfor chunk in stream:\n    if chunk.choices[0].delta.content:\n        print(chunk.choices[0].delta.content, end="")'
        },
        {
          title: 'Function Calling',
          description: '関数呼び出しで外部ツールを使用',
          code: 'tools = [{\n    "type": "function",\n    "function": {\n        "name": "get_weather",\n        "description": "現在の天気を取得",\n        "parameters": {\n            "type": "object",\n            "properties": {\n                "location": {"type": "string", "description": "都市名"}\n            },\n            "required": ["location"]\n        }\n    }\n}]\n\nresponse = client.chat.completions.create(\n    model="gpt-4o",\n    messages=[{"role": "user", "content": "東京の天気は？"}],\n    tools=tools\n)'
        }
      ],
      tips: [
        'システムプロンプトでモデルの動作をカスタマイズ',
        'temperatureを低くすると出力が安定、高くすると創造的に',
        'max_tokensで出力長を制限してコストを管理',
        'Batch APIで大量リクエストを50%割引で処理可能'
      ],
      resources: [
        { name: 'OpenAI APIドキュメント', url: 'https://platform.openai.com/docs', type: 'official' },
        { name: 'OpenAI Cookbook', url: 'https://cookbook.openai.com', type: 'tutorial' }
      ]
    },
    {
      name: 'Hugging Face',
      url: 'https://huggingface.co',
      tagline: 'AIコミュニティのGitHub、モデルとデータセットのホーム',
      description: 'Hugging FaceはAI/MLコミュニティの中心的プラットフォームで、モデル、データセット、Spacesアプリのホスティングを提供します。Transformersライブラリは事実上の標準となっています。',
      features: ['40万以上のモデル', '10万以上のデータセット', 'Spacesアプリホスティング', 'Transformersライブラリ', 'Inference API'],
      useCases: ['モデル共有', 'ファインチューニング', 'デモアプリデプロイ', 'データセット利用', 'API推論'],
      pros: ['巨大なモデルエコシステム', '無料モデルホスティング', 'コミュニティが活発', 'Transformersの標準'],
      cons: ['無料Spacesは遅め', 'モデル品質にばらつき', '依存関係が複雑な場合あり'],
      difficulty: 'beginner',
      pricing: '基本無料、Pro版$9/月、Inference API従量課金',
      tutorial: [
        {
          step: 1,
          title: 'Transformersのインストール',
          content: 'Hugging Face Transformersライブラリをインストール。',
          code: 'pip install transformers torch\n\n# オプション：高速tokenizer\npip install transformers[torch] accelerate'
        },
        {
          step: 2,
          title: 'Pipelineでクイックスタート',
          content: 'Pipelineで数行で推論を実行。',
          code: 'from transformers import pipeline\n\n# 感情分析\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love this product!")\nprint(result)  # [{\'label\': \'POSITIVE\', \'score\': 0.99}]\n\n# テキスト生成\ngenerator = pipeline("text-generation", model="gpt2")\ntext = generator("Once upon a time", max_length=50)\nprint(text)'
        },
        {
          step: 3,
          title: 'モデルとTokenizerの直接使用',
          content: 'より細かい制御が必要な場合。',
          code: 'from transformers import AutoTokenizer, AutoModelForSequenceClassification\nimport torch\n\nmodel_name = "bert-base-uncased"\ntokenizer = AutoTokenizer.from_pretrained(model_name)\nmodel = AutoModelForSequenceClassification.from_pretrained(model_name)\n\ninputs = tokenizer("Hello world!", return_tensors="pt")\nwith torch.no_grad():\n    outputs = model(**inputs)'
        },
        {
          step: 4,
          title: 'モデルの共有',
          content: 'トレーニングしたモデルを共有。',
          code: 'from huggingface_hub import HfApi\n\napi = HfApi()\napi.upload_folder(\n    folder_path="./my_model",\n    repo_id="username/my-model",\n    repo_type="model"\n)'
        },
        {
          step: 5,
          title: 'Gradio Spaceの作成',
          content: 'AIアプリを素早くデプロイ。',
          code: '# app.pyを作成\nimport gradio as gr\n\ndef greet(name):\n    return f"Hello {name}!"\n\ndemo = gr.Interface(fn=greet, inputs="text", outputs="text")\ndemo.launch()\n\n# Spaceにプッシュ\n# git push to https://huggingface.co/spaces/username/my-app'
        }
      ],
      codeExamples: [
        {
          title: 'Inference APIの使用',
          description: 'APIでモデル推論（GPU不要）',
          code: 'import requests\n\nAPI_URL = "https://api-inference.huggingface.co/models/gpt2"\nheaders = {"Authorization": "Bearer hf_..."}\n\nresponse = requests.post(API_URL, headers=headers, json={"inputs": "Hello"})\nprint(response.json())'
        },
        {
          title: 'データセットの読み込み',
          description: 'datasetsライブラリでデータセットを読み込み',
          code: 'from datasets import load_dataset\n\n# IMDBデータセット\ndataset = load_dataset("imdb")\nprint(dataset["train"][0])\n\n# 日本語データセット\njp_dataset = load_dataset("llm-jp/llm-jp-corpus-v2")'
        }
      ],
      tips: [
        'cache_dirパラメータでモデルのダウンロード場所を指定し、システムドライブの圧迫を防ぐ',
        '大規模モデルはdevice_map="auto"で自動的にマルチGPUに分散',
        'Optimumライブラリでモデル推論を最適化可能',
        'SpacesはGradio、Streamlit、Docker複数の方式でデプロイ可能'
      ],
      resources: [
        { name: 'HF公式コース', url: 'https://huggingface.co/learn', type: 'official' },
        { name: 'Transformersドキュメント', url: 'https://huggingface.co/docs/transformers', type: 'official' }
      ]
    }
  ]
};

// ============================================
// 学習リソース
// ============================================

export const learningResourcesJa: Category = {
  id: 'learning',
  title: '学習リソース',
  gradient: 'from-rose-500 to-pink-500',
  description: 'AI/ML学習のための推奨コースと教材',
  items: [
    {
      name: 'Hugging Face Course',
      url: 'https://huggingface.co/learn',
      tagline: 'Transformersを学ぶ最良の無料コース',
      description: 'Hugging Face公式の無料コースで、NLPからDiffusionモデルまで幅広いトピックをカバーしています。実践的なコード例が豊富で、すぐに使える知識が身につきます。',
      features: ['完全無料', 'NLPコース', 'RL Course', 'Diffusionコース', '実践的なコード'],
      useCases: ['NLP入門', 'Transformers学習', 'ファインチューニング', 'モデルデプロイ', 'Diffusionモデル'],
      pros: ['完全無料', '公式が提供', '実践的', 'コミュニティサポート'],
      cons: ['英語のみ', '一部内容が古い場合あり'],
      difficulty: 'beginner',
      pricing: '完全無料',
      tutorial: [
        {
          step: 1,
          title: 'コースを選択',
          content: 'huggingface.co/learnで自分のレベルと興味に合ったコースを選択。',
          code: '# 推奨学習パス\n# 1. NLP Course - Transformersの基礎\n# 2. Deep RL Course - 強化学習\n# 3. Diffusion Course - 画像生成\n# 4. Audio Course - 音声処理'
        },
        {
          step: 2,
          title: '環境セットアップ',
          content: 'Google Colabで実行するか、ローカル環境をセットアップ。',
          code: '# 必要なライブラリ\npip install transformers datasets evaluate accelerate\n\n# オプション\npip install torch torchvision torchaudio'
        },
        {
          step: 3,
          title: 'コース受講',
          content: '各章のコンテンツを読み、コードを実行して学習。',
          code: '# NLP Courseの例\nfrom transformers import pipeline\n\n# 様々なNLPタスク\nclassifier = pipeline("text-classification")\nner = pipeline("ner")\nqa = pipeline("question-answering")'
        }
      ],
      codeExamples: [
        {
          title: 'ファインチューニング例',
          description: 'Trainerでモデルをファインチューニング',
          code: 'from transformers import Trainer, TrainingArguments\n\ntraining_args = TrainingArguments(\n    output_dir="./results",\n    num_train_epochs=3,\n    per_device_train_batch_size=8\n)\n\ntrainer = Trainer(\n    model=model,\n    args=training_args,\n    train_dataset=train_dataset\n)\n\ntrainer.train()'
        }
      ],
      tips: [
        'Google Colabの無料GPUを活用して学習',
        'コース修了後は自分のプロジェクトで実践',
        'Discordコミュニティで質問可能',
        'コースは定期的に更新されるので最新版をチェック'
      ],
      resources: [
        { name: 'HF Learn', url: 'https://huggingface.co/learn', type: 'official' },
        { name: 'HF Discord', url: 'https://huggingface.co/discord', type: 'official' }
      ]
    },
    {
      name: 'fast.ai',
      url: 'https://fast.ai',
      tagline: '最高の深層学習入門コース、トップダウン教育法',
      description: 'fast.aiは無料の深層学習コースを提供し、「トップダウン」の教育法を採用しています。まず実践してから理論を学びます。付属のfastaiライブラリで深層学習がシンプルになります。',
      features: ['無料動画コース', 'fastaiライブラリ', 'トップダウン教育', '実践プロジェクト', '活発なフォーラム'],
      useCases: ['深層学習入門', 'コンピュータビジョン', 'NLP', '表形式データ', '転移学習'],
      pros: ['完全無料', '実践的', 'コミュニティが活発', '定期更新'],
      cons: ['英語での講義', 'プログラミング基礎が必要'],
      difficulty: 'beginner',
      pricing: '完全無料',
      tutorial: [
        {
          step: 1,
          title: 'コース視聴',
          content: 'course.fast.aiで学習開始。Practical Deep Learningから始めることを推奨。',
          code: '# コースURL\n# https://course.fast.ai/\n\n# 推奨学習パス\n# 1. Practical Deep Learning for Coders\n# 2. Deep Learning from the Foundations\n# 3. NLP Course'
        },
        {
          step: 2,
          title: 'fastaiのインストール',
          content: 'fastaiはコース付属の高レベル深層学習ライブラリ。',
          code: '# インストール\npip install fastai\n\n# またはconda\nconda install -c fastai fastai'
        },
        {
          step: 3,
          title: '画像分類例',
          content: '数行のコードで画像分類モデルを訓練。',
          code: 'from fastai.vision.all import *\n\n# データダウンロード\npath = untar_data(URLs.PETS)\n\n# データローダー作成\ndls = ImageDataLoaders.from_name_func(\n    path, get_image_files(path/"images"),\n    label_func=lambda x: x[0].isupper(),\n    item_tfms=Resize(224)\n)\n\n# モデル作成と訓練\nlearn = vision_learner(dls, resnet34, metrics=error_rate)\nlearn.fine_tune(1)'
        },
        {
          step: 4,
          title: 'テキスト分類例',
          content: 'fastaiでNLPタスクを実行。',
          code: 'from fastai.text.all import *\n\n# IMDBデータセット読み込み\ndls = TextDataLoaders.from_folder(untar_data(URLs.IMDB))\n\n# 言語モデル作成\nlearn = text_classifier_learner(dls, AWD_LSTM, metrics=accuracy)\nlearn.fine_tune(4)'
        },
        {
          step: 5,
          title: 'エクスポートとデプロイ',
          content: '訓練済みモデルをエクスポート。',
          code: '# モデルエクスポート\nlearn.export("model.pkl")\n\n# 読み込みと使用\nlearn = load_learner("model.pkl")\npred, _, probs = learn.predict("path/to/image.jpg")'
        }
      ],
      codeExamples: [
        {
          title: '学習率探索',
          description: '最適な学習率を見つける',
          code: 'learn.lr_find()\nlearn.recorder.plot_lr_find()'
        },
        {
          title: 'データ拡張',
          description: 'aug_transformsでデータ拡張',
          code: 'dls = ImageDataLoaders.from_folder(\n    path,\n    train="train",\n    valid="valid",\n    item_tfms=Resize(460),\n    batch_tfms=aug_transforms(size=224)\n)'
        }
      ],
      tips: [
        'まずコードを動かしてから原理を理解する、これがfast.aiの核心的な教育理念',
        'learn.lr_find()で最適な学習率を見つける',
        'fine_tune()は自動で転移学習戦略を使用',
        'フォーラムforums.fast.aiに大量のQ&Aリソースがある'
      ],
      resources: [
        { name: 'fast.aiコース', url: 'https://course.fast.ai', type: 'official' },
        { name: 'fastaiドキュメント', url: 'https://docs.fast.ai', type: 'official' },
        { name: '書籍「Deep Learning for Coders」', url: 'https://github.com/fastai/fastbook', type: 'book' }
      ]
    }
  ]
};

// ============================================
// 全カテゴリをエクスポート
// ============================================

export const allCategoriesJa: Category[] = [
  aiFrameworksJa,
  llmToolsJa,
  aiPlatformsJa,
  learningResourcesJa
];

# 深度学习入门

## 什么是深度学习？

深度学习（Deep Learning）是机器学习的一个子集，使用多层神经网络来学习数据的复杂模式和表示。"深度"指的是网络的层数。

## 神经网络基础

### 人工神经元

神经元是神经网络的基本单元，模拟生物神经元的工作方式：

```
输入 (x1, x2, ..., xn)
    ↓
加权求和: z = Σ(wi * xi) + b
    ↓
激活函数: a = f(z)
    ↓
输出
```

### 常见激活函数

| 函数 | 公式 | 特点 |
|------|------|------|
| Sigmoid | σ(x) = 1/(1+e^(-x)) | 输出 (0,1)，用于二分类 |
| Tanh | tanh(x) = (e^x - e^(-x))/(e^x + e^(-x)) | 输出 (-1,1)，零中心 |
| ReLU | f(x) = max(0, x) | 计算简单，缓解梯度消失 |
| Leaky ReLU | f(x) = max(αx, x) | 解决 ReLU 死亡问题 |
| GELU | 高斯误差线性单元 | Transformer 常用 |

### 前向传播与反向传播

**前向传播（Forward Propagation）**
- 输入数据通过网络层层传递
- 最终得到预测输出

**反向传播（Backpropagation）**
- 计算损失函数对参数的梯度
- 使用链式法则层层传递
- 更新网络参数

## 常见网络架构

### 1. 多层感知机（MLP）
最基础的全连接神经网络

```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        return self.layers(x)
```

### 2. 卷积神经网络（CNN）
专门处理图像数据的网络架构

**核心组件：**
- 卷积层（Convolution）：提取局部特征
- 池化层（Pooling）：降低维度
- 全连接层：分类/回归

**经典架构：**
- LeNet-5 (1998)
- AlexNet (2012)
- VGG (2014)
- ResNet (2015)
- EfficientNet (2019)

### 3. 循环神经网络（RNN）
处理序列数据的网络架构

**变体：**
- LSTM（长短期记忆）
- GRU（门控循环单元）
- Bidirectional RNN

**应用：**
- 文本分类
- 机器翻译
- 语音识别

### 4. Transformer
基于注意力机制的架构，现代 NLP 的基础

**核心概念：**
- Self-Attention（自注意力）
- Multi-Head Attention（多头注意力）
- Positional Encoding（位置编码）

**重要模型：**
- BERT (2018) - 双向编码器
- GPT 系列 - 自回归语言模型
- T5 - 文本到文本框架
- Vision Transformer (ViT) - 图像领域

## 深度学习训练技巧

### 优化器选择
| 优化器 | 特点 |
|--------|------|
| SGD | 基础，需要调整学习率 |
| Momentum | 加速收敛 |
| Adam | 自适应学习率，常用 |
| AdamW | Adam + 权重衰减 |
| LAMB | 大批量训练 |

### 正则化技术
- **Dropout**：随机丢弃神经元
- **Batch Normalization**：标准化中间层
- **Layer Normalization**：Transformer 常用
- **L1/L2 正则化**：权重惩罚

### 学习率调度
- Step Decay
- Cosine Annealing
- Warmup + Decay
- OneCycleLR

### 数据增强
- 图像：旋转、翻转、裁剪、颜色变换
- 文本：同义词替换、回译、随机删除
- 音频：时间拉伸、噪声添加

## 深度学习框架

### PyTorch
```python
import torch
import torch.nn as nn
import torch.optim as optim

# 定义模型
model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 1)
)

# 定义损失函数和优化器
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练循环
for epoch in range(100):
    optimizer.zero_grad()
    output = model(input)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
```

### TensorFlow / Keras
```python
import tensorflow as tf
from tensorflow import keras

# 定义模型
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1)
])

# 编译模型
model.compile(optimizer='adam', loss='mse')

# 训练
model.fit(x_train, y_train, epochs=100)
```

## GPU 加速

深度学习需要大量计算，GPU 可以显著加速训练：

| 硬件 | 适用场景 |
|------|----------|
| NVIDIA GPU | 主流选择，CUDA 生态 |
| Apple M1/M2 | macOS 本地训练 |
| Google TPU | 云端大规模训练 |
| AMD GPU | ROCm 支持 |

### 云端 GPU 服务
- Google Colab（免费 T4 GPU）
- Kaggle Notebooks（免费 GPU）
- AWS EC2 / SageMaker
- Google Cloud AI Platform
- Azure Machine Learning

## 学习资源

### 课程
- [Fast.ai](https://www.fast.ai/) - 实践优先
- [Deep Learning Specialization](https://www.coursera.org/specializations/deep-learning) - Andrew Ng
- [Stanford CS231n](http://cs231n.stanford.edu/) - 计算机视觉
- [Stanford CS224n](http://web.stanford.edu/class/cs224n/) - NLP

### 书籍
- 《Deep Learning》- Ian Goodfellow（花书）
- 《Dive into Deep Learning》- 李沐（动手学深度学习）
- 《Neural Networks and Deep Learning》- Michael Nielsen

### 论文阅读
- [Papers with Code](https://paperswithcode.com/)
- [arXiv](https://arxiv.org/)
- [Semantic Scholar](https://www.semanticscholar.org/)

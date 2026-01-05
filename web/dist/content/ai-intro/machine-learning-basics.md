# 机器学习基础

## 什么是机器学习？

机器学习（Machine Learning）是人工智能的核心技术，它让计算机能够从数据中自动学习和改进，而无需明确编程。

> "机器学习是一种让计算机在没有明确编程的情况下学习的能力。" — Arthur Samuel, 1959

## 机器学习的三大范式

### 1. 监督学习（Supervised Learning）

从**标注数据**中学习输入到输出的映射关系。

**常见算法：**
- 线性回归（Linear Regression）
- 逻辑回归（Logistic Regression）
- 决策树（Decision Tree）
- 随机森林（Random Forest）
- 支持向量机（SVM）
- K近邻（KNN）

**应用场景：**
- 图像分类
- 垃圾邮件检测
- 房价预测
- 信用评分

```python
# 简单的线性回归示例
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

### 2. 无监督学习（Unsupervised Learning）

从**未标注数据**中发现隐藏的模式和结构。

**常见算法：**
- K-Means 聚类
- 层次聚类
- 主成分分析（PCA）
- t-SNE
- DBSCAN

**应用场景：**
- 客户分群
- 异常检测
- 数据降维
- 特征学习

```python
# K-Means 聚类示例
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3)
clusters = kmeans.fit_predict(data)
```

### 3. 强化学习（Reinforcement Learning）

通过与**环境交互**和**奖励反馈**来学习最优策略。

**核心概念：**
- Agent（智能体）
- Environment（环境）
- State（状态）
- Action（动作）
- Reward（奖励）
- Policy（策略）

**常见算法：**
- Q-Learning
- Deep Q-Network (DQN)
- Policy Gradient
- Actor-Critic
- PPO (Proximal Policy Optimization)

**应用场景：**
- 游戏 AI（AlphaGo）
- 机器人控制
- 自动驾驶
- 推荐系统

## 机器学习工作流程

```
1. 问题定义
    ↓
2. 数据收集
    ↓
3. 数据预处理
    ↓
4. 特征工程
    ↓
5. 模型选择
    ↓
6. 模型训练
    ↓
7. 模型评估
    ↓
8. 模型优化
    ↓
9. 模型部署
```

## 模型评估指标

### 分类问题
| 指标 | 说明 |
|------|------|
| 准确率（Accuracy） | 正确预测的比例 |
| 精确率（Precision） | 预测为正的样本中真正为正的比例 |
| 召回率（Recall） | 实际为正的样本中被正确预测的比例 |
| F1 Score | 精确率和召回率的调和平均 |
| AUC-ROC | ROC 曲线下面积 |

### 回归问题
| 指标 | 说明 |
|------|------|
| MSE | 均方误差 |
| RMSE | 均方根误差 |
| MAE | 平均绝对误差 |
| R² | 决定系数 |

## 过拟合与欠拟合

### 欠拟合（Underfitting）
- 模型太简单，无法捕捉数据的规律
- 训练误差和测试误差都很高
- 解决方案：增加模型复杂度、增加特征

### 过拟合（Overfitting）
- 模型太复杂，过度学习了训练数据的噪声
- 训练误差低但测试误差高
- 解决方案：正则化、交叉验证、更多数据

## 常用 Python 库

| 库名 | 用途 |
|------|------|
| scikit-learn | 经典机器学习算法 |
| NumPy | 数值计算 |
| Pandas | 数据处理 |
| Matplotlib | 数据可视化 |
| Seaborn | 统计可视化 |
| XGBoost | 梯度提升算法 |
| LightGBM | 轻量级梯度提升 |

## 入门学习资源

### 在线课程
- [Coursera - Machine Learning](https://www.coursera.org/learn/machine-learning)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [Kaggle Learn](https://www.kaggle.com/learn)

### 书籍推荐
- 《统计学习方法》- 李航
- 《机器学习》- 周志华（西瓜书）
- 《Hands-On Machine Learning》- Aurélien Géron

### 实践平台
- [Kaggle](https://www.kaggle.com/) - 数据科学竞赛
- [Google Colab](https://colab.research.google.com/) - 免费 GPU 环境

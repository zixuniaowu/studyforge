// Bilingual labels for Transformer Visualization

export const i18n = {
  zh: {
    title: 'Transformer 可视化演示',
    subtitle: '输入文本，观察模型如何处理',
    inputPlaceholder: '输入文本（如：今天天气很好）',
    generate: '生成',
    reset: '重置',
    temperature: '温度',
    temperatureDesc: '控制输出随机性',
    topK: 'Top-K',
    topKDesc: '只从前 K 个词中选择',
    topP: 'Top-P',
    topPDesc: '累积概率阈值',
    samplingMethod: '采样方式',
    greedy: '贪心',
    topKSampling: 'Top-K 采样',
    topPSampling: 'Top-P 采样',
    animationSpeed: '动画速度',
    slow: '慢',
    normal: '正常',
    fast: '快',

    // Stages
    stage1: '第一步：分词',
    stage1Desc: '将文本拆分为 Token',
    stage2: '第二步：嵌入',
    stage2Desc: '转换为向量表示',
    stage3: '第三步：注意力',
    stage3Desc: '计算词与词之间的关系',
    stage4: '第四步：前馈网络',
    stage4Desc: '非线性变换',
    stage5: '第五步：输出',
    stage5Desc: '生成概率分布',

    // Labels
    tokenization: '分词',
    embedding: '词嵌入',
    tokenEmbedding: '词嵌入（Token Embedding）',
    positionEncoding: '位置编码（Position Encoding）',
    combined: '合并',
    query: '查询 (Q)',
    key: '键 (K)',
    value: '值 (V)',
    attentionWeights: '注意力权重',
    attentionHead: '注意力头',
    headSelector: '注意力头选择',
    mlp: '前馈网络',
    output: '输出概率',
    predictedNext: '预测的下一个词',
    probability: '概率',
    probabilityDist: '概率分布',

    // Tooltips
    tokenTooltip: '点击查看详细信息',
    attentionTooltip: '悬停查看注意力分数',
    hoverToExplore: '悬停探索',
    clickToSelect: '点击选中',

    // Examples
    exampleLabel: '示例',
    examples: [
      '今天天气很好',
      '我喜欢学习AI',
      '机器学习很有趣',
    ],
  },
  ja: {
    title: 'Transformer 可視化デモ',
    subtitle: 'テキストを入力して、モデルの処理を観察',
    inputPlaceholder: 'テキストを入力（例：今日は天気がいい）',
    generate: '生成',
    reset: 'リセット',
    temperature: '温度',
    temperatureDesc: '出力のランダム性を制御',
    topK: 'Top-K',
    topKDesc: '上位K個から選択',
    topP: 'Top-P',
    topPDesc: '累積確率閾値',
    samplingMethod: 'サンプリング',
    greedy: '貪欲',
    topKSampling: 'Top-K',
    topPSampling: 'Top-P',
    animationSpeed: 'アニメ速度',
    slow: '遅い',
    normal: '普通',
    fast: '速い',

    // Stages
    stage1: 'ステップ1：トークン化',
    stage1Desc: 'テキストをトークンに分割',
    stage2: 'ステップ2：埋め込み',
    stage2Desc: 'ベクトル表現に変換',
    stage3: 'ステップ3：アテンション',
    stage3Desc: '単語間の関係を計算',
    stage4: 'ステップ4：FFN',
    stage4Desc: '非線形変換',
    stage5: 'ステップ5：出力',
    stage5Desc: '確率分布を生成',

    // Labels
    tokenization: 'トークン化',
    embedding: '単語埋め込み',
    tokenEmbedding: '単語埋め込み（Token Embedding）',
    positionEncoding: '位置エンコーディング（Position Encoding）',
    combined: '結合',
    query: 'クエリ (Q)',
    key: 'キー (K)',
    value: '値 (V)',
    attentionWeights: 'アテンション重み',
    attentionHead: 'アテンションヘッド',
    headSelector: 'アテンションヘッド選択',
    mlp: 'フィードフォワード',
    output: '出力確率',
    predictedNext: '予測された次の単語',
    probability: '確率',
    probabilityDist: '確率分布',

    // Tooltips
    tokenTooltip: 'クリックで詳細表示',
    attentionTooltip: 'ホバーでスコア表示',
    hoverToExplore: 'ホバーで探索',
    clickToSelect: 'クリックで選択',

    // Examples
    exampleLabel: '例文',
    examples: [
      '今日は天気がいい',
      'AIを勉強するのが好き',
      '機械学習は面白い',
    ],
  },
};

export type Language = 'zh' | 'ja';
export type I18nStrings = typeof i18n.zh;

// GPT-2 Visualization Internationalization

export const i18n = {
  zh: {
    // Title
    title: 'GPT-2 实时推理可视化',
    subtitle: '在浏览器中运行真实的 GPT-2 模型',

    // Model Loading
    loadModel: '加载模型',
    loadingModel: '正在加载模型...',
    modelReady: '模型已就绪',
    modelError: '模型加载失败',
    downloadProgress: '下载进度',
    initializingModel: '初始化模型...',
    loadingTokenizer: '加载分词器...',
    loadingWeights: '加载模型权重...',

    // Controls
    inputPlaceholder: '输入文本（如：The quick brown fox）',
    generate: '生成',
    generating: '生成中...',
    reset: '重置',
    temperature: '温度',
    temperatureDesc: '控制随机性（低=确定，高=多样）',
    topK: 'Top-K',
    topKDesc: '从概率最高的 K 个词中选择',
    topP: 'Top-P',
    topPDesc: '累积概率阈值',

    // Stages
    stage1: '步骤 1：分词',
    stage1Desc: '将文本转换为 Token ID',
    stage2: '步骤 2：嵌入',
    stage2Desc: 'Token 嵌入 + 位置编码',
    stage3: '步骤 3：自注意力',
    stage3Desc: '计算 Token 之间的关系',
    stage4: '步骤 4：前馈网络',
    stage4Desc: 'MLP 非线性变换',
    stage5: '步骤 5：输出预测',
    stage5Desc: '生成下一个 Token 的概率',

    // Attention
    layer: '层',
    head: '头',
    selectLayer: '选择层',
    selectHead: '选择注意力头',
    attentionPattern: '注意力模式',
    showAllHeads: '显示所有头',

    // Embedding
    tokenEmbedding: 'Token 嵌入',
    positionEncoding: '位置编码',
    combinedEmbedding: '合并嵌入',
    dimension: '维度',

    // Output
    nextTokenPrediction: '下一个 Token 预测',
    probability: '概率',
    logit: 'Logit',
    rank: '排名',

    // Info
    modelInfo: '模型信息',
    parameters: '参数量',
    layers: '层数',
    heads: '注意力头',
    embeddingDim: '嵌入维度',
    vocabSize: '词表大小',

    // Status
    ready: '就绪',
    processing: '处理中',
    complete: '完成',
    error: '错误',

    // Tips
    tipHover: '悬停查看详情',
    tipClick: '点击选中',
    tipScroll: '滚动缩放',
  },
  ja: {
    // Title
    title: 'GPT-2 リアルタイム推論可視化',
    subtitle: 'ブラウザで実際のGPT-2モデルを実行',

    // Model Loading
    loadModel: 'モデルを読み込む',
    loadingModel: 'モデルを読み込み中...',
    modelReady: 'モデル準備完了',
    modelError: 'モデルの読み込みに失敗',
    downloadProgress: 'ダウンロード進捗',
    initializingModel: 'モデルを初期化中...',
    loadingTokenizer: 'トークナイザーを読み込み中...',
    loadingWeights: 'モデル重みを読み込み中...',

    // Controls
    inputPlaceholder: 'テキストを入力（例：The quick brown fox）',
    generate: '生成',
    generating: '生成中...',
    reset: 'リセット',
    temperature: '温度',
    temperatureDesc: 'ランダム性を制御（低=確定的、高=多様）',
    topK: 'Top-K',
    topKDesc: '確率上位K個から選択',
    topP: 'Top-P',
    topPDesc: '累積確率閾値',

    // Stages
    stage1: 'ステップ1：トークン化',
    stage1Desc: 'テキストをToken IDに変換',
    stage2: 'ステップ2：埋め込み',
    stage2Desc: 'Token埋め込み + 位置エンコーディング',
    stage3: 'ステップ3：自己注意',
    stage3Desc: 'Token間の関係を計算',
    stage4: 'ステップ4：フィードフォワード',
    stage4Desc: 'MLP非線形変換',
    stage5: 'ステップ5：出力予測',
    stage5Desc: '次のTokenの確率を生成',

    // Attention
    layer: '層',
    head: 'ヘッド',
    selectLayer: '層を選択',
    selectHead: 'アテンションヘッドを選択',
    attentionPattern: 'アテンションパターン',
    showAllHeads: '全ヘッドを表示',

    // Embedding
    tokenEmbedding: 'Token埋め込み',
    positionEncoding: '位置エンコーディング',
    combinedEmbedding: '結合埋め込み',
    dimension: '次元',

    // Output
    nextTokenPrediction: '次のToken予測',
    probability: '確率',
    logit: 'Logit',
    rank: 'ランク',

    // Info
    modelInfo: 'モデル情報',
    parameters: 'パラメータ数',
    layers: '層数',
    heads: 'アテンションヘッド',
    embeddingDim: '埋め込み次元',
    vocabSize: '語彙サイズ',

    // Status
    ready: '準備完了',
    processing: '処理中',
    complete: '完了',
    error: 'エラー',

    // Tips
    tipHover: 'ホバーで詳細表示',
    tipClick: 'クリックで選択',
    tipScroll: 'スクロールでズーム',
  },
};

export type I18nStrings = typeof i18n.zh;

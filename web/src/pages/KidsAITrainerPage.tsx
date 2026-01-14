import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, RotateCcw, Home, Star, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useKidsProgressStore } from '../stores/kidsProgressStore';
import {
  aiTrainerPresets,
  TrainerPreset,
  TrainingSample,
} from '../data/aiTrainerPresets';
import {
  DataCollector,
  TrainingVisualizer,
  PredictionTester,
} from '../components/AITrainer';

// Training phase type
type TrainingPhase = 'select' | 'collect' | 'train' | 'test' | 'complete';

// Animated Neural Network Background Component
const NeuralNetworkBg = () => {
  const [nodes, setNodes] = useState<{ x: number; y: number; layer: number; active: boolean }[]>([]);

  useEffect(() => {
    // Generate neural network nodes
    const layers = [4, 6, 8, 6, 4]; // nodes per layer
    const newNodes: { x: number; y: number; layer: number; active: boolean }[] = [];

    layers.forEach((count, layerIdx) => {
      for (let i = 0; i < count; i++) {
        newNodes.push({
          x: 80 + layerIdx * 120,
          y: 100 + i * 60 + (layerIdx % 2) * 30,
          layer: layerIdx,
          active: false,
        });
      }
    });
    setNodes(newNodes);

    // Animate nodes
    const interval = setInterval(() => {
      setNodes(prev => prev.map((node, idx) => ({
        ...node,
        active: Math.random() > 0.7,
      })));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
      {/* Connections */}
      {nodes.map((node, i) =>
        nodes
          .filter(n => n.layer === node.layer + 1)
          .map((target, j) => (
            <line
              key={`${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke={node.active || target.active ? '#A78BFA' : '#CBD5E1'}
              strokeWidth={node.active && target.active ? 2 : 1}
              className="transition-all duration-300"
            />
          ))
      )}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.active ? 12 : 8}
            fill={node.active ? '#8B5CF6' : '#E2E8F0'}
            className="transition-all duration-300"
          />
          {node.active && (
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth={2}
              opacity={0.5}
              className="animate-ping"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

// Floating particles decoration
const FloatingParticles = () => {
  const particles = [
    { emoji: '🧠', top: '10%', left: '5%', delay: '0s', duration: '3s' },
    { emoji: '⚡', top: '20%', right: '8%', delay: '0.5s', duration: '2.5s' },
    { emoji: '💡', top: '60%', left: '3%', delay: '1s', duration: '3.5s' },
    { emoji: '🔮', top: '70%', right: '5%', delay: '1.5s', duration: '2.8s' },
    { emoji: '✨', top: '40%', left: '8%', delay: '2s', duration: '3.2s' },
    { emoji: '🎯', top: '85%', right: '10%', delay: '0.8s', duration: '3s' },
    { emoji: '📊', top: '30%', right: '3%', delay: '1.2s', duration: '2.6s' },
    { emoji: '🤖', top: '50%', right: '6%', delay: '0.3s', duration: '3.4s' },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute text-3xl animate-bounce pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.6,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  );
};

// Neural Network Layer Diagram for explanation
const NeuralNetworkDiagram = ({ animated = true }: { animated?: boolean }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 5);
    }, 800);
    return () => clearInterval(interval);
  }, [animated]);

  const layers = [
    { name: '入力層', nameJa: '入力層', nodes: 3, color: '#3B82F6' },
    { name: '隠れ層1', nameJa: '隠れ層1', nodes: 4, color: '#8B5CF6' },
    { name: '隠れ層2', nameJa: '隠れ層2', nodes: 5, color: '#A855F7' },
    { name: '隠れ層3', nameJa: '隠れ層3', nodes: 4, color: '#8B5CF6' },
    { name: '出力層', nameJa: '出力層', nodes: 2, color: '#10B981' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-500" />
        ニューラルネットワーク
      </h3>
      <div className="flex items-center justify-between gap-2">
        {layers.map((layer, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`flex flex-col gap-2 p-2 rounded-xl transition-all duration-300 ${
                activeLayer === idx ? 'bg-purple-100 scale-110' : 'bg-gray-50'
              }`}
            >
              {Array.from({ length: layer.nodes }).map((_, nodeIdx) => (
                <div
                  key={nodeIdx}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    activeLayer === idx
                      ? 'animate-pulse shadow-lg'
                      : ''
                  }`}
                  style={{
                    backgroundColor: activeLayer === idx ? layer.color : '#E2E8F0',
                    boxShadow: activeLayer === idx ? `0 0 20px ${layer.color}50` : 'none'
                  }}
                />
              ))}
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors ${
              activeLayer === idx ? 'text-purple-600' : 'text-gray-500'
            }`}>
              {layer.nameJa}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span>データ</span>
        <ArrowRight className="w-4 h-4" />
        <span>学習</span>
        <ArrowRight className="w-4 h-4" />
        <span>予測</span>
      </div>
    </div>
  );
};

export default function KidsAITrainerPage() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { addStars } = useKidsProgressStore();
  const isZh = language === 'zh';

  // Game state
  const [phase, setPhase] = useState<TrainingPhase>('select');
  const [selectedPreset, setSelectedPreset] = useState<TrainerPreset | null>(null);
  const [collectedData, setCollectedData] = useState<Map<string, TrainingSample[]>>(new Map());
  const [isTraining, setIsTraining] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(0);
  const [testCorrect, setTestCorrect] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  // Check if we have enough data to train
  const canStartTraining = useCallback(() => {
    if (!selectedPreset) return false;
    for (const cat of selectedPreset.categories) {
      const samples = collectedData.get(cat.id) || [];
      if (samples.length < selectedPreset.minSamplesPerCategory) {
        return false;
      }
    }
    return true;
  }, [selectedPreset, collectedData]);

  // Handle preset selection
  const handleSelectPreset = (preset: TrainerPreset) => {
    setSelectedPreset(preset);
    setCollectedData(new Map());
    setPhase('collect');
  };

  // Handle adding sample to training data
  const handleAddSample = (sample: TrainingSample, categoryId: string) => {
    setCollectedData(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(categoryId) || [];
      newMap.set(categoryId, [...existing, sample]);
      return newMap;
    });
  };

  // Handle removing sample from training data
  const handleRemoveSample = (sampleId: string, categoryId: string) => {
    setCollectedData(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(categoryId) || [];
      newMap.set(categoryId, existing.filter(s => s.id !== sampleId));
      return newMap;
    });
  };

  // Handle start training
  const handleStartTraining = () => {
    if (!canStartTraining()) return;
    setPhase('train');
    setIsTraining(true);
  };

  // Handle training complete
  const handleTrainingComplete = () => {
    setIsTraining(false);
    // Calculate model accuracy based on amount of training data
    const totalSamples = Array.from(collectedData.values()).flat().length;
    const baseAccuracy = 70;
    const bonusAccuracy = Math.min(25, totalSamples * 2);
    setModelAccuracy(baseAccuracy + bonusAccuracy + Math.floor(Math.random() * 5));
    setPhase('test');
  };

  // Handle test complete
  const handleTestComplete = (correctCount: number) => {
    setTestCorrect(correctCount);

    if (selectedPreset) {
      const testTotal = selectedPreset.testSamples.length;
      const accuracy = correctCount / testTotal;
      const stars = Math.round(selectedPreset.starsReward * accuracy);
      setEarnedStars(stars);
      addStars(stars);
    }

    setPhase('complete');
  };

  // Reset and try again
  const handleReset = () => {
    setPhase('collect');
    setCollectedData(new Map());
    setModelAccuracy(0);
    setTestCorrect(0);
    setEarnedStars(0);
  };

  // Phase names for progress indicator
  const phases: { key: TrainingPhase; label: { zh: string; ja: string }; emoji: string }[] = [
    { key: 'collect', label: { zh: '收集数据', ja: 'データ収集' }, emoji: '📥' },
    { key: 'train', label: { zh: '训练AI', ja: 'AI訓練' }, emoji: '🧠' },
    { key: 'test', label: { zh: '测试模型', ja: 'テスト' }, emoji: '🎯' },
  ];

  const difficultyColors = {
    beginner: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300', label: { zh: '入门', ja: '初級' } },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', label: { zh: '进阶', ja: '中級' } },
    advanced: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-300', label: { zh: '挑战', ja: '上級' } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 30%, #C4B5FD 70%, #A78BFA 100%)',
      }}
    >
      {/* Animated background */}
      <NeuralNetworkBg />
      <FloatingParticles />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/kids-course')}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{isZh ? '返回' : '戻る'}</span>
              </button>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                {isZh ? '训练我的AI' : '私のAIを訓練'}
              </h1>
            </div>

            {/* Phase indicator */}
            {phase !== 'select' && phase !== 'complete' && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2">
                {phases.map((p, idx) => (
                  <div key={p.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all
                          ${phase === p.key
                            ? 'bg-white text-purple-600 shadow-lg scale-110'
                            : phases.findIndex(x => x.key === phase) > idx
                            ? 'bg-green-400 text-white'
                            : 'bg-white/30 text-white/70'
                          }
                        `}
                      >
                        {phases.findIndex(x => x.key === phase) > idx ? '✓' : p.emoji}
                      </div>
                      <span className="text-xs mt-1 hidden sm:block">
                        {isZh ? p.label.zh : p.label.ja}
                      </span>
                    </div>
                    {idx < phases.length - 1 && (
                      <div className={`w-12 h-1 mx-2 rounded ${phases.findIndex(x => x.key === phase) > idx ? 'bg-green-400' : 'bg-white/30'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 py-8">
        {/* Preset selection */}
        {phase === 'select' && (
          <div className="max-w-6xl mx-auto">
            {/* Title section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-3 drop-shadow-sm">
                {isZh ? '🎮 选择训练项目' : '🎮 トレーニング項目を選択'}
              </h2>
              <p className="text-lg text-gray-600">
                {isZh ? '选择你想训练的AI模型类型' : '訓練したいAIモデルを選んでください'}
              </p>
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side - How AI Works */}
              <div className="lg:col-span-1 space-y-6">
                <NeuralNetworkDiagram />

                {/* Learning steps */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {isZh ? '🎯 学习步骤' : '🎯 学習ステップ'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, emoji: '📥', title: isZh ? '收集数据' : 'データ収集', desc: isZh ? '拖拽图片到分类框' : '画像を分類枠へドラッグ' },
                      { step: 2, emoji: '🧠', title: isZh ? '训练模型' : 'モデル訓練', desc: isZh ? 'AI学习你的数据' : 'AIがデータを学習' },
                      { step: 3, emoji: '🎯', title: isZh ? '测试预测' : 'テスト予測', desc: isZh ? '看AI能认对几个' : 'AIの正解数をチェック' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl flex-shrink-0">
                          {item.emoji}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Preset cards */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {aiTrainerPresets.map(preset => {
                    const difficulty = difficultyColors[preset.difficulty];
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`
                          bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl
                          hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1
                          text-left border-2 border-transparent hover:border-purple-300
                          group relative overflow-hidden
                        `}
                      >
                        {/* Background decoration */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 group-hover:scale-150 transition-transform" />

                        <div className="relative">
                          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                            {preset.icon}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {isZh ? preset.name.zh : preset.name.ja}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {isZh ? preset.description.zh : preset.description.ja}
                          </p>

                          {/* Categories preview */}
                          <div className="flex gap-1 mb-4">
                            {preset.categories.map(cat => (
                              <span key={cat.id} className="text-2xl">{cat.emoji}</span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${difficulty.bg} ${difficulty.text} border ${difficulty.border}`}>
                              {isZh ? difficulty.label.zh : difficulty.label.ja}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500 font-bold">
                              <Star className="w-5 h-5 fill-yellow-400" />
                              {preset.starsReward}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data collection phase */}
        {phase === 'collect' && selectedPreset && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-3xl">📥</span>
                  {isZh ? '步骤1: 收集训练数据' : 'ステップ1: トレーニングデータ収集'}
                </h2>
                <div className="flex items-center gap-2 text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
                  <span className="text-2xl">{selectedPreset.icon}</span>
                  <span className="font-bold">{isZh ? selectedPreset.name.zh : selectedPreset.name.ja}</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                {isZh
                  ? '把每种类别的图片拖到对应的框里，每类至少需要3个样本'
                  : '各カテゴリの画像を対応する枠にドラッグしてください（各カテゴリ最低3サンプル必要）'
                }
              </p>
            </div>

            <DataCollector
              categories={selectedPreset.categories}
              availableSamples={selectedPreset.samples}
              collectedData={collectedData}
              onAddSample={handleAddSample}
              onRemoveSample={handleRemoveSample}
              minSamplesPerCategory={selectedPreset.minSamplesPerCategory}
            />

            {/* Action button */}
            <div className="flex justify-center">
              <button
                onClick={handleStartTraining}
                disabled={!canStartTraining()}
                className={`
                  flex items-center gap-3 px-10 py-5 rounded-3xl font-bold text-xl transition-all shadow-xl
                  ${canStartTraining()
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Play className="w-7 h-7" />
                {isZh ? '开始训练' : '訓練開始'}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Training phase */}
        {phase === 'train' && selectedPreset && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                <span className="text-3xl animate-pulse">🧠</span>
                {isZh ? '步骤2: 训练AI模型' : 'ステップ2: AIモデル訓練'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isZh ? 'AI正在学习你提供的数据...' : 'AIがデータを学習中...'}
              </p>
            </div>

            <TrainingVisualizer
              categories={selectedPreset.categories}
              trainingData={collectedData}
              isTraining={isTraining}
              onTrainingComplete={handleTrainingComplete}
            />
          </div>
        )}

        {/* Testing phase */}
        {phase === 'test' && selectedPreset && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                <span className="text-3xl">🎯</span>
                {isZh ? '步骤3: 测试你的AI' : 'ステップ3: AIをテスト'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isZh
                  ? `模型准确率: ${modelAccuracy}% - 看看AI能正确识别多少个？`
                  : `モデル精度: ${modelAccuracy}% - AIはいくつ正解できるかな？`
                }
              </p>
            </div>

            <PredictionTester
              categories={selectedPreset.categories}
              testSamples={selectedPreset.testSamples}
              modelAccuracy={modelAccuracy}
              onComplete={handleTestComplete}
            />
          </div>
        )}

        {/* Completion phase */}
        {phase === 'complete' && selectedPreset && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
              {/* Celebration background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {['🎉', '⭐', '🎊', '✨', '🏆'].map((emoji, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl animate-bounce"
                    style={{
                      top: `${Math.random() * 60}%`,
                      left: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.3,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="text-8xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  {isZh ? '训练完成！' : '訓練完了！'}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {isZh
                    ? `你的 ${selectedPreset.name.zh} 准确率达到 ${modelAccuracy}%！`
                    : `${selectedPreset.name.ja}の精度は ${modelAccuracy}%！`
                  }
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-purple-600">{modelAccuracy}%</div>
                    <div className="text-sm text-purple-500 font-medium">{isZh ? '模型准确率' : 'モデル精度'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-green-600">{testCorrect}/{selectedPreset.testSamples.length}</div>
                    <div className="text-sm text-green-500 font-medium">{isZh ? '测试正确' : 'テスト正解'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                      +{earnedStars}
                      <Star className="w-6 h-6 fill-yellow-400" />
                    </div>
                    <div className="text-sm text-yellow-500 font-medium">{isZh ? '获得星星' : '獲得した星'}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <RotateCcw className="w-5 h-5" />
                    {isZh ? '再训练一次' : 'もう一度訓練'}
                  </button>
                  <button
                    onClick={() => setPhase('select')}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    {isZh ? '选择其他项目' : '別の項目を選ぶ'}
                  </button>
                  <button
                    onClick={() => navigate('/kids-course')}
                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    {isZh ? '返回首页' : 'ホームへ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

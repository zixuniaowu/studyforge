import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, RotateCcw, Home, Star } from 'lucide-react';
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
    beginner: { bg: 'bg-green-100', text: 'text-green-600', label: { zh: '入门', ja: '初級' } },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-600', label: { zh: '进阶', ja: '中級' } },
    advanced: { bg: 'bg-red-100', text: 'text-red-600', label: { zh: '挑战', ja: '上級' } },
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background: 'linear-gradient(180deg, #EDE9FE 0%, #DDD6FE 100%)',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg">
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
              <h1 className="text-xl font-bold flex items-center gap-2">
                🧠 {isZh ? '训练我的AI' : '私のAIを訓練'}
              </h1>
            </div>

            {/* Phase indicator */}
            {phase !== 'select' && phase !== 'complete' && (
              <div className="flex items-center gap-2">
                {phases.map((p, idx) => (
                  <div key={p.key} className="flex items-center">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${phase === p.key
                          ? 'bg-white text-purple-600'
                          : phases.findIndex(x => x.key === phase) > idx
                          ? 'bg-green-400 text-white'
                          : 'bg-white/30 text-white/70'
                        }
                      `}
                    >
                      {phases.findIndex(x => x.key === phase) > idx ? '✓' : p.emoji}
                    </div>
                    {idx < phases.length - 1 && (
                      <div className={`w-8 h-0.5 ${phases.findIndex(x => x.key === phase) > idx ? 'bg-green-400' : 'bg-white/30'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Preset selection */}
        {phase === 'select' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isZh ? '选择训练项目' : 'トレーニング項目を選択'}
              </h2>
              <p className="text-gray-600">
                {isZh ? '选择你想训练的AI模型类型' : '訓練したいAIモデルを選んでください'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiTrainerPresets.map(preset => {
                const difficulty = difficultyColors[preset.difficulty];
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left"
                  >
                    <div className="text-5xl mb-4">{preset.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {isZh ? preset.name.zh : preset.name.ja}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {isZh ? preset.description.zh : preset.description.ja}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${difficulty.bg} ${difficulty.text}`}>
                        {isZh ? difficulty.label.zh : difficulty.label.ja}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        {preset.starsReward}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Data collection phase */}
        {phase === 'collect' && selectedPreset && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                📥 {isZh ? '步骤1: 收集训练数据' : 'ステップ1: トレーニングデータ収集'}
              </h2>
              <p className="text-gray-600">
                {isZh
                  ? '把每种类别的图片拖到对应的框里'
                  : '各カテゴリの画像を対応する枠にドラッグしてください'
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
                  flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all
                  ${canStartTraining()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Play className="w-6 h-6" />
                {isZh ? '开始训练' : '訓練開始'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Training phase */}
        {phase === 'train' && selectedPreset && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🧠 {isZh ? '步骤2: 训练AI模型' : 'ステップ2: AIモデル訓練'}
              </h2>
              <p className="text-gray-600">
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
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎯 {isZh ? '步骤3: 测试你的AI' : 'ステップ3: AIをテスト'}
              </h2>
              <p className="text-gray-600">
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
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center max-w-md mx-auto">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isZh ? '训练完成！' : '訓練完了！'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isZh
                ? `你的 ${selectedPreset.name.zh} 准确率达到 ${modelAccuracy}%！`
                : `${selectedPreset.name.ja}の精度は ${modelAccuracy}%！`
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-purple-600">{modelAccuracy}%</div>
                <div className="text-xs text-purple-500">{isZh ? '模型准确率' : 'モデル精度'}</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-600">{testCorrect}/{selectedPreset.testSamples.length}</div>
                <div className="text-xs text-green-500">{isZh ? '测试正确' : 'テスト正解'}</div>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  +{earnedStars}
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
                <div className="text-xs text-yellow-500">{isZh ? '获得星星' : '獲得した星'}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
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
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { TrainingCategory, TrainingSample } from '../../data/aiTrainerPresets';

interface TrainingVisualizerProps {
  categories: TrainingCategory[];
  trainingData: Map<string, TrainingSample[]>;
  isTraining: boolean;
  onTrainingComplete: () => void;
}

export const TrainingVisualizer = ({
  categories,
  trainingData,
  isTraining,
  onTrainingComplete,
}: TrainingVisualizerProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'learning' | 'optimizing' | 'complete'>('idle');
  const [currentSample, setCurrentSample] = useState<TrainingSample | null>(null);

  const totalSamples = Array.from(trainingData.values()).flat().length;
  const totalEpochs = 3;

  useEffect(() => {
    if (!isTraining) {
      setProgress(0);
      setCurrentEpoch(0);
      setAccuracy(0);
      setStatus('idle');
      return;
    }

    // Simulate training process
    setStatus('loading');

    const samples = Array.from(trainingData.values()).flat();

    let currentProgress = 0;
    let epoch = 0;
    let acc = 0;
    let sampleIndex = 0;

    const loadingTimer = setTimeout(() => {
      setStatus('learning');

      const trainingInterval = setInterval(() => {
        // Update current sample being processed
        setCurrentSample(samples[sampleIndex % samples.length]);
        sampleIndex++;

        // Update progress
        currentProgress += 100 / (totalSamples * totalEpochs);
        setProgress(Math.min(currentProgress, 100));

        // Update epoch
        const newEpoch = Math.floor(currentProgress / (100 / totalEpochs));
        if (newEpoch > epoch) {
          epoch = newEpoch;
          setCurrentEpoch(epoch);
        }

        // Update accuracy (simulated improvement)
        acc = Math.min(50 + currentProgress * 0.45 + Math.random() * 5, 99);
        setAccuracy(Math.round(acc));

        // Status updates
        if (currentProgress > 70) {
          setStatus('optimizing');
        }

        // Complete
        if (currentProgress >= 100) {
          clearInterval(trainingInterval);
          setStatus('complete');
          setAccuracy(95 + Math.floor(Math.random() * 4)); // Final accuracy 95-99%
          setTimeout(onTrainingComplete, 1000);
        }
      }, 200);

      return () => clearInterval(trainingInterval);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [isTraining, trainingData, totalSamples, onTrainingComplete]);

  const statusMessages = {
    idle: { zh: '准备就绪', ja: '準備完了' },
    loading: { zh: '加载数据中...', ja: 'データ読み込み中...' },
    learning: { zh: 'AI正在学习...', ja: 'AI学習中...' },
    optimizing: { zh: '优化模型中...', ja: 'モデル最適化中...' },
    complete: { zh: '训练完成！', ja: '訓練完了！' },
  };

  return (
    <div className="space-y-6">
      {/* Brain visualization */}
      <div className="relative w-48 h-48 mx-auto">
        {/* Brain emoji */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center text-8xl
            ${isTraining ? 'animate-pulse' : ''}
          `}
        >
          🧠
        </div>

        {/* Neural connections animation */}
        {isTraining && status === 'learning' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={96 + Math.cos((i / 8) * Math.PI * 2) * 60}
                cy={96 + Math.sin((i / 8) * Math.PI * 2) * 60}
                r="4"
                className="animate-ping"
                fill={categories[i % categories.length]?.color || '#A78BFA'}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
        )}

        {/* Current sample being processed */}
        {currentSample && isTraining && (
          <div
            className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl animate-bounce"
          >
            {currentSample.emoji}
          </div>
        )}

        {/* Glow effect */}
        {isTraining && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              boxShadow: status === 'complete'
                ? '0 0 60px rgba(34, 197, 94, 0.5)'
                : '0 0 40px rgba(147, 51, 234, 0.3)',
            }}
          />
        )}
      </div>

      {/* Status */}
      <div className="text-center">
        <h3 className={`
          text-2xl font-bold mb-2
          ${status === 'complete' ? 'text-green-600' : 'text-purple-600'}
        `}>
          {isZh ? statusMessages[status].zh : statusMessages[status].ja}
        </h3>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{isZh ? `训练轮次: ${currentEpoch}/${totalEpochs}` : `エポック: ${currentEpoch}/${totalEpochs}`}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-300
                ${status === 'complete' ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}
              `}
              style={{ width: `${progress}%` }}
            >
              <div
                className="h-full w-full animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Training stats */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-4 text-center shadow">
          <div className="text-2xl font-bold text-purple-600">{totalSamples}</div>
          <div className="text-xs text-gray-500">{isZh ? '样本数' : 'サンプル'}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow">
          <div className="text-2xl font-bold text-blue-600">{currentEpoch}</div>
          <div className="text-xs text-gray-500">{isZh ? '训练轮次' : 'エポック'}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow">
          <div className={`text-2xl font-bold ${status === 'complete' ? 'text-green-600' : 'text-orange-600'}`}>
            {accuracy}%
          </div>
          <div className="text-xs text-gray-500">{isZh ? '准确率' : '正確率'}</div>
        </div>
      </div>

      {/* Category data being processed */}
      <div className="flex justify-center gap-4 flex-wrap">
        {categories.map(cat => {
          const samples = trainingData.get(cat.id) || [];
          return (
            <div
              key={cat.id}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow"
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-sm text-gray-600">{samples.length}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

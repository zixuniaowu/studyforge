import { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, Zap } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { TrainingCategory, TrainingSample } from '../../data/aiTrainerPresets';

interface PredictionTesterProps {
  categories: TrainingCategory[];
  testSamples: TrainingSample[];
  modelAccuracy: number;
  onComplete: (correctCount: number) => void;
}

interface PredictionResult {
  sampleId: string;
  predictedCategory: string;
  actualCategory: string;
  confidence: number;
  isCorrect: boolean;
}

export const PredictionTester = ({
  categories,
  testSamples,
  modelAccuracy,
  onComplete,
}: PredictionTesterProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentSample = testSamples[currentIndex];
  const isComplete = currentIndex >= testSamples.length;

  // Simulate AI prediction
  const makePrediction = () => {
    if (!currentSample || isProcessing) return;

    setIsProcessing(true);
    setShowResult(false);

    // Simulate thinking time
    setTimeout(() => {
      // Calculate if prediction is correct based on model accuracy
      const willBeCorrect = Math.random() * 100 < modelAccuracy;

      let predictedCategory: string;
      let confidence: number;

      if (willBeCorrect) {
        predictedCategory = currentSample.categoryId;
        confidence = 85 + Math.random() * 14; // 85-99%
      } else {
        // Pick a wrong category
        const wrongCategories = categories.filter(c => c.id !== currentSample.categoryId);
        predictedCategory = wrongCategories[Math.floor(Math.random() * wrongCategories.length)].id;
        confidence = 40 + Math.random() * 30; // 40-70%
      }

      const result: PredictionResult = {
        sampleId: currentSample.id,
        predictedCategory,
        actualCategory: currentSample.categoryId,
        confidence: Math.round(confidence),
        isCorrect: predictedCategory === currentSample.categoryId,
      };

      setResults(prev => [...prev, result]);
      setShowResult(true);
      setIsProcessing(false);

      // Move to next after showing result
      setTimeout(() => {
        if (currentIndex + 1 >= testSamples.length) {
          // All tests complete
          const correctCount = [...results, result].filter(r => r.isCorrect).length;
          onComplete(correctCount);
        } else {
          setCurrentIndex(prev => prev + 1);
          setShowResult(false);
        }
      }, 2000);
    }, 1500);
  };

  const lastResult = results[results.length - 1];
  const correctCount = results.filter(r => r.isCorrect).length;

  // Get category info
  const getCategoryInfo = (categoryId: string) => categories.find(c => c.id === categoryId);

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {testSamples.map((_, idx) => (
          <div
            key={idx}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
              ${idx < currentIndex
                ? results[idx]?.isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : idx === currentIndex
                ? 'bg-purple-500 text-white animate-pulse'
                : 'bg-gray-200 text-gray-500'
              }
            `}
          >
            {idx < currentIndex
              ? results[idx]?.isCorrect ? '✓' : '✗'
              : idx + 1
            }
          </div>
        ))}
      </div>

      {/* Current test */}
      {!isComplete && currentSample && (
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-lg text-gray-500 mb-4">
            {isZh ? `测试 ${currentIndex + 1}/${testSamples.length}` : `テスト ${currentIndex + 1}/${testSamples.length}`}
          </h3>

          {/* Test sample */}
          <div
            className={`
              w-32 h-32 mx-auto rounded-3xl bg-gray-100 flex items-center justify-center text-7xl mb-6
              ${isProcessing ? 'animate-bounce' : ''}
            `}
          >
            {currentSample.emoji}
          </div>

          {/* Processing state */}
          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-purple-600 mb-4">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>{isZh ? 'AI正在思考...' : 'AI考え中...'}</span>
            </div>
          )}

          {/* Result display */}
          {showResult && lastResult && (
            <div
              className={`
                p-4 rounded-2xl mb-6
                ${lastResult.isCorrect ? 'bg-green-100' : 'bg-red-100'}
              `}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                {lastResult.isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <span className={`text-xl font-bold ${lastResult.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {lastResult.isCorrect
                    ? (isZh ? '预测正确！' : '正解！')
                    : (isZh ? '预测错误' : '不正解')
                  }
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">{isZh ? 'AI预测' : 'AI予測'}:</span>
                  <span className="text-xl">{getCategoryInfo(lastResult.predictedCategory)?.emoji}</span>
                  <span className="font-medium">{isZh
                    ? getCategoryInfo(lastResult.predictedCategory)?.name.zh
                    : getCategoryInfo(lastResult.predictedCategory)?.name.ja
                  }</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">{isZh ? '置信度' : '確信度'}:</span>
                  <span className="font-bold text-purple-600">{lastResult.confidence}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Predict button */}
          {!showResult && !isProcessing && (
            <button
              onClick={makePrediction}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              <Zap className="w-6 h-6" />
              {isZh ? '让AI预测' : 'AI予測'}
            </button>
          )}
        </div>
      )}

      {/* Completion summary */}
      {isComplete && (
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {isZh ? '测试完成！' : 'テスト完了！'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isZh
              ? `你的AI正确预测了 ${correctCount}/${testSamples.length} 个！`
              : `AIは ${correctCount}/${testSamples.length} 正解しました！`
            }
          </p>

          {/* Results grid */}
          <div className="flex justify-center gap-4 flex-wrap">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                  ${result.isCorrect ? 'bg-green-100' : 'bg-red-100'}
                `}
              >
                {testSamples[idx].emoji}
                <div
                  className={`
                    absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs
                    ${result.isCorrect ? 'bg-green-500' : 'bg-red-500'}
                  `}
                >
                  {result.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{correctCount}</div>
          <div className="text-sm text-green-500">{isZh ? '正确' : '正解'}</div>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 text-center">
          <div className="text-3xl font-bold text-red-600">{results.length - correctCount}</div>
          <div className="text-sm text-red-500">{isZh ? '错误' : '不正解'}</div>
        </div>
      </div>
    </div>
  );
};

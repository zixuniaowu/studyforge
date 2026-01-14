import { Star, Trophy, RefreshCw, ArrowRight, Home } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { ClassifyLevel } from '../../data/classifyGameLevels';

interface GameResultModalProps {
  show: boolean;
  level: ClassifyLevel;
  correct: number;
  wrong: number;
  timeUsed: number;
  isPassed: boolean;
  onReplay: () => void;
  onNextLevel: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export const GameResultModal = ({
  show,
  level,
  correct,
  wrong,
  timeUsed,
  isPassed,
  onReplay,
  onNextLevel,
  onHome,
  hasNextLevel,
}: GameResultModalProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  if (!show) return null;

  const accuracy = Math.round((correct / (correct + wrong)) * 100);
  const earnedStars = isPassed ? level.starsReward : Math.floor(level.starsReward * 0.3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-bounceIn">
        {/* Result icon */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-4">
            {isPassed ? '🎉' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isPassed
              ? (isZh ? '太棒了！' : 'すごい！')
              : (isZh ? '再接再厉！' : 'もう一度！')
            }
          </h2>
          <p className="text-gray-600">
            {isZh ? level.name.zh : level.name.ja}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{correct}</div>
            <div className="text-sm text-green-500">{isZh ? '正确' : '正解'}</div>
          </div>
          <div className="bg-red-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{wrong}</div>
            <div className="text-sm text-red-500">{isZh ? '错误' : '間違い'}</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-sm text-blue-500">{isZh ? '准确率' : '正確率'}</div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{timeUsed}s</div>
            <div className="text-sm text-purple-500">{isZh ? '用时' : '時間'}</div>
          </div>
        </div>

        {/* Stars earned */}
        <div className="flex items-center justify-center gap-2 bg-yellow-50 rounded-2xl py-4 mb-6">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-bold text-yellow-600">+{earnedStars}</span>
          <span className="text-yellow-500">{isZh ? '星星' : '星'}</span>
        </div>

        {/* Trophy for passing */}
        {isPassed && (
          <div className="flex items-center justify-center gap-2 text-purple-600 mb-6">
            <Trophy className="w-6 h-6" />
            <span className="font-medium">
              {isZh ? '通关成功！' : 'クリア！'}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {isPassed && hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <span>{isZh ? '下一关' : '次のレベル'}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={onReplay}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-6 h-6" />
              <span>{isZh ? '再玩一次' : 'もう一度'}</span>
            </button>
          )}

          <button
            onClick={onHome}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-colors"
          >
            <Home className="w-6 h-6" />
            <span>{isZh ? '返回首页' : 'ホームへ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

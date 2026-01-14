import { Star, CheckCircle, XCircle } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface ScoreBoardProps {
  correct: number;
  wrong: number;
  total: number;
  starsReward: number;
}

export const ScoreBoard = ({ correct, wrong, total, starsReward }: ScoreBoardProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';
  const remaining = total - correct - wrong;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
      {/* Correct count */}
      <div className="flex items-center gap-1.5 bg-green-100 px-3 py-1.5 rounded-full">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="font-bold text-green-600">{correct}</span>
        <span className="text-green-500 text-xs hidden sm:inline">{isZh ? '正确' : '正解'}</span>
      </div>

      {/* Wrong count */}
      <div className="flex items-center gap-1.5 bg-red-100 px-3 py-1.5 rounded-full">
        <XCircle className="w-5 h-5 text-red-500" />
        <span className="font-bold text-red-600">{wrong}</span>
        <span className="text-red-500 text-xs hidden sm:inline">{isZh ? '错误' : '間違い'}</span>
      </div>

      {/* Remaining */}
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
        <span className="text-lg">📦</span>
        <span className="font-bold text-gray-600">{remaining}</span>
        <span className="text-gray-500 text-xs hidden sm:inline">{isZh ? '剩余' : '残り'}</span>
      </div>

      {/* Stars reward */}
      <div className="flex items-center gap-1.5 bg-yellow-100 px-3 py-1.5 rounded-full">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <span className="font-bold text-yellow-600">{starsReward}</span>
      </div>
    </div>
  );
};

// Mini version for compact displays
export const MiniScoreBoard = ({ correct, wrong }: { correct: number; wrong: number }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-green-500">
        <CheckCircle className="w-5 h-5" />
        <span className="font-bold">{correct}</span>
      </div>
      <div className="flex items-center gap-1 text-red-500">
        <XCircle className="w-5 h-5" />
        <span className="font-bold">{wrong}</span>
      </div>
    </div>
  );
};

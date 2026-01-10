import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, RotateCcw, Check, Zap, Brain } from 'lucide-react';
import { Flashcard } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';
import { FlashcardItem } from './FlashcardItem';
import { SimpleRating, getEstimatedIntervals, formatInterval } from '../../lib/spacedRepetition';
import { flashcardDB } from '../../lib/db';

interface FlashcardReviewProps {
  cards: Flashcard[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (rating: SimpleRating) => void;
  onClose: () => void;
}

export const FlashcardReview: React.FC<FlashcardReviewProps> = ({
  cards,
  currentIndex,
  isFlipped,
  onFlip,
  onRate,
  onClose
}) => {
  const language = useLanguageStore(state => state.language);
  const currentCard = cards[currentIndex];
  const [intervals, setIntervals] = useState<Record<SimpleRating, number> | null>(null);

  useEffect(() => {
    const loadIntervals = async () => {
      if (currentCard) {
        const review = await flashcardDB.getReview(currentCard.id);
        if (review) {
          const estimated = getEstimatedIntervals({
            easeFactor: review.easeFactor,
            interval: review.interval,
            repetitions: review.repetitions
          });
          setIntervals(estimated);
        }
      }
    };
    loadIntervals();
  }, [currentCard?.id]);

  if (!currentCard) {
    // Review complete
    return (
      <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {language === 'ja' ? '復習完了！' : '复习完成！'}
          </h2>
          <p className="text-slate-500 mb-6">
            {language === 'ja'
              ? `${cards.length}枚のカードを復習しました`
              : `已复习 ${cards.length} 张卡片`}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
          >
            {language === 'ja' ? '閉じる' : '关闭'}
          </button>
        </div>
      </div>
    );
  }

  const ratingButtons: { rating: SimpleRating; icon: React.ElementType; label: { zh: string; ja: string }; color: string }[] = [
    { rating: 'again', icon: RotateCcw, label: { zh: '重来', ja: 'もう一度' }, color: 'bg-red-500 hover:bg-red-600' },
    { rating: 'hard', icon: Brain, label: { zh: '困难', ja: '難しい' }, color: 'bg-amber-500 hover:bg-amber-600' },
    { rating: 'good', icon: Check, label: { zh: '良好', ja: '良い' }, color: 'bg-green-500 hover:bg-green-600' },
    { rating: 'easy', icon: Zap, label: { zh: '简单', ja: '簡単' }, color: 'bg-cyan-500 hover:bg-cyan-600' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          {language === 'ja' ? '戻る' : '返回'}
        </button>
        <div className="text-sm text-slate-400">
          {currentIndex + 1} / {cards.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700 mx-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <FlashcardItem
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={onFlip}
        />
      </div>

      {/* Rating buttons */}
      {isFlipped && (
        <div className="p-6 bg-slate-800/50">
          <p className="text-center text-slate-400 text-sm mb-4">
            {language === 'ja' ? '記憶の程度を評価してください' : '评价你的记忆程度'}
          </p>
          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            {ratingButtons.map(({ rating, icon: Icon, label, color }) => (
              <button
                key={rating}
                onClick={() => onRate(rating)}
                className={`flex flex-col items-center gap-2 p-4 ${color} text-white rounded-xl transition-colors`}
              >
                <Icon size={24} />
                <span className="text-sm font-medium">
                  {label[language === 'ja' ? 'ja' : 'zh']}
                </span>
                {intervals && (
                  <span className="text-xs opacity-75">
                    {formatInterval(intervals[rating], language === 'ja' ? 'ja' : 'zh')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flip hint */}
      {!isFlipped && (
        <div className="p-6 text-center">
          <button
            onClick={onFlip}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
          >
            {language === 'ja' ? '答えを見る' : '显示答案'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardReview;

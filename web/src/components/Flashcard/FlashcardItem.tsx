import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Flashcard } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';

interface FlashcardItemProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashcardItem: React.FC<FlashcardItemProps> = ({
  card,
  isFlipped,
  onFlip
}) => {
  const language = useLanguageStore(state => state.language);

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <div
        className={`relative w-full h-80 cursor-pointer transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={!isFlipped ? onFlip : undefined}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl text-center text-slate-800 font-medium leading-relaxed">
                {card.front}
              </p>
            </div>
            <div className="text-center text-slate-400 text-sm flex items-center justify-center gap-2">
              <RotateCcw size={14} />
              {language === 'ja' ? 'タップして答えを見る' : '点击查看答案'}
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg border border-cyan-200 p-8 flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-xl text-center text-slate-700 leading-relaxed whitespace-pre-wrap">
                {card.back}
              </p>
            </div>
            {card.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 pt-4 border-t border-cyan-100">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardItem;

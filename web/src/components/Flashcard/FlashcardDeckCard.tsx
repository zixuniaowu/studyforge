import React from 'react';
import { Layers, Play, Trash2 } from 'lucide-react';
import { FlashcardDeck } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';

interface FlashcardDeckCardProps {
  deck: FlashcardDeck;
  dueCount?: number;
  onSelect: () => void;
  onStartReview: () => void;
  onDelete: () => void;
}

export const FlashcardDeckCard: React.FC<FlashcardDeckCardProps> = ({
  deck,
  dueCount = 0,
  onSelect,
  onStartReview,
  onDelete
}) => {
  const language = useLanguageStore(state => state.language);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleStartReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartReview();
  };

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white rounded-xl border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all"
    >
      {/* Color indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl"
        style={{ backgroundColor: deck.color || '#06b6d4' }}
      />

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded-lg transition-all"
        title={language === 'ja' ? '削除' : '删除'}
      >
        <Trash2 size={14} className="text-red-500" />
      </button>

      {/* Deck icon and name */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="p-2.5 rounded-lg"
          style={{ backgroundColor: `${deck.color || '#06b6d4'}20` }}
        >
          <Layers size={20} style={{ color: deck.color || '#06b6d4' }} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 mb-1">{deck.name}</h3>
          {deck.description && (
            <p className="text-sm text-slate-500 line-clamp-2">{deck.description}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">
            {deck.cardCount} {language === 'ja' ? '枚' : '张'}
          </span>
          {dueCount > 0 && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {dueCount} {language === 'ja' ? '件要復習' : '待复习'}
            </span>
          )}
        </div>

        {/* Review button */}
        {dueCount > 0 && (
          <button
            onClick={handleStartReview}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Play size={14} />
            {language === 'ja' ? '復習' : '复习'}
          </button>
        )}
      </div>

      {/* Category tag */}
      {deck.category && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {deck.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default FlashcardDeckCard;

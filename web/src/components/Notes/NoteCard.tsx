import React from 'react';
import { FileText, Clock, Trash2 } from 'lucide-react';
import { Note } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  isSelected,
  onSelect,
  onDelete
}) => {
  const language = useLanguageStore(state => state.language);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'ja' ? 'ja-JP' : 'zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreview = (content: string, maxLength = 100) => {
    const plainText = content.replace(/[#*`>\-\[\]]/g, '').trim();
    return plainText.length > maxLength
      ? plainText.slice(0, maxLength) + '...'
      : plainText;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onSelect}
      className={`group p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-cyan-500 bg-cyan-50 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={16} className={isSelected ? 'text-cyan-600' : 'text-slate-400'} />
          <h3 className={`font-medium truncate ${
            isSelected ? 'text-cyan-800' : 'text-slate-800'
          }`}>
            {note.title || (language === 'ja' ? '無題のノート' : '无标题笔记')}
          </h3>
        </div>
        <button
          onClick={handleDelete}
          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
          title={language === 'ja' ? '削除' : '删除'}
        >
          <Trash2 size={14} className="text-red-500" />
        </button>
      </div>

      <p className="text-sm text-slate-500 mb-3 line-clamp-2">
        {getPreview(note.content) || (language === 'ja' ? '内容なし' : '暂无内容')}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-slate-400">+{note.tags.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          {formatDate(note.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Note } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';
import { NoteCard } from './NoteCard';

interface NoteSidebarProps {
  notes: Note[];
  currentNote: Note | null;
  searchQuery: string;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  onSearchChange: (query: string) => void;
}

export const NoteSidebar: React.FC<NoteSidebarProps> = ({
  notes,
  currentNote,
  searchQuery,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  onSearchChange
}) => {
  const language = useLanguageStore(state => state.language);

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {language === 'ja' ? 'ノート' : '笔记'}
          </h2>
          <button
            onClick={onCreateNote}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            {language === 'ja' ? '新規' : '新建'}
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === 'ja' ? 'ノートを検索...' : '搜索笔记...'}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">
              {searchQuery
                ? (language === 'ja' ? '検索結果がありません' : '没有找到匹配的笔记')
                : (language === 'ja' ? 'ノートがありません' : '暂无笔记')}
            </p>
            {!searchQuery && (
              <button
                onClick={onCreateNote}
                className="mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                {language === 'ja' ? '最初のノートを作成' : '创建第一篇笔记'}
              </button>
            )}
          </div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isSelected={currentNote?.id === note.id}
              onSelect={() => onSelectNote(note)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">
          {language === 'ja' ? `${notes.length} 件のノート` : `共 ${notes.length} 篇笔记`}
        </p>
      </div>
    </div>
  );
};

export default NoteSidebar;

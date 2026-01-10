import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, BookOpen } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useNoteStore } from '../stores/noteStore';
import { NoteSidebar, NoteEditor } from '../components/Notes';
import { Note } from '../types';

export default function NotesPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const {
    notes,
    currentNote,
    searchQuery,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    searchNotes
  } = useNoteStore();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleCreateNote = async () => {
    await createNote({
      pageId: '/notes',
      title: '',
      content: '',
      tags: []
    });
  };

  const handleUpdateNote = async (updates: Partial<Note>) => {
    if (currentNote) {
      await updateNote(currentNote.id, updates);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (confirm(language === 'ja' ? 'このノートを削除しますか？' : '确定要删除这篇笔记吗？')) {
      await deleteNote(id);
    }
  };

  const handleSearchChange = (query: string) => {
    searchNotes(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Home size={20} />
                <span className="hidden sm:inline">{language === 'ja' ? 'ホーム' : '首页'}</span>
              </button>
              <ChevronRight size={16} className="text-slate-500" />
              <h1 className="text-lg font-semibold">
                {language === 'ja' ? '学習ノート' : '学习笔记'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <NoteSidebar
            notes={notes}
            currentNote={currentNote}
            searchQuery={searchQuery}
            onSelectNote={selectNote}
            onCreateNote={handleCreateNote}
            onDeleteNote={handleDeleteNote}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Editor */}
        <NoteEditor
          note={currentNote}
          onSave={handleUpdateNote}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-3">
        <div className="px-6 lg:px-10 text-center">
          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">StudyForge</span>
            <span className="mx-2">·</span>
            {language === 'ja' ? 'AI学習プラットフォーム' : 'AI 学习平台'}
          </p>
        </div>
      </footer>
    </div>
  );
}

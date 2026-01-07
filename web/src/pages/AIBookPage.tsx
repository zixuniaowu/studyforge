import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight,
  Menu, X, Home
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { aiBeginnerBook, getAllSections, getTotalSections } from '../data/aiBookContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Book Reader Component
const AIBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const lang = language as 'zh' | 'ja';

  const book = aiBeginnerBook;
  const allSections = getAllSections(book);
  const totalSections = getTotalSections(book);

  // Current position
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [readSections, setReadSections] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['chapter-1']));

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('ai-book-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentSectionIndex(data.currentIndex || 0);
      setReadSections(new Set(data.readSections || []));
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('ai-book-progress', JSON.stringify({
      currentIndex: currentSectionIndex,
      readSections: Array.from(readSections)
    }));
  }, [currentSectionIndex, readSections]);

  // Mark current section as read when viewing
  useEffect(() => {
    const current = allSections[currentSectionIndex];
    if (current) {
      setReadSections(prev => new Set([...prev, current.section.id]));
      // Auto-expand current chapter
      setExpandedChapters(prev => new Set([...prev, current.chapter.id]));
    }
  }, [currentSectionIndex, allSections]);

  const currentItem = allSections[currentSectionIndex];
  const progress = Math.round((readSections.size / totalSections) * 100);

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (currentSectionIndex < allSections.length - 1) {
      goToSection(currentSectionIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentSectionIndex < allSections.length - 1) {
          setCurrentSectionIndex(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSectionIndex > 0) {
          setCurrentSectionIndex(prev => prev - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, allSections.length]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Home size={20} />
              <span className="text-base font-medium hidden sm:inline">
                {lang === 'ja' ? 'ホーム' : '首页'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-amber-600" />
            <span className="font-serif text-lg text-stone-800 hidden sm:inline">
              {book.title[lang]}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-stone-500">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar - Table of Contents */}
        <aside
          className={`fixed lg:sticky top-14 left-0 h-[calc(100vh-56px)] bg-white border-r border-stone-200 transition-all duration-300 z-40 overflow-hidden ${
            sidebarOpen ? 'w-80' : 'w-0 lg:w-80'
          }`}
        >
          <div className="w-80 h-full overflow-y-auto">
            {/* Book Title */}
            <div className="p-4 border-b border-stone-100">
              <h2 className="font-serif text-2xl font-semibold text-stone-800">
                {book.title[lang]}
              </h2>
              <p className="text-base text-stone-500 mt-1">{book.subtitle[lang]}</p>
            </div>

            {/* Chapters */}
            <nav className="p-2">
              {book.chapters.map((chapter) => {
                const isExpanded = expandedChapters.has(chapter.id);
                const chapterSections = allSections.filter(s => s.chapter.id === chapter.id);
                const chapterRead = chapterSections.every(s => readSections.has(s.section.id));
                const firstSectionIndex = allSections.findIndex(s => s.chapter.id === chapter.id);

                return (
                  <div key={chapter.id} className="mb-1">
                    {/* Chapter Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-stone-50 transition-colors text-left"
                    >
                      <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight size={16} className="text-stone-400" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600 font-medium text-base">
                            {lang === 'ja' ? `第${chapter.number}章` : `第${chapter.number}章`}
                          </span>
                          {chapterRead && <Check size={14} className="text-green-500" />}
                        </div>
                        <div className="text-stone-800 font-medium text-lg truncate">
                          {chapter.title[lang]}
                        </div>
                      </div>
                    </button>

                    {/* Sections */}
                    {isExpanded && (
                      <div className="ml-4 border-l-2 border-stone-100 pl-2">
                        {chapter.sections.map((section, sectionIdx) => {
                          const globalIndex = firstSectionIndex + sectionIdx;
                          const isActive = globalIndex === currentSectionIndex;
                          const isRead = readSections.has(section.id);

                          return (
                            <button
                              key={section.id}
                              onClick={() => {
                                goToSection(globalIndex);
                                if (window.innerWidth < 1024) setSidebarOpen(false);
                              }}
                              className={`w-full text-left p-2 rounded-lg transition-colors text-base ${
                                isActive
                                  ? 'bg-amber-50 text-amber-800 font-medium'
                                  : 'text-stone-600 hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isRead && !isActive ? (
                                  <Check size={12} className="text-green-500 flex-shrink-0" />
                                ) : (
                                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                    isActive ? 'bg-amber-500' : 'bg-stone-200'
                                  }`} />
                                )}
                                <span className="truncate">{section.title[lang]}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="w-full px-6 sm:px-10 lg:px-16 py-8">
            {currentItem && (
              <>
                {/* Chapter & Section Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
                    <span>
                      {lang === 'ja' ? `第${currentItem.chapter.number}章` : `第${currentItem.chapter.number}章`}
                    </span>
                    <ChevronRight size={14} />
                    <span>{currentItem.chapter.title[lang]}</span>
                  </div>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight">
                    {currentItem.section.title[lang]}
                  </h1>
                </div>

                {/* Content */}
                <article className="prose prose-stone prose-xl max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="font-serif text-4xl font-bold text-stone-900 mt-12 mb-6">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="font-serif text-3xl font-bold text-stone-800 mt-10 mb-4 pb-2 border-b border-stone-200">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="font-serif text-2xl font-semibold text-stone-800 mt-8 mb-3">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="font-serif text-xl font-semibold text-stone-700 mt-6 mb-2">
                          {children}
                        </h4>
                      ),
                      p: ({ children }) => (
                        <p className="text-stone-700 leading-relaxed mb-5 text-lg sm:text-xl">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="space-y-3 my-5 text-stone-700 text-lg sm:text-xl">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="space-y-3 my-5 text-stone-700 text-lg sm:text-xl list-decimal list-inside">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-stone-700 leading-relaxed text-lg sm:text-xl">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-stone-900">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-stone-600">{children}</em>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-amber-400 pl-6 py-3 my-6 bg-amber-50 rounded-r-lg text-stone-700 italic text-lg sm:text-xl">
                          {children}
                        </blockquote>
                      ),
                      hr: () => (
                        <hr className="my-8 border-stone-200" />
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6 rounded-lg border border-stone-200">
                          <table className="w-full border-collapse">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-stone-100">{children}</thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-5 py-4 text-left text-stone-800 font-semibold border-b border-stone-200 text-lg">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-5 py-4 text-stone-700 border-b border-stone-100 text-lg">
                          {children}
                        </td>
                      ),
                      code: ({ className, children }) => {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="bg-stone-100 text-amber-700 px-1.5 py-0.5 rounded text-sm font-mono">
                              {children}
                            </code>
                          );
                        }
                        return (
                          <pre className="bg-stone-900 text-stone-100 rounded-lg p-4 overflow-x-auto my-4">
                            <code className="text-sm font-mono">{children}</code>
                          </pre>
                        );
                      },
                      img: ({ alt }) => (
                        <figure className="my-8">
                          <div className="bg-stone-100 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                            <div className="text-center text-stone-500">
                              <BookOpen size={48} className="mx-auto mb-2 text-stone-300" />
                              <p className="text-sm">{alt || '图片'}</p>
                            </div>
                          </div>
                          {alt && (
                            <figcaption className="text-center text-sm text-stone-500 mt-2">
                              {alt}
                            </figcaption>
                          )}
                        </figure>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-amber-600 hover:text-amber-700 underline decoration-amber-300 hover:decoration-amber-500 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {currentItem.section.content[lang]}
                  </ReactMarkdown>
                </article>

                {/* Navigation Footer */}
                <div className="mt-16 pt-8 border-t border-stone-200">
                  <div className="flex items-center justify-between gap-4">
                    {/* Previous */}
                    <button
                      onClick={goPrev}
                      disabled={currentSectionIndex === 0}
                      className={`flex-1 max-w-xs text-left p-4 rounded-xl border transition-colors ${
                        currentSectionIndex === 0
                          ? 'border-stone-100 text-stone-300 cursor-not-allowed'
                          : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <ArrowLeft size={14} />
                        <span>{lang === 'ja' ? '前へ' : '上一节'}</span>
                      </div>
                      {currentSectionIndex > 0 && (
                        <div className="text-stone-800 font-medium truncate">
                          {allSections[currentSectionIndex - 1].section.title[lang]}
                        </div>
                      )}
                    </button>

                    {/* Page indicator */}
                    <div className="text-stone-400 text-sm hidden sm:block">
                      {currentSectionIndex + 1} / {allSections.length}
                    </div>

                    {/* Next */}
                    <button
                      onClick={goNext}
                      disabled={currentSectionIndex === allSections.length - 1}
                      className={`flex-1 max-w-xs text-right p-4 rounded-xl border transition-colors ${
                        currentSectionIndex === allSections.length - 1
                          ? 'border-stone-100 text-stone-300 cursor-not-allowed'
                          : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-end gap-2 text-sm mb-1">
                        <span>{lang === 'ja' ? '次へ' : '下一节'}</span>
                        <ArrowRight size={14} />
                      </div>
                      {currentSectionIndex < allSections.length - 1 && (
                        <div className="text-stone-800 font-medium truncate">
                          {allSections[currentSectionIndex + 1].section.title[lang]}
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Reading tip */}
                <div className="mt-8 text-center text-stone-400 text-sm">
                  {lang === 'ja' ? '← → キーでページ移動' : '使用 ← → 方向键翻页'}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIBookPage;

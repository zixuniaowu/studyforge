import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Plus, Layers, X } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useFlashcardStore } from '../stores/flashcardStore';
import { FlashcardDeckCard, FlashcardReview } from '../components/Flashcard';
import { flashcardDB } from '../lib/db';
import { SimpleRating } from '../lib/spacedRepetition';

const DECK_COLORS = [
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#f59e0b', // amber
  '#10b981', // emerald
  '#ef4444', // red
  '#3b82f6', // blue
  '#ec4899', // pink
  '#6366f1'  // indigo
];

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const language = useLanguageStore(state => state.language);
  const {
    decks,
    currentDeck,
    cards,
    dueCards,
    currentCardIndex,
    isFlipped,
    loadDecks,
    createDeck,
    deleteDeck,
    selectDeck,
    createCard,
    deleteCard,
    loadDueCards,
    startReview,
    flipCard,
    rateCard
  } = useFlashcardStore();

  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [dueCounts, setDueCounts] = useState<Record<string, number>>({});

  // Form states
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDescription, setNewDeckDescription] = useState('');
  const [newDeckColor, setNewDeckColor] = useState(DECK_COLORS[0]);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  useEffect(() => {
    loadDecks();
  }, [loadDecks]);

  useEffect(() => {
    // Load due counts for all decks
    const loadDueCounts = async () => {
      const counts: Record<string, number> = {};
      for (const deck of decks) {
        const dueCards = await flashcardDB.getDueCards(deck.id);
        counts[deck.id] = dueCards.length;
      }
      setDueCounts(counts);
    };
    if (decks.length > 0) {
      loadDueCounts();
    }
  }, [decks]);

  const handleCreateDeck = async () => {
    if (!newDeckName.trim()) return;

    await createDeck({
      name: newDeckName.trim(),
      description: newDeckDescription.trim(),
      color: newDeckColor
    });

    setNewDeckName('');
    setNewDeckDescription('');
    setShowCreateDeck(false);
  };

  const handleDeleteDeck = async (id: string) => {
    if (confirm(language === 'ja' ? 'このデッキを削除しますか？' : '确定要删除这个卡组吗？')) {
      await deleteDeck(id);
    }
  };

  const handleCreateCard = async () => {
    if (!currentDeck || !newCardFront.trim() || !newCardBack.trim()) return;

    await createCard({
      deckId: currentDeck.id,
      front: newCardFront.trim(),
      back: newCardBack.trim(),
      tags: []
    });

    setNewCardFront('');
    setNewCardBack('');
    setShowCreateCard(false);
  };

  const handleStartReview = async (deckId: string) => {
    await loadDueCards(deckId);
    setShowReview(true);
    setTimeout(() => startReview(), 100);
  };

  const handleCloseReview = () => {
    setShowReview(false);
    loadDecks(); // Refresh due counts
  };

  const handleRate = async (rating: SimpleRating) => {
    await rateCard(rating);
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
                {language === 'ja' ? 'フラッシュカード' : '闪卡复习'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={20} className="text-slate-400" />
              <span className="font-semibold">StudyForge</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 lg:px-10 py-8">
        {/* Deck View or Card View */}
        {!currentDeck ? (
          // Deck List View
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {language === 'ja' ? 'カードデッキ' : '卡组'}
                </h2>
                <p className="text-sm text-slate-500">
                  {language === 'ja' ? 'デッキを選択して学習を始める' : '选择一个卡组开始学习'}
                </p>
              </div>
              <button
                onClick={() => setShowCreateDeck(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus size={18} />
                {language === 'ja' ? '新規デッキ' : '新建卡组'}
              </button>
            </div>

            {decks.length === 0 ? (
              <div className="text-center py-16">
                <Layers size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 mb-4">
                  {language === 'ja' ? 'まだデッキがありません' : '还没有卡组'}
                </p>
                <button
                  onClick={() => setShowCreateDeck(true)}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  {language === 'ja' ? '最初のデッキを作成' : '创建第一个卡组'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map(deck => (
                  <FlashcardDeckCard
                    key={deck.id}
                    deck={deck}
                    dueCount={dueCounts[deck.id] || 0}
                    onSelect={() => selectDeck(deck)}
                    onStartReview={() => handleStartReview(deck.id)}
                    onDelete={() => handleDeleteDeck(deck.id)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          // Card List View
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => selectDeck(null)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} className="text-slate-400 rotate-180" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{currentDeck.name}</h2>
                  <p className="text-sm text-slate-500">
                    {cards.length} {language === 'ja' ? '枚のカード' : '张卡片'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {dueCounts[currentDeck.id] > 0 && (
                  <button
                    onClick={() => handleStartReview(currentDeck.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                  >
                    {language === 'ja' ? '復習開始' : '开始复习'} ({dueCounts[currentDeck.id]})
                  </button>
                )}
                <button
                  onClick={() => setShowCreateCard(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  {language === 'ja' ? '新規カード' : '新建卡片'}
                </button>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 mb-4">
                  {language === 'ja' ? 'まだカードがありません' : '还没有卡片'}
                </p>
                <button
                  onClick={() => setShowCreateCard(true)}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  {language === 'ja' ? '最初のカードを作成' : '创建第一张卡片'}
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {cards.map(card => (
                  <div
                    key={card.id}
                    className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 mb-2">{card.front}</p>
                        <p className="text-sm text-slate-500">{card.back}</p>
                      </div>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-1.5 hover:bg-red-100 rounded transition-colors"
                      >
                        <X size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
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

      {/* Create Deck Modal */}
      {showCreateDeck && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {language === 'ja' ? '新規デッキ' : '新建卡组'}
              </h3>
              <button
                onClick={() => setShowCreateDeck(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'ja' ? 'デッキ名' : '卡组名称'}
                </label>
                <input
                  type="text"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder={language === 'ja' ? '例：Python基礎' : '例：Python基础'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'ja' ? '説明（任意）' : '描述（可选）'}
                </label>
                <textarea
                  value={newDeckDescription}
                  onChange={(e) => setNewDeckDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {language === 'ja' ? '色を選択' : '选择颜色'}
                </label>
                <div className="flex gap-2">
                  {DECK_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewDeckColor(color)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        newDeckColor === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateDeck(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {language === 'ja' ? 'キャンセル' : '取消'}
              </button>
              <button
                onClick={handleCreateDeck}
                disabled={!newDeckName.trim()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition-colors"
              >
                {language === 'ja' ? '作成' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Card Modal */}
      {showCreateCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {language === 'ja' ? '新規カード' : '新建卡片'}
              </h3>
              <button
                onClick={() => setShowCreateCard(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'ja' ? '表面（質問）' : '正面（问题）'}
                </label>
                <textarea
                  value={newCardFront}
                  onChange={(e) => setNewCardFront(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  rows={3}
                  placeholder={language === 'ja' ? '質問を入力...' : '输入问题...'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {language === 'ja' ? '裏面（答え）' : '背面（答案）'}
                </label>
                <textarea
                  value={newCardBack}
                  onChange={(e) => setNewCardBack(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  rows={3}
                  placeholder={language === 'ja' ? '答えを入力...' : '输入答案...'}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateCard(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {language === 'ja' ? 'キャンセル' : '取消'}
              </button>
              <button
                onClick={handleCreateCard}
                disabled={!newCardFront.trim() || !newCardBack.trim()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition-colors"
              >
                {language === 'ja' ? '作成' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && (
        <FlashcardReview
          cards={dueCards}
          currentIndex={currentCardIndex}
          isFlipped={isFlipped}
          onFlip={flipCard}
          onRate={handleRate}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
}

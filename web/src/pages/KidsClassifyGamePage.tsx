import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, Play, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useKidsProgressStore } from '../stores/kidsProgressStore';
import {
  classifyGameLevels,
  getLevelById,
  getNextLevel,
  ClassifyItem,
  ClassifyLevel,
} from '../data/classifyGameLevels';
import {
  DraggableImage,
  DropZone,
  GameTimer,
  ScoreBoard,
  GameResultModal,
} from '../components/ClassifyGame';

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Level selector component
const LevelSelector = ({
  levels,
  currentLevelIndex,
  onSelect,
}: {
  levels: ClassifyLevel[];
  currentLevelIndex: number;
  onSelect: (index: number) => void;
}) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {levels.map((level, index) => {
        const isUnlocked = index <= currentLevelIndex;
        const isCurrent = index === currentLevelIndex;

        return (
          <button
            key={level.id}
            onClick={() => isUnlocked && onSelect(index)}
            disabled={!isUnlocked}
            className={`
              relative px-4 py-3 rounded-2xl font-medium transition-all
              ${isCurrent
                ? 'bg-purple-500 text-white shadow-lg scale-105'
                : isUnlocked
                ? 'bg-white text-gray-700 hover:bg-purple-100 shadow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {isUnlocked ? (
                isCurrent ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>{isZh ? level.name.zh : level.name.ja}</span>
            </div>

            {/* Difficulty badge */}
            <div
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${difficultyColors[level.difficulty]}`}
            />
          </button>
        );
      })}
    </div>
  );
};

// Game state type
type GameState = 'selecting' | 'playing' | 'finished';

export default function KidsClassifyGamePage() {
  const navigate = useNavigate();
  const { levelId } = useParams<{ levelId: string }>();
  const { language } = useLanguageStore();
  const { addStars } = useKidsProgressStore();
  const isZh = language === 'zh';

  // Game state
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<ClassifyLevel | null>(null);
  const [items, setItems] = useState<ClassifyItem[]>([]);
  const [classifications, setClassifications] = useState<Map<string, string>>(new Map());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeUsed, setTimeUsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [draggingItem, setDraggingItem] = useState<ClassifyItem | null>(null);

  // Initialize level from URL or default
  useEffect(() => {
    if (levelId) {
      const level = getLevelById(levelId);
      if (level) {
        const index = classifyGameLevels.findIndex(l => l.id === levelId);
        setCurrentLevelIndex(index);
        setCurrentLevel(level);
      }
    }
  }, [levelId]);

  // Start game
  const startGame = useCallback((level: ClassifyLevel) => {
    setCurrentLevel(level);
    setItems(shuffleArray(level.items));
    setClassifications(new Map());
    setCorrectCount(0);
    setWrongCount(0);
    setTimeUsed(0);
    setStartTime(Date.now());
    setGameState('playing');
  }, []);

  // Handle level selection
  const handleLevelSelect = (index: number) => {
    setCurrentLevelIndex(index);
    const level = classifyGameLevels[index];
    setCurrentLevel(level);
    startGame(level);
  };

  // Handle item drop
  const handleDrop = useCallback((item: ClassifyItem, categoryId: string) => {
    if (!currentLevel) return;

    // Find the actual item from the level data
    const actualItem = currentLevel.items.find(i => i.id === item.id);
    if (!actualItem) return;

    const isCorrect = actualItem.categoryId === categoryId;

    setClassifications(prev => new Map(prev).set(item.id, categoryId));

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }

    // Check if game is complete
    const totalClassified = classifications.size + 1;
    if (totalClassified >= currentLevel.items.length) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setTimeUsed(elapsed);
      setGameState('finished');

      // Award stars
      const isPassed = correctCount + (isCorrect ? 1 : 0) >= currentLevel.requiredCorrect;
      if (isPassed) {
        addStars(currentLevel.starsReward);
      } else {
        addStars(Math.floor(currentLevel.starsReward * 0.3));
      }
    }
  }, [currentLevel, classifications, startTime, correctCount, addStars]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (!currentLevel) return;
    const elapsed = currentLevel.timeLimit;
    setTimeUsed(elapsed);
    setGameState('finished');
  }, [currentLevel]);

  // Handle replay
  const handleReplay = () => {
    if (currentLevel) {
      startGame(currentLevel);
    }
  };

  // Handle next level
  const handleNextLevel = () => {
    if (currentLevel) {
      const next = getNextLevel(currentLevel.id);
      if (next) {
        setCurrentLevelIndex(prev => prev + 1);
        startGame(next);
      }
    }
  };

  // Get items for display
  const unclassifiedItems = items.filter(item => !classifications.has(item.id));
  const getItemsInCategory = (categoryId: string) =>
    items.filter(item => classifications.get(item.id) === categoryId);

  // Check if item was correctly classified
  const isItemCorrect = (item: ClassifyItem) => {
    const classifiedTo = classifications.get(item.id);
    return classifiedTo === item.categoryId;
  };

  const isPassed = currentLevel ? correctCount >= currentLevel.requiredCorrect : false;
  const hasNextLevel = currentLevel ? !!getNextLevel(currentLevel.id) : false;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFE8D6 100%)',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/kids-course')}
                className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{isZh ? '返回' : '戻る'}</span>
              </button>
              <h1 className="text-lg font-bold flex items-center gap-2">
                🎮 {isZh ? '图片分类游戏' : '画像分類ゲーム'}
              </h1>
            </div>

            {gameState === 'playing' && currentLevel && (
              <GameTimer
                totalTime={currentLevel.timeLimit}
                isRunning={gameState === 'playing'}
                onTimeUp={handleTimeUp}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main content - full width, minimal padding */}
      <div className="flex-1 px-3 py-4 w-full">
        {/* Level selection view */}
        {gameState === 'selecting' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {isZh ? '选择关卡' : 'レベルを選択'}
            </h2>
            <p className="text-gray-600 mb-8">
              {isZh
                ? '学习像AI一样对图片进行分类！'
                : 'AIのように画像を分類しよう！'}
            </p>

            <LevelSelector
              levels={classifyGameLevels}
              currentLevelIndex={currentLevelIndex}
              onSelect={handleLevelSelect}
            />

            {currentLevel && (
              <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isZh ? currentLevel.name.zh : currentLevel.name.ja}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isZh ? currentLevel.description.zh : currentLevel.description.ja}
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
                  <span>⏱️ {currentLevel.timeLimit}s</span>
                  <span>⭐ {currentLevel.starsReward}</span>
                  <span>🎯 {currentLevel.requiredCorrect}/{currentLevel.items.length}</span>
                </div>
                <button
                  onClick={() => startGame(currentLevel)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {isZh ? '开始游戏' : 'ゲーム開始'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Playing view */}
        {gameState === 'playing' && currentLevel && (
          <div className="flex flex-col h-full gap-3">
            {/* Level info - compact */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {isZh ? currentLevel.name.zh : currentLevel.name.ja}
              </h2>
            </div>

            {/* Score board */}
            <ScoreBoard
              correct={correctCount}
              wrong={wrongCount}
              total={currentLevel.items.length}
              starsReward={currentLevel.starsReward}
            />

            {/* Drop zones - larger, full width */}
            <div className={`grid gap-3 flex-1 ${currentLevel.categories.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {currentLevel.categories.map(category => (
                <DropZone
                  key={category.id}
                  category={category}
                  onDrop={handleDrop}
                  droppedItems={getItemsInCategory(category.id)}
                  isActive={!!draggingItem}
                />
              ))}
            </div>

            {/* Draggable items - compact */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-base font-bold text-gray-700 mb-3 text-center">
                {isZh ? '👆 拖动图片到上方分类区' : '👆 画像を上の分類エリアにドラッグ'}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {unclassifiedItems.map(item => (
                  <DraggableImage
                    key={item.id}
                    item={item}
                    onDragStart={setDraggingItem}
                    onDragEnd={() => setDraggingItem(null)}
                    isClassified={classifications.has(item.id)}
                    isCorrect={isItemCorrect(item)}
                  />
                ))}
                {unclassifiedItems.length === 0 && (
                  <div className="text-gray-400 py-4">
                    <div className="text-3xl mb-1">🎉</div>
                    <p>{isZh ? '全部分类完成！' : 'すべて分類完了！'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Result modal */}
      {currentLevel && (
        <GameResultModal
          show={gameState === 'finished'}
          level={currentLevel}
          correct={correctCount}
          wrong={wrongCount}
          timeUsed={timeUsed}
          isPassed={isPassed}
          onReplay={handleReplay}
          onNextLevel={handleNextLevel}
          onHome={() => navigate('/kids-course')}
          hasNextLevel={hasNextLevel}
        />
      )}
    </div>
  );
}

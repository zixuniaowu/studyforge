import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Play } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { storyChapters, StoryChapter } from '../data/storyContent';
import { StoryScene } from '../components/Story';

// Chapter selection state
type ViewState = 'chapters' | 'playing';

export default function KidsStoryPage() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  const [viewState, setViewState] = useState<ViewState>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  // Start playing a chapter
  const handleStartChapter = (chapter: StoryChapter) => {
    setSelectedChapter(chapter);
    setCurrentSceneIndex(0);
    setViewState('playing');
  };

  // Handle scene completion
  const handleSceneComplete = () => {
    if (selectedChapter && currentSceneIndex < selectedChapter.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      // Chapter complete, go back to chapter list
      setViewState('chapters');
      setSelectedChapter(null);
      setCurrentSceneIndex(0);
    }
  };

  // Go back to chapters
  const handleBackToChapters = () => {
    setViewState('chapters');
    setSelectedChapter(null);
    setCurrentSceneIndex(0);
  };

  const currentScene = selectedChapter?.scenes[currentSceneIndex];

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 100%)',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => viewState === 'playing' ? handleBackToChapters() : navigate('/kids-course')}
                className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{isZh ? '返回' : '戻る'}</span>
              </button>
              <h1 className="text-xl font-bold flex items-center gap-2">
                📖 {isZh ? '小AI的冒险' : '小さなAIの冒険'}
              </h1>
            </div>

            {/* Chapter progress */}
            {viewState === 'playing' && selectedChapter && (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
                <span>{isZh ? selectedChapter.title.zh : selectedChapter.title.ja}</span>
                <span className="text-white/70">
                  {currentSceneIndex + 1}/{selectedChapter.scenes.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Chapter selection view */}
        {viewState === 'chapters' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isZh ? '选择章节' : 'チャプターを選択'}
              </h2>
              <p className="text-gray-600">
                {isZh ? '跟随小AI一起开始冒险吧！' : '小さなAIと一緒に冒険しよう！'}
              </p>
            </div>

            {/* Characters preview */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-4xl mb-2">🤖</div>
                <div className="text-sm font-medium text-gray-700">{isZh ? '小AI' : 'AIちゃん'}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-4xl mb-2">👨‍🔬</div>
                <div className="text-sm font-medium text-gray-700">{isZh ? '博士' : '博士'}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                <div className="text-4xl mb-2">👦</div>
                <div className="text-sm font-medium text-gray-700">{isZh ? '小明' : 'たくみ'}</div>
              </div>
            </div>

            {/* Chapter list */}
            <div className="space-y-4">
              {storyChapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={`
                    bg-white rounded-3xl p-6 shadow-lg transition-all
                    ${chapter.unlocked ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : 'opacity-60'}
                  `}
                  onClick={() => chapter.unlocked && handleStartChapter(chapter)}
                >
                  <div className="flex items-center gap-4">
                    {/* Chapter icon */}
                    <div
                      className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                        ${chapter.unlocked ? 'bg-green-100' : 'bg-gray-100'}
                      `}
                    >
                      {chapter.unlocked ? chapter.icon : <Lock className="w-6 h-6 text-gray-400" />}
                    </div>

                    {/* Chapter info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {isZh ? `第${index + 1}章` : `第${index + 1}章`}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {isZh ? chapter.title.zh : chapter.title.ja}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {isZh ? chapter.description.zh : chapter.description.ja}
                      </p>
                    </div>

                    {/* Status/Action */}
                    <div className="flex items-center">
                      {chapter.unlocked ? (
                        <div className="bg-green-500 text-white p-3 rounded-2xl">
                          <Play className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 text-gray-400 p-3 rounded-2xl">
                          <Lock className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scene count */}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <span>📜 {chapter.scenes.length} {isZh ? '场景' : 'シーン'}</span>
                    <span>·</span>
                    <span>📚 {isZh ? '关联单元' : '関連ユニット'}: {chapter.relatedUnit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playing view */}
        {viewState === 'playing' && selectedChapter && currentScene && (
          <div className="space-y-6">
            {/* Chapter title */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isZh ? selectedChapter.title.zh : selectedChapter.title.ja}
              </h2>
              <p className="text-gray-500">
                {isZh ? `场景 ${currentSceneIndex + 1}` : `シーン ${currentSceneIndex + 1}`}
              </p>
            </div>

            {/* Story scene */}
            <StoryScene
              scene={currentScene}
              onSceneComplete={handleSceneComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

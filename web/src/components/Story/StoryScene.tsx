import { useState } from 'react';
import { Play, BookOpen, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../../stores/languageStore';
import { StoryScene as StorySceneType } from '../../data/storyContent';
import { DialogueBox } from './DialogueBox';

interface StorySceneProps {
  scene: StorySceneType;
  onSceneComplete: () => void;
}

export const StoryScene = ({ scene, onSceneComplete }: StorySceneProps) => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const isZh = language === 'zh';
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const currentLine = scene.dialogue[currentLineIndex];
  const isLastLine = currentLineIndex >= scene.dialogue.length - 1;

  const handleLineComplete = () => {
    if (!isLastLine) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      // Show action buttons if there's a linked lesson or game
      if (!scene.linkedLesson && !scene.linkedGame) {
        onSceneComplete();
      }
    }
  };

  const handleGoToLesson = () => {
    if (scene.linkedLesson) {
      navigate(`/kids-course/${scene.linkedLesson}`);
    }
  };

  const handleGoToGame = () => {
    if (scene.linkedGame === 'classify') {
      navigate('/kids-classify-game');
    } else if (scene.linkedGame === 'trainer') {
      navigate('/kids-ai-trainer');
    }
  };

  return (
    <div
      className="min-h-[60vh] rounded-3xl p-8 relative overflow-hidden"
      style={{ background: scene.backgroundGradient }}
    >
      {/* Background emoji decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-20 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {scene.backgroundEmoji}
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {scene.dialogue.map((_, idx) => (
          <div
            key={idx}
            className={`
              w-2 h-2 rounded-full transition-all
              ${idx <= currentLineIndex ? 'bg-white' : 'bg-white/30'}
              ${idx === currentLineIndex ? 'w-4' : ''}
            `}
          />
        ))}
      </div>

      {/* Main dialogue area */}
      <div className="max-w-2xl mx-auto relative z-10">
        <DialogueBox
          line={currentLine}
          onComplete={handleLineComplete}
        />
      </div>

      {/* Action buttons (when scene has linked content) */}
      {isLastLine && (scene.linkedLesson || scene.linkedGame) && (
        <div className="flex justify-center gap-4 mt-8">
          {scene.linkedLesson && (
            <button
              onClick={handleGoToLesson}
              className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              {isZh ? '去学习课程' : 'レッスンへ'}
            </button>
          )}
          {scene.linkedGame && (
            <button
              onClick={handleGoToGame}
              className="flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Gamepad2 className="w-5 h-5" />
              {isZh ? '去玩游戏' : 'ゲームへ'}
            </button>
          )}
          {scene.nextSceneId && (
            <button
              onClick={onSceneComplete}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              {isZh ? '继续故事' : '続ける'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

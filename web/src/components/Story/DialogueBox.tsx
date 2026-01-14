import { useState, useEffect } from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { DialogueLine, getCharacterById } from '../../data/storyContent';

interface DialogueBoxProps {
  line: DialogueLine;
  onComplete: () => void;
  autoAdvance?: boolean;
}

export const DialogueBox = ({ line, onComplete, autoAdvance = false }: DialogueBoxProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const character = getCharacterById(line.characterId);
  const fullText = isZh ? line.text.zh : line.text.ja;

  // Typing animation
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);

        if (autoAdvance) {
          setTimeout(onComplete, 2000);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText, autoAdvance, onComplete]);

  // Skip typing animation on click
  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
    } else {
      onComplete();
    }
  };

  // Emotion to expression mapping
  const emotionEmoji: Record<string, string> = {
    happy: '😊',
    thinking: '🤔',
    surprised: '😲',
    sad: '😢',
    excited: '🤩',
  };

  const isNarrator = line.characterId === 'narrator';

  return (
    <div
      onClick={handleClick}
      className={`
        ${isNarrator ? 'bg-gray-800/80' : 'bg-white'}
        rounded-3xl p-6 shadow-xl cursor-pointer transition-all hover:scale-[1.02]
        ${isNarrator ? 'text-white italic' : 'text-gray-800'}
      `}
      style={{
        borderLeft: isNarrator ? undefined : `6px solid ${character?.color || '#8B5CF6'}`,
      }}
    >
      {/* Character info */}
      {!isNarrator && character && (
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${character.color}20` }}
          >
            {character.avatar}
          </div>
          <div>
            <div className="font-bold" style={{ color: character.color }}>
              {isZh ? character.name.zh : character.name.ja}
            </div>
            {line.emotion && (
              <div className="text-sm text-gray-500 flex items-center gap-1">
                {emotionEmoji[line.emotion]} {line.emotion}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text */}
      <p className={`text-lg leading-relaxed ${isNarrator ? 'text-center' : ''}`}>
        {displayedText}
        {isTyping && <span className="animate-blink ml-1">|</span>}
      </p>

      {/* Click hint */}
      {!isTyping && (
        <div className={`text-right text-sm mt-3 ${isNarrator ? 'text-gray-300' : 'text-gray-400'}`}>
          {isZh ? '点击继续 →' : 'クリックして続ける →'}
        </div>
      )}
    </div>
  );
};

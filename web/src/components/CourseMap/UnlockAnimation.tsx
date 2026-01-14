import { useEffect, useState } from 'react';
import { Star, Sparkles } from 'lucide-react';

interface UnlockAnimationProps {
  show: boolean;
  starsEarned: number;
  onComplete: () => void;
}

export const UnlockAnimation = ({ show, starsEarned, onComplete }: UnlockAnimationProps) => {
  const [phase, setPhase] = useState<'hidden' | 'stars' | 'unlock' | 'complete'>('hidden');
  const [displayedStars, setDisplayedStars] = useState(0);

  useEffect(() => {
    if (show) {
      // Start animation sequence
      setPhase('stars');
      setDisplayedStars(0);

      // Animate stars counting up
      let count = 0;
      const starInterval = setInterval(() => {
        count++;
        setDisplayedStars(count);
        if (count >= starsEarned) {
          clearInterval(starInterval);
          // Move to unlock phase
          setTimeout(() => setPhase('unlock'), 500);
        }
      }, 100);

      // Complete after unlock animation
      const completeTimer = setTimeout(() => {
        setPhase('complete');
        setTimeout(onComplete, 500);
      }, 2500);

      return () => {
        clearInterval(starInterval);
        clearTimeout(completeTimer);
      };
    } else {
      setPhase('hidden');
    }
  }, [show, starsEarned, onComplete]);

  if (phase === 'hidden') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        {/* Particle effects */}
        {phase === 'unlock' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-explode"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 18}deg) translateY(-100px)`,
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center animate-bounceIn">
          {/* Stars display */}
          <div className="mb-6">
            <div className="text-6xl mb-2">
              {phase === 'complete' ? '🎉' : '⭐'}
            </div>
            <div className="flex items-center justify-center gap-2 text-4xl font-bold text-yellow-500">
              <span className="animate-pulse">+{displayedStars}</span>
              <Star className="w-10 h-10 fill-yellow-400 text-yellow-400 animate-spin-star" />
            </div>
          </div>

          {/* Status message */}
          <div className="text-xl font-bold text-gray-800">
            {phase === 'stars' && '计算星星中...'}
            {phase === 'unlock' && '太棒了！'}
            {phase === 'complete' && '继续前进！'}
          </div>

          {/* Star trail animation */}
          {phase === 'stars' && (
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 transition-all duration-300 ${
                    i < Math.ceil(displayedStars / (starsEarned / 5))
                      ? 'text-yellow-400 fill-yellow-400 scale-110'
                      : 'text-gray-300'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Confetti component for celebrations
export const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#10B981'];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(confettiCount)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            backgroundColor: colors[i % colors.length],
            width: `${8 + Math.random() * 8}px`,
            height: `${8 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

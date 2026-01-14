import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface GameTimerProps {
  totalTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export const GameTimer = ({ totalTime, isRunning, onTimeUp }: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  const percentage = (timeLeft / totalTime) * 100;
  const isLow = percentage < 30;
  const isCritical = percentage < 15;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Timer display */}
      <div
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xl
          transition-all duration-300
          ${isCritical
            ? 'bg-red-500 text-white animate-pulse scale-110'
            : isLow
            ? 'bg-orange-500 text-white'
            : 'bg-purple-100 text-purple-600'
          }
        `}
      >
        <Clock className={`w-6 h-6 ${isCritical ? 'animate-spin' : ''}`} />
        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`
            h-full rounded-full transition-all duration-1000 ease-linear
            ${isCritical ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-purple-500'}
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div
            className="h-full w-full animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          />
        </div>
      </div>

      {/* Warning text */}
      {isCritical && (
        <span className="text-red-500 font-bold animate-bounce text-sm">
          ⚠️ 快没时间了！
        </span>
      )}
    </div>
  );
};

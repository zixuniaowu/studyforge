import React, { useEffect } from 'react';
import { useQuizStore } from '../../stores/quizStore';
import { Clock, AlertTriangle } from 'lucide-react';

export const Timer: React.FC = () => {
  const { timeRemaining, tick, mode } = useQuizStore();

  useEffect(() => {
    if (mode !== 'exam' || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, timeRemaining, tick]);

  if (mode !== 'exam' || timeRemaining <= 0) return null;

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (n: number): string => n.toString().padStart(2, '0');
  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      isLowTime ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
    }`}>
      {isLowTime ? (
        <AlertTriangle size={20} className="animate-pulse" />
      ) : (
        <Clock size={20} />
      )}
      <span className="font-mono text-lg font-medium">
        {hours > 0 && `${formatTime(hours)}:`}
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
};

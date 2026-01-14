import { Lock, Play, CheckCircle, Star } from 'lucide-react';
import { useKidsProgressStore } from '../../stores/kidsProgressStore';
import { KidsLesson } from '../../types';

interface LessonNodeProps {
  lesson: KidsLesson;
  unitColor: string;
  position: { x: number; y: number };
  onClick: () => void;
  isActive?: boolean;
}

export const LessonNode = ({ lesson, unitColor, position, onClick, isActive }: LessonNodeProps) => {
  const { getLessonStatus, progress } = useKidsProgressStore();
  const status = getLessonStatus(lesson.id);
  const starsEarned = progress[lesson.id]?.starsEarned || 0;

  // Node colors based on status
  const getNodeStyle = () => {
    switch (status) {
      case 'locked':
        return {
          bg: '#9CA3AF',
          border: '#6B7280',
          shadow: 'rgba(107, 114, 128, 0.3)',
          glow: false,
        };
      case 'available':
      case 'in-progress':
        return {
          bg: unitColor,
          border: unitColor,
          shadow: `${unitColor}60`,
          glow: true,
        };
      case 'completed':
        return {
          bg: '#10B981',
          border: '#059669',
          shadow: 'rgba(16, 185, 129, 0.4)',
          glow: false,
        };
      default:
        return {
          bg: '#9CA3AF',
          border: '#6B7280',
          shadow: 'rgba(107, 114, 128, 0.3)',
          glow: false,
        };
    }
  };

  const nodeStyle = getNodeStyle();

  // Lesson type icons
  const lessonTypeIcon: Record<string, string> = {
    video: '🎬',
    reading: '📖',
    interactive: '🎮',
    quiz: '📝',
    project: '🛠️',
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
    >
      {/* Glow effect for available lessons */}
      {nodeStyle.glow && (
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{
            backgroundColor: unitColor,
            width: '80px',
            height: '80px',
            left: '-8px',
            top: '-8px',
          }}
        />
      )}

      {/* Main node button */}
      <button
        onClick={onClick}
        disabled={status === 'locked'}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300 transform
          ${status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
          ${isActive ? 'scale-125 z-20' : 'z-10'}
        `}
        style={{
          backgroundColor: nodeStyle.bg,
          border: `4px solid ${nodeStyle.border}`,
          boxShadow: `0 4px 20px ${nodeStyle.shadow}`,
        }}
      >
        {/* Icon */}
        {status === 'locked' ? (
          <Lock className="w-6 h-6 text-white" />
        ) : status === 'completed' ? (
          <CheckCircle className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white fill-white" />
        )}

        {/* Lesson number badge */}
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold"
          style={{ color: nodeStyle.bg }}
        >
          {lesson.order}
        </div>
      </button>

      {/* Lesson type icon */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xl">
        {lessonTypeIcon[lesson.type] || '📚'}
      </div>

      {/* Stars earned (for completed lessons) */}
      {status === 'completed' && starsEarned > 0 && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5">
          {[...Array(Math.min(3, Math.ceil(starsEarned / 5)))].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
      )}

      {/* Pulse animation for available lessons */}
      {(status === 'available' || status === 'in-progress') && (
        <div
          className="absolute inset-0 rounded-full animate-pulse opacity-50"
          style={{
            backgroundColor: unitColor,
            width: '64px',
            height: '64px',
          }}
        />
      )}
    </div>
  );
};

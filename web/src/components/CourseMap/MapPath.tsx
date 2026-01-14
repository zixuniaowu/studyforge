import { useKidsProgressStore } from '../../stores/kidsProgressStore';

interface MapPathProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  fromLessonId: string;
  toLessonId: string;
  unitColor: string;
}

export const MapPath = ({ from, to, fromLessonId, toLessonId, unitColor }: MapPathProps) => {
  const { getLessonStatus } = useKidsProgressStore();
  const fromStatus = getLessonStatus(fromLessonId);
  const toStatus = getLessonStatus(toLessonId);

  // Path is active if the "from" lesson is completed
  const isActive = fromStatus === 'completed';
  // Path is fully unlocked if both are completed or if "to" is available
  const isUnlocked = isActive || toStatus !== 'locked';

  // Calculate control points for curved path
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Add slight curve based on direction
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const curveOffset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3;

  const controlX = midX + (dy > 0 ? curveOffset : -curveOffset);
  const controlY = midY + (dx > 0 ? -curveOffset : curveOffset);

  // Create bezier path
  const pathD = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;

  return (
    <g>
      {/* Background path (always gray) */}
      <path
        d={pathD}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={isUnlocked ? "none" : "12 8"}
      />

      {/* Active path overlay */}
      {isActive && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={unitColor}
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Animated sparkle along path */}
          <circle
            r="4"
            fill="white"
            className="animate-path-travel"
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={pathD}
            />
          </circle>
        </>
      )}

      {/* Path dots for locked paths */}
      {!isUnlocked && (
        <>
          {[0.25, 0.5, 0.75].map((t, i) => {
            const px = from.x + (to.x - from.x) * t;
            const py = from.y + (to.y - from.y) * t;
            return (
              <circle
                key={i}
                cx={px}
                cy={py}
                r="5"
                fill="#D1D5DB"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
        </>
      )}
    </g>
  );
};

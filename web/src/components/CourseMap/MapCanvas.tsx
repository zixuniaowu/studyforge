import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { useKidsProgressStore } from '../../stores/kidsProgressStore';
import { KidsCourseUnit, KidsLesson } from '../../types';
import { LessonNode } from './LessonNode';
import { MapPath } from './MapPath';
import { MapDecorations, UnitTheme, ThemeBadge } from './MapDecorations';

interface MapCanvasProps {
  units: KidsCourseUnit[];
  onLessonClick: (lesson: KidsLesson) => void;
}

// Map unit index to theme
const unitThemes: UnitTheme[] = ['forest', 'city', 'ocean', 'space'];

// Calculate lesson positions in a zigzag pattern
const calculateLessonPositions = (lessons: KidsLesson[], canvasWidth: number, canvasHeight: number) => {
  const positions: { x: number; y: number }[] = [];
  // 进一步减小边距，最大化利用空间
  const marginX = 40;
  const marginY = 50;
  const availableWidth = canvasWidth - marginX * 2;
  const availableHeight = canvasHeight - marginY * 2;

  const rowCount = Math.ceil(lessons.length / 3);

  lessons.forEach((_, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Zigzag pattern: even rows go left-to-right, odd rows go right-to-left
    const actualCol = row % 2 === 0 ? col : 2 - col;

    // 更均匀的分布
    const x = marginX + (actualCol / 2) * availableWidth;
    const y = marginY + (rowCount > 1 ? (row / (rowCount - 1)) * availableHeight * 0.85 : availableHeight * 0.4);

    // Add some randomness for organic feel
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 15;

    positions.push({
      x: Math.max(40, Math.min(canvasWidth - 40, x + offsetX)),
      y: Math.max(50, Math.min(canvasHeight - 50, y + offsetY)),
    });
  });

  return positions;
};

export const MapCanvas = ({ units, onLessonClick }: MapCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const { language } = useLanguageStore();
  const { progress } = useKidsProgressStore();
  const isZh = language === 'zh';

  // Calculate canvas size based on container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // 使用容器的实际宽度，不设最小值限制
        setCanvasSize({
          width: rect.width || window.innerWidth - 48,
          height: Math.max(500, Math.min(700, window.innerHeight - 300)),
        });
      }
    };

    // 初始化时延迟一下确保容器已渲染
    setTimeout(updateSize, 100);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const currentUnit = units[currentUnitIndex];
  const theme = unitThemes[currentUnitIndex] || 'forest';
  const lessons = currentUnit?.lessons || [];
  const positions = calculateLessonPositions(lessons, canvasSize.width, canvasSize.height);

  // Calculate unit completion
  const getUnitCompletion = (unit: KidsCourseUnit) => {
    const completed = unit.lessons.filter(l => progress[l.id]?.status === 'completed').length;
    return {
      completed,
      total: unit.lessons.length,
      percentage: Math.round((completed / unit.lessons.length) * 100),
    };
  };

  const completion = getUnitCompletion(currentUnit);

  // Navigate between units
  const goToPreviousUnit = () => {
    if (currentUnitIndex > 0) {
      setCurrentUnitIndex(currentUnitIndex - 1);
    }
  };

  const goToNextUnit = () => {
    if (currentUnitIndex < units.length - 1) {
      setCurrentUnitIndex(currentUnitIndex + 1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Unit navigation header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={goToPreviousUnit}
          disabled={currentUnitIndex === 0}
          className={`p-3 rounded-full transition-all ${
            currentUnitIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white shadow-lg hover:shadow-xl text-gray-700 hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center gap-2">
          <ThemeBadge theme={theme} />
          <h2 className="text-2xl font-bold text-gray-800">
            {isZh ? currentUnit.title.zh : currentUnit.title.ja}
          </h2>
          <div className="flex items-center gap-4">
            {/* Unit indicators */}
            <div className="flex items-center gap-2">
              {units.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentUnitIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentUnitIndex
                      ? 'bg-purple-500 w-8'
                      : idx < currentUnitIndex
                      ? 'bg-green-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            {/* Completion badge */}
            <div className="flex items-center gap-1 px-3 py-1 bg-white/80 rounded-full text-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{completion.completed}/{completion.total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={goToNextUnit}
          disabled={currentUnitIndex === units.length - 1}
          className={`p-3 rounded-full transition-all ${
            currentUnitIndex === units.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white shadow-lg hover:shadow-xl text-gray-700 hover:scale-110'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Map canvas */}
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white/50"
        style={{
          height: canvasSize.height,
        }}
      >
        {/* Theme decorations */}
        <MapDecorations
          theme={theme}
          width={canvasSize.width}
          height={canvasSize.height}
        />

        {/* SVG layer for paths */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {lessons.slice(0, -1).map((lesson, index) => (
            <MapPath
              key={`path-${lesson.id}`}
              from={positions[index]}
              to={positions[index + 1]}
              fromLessonId={lesson.id}
              toLessonId={lessons[index + 1].id}
              unitColor={currentUnit.color}
            />
          ))}
        </svg>

        {/* Lesson nodes */}
        {lessons.map((lesson, index) => (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            unitColor={currentUnit.color}
            position={positions[index]}
            onClick={() => onLessonClick(lesson)}
          />
        ))}

        {/* Start and End markers */}
        {lessons.length > 0 && (
          <>
            <div
              className="absolute text-xl font-bold text-green-600 animate-bounce pointer-events-none whitespace-nowrap"
              style={{
                left: Math.max(5, positions[0].x - 50),
                top: positions[0].y - 30,
              }}
            >
              {isZh ? '🚀出发!' : '🚀スタート!'}
            </div>
            <div
              className="absolute text-2xl animate-bounce pointer-events-none"
              style={{
                left: Math.min(positions[positions.length - 1].x + 30, canvasSize.width - 40),
                top: positions[positions.length - 1].y - 10,
              }}
            >
              🏆
            </div>
          </>
        )}

        {/* Unit completion celebration */}
        {completion.percentage === 100 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounceIn">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {isZh ? '单元完成!' : 'ユニット完了!'}
              </h3>
              <p className="text-gray-600">
                {isZh ? '太棒了！继续下一个冒险吧！' : '素晴らしい！次の冒険へ！'}
              </p>
              <button
                onClick={goToNextUnit}
                className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              >
                {isZh ? '继续' : '続ける'} →
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

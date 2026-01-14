import { useState, useRef } from 'react';
import { ClassifyItem } from '../../data/classifyGameLevels';

interface DraggableImageProps {
  item: ClassifyItem;
  onDragStart: (item: ClassifyItem) => void;
  onDragEnd: () => void;
  isClassified: boolean;
  isCorrect?: boolean;
}

export const DraggableImage = ({
  item,
  onDragStart,
  onDragEnd,
  isClassified,
  isCorrect,
}: DraggableImageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(item);

    // Set drag image
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(elementRef.current, rect.width / 2, rect.height / 2);
    }

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStart(item);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  if (isClassified) {
    return (
      <div
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center text-3xl
          transition-all duration-300 opacity-50 relative
          ${isCorrect ? 'bg-green-100' : 'bg-red-100'}
        `}
      >
        {item.emoji}
        <div className="absolute -top-1 -right-1 text-sm">
          {isCorrect ? '✅' : '❌'}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        w-16 h-16 rounded-xl bg-white shadow-lg border-2 border-gray-100
        flex items-center justify-center text-3xl cursor-grab active:cursor-grabbing
        transition-all duration-200 select-none relative
        ${isDragging
          ? 'scale-110 shadow-2xl opacity-70 rotate-6 z-50'
          : 'hover:scale-105 hover:shadow-xl hover:border-purple-300'
        }
      `}
    >
      {item.emoji}

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)',
        }}
      />
    </div>
  );
};

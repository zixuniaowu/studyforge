import { useState } from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import { ClassifyCategory, ClassifyItem } from '../../data/classifyGameLevels';

interface DropZoneProps {
  category: ClassifyCategory;
  onDrop: (item: ClassifyItem, categoryId: string) => void;
  droppedItems: ClassifyItem[];
  isActive: boolean;
}

export const DropZone = ({
  category,
  onDrop,
  droppedItems,
  isActive,
}: DropZoneProps) => {
  const [isOver, setIsOver] = useState(false);
  const { language } = useLanguageStore();
  const isZh = language === 'zh';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    // The parent will handle the actual item lookup
    onDrop({ id: itemId } as ClassifyItem, category.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center p-3 rounded-2xl border-4 border-dashed
        transition-all duration-300 h-full min-h-[180px]
        ${isOver
          ? 'border-solid scale-[1.02] shadow-2xl'
          : isActive
          ? 'border-gray-300 bg-gray-50'
          : 'border-gray-200 bg-white/50'
        }
      `}
      style={{
        borderColor: isOver ? category.color : undefined,
        backgroundColor: isOver ? `${category.color}15` : undefined,
      }}
    >
      {/* Category header */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-2"
        style={{ backgroundColor: category.color }}
      >
        <span className="text-xl">{category.emoji}</span>
        <span className="text-white font-bold text-base">
          {isZh ? category.name.zh : category.name.ja}
        </span>
      </div>

      {/* Drop area */}
      <div className="flex-1 w-full flex flex-wrap justify-center content-start gap-2 overflow-auto">
        {droppedItems.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            <div className="text-3xl mb-1">👆</div>
            <p className="text-xs">
              {isZh ? '拖到这里' : 'ここにドラッグ'}
            </p>
          </div>
        ) : (
          droppedItems.map(item => (
            <div
              key={item.id}
              className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center text-2xl animate-bounceIn"
            >
              {item.emoji}
            </div>
          ))
        )}
      </div>

      {/* Count badge */}
      <div
        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
        style={{ backgroundColor: category.color }}
      >
        {droppedItems.length}
      </div>

      {/* Glow effect when active */}
      {isOver && (
        <div
          className="absolute inset-0 rounded-3xl animate-pulse"
          style={{
            boxShadow: `0 0 30px ${category.color}50`,
          }}
        />
      )}
    </div>
  );
};

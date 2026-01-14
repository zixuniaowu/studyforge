import { useState } from 'react';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { TrainingCategory, TrainingSample } from '../../data/aiTrainerPresets';

interface DataCollectorProps {
  categories: TrainingCategory[];
  availableSamples: TrainingSample[];
  collectedData: Map<string, TrainingSample[]>;
  onAddSample: (sample: TrainingSample, categoryId: string) => void;
  onRemoveSample: (sampleId: string, categoryId: string) => void;
  minSamplesPerCategory: number;
}

export const DataCollector = ({
  categories,
  availableSamples,
  collectedData,
  onAddSample,
  onRemoveSample,
  minSamplesPerCategory,
}: DataCollectorProps) => {
  const { language } = useLanguageStore();
  const isZh = language === 'zh';
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');

  // Get samples for selected category that haven't been collected yet
  const availableForCategory = availableSamples.filter(
    s => s.categoryId === selectedCategory &&
    !Array.from(collectedData.values()).flat().find(c => c.id === s.id)
  );

  // Get collected samples for each category
  const getCategoryData = (categoryId: string) => collectedData.get(categoryId) || [];

  // Check if category has enough samples
  const hasEnoughSamples = (categoryId: string) =>
    getCategoryData(categoryId).length >= minSamplesPerCategory;

  return (
    <div className="space-y-6">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(cat => {
          const collected = getCategoryData(cat.id).length;
          const isComplete = collected >= minSamplesPerCategory;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                relative px-4 py-2 rounded-2xl font-medium transition-all flex items-center gap-2
                ${selectedCategory === cat.id
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }
              `}
              style={{
                backgroundColor: selectedCategory === cat.id ? cat.color : undefined,
              }}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span>{isZh ? cat.name.zh : cat.name.ja}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${isComplete ? 'bg-green-500 text-white' : 'bg-white/30'}
              `}>
                {collected}/{minSamplesPerCategory}
              </span>
              {isComplete && (
                <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Current category info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {isZh ? '添加训练数据到' : 'トレーニングデータを追加'}：
          <span style={{ color: categories.find(c => c.id === selectedCategory)?.color }}>
            {' '}{isZh
              ? categories.find(c => c.id === selectedCategory)?.name.zh
              : categories.find(c => c.id === selectedCategory)?.name.ja
            }
          </span>
        </h3>
        <p className="text-gray-500 text-sm">
          {isZh
            ? `至少需要 ${minSamplesPerCategory} 个样本`
            : `最低 ${minSamplesPerCategory} サンプル必要`
          }
        </p>
      </div>

      {/* Available samples grid */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {isZh ? '可用样本' : '利用可能なサンプル'}
        </h4>

        {availableForCategory.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {availableForCategory.map(sample => (
              <button
                key={sample.id}
                onClick={() => onAddSample(sample, selectedCategory)}
                className="group relative w-16 h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-3xl transition-all hover:scale-110 hover:shadow-lg border-2 border-transparent hover:border-purple-300"
              >
                {sample.emoji}
                <div className="absolute inset-0 flex items-center justify-center bg-purple-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-6 h-6" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">✅</div>
            <p>{isZh ? '此类别已完成收集' : 'このカテゴリは完了'}</p>
          </div>
        )}
      </div>

      {/* Collected samples display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-4 shadow border-2"
            style={{ borderColor: hasEnoughSamples(cat.id) ? '#10B981' : cat.color }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="font-medium text-gray-700">
                  {isZh ? cat.name.zh : cat.name.ja}
                </span>
              </div>
              <span className={`
                text-xs font-bold px-2 py-1 rounded-full
                ${hasEnoughSamples(cat.id)
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {getCategoryData(cat.id).length}/{minSamplesPerCategory}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[60px]">
              {getCategoryData(cat.id).map(sample => (
                <div
                  key={sample.id}
                  className="group relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl"
                >
                  {sample.emoji}
                  <button
                    onClick={() => onRemoveSample(sample.id, cat.id)}
                    className="absolute inset-0 flex items-center justify-center bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {getCategoryData(cat.id).length === 0 && (
                <div className="w-full text-center text-gray-400 text-sm py-4">
                  {isZh ? '还没有数据' : 'データなし'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

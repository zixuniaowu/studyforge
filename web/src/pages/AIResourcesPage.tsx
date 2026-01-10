import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Code2,
  Brain,
  Globe,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { allCategoriesZh, type ResourceItem } from '../data/aiResourcesData';
import { allCategoriesJa } from '../data/aiResourcesDataJa';

// Icon mapping
const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'frameworks': Code2,
  'llm-tools': Brain,
  'platforms': Globe,
  'learning': BookOpen
};

export const AIResourcesPage: React.FC = () => {
  const language = useLanguageStore(state => state.language);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['frameworks']));
  const [selectedItem, setSelectedItem] = useState<{ categoryIndex: number; itemIndex: number }>({ categoryIndex: 0, itemIndex: 0 });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = language === 'ja' ? allCategoriesJa : allCategoriesZh;
  const currentCategory = categories[selectedItem.categoryIndex];
  const currentItem = currentCategory.items[selectedItem.itemIndex];

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, Record<string, string>> = {
      beginner: { zh: '入门', ja: '入門' },
      intermediate: { zh: '中级', ja: '中級' },
      advanced: { zh: '进阶', ja: '上級' }
    };
    return labels[difficulty]?.[language === 'ja' ? 'ja' : 'zh'] || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-amber-100 text-amber-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-slate-100 text-slate-700';
  };

  // Calculate progress
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const currentGlobalIndex = categories.slice(0, selectedItem.categoryIndex).reduce((sum, cat) => sum + cat.items.length, 0) + selectedItem.itemIndex + 1;
  const progress = Math.round((currentGlobalIndex / totalItems) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Home size={20} />
              <span className="text-base font-medium hidden sm:inline">
                {language === 'ja' ? 'ホーム' : '首页'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-rose-600" />
            <span className="font-serif text-lg text-slate-800 hidden sm:inline">
              {language === 'ja' ? 'AIリソースまとめ' : 'AI 资源汇总'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-slate-500">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-14 left-0 h-[calc(100vh-56px)] bg-white border-r border-slate-200 transition-all duration-300 z-40 overflow-hidden ${
            sidebarOpen ? 'w-80' : 'w-0 lg:w-80'
          }`}
        >
          <div className="w-80 h-full overflow-y-auto">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-serif text-2xl font-semibold text-slate-800">
                {language === 'ja' ? 'AIリソース' : 'AI 资源'}
              </h2>
              <p className="text-base text-slate-500 mt-1">
                {language === 'ja' ? 'フレームワーク・ツール・プラットフォーム' : '框架、工具、平台详解'}
              </p>
            </div>

            <nav className="p-2">
              {categories.map((category, catIndex) => {
                const Icon = iconMap[category.id] || Code2;
                const isExpanded = expandedCategories.has(category.id);
                const hasSelectedItem = selectedItem.categoryIndex === catIndex;

                return (
                  <div key={category.id} className="mb-1">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight size={16} className="text-slate-400" />
                      </span>
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${category.gradient}`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-600 font-medium text-sm">
                            {category.title}
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">{category.items.length} {language === 'ja' ? '件' : '个资源'}</span>
                      </div>
                    </button>

                    {/* Items */}
                    {isExpanded && (
                      <div className="ml-4 border-l-2 border-slate-100 pl-2">
                        {category.items.map((item, itemIndex) => {
                          const isActive = hasSelectedItem && selectedItem.itemIndex === itemIndex;

                          return (
                            <button
                              key={item.name}
                              onClick={() => {
                                setSelectedItem({ categoryIndex: catIndex, itemIndex });
                                if (window.innerWidth < 1024) setSidebarOpen(false);
                              }}
                              className={`w-full text-left p-2 rounded-lg transition-colors text-base ${
                                isActive
                                  ? 'bg-rose-50 text-rose-800 font-medium'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  isActive ? 'bg-rose-500' : 'bg-slate-300'
                                }`} />
                                <span className="truncate">{item.name}</span>
                                <span className={`ml-auto px-1.5 py-0.5 rounded text-xs ${getDifficultyColor(item.difficulty)}`}>
                                  {getDifficultyLabel(item.difficulty)}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="w-full px-6 sm:px-10 lg:px-16 py-8">
            <ResourceDetailView
              item={currentItem}
              category={currentCategory}
              language={language}
              getDifficultyLabel={getDifficultyLabel}
              getDifficultyColor={getDifficultyColor}
              copyToClipboard={copyToClipboard}
              copiedCode={copiedCode}
            />

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  if (selectedItem.itemIndex > 0) {
                    setSelectedItem({ ...selectedItem, itemIndex: selectedItem.itemIndex - 1 });
                  } else if (selectedItem.categoryIndex > 0) {
                    const prevCat = categories[selectedItem.categoryIndex - 1];
                    setSelectedItem({ categoryIndex: selectedItem.categoryIndex - 1, itemIndex: prevCat.items.length - 1 });
                    setExpandedCategories(new Set([...expandedCategories, prevCat.id]));
                  }
                }}
                disabled={selectedItem.categoryIndex === 0 && selectedItem.itemIndex === 0}
                className={`flex-1 max-w-xs text-left p-4 rounded-xl border transition-colors ${
                  selectedItem.categoryIndex === 0 && selectedItem.itemIndex === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center gap-2 text-sm mb-1">
                  <ChevronRight size={16} className="rotate-180" />
                  <span>{language === 'ja' ? '前へ' : '上一个'}</span>
                </div>
                {(selectedItem.categoryIndex > 0 || selectedItem.itemIndex > 0) && (
                  <div className="text-slate-800 font-medium truncate">
                    {selectedItem.itemIndex > 0
                      ? currentCategory.items[selectedItem.itemIndex - 1].name
                      : categories[selectedItem.categoryIndex - 1]?.items.slice(-1)[0]?.name}
                  </div>
                )}
              </button>

              <button
                onClick={() => {
                  if (selectedItem.itemIndex < currentCategory.items.length - 1) {
                    setSelectedItem({ ...selectedItem, itemIndex: selectedItem.itemIndex + 1 });
                  } else if (selectedItem.categoryIndex < categories.length - 1) {
                    const nextCat = categories[selectedItem.categoryIndex + 1];
                    setSelectedItem({ categoryIndex: selectedItem.categoryIndex + 1, itemIndex: 0 });
                    setExpandedCategories(new Set([...expandedCategories, nextCat.id]));
                  }
                }}
                disabled={selectedItem.categoryIndex === categories.length - 1 && selectedItem.itemIndex === currentCategory.items.length - 1}
                className={`flex-1 max-w-xs text-right p-4 rounded-xl border transition-colors ${
                  selectedItem.categoryIndex === categories.length - 1 && selectedItem.itemIndex === currentCategory.items.length - 1
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center justify-end gap-2 text-sm mb-1">
                  <span>{language === 'ja' ? '次へ' : '下一个'}</span>
                  <ChevronRight size={16} />
                </div>
                {(selectedItem.categoryIndex < categories.length - 1 || selectedItem.itemIndex < currentCategory.items.length - 1) && (
                  <div className="text-slate-800 font-medium truncate">
                    {selectedItem.itemIndex < currentCategory.items.length - 1
                      ? currentCategory.items[selectedItem.itemIndex + 1].name
                      : categories[selectedItem.categoryIndex + 1]?.items[0]?.name}
                  </div>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Resource Detail View Component
interface ResourceDetailViewProps {
  item: ResourceItem;
  category: { title: string; gradient: string; id: string };
  language: string;
  getDifficultyLabel: (d: string) => string;
  getDifficultyColor: (d: string) => string;
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

const ResourceDetailView: React.FC<ResourceDetailViewProps> = ({
  item,
  category,
  language,
  getDifficultyLabel,
  getDifficultyColor,
  copyToClipboard,
  copiedCode
}) => {
  const CategoryIcon = iconMap[category.id] || Code2;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-rose-600 text-sm font-medium mb-4">
        <span>{category.title}</span>
        <ChevronRight size={14} />
        <span>{item.name}</span>
      </div>

      {/* Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${category.gradient}`}>
          <CategoryIcon size={32} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              {item.name}
            </h1>
            <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(item.difficulty)}`}>
              {getDifficultyLabel(item.difficulty)}
            </span>
          </div>
          <p className="text-lg text-slate-600">{item.tagline}</p>
          <div className="flex items-center gap-4 mt-3">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} />
              {language === 'ja' ? '公式サイトを開く' : '访问官网'}
            </a>
            <span className="text-slate-500">{item.pricing}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <p className="text-slate-700 leading-relaxed text-lg">{item.description}</p>
      </div>

      {/* Features & Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-500" />
            {language === 'ja' ? '主な機能' : '主要功能'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.features.map((f, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">{f}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            {language === 'ja' ? '使用シーン' : '使用场景'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.useCases.map((u, i) => (
              <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm">{u}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <h3 className="font-semibold text-green-800 mb-4">
            {language === 'ja' ? '✓ メリット' : '✓ 优点'}
          </h3>
          <ul className="space-y-2">
            {item.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-green-700">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-1" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h3 className="font-semibold text-amber-800 mb-4">
            {language === 'ja' ? '⚠ 注意点' : '⚠ 注意事项'}
          </h3>
          <ul className="space-y-2">
            {item.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-amber-700">
                <span className="flex-shrink-0">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
          {language === 'ja' ? '📚 使い方ガイド' : '📚 使用教程'}
        </h2>
        <div className="space-y-8">
          {item.tutorial.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg text-slate-800 mb-2">{step.title}</h4>
                  <p className="text-slate-600 mb-4">{step.content}</p>
                  {step.code && (
                    <CodeBlock
                      code={step.code}
                      id={`tutorial-${i}`}
                      copyToClipboard={copyToClipboard}
                      copiedCode={copiedCode}
                    />
                  )}
                </div>
              </div>
              {i < item.tutorial.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-px bg-rose-100" style={{ height: 'calc(100% - 48px)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
          {language === 'ja' ? '💻 コード例' : '💻 代码示例'}
        </h2>
        <div className="space-y-6">
          {item.codeExamples.map((example, i) => (
            <div key={i}>
              <h4 className="font-semibold text-slate-800 mb-1">{example.title}</h4>
              <p className="text-slate-500 text-sm mb-3">{example.description}</p>
              <CodeBlock
                code={example.code}
                id={`example-${i}`}
                copyToClipboard={copyToClipboard}
                copiedCode={copiedCode}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 mb-8">
        <h2 className="font-serif text-2xl font-bold text-amber-800 mb-6">
          {language === 'ja' ? '💡 実用ヒント' : '💡 实用技巧'}
        </h2>
        <div className="space-y-3">
          {item.tips.map((tip, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white rounded-lg">
              <Lightbulb size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">
          {language === 'ja' ? '🔗 参考リソース' : '🔗 参考资源'}
        </h2>
        <div className="flex flex-wrap gap-3">
          {item.resources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              {res.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Code Block Component
interface CodeBlockProps {
  code: string;
  id: string;
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, id, copyToClipboard, copiedCode }) => (
  <div className="relative group">
    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
      <code>{code}</code>
    </pre>
    <button
      onClick={() => copyToClipboard(code, id)}
      className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copiedCode === id ? <Check size={16} /> : <Copy size={16} />}
    </button>
  </div>
);

export default AIResourcesPage;

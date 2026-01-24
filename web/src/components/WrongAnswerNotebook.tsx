/**
 * 間違いノート (Wrong Answer Notebook) Component
 * 错题本功能 - 记录、分析、复习错题
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Target,
  Clock,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Filter,
  SortAsc,
  ChevronRight,
  Trash2,
  Brain,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
} from 'lucide-react';
import type {
  WrongQuestionRecord,
  MistakeType,
  WrongAnswerStats,
  DifficultyLevel,
} from '../types/middleSchool';
import { useAchievementStore } from '../stores/achievementStore';

interface WrongAnswerNotebookProps {
  wrongRecords: WrongQuestionRecord[];
  onClose: () => void;
  onReviewQuestion: (questionId: number) => void;
  onMarkMastered: (recordId: string) => void;
  onDeleteRecord: (recordId: string) => void;
  onUpdateMistakeType: (recordId: string, type: MistakeType) => void;
}

type ViewMode = 'list' | 'stats' | 'review';
type SortOption = 'recent' | 'wrongCount' | 'difficulty' | 'domain';
type FilterOption = 'all' | 'pending' | 'mastered' | MistakeType;

// 错误类型配置
const MISTAKE_TYPE_CONFIG: Record<MistakeType, { label: string; color: string; icon: React.ReactNode }> = {
  calculation: {
    label: '計算ミス',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    icon: <Zap size={16} />,
  },
  concept: {
    label: '概念理解',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: <Brain size={16} />,
  },
  careless: {
    label: 'ケアレスミス',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <AlertTriangle size={16} />,
  },
  method: {
    label: '解法ミス',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: <Target size={16} />,
  },
  unknown: {
    label: '未分類',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: <BookOpen size={16} />,
  },
};

export const WrongAnswerNotebook: React.FC<WrongAnswerNotebookProps> = ({
  wrongRecords,
  onClose,
  onReviewQuestion,
  onMarkMastered,
  onDeleteRecord,
  onUpdateMistakeType,
}) => {
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<WrongQuestionRecord | null>(null);
  const [_reviewMode, setReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Achievement store
  const { incrementStat } = useAchievementStore();

  // Calculate stats
  const stats = useMemo<WrongAnswerStats>(() => {
    const byMistakeType: Record<MistakeType, number> = {
      calculation: 0,
      concept: 0,
      careless: 0,
      method: 0,
      unknown: 0,
    };
    const byDomain: Record<string, number> = {};
    const byDifficulty: Record<DifficultyLevel, number> = { A: 0, B: 0, C: 0 };

    let masteredCount = 0;
    let pendingReview = 0;
    const now = new Date();

    wrongRecords.forEach(record => {
      byMistakeType[record.mistakeType]++;
      byDomain[record.questionData.domain] = (byDomain[record.questionData.domain] || 0) + 1;
      byDifficulty[record.questionData.difficulty]++;

      if (record.mastered) {
        masteredCount++;
      } else if (new Date(record.nextReviewAt) <= now) {
        pendingReview++;
      }
    });

    return {
      totalWrong: wrongRecords.length,
      byMistakeType,
      byDomain,
      byDifficulty,
      pendingReview,
      masteredCount,
    };
  }, [wrongRecords]);

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    let result = [...wrongRecords];

    // Apply filter
    if (filterBy !== 'all') {
      if (filterBy === 'pending') {
        result = result.filter(r => !r.mastered);
      } else if (filterBy === 'mastered') {
        result = result.filter(r => r.mastered);
      } else {
        result = result.filter(r => r.mistakeType === filterBy);
      }
    }

    // Apply sort
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.lastWrongAt).getTime() - new Date(a.lastWrongAt).getTime());
        break;
      case 'wrongCount':
        result.sort((a, b) => b.wrongCount - a.wrongCount);
        break;
      case 'difficulty':
        const diffOrder = { C: 0, B: 1, A: 2 };
        result.sort((a, b) => diffOrder[a.questionData.difficulty] - diffOrder[b.questionData.difficulty]);
        break;
      case 'domain':
        result.sort((a, b) => a.questionData.domain.localeCompare(b.questionData.domain));
        break;
    }

    return result;
  }, [wrongRecords, filterBy, sortBy]);

  // Get records for review (pending review based on spaced repetition)
  const reviewQueue = useMemo(() => {
    const now = new Date();
    return wrongRecords
      .filter(r => !r.mastered && new Date(r.nextReviewAt) <= now)
      .sort((a, b) => a.reviewCount - b.reviewCount);
  }, [wrongRecords]);

  // Handle marking as mastered
  const handleMarkMastered = (recordId: string) => {
    onMarkMastered(recordId);
    incrementStat('wrongMastered', 1);
  };

  // Start review session
  const startReview = () => {
    if (reviewQueue.length === 0) return;
    setReviewMode(true);
    setCurrentReviewIndex(0);
    setShowAnswer(false);
    setViewMode('review');
  };

  // Render stats view
  const renderStats = () => (
    <div className="p-4 space-y-4">
      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <XCircle size={18} />
            <span className="text-sm">総間違い数</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalWrong}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle2 size={18} />
            <span className="text-sm">克服済み</span>
          </div>
          <p className="text-2xl font-bold">{stats.masteredCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Clock size={18} />
            <span className="text-sm">復習待ち</span>
          </div>
          <p className="text-2xl font-bold">{stats.pendingReview}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <TrendingUp size={18} />
            <span className="text-sm">克服率</span>
          </div>
          <p className="text-2xl font-bold">
            {stats.totalWrong > 0 ? Math.round((stats.masteredCount / stats.totalWrong) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* By mistake type */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" />
          ミスの種類別
        </h3>
        <div className="space-y-2">
          {Object.entries(stats.byMistakeType).map(([type, count]) => {
            const config = MISTAKE_TYPE_CONFIG[type as MistakeType];
            const percentage = stats.totalWrong > 0 ? (count / stats.totalWrong) * 100 : 0;
            return (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    {config.icon}
                    {config.label}
                  </span>
                  <span>{count}問 ({Math.round(percentage)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-orange-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* By domain */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <BarChart3 size={18} className="text-indigo-500" />
          分野別
        </h3>
        <div className="space-y-2">
          {Object.entries(stats.byDomain)
            .sort(([, a], [, b]) => b - a)
            .map(([domain, count]) => {
              const percentage = stats.totalWrong > 0 ? (count / stats.totalWrong) * 100 : 0;
              return (
                <div key={domain}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{domain}</span>
                    <span>{count}問 ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* By difficulty */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Target size={18} className="text-purple-500" />
          難易度別
        </h3>
        <div className="flex gap-3">
          {(['A', 'B', 'C'] as DifficultyLevel[]).map(level => {
            const count = stats.byDifficulty[level];
            const colors = {
              A: 'bg-green-100 text-green-700',
              B: 'bg-blue-100 text-blue-700',
              C: 'bg-purple-100 text-purple-700',
            };
            const labels = { A: '基礎', B: '標準', C: '発展' };
            return (
              <div key={level} className={`flex-1 rounded-xl p-3 text-center ${colors[level]}`}>
                <p className="text-xs mb-1">{labels[level]}</p>
                <p className="text-xl font-bold">{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start review button */}
      {reviewQueue.length > 0 && (
        <button
          onClick={startReview}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <RefreshCw size={20} />
          {reviewQueue.length}問を復習する
        </button>
      )}
    </div>
  );

  // Render list view
  const renderList = () => (
    <div className="p-4">
      {/* Filter and sort controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
            showFilters ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Filter size={16} />
          フィルター
        </button>
        <div className="flex items-center gap-2">
          <SortAsc size={16} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border rounded-lg px-2 py-1"
          >
            <option value="recent">最近の間違い</option>
            <option value="wrongCount">間違い回数</option>
            <option value="difficulty">難易度</option>
            <option value="domain">分野</option>
          </select>
        </div>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex flex-wrap gap-2">
          {[
            { value: 'all', label: '全て' },
            { value: 'pending', label: '未克服' },
            { value: 'mastered', label: '克服済み' },
            ...Object.entries(MISTAKE_TYPE_CONFIG).map(([key, config]) => ({
              value: key,
              label: config.label,
            })),
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilterBy(option.value as FilterOption)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterBy === option.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Record list */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="mx-auto mb-3 text-gray-300" size={48} />
            <p>該当する問題がありません</p>
          </div>
        ) : (
          filteredRecords.map(record => {
            const mistakeConfig = MISTAKE_TYPE_CONFIG[record.mistakeType];
            const q = record.questionData;

            return (
              <div
                key={record.id}
                className={`bg-white rounded-xl p-4 shadow-sm border ${
                  record.mastered ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    record.mastered ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {record.mastered ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {q.domain}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs border ${mistakeConfig.color}`}>
                        {mistakeConfig.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        q.difficulty === 'A' ? 'bg-green-100 text-green-700' :
                        q.difficulty === 'B' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {q.difficulty === 'A' ? '基礎' : q.difficulty === 'B' ? '標準' : '発展'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                      {q.question}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <RefreshCw size={12} />
                        {record.wrongCount}回間違い
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(record.lastWrongAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Quick actions */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => onReviewQuestion(q.id)}
                    className="flex-1 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
                  >
                    再挑戦
                  </button>
                  {!record.mastered && (
                    <button
                      onClick={() => handleMarkMastered(record.id)}
                      className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                    >
                      克服済み
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // Render review mode
  const renderReview = () => {
    if (reviewQueue.length === 0 || currentReviewIndex >= reviewQueue.length) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">復習完了！</h3>
          <p className="text-gray-500 mb-6">すべての問題を復習しました</p>
          <button
            onClick={() => setViewMode('list')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium"
          >
            リストに戻る
          </button>
        </div>
      );
    }

    const currentRecord = reviewQueue[currentReviewIndex];
    const q = currentRecord.questionData;

    return (
      <div className="flex-1 flex flex-col p-4">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>復習進捗</span>
            <span>{currentReviewIndex + 1} / {reviewQueue.length}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-orange-500"
              style={{ width: `${((currentReviewIndex + 1) / reviewQueue.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs">
              {q.domain}
            </span>
            <span className="text-xs text-gray-500">
              {currentRecord.wrongCount}回間違い
            </span>
          </div>
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            {q.question}
          </p>

          {!showAnswer ? (
            <div className="space-y-3">
              {Object.entries(q.options).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="font-medium mr-2">{key}.</span>
                  {value}
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Show answer with explanation */}
              <div className="space-y-3 mb-4">
                {Object.entries(q.options).map(([key, value]) => {
                  const isCorrect = key === q.answer;
                  const isUserWrong = key === currentRecord.userAnswer;
                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border ${
                        isCorrect ? 'bg-green-50 border-green-300' :
                        isUserWrong ? 'bg-red-50 border-red-300' :
                        'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{key}.</span>
                        <span className="flex-1">{value}</span>
                        {isCorrect && <CheckCircle2 size={18} className="text-green-600" />}
                        {isUserWrong && !isCorrect && <XCircle size={18} className="text-red-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                  <Lightbulb size={18} />
                  解説
                </h4>
                <p className="text-amber-900">{q.explanation}</p>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold"
            >
              答えを見る
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowAnswer(false);
                  setCurrentReviewIndex(prev => prev + 1);
                }}
                className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                まだ覚えてない
              </button>
              <button
                onClick={() => {
                  handleMarkMastered(currentRecord.id);
                  setShowAnswer(false);
                  setCurrentReviewIndex(prev => prev + 1);
                }}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium"
              >
                覚えた！
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // Render detail modal
  const renderDetailModal = () => {
    if (!selectedRecord) return null;

    const q = selectedRecord.questionData;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold">問題詳細</h3>
            <button
              onClick={() => setSelectedRecord(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            {/* Question */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs">
                  {q.domain}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  q.difficulty === 'A' ? 'bg-green-100 text-green-700' :
                  q.difficulty === 'B' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {q.difficulty === 'A' ? '基礎' : q.difficulty === 'B' ? '標準' : '発展'}
                </span>
              </div>
              <p className="text-gray-800">{q.question}</p>
            </div>

            {/* Options with correct/wrong */}
            <div className="space-y-2 mb-4">
              {Object.entries(q.options).map(([key, value]) => {
                const isCorrect = key === q.answer;
                const isUserAnswer = key === selectedRecord.userAnswer;
                return (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-300' :
                      isUserAnswer ? 'bg-red-50 border-red-300' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{key}.</span>
                      <span className="flex-1">{value}</span>
                      {isCorrect && <CheckCircle2 size={16} className="text-green-600" />}
                      {isUserAnswer && !isCorrect && <XCircle size={16} className="text-red-600" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <h4 className="font-medium text-amber-800 mb-2">解説</h4>
              <p className="text-amber-900 text-sm">{q.explanation}</p>
              {q.detailedSteps && (
                <div className="mt-2 space-y-1">
                  {q.detailedSteps.map((step, i) => (
                    <p key={i} className="text-xs text-amber-800">{step}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Mistake type selector */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">ミスの種類を変更</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(MISTAKE_TYPE_CONFIG).map(([type, config]) => (
                  <button
                    key={type}
                    onClick={() => onUpdateMistakeType(selectedRecord.id, type as MistakeType)}
                    className={`px-3 py-1.5 rounded-lg text-sm border flex items-center gap-1 ${
                      selectedRecord.mistakeType === type
                        ? config.color
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {config.icon}
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-gray-500">間違い回数</p>
                  <p className="font-bold text-red-600">{selectedRecord.wrongCount}</p>
                </div>
                <div>
                  <p className="text-gray-500">復習回数</p>
                  <p className="font-bold text-blue-600">{selectedRecord.reviewCount}</p>
                </div>
                <div>
                  <p className="text-gray-500">最後の間違い</p>
                  <p className="font-bold text-gray-800">
                    {new Date(selectedRecord.lastWrongAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onReviewQuestion(q.id);
                  setSelectedRecord(null);
                }}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium"
              >
                再挑戦
              </button>
              {!selectedRecord.mastered ? (
                <button
                  onClick={() => {
                    handleMarkMastered(selectedRecord.id);
                    setSelectedRecord(null);
                  }}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium"
                >
                  克服済みにする
                </button>
              ) : (
                <button
                  onClick={() => {
                    onDeleteRecord(selectedRecord.id);
                    setSelectedRecord(null);
                  }}
                  className="flex-1 py-3 bg-red-100 text-red-700 rounded-xl font-medium flex items-center justify-center gap-1"
                >
                  <Trash2 size={16} />
                  削除
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
              <ArrowLeft size={24} />
            </button>
            <BookOpen size={24} />
            <h1 className="text-xl font-bold">間違いノート</h1>
          </div>
          <p className="text-white/80 text-sm">
            {stats.totalWrong}問中 {stats.masteredCount}問克服済み
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex">
          {[
            { id: 'list', label: '一覧', icon: BookOpen },
            { id: 'stats', label: '分析', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as ViewMode)}
              className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium ${
                viewMode === tab.id
                  ? 'bg-white/20 border-b-2 border-white'
                  : 'hover:bg-white/10'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' && renderList()}
      {viewMode === 'stats' && renderStats()}
      {viewMode === 'review' && renderReview()}

      {/* Detail modal */}
      {renderDetailModal()}
    </div>
  );
};

export default WrongAnswerNotebook;

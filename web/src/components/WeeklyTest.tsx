/**
 * 週テスト (Weekly Test) Component
 * 日能研/四谷大塚スタイルの定期テスト機能
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Clock,
  Target,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Play,
  Pause,
  Award,
  Users,
  BarChart3,
} from 'lucide-react';
import type { EnhancedQuestion, WeeklyTestResult } from '../types/middleSchool';
import { usePointStore, getEncouragementMessage } from '../stores/pointStore';
import { useAchievementStore } from '../stores/achievementStore';

interface WeeklyTestProps {
  questions: EnhancedQuestion[];
  testConfig: {
    duration: number;           // minutes
    questionCount: number;
    title: string;
    weekNumber: number;
  };
  previousResult?: WeeklyTestResult;
  onClose: () => void;
  onComplete: (result: WeeklyTestResult) => void;
}

type TestPhase = 'intro' | 'testing' | 'review' | 'results';

export const WeeklyTest: React.FC<WeeklyTestProps> = ({
  questions,
  testConfig,
  previousResult,
  onClose,
  onComplete,
}) => {
  // State
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(testConfig.duration * 60); // seconds
  const [isPaused, setIsPaused] = useState(false);
  const [_startTime, setStartTime] = useState<number>(0);
  const [result, setResult] = useState<WeeklyTestResult | null>(null);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState('');

  // Stores
  const { addPoints } = usePointStore();
  const { incrementStat, updateStats } = useAchievementStore();

  // Timer effect
  useEffect(() => {
    if (phase !== 'testing' || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isPaused]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get time color based on remaining time
  const getTimeColor = () => {
    const percentage = (timeLeft / (testConfig.duration * 60)) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Start test
  const handleStart = () => {
    setPhase('testing');
    setStartTime(Date.now());
    setEncouragementMessage(getEncouragementMessage('login'));
    setShowEncouragement(true);
    setTimeout(() => setShowEncouragement(false), 3000);
  };

  // Select answer
  const handleSelectAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Navigate questions
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  // Submit test
  const handleSubmit = useCallback(() => {
    const timeSpent = Math.round((testConfig.duration * 60 - timeLeft) / 60);

    // Calculate score
    let correctCount = 0;
    const byDomain: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      const domain = q.domain;
      if (!byDomain[domain]) {
        byDomain[domain] = { correct: 0, total: 0 };
      }
      byDomain[domain].total++;

      if (answers[q.id] === q.answer) {
        correctCount++;
        byDomain[domain].correct++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // Calculate improvement
    const improvement = previousResult
      ? percentage - previousResult.percentage
      : 0;

    // Generate simulated rank (for gamification)
    const simulatedRank = Math.max(1, Math.round((100 - percentage) / 10) + Math.floor(Math.random() * 5));

    const testResult: WeeklyTestResult = {
      id: `weekly-${testConfig.weekNumber}-${Date.now()}`,
      weekNumber: testConfig.weekNumber,
      date: new Date().toISOString(),
      score: correctCount,
      maxScore: questions.length,
      percentage,
      rank: simulatedRank,
      totalParticipants: 100,
      timeSpent,
      byDomain: Object.entries(byDomain).map(([domain, data]) => ({
        domain,
        correct: data.correct,
        total: data.total,
        accuracy: Math.round((data.correct / data.total) * 100),
      })),
      improvement,
    };

    setResult(testResult);
    setPhase('results');

    // Add points
    const bonusPoints = Math.round(percentage / 2);
    addPoints('weekly_test', 1 + bonusPoints / 100, `週テスト${testConfig.weekNumber}完了！`);

    // Update stats
    incrementStat('questionsAnswered', questions.length);
    incrementStat('questionsCorrect', correctCount);

    if (percentage >= 90) {
      updateStats('weeklyTestBestScore', percentage);
    }

    // Notify parent
    onComplete(testResult);

    // Show encouragement
    if (percentage >= 90) {
      setEncouragementMessage(getEncouragementMessage('improvement'));
    } else if (percentage >= 70) {
      setEncouragementMessage(getEncouragementMessage('lesson_complete'));
    } else {
      setEncouragementMessage(getEncouragementMessage('struggling'));
    }
    setShowEncouragement(true);
    setTimeout(() => setShowEncouragement(false), 4000);
  }, [timeLeft, questions, answers, testConfig, previousResult, addPoints, incrementStat, updateStats, onComplete]);

  // Render intro phase
  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">週テスト</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
            <Trophy size={40} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            第{testConfig.weekNumber}週 週テスト
          </h2>
          <p className="text-gray-500 mb-6">{testConfig.title}</p>

          {/* Test info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-indigo-600 mb-1">
                <Target size={18} />
                <span className="text-sm font-medium">問題数</span>
              </div>
              <p className="text-2xl font-bold">{testConfig.questionCount}問</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-indigo-600 mb-1">
                <Clock size={18} />
                <span className="text-sm font-medium">制限時間</span>
              </div>
              <p className="text-2xl font-bold">{testConfig.duration}分</p>
            </div>
          </div>

          {/* Previous result */}
          {previousResult && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-600 mb-1">前回の結果</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-xl font-bold text-blue-800">
                  {previousResult.percentage}%
                </span>
                <span className="text-gray-500">
                  ({previousResult.score}/{previousResult.maxScore})
                </span>
              </div>
            </div>
          )}

          {/* Rules */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="font-medium text-amber-800 mb-2 flex items-center gap-2">
              <AlertCircle size={18} />
              注意事項
            </p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>・制限時間内に全問回答してください</li>
              <li>・途中で一時停止できます</li>
              <li>・時間切れで自動提出されます</li>
              <li>・回答は後から変更できます</li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Play size={24} />
            テスト開始
          </button>
        </div>
      </div>
    </div>
  );

  // Render testing phase
  const renderTesting = () => {
    const currentQuestion = questions[currentIndex];
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header with timer */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  問{currentIndex + 1}/{questions.length}
                </span>
              </div>
              <div className={`flex items-center gap-2 font-mono text-lg font-bold ${getTimeColor()}`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question navigator */}
          <div className="px-4 py-2 flex gap-1 overflow-x-auto">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(i)}
                className={`w-8 h-8 rounded-lg text-xs font-medium flex-shrink-0 transition-colors ${
                  i === currentIndex
                    ? 'bg-indigo-600 text-white'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Pause overlay */}
        {isPaused && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <Pause className="mx-auto text-indigo-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">一時停止中</h3>
              <p className="text-gray-500 mb-6">準備ができたら続けましょう</p>
              <button
                onClick={() => setIsPaused(false)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold"
              >
                続ける
              </button>
            </div>
          </div>
        )}

        {/* Question content */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                {currentQuestion.domain}
              </span>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                currentQuestion.difficulty === 'A' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'B' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentQuestion.difficulty === 'A' ? '基礎' :
                 currentQuestion.difficulty === 'B' ? '標準' : '発展'}
              </span>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isSelected = answers[currentQuestion.id] === key;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectAnswer(currentQuestion.id, key)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {key}
                    </span>
                    <span className="flex-1">{value}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium disabled:opacity-50"
            >
              前の問題
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => goToQuestion(currentIndex + 1)}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium"
              >
                次の問題
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium"
              >
                提出する
              </button>
            )}
          </div>

          {/* Submit button at bottom */}
          {answeredCount === questions.length && (
            <button
              onClick={handleSubmit}
              className="w-full mt-4 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg"
            >
              全問回答完了 - 提出する
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render results phase
  const renderResults = () => {
    if (!result) return null;

    const grade =
      result.percentage >= 90 ? 'S' :
      result.percentage >= 80 ? 'A' :
      result.percentage >= 70 ? 'B' :
      result.percentage >= 60 ? 'C' : 'D';

    const gradeColors: Record<string, string> = {
      S: 'from-yellow-400 to-amber-500',
      A: 'from-green-400 to-emerald-500',
      B: 'from-blue-400 to-indigo-500',
      C: 'from-orange-400 to-amber-500',
      D: 'from-red-400 to-pink-500',
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
          <h1 className="text-xl font-bold text-center">週テスト結果</h1>
        </div>

        <div className="p-6">
          {/* Grade card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl mb-6 text-center">
            <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${gradeColors[grade]} flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg`}>
              {grade}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {result.percentage}%
            </h2>
            <p className="text-gray-500">
              {result.score}/{result.maxScore} 正解
            </p>

            {/* Improvement indicator */}
            {result.improvement !== 0 && (
              <div className={`mt-3 flex items-center justify-center gap-1 ${
                result.improvement > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {result.improvement > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="font-medium">
                  前回比 {result.improvement > 0 ? '+' : ''}{result.improvement}%
                </span>
              </div>
            )}
          </div>

          {/* Simulated rank */}
          {result.rank && (
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">模擬順位</p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.rank}位 / {result.totalParticipants}人
                    </p>
                  </div>
                </div>
                <Users className="text-gray-400" size={24} />
              </div>
            </div>
          )}

          {/* Domain breakdown */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
              分野別結果
            </h3>
            <div className="space-y-3">
              {result.byDomain.map(domain => (
                <div key={domain.domain}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{domain.domain}</span>
                    <span className="font-medium">
                      {domain.correct}/{domain.total} ({domain.accuracy}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        domain.accuracy >= 80 ? 'bg-green-500' :
                        domain.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${domain.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time spent */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <Clock className="text-indigo-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">所要時間</p>
                <p className="text-lg font-bold text-gray-800">{result.timeSpent}分</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => setPhase('review')}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              問題を見直す
              <ChevronRight size={20} />
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              終了する
            </button>
          </div>
        </div>

        {/* Encouragement message */}
        {showEncouragement && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            {encouragementMessage}
          </div>
        )}
      </div>
    );
  };

  // Render review phase
  const renderReview = () => {
    const currentQuestion = questions[currentIndex];
    const userAnswer = answers[currentQuestion.id];
    const isCorrect = userAnswer === currentQuestion.answer;

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPhase('results')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={24} />
              </button>
              <span className="font-medium">
                問題{currentIndex + 1}/{questions.length}
              </span>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isCorrect ? '正解' : '不正解'}
              </div>
            </div>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options with correct/wrong indicators */}
          <div className="space-y-3 mb-6">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isUserAnswer = userAnswer === key;
              const isCorrectAnswer = currentQuestion.answer === key;

              let optionClass = 'bg-white border-gray-200';
              if (isCorrectAnswer) {
                optionClass = 'bg-green-50 border-green-500';
              } else if (isUserAnswer && !isCorrectAnswer) {
                optionClass = 'bg-red-50 border-red-500';
              }

              return (
                <div
                  key={key}
                  className={`p-4 rounded-xl border-2 ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isCorrectAnswer ? 'bg-green-500 text-white' :
                      isUserAnswer ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {key}
                    </span>
                    <span className="flex-1">{value}</span>
                    {isCorrectAnswer && <CheckCircle2 className="text-green-500" size={24} />}
                    {isUserAnswer && !isCorrectAnswer && <XCircle className="text-red-500" size={24} />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-amber-800 mb-2">解説</h4>
            <p className="text-amber-900">{currentQuestion.explanation}</p>
            {currentQuestion.detailedSteps && (
              <div className="mt-3 space-y-1">
                {currentQuestion.detailedSteps.map((step, i) => (
                  <p key={i} className="text-sm text-amber-800">{step}</p>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium disabled:opacity-50"
            >
              前の問題
            </button>
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium disabled:opacity-50"
            >
              次の問題
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  switch (phase) {
    case 'intro':
      return renderIntro();
    case 'testing':
      return renderTesting();
    case 'results':
      return renderResults();
    case 'review':
      return renderReview();
    default:
      return renderIntro();
  }
};

export default WeeklyTest;

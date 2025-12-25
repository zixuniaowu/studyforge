import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useExamStore } from '../stores/examStore';
import { useQuizStore, QuizResult } from '../stores/quizStore';
import { QuestionCard } from '../components/Quiz/QuestionCard';
import { Navigation } from '../components/Quiz/Navigation';
import { Timer } from '../components/Quiz/Timer';
import { Loader2, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { useT } from '../stores/languageStore';

export const QuizPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = (searchParams.get('mode') as 'practice' | 'exam') || 'practice';
  const t = useT();

  const { currentExam, questions: examQuestions, loading, selectExam } = useExamStore();
  const {
    questions,
    currentIndex,
    answers,
    showResult,
    startQuiz,
    submitQuiz,
    resetQuiz
  } = useQuizStore();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const prevExamIdRef = useRef<string | null>(null);

  // Reset quiz and load exam when examId changes
  useEffect(() => {
    if (examId && examId !== prevExamIdRef.current) {
      prevExamIdRef.current = examId;
      resetQuiz();
      selectExam(examId);
    }
  }, [examId, selectExam, resetQuiz]);

  // Start quiz when exam is loaded
  useEffect(() => {
    if (currentExam && examQuestions.length > 0 && questions.length === 0) {
      // Shuffle questions for variety
      const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
      startQuiz(mode, currentExam.id, shuffled, mode === 'exam' ? currentExam.examTime : undefined);
    }
  }, [currentExam, examQuestions, mode, questions.length, startQuiz]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetQuiz();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const unanswered = questions.length - Object.keys(answers).length;
    if (unanswered > 0) {
      const confirmed = window.confirm(
        t.quiz.unansweredWarning.replace('{count}', String(unanswered))
      );
      if (!confirmed) return;
    }

    setSubmitting(true);
    try {
      const quizResult = await submitQuiz();
      setResult(quizResult);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (!showResult && Object.keys(answers).length > 0) {
      const confirmed = window.confirm(t.quiz.leaveConfirm);
      if (!confirmed) return;
    }
    resetQuiz();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentExam || examQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t.quiz.examNotFound || '考试未找到'}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.quiz.examNotFoundDesc || '请返回首页重新加载题库'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t.quiz.backToHome || '返回首页'}
          </button>
        </div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="px-6 lg:px-10">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-4xl mx-auto">
            <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
              result.score >= currentExam.passingScore ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <CheckCircle size={48} className={
                result.score >= currentExam.passingScore ? 'text-green-600' : 'text-red-600'
              } />
            </div>

            <h1 className="text-4xl font-bold mb-3">
              {result.score >= currentExam.passingScore ? t.result.congratulations : t.result.keepPracticing}
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              {result.score >= currentExam.passingScore
                ? t.result.passed
                : t.result.needScore.replace('{score}', String(currentExam.passingScore))}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="text-5xl font-bold text-blue-600">{result.score}%</div>
                <div className="text-lg text-gray-600 mt-2">{t.result.score}</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="text-5xl font-bold text-green-600">{result.correctCount}</div>
                <div className="text-lg text-gray-600 mt-2">{t.result.correct}</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <div className="text-5xl font-bold text-red-600">{result.wrongCount}</div>
                <div className="text-lg text-gray-600 mt-2">{t.result.wrong}</div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6">
                <div className="text-5xl font-bold text-gray-600">
                  {Math.floor(result.timeSpent / 60)}:{String(result.timeSpent % 60).padStart(2, '0')}
                </div>
                <div className="text-lg text-gray-600 mt-2">{t.result.time}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-10 py-4 text-lg font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {t.result.backToExams}
              </button>
              <button
                onClick={() => {
                  resetQuiz();
                  const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
                  startQuiz(mode, currentExam.id, shuffled, mode === 'exam' ? currentExam.examTime : undefined);
                  setResult(null);
                }}
                className="px-10 py-4 text-lg font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                {t.result.tryAgain}
              </button>
            </div>
          </div>

          {/* Review wrong answers */}
          {result.wrongAnswers.length > 0 && (
            <div className="mt-10 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t.result.reviewWrong}</h2>
              <div className="space-y-6">
                {questions
                  .filter(q => result.wrongAnswers.some(w => w.questionId === q.id))
                  .map(q => (
                    <QuestionCard key={q.id} question={q} showAnswer />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 lg:px-10 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentExam.name}</h1>
                <p className="text-base text-gray-500">
                  {currentIndex + 1}/{questions.length} ·{' '}
                  <span className={mode === 'exam' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                    {mode === 'exam' ? t.quiz.examMode : t.quiz.practiceMode}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Timer />
              {mode === 'exam' && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-base font-medium rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {t.common.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 lg:px-10 py-6">
        <div className="flex gap-8 h-full">
          {/* Question Area */}
          <div className="flex-1">
            {currentQuestion && (
              <QuestionCard question={currentQuestion} />
            )}

            {/* Mobile Navigation */}
            <div className="mt-6 xl:hidden">
              <Navigation />
            </div>

            {/* Practice mode submit button */}
            {mode === 'practice' && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? t.quiz.submitting : t.quiz.finishPractice}
                </button>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

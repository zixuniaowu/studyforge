import React from 'react';
import { useQuizStore } from '../../stores/quizStore';
import { useT } from '../../stores/languageStore';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    questions,
    currentIndex,
    answers,
    markedQuestions,
    goToQuestion,
    nextQuestion,
    prevQuestion
  } = useQuizStore();
  const t = useT();

  const getQuestionStatus = (questionId: string, index: number): string => {
    const isActive = index === currentIndex;
    const isAnswered = !!answers[questionId];
    const isMarked = markedQuestions.has(questionId);

    if (isActive) {
      return 'bg-blue-600 text-white';
    }
    if (isMarked) {
      return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    }
    if (isAnswered) {
      return 'bg-green-100 text-green-700 border-green-400';
    }
    return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-base text-gray-600 mb-2 font-medium">
          <span>{Object.keys(answers).length}/{questions.length}</span>
          <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-base">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-400" />
          <span>{t.nav.answered}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-400" />
          <span>{t.nav.marked}</span>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-2.5 mb-6 max-h-64 overflow-y-auto">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => goToQuestion(index)}
            className={`relative w-full aspect-square rounded-lg font-semibold text-base transition-all ${getQuestionStatus(q.id, index)}`}
          >
            {index + 1}
            {markedQuestions.has(q.id) && (
              <Flag size={10} className="absolute top-0.5 right-0.5 text-yellow-600" />
            )}
          </button>
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <div className="flex gap-3">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
        >
          <ChevronLeft size={20} />
          {t.common.previous}
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentIndex === questions.length - 1}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
        >
          {t.common.next}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Question } from '../../types';
import { useQuizStore } from '../../stores/quizStore';
import { useT } from '../../stores/languageStore';
import { CheckCircle, XCircle, Flag, Video } from 'lucide-react';
import { VideoGenerator } from '../Video';

interface Props {
  question: Question;
  showAnswer?: boolean;
}

export const QuestionCard: React.FC<Props> = ({ question, showAnswer = false }) => {
  const { answers, answerQuestion, toggleMark, markedQuestions, mode, examId } = useQuizStore();
  const t = useT();
  const [showVideoGenerator, setShowVideoGenerator] = useState(false);
  const userAnswer = answers[question.id];
  const isMarked = markedQuestions.has(question.id);
  const isMultiple = question.answerType === 'multiple';

  const isCorrect = (): boolean => {
    if (!userAnswer) return false;
    if (Array.isArray(question.answer)) {
      if (!Array.isArray(userAnswer)) return false;
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...question.answer].sort();
      return sortedUser.length === sortedCorrect.length &&
        sortedUser.every((a, i) => a === sortedCorrect[i]);
    }
    return userAnswer === question.answer;
  };

  const isOptionCorrect = (key: string): boolean => {
    if (Array.isArray(question.answer)) {
      return question.answer.includes(key);
    }
    return key === question.answer;
  };

  const isOptionSelected = (key: string): boolean => {
    if (Array.isArray(userAnswer)) {
      return userAnswer.includes(key);
    }
    return userAnswer === key;
  };

  const handleOptionClick = (key: string) => {
    if (showAnswer) return;
    if (mode === 'practice' && userAnswer && !isMultiple) return;

    if (isMultiple) {
      const currentAnswers = Array.isArray(userAnswer) ? userAnswer : [];
      if (currentAnswers.includes(key)) {
        answerQuestion(question.id, currentAnswers.filter(a => a !== key));
      } else {
        answerQuestion(question.id, [...currentAnswers, key]);
      }
    } else {
      answerQuestion(question.id, key);
    }
  };

  const getOptionClass = (key: string): string => {
    const base = "p-4 rounded-xl border-2 cursor-pointer transition-all";
    const selected = isOptionSelected(key);
    const correct = isOptionCorrect(key);

    // Practice mode: show answer immediately after answering
    if (mode === 'practice' && userAnswer && !isMultiple) {
      if (correct) {
        return `${base} border-green-400 bg-green-50`;
      }
      if (selected && !correct) {
        return `${base} border-red-400 bg-red-50`;
      }
      return `${base} border-gray-200 bg-gray-50 opacity-60`;
    }

    // Exam mode after submission
    if (showAnswer) {
      if (correct) {
        return `${base} border-green-400 bg-green-50`;
      }
      if (selected && !correct) {
        return `${base} border-red-400 bg-red-50`;
      }
      return `${base} border-gray-200 bg-gray-50`;
    }

    // Selected but not showing answer
    if (selected) {
      return `${base} border-blue-400 bg-blue-50`;
    }

    return `${base} border-gray-200 hover:border-blue-300 hover:bg-blue-50/50`;
  };

  const shouldShowExplanation = mode === 'practice' && userAnswer && !isMultiple;

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      {/* Question Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-base text-gray-500 font-medium">
            Domain {question.domain}
          </span>
          {isMultiple && (
            <span className="text-base px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
              {t.quiz.selectMultiple}
            </span>
          )}
        </div>
        <button
          onClick={() => toggleMark(question.id)}
          className={`p-2.5 rounded-xl transition-colors ${
            isMarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Flag size={24} fill={isMarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Question Text */}
      <div className="text-lg font-medium mb-8 leading-relaxed text-gray-800">
        {question.questionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: question.questionHtml }} />
        ) : (
          question.question
        )}
      </div>

      {/* Options */}
      <div className="space-y-4">
        {Object.entries(question.options).map(([key, value]) => (
          <div
            key={key}
            onClick={() => handleOptionClick(key)}
            className={getOptionClass(key)}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-semibold flex-shrink-0 ${
                isOptionSelected(key) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {key}
              </span>
              <span className="flex-1 text-base">{value}</span>
              {(showAnswer || shouldShowExplanation) && isOptionCorrect(key) && (
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
              )}
              {(showAnswer || shouldShowExplanation) && isOptionSelected(key) && !isOptionCorrect(key) && (
                <XCircle className="text-red-500 flex-shrink-0" size={24} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Explanation (Practice mode) */}
      {shouldShowExplanation && (
        <div className={`mt-6 p-5 rounded-xl ${isCorrect() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            {isCorrect() ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <XCircle className="text-red-500" size={24} />
            )}
            <span className="text-lg font-semibold">
              {isCorrect() ? t.result.correct : `${t.quiz.correctAnswer}: ${
                Array.isArray(question.answer) ? question.answer.join(', ') : question.answer
              }`}
            </span>
          </div>
          <p className="text-base text-gray-500 mb-2 font-medium">{t.quiz.explanation}:</p>
          <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {question.explanationHtml ? (
              <div dangerouslySetInnerHTML={{ __html: question.explanationHtml }} />
            ) : (
              question.explanation
            )}
          </div>
        </div>
      )}

      {/* Explanation (Exam mode after submission) */}
      {showAnswer && (
        <div className={`mt-6 p-5 rounded-xl ${isCorrect() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            {isCorrect() ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <XCircle className="text-red-500" size={24} />
            )}
            <span className="text-lg font-semibold">
              {isCorrect() ? t.result.correct : `${t.quiz.correctAnswer}: ${
                Array.isArray(question.answer) ? question.answer.join(', ') : question.answer
              }`}
            </span>
          </div>
          <p className="text-base text-gray-500 mb-2 font-medium">{t.quiz.explanation}:</p>
          <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {question.explanationHtml ? (
              <div dangerouslySetInnerHTML={{ __html: question.explanationHtml }} />
            ) : (
              question.explanation
            )}
          </div>
        </div>
      )}

      {/* Video Generation Button */}
      {(shouldShowExplanation || showAnswer) && !showVideoGenerator && (
        <button
          onClick={() => setShowVideoGenerator(true)}
          className="mt-6 flex items-center gap-2 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-medium"
        >
          <Video size={20} />
          {t.video.title}
        </button>
      )}

      {/* Video Generator Component */}
      {showVideoGenerator && examId && (
        <div className="mt-6">
          <VideoGenerator
            questionId={question.id}
            examId={examId}
            onClose={() => setShowVideoGenerator(false)}
          />
        </div>
      )}
    </div>
  );
};

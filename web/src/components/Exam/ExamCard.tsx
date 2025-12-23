import React from 'react';
import { Link } from 'react-router-dom';
import { Exam } from '../../types';
import { BookOpen, Clock, Target, Trash2, PlayCircle, Timer } from 'lucide-react';
import { useT } from '../../stores/languageStore';

interface Props {
  exam: Exam;
  onDelete?: (examId: string) => void;
}

export const ExamCard: React.FC<Props> = ({ exam, onDelete }) => {
  const t = useT();

  const providerColors: Record<string, string> = {
    AWS: 'bg-orange-100 text-orange-700',
    Microsoft: 'bg-blue-100 text-blue-700',
    Google: 'bg-green-100 text-green-700',
    PMI: 'bg-purple-100 text-purple-700',
    JLPT: 'bg-red-100 text-red-700',
    Custom: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-base px-3 py-1.5 rounded-full font-medium ${
          providerColors[exam.provider] || providerColors.Custom
        }`}>
          {exam.provider}
        </span>
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(exam.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.name}</h3>
      <p className="text-base text-gray-500 mb-4">{exam.code}</p>

      <div className="flex flex-wrap gap-4 text-base text-gray-600 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BookOpen size={18} />
          <span>{exam.totalQuestions}{t.exam.questions}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{exam.examTime}{t.exam.minutes}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target size={18} />
          <span>{exam.passingScore}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to={`/quiz/${exam.id}?mode=practice`}
          className="flex items-center gap-4 w-full py-3.5 px-5 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
        >
          <PlayCircle size={26} />
          <div className="flex-1 text-left">
            <div className="text-lg font-semibold">{t.exam.practice}</div>
            <div className="text-sm text-green-600">{t.exam.practiceDesc}</div>
          </div>
        </Link>
        <Link
          to={`/quiz/${exam.id}?mode=exam`}
          className="flex items-center gap-4 w-full py-3.5 px-5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Timer size={26} />
          <div className="flex-1 text-left">
            <div className="text-lg font-semibold">{t.exam.examMode}</div>
            <div className="text-sm text-blue-600">{t.exam.examDesc}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

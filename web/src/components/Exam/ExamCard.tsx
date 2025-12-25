import React from 'react';
import { Link } from 'react-router-dom';
import { Exam } from '../../types';
import { BookOpen, Clock, Target, Trash2, PlayCircle, Timer, Sparkles } from 'lucide-react';
import { useT } from '../../stores/languageStore';

interface Props {
  exam: Exam;
  onDelete?: (examId: string) => void;
}

export const ExamCard: React.FC<Props> = ({ exam, onDelete }) => {
  const t = useT();

  const providerConfig: Record<string, { bg: string, text: string, border: string, gradient: string }> = {
    AWS: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-amber-500'
    },
    Azure: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-cyan-500'
    },
    Microsoft: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-cyan-500'
    },
    Google: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      gradient: 'from-green-500 to-emerald-500'
    },
    GCP: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      gradient: 'from-green-500 to-emerald-500'
    },
    PMI: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-violet-500'
    },
    JLPT: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      gradient: 'from-red-500 to-rose-500'
    },
    Custom: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200',
      gradient: 'from-gray-500 to-slate-500'
    }
  };

  const config = providerConfig[exam.provider] || providerConfig.Custom;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm px-3 py-1.5 rounded-full font-semibold ${config.bg} ${config.text} border ${config.border}`}>
              {exam.provider}
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(exam.id);
              }}
              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {exam.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-mono">{exam.code}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
            <BookOpen size={14} className="text-gray-400" />
            <span>{exam.totalQuestions}{t.exam.questions}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
            <Clock size={14} className="text-gray-400" />
            <span>{exam.examTime}{t.exam.minutes}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
            <Target size={14} className="text-gray-400" />
            <span>{exam.passingScore}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to={`/quiz/${exam.id}?mode=practice`}
            className="group/btn flex items-center gap-4 w-full py-3.5 px-5 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all border border-emerald-100"
          >
            <div className="p-2 bg-emerald-500 rounded-lg group-hover/btn:scale-110 transition-transform">
              <PlayCircle size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-base font-semibold">{t.exam.practice}</div>
              <div className="text-xs text-emerald-600/70">{t.exam.practiceDesc}</div>
            </div>
          </Link>
          <Link
            to={`/quiz/${exam.id}?mode=exam`}
            className="group/btn flex items-center gap-4 w-full py-3.5 px-5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-100"
          >
            <div className="p-2 bg-blue-500 rounded-lg group-hover/btn:scale-110 transition-transform">
              <Timer size={20} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-base font-semibold">{t.exam.examMode}</div>
              <div className="text-xs text-blue-600/70">{t.exam.examDesc}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

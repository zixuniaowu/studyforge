import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Trash2, RefreshCw } from 'lucide-react';
import { db, wrongDB } from '../lib/db';
import { WrongAnswer, Question, Exam } from '../types';
import { useLanguage, useT } from '../stores/languageStore';

interface WrongAnswerWithDetails extends WrongAnswer {
  question?: Question;
  exam?: Exam;
}

export const WrongAnswersPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useT();
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswerWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMastered, setShowMastered] = useState(false);

  const loadWrongAnswers = async () => {
    setLoading(true);
    try {
      const langCode = language === 'ja' ? 'ja' : 'zh-CN';

      // Get all wrong answers
      const allWrong = await db.wrongAnswers.toArray();

      // Filter by language and mastered status
      const filtered = showMastered
        ? allWrong
        : allWrong.filter(w => !w.mastered);

      // Get question and exam details
      const withDetails: WrongAnswerWithDetails[] = await Promise.all(
        filtered.map(async (wrong) => {
          const question = await db.questions.get(wrong.questionId);
          const exam = await db.exams.get(wrong.examId);

          // Only include if exam matches current language
          if (exam && exam.language === langCode) {
            return { ...wrong, question, exam };
          }
          return null;
        })
      );

      // Filter out nulls and sort by lastWrongAt
      const validAnswers = withDetails
        .filter((w): w is WrongAnswerWithDetails => w !== null && w.question !== undefined)
        .sort((a, b) => new Date(b.lastWrongAt).getTime() - new Date(a.lastWrongAt).getTime());

      setWrongAnswers(validAnswers);
    } catch (e) {
      console.error('Failed to load wrong answers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWrongAnswers();
  }, [language, showMastered]);

  const handleMarkMastered = async (id: string) => {
    await wrongDB.markMastered(id);
    await loadWrongAnswers();
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = language === 'ja' ? 'この記録を削除しますか？' : '确定删除此记录？';
    if (window.confirm(confirmMsg)) {
      await wrongDB.deleteWrongAnswer(id);
      await loadWrongAnswers();
    }
  };

  const handlePractice = (examId: string) => {
    navigate(`/quiz/${examId}?mode=practice`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {language === 'ja' ? '間違いノート' : '错题本'}
                </h1>
                <p className="text-base text-gray-500">
                  {wrongAnswers.length} {language === 'ja' ? '問' : '题'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showMastered}
                  onChange={(e) => setShowMastered(e.target.checked)}
                  className="rounded border-gray-300"
                />
                {language === 'ja' ? '習得済みも表示' : '显示已掌握'}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-10 py-6">
        {wrongAnswers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t.wrongAnswers?.noWrongAnswers || (language === 'ja' ? '間違いなし！' : '暂无错题！')}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'ja' ? 'この調子で頑張りましょう！' : '继续加油！'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {language === 'ja' ? 'ホームに戻る' : '返回首页'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {wrongAnswers.map((wrong) => (
              <div
                key={wrong.id}
                className={`bg-white rounded-2xl border ${wrong.mastered ? 'border-green-200 bg-green-50/50' : 'border-gray-200'} p-6 shadow-sm`}
              >
                {/* Exam info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      wrong.exam?.provider === 'AWS' ? 'bg-amber-100 text-amber-700' :
                      wrong.exam?.provider === 'Azure' ? 'bg-blue-100 text-blue-700' :
                      wrong.exam?.provider === 'GCP' ? 'bg-emerald-100 text-emerald-700' :
                      wrong.exam?.provider === 'SAP' ? 'bg-cyan-100 text-cyan-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {wrong.exam?.provider}
                    </span>
                    <span className="text-sm text-gray-500">{wrong.exam?.code}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {language === 'ja' ? `${wrong.wrongCount}回間違い` : `错${wrong.wrongCount}次`}
                    </span>
                    {wrong.mastered && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {language === 'ja' ? '習得済' : '已掌握'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-900 mb-3">
                    {wrong.question?.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {wrong.question?.options && Object.entries(wrong.question.options).map(([key, value]) => {
                      const isCorrect = Array.isArray(wrong.correctAnswer)
                        ? wrong.correctAnswer.includes(key)
                        : wrong.correctAnswer === key;
                      const isUserAnswer = Array.isArray(wrong.userAnswer)
                        ? wrong.userAnswer.includes(key)
                        : wrong.userAnswer === key;

                      return (
                        <div
                          key={key}
                          className={`flex items-start gap-3 p-3 rounded-lg ${
                            isCorrect ? 'bg-green-50 border border-green-200' :
                            isUserAnswer ? 'bg-red-50 border border-red-200' :
                            'bg-gray-50'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCorrect ? 'bg-green-500 text-white' :
                            isUserAnswer ? 'bg-red-500 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {key}
                          </span>
                          <span className="text-gray-700 flex-1">{value}</span>
                          {isCorrect && <CheckCircle size={20} className="text-green-500 flex-shrink-0" />}
                          {isUserAnswer && !isCorrect && <XCircle size={20} className="text-red-500 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation */}
                {wrong.question?.explanation && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      {language === 'ja' ? '解説' : '解析'}
                    </p>
                    <p className="text-blue-700">{wrong.question.explanation}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePractice(wrong.examId)}
                    className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    {language === 'ja' ? 'この試験を練習' : '练习此考试'}
                  </button>
                  <div className="flex items-center gap-2">
                    {!wrong.mastered && (
                      <button
                        onClick={() => handleMarkMastered(wrong.id)}
                        className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle size={16} />
                        {language === 'ja' ? '習得済み' : '标记已掌握'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(wrong.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

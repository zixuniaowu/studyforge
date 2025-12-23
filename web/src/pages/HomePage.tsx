import React, { useEffect, useState } from 'react';
import { useExamStore } from '../stores/examStore';
import { ExamCard } from '../components/Exam/ExamCard';
import { ImportExam } from '../components/Exam/ImportExam';
import {
  BookOpen,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { importExamFromJson } from '../lib/import';
import { useT, useLanguageStore } from '../stores/languageStore';
import { db } from '../lib/db';

export const HomePage: React.FC = () => {
  const { exams, loading, error, loadExams, deleteExam } = useExamStore();
  const [importing, setImporting] = useState(false);
  const t = useT();
  const language = useLanguageStore(state => state.language);

  useEffect(() => {
    const init = async () => {
      await loadExams();
    };
    init();
  }, [loadExams]);

  // 根据语言筛选考试
  const langCode = language === 'ja' ? 'ja' : 'zh-CN';
  const filteredExams = exams.filter(exam => exam.language === langCode);

  // Auto-import sample data if no exams for current language
  useEffect(() => {
    const autoImport = async () => {
      if (!loading && filteredExams.length === 0 && !importing) {
        setImporting(true);
        try {
          const langSuffix = language === 'ja' ? '-ja' : '';
          const sets = [1, 2, 3];
          for (const set of sets) {
            try {
              const res = await fetch(`/sample-data/aws-aif-c01-set${set}${langSuffix}.json`);
              if (res.ok) {
                const data = await res.json();
                await importExamFromJson(data);
              }
            } catch (e) {
              console.error(`Failed to import set ${set}:`, e);
            }
          }
          await loadExams();
        } catch (e) {
          console.error('Auto-import failed:', e);
        } finally {
          setImporting(false);
        }
      }
    };
    autoImport();
  }, [loading, filteredExams.length, importing, loadExams, language]);

  const handleDelete = async (examId: string) => {
    if (window.confirm(t.home.deleteConfirm)) {
      await deleteExam(examId);
    }
  };

  const handleReset = async () => {
    const confirmMsg = language === 'ja'
      ? 'すべてのデータをリセットしますか？すべての試験が削除され、サンプルデータが再インポートされます。'
      : '确定要重置所有数据吗？这会删除所有考试并重新导入示例数据。';
    if (window.confirm(confirmMsg)) {
      setImporting(true);
      try {
        await db.exams.clear();
        await db.questions.clear();
        await db.quizSessions.clear();
        await db.wrongAnswers.clear();

        const languages = [{ suffix: '', lang: 'zh-CN' }, { suffix: '-ja', lang: 'ja' }];
        for (const { suffix } of languages) {
          for (const set of [1, 2, 3]) {
            try {
              const res = await fetch(`/sample-data/aws-aif-c01-set${set}${suffix}.json`);
              if (res.ok) {
                const data = await res.json();
                await importExamFromJson(data);
              }
            } catch (e) {
              console.error(`Failed to import set ${set}${suffix}:`, e);
            }
          }
        }
        await loadExams();
      } catch (e) {
        console.error('Reset failed:', e);
      } finally {
        setImporting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 px-6 lg:px-10 py-8">
        {/* Exams Section */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen size={24} className="text-blue-600" />
                {t.home.title}
              </h2>
              <p className="text-base text-gray-500 mt-1">{t.home.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                disabled={importing}
                className="flex items-center gap-2 p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                title={language === 'ja' ? 'リセット' : '重置数据'}
              >
                <RefreshCw size={20} className={importing ? 'animate-spin' : ''} />
              </button>
              <ImportExam onImportSuccess={loadExams} />
            </div>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 text-red-700 rounded-xl text-base">
              {error}
            </div>
          )}

          {loading || importing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="animate-spin text-blue-600" />
              {importing && <p className="mt-5 text-lg text-gray-600">{t.home.loadingSample}</p>}
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-5" />
              <h3 className="text-xl font-semibold text-gray-600 mb-3">{t.home.noExams}</h3>
              <p className="text-base text-gray-500">{t.home.noExamsHint}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer - sticky at bottom */}
      <footer className="mt-auto py-6 border-t border-gray-200 bg-white text-center text-base text-gray-400">
        <p>StudyForge - {language === 'ja' ? '効率的な試験準備ツール' : '高效备考工具'}</p>
      </footer>
    </div>
  );
};

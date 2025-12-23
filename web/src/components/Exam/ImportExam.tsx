import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, FileJson, Loader2 } from 'lucide-react';
import { importExamFromFile, importExamFromUrl } from '../../lib/import';
import { useT, useLanguageStore } from '../../stores/languageStore';

interface Props {
  onImportSuccess: () => void;
}

export const ImportExam: React.FC<Props> = ({ onImportSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useT();
  const language = useLanguageStore(state => state.language);

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await importExamFromFile(file);
      onImportSuccess();
      setIsOpen(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlImport = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await importExamFromUrl(url);
      onImportSuccess();
      setIsOpen(false);
      setUrl('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleImport = async (setNum: number, lang: 'zh' | 'ja' = 'zh') => {
    setLoading(true);
    setError(null);

    try {
      const langSuffix = lang === 'ja' ? '-ja' : '';
      await importExamFromUrl(`/sample-data/aws-aif-c01-set${setNum}${langSuffix}.json`);
      onImportSuccess();
      setIsOpen(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImportAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const langSuffix = language === 'ja' ? '-ja' : '';
      for (const set of [1, 2, 3]) {
        await importExamFromUrl(`/sample-data/aws-aif-c01-set${set}${langSuffix}.json`);
      }
      onImportSuccess();
      setIsOpen(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Upload size={20} />
        {t.home.importExam}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">{t.import.title}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              {t.import.dragDrop}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileImport}
              disabled={loading}
              className="block w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500">{t.common.or}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* URL Import */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              URL
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/exam.json"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleUrlImport}
                disabled={loading || !url.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : t.home.importExam}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500">{t.common.or}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sample Data */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-2">AWS AIF-C01 {language === 'ja' ? '模擬試験' : '模拟考试'}:</p>
            <button
              onClick={handleImportAll}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              <FileJson size={20} />
              {language === 'ja' ? '全てインポート (3セット × 50問)' : '导入全部 (3套 × 50题)'}
            </button>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(set => (
                <button
                  key={set}
                  onClick={() => handleSampleImport(set, language)}
                  disabled={loading}
                  className="flex items-center justify-center gap-1 py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors text-sm"
                >
                  <FileJson size={16} />
                  {language === 'ja' ? `セット${set}` : `第${set}套`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="px-5 py-2.5 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            {t.common.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

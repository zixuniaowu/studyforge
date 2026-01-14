import React from 'react';
import { ExternalLink, Play, BookOpen, FileCode, Github, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface EmbeddedNotebookProps {
  url: string;
  title?: string;
  description?: string;
  height?: string;
}

// Get the direct Colab URL
const getColabUrl = (url: string): string => {
  if (url.includes('colab.research.google.com')) {
    return url;
  }
  if (url.includes('github.com')) {
    return url.replace('github.com', 'colab.research.google.com/github');
  }
  if (url.includes('gist.github.com')) {
    return url.replace('gist.github.com', 'colab.research.google.com/gist');
  }
  return url;
};

// Extract repo info from GitHub URL
const getRepoInfo = (url: string): { repo: string; path: string } | null => {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)\/blob\/[^/]+\/(.+)/);
  if (match) {
    return { repo: match[1], path: match[2] };
  }
  return null;
};

export const EmbeddedNotebook: React.FC<EmbeddedNotebookProps> = ({
  url,
  title,
  description,
}) => {
  const lang = useLanguageStore(state => state.language);
  const isZh = lang === 'zh';

  const colabUrl = getColabUrl(url);
  const repoInfo = getRepoInfo(url);

  const openInColab = () => {
    window.open(colabUrl, '_blank');
  };

  const openInGitHub = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <BookOpen size={28} />
          </div>
          <div className="flex-1">
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            {description && <p className="text-white/80 mt-1">{description}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Notebook preview card */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <FileCode size={24} className="text-yellow-600" />
            <div>
              <div className="font-mono text-sm text-slate-600">
                {repoInfo ? repoInfo.path : 'notebook.ipynb'}
              </div>
              {repoInfo && (
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Github size={12} />
                  {repoInfo.repo}
                </div>
              )}
            </div>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">📓</div>
            <p className="text-slate-600 mb-2">
              {isZh ? 'Jupyter Notebook 文件' : 'Jupyter Notebook ファイル'}
            </p>
            <p className="text-sm text-slate-400">
              {isZh
                ? '点击下方按钮在 Google Colab 中打开并运行'
                : '下のボタンをクリックして Google Colab で開いて実行'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={openInColab}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <Play size={20} />
              {isZh ? '在 Colab 中打开' : 'Colab で開く'}
              <ArrowRight size={18} />
            </button>

            {url.includes('github.com') && (
              <button
                onClick={openInGitHub}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl transition-all"
              >
                <Github size={18} />
                GitHub
                <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <span className="text-yellow-500">💡</span>
          <span>
            {isZh
              ? 'Google Colab 是免费的云端 Jupyter 环境，可以直接运行 Python 代码，无需本地安装。'
              : 'Google Colab は無料のクラウド Jupyter 環境で、Python コードを直接実行できます。ローカルインストール不要。'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedNotebook;

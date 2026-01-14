import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Copy,
  Check,
  ExternalLink,
  Maximize2,
  Minimize2,
  Download,
  ChevronDown,
  Terminal,
  BookOpen
} from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface CodePlaygroundProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  colabUrl?: string; // Direct Colab notebook URL
  githubUrl?: string; // GitHub repo URL
  readOnly?: boolean;
  height?: string;
  showLineNumbers?: boolean;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  code: initialCode,
  language = 'python',
  title,
  description,
  difficulty,
  tags = [],
  colabUrl,
  githubUrl,
  readOnly = false,
  height = '400px',
  showLineNumbers = true,
}) => {
  const lang = useLanguageStore(state => state.language);
  const isZh = lang === 'zh';
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const editorRef = useRef<unknown>(null);

  const difficultyConfig = {
    beginner: { color: 'bg-green-100 text-green-700 border-green-200', label: isZh ? '入门' : '入門' },
    intermediate: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: isZh ? '中级' : '中級' },
    advanced: { color: 'bg-red-100 text-red-700 border-red-200', label: isZh ? '高级' : '上級' },
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadNotebook = () => {
    const notebook = {
      nbformat: 4,
      nbformat_minor: 0,
      metadata: {
        colab: { name: title || 'StudyForge Demo', provenance: [] },
        kernelspec: { name: 'python3', display_name: 'Python 3' },
        language_info: { name: 'python' }
      },
      cells: [
        {
          cell_type: 'markdown',
          metadata: {},
          source: [`# ${title || 'StudyForge Demo'}\n`, '\n', `> ${description || ''}\n`]
        },
        {
          cell_type: 'code',
          metadata: {},
          source: code.split('\n').map((line, i, arr) => i === arr.length - 1 ? line : line + '\n'),
          execution_count: null,
          outputs: []
        }
      ]
    };

    const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || 'notebook').replace(/\s+/g, '_')}.ipynb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInColab = () => {
    if (colabUrl) {
      window.open(colabUrl, '_blank');
    } else {
      // Download notebook and open Colab upload page
      handleDownloadNotebook();
      window.open('https://colab.research.google.com/#create=true', '_blank');
    }
  };

  const editorHeight = isExpanded ? '70vh' : height;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${isExpanded ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="font-semibold text-lg text-slate-800 truncate">{title}</h3>
            )}
            {description && (
              <p className="text-base text-slate-500 mt-1 line-clamp-2">{description}</p>
            )}
            {(tags.length > 0 || difficulty) && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {difficulty && (
                  <span className={`px-2.5 py-1 text-sm font-medium rounded border ${difficultyConfig[difficulty].color}`}>
                    {difficultyConfig[difficulty].label}
                  </span>
                )}
                {tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-sm rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title={isZh ? '复制代码' : 'コードをコピー'}
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              <span className="hidden sm:inline">{copied ? (isZh ? '已复制' : 'コピー済み') : (isZh ? '复制' : 'コピー')}</span>
            </button>

            {language === 'python' && (
              <>
                <button
                  onClick={openInColab}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                  title={isZh ? '在 Colab 中打开' : 'Colabで開く'}
                >
                  <Play size={16} />
                  <span>Colab</span>
                  <ExternalLink size={14} />
                </button>

                {colabUrl && (
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <BookOpen size={16} />
                    <span className="hidden sm:inline">{isZh ? '预览' : 'プレビュー'}</span>
                    <ChevronDown size={16} className={`transition-transform ${showEmbed ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </>
            )}

            <button
              onClick={handleDownloadNotebook}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title={isZh ? '下载 .ipynb' : '.ipynbをダウンロード'}
            >
              <Download size={16} />
              <span className="hidden sm:inline">.ipynb</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title={isExpanded ? (isZh ? '退出全屏' : '全画面終了') : (isZh ? '全屏' : '全画面')}
            >
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Colab Preview */}
      {showEmbed && colabUrl && (
        <div className="border-b border-slate-200">
          <iframe
            src={`${colabUrl.replace('/github/', '/drive/').replace('github.com', 'colab.research.google.com/github')}#scrollTo=0`}
            width="100%"
            height="500"
            className="border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Code Editor */}
      <div className="relative">
        <div className="absolute top-2 left-3 z-10 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-800/90 text-slate-300 text-xs rounded font-mono">
            {language}
          </span>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-0.5 bg-slate-800/90 text-slate-300 hover:text-white text-xs rounded transition-colors"
            >
              GitHub
              <ExternalLink size={10} />
            </a>
          )}
        </div>

        <Editor
          height={editorHeight}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={(editor) => { editorRef.current = editor; }}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 15,
            lineHeight: 22,
            lineNumbers: showLineNumbers ? 'on' : 'off',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 40 },
            folding: true,
            automaticLayout: true,
            tabSize: 2,
            renderWhitespace: 'selection',
          }}
        />
      </div>

      {/* Footer with tips */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Terminal size={16} />
          <span>{isZh ? '点击 Colab 按钮可直接运行代码' : 'Colabボタンをクリックしてコードを実行'}</span>
        </div>
        <div className="text-sm text-slate-400">
          {code.split('\n').length} {isZh ? '行' : '行'}
        </div>
      </div>

      {/* Fullscreen overlay background */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default CodePlayground;

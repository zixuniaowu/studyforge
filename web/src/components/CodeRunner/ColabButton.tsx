import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface ColabButtonProps {
  code: string;
  title?: string;
}

export const ColabButton: React.FC<ColabButtonProps> = ({ code, title = 'StudyForge Demo' }) => {
  const language = useLanguageStore(state => state.language);
  const [isLoading, setIsLoading] = useState(false);

  const openInColab = async () => {
    setIsLoading(true);

    try {
      // Create a Jupyter notebook structure
      const notebook = {
        nbformat: 4,
        nbformat_minor: 0,
        metadata: {
          colab: {
            name: title,
            provenance: []
          },
          kernelspec: {
            name: 'python3',
            display_name: 'Python 3'
          },
          language_info: {
            name: 'python'
          }
        },
        cells: [
          {
            cell_type: 'markdown',
            metadata: {},
            source: [
              `# ${title}\n`,
              '\n',
              language === 'ja'
                ? '> StudyForge からエクスポートされたコード\n'
                : '> 从 StudyForge 导出的代码\n'
            ]
          },
          {
            cell_type: 'code',
            metadata: {},
            source: code.split('\n').map((line, i, arr) =>
              i === arr.length - 1 ? line : line + '\n'
            ),
            execution_count: null,
            outputs: []
          }
        ]
      };

      // Convert to JSON and encode for URL
      const notebookJson = JSON.stringify(notebook);
      const blob = new Blob([notebookJson], { type: 'application/json' });

      // Create a temporary download link and trigger download
      // User can then upload to Colab
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.ipynb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Also open Colab in a new tab
      window.open('https://colab.research.google.com/notebooks/intro.ipynb', '_blank');

    } catch (error) {
      console.error('Failed to create Colab notebook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={openInColab}
      disabled={isLoading}
      className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
      title={language === 'ja' ? 'Google Colab で開く' : '在 Google Colab 中打开'}
    >
      {isLoading ? (
        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Play size={12} />
      )}
      <span className="hidden sm:inline">Colab</span>
      <ExternalLink size={10} className="hidden sm:inline" />
    </button>
  );
};

export default ColabButton;

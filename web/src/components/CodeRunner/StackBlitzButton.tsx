import React, { useState } from 'react';
import sdk from '@stackblitz/sdk';
import { Code2, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface StackBlitzButtonProps {
  code: string;
  language: 'javascript' | 'typescript';
  title?: string;
}

export const StackBlitzButton: React.FC<StackBlitzButtonProps> = ({
  code,
  language: codeLang,
  title = 'StudyForge Demo'
}) => {
  const language = useLanguageStore(state => state.language);
  const [isLoading, setIsLoading] = useState(false);

  const openInStackBlitz = async () => {
    setIsLoading(true);

    try {
      const isTypeScript = codeLang === 'typescript';
      const fileName = isTypeScript ? 'index.ts' : 'index.js';

      // Create a minimal project configuration
      await sdk.openProject(
        {
          title,
          description: language === 'ja'
            ? 'StudyForge からエクスポートされたコード'
            : '从 StudyForge 导出的代码',
          template: isTypeScript ? 'typescript' : 'javascript',
          files: {
            [fileName]: code,
            'package.json': JSON.stringify({
              name: 'studyforge-demo',
              version: '1.0.0',
              description: title,
              main: fileName,
              scripts: {
                start: isTypeScript ? 'ts-node index.ts' : 'node index.js'
              },
              dependencies: {},
              devDependencies: isTypeScript ? {
                'typescript': '^5.0.0',
                'ts-node': '^10.9.0',
                '@types/node': '^20.0.0'
              } : {}
            }, null, 2)
          }
        },
        {
          openFile: fileName,
          newWindow: true
        }
      );
    } catch (error) {
      console.error('Failed to open in StackBlitz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={openInStackBlitz}
      disabled={isLoading}
      className="flex items-center gap-1.5 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors disabled:opacity-50"
      title={language === 'ja' ? 'StackBlitz で開く' : '在 StackBlitz 中打开'}
    >
      {isLoading ? (
        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Code2 size={12} />
      )}
      <span className="hidden sm:inline">StackBlitz</span>
      <ExternalLink size={10} className="hidden sm:inline" />
    </button>
  );
};

export default StackBlitzButton;

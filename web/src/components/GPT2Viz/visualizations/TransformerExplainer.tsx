/**
 * TransformerExplainer - 嵌入原版 transformer-explainer
 *
 * 原版项目太复杂（Svelte + 自定义ONNX模型 + 700+行Sankey组件），
 * 直接用 iframe 嵌入获得最佳效果。
 */

import React, { useState } from 'react';

interface TransformerExplainerProps {
  language: 'zh' | 'ja';
}

export const TransformerExplainer: React.FC<TransformerExplainerProps> = ({ language }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const labels = {
    zh: {
      title: 'Transformer 可视化演示',
      subtitle: '来自 Georgia Tech & IBM Research 的交互式 GPT-2 可视化工具',
      loading: '加载中...',
      error: '加载失败，请点击下方链接直接访问',
      openInNewTab: '在新标签页打开',
      note: '注意：首次加载需要下载约 150MB 的 GPT-2 模型，请耐心等待',
      features: [
        '✓ 真实运行 GPT-2 模型',
        '✓ 可视化 Attention 权重',
        '✓ 交互式探索每一层',
        '✓ 实时生成下一个词'
      ]
    },
    ja: {
      title: 'Transformer 可視化デモ',
      subtitle: 'Georgia Tech & IBM Research によるインタラクティブな GPT-2 可視化ツール',
      loading: '読み込み中...',
      error: '読み込み失敗。下のリンクから直接アクセスしてください',
      openInNewTab: '新しいタブで開く',
      note: '注意：初回読み込み時に約150MBのGPT-2モデルをダウンロードします',
      features: [
        '✓ 実際のGPT-2モデルを実行',
        '✓ Attentionウェイトを可視化',
        '✓ 各層をインタラクティブに探索',
        '✓ リアルタイムで次のトークンを生成'
      ]
    }
  };

  const t = labels[language];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 via-white to-blue-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-sm text-gray-500">{t.subtitle}</p>
          </div>
          <a
            href="https://poloclub.github.io/transformer-explainer/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            {t.openInNewTab}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mt-3">
          {t.features.map((feature, i) => (
            <span key={i} className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="px-6 py-2 bg-amber-50 border-b border-amber-100 text-sm text-amber-700">
        ⚠️ {t.note}
      </div>

      {/* iframe Container */}
      <div className="relative" style={{ height: '700px' }}>
        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">{t.loading}</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-gray-600 mb-4">{t.error}</p>
              <a
                href="https://poloclub.github.io/transformer-explainer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {t.openInNewTab}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* iframe */}
        <iframe
          src="https://poloclub.github.io/transformer-explainer/"
          className="w-full h-full border-0"
          title="Transformer Explainer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
        <span>
          © <a href="https://poloclub.github.io/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Polo Club of Data Science</a> @ Georgia Tech
        </span>
        <a
          href="https://github.com/poloclub/transformer-explainer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default TransformerExplainer;

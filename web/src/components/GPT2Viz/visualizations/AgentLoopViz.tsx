/**
 * AgentLoopViz - AI Agent 工作循环 交互式可视化
 *
 * 展示 ReAct (Reasoning + Acting) 模式的工作流程
 * 设计原则：
 * 1. 循环动画展示 Think → Act → Observe 过程
 * 2. 可展开的详细执行日志
 * 3. 真实的工具调用模拟
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentLoopVizProps {
  language: 'zh' | 'ja';
}

// 颜色方案
const COLORS = {
  think: '#8b5cf6',     // 紫色 - 思考
  act: '#3b82f6',       // 蓝色 - 行动
  observe: '#10b981',   // 绿色 - 观察
  tool: '#f59e0b',      // 琥珀色 - 工具
  error: '#ef4444',     // 红色 - 错误
  success: '#22c55e',   // 绿色 - 成功
};

// 工具图标
const ToolIcons: Record<string, string> = {
  search: '🔍',
  code: '💻',
  file: '📁',
  browser: '🌐',
  terminal: '⌨️',
  database: '🗃️',
};

// 模拟的 Agent 步骤
interface AgentStep {
  id: number;
  type: 'think' | 'act' | 'observe';
  content: {
    zh: string;
    ja: string;
  };
  tool?: string;
  toolInput?: string;
  toolOutput?: {
    zh: string;
    ja: string;
  };
  status?: 'running' | 'success' | 'error';
}

const mockAgentSteps: AgentStep[] = [
  {
    id: 1,
    type: 'think',
    content: {
      zh: '用户想要了解如何在 Python 中读取 JSON 文件。我需要：\n1. 搜索相关文档\n2. 编写示例代码\n3. 解释代码',
      ja: 'ユーザーはPythonでJSONファイルを読む方法を知りたがっています。必要なこと：\n1. 関連ドキュメントを検索\n2. サンプルコードを作成\n3. コードを説明'
    }
  },
  {
    id: 2,
    type: 'act',
    tool: 'search',
    toolInput: 'Python json module documentation',
    content: {
      zh: '调用搜索工具查找 Python JSON 模块文档',
      ja: '検索ツールを呼び出してPython JSONモジュールのドキュメントを検索'
    },
    status: 'success'
  },
  {
    id: 3,
    type: 'observe',
    content: {
      zh: '找到了 Python 官方文档中关于 json 模块的说明。json.load() 用于从文件读取，json.loads() 用于从字符串解析。',
      ja: 'Python公式ドキュメントでjsonモジュールの説明を見つけました。json.load()はファイルから読み取り、json.loads()は文字列から解析します。'
    },
    toolOutput: {
      zh: '文档: json — JSON 编码和解码器\n- json.load(fp): 从文件对象读取\n- json.loads(s): 从字符串解析\n- json.dump(): 写入文件\n- json.dumps(): 转为字符串',
      ja: 'ドキュメント: json — JSONエンコーダー/デコーダー\n- json.load(fp): ファイルオブジェクトから読み取り\n- json.loads(s): 文字列から解析\n- json.dump(): ファイルに書き込み\n- json.dumps(): 文字列に変換'
    }
  },
  {
    id: 4,
    type: 'think',
    content: {
      zh: '已获取文档信息。现在需要编写一个完整的示例代码来演示如何读取 JSON 文件。',
      ja: 'ドキュメント情報を取得しました。次にJSONファイルの読み取り方法を示す完全なサンプルコードを作成します。'
    }
  },
  {
    id: 5,
    type: 'act',
    tool: 'code',
    toolInput: 'write_python_json_example',
    content: {
      zh: '生成 Python 示例代码',
      ja: 'Pythonサンプルコードを生成'
    },
    status: 'success'
  },
  {
    id: 6,
    type: 'observe',
    content: {
      zh: '代码已生成。包含了文件读取、错误处理和数据访问的完整示例。',
      ja: 'コードが生成されました。ファイル読み取り、エラー処理、データアクセスの完全な例を含んでいます。'
    },
    toolOutput: {
      zh: `import json

# 读取 JSON 文件
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 访问数据
print(data['name'])
print(data['items'])`,
      ja: `import json

# JSONファイルを読み取る
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# データにアクセス
print(data['name'])
print(data['items'])`
    }
  },
  {
    id: 7,
    type: 'think',
    content: {
      zh: '代码示例已准备好。任务完成，可以向用户提供完整的回答了。',
      ja: 'コード例の準備ができました。タスク完了、ユーザーに完全な回答を提供できます。'
    }
  }
];

// 循环节点组件
const LoopNode: React.FC<{
  label: string;
  color: string;
  isActive: boolean;
  icon: string;
  onClick: () => void;
}> = ({ label, color, isActive, icon, onClick }) => (
  <motion.div
    className={`
      flex flex-col items-center justify-center w-24 h-24 rounded-full cursor-pointer
      transition-all duration-300 border-4
      ${isActive ? 'shadow-lg scale-110' : 'shadow-sm hover:shadow-md'}
    `}
    style={{
      borderColor: isActive ? color : '#e5e7eb',
      backgroundColor: isActive ? `${color}20` : 'white'
    }}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-3xl mb-1">{icon}</div>
    <div
      className="text-sm font-semibold"
      style={{ color: isActive ? color : '#6b7280' }}
    >
      {label}
    </div>
  </motion.div>
);

// 箭头组件
const Arrow: React.FC<{
  direction: 'right' | 'down' | 'left' | 'up';
  isActive: boolean;
}> = ({ direction, isActive }) => {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: -90
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <svg width="40" height="20" viewBox="0 0 40 20">
        <motion.path
          d="M 0 10 L 30 10 M 25 5 L 30 10 L 25 15"
          stroke={isActive ? COLORS.think : '#d1d5db'}
          strokeWidth={isActive ? 3 : 2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

// 步骤卡片组件
const StepCard: React.FC<{
  step: AgentStep;
  language: 'zh' | 'ja';
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ step, language, isActive, isExpanded, onToggle }) => {
  const getStepColor = () => {
    switch (step.type) {
      case 'think': return COLORS.think;
      case 'act': return COLORS.act;
      case 'observe': return COLORS.observe;
    }
  };

  const getStepIcon = () => {
    switch (step.type) {
      case 'think': return '🤔';
      case 'act': return step.tool ? ToolIcons[step.tool] || '🔧' : '⚡';
      case 'observe': return '👁️';
    }
  };

  const getStepLabel = () => {
    const labels = {
      think: { zh: '思考', ja: '思考' },
      act: { zh: '行动', ja: 'アクション' },
      observe: { zh: '观察', ja: '観察' }
    };
    return labels[step.type][language];
  };

  return (
    <motion.div
      className={`
        border-l-4 rounded-r-lg overflow-hidden mb-3
        ${isActive ? 'shadow-md' : 'shadow-sm'}
      `}
      style={{ borderLeftColor: getStepColor() }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
          px-4 py-3 cursor-pointer transition-colors
          ${isActive ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
        `}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">{getStepIcon()}</span>
            <span
              className="text-sm font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${getStepColor()}20`, color: getStepColor() }}
            >
              {getStepLabel()}
            </span>
            {step.tool && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {step.tool}
              </span>
            )}
            {step.status && (
              <span className={`text-xs px-2 py-0.5 rounded ${
                step.status === 'success' ? 'bg-green-100 text-green-600' :
                step.status === 'error' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {step.status}
              </span>
            )}
          </div>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-400"
          >
            ▼
          </motion.span>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {step.content[language].split('\n')[0]}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50 border-t border-gray-200"
          >
            <div className="px-4 py-3">
              {/* 完整思考内容 */}
              {step.type === 'think' && (
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {step.content[language]}
                </pre>
              )}

              {/* 工具调用详情 */}
              {step.type === 'act' && step.toolInput && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    {language === 'zh' ? '工具输入:' : 'ツール入力:'}
                  </div>
                  <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm">
                    {step.toolInput}
                  </code>
                </div>
              )}

              {/* 观察结果 */}
              {step.type === 'observe' && step.toolOutput && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    {language === 'zh' ? '工具输出:' : 'ツール出力:'}
                  </div>
                  <pre className="bg-gray-900 text-gray-300 p-3 rounded text-sm overflow-x-auto">
                    {step.toolOutput[language]}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 主组件
export const AgentLoopViz: React.FC<AgentLoopVizProps> = ({ language }) => {
  const [activePhase, setActivePhase] = useState<'think' | 'act' | 'observe'>('think');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const labels = {
    zh: {
      title: 'AI Agent 工作循环',
      subtitle: '探索 ReAct (Reasoning + Acting) 模式',
      think: '思考',
      act: '行动',
      observe: '观察',
      autoPlay: '自动播放',
      pause: '暂停',
      reset: '重置',
      step: '步骤',
      tip: '点击循环节点或步骤卡片查看详情，使用自动播放观察完整流程',
      task: '任务：帮用户了解如何在 Python 中读取 JSON 文件',
      complete: '任务完成!'
    },
    ja: {
      title: 'AI Agent 動作ループ',
      subtitle: 'ReAct (Reasoning + Acting) パターンを探索',
      think: '思考',
      act: 'アクション',
      observe: '観察',
      autoPlay: '自動再生',
      pause: '一時停止',
      reset: 'リセット',
      step: 'ステップ',
      tip: 'ループノードまたはステップカードをクリックで詳細表示、自動再生で完全なフローを確認',
      task: 'タスク：PythonでJSONファイルを読む方法をユーザーに説明',
      complete: 'タスク完了!'
    }
  };

  const t = labels[language];

  // 自动播放逻辑
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < mockAgentSteps.length - 1) {
            const nextIndex = prev + 1;
            setCompletedSteps(steps => [...steps, prev]);
            setActivePhase(mockAgentSteps[nextIndex].type);
            return nextIndex;
          } else {
            setIsAutoPlaying(false);
            setCompletedSteps(steps => [...steps, prev]);
            return prev;
          }
        });
      }, 2000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setActivePhase('think');
    setExpandedStep(null);
  }, []);

  const isComplete = completedSteps.length === mockAgentSteps.length;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-green-50 rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Task Description */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800 font-medium">{t.task}</div>
        </div>

        {/* Loop Diagram */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Triangle Layout */}
            <div className="flex flex-col items-center">
              {/* Top: Think */}
              <LoopNode
                label={t.think}
                color={COLORS.think}
                isActive={activePhase === 'think'}
                icon="🤔"
                onClick={() => setActivePhase('think')}
              />

              <div className="flex items-center gap-8 mt-4">
                {/* Arrow from Think to Act */}
                <div className="relative">
                  <Arrow direction="down" isActive={activePhase === 'think'} />
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 rotate-45">
                    <Arrow direction="right" isActive={activePhase === 'think'} />
                  </div>
                </div>

                {/* Arrow from Observe to Think */}
                <div className="relative">
                  <Arrow direction="up" isActive={activePhase === 'observe'} />
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -rotate-45">
                    <Arrow direction="left" isActive={activePhase === 'observe'} />
                  </div>
                </div>
              </div>

              {/* Bottom: Act and Observe */}
              <div className="flex items-center gap-12 mt-4">
                <LoopNode
                  label={t.act}
                  color={COLORS.act}
                  isActive={activePhase === 'act'}
                  icon="⚡"
                  onClick={() => setActivePhase('act')}
                />

                <div className="flex items-center">
                  <Arrow direction="right" isActive={activePhase === 'act'} />
                </div>

                <LoopNode
                  label={t.observe}
                  color={COLORS.observe}
                  isActive={activePhase === 'observe'}
                  icon="👁️"
                  onClick={() => setActivePhase('observe')}
                />
              </div>
            </div>

            {/* Completion Badge */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  ✓ {t.complete}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleAutoPlay}
            disabled={isComplete}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${isAutoPlaying
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-purple-600 text-white hover:bg-purple-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isAutoPlaying ? `⏸ ${t.pause}` : `▶ ${t.autoPlay}`}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            🔄 {t.reset}
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            {mockAgentSteps.map((_, i) => (
              <div
                key={i}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${completedSteps.includes(i)
                    ? 'bg-green-500'
                    : i === currentStepIndex
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-300'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Steps List */}
        <div className="max-h-96 overflow-y-auto pr-2">
          {mockAgentSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              language={language}
              isActive={index === currentStepIndex}
              isExpanded={expandedStep === step.id}
              onToggle={() => setExpandedStep(
                expandedStep === step.id ? null : step.id
              )}
            />
          ))}
        </div>

        {/* Tip */}
        <div className="mt-4 text-center text-sm text-gray-400">
          💡 {t.tip}
        </div>
      </div>
    </div>
  );
};

export default AgentLoopViz;

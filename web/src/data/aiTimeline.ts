// AI 动态时间轴数据
// 更新说明：只需在此文件添加新事件，书籍内容会自动更新
// 最后更新：2025-01-07

export interface TimelineEvent {
  id: string;
  date: string;           // 格式：2025-01
  title: {
    zh: string;
    ja: string;
  };
  description: {
    zh: string;
    ja: string;
  };
  category: 'model' | 'tool' | 'feature' | 'trend';  // 模型/工具/功能/趋势
  importance: 'high' | 'medium' | 'low';
  relatedSection?: string;  // 关联的书籍章节ID
  details?: {
    zh: string;
    ja: string;
  };
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'claude-opus-4.5',
    date: '2025-01',
    title: {
      zh: 'Claude Opus 4.5 发布',
      ja: 'Claude Opus 4.5 リリース'
    },
    description: {
      zh: 'Anthropic 发布最强 AI 模型',
      ja: 'Anthropic が最強AIモデルをリリース'
    },
    category: 'model',
    importance: 'high',
    relatedSection: 'ch2-models',
    details: {
      zh: `
**核心升级：**
- 知识截止日期：2025年1月
- 长文本输出：可达 1.2 万+ 字符
- 创作能力：文学创作、UI设计感显著提升
- Thinking 模式：支持深度思考，复杂任务成功率更高

**实测表现：**
| 能力 | 表现 |
|------|------|
| 长文本生成 | ~12000字符，GPT-5.1仅~6900字符 |
| 文学创作 | 意象精准，用词得当 |
| 前端设计 | 配色精致，排版美观 |
`,
      ja: `
**コアアップグレード：**
- 知識カットオフ：2025年1月
- 長文出力：1.2万文字以上可能
- 創作能力：文学創作、UIデザイン感が大幅向上
- Thinkingモード：深い思考をサポート
`
    }
  },
  {
    id: 'gpt-5-series',
    date: '2025-02',
    title: {
      zh: 'GPT-5 系列发布',
      ja: 'GPT-5 シリーズ発表'
    },
    description: {
      zh: 'OpenAI 发布 GPT-5.0/5.1/5.2',
      ja: 'OpenAI が GPT-5.0/5.1/5.2 をリリース'
    },
    category: 'model',
    importance: 'high',
    relatedSection: 'ch2-models',
    details: {
      zh: `
**版本演进：**
- GPT-5.0：基础能力提升
- GPT-5.1：浏览器自动化增强
- GPT-5.2：新增 Agent Skills 功能

**与 Claude 对比：**
| 能力 | Claude | GPT-5.1 |
|------|--------|---------|
| 长文本 | ★★★★★ | ★★★☆☆ |
| 数学编程 | ★★★★☆ | ★★★★★ |
| 浏览器自动化 | ★★★★☆ | ★★★★★ |
`,
      ja: `
**バージョン進化：**
- GPT-5.0：基本能力向上
- GPT-5.1：ブラウザ自動化強化
- GPT-5.2：Agent Skills機能追加
`
    }
  },
  {
    id: 'claude-code-release',
    date: '2025-03',
    title: {
      zh: 'Claude Code 正式发布',
      ja: 'Claude Code 正式リリース'
    },
    description: {
      zh: '基于 MCP 的 AI 编程助手',
      ja: 'MCPベースのAIプログラミングアシスタント'
    },
    category: 'tool',
    importance: 'high',
    relatedSection: 'ch2-mcp',
    details: {
      zh: `
**核心能力：**
- 直接读写代码文件
- 运行终端命令
- MCP 协议扩展
- 支持多种 IDE 集成

**创始人 Boris 的工作流：**
1. 使用 Opus 4.5 + thinking 模式
2. Plan 模式优先（Shift+Tab 两次）
3. 5个终端 + 5-10个Web实例并行
4. Slash 命令自动化重复操作
5. 验证闭环：自动测试 → 自动修复
`,
      ja: `
**コア機能：**
- コードファイルの直接読み書き
- ターミナルコマンド実行
- MCPプロトコル拡張
- 複数IDEとの統合
`
    }
  },
  {
    id: 'sub-agents',
    date: '2025-04',
    title: {
      zh: 'Sub-agents 功能上线',
      ja: 'Sub-agents 機能リリース'
    },
    description: {
      zh: 'Claude Code 支持专家团队协作',
      ja: 'Claude Code が専門家チーム協力をサポート'
    },
    category: 'feature',
    importance: 'high',
    relatedSection: 'ch2-mcp',
    details: {
      zh: `
**工作原理：**
主 Agent 将任务委派给专门的 Sub-agents，每个专注一个领域。

**配置方式：**
在 .claude/agents/ 目录创建 Markdown 文件定义专家角色。

**典型角色：**
- code-reviewer：代码审查专家
- test-writer：测试编写专家
- doc-generator：文档生成专家

**优势：**
- 上下文隔离，避免污染
- 专业化分工，成功率更高
- 可复用，团队共享
`,
      ja: `
**動作原理：**
メインAgentがタスクを専門Sub-agentsに委譲、各自が1つの領域に集中。
`
    }
  },
  {
    id: 'agent-skills-standard',
    date: '2025-05',
    title: {
      zh: 'Agent Skills 成为行业标准',
      ja: 'Agent Skills が業界標準に'
    },
    description: {
      zh: 'OpenAI 采用 Anthropic 的 Skills 规范',
      ja: 'OpenAI が Anthropic の Skills 仕様を採用'
    },
    category: 'trend',
    importance: 'high',
    relatedSection: 'ch2-models',
    details: {
      zh: `
**什么是 Skills：**
将专业知识和工作流程打包成文件，让 AI 随时调用。

**跨平台通用：**
| 平台 | 支持情况 |
|------|----------|
| Claude Code | ✅ 原生支持 |
| GPT Codex | ✅ 新增支持 |
| Cursor | ✅ 兼容 |

**意义：**
- 一次编写，到处运行
- 团队知识资产化
- AI 能力可定制化
`,
      ja: `
**Skillsとは：**
専門知識とワークフローをファイルにパッケージ化し、AIがいつでも呼び出し可能に。
`
    }
  },
  {
    id: 'claude-code-chrome',
    date: '2025-06',
    title: {
      zh: 'Claude Code Chrome 集成',
      ja: 'Claude Code Chrome 統合'
    },
    description: {
      zh: '原生支持浏览器自动化',
      ja: 'ブラウザ自動化をネイティブサポート'
    },
    category: 'feature',
    importance: 'medium',
    relatedSection: 'ch2-mcp',
    details: {
      zh: `
**应用场景：**
- 前端 UI 调试
- 端到端自动化测试
- 保留登录状态和扩展插件

**Boris 的验证循环：**
让 Claude 通过 Chrome 扩展自动验证 UI，直到功能和体验满意为止。质量可提升 2-3 倍。
`,
      ja: `
**応用シーン：**
- フロントエンドUIデバッグ
- E2E自動化テスト
- ログイン状態と拡張機能の保持
`
    }
  },
  {
    id: 'superClaude',
    date: '2025-06',
    title: {
      zh: 'SuperClaude 框架发布',
      ja: 'SuperClaude フレームワーク発表'
    },
    description: {
      zh: '让编程能力暴增 300%',
      ja: 'プログラミング能力300%向上'
    },
    category: 'tool',
    importance: 'medium',
    relatedSection: 'ch0-experts',
    details: {
      zh: `
**安装：**
\`\`\`bash
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude && ./install.sh
\`\`\`

**19 个专业命令：**
/build, /user:test, /user:analyze, /user:deploy 等

**9 大专家角色：**
architect, frontend, backend, security, qa, performance, analyzer, mentor, refactorer

**使用示例：**
\`\`\`bash
/build --react --magic --tdd --persona-frontend
\`\`\`
`,
      ja: `
**インストール：**
\`\`\`bash
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude && ./install.sh
\`\`\`
`
    }
  },
  {
    id: 'july-2025-updates',
    date: '2025-07',
    title: {
      zh: '2025年7月最新动态',
      ja: '2025年7月最新動向'
    },
    description: {
      zh: '持续更新的工具与功能',
      ja: '継続更新中のツールと機能'
    },
    category: 'trend',
    importance: 'medium',
    details: {
      zh: `
**最新工具：**
| 工具 | 功能 |
|------|------|
| Ralph Wiggum | AI 自动迭代修复，从 Bug 到完美应用只需一条命令 |
| Claudia | Claude Code GUI 界面，告别命令行 |
| Claude Code PM | 并行开发支持，GitHub Issues 秒变独立分支 |
| Kilo Code | 融合 Cline 和 Roo Code 优势，支持 5 种智能模式 |

**发展趋势：**
- Spec-Driven 开发逐渐取代 Vibe Coding
- 上下文工程比提示工程效果好 10 倍
- 多 AI 协作成为常态（Claude + GPT + Gemini）
`,
      ja: `
**最新ツール：**
| ツール | 機能 |
|--------|------|
| Ralph Wiggum | AI自動反復修正 |
| Claudia | Claude Code GUI |
| Claude Code PM | 並列開発サポート |
`
    }
  }
];

// 获取最新更新日期
export const getLastUpdateDate = (): string => {
  return '2025-01-07';
};

// 按日期排序获取事件
export const getEventsByDate = (): TimelineEvent[] => {
  return [...timelineEvents].sort((a, b) => b.date.localeCompare(a.date));
};

// 按类别筛选
export const getEventsByCategory = (category: TimelineEvent['category']): TimelineEvent[] => {
  return timelineEvents.filter(e => e.category === category);
};

// 获取高重要性事件
export const getHighImportanceEvents = (): TimelineEvent[] => {
  return timelineEvents.filter(e => e.importance === 'high');
};

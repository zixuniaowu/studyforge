// AI 学习课程内容数据
// 包含两条学习路径：小白入门 & 技术进阶

export interface Lesson {
  id: string;
  title: { zh: string; ja: string };
  duration: string;
  type: 'video' | 'reading' | 'interactive' | 'practice';
  content: {
    zh: string;
    ja: string;
  };
  visualType?: 'animation' | 'diagram' | 'infographic' | 'demo';
  videoId?: string; // YouTube video ID
  imageUrl?: string;
}

export interface Module {
  id: string;
  title: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: string; // Lucide icon name
  gradient: string;
  lessons: Lesson[];
  practiceProject?: {
    title: { zh: string; ja: string };
    description: { zh: string; ja: string };
  };
}

export interface LearningPath {
  id: string;
  title: { zh: string; ja: string };
  description: { zh: string; ja: string };
  targetAudience: { zh: string; ja: string };
  duration: { zh: string; ja: string };
  icon: string;
  gradient: string;
  modules: Module[];
}

// ============================================
// 路径一：AI 小白入门（面向学生/非IT人士）
// ============================================
export const beginnerPath: LearningPath = {
  id: 'beginner',
  title: { zh: 'AI 小白入门', ja: 'AI 初心者コース' },
  description: {
    zh: '零基础学习 AI，从理解概念到熟练使用 AI 工具',
    ja: 'ゼロからAIを学び、概念理解からAIツールの活用まで'
  },
  targetAudience: {
    zh: '学生、职场新人、对AI感兴趣的任何人',
    ja: '学生、社会人、AIに興味のある方'
  },
  duration: { zh: '约 10 小时', ja: '約10時間' },
  icon: 'Sparkles',
  gradient: 'from-pink-500 to-rose-500',
  modules: [
    // 模块 1: AI 是什么
    {
      id: 'what-is-ai',
      title: { zh: 'AI 是什么？', ja: 'AIとは？' },
      description: {
        zh: '用生活中的例子理解人工智能',
        ja: '身近な例でAIを理解する'
      },
      icon: 'Lightbulb',
      gradient: 'from-amber-400 to-orange-500',
      lessons: [
        {
          id: 'ai-in-daily-life',
          title: { zh: '生活中的 AI', ja: '日常生活のAI' },
          duration: '8分',
          type: 'reading',
          visualType: 'infographic',
          content: {
            zh: `
## 你每天都在使用 AI！

### 🎵 音乐推荐
当 Spotify 或网易云音乐给你推荐歌曲时，背后就是 AI 在分析你的听歌习惯。

### 📸 手机拍照
手机相机的「人像模式」「夜景模式」都是 AI 在实时处理图像。

### 🛒 购物推荐
淘宝、京东的「猜你喜欢」，就是 AI 根据你的浏览和购买记录推荐商品。

### 🗣️ 语音助手
Siri、小爱同学、天猫精灵，都是 AI 在理解你说的话。

### 🚗 导航地图
高德、百度地图的路线规划和实时路况，AI 在帮你避开拥堵。
            `,
            ja: `
## 毎日AIを使っています！

### 🎵 音楽レコメンド
SpotifyやApple Musicが曲をおすすめする時、AIがあなたの聴取習慣を分析しています。

### 📸 スマホカメラ
「ポートレートモード」「ナイトモード」はAIがリアルタイムで画像処理しています。

### 🛒 ショッピング
Amazonの「おすすめ商品」は、AIが閲覧・購入履歴から推薦しています。

### 🗣️ 音声アシスタント
Siri、Alexa、Google アシスタントはAIがあなたの言葉を理解しています。

### 🚗 ナビゲーション
Google マップの経路案内やリアルタイム交通情報、AIが渋滞回避を支援しています。
            `
          }
        },
        {
          id: 'ai-vs-human',
          title: { zh: 'AI 和人类的区别', ja: 'AIと人間の違い' },
          duration: '10分',
          type: 'video',
          visualType: 'animation',
          videoId: 'mJeNghZXtMo', // CGP Grey - How Machines Learn
          content: {
            zh: `
## AI 擅长什么？不擅长什么？

### ✅ AI 擅长的事情
| 能力 | 例子 |
|------|------|
| 处理大量数据 | 一秒分析百万条记录 |
| 重复性任务 | 24小时不间断工作 |
| 模式识别 | 从海量图片中找人脸 |
| 快速计算 | 复杂数学运算 |

### ❌ AI 不擅长的事情
| 能力 | 原因 |
|------|------|
| 真正理解含义 | AI 是统计模式匹配 |
| 创造性思维 | 只能组合已有知识 |
| 情感共鸣 | 没有真实感受 |
| 常识推理 | 缺乏生活经验 |

### 🤝 最佳搭档
人类 + AI = 超级组合！
- 人类提供创意和判断
- AI 提供速度和精确
            `,
            ja: `
## AIの得意・不得意

### ✅ AIが得意なこと
| 能力 | 例 |
|------|------|
| 大量データ処理 | 1秒で100万件分析 |
| 繰り返し作業 | 24時間稼働可能 |
| パターン認識 | 大量の画像から顔検出 |
| 高速計算 | 複雑な数学演算 |

### ❌ AIが苦手なこと
| 能力 | 理由 |
|------|------|
| 真の意味理解 | 統計的パターンマッチング |
| 創造的思考 | 既存知識の組み合わせのみ |
| 感情的共感 | 本当の感情がない |
| 常識的推論 | 生活経験がない |

### 🤝 最強コンビ
人間 + AI = スーパーチーム！
- 人間：創造性と判断
- AI：スピードと正確性
            `
          }
        },
        {
          id: 'ai-types-simple',
          title: { zh: 'AI 的类型（简单版）', ja: 'AIの種類（簡単版）' },
          duration: '6分',
          type: 'reading',
          visualType: 'diagram',
          content: {
            zh: `
## 三种你会遇到的 AI

### 1️⃣ 对话型 AI（聊天机器人）
**代表：** ChatGPT、Claude、文心一言

**能做什么：**
- 回答问题
- 写文章、邮件
- 翻译、总结
- 写代码

**就像：** 一个知识渊博的助手

---

### 2️⃣ 图像型 AI（图片生成/处理）
**代表：** Midjourney、DALL-E、Stable Diffusion

**能做什么：**
- 根据文字生成图片
- 修改、编辑图片
- 去除背景
- 图片高清化

**就像：** 一个会画画的艺术家

---

### 3️⃣ 多模态 AI（全能型）
**代表：** GPT-4V、Gemini、Claude 3

**能做什么：**
- 看图说话
- 理解视频
- 结合文字和图像
- 几乎什么都能做

**就像：** 一个能看能听能说的超级助手
            `,
            ja: `
## 出会う3種類のAI

### 1️⃣ 対話型AI（チャットボット）
**代表：** ChatGPT、Claude、Gemini

**できること：**
- 質問に回答
- 文章・メール作成
- 翻訳・要約
- コード作成

**例えると：** 博識なアシスタント

---

### 2️⃣ 画像AI（画像生成・処理）
**代表：** Midjourney、DALL-E、Stable Diffusion

**できること：**
- テキストから画像生成
- 画像編集
- 背景除去
- 高画質化

**例えると：** 絵を描けるアーティスト

---

### 3️⃣ マルチモーダルAI（万能型）
**代表：** GPT-4V、Gemini、Claude 3

**できること：**
- 画像を見て説明
- 動画理解
- テキストと画像の組み合わせ
- ほぼ何でも

**例えると：** 見て聞いて話せるスーパーアシスタント
            `
          }
        }
      ],
      practiceProject: {
        title: { zh: '找出身边的 AI', ja: '身近なAIを見つけよう' },
        description: {
          zh: '观察一天中使用的 App，记录哪些功能用到了 AI',
          ja: '1日使うアプリを観察し、AIを使っている機能を記録しよう'
        }
      }
    },

    // 模块 2: 动手玩 AI
    {
      id: 'hands-on-ai',
      title: { zh: '动手玩 AI', ja: 'AIを使ってみよう' },
      description: {
        zh: '实际操作主流 AI 工具',
        ja: '主要なAIツールを実際に使う'
      },
      icon: 'Gamepad2',
      gradient: 'from-blue-400 to-cyan-500',
      lessons: [
        {
          id: 'chatgpt-guide',
          title: { zh: 'ChatGPT 入门指南', ja: 'ChatGPT 入門ガイド' },
          duration: '15分',
          type: 'interactive',
          visualType: 'demo',
          content: {
            zh: `
## ChatGPT 快速入门

### 🚀 第一步：注册账号
1. 访问 chat.openai.com
2. 点击 Sign Up 注册
3. 可用 Google/Microsoft 账号登录

### 💬 第二步：开始对话
试试这些提示词：
\`\`\`
"请用小学生能懂的话解释什么是区块链"
"帮我写一封请假邮件，原因是家里有事"
"推荐 5 部类似《盗梦空间》的电影"
\`\`\`

### 🎯 第三步：进阶技巧
- **角色扮演**：「你是一位经验丰富的营养师...」
- **格式要求**：「请用表格形式列出...」
- **追问细节**：「能详细说说第三点吗？」

### ⚠️ 注意事项
- AI 可能会「一本正经地胡说八道」
- 重要信息请自行核实
- 不要输入敏感个人信息
            `,
            ja: `
## ChatGPT クイックスタート

### 🚀 ステップ1：アカウント登録
1. chat.openai.com にアクセス
2. Sign Up をクリック
3. Google/Microsoft アカウントでログイン可能

### 💬 ステップ2：会話を始める
試してみよう：
\`\`\`
「小学生にもわかるようにブロックチェーンを説明して」
「体調不良で休む旨のメールを書いて」
「インセプションに似た映画を5本おすすめして」
\`\`\`

### 🎯 ステップ3：応用テクニック
- **ロールプレイ**：「あなたは経験豊富な栄養士です...」
- **形式指定**：「表形式でまとめて...」
- **深掘り**：「3番目をもっと詳しく教えて」

### ⚠️ 注意点
- AIは「もっともらしい嘘」をつくことがある
- 重要な情報は自分で確認
- 個人情報は入力しない
            `
          }
        },
        {
          id: 'image-ai-guide',
          title: { zh: '图片 AI 工具体验', ja: '画像AIツール体験' },
          duration: '12分',
          type: 'interactive',
          visualType: 'demo',
          content: {
            zh: `
## 用 AI 生成图片

### 🎨 免费工具推荐

| 工具 | 特点 | 链接 |
|------|------|------|
| **Bing Image Creator** | 免费、中文友好 | bing.com/create |
| **Leonardo.ai** | 每天免费额度 | leonardo.ai |
| **Playground AI** | 简单易用 | playground.ai |

### ✍️ 写提示词的技巧

**基础公式：**
\`[主体] + [风格] + [细节] + [氛围]\`

**示例：**
\`\`\`
一只橘猫，穿着宇航服，在月球上，
皮克斯动画风格，可爱，高清
\`\`\`

### 🔑 关键词参考
- **风格**：水彩、油画、动漫、写实、赛博朋克
- **光线**：柔和光、霓虹灯、日落、电影感
- **构图**：特写、全景、俯视、仰视
            `,
            ja: `
## AIで画像を生成

### 🎨 おすすめ無料ツール

| ツール | 特徴 | リンク |
|------|------|------|
| **Bing Image Creator** | 無料・日本語対応 | bing.com/create |
| **Leonardo.ai** | 毎日無料クレジット | leonardo.ai |
| **Playground AI** | シンプルで使いやすい | playground.ai |

### ✍️ プロンプトのコツ

**基本公式：**
\`[被写体] + [スタイル] + [詳細] + [雰囲気]\`

**例：**
\`\`\`
オレンジ色の猫、宇宙服を着て、月面で、
ピクサーアニメ風、かわいい、高画質
\`\`\`

### 🔑 キーワード参考
- **スタイル**：水彩、油絵、アニメ、写実、サイバーパンク
- **光**：柔らかい光、ネオン、夕日、シネマティック
- **構図**：クローズアップ、パノラマ、俯瞰、あおり
            `
          }
        },
        {
          id: 'ai-tools-comparison',
          title: { zh: 'AI 工具大比较', ja: 'AIツール比較' },
          duration: '10分',
          type: 'reading',
          visualType: 'infographic',
          content: {
            zh: `
## 2024 主流 AI 工具对比

### 💬 对话类 AI

| 工具 | 优势 | 劣势 | 价格 |
|------|------|------|------|
| **ChatGPT** | 生态丰富、插件多 | 中文偶尔不够地道 | 免费/$20月 |
| **Claude** | 长文本、代码强 | 无插件生态 | 免费/$20月 |
| **文心一言** | 中文最佳、理解国情 | 创意略弱 | 免费 |
| **Gemini** | 多模态、搜索集成 | 中文支持一般 | 免费/$20月 |

### 🎨 图片生成类

| 工具 | 优势 | 劣势 | 价格 |
|------|------|------|------|
| **Midjourney** | 艺术感最强 | 需Discord | $10月起 |
| **DALL-E 3** | ChatGPT集成 | 风格偏卡通 | ChatGPT Plus内含 |
| **Stable Diffusion** | 免费开源 | 需要显卡 | 免费 |

### 🎵 音视频类

| 工具 | 功能 | 价格 |
|------|------|------|
| **Suno** | AI 作曲 | 免费额度 |
| **Runway** | AI 视频 | $15月起 |
| **ElevenLabs** | AI 配音 | 免费额度 |
            `,
            ja: `
## 2024年 主要AIツール比較

### 💬 対話型AI

| ツール | 強み | 弱み | 価格 |
|------|------|------|------|
| **ChatGPT** | エコシステム豊富 | 日本語が不自然な時も | 無料/$20月 |
| **Claude** | 長文・コード強い | プラグインなし | 無料/$20月 |
| **Gemini** | マルチモーダル | 日本語やや弱い | 無料/$20月 |
| **Copilot** | Office連携 | 機能限定的 | 無料/$20月 |

### 🎨 画像生成

| ツール | 強み | 弱み | 価格 |
|------|------|------|------|
| **Midjourney** | アート性最高 | Discord必要 | $10月〜 |
| **DALL-E 3** | ChatGPT統合 | カートゥーン寄り | Plus含む |
| **Stable Diffusion** | 無料オープンソース | GPU必要 | 無料 |

### 🎵 音声・動画

| ツール | 機能 | 価格 |
|------|------|------|
| **Suno** | AI作曲 | 無料枠あり |
| **Runway** | AI動画 | $15月〜 |
| **ElevenLabs** | AI音声 | 無料枠あり |
            `
          }
        }
      ],
      practiceProject: {
        title: { zh: '创建你的 AI 作品集', ja: 'AIポートフォリオを作ろう' },
        description: {
          zh: '用不同 AI 工具各创作一个作品，建立自己的 AI 作品集',
          ja: '様々なAIツールで作品を作り、ポートフォリオを作成'
        }
      }
    },

    // 模块 3: Prompt 工程入门
    {
      id: 'prompt-basics',
      title: { zh: 'Prompt 技巧', ja: 'プロンプト技法' },
      description: {
        zh: '学会和 AI 高效对话',
        ja: 'AIと効果的にコミュニケーション'
      },
      icon: 'MessageSquare',
      gradient: 'from-violet-400 to-purple-500',
      lessons: [
        {
          id: 'prompt-formula',
          title: { zh: 'Prompt 万能公式', ja: 'プロンプト万能公式' },
          duration: '10分',
          type: 'reading',
          visualType: 'diagram',
          content: {
            zh: `
## 写好 Prompt 的万能公式

### 📝 CRISPE 框架

| 要素 | 说明 | 示例 |
|------|------|------|
| **C**apacity | 角色 | "你是一位资深产品经理" |
| **R**equest | 任务 | "帮我写一份需求文档" |
| **I**nput | 输入 | "产品是一个健身App" |
| **S**tyle | 风格 | "正式、专业的语气" |
| **P**urpose | 目的 | "给开发团队看的" |
| **E**xtra | 补充 | "请包含用户故事" |

### 🎯 完整示例

\`\`\`
你是一位资深产品经理（角色）。

请帮我写一份 PRD 需求文档（任务），
产品是一个帮助用户记录每日饮食的 App（输入）。

请用专业、清晰的语气（风格），
这份文档是给开发团队参考的（目的）。

请包含：用户故事、功能列表、优先级排序（补充）。
\`\`\`
            `,
            ja: `
## 効果的なプロンプト公式

### 📝 CRISPE フレームワーク

| 要素 | 説明 | 例 |
|------|------|------|
| **C**apacity | 役割 | "あなたはベテランPMです" |
| **R**equest | タスク | "要件定義書を書いて" |
| **I**nput | 入力 | "フィットネスアプリ" |
| **S**tyle | スタイル | "フォーマルで専門的に" |
| **P**urpose | 目的 | "開発チーム向け" |
| **E**xtra | 補足 | "ユーザーストーリー含む" |

### 🎯 完全な例

\`\`\`
あなたはベテランのプロダクトマネージャーです（役割）。

PRD要件定義書を作成してください（タスク）。
製品は毎日の食事を記録するアプリです（入力）。

専門的で明確なトーンで（スタイル）、
開発チームが参照するためのものです（目的）。

含めてほしい内容：ユーザーストーリー、
機能一覧、優先順位（補足）。
\`\`\`
            `
          }
        },
        {
          id: 'prompt-mistakes',
          title: { zh: '常见 Prompt 错误', ja: 'よくあるプロンプトの間違い' },
          duration: '8分',
          type: 'reading',
          visualType: 'infographic',
          content: {
            zh: `
## 这些错误你犯过吗？

### ❌ 错误 1：太模糊
> "帮我写个文章"

✅ 改进：
> "帮我写一篇 800 字的公众号文章，主题是时间管理，面向职场新人，语气轻松有趣"

---

### ❌ 错误 2：一次问太多
> "帮我写文章、做PPT、还有视频脚本"

✅ 改进：
> 分步骤，一次一个任务

---

### ❌ 错误 3：不给例子
> "帮我起个好名字"

✅ 改进：
> "帮我给咖啡店起名字，风格参考：'%Arabica'、'Manner'这种简洁现代感的"

---

### ❌ 错误 4：不反馈
> 得到结果就结束

✅ 改进：
> "第二段再详细一点"、"换个更活泼的语气"
            `,
            ja: `
## こんな間違いしていませんか？

### ❌ 間違い1：曖昧すぎる
> 「記事を書いて」

✅ 改善：
> 「800字のブログ記事を書いて。テーマは時間管理、若手社会人向け、カジュアルで面白い感じで」

---

### ❌ 間違い2：一度に多すぎる
> 「記事とPPTと動画の台本を書いて」

✅ 改善：
> ステップごとに、1つずつタスクを依頼

---

### ❌ 間違い3：例がない
> 「いい名前を考えて」

✅ 改善：
> 「カフェの名前を考えて。'%Arabica'や'Blue Bottle'のようなシンプルでモダンな感じで」

---

### ❌ 間違い4：フィードバックしない
> 結果をもらって終わり

✅ 改善：
> 「2段落目をもっと詳しく」「もっと明るいトーンで」
            `
          }
        }
      ],
      practiceProject: {
        title: { zh: 'Prompt 改写挑战', ja: 'プロンプト改善チャレンジ' },
        description: {
          zh: '把模糊的 Prompt 改写成高效的 Prompt，对比效果差异',
          ja: '曖昧なプロンプトを効果的なものに改善し、結果を比較'
        }
      }
    },

    // 模块 4: AI 创作实践
    {
      id: 'ai-creation',
      title: { zh: 'AI 创作实践', ja: 'AI創作実践' },
      description: {
        zh: '用 AI 完成实际任务',
        ja: 'AIで実際のタスクを完成'
      },
      icon: 'Palette',
      gradient: 'from-green-400 to-emerald-500',
      lessons: [
        {
          id: 'ai-writing',
          title: { zh: 'AI 辅助写作', ja: 'AIライティング' },
          duration: '15分',
          type: 'practice',
          content: {
            zh: `
## 用 AI 写各种文案

### 📧 工作邮件
\`\`\`
帮我写一封邮件给客户，礼貌地催促他们确认合同细节。
背景：合同已发送一周，需要本周五前确认。
语气：专业但不失友好。
\`\`\`

### 📱 社交媒体
\`\`\`
帮我写一条小红书文案，分享我今天做的早餐。
内容：牛油果吐司 + 美式咖啡
风格：清新、生活感、带点幽默
要求：包含 3-5 个相关话题标签
\`\`\`

### 📝 会议纪要
\`\`\`
请根据以下要点整理成会议纪要：
- 讨论了Q2营销计划
- 决定增加短视频投入
- 小王负责抖音，小李负责小红书
- 下周三前提交具体方案
格式要求：标准会议纪要格式
\`\`\`
            `,
            ja: `
## AIでいろいろな文章を書く

### 📧 ビジネスメール
\`\`\`
クライアントに契約内容の確認を丁寧に催促するメールを書いて。
背景：契約書は1週間前に送付済み、今週金曜までに確認必要。
トーン：プロフェッショナルだが友好的に。
\`\`\`

### 📱 SNS投稿
\`\`\`
今日作った朝食をInstagramに投稿する文章を書いて。
内容：アボカドトースト＋アメリカーノ
スタイル：爽やか、日常感、少しユーモア
要件：関連ハッシュタグ3-5個含む
\`\`\`

### 📝 議事録
\`\`\`
以下のポイントを議事録にまとめて：
- Q2マーケティング計画を議論
- ショート動画への投資増加を決定
- 田中さんがTikTok担当、佐藤さんがInstagram担当
- 来週水曜までに具体案を提出
形式：標準的な議事録フォーマット
\`\`\`
            `
          }
        },
        {
          id: 'ai-learning',
          title: { zh: 'AI 辅助学习', ja: 'AI学習支援' },
          duration: '12分',
          type: 'practice',
          content: {
            zh: `
## 让 AI 成为你的私人教师

### 📚 概念解释
\`\`\`
请用费曼学习法给我解释「区块链」：
1. 先用简单的话解释核心概念
2. 用一个生活中的比喻
3. 指出常见的误解
4. 给我一个思考问题来检验理解
\`\`\`

### 🧠 知识问答
\`\`\`
我正在学习经济学，请扮演一位经济学教授：
- 当我说对时，鼓励我并深入讲解
- 当我说错时，引导我思考而不是直接纠正
- 用苏格拉底式提问
先问我第一个问题吧
\`\`\`

### 📖 读书笔记
\`\`\`
请帮我总结《原则》这本书：
1. 核心观点（3-5条）
2. 每个观点的具体案例
3. 如何应用到日常生活
4. 与其他书籍的关联推荐
\`\`\`
            `,
            ja: `
## AIを私専属の先生に

### 📚 概念説明
\`\`\`
フェインマン学習法で「ブロックチェーン」を説明して：
1. まず簡単な言葉で核心を説明
2. 日常生活の例え話を使って
3. よくある誤解を指摘
4. 理解を確認する問題を出して
\`\`\`

### 🧠 知識Q&A
\`\`\`
経済学を勉強中です。経済学教授になりきって：
- 正解の時は褒めて詳しく説明
- 間違いの時は直接訂正せず考えさせて
- ソクラテス式問答で
最初の質問をください
\`\`\`

### 📖 読書ノート
\`\`\`
「PRINCIPLES」の要約をお願い：
1. 核心ポイント（3-5個）
2. 各ポイントの具体例
3. 日常生活への応用方法
4. 関連するおすすめ本
\`\`\`
            `
          }
        }
      ],
      practiceProject: {
        title: { zh: '完成一个真实任务', ja: '実際のタスクを完成' },
        description: {
          zh: '选择一个你真正需要完成的任务，用 AI 辅助完成它',
          ja: '本当にやるべきタスクを選び、AIの助けで完成させよう'
        }
      }
    },

    // 模块 5: AI 伦理与安全
    {
      id: 'ai-ethics',
      title: { zh: 'AI 伦理与安全', ja: 'AI倫理と安全' },
      description: {
        zh: '安全、负责任地使用 AI',
        ja: '安全で責任あるAI活用'
      },
      icon: 'Shield',
      gradient: 'from-red-400 to-rose-500',
      lessons: [
        {
          id: 'ai-hallucination',
          title: { zh: 'AI 幻觉与事实核查', ja: 'AIハルシネーションと事実確認' },
          duration: '10分',
          type: 'reading',
          visualType: 'infographic',
          content: {
            zh: `
## AI 会「一本正经地胡说八道」

### 🤥 什么是 AI 幻觉？
AI 可能会：
- 编造不存在的研究论文
- 捏造假的引用和数据
- 胡编历史事件细节
- 虚构人物履历

### 🔍 如何识别？
| 危险信号 | 说明 |
|----------|------|
| 过于具体的数字 | "根据2023年的研究，87.3%的..." |
| 完美的引用格式 | 看起来专业，但可能是编的 |
| 无法验证的来源 | 找不到原始出处 |
| 与常识矛盾 | 听起来怪怪的 |

### ✅ 核查方法
1. **重要信息必须验证**：用搜索引擎查证
2. **要求提供来源**：让 AI 给出链接
3. **交叉验证**：用多个 AI 对比答案
4. **专业领域谨慎**：医疗、法律、财务等需专业确认
            `,
            ja: `
## AIは「もっともらしい嘘」をつく

### 🤥 AIハルシネーションとは？
AIが行う可能性があること：
- 存在しない研究論文を捏造
- 偽の引用やデータを作成
- 歴史的事実の詳細を創作
- 人物の経歴を虚構

### 🔍 見分け方
| 危険シグナル | 説明 |
|----------|------|
| 具体的すぎる数字 | "2023年の研究によると87.3%が..." |
| 完璧な引用形式 | 専門的に見えるが捏造かも |
| 確認できない出典 | 元のソースが見つからない |
| 常識と矛盾 | なんか変だなと感じる |

### ✅ 確認方法
1. **重要な情報は必ず検証**：検索エンジンで確認
2. **出典を要求**：AIにリンクを求める
3. **クロスチェック**：複数のAIで回答を比較
4. **専門分野は慎重に**：医療・法律・財務は専門家に確認
            `
          }
        },
        {
          id: 'ai-privacy',
          title: { zh: 'AI 与隐私保护', ja: 'AIとプライバシー保護' },
          duration: '8分',
          type: 'reading',
          content: {
            zh: `
## 使用 AI 时保护隐私

### 🚫 绝对不要输入的信息
- 身份证号、护照号
- 银行卡号、密码
- 详细家庭住址
- 公司机密文件
- 他人隐私信息

### ⚠️ 谨慎处理的信息
- 真实姓名（可用化名）
- 工作邮箱
- 公司项目细节
- 个人照片

### 🔒 安全使用技巧
1. **匿名化处理**：用 "张三" 代替真名
2. **模糊化细节**：用 "某科技公司" 代替真实公司名
3. **本地工具优先**：敏感任务用本地运行的 AI
4. **定期清理**：删除对话历史
            `,
            ja: `
## AI使用時のプライバシー保護

### 🚫 絶対に入力してはいけない情報
- マイナンバー、パスポート番号
- クレジットカード番号、パスワード
- 詳細な住所
- 会社の機密文書
- 他人の個人情報

### ⚠️ 慎重に扱うべき情報
- 本名（仮名を使用）
- 会社のメールアドレス
- 会社プロジェクトの詳細
- 個人写真

### 🔒 安全な使い方
1. **匿名化**：本名の代わりに「田中さん」を使用
2. **詳細をぼかす**：「某IT企業」のように
3. **ローカルツール優先**：機密タスクはローカルAIで
4. **定期的に削除**：会話履歴をクリア
            `
          }
        }
      ],
      practiceProject: {
        title: { zh: 'AI 信息核查练习', ja: 'AI情報ファクトチェック演習' },
        description: {
          zh: '让 AI 回答一些问题，然后验证答案的准确性',
          ja: 'AIに質問し、回答の正確性を検証してみよう'
        }
      }
    }
  ]
};

// ============================================
// 路径二：AI 技术进阶（面向IT从业者）
// ============================================
export const advancedPath: LearningPath = {
  id: 'advanced',
  title: { zh: 'AI 技术进阶', ja: 'AI技術アドバンス' },
  description: {
    zh: '系统学习 AI/ML 技术，从原理到实战',
    ja: 'AI/ML技術を体系的に学び、原理から実践まで'
  },
  targetAudience: {
    zh: '程序员、数据分析师、IT从业者',
    ja: 'プログラマー、データアナリスト、IT従事者'
  },
  duration: { zh: '约 40 小时', ja: '約40時間' },
  icon: 'Code',
  gradient: 'from-cyan-500 to-blue-600',
  modules: [
    {
      id: 'python-basics',
      title: { zh: 'Python 与数据基础', ja: 'Python とデータ基礎' },
      description: { zh: 'AI 开发必备基础', ja: 'AI開発の必須基礎' },
      icon: 'Terminal',
      gradient: 'from-yellow-400 to-orange-500',
      lessons: [
        {
          id: 'python-env',
          title: { zh: 'Python 环境配置', ja: 'Python環境構築' },
          duration: '30分',
          type: 'practice',
          content: { zh: 'Anaconda/pip 环境配置指南', ja: 'Anaconda/pip 環境構築ガイド' }
        },
        {
          id: 'numpy-pandas',
          title: { zh: 'NumPy & Pandas 基础', ja: 'NumPy & Pandas 基礎' },
          duration: '60分',
          type: 'practice',
          videoId: 'QUT1VHiLmmI',
          content: { zh: '数据处理核心库', ja: 'データ処理コアライブラリ' }
        },
        {
          id: 'data-viz',
          title: { zh: '数据可视化', ja: 'データ可視化' },
          duration: '45分',
          type: 'practice',
          content: { zh: 'Matplotlib, Seaborn 绘图', ja: 'Matplotlib, Seaborn でグラフ作成' }
        }
      ]
    },
    {
      id: 'ml-fundamentals',
      title: { zh: '机器学习核心', ja: '機械学習コア' },
      description: { zh: '监督学习、无监督学习、模型评估', ja: '教師あり学習、教師なし学習、モデル評価' },
      icon: 'Brain',
      gradient: 'from-blue-400 to-indigo-500',
      lessons: [
        {
          id: 'supervised-learning',
          title: { zh: '监督学习算法', ja: '教師あり学習アルゴリズム' },
          duration: '90分',
          type: 'video',
          videoId: 'aircAruvnKk',
          content: { zh: '回归、分类、决策树、SVM', ja: '回帰、分類、決定木、SVM' }
        },
        {
          id: 'unsupervised-learning',
          title: { zh: '无监督学习', ja: '教師なし学習' },
          duration: '60分',
          type: 'video',
          content: { zh: '聚类、降维、异常检测', ja: 'クラスタリング、次元削減、異常検知' }
        },
        {
          id: 'model-evaluation',
          title: { zh: '模型评估与调优', ja: 'モデル評価とチューニング' },
          duration: '60分',
          type: 'practice',
          content: { zh: '交叉验证、超参数调优', ja: '交差検証、ハイパーパラメータチューニング' }
        }
      ]
    },
    {
      id: 'deep-learning',
      title: { zh: '深度学习实战', ja: '深層学習実践' },
      description: { zh: 'PyTorch/TensorFlow 实战', ja: 'PyTorch/TensorFlow 実践' },
      icon: 'Layers',
      gradient: 'from-purple-400 to-pink-500',
      lessons: [
        {
          id: 'neural-network',
          title: { zh: '神经网络从零实现', ja: 'ニューラルネットワークをゼロから' },
          duration: '120分',
          type: 'practice',
          videoId: 'Ilg3gGewQ5U',
          content: { zh: '前向传播、反向传播、梯度下降', ja: '順伝播、逆伝播、勾配降下' }
        },
        {
          id: 'cnn-practice',
          title: { zh: 'CNN 图像分类', ja: 'CNN 画像分類' },
          duration: '90分',
          type: 'practice',
          content: { zh: '卷积层、池化层、图像分类实战', ja: '畳み込み層、プーリング層、画像分類実践' }
        },
        {
          id: 'transformer',
          title: { zh: 'Transformer 架构', ja: 'Transformer アーキテクチャ' },
          duration: '120分',
          type: 'video',
          videoId: 'wjZofJX0v4M',
          content: { zh: '注意力机制、位置编码、BERT', ja: 'アテンション機構、位置エンコーディング、BERT' }
        }
      ]
    },
    {
      id: 'llm-engineering',
      title: { zh: 'LLM 工程实践', ja: 'LLM エンジニアリング' },
      description: { zh: 'RAG、微调、Agent 开发', ja: 'RAG、ファインチューニング、Agent開発' },
      icon: 'Cpu',
      gradient: 'from-emerald-400 to-teal-500',
      lessons: [
        {
          id: 'llm-api',
          title: { zh: 'LLM API 开发', ja: 'LLM API 開発' },
          duration: '60分',
          type: 'practice',
          content: { zh: 'OpenAI/Claude API 调用实战', ja: 'OpenAI/Claude API 実践' }
        },
        {
          id: 'rag-system',
          title: { zh: 'RAG 系统构建', ja: 'RAGシステム構築' },
          duration: '120分',
          type: 'practice',
          content: { zh: '向量数据库、检索增强生成', ja: 'ベクトルDB、検索拡張生成' }
        },
        {
          id: 'fine-tuning',
          title: { zh: '模型微调', ja: 'モデルファインチューニング' },
          duration: '90分',
          type: 'practice',
          content: { zh: 'LoRA、QLoRA 微调实战', ja: 'LoRA、QLoRA ファインチューニング実践' }
        },
        {
          id: 'ai-agent',
          title: { zh: 'AI Agent 开发', ja: 'AI Agent 開発' },
          duration: '120分',
          type: 'practice',
          content: { zh: 'LangChain、工具调用、Agent 编排', ja: 'LangChain、ツール呼び出し、Agent オーケストレーション' }
        }
      ]
    },
    {
      id: 'mlops',
      title: { zh: 'AI 工程实践', ja: 'AI エンジニアリング' },
      description: { zh: '模型部署与运维', ja: 'モデルデプロイと運用' },
      icon: 'Server',
      gradient: 'from-gray-400 to-slate-600',
      lessons: [
        {
          id: 'model-deploy',
          title: { zh: '模型部署', ja: 'モデルデプロイ' },
          duration: '90分',
          type: 'practice',
          content: { zh: 'FastAPI、Docker、云部署', ja: 'FastAPI、Docker、クラウドデプロイ' }
        },
        {
          id: 'model-optimization',
          title: { zh: '推理优化', ja: '推論最適化' },
          duration: '60分',
          type: 'reading',
          content: { zh: '量化、蒸馏、ONNX', ja: '量子化、蒸留、ONNX' }
        }
      ]
    }
  ]
};

// 导出所有路径
export const learningPaths = [beginnerPath, advancedPath];

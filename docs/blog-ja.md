# StudyForge: AI駆動の試験対策プラットフォームを構築する

## はじめに

AWS認定試験などの資格試験の学習において、効率的な問題演習は非常に重要です。今回、**StudyForge**という試験対策プラットフォームを開発しました。本記事では、このプロジェクトの技術的な詳細について解説します。

## プロジェクト概要

StudyForgeは以下の2つのモジュールで構成されています：

1. **Webアプリケーション** - React + TypeScript + Vite で構築されたインタラクティブな問題演習システム
2. **動画生成ツール** - Python で構築された YouTube 解説動画自動生成システム

### デモ・リポジトリ

- 🌐 **ライブデモ**: [https://jackywangsh-studyforge.hf.space](https://jackywangsh-studyforge.hf.space)
- 📦 **GitHub**: [https://github.com/zixuniaowu/studyforge](https://github.com/zixuniaowu/studyforge)

## 技術スタック

### フロントエンド

| 技術 | 用途 |
|------|------|
| React 18 | UIフレームワーク |
| TypeScript | 型安全性 |
| Vite | ビルドツール |
| Tailwind CSS | スタイリング |
| Zustand | 状態管理 |
| Dexie.js | IndexedDB ラッパー |
| React Router | ルーティング |

### バックエンド（動画生成）

| 技術 | 用途 |
|------|------|
| Python 3.12 | メイン言語 |
| edge-tts | テキスト音声合成 |
| MoviePy | 動画編集 |
| Playwright | HTML→画像レンダリング |
| FFmpeg | 動画エンコード |

## 主な機能

### 1. マルチ言語対応

中国語と日本語の両方に対応しています。言語切り替えは画面右上のボタンから簡単に行えます。

```typescript
// i18n/index.ts
import { zhTranslations } from './zh';
import { jaTranslations } from './ja';

export const translations = {
  zh: zhTranslations,
  ja: jaTranslations,
};
```

### 2. 練習モード・試験モード

- **練習モード**: 各問題の後に即座に正解と解説を表示
- **試験モード**: 本番同様のタイマー付き、終了後に一括採点

```typescript
interface QuizSession {
  examId: string;
  mode: 'practice' | 'exam';
  answers: Record<string, string | string[]>;
  startTime: number;
  timeLimit?: number;
}
```

### 3. 誤答管理

IndexedDBを使用して、間違えた問題を自動的に記録。後で復習できます。

```typescript
// lib/db.ts
import Dexie from 'dexie';

class StudyForgeDB extends Dexie {
  wrongAnswers!: Table<WrongAnswer>;

  constructor() {
    super('studyforge');
    this.version(1).stores({
      wrongAnswers: '++id, examId, questionId, timestamp'
    });
  }
}
```

### 4. YouTube解説動画の自動生成

各問題セットに対して、以下の構成の解説動画を自動生成します：

1. **イントロ** - 試験名の紹介
2. **問題ごとの解説**
   - 問題文と選択肢の読み上げ
   - 考える時間（3秒）
   - 正解の発表
   - 詳細な解説
3. **アウトロ** - チャンネル登録の案内

## アーキテクチャ

### フロントエンド構成

```
web/
├── src/
│   ├── components/
│   │   ├── Layout/        # Header, LanguageSwitcher
│   │   ├── Exam/          # ExamCard, ImportExam
│   │   └── Quiz/          # QuestionCard, Navigation, Timer
│   ├── pages/
│   │   ├── HomePage.tsx   # 試験一覧
│   │   └── QuizPage.tsx   # 問題演習
│   ├── stores/
│   │   ├── examStore.ts   # 試験データ管理
│   │   ├── quizStore.ts   # 演習セッション管理
│   │   └── languageStore.ts # 言語設定
│   ├── lib/
│   │   ├── db.ts          # IndexedDB
│   │   └── import.ts      # 問題インポート
│   └── i18n/              # 多言語対応
└── public/
    └── sample-data/       # 問題データ (JSON)
```

### 動画生成フロー

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   問題JSON   │────▶│  TTS Engine │────▶│  音声ファイル │
└─────────────┘     │  (edge-tts) │     │    (.mp3)   │
                    └─────────────┘     └──────┬──────┘
                                               │
┌─────────────┐     ┌─────────────┐            │
│  HTML テンプ │────▶│  Playwright │────▶ スライド画像
│    レート    │     │  (Screenshot)│     (.png)
└─────────────┘     └─────────────┘            │
                                               ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   FFmpeg    │◀────│   MoviePy   │
                    │  (Concat)   │     │  (Compose)  │
                    └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  最終動画    │
                    │   (.mp4)    │
                    └─────────────┘
```

## 動画生成の実装詳細

### テキスト音声合成 (TTS)

Microsoft Edge の TTS エンジンを使用しています：

```python
# services/tts_engine.py
import edge_tts

class TTSEngine:
    VOICES = {
        'zh-CN': 'zh-CN-XiaoxiaoNeural',
        'ja-JP': 'ja-JP-NanamiNeural',
    }

    async def synthesize(self, text: str, output_path: str):
        communicate = edge_tts.Communicate(
            text,
            self.voice,
            rate=self.rate
        )
        await communicate.save(output_path)
```

### スライドレンダリング

Playwright を使用して HTML テンプレートを画像に変換：

```python
# services/slide_renderer.py
class SlideRenderer:
    async def render_question(self, question, output_path, num,
                              show_answer=False, language='zh'):
        html = self.generate_question_html(question, num, show_answer)
        await self.page.set_content(html)
        await self.page.screenshot(path=output_path)
```

### 動画合成

MoviePy で個別クリップを作成し、FFmpeg で結合：

```python
# 各クリップを個別に書き出し
for i, question in enumerate(questions, 1):
    clip, files = await self.generate_question_clip(question, i, total)
    clip_video = self.temp_dir / f"clip_{i:03d}_q{i}.mp4"
    self.write_clip_to_file(clip, str(clip_video))
    clip_files.append(str(clip_video))

# FFmpeg concat で結合
ffmpeg_cmd = [
    'ffmpeg', '-y', '-f', 'concat', '-safe', '0',
    '-i', str(concat_file),
    '-c', 'copy',
    output_path
]
subprocess.run(ffmpeg_cmd)
```

## デプロイメント

### Hugging Face Spaces へのデプロイ

Static SDK を使用して、ビルド済みの静態ファイルをデプロイ：

```yaml
# .github/workflows/deploy-huggingface.yml
- name: Build
  working-directory: ./web
  run: npm run build

- name: Deploy to Hugging Face Spaces
  run: |
    cd web/dist
    git push --force https://user:$HF_TOKEN@huggingface.co/spaces/$HF_SPACE_NAME main
```

### 注意点：静的ホスティングでのルーティング

Hugging Face Spaces などの静的ホスティングでは、`BrowserRouter` ではなく `HashRouter` を使用する必要があります：

```typescript
// App.tsx
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
      </Routes>
    </HashRouter>
  );
}
```

## 生成された動画

AWS AIF-C01 模擬試験の解説動画を6本生成しました：

| セット | 言語 | サイズ | 時間 |
|--------|------|--------|------|
| Set 1 | 中国語 | 59MB | 41分 |
| Set 1 | 日本語 | 81MB | 56分 |
| Set 2 | 中国語 | 51MB | 35分 |
| Set 2 | 日本語 | 69MB | 48分 |
| Set 3 | 中国語 | 47MB | 33分 |
| Set 3 | 日本語 | 154MB | 45分 |

## 今後の展望

1. **Google ログイン連携** - 学習進捗のクラウド同期
2. **より多くの試験対応** - AWS 以外の認定試験
3. **AI 解説生成** - LLM を使用した解説の自動生成
4. **モバイルアプリ** - React Native での展開

## まとめ

StudyForge は、モダンな Web 技術と AI 音声合成を組み合わせた試験対策プラットフォームです。フロントエンドは React + TypeScript で型安全に、動画生成は Python + FFmpeg で効率的に実装しました。

特に、MoviePy と FFmpeg を組み合わせた動画生成パイプラインは、長時間の動画でも安定して動作するよう、各クリップを個別にエンコードしてから結合する方式を採用しています。

ぜひ試してみてください！

---

**著者**: StudyForge Team
**公開日**: 2025年12月24日
**タグ**: #React #TypeScript #Python #TTS #MoviePy #AWS認定試験

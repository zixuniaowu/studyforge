# StudyForge - 通用考试模拟平台 + AI视频讲解系统

## 项目概述

**StudyForge** 是一个通用考试备考平台，包含两个独立模块：
1. **Web答题系统** - 部署到 Hugging Face Spaces（静态网站）
2. **视频生成器** - 本地 Python 运行，生成题目讲解视频

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                       StudyForge                             │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                  │
│   📱 Hugging Face        │   💻 本地 Python                  │
│   (web/)                 │   (video-generator/)             │
│                          │                                  │
│   • React + Vite         │   • Edge-TTS 语音合成            │
│   • Tailwind CSS         │   • PPT/HTML 画面生成            │
│   • Google 登录          │   • MoviePy + FFmpeg             │
│   • IndexedDB 存储       │   • 批量处理                      │
│   • 多考试题库支持        │   • 多语言支持                    │
│                          │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

---

## 项目目录结构

```
studyforge/
│
├── web/                           # 🌐 Hugging Face 答题系统
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── Auth/
│   │   │   │   └── GoogleLogin.tsx
│   │   │   ├── Exam/
│   │   │   │   ├── ExamList.tsx        # 考试列表
│   │   │   │   ├── ExamCard.tsx        # 考试卡片
│   │   │   │   └── ImportExam.tsx      # 导入题库
│   │   │   ├── Quiz/
│   │   │   │   ├── QuizPage.tsx        # 答题主页
│   │   │   │   ├── QuestionCard.tsx    # 题目卡片
│   │   │   │   ├── OptionList.tsx      # 选项列表
│   │   │   │   ├── Navigation.tsx      # 题目导航
│   │   │   │   ├── Timer.tsx           # 计时器
│   │   │   │   └── Explanation.tsx     # 解析展示
│   │   │   ├── Result/
│   │   │   │   ├── ResultPage.tsx      # 结果页
│   │   │   │   ├── ScoreChart.tsx      # 成绩图表
│   │   │   │   └── DomainStats.tsx     # 领域统计
│   │   │   └── WrongBook/
│   │   │       ├── WrongList.tsx       # 错题列表
│   │   │       └── WrongReview.tsx     # 错题复习
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useExam.ts
│   │   │   ├── useQuiz.ts
│   │   │   └── useStorage.ts
│   │   ├── stores/
│   │   │   ├── examStore.ts            # Zustand 考试状态
│   │   │   ├── quizStore.ts            # 答题状态
│   │   │   └── userStore.ts            # 用户状态
│   │   ├── lib/
│   │   │   ├── db.ts                   # IndexedDB (Dexie)
│   │   │   ├── import.ts               # 导入工具
│   │   │   └── export.ts               # 导出工具
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript 类型定义
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   └── sample-data/                # 示例题库
│   │       └── aws-aif-c01.json
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── README.md                       # Hugging Face Space 配置
│
├── video-generator/               # 🎬 本地视频生成
│   ├── src/
│   │   ├── __init__.py
│   │   ├── script_generator.py    # 讲解脚本生成
│   │   ├── tts_engine.py          # TTS 语音合成
│   │   ├── slide_renderer.py      # 画面渲染
│   │   ├── video_composer.py      # 视频合成
│   │   └── batch_processor.py     # 批量处理
│   ├── templates/
│   │   ├── pptx/                  # PPT 模板
│   │   │   ├── dark-tech.pptx
│   │   │   └── light-clean.pptx
│   │   └── html/                  # HTML 模板
│   │       ├── question.html
│   │       ├── options.html
│   │       ├── answer.html
│   │       └── explanation.html
│   ├── output/
│   │   ├── audio/                 # 生成的音频
│   │   ├── images/                # 生成的图片
│   │   └── videos/                # 生成的视频
│   ├── config.py                  # 配置文件
│   ├── main.py                    # 主入口
│   ├── requirements.txt
│   └── README.md
│
├── data/                          # 📚 共享题库数据
│   └── exams/
│       ├── aws-aif-c01.json       # AWS AI Practitioner
│       ├── azure-ai-102.json      # Azure AI Engineer
│       └── ...
│
└── README.md                      # 项目总说明
```

---

# Part 1: Web 答题系统 (Hugging Face)

## 技术栈

- **框架**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **数据存储**: IndexedDB (Dexie.js)
- **登录**: Google Identity Services
- **部署**: Hugging Face Spaces (Static)

---

## 数据结构定义

### types/index.ts

```typescript
// 考试定义
export interface Exam {
  id: string;
  name: string;                      // "AWS Certified AI Practitioner"
  code: string;                      // "AIF-C01"
  provider: string;                  // "AWS" | "Microsoft" | "Google" | "PMI" | "JLPT" | "Custom"
  language: string;                  // "zh-CN" | "ja" | "en"
  description?: string;
  totalQuestions: number;
  passingScore: number;              // 及格分数百分比
  examTime: number;                  // 考试时间（分钟）
  domains: Domain[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 领域/章节
export interface Domain {
  id: number;
  name: string;
  nameLocalized?: string;
  weight: number;                    // 权重百分比
  questionCount?: number;
}

// 题目
export interface Question {
  id: string;
  examId: string;
  setNumber: number;                 // 第几套题
  domain: number;                    // 所属领域
  question: string;
  questionHtml?: string;
  options: Record<string, string>;   // {"A": "选项A", "B": "选项B", ...}
  answer: string | string[];         // 单选 "A" 或 多选 ["A", "C"]
  answerType: "single" | "multiple";
  explanation: string;
  explanationHtml?: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
}

// 用户答题记录
export interface QuizSession {
  id: string;
  odId: string;
  odId: string;
  odId: "practice" | "exam";
  questions: string[];               // 题目ID列表
  answers: Record<string, string>;   // {questionId: "A"}
  startTime: string;
  endTime?: string;
  score?: number;
  completed: boolean;
}

// 错题记录
export interface WrongAnswer {
  id: string;
  odId: string;
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  wrongCount: number;
  lastWrongAt: string;
  mastered: boolean;
}

// 用户信息
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google";
  createdAt: string;
}
```

---

## IndexedDB 设置

### lib/db.ts

```typescript
import Dexie, { Table } from 'dexie';
import { Exam, Question, QuizSession, WrongAnswer, User } from '../types';

export class StudyForgeDB extends Dexie {
  exams!: Table<Exam>;
  questions!: Table<Question>;
  quizSessions!: Table<QuizSession>;
  wrongAnswers!: Table<WrongAnswer>;
  users!: Table<User>;

  constructor() {
    super('StudyForgeDB');
    
    this.version(1).stores({
      exams: 'id, provider, language, code',
      questions: 'id, examId, domain, setNumber, [examId+domain], [examId+setNumber]',
      quizSessions: 'id, odId, odId, startTime',
      wrongAnswers: 'id, odId, questionId, [examId+odId]',
      users: 'id, email'
    });
  }
}

export const db = new StudyForgeDB();

// 常用操作
export const examDB = {
  // 获取所有考试
  async getAllExams(): Promise<Exam[]> {
    return db.exams.toArray();
  },

  // 获取考试详情
  async getExam(id: string): Promise<Exam | undefined> {
    return db.exams.get(id);
  },

  // 导入考试和题目
  async importExam(exam: Exam, questions: Question[]): Promise<void> {
    await db.transaction('rw', [db.exams, db.questions], async () => {
      await db.exams.put(exam);
      await db.questions.bulkPut(questions);
    });
  },

  // 获取考试的所有题目
  async getQuestions(examId: string): Promise<Question[]> {
    return db.questions.where('examId').equals(examId).toArray();
  },

  // 获取特定套题
  async getQuestionsBySet(examId: string, setNumber: number): Promise<Question[]> {
    return db.questions.where({ examId, setNumber }).toArray();
  },

  // 获取特定领域题目
  async getQuestionsByDomain(examId: string, domain: number): Promise<Question[]> {
    return db.questions.where({ examId, domain }).toArray();
  },

  // 删除考试
  async deleteExam(examId: string): Promise<void> {
    await db.transaction('rw', [db.exams, db.questions], async () => {
      await db.exams.delete(examId);
      await db.questions.where('examId').equals(examId).delete();
    });
  }
};

export const wrongDB = {
  // 添加错题
  async addWrongAnswer(wrong: WrongAnswer): Promise<void> {
    const existing = await db.wrongAnswers
      .where({ odId: wrong.examId, questionId: wrong.questionId })
      .first();
    
    if (existing) {
      await db.wrongAnswers.update(existing.id, {
        wrongCount: existing.wrongCount + 1,
        lastWrongAt: new Date().toISOString(),
        userAnswer: wrong.userAnswer
      });
    } else {
      await db.wrongAnswers.add(wrong);
    }
  },

  // 获取错题列表
  async getWrongAnswers(examId: string): Promise<WrongAnswer[]> {
    return db.wrongAnswers.where('examId').equals(examId).toArray();
  },

  // 标记已掌握
  async markMastered(id: string): Promise<void> {
    await db.wrongAnswers.update(id, { mastered: true });
  }
};
```

---

## 状态管理

### stores/quizStore.ts

```typescript
import { create } from 'zustand';
import { Question } from '../types';

interface QuizState {
  // 状态
  mode: 'practice' | 'exam' | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;
  markedQuestions: Set<string>;
  startTime: Date | null;
  timeRemaining: number;  // 秒
  showResult: boolean;
  
  // 操作
  startQuiz: (mode: 'practice' | 'exam', questions: Question[], timeLimit?: number) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  toggleMark: (questionId: string) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  tick: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  mode: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  markedQuestions: new Set(),
  startTime: null,
  timeRemaining: 0,
  showResult: false,

  startQuiz: (mode, questions, timeLimit) => {
    set({
      mode,
      questions,
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      startTime: new Date(),
      timeRemaining: timeLimit ? timeLimit * 60 : 0,
      showResult: false
    });
  },

  answerQuestion: (questionId, answer) => {
    set(state => ({
      answers: { ...state.answers, [questionId]: answer }
    }));
  },

  goToQuestion: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index });
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  toggleMark: (questionId) => {
    set(state => {
      const newMarked = new Set(state.markedQuestions);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return { markedQuestions: newMarked };
    });
  },

  submitQuiz: () => {
    set({ showResult: true });
  },

  resetQuiz: () => {
    set({
      mode: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      markedQuestions: new Set(),
      startTime: null,
      timeRemaining: 0,
      showResult: false
    });
  },

  tick: () => {
    set(state => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1)
    }));
  }
}));
```

---

## 核心组件

### components/Quiz/QuestionCard.tsx

```tsx
import React from 'react';
import { Question } from '../../types';
import { useQuizStore } from '../../stores/quizStore';
import { CheckCircle, XCircle, Flag } from 'lucide-react';

interface Props {
  question: Question;
  showAnswer?: boolean;
}

export const QuestionCard: React.FC<Props> = ({ question, showAnswer = false }) => {
  const { answers, answerQuestion, toggleMark, markedQuestions, mode } = useQuizStore();
  const userAnswer = answers[question.id];
  const isMarked = markedQuestions.has(question.id);
  const isCorrect = userAnswer === question.answer;

  const getOptionClass = (key: string) => {
    const base = "p-4 rounded-lg border-2 cursor-pointer transition-all";
    
    if (!showAnswer && mode === 'practice') {
      // 练习模式：答题后立即显示
      if (userAnswer) {
        if (key === question.answer) {
          return `${base} border-green-500 bg-green-50`;
        }
        if (key === userAnswer && key !== question.answer) {
          return `${base} border-red-500 bg-red-50`;
        }
      }
    }
    
    if (showAnswer) {
      // 考试模式：提交后显示
      if (key === question.answer) {
        return `${base} border-green-500 bg-green-50`;
      }
      if (key === userAnswer && key !== question.answer) {
        return `${base} border-red-500 bg-red-50`;
      }
    }
    
    // 已选择但未显示答案
    if (key === userAnswer) {
      return `${base} border-blue-500 bg-blue-50`;
    }
    
    return `${base} border-gray-200 hover:border-gray-400 hover:bg-gray-50`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* 题目头部 */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">
          Domain {question.domain} · {question.difficulty || 'medium'}
        </span>
        <button
          onClick={() => toggleMark(question.id)}
          className={`p-2 rounded-full ${isMarked ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          <Flag size={20} fill={isMarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 题目内容 */}
      <div className="text-lg font-medium mb-6 leading-relaxed">
        {question.question}
      </div>

      {/* 选项列表 */}
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <div
            key={key}
            onClick={() => !showAnswer && answerQuestion(question.id, key)}
            className={getOptionClass(key)}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                {key}
              </span>
              <span className="flex-1">{value}</span>
              {showAnswer && key === question.answer && (
                <CheckCircle className="text-green-500" size={24} />
              )}
              {showAnswer && key === userAnswer && key !== question.answer && (
                <XCircle className="text-red-500" size={24} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 解析（练习模式答题后显示） */}
      {mode === 'practice' && userAnswer && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span className="font-medium">
              {isCorrect ? '回答正确！' : `回答错误，正确答案是 ${question.answer}`}
            </span>
          </div>
          <div className="text-gray-700 whitespace-pre-line">
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## Google 登录配置

### components/Auth/GoogleLogin.tsx

```tsx
import React, { useEffect } from 'react';
import { useUserStore } from '../../stores/userStore';

// 在 index.html 中添加:
// <script src="https://accounts.google.com/gsi/client" async defer></script>

const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

export const GoogleLogin: React.FC = () => {
  const { setUser, user, logout } = useUserStore();

  useEffect(() => {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      if (!user) {
        google.accounts.id.renderButton(
          document.getElementById('google-login-btn'),
          { theme: 'outline', size: 'large', width: 250 }
        );
      }
    }
  }, [user]);

  const handleCredentialResponse = (response: any) => {
    // 解码 JWT token
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    setUser({
      id visually: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      provider: 'google',
      createdAt: new Date().toISOString()
    });
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
        <span>{user.name}</span>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
          登出
        </button>
      </div>
    );
  }

  return <div id="google-login-btn" />;
};
```

---

## Hugging Face Space 配置

### web/README.md

```yaml
---
title: StudyForge - 考试模拟平台
emoji: 📚
colorFrom: blue
colorTo: purple
sdk: static
pinned: false
---

# StudyForge

通用考试模拟平台，支持多种认证考试备考。

## 功能

- 📝 多考试题库支持
- 🎯 练习/考试双模式
- 📊 成绩统计分析
- 📚 错题本管理
- 🔐 Google 账号登录

## 支持的考试

- AWS Certified AI Practitioner (AIF-C01)
- Azure AI Engineer (AI-102)
- 更多考试持续添加中...
```

---

# Part 2: 视频生成器 (本地 Python)

## 技术栈

- **TTS**: Edge-TTS（免费、高质量、支持中日英）
- **画面渲染**: Playwright (HTML→图片) / python-pptx
- **视频合成**: MoviePy + FFmpeg
- **CLI**: Click / Typer

---

## Python 依赖

### video-generator/requirements.txt

```txt
edge-tts>=6.1.0
moviepy>=1.0.3
Pillow>=10.0.0
python-pptx>=0.6.21
playwright>=1.40.0
jinja2>=3.1.2
aiofiles>=23.2.1
tqdm>=4.66.0
typer>=0.9.0
rich>=13.0.0
```

---

## 配置文件

### video-generator/config.py

```python
from pathlib import Path

# 目录配置
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR.parent / "data"
OUTPUT_DIR = BASE_DIR / "output"
TEMPLATE_DIR = BASE_DIR / "templates"

# 确保目录存在
(OUTPUT_DIR / "audio").mkdir(parents=True, exist_ok=True)
(OUTPUT_DIR / "images").mkdir(parents=True, exist_ok=True)
(OUTPUT_DIR / "videos").mkdir(parents=True, exist_ok=True)

# TTS 语音配置
VOICES = {
    "zh-CN": {
        "female": "zh-CN-XiaoxiaoNeural",
        "male": "zh-CN-YunxiNeural",
    },
    "ja": {
        "female": "ja-JP-NanamiNeural",
        "male": "ja-JP-KeitaNeural",
    },
    "en": {
        "female": "en-US-JennyNeural",
        "male": "en-US-GuyNeural",
    }
}

# 视频配置
VIDEO_CONFIG = {
    "resolution": (1920, 1080),
    "fps": 30,
    "codec": "libx264",
    "audio_codec": "aac",
}

# 模板样式
STYLES = {
    "dark-tech": {
        "bg_color": "#1a1a2e",
        "text_color": "#ffffff",
        "accent_color": "#00d4ff",
        "correct_color": "#22c55e",
        "wrong_color": "#ef4444",
    },
    "light-clean": {
        "bg_color": "#f8fafc",
        "text_color": "#1e293b",
        "accent_color": "#3b82f6",
        "correct_color": "#16a34a",
        "wrong_color": "#dc2626",
    }
}
```

---

## TTS 引擎

### video-generator/src/tts_engine.py

```python
import edge_tts
import asyncio
from pathlib import Path
from typing import Optional
from config import VOICES, OUTPUT_DIR

class TTSEngine:
    def __init__(self, language: str = "zh-CN", gender: str = "female"):
        self.voice = VOICES.get(language, VOICES["zh-CN"]).get(gender, "female")
        self.output_dir = OUTPUT_DIR / "audio"
    
    async def generate_audio(
        self, 
        text: str, 
        output_name: str,
        rate: str = "+0%",
        volume: str = "+0%"
    ) -> Path:
        """生成单个音频文件"""
        output_path = self.output_dir / f"{output_name}.mp3"
        
        communicate = edge_tts.Communicate(
            text, 
            self.voice,
            rate=rate,
            volume=volume
        )
        await communicate.save(str(output_path))
        
        return output_path
    
    async def generate_batch(
        self, 
        texts: list[tuple[str, str]],  # [(text, output_name), ...]
        rate: str = "+0%"
    ) -> list[Path]:
        """批量生成音频"""
        tasks = [
            self.generate_audio(text, name, rate)
            for text, name in texts
        ]
        return await asyncio.gather(*tasks)
    
    def generate_sync(self, text: str, output_name: str) -> Path:
        """同步方式生成（方便调用）"""
        return asyncio.run(self.generate_audio(text, output_name))


# 使用示例
if __name__ == "__main__":
    tts = TTSEngine(language="zh-CN", gender="female")
    
    # 单个生成
    path = tts.generate_sync(
        "大家好，今天我们来讲解AWS AI Practitioner的一道题目。",
        "intro_test"
    )
    print(f"生成音频: {path}")
```

---

## 画面渲染器

### video-generator/src/slide_renderer.py

```python
from playwright.sync_api import sync_playwright
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from config import TEMPLATE_DIR, OUTPUT_DIR, STYLES

class SlideRenderer:
    def __init__(self, style: str = "dark-tech"):
        self.style = STYLES.get(style, STYLES["dark-tech"])
        self.output_dir = OUTPUT_DIR / "images"
        self.env = Environment(loader=FileSystemLoader(TEMPLATE_DIR / "html"))
    
    def render_question_slide(
        self, 
        question_id: str,
        question_text: str,
        segment: str = "question"
    ) -> Path:
        """渲染题目页"""
        template = self.env.get_template("question.html")
        html = template.render(
            question=question_text,
            style=self.style
        )
        
        output_path = self.output_dir / f"{question_id}_{segment}.png"
        self._html_to_image(html, output_path)
        return output_path
    
    def render_options_slide(
        self,
        question_id: str,
        options: dict,
        highlight: str = None,  # 高亮某个选项
        correct: str = None     # 标记正确答案
    ) -> Path:
        """渲染选项页"""
        template = self.env.get_template("options.html")
        html = template.render(
            options=options,
            highlight=highlight,
            correct=correct,
            style=self.style
        )
        
        suffix = "_answer" if correct else "_options"
        output_path = self.output_dir / f"{question_id}{suffix}.png"
        self._html_to_image(html, output_path)
        return output_path
    
    def render_explanation_slide(
        self,
        question_id: str,
        explanation: str,
        answer: str
    ) -> Path:
        """渲染解析页"""
        template = self.env.get_template("explanation.html")
        html = template.render(
            explanation=explanation,
            answer=answer,
            style=self.style
        )
        
        output_path = self.output_dir / f"{question_id}_explanation.png"
        self._html_to_image(html, output_path)
        return output_path
    
    def _html_to_image(self, html: str, output_path: Path):
        """HTML 转图片"""
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={'width': 1920, 'height': 1080})
            page.set_content(html)
            page.screenshot(path=str(output_path))
            browser.close()
```

---

## HTML 模板示例

### video-generator/templates/html/question.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            width: 1920px;
            height: 1080px;
            background: {{ style.bg_color }};
            color: {{ style.text_color }};
            font-family: 'Noto Sans SC', sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 80px 120px;
        }
        .header {
            font-size: 24px;
            color: {{ style.accent_color }};
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 4px;
        }
        .question {
            font-size: 42px;
            font-weight: 500;
            line-height: 1.6;
            max-width: 1400px;
        }
        .decoration {
            position: absolute;
            bottom: 60px;
            right: 80px;
            width: 200px;
            height: 4px;
            background: {{ style.accent_color }};
        }
    </style>
</head>
<body>
    <div class="header">Question</div>
    <div class="question">{{ question }}</div>
    <div class="decoration"></div>
</body>
</html>
```

---

## 视频合成器

### video-generator/src/video_composer.py

```python
from moviepy.editor import (
    ImageClip, AudioFileClip, concatenate_videoclips, 
    CompositeVideoClip, TextClip
)
from pathlib import Path
from typing import List
from config import OUTPUT_DIR, VIDEO_CONFIG

class VideoComposer:
    def __init__(self):
        self.output_dir = OUTPUT_DIR / "videos"
    
    def compose_video(
        self,
        segments: List[dict],  # [{"image": Path, "audio": Path}, ...]
        output_name: str,
        add_transitions: bool = True
    ) -> Path:
        """合成完整视频"""
        clips = []
        
        for segment in segments:
            # 加载音频获取时长
            audio = AudioFileClip(str(segment["audio"]))
            duration = audio.duration
            
            # 创建图片clip
            image = ImageClip(str(segment["image"]))
            image = image.set_duration(duration + 0.5)  # 额外0.5秒缓冲
            
            # 合并音视频
            video = image.set_audio(audio)
            clips.append(video)
        
        # 拼接所有片段
        final = concatenate_videoclips(clips, method="compose")
        
        # 导出
        output_path = self.output_dir / f"{output_name}.mp4"
        final.write_videofile(
            str(output_path),
            fps=VIDEO_CONFIG["fps"],
            codec=VIDEO_CONFIG["codec"],
            audio_codec=VIDEO_CONFIG["audio_codec"],
            threads=4
        )
        
        # 清理
        final.close()
        for clip in clips:
            clip.close()
        
        return output_path
```

---

## 批量处理器

### video-generator/src/batch_processor.py

```python
import json
import asyncio
from pathlib import Path
from tqdm import tqdm
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn

from tts_engine import TTSEngine
from slide_renderer import SlideRenderer
from video_composer import VideoComposer
from config import DATA_DIR

console = Console()

class BatchProcessor:
    def __init__(
        self, 
        language: str = "zh-CN",
        style: str = "dark-tech"
    ):
        self.tts = TTSEngine(language=language)
        self.renderer = SlideRenderer(style=style)
        self.composer = VideoComposer()
    
    def load_questions(self, exam_file: str) -> list:
        """加载题库"""
        path = DATA_DIR / "exams" / exam_file
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data.get("questions", [])
    
    async def process_question(self, question: dict) -> Path:
        """处理单个题目"""
        qid = question["id"]
        segments = []
        
        # 1. 生成题目音频和画面
        intro_text = f"我们来看第{qid}题。{question['question']}"
        intro_audio = await self.tts.generate_audio(intro_text, f"{qid}_intro")
        intro_image = self.renderer.render_question_slide(qid, question["question"])
        segments.append({"image": intro_image, "audio": intro_audio})
        
        # 2. 选项展示
        options_text = "选项分别是：" + "。".join(
            f"{k}、{v}" for k, v in question["options"].items()
        )
        options_audio = await self.tts.generate_audio(options_text, f"{qid}_options")
        options_image = self.renderer.render_options_slide(qid, question["options"])
        segments.append({"image": options_image, "audio": options_audio})
        
        # 3. 答案揭晓
        answer = question["answer"]
        answer_text = f"正确答案是{answer}。"
        answer_audio = await self.tts.generate_audio(answer_text, f"{qid}_answer")
        answer_image = self.renderer.render_options_slide(
            qid, question["options"], correct=answer
        )
        segments.append({"image": answer_image, "audio": answer_audio})
        
        # 4. 解析
        explain_audio = await self.tts.generate_audio(
            question["explanation"], f"{qid}_explanation"
        )
        explain_image = self.renderer.render_explanation_slide(
            qid, question["explanation"], answer
        )
        segments.append({"image": explain_image, "audio": explain_audio})
        
        # 5. 合成视频
        video_path = self.composer.compose_video(segments, f"Q{qid}")
        
        return video_path
    
    async def process_batch(
        self, 
        exam_file: str,
        start: int = 1,
        end: int = None
    ):
        """批量处理题目"""
        questions = self.load_questions(exam_file)
        
        if end:
            questions = [q for q in questions if start <= int(q["id"]) <= end]
        
        console.print(f"[bold green]开始处理 {len(questions)} 道题目[/]")
        
        for question in tqdm(questions, desc="生成视频"):
            try:
                video_path = await self.process_question(question)
                console.print(f"[green]✓[/] Q{question['id']} → {video_path.name}")
            except Exception as e:
                console.print(f"[red]✗[/] Q{question['id']} 失败: {e}")


# CLI 入口
if __name__ == "__main__":
    import typer
    
    app = typer.Typer()
    
    @app.command()
    def generate(
        exam: str = typer.Argument(..., help="题库文件名，如 aws-aif-c01.json"),
        start: int = typer.Option(1, help="起始题号"),
        end: int = typer.Option(None, help="结束题号"),
        language: str = typer.Option("zh-CN", help="语言：zh-CN/ja/en"),
        style: str = typer.Option("dark-tech", help="样式：dark-tech/light-clean")
    ):
        """批量生成题目讲解视频"""
        processor = BatchProcessor(language=language, style=style)
        asyncio.run(processor.process_batch(exam, start, end))
    
    app()
```

---

## 使用方法

```bash
# 安装依赖
cd studyforge/video-generator
pip install -r requirements.txt
playwright install chromium

# 生成视频
python src/batch_processor.py aws-aif-c01.json --start 1 --end 10

# 指定语言和样式
python src/batch_processor.py aws-aif-c01.json --language zh-CN --style dark-tech
```

---

## 开发顺序

### Week 1: 答题系统
1. 初始化 React + Vite 项目
2. 实现 IndexedDB 数据层
3. 实现题库导入功能
4. 实现答题界面
5. 部署到 Hugging Face

### Week 2: 视频生成
1. 搭建 Python 项目结构
2. 实现 TTS 引擎
3. 实现画面渲染器
4. 实现视频合成
5. 实现批量处理 CLI

---

开始开发吧！🚀

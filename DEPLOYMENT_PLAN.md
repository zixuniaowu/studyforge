# StudyForge 部署规划

## 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                  Hugging Face Spaces                     │
│                    (Docker Space)                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │    Frontend     │    │         Backend             │ │
│  │  (React 静态)   │    │        (FastAPI)            │ │
│  │                 │    │                             │ │
│  │  - 答题界面     │    │  - Google OAuth             │ │
│  │  - 统计仪表板   │    │  - 用户数据 API             │ │
│  │  - 错题本       │    │  - 视频生成 API             │ │
│  └─────────────────┘    └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │    Supabase     │
                    │  (免费 PostgreSQL)│
                    │                 │
                    │  - 用户表       │
                    │  - 进度表       │
                    │  - 错题表       │
                    └─────────────────┘
```

---

## 技术栈推荐

### 后端框架比较

| 框架 | 语言 | 视频生成 | 学习曲线 | HF兼容性 |
|------|------|----------|----------|----------|
| **FastAPI** | Python | ✅ 原生支持 | 低 | ✅ 最佳 |
| Express | Node.js | ❌ 需调用Python | 低 | ✅ 好 |
| Flask | Python | ✅ 原生支持 | 最低 | ✅ 好 |

**推荐：FastAPI**
- 异步支持，性能好
- 自动生成 API 文档
- 类型提示，开发体验好
- 视频生成（MoviePy, edge-tts）原生 Python

---

## 数据库选择

### 免费选项对比

| 服务 | 免费额度 | 特点 |
|------|----------|------|
| **Supabase** | 500MB, 无限API | PostgreSQL, 内置Auth |
| MongoDB Atlas | 512MB | NoSQL, 灵活 |
| PlanetScale | 5GB | MySQL, 分支功能 |
| Turso | 8GB | SQLite边缘数据库 |

**推荐：Supabase**
- 免费 PostgreSQL
- 内置 Google OAuth（可选）
- 实时订阅功能
- 免费额度够用

---

## 项目结构（最终）

```
studyforge/
├── backend/                    # FastAPI 后端
│   ├── main.py                 # 入口
│   ├── routers/
│   │   ├── auth.py             # Google OAuth
│   │   ├── exams.py            # 考试 API
│   │   ├── progress.py         # 进度同步 API
│   │   └── video.py            # 视频生成 API
│   ├── services/
│   │   ├── tts_engine.py       # Edge-TTS 语音
│   │   ├── slide_renderer.py   # Playwright 渲染
│   │   └── video_composer.py   # MoviePy 合成
│   ├── models/
│   │   └── schemas.py          # Pydantic 模型
│   └── requirements.txt
│
├── web/                        # React 前端（已完成）
│   ├── src/
│   ├── dist/                   # build 产物
│   └── package.json
│
├── Dockerfile                  # 统一容器
├── docker-compose.yml          # 本地开发
└── README.md
```

---

## 功能模块

### 1. 用户认证 (Google OAuth)
- 前端：Google Sign-In 按钮
- 后端：验证 ID Token，创建用户
- 数据库：存储用户信息

### 2. 数据同步
- 本地优先：IndexedDB 存储
- 登录后：同步到云端
- 冲突解决：以时间戳为准

### 3. 视频生成
```
题目 JSON → TTS 音频 → HTML 渲染图片 → MoviePy 合成视频
```

- **TTS**: edge-tts (免费，多语言)
- **渲染**: Playwright (无头浏览器截图)
- **合成**: MoviePy (图片+音频→视频)

---

## 开发顺序

### Phase 1: 后端基础 (1-2天)
1. FastAPI 项目初始化
2. Supabase 数据库设置
3. 基本 API 结构

### Phase 2: 用户认证 (1天)
1. Google OAuth 配置
2. 前端登录集成
3. Token 验证

### Phase 3: 数据同步 (1-2天)
1. 进度同步 API
2. 错题本同步
3. 前端同步逻辑

### Phase 4: 视频生成 (2-3天)
1. TTS 模块
2. 幻灯片渲染
3. 视频合成
4. 批量处理

### Phase 5: 部署 (1天)
1. Dockerfile 编写
2. HF Spaces 配置
3. 域名/CORS 设置

---

## HuggingFace Spaces 配置

### Dockerfile 示例
```dockerfile
FROM python:3.11-slim

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    chromium \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 安装 Python 依赖
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# 复制前端 build
COPY web/dist /app/static

# 复制后端代码
COPY backend /app

WORKDIR /app
EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

### Space 配置 (README.md)
```yaml
---
title: StudyForge
emoji: 📚
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
---
```

---

## 免费资源汇总

| 服务 | 用途 | 免费额度 |
|------|------|----------|
| HuggingFace Spaces | 托管 | 2vCPU, 16GB RAM |
| Supabase | 数据库 | 500MB, 无限请求 |
| Google Cloud | OAuth | 免费 |
| Edge-TTS | 语音合成 | 免费无限 |

---

## 下一步行动

1. **明天起床后**：
   - 确认是否用这个方案
   - 创建 Supabase 项目
   - 创建 Google OAuth Client ID

2. **我可以先做**：
   - 搭建 FastAPI 项目结构
   - 编写 Dockerfile
   - 设计数据库模型

晚安！🌙

# LLM 工具与平台

## 商业 LLM API

### OpenAI
**官方网站**: [openai.com](https://openai.com/)

**主要模型：**
| 模型 | 特点 | 适用场景 |
|------|------|----------|
| GPT-4o | 最新多模态模型 | 通用任务 |
| GPT-4 Turbo | 长上下文(128K) | 复杂推理 |
| GPT-3.5 Turbo | 快速、经济 | 日常对话 |
| o1 系列 | 深度推理 | 数学、编程 |

**API 示例：**
```python
from openai import OpenAI

client = OpenAI(api_key="your-key")
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

### Anthropic Claude
**官方网站**: [anthropic.com](https://www.anthropic.com/)

**主要模型：**
| 模型 | 特点 | 上下文长度 |
|------|------|------------|
| Claude 3.5 Sonnet | 平衡性能与速度 | 200K |
| Claude 3 Opus | 最强推理能力 | 200K |
| Claude 3 Haiku | 快速响应 | 200K |

**特点：**
- 超长上下文窗口
- Constitutional AI 安全对齐
- 代码生成能力强

---

### Google Gemini
**官方网站**: [ai.google.dev](https://ai.google.dev/)

**主要模型：**
- Gemini Ultra：最强大版本
- Gemini Pro：平衡版本
- Gemini Flash：快速版本

**特点：**
- 原生多模态
- 与 Google 服务深度集成
- 支持长上下文

---

## 开源 LLM

### Meta LLaMA 3
**获取方式**: [llama.meta.com](https://llama.meta.com/)

**版本：**
| 版本 | 参数量 | 特点 |
|------|--------|------|
| LLaMA 3 8B | 80亿 | 轻量级，本地可运行 |
| LLaMA 3 70B | 700亿 | 强大，需要专业硬件 |
| LLaMA 3.1 405B | 4050亿 | 最强开源模型 |

**使用方式：**
```bash
# 通过 Ollama 运行
ollama run llama3

# 通过 Hugging Face
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
```

---

### Mistral AI
**官方网站**: [mistral.ai](https://mistral.ai/)

**模型：**
- Mistral 7B：高效小模型
- Mixtral 8x7B：MoE 架构
- Mixtral 8x22B：更大 MoE 模型

**特点：**
- 参数效率高
- 开源友好
- 商用许可

---

### 阿里云 Qwen (通义千问)
**官方网站**: [qwenlm.github.io](https://qwenlm.github.io/)

**模型：**
- Qwen 2.5 系列（0.5B - 72B）
- Qwen-VL：视觉语言模型
- Qwen-Audio：音频理解

**特点：**
- 中文能力强
- 多模态支持
- 商用友好

---

### DeepSeek
**官方网站**: [deepseek.com](https://www.deepseek.com/)

**模型：**
- DeepSeek Coder：代码专精
- DeepSeek Chat：对话模型
- DeepSeek V2：MoE 架构

**特点：**
- 代码能力突出
- 数学推理强
- 中文支持好

---

## 代码辅助工具

### GitHub Copilot
**官方网站**: [github.com/features/copilot](https://github.com/features/copilot)

AI 代码补全工具，集成于主流 IDE。

**特点：**
- 实时代码补全
- 多语言支持
- IDE 深度集成
- Copilot Chat 对话功能

---

### Cursor
**官方网站**: [cursor.com](https://cursor.com/)

AI-first 代码编辑器，内置强大的 AI 功能。

**特点：**
- 基于 VS Code
- 智能代码生成
- 代码库理解
- 多模型支持

---

### Claude Code
**官方网站**: [claude.ai/code](https://claude.ai/code)

Anthropic 官方 CLI 工具，用于代码开发辅助。

**特点：**
- 终端原生体验
- 代码库理解
- 文件编辑能力
- 多工具集成

---

### Aider
**官方网站**: [aider.chat](https://aider.chat/)

开源命令行 AI 编程助手。

```bash
pip install aider-chat
aider --model gpt-4o
```

---

## Prompt 工程工具

### PromptLayer
**官方网站**: [promptlayer.com](https://www.promptlayer.com/)

Prompt 管理和版本控制平台。

---

### LangSmith
**官方网站**: [smith.langchain.com](https://smith.langchain.com/)

LangChain 官方的 LLM 应用调试和监控平台。

**功能：**
- Prompt 调试
- 链路追踪
- 评估测试
- 数据集管理

---

## 微调工具

### Hugging Face PEFT
**官方网站**: [github.com/huggingface/peft](https://github.com/huggingface/peft)

参数高效微调库，支持 LoRA、Prefix Tuning 等方法。

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16, lora_alpha=32,
    target_modules=["q_proj", "v_proj"]
)
model = get_peft_model(base_model, config)
```

---

### Axolotl
**官方网站**: [github.com/OpenAccess-AI-Collective/axolotl](https://github.com/OpenAccess-AI-Collective/axolotl)

简化 LLM 微调的工具包。

---

### Unsloth
**官方网站**: [unsloth.ai](https://unsloth.ai/)

2倍速度 LLM 微调，内存占用更低。

---

## 评估工具

### lm-evaluation-harness
**官方网站**: [github.com/EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)

标准化的语言模型评估框架。

```bash
lm_eval --model hf --model_args pretrained=gpt2 --tasks hellaswag
```

---

### OpenCompass
**官方网站**: [github.com/open-compass/opencompass](https://github.com/open-compass/opencompass)

大模型评测平台，支持中文评测。

---

## 部署平台

### Hugging Face
**官方网站**: [huggingface.co](https://huggingface.co/)

AI 社区和模型托管平台。

**服务：**
- Hub：模型和数据集托管
- Spaces：应用部署
- Inference API：模型推理
- AutoTrain：自动微调

---

### Replicate
**官方网站**: [replicate.com](https://replicate.com/)

云端运行开源模型的平台。

```python
import replicate

output = replicate.run(
    "meta/llama-3-70b-instruct",
    input={"prompt": "Hello!"}
)
```

---

### Together AI
**官方网站**: [together.ai](https://www.together.ai/)

开源模型 API 平台，价格实惠。

---

## 工具对比

| 工具 | 类型 | 价格 | 特点 |
|------|------|------|------|
| OpenAI API | 商业 API | 按量付费 | 最强模型 |
| Ollama | 本地推理 | 免费 | 简单易用 |
| GitHub Copilot | 代码辅助 | $10/月 | IDE 集成 |
| Cursor | 代码编辑器 | $20/月 | AI 原生 |
| Hugging Face | 平台 | 免费增值 | 社区生态 |

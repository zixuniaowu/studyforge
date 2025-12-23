#!/usr/bin/env node

/**
 * 将 AWS 题库 MD 文件转换为 StudyForge JSON 格式
 * 每套题生成一个独立的 JSON 文件（模拟一次考试）
 *
 * 用法:
 *   node scripts/convert-md-to-json.cjs           # 转换中文版
 *   node scripts/convert-md-to-json.cjs --lang=ja # 转换日文版
 *   node scripts/convert-md-to-json.cjs --all     # 转换所有语言
 */

const fs = require('fs');
const path = require('path');

// 解析命令行参数
const args = process.argv.slice(2);
const langArg = args.find(a => a.startsWith('--lang='));
const allLangs = args.includes('--all');
const targetLang = langArg ? langArg.split('=')[1] : 'zh';

const BASE_DIR = path.join(__dirname, '../../AWS');
const OUTPUT_DIR = path.join(__dirname, '../public/sample-data');

// 语言配置
const LANG_CONFIG = {
  zh: {
    dir: BASE_DIR,
    langCode: 'zh-CN',
    examNamePrefix: 'AWS AIF-C01 模拟考试',
    descriptionPrefix: 'AWS认证AI从业者考试模拟题',
    noExplanation: '暂无解析',
    tags: ['AWS', 'AI', 'ML', '认证考试']
  },
  ja: {
    dir: path.join(BASE_DIR, 'ja'),
    langCode: 'ja',
    examNamePrefix: 'AWS AIF-C01 模擬試験',
    descriptionPrefix: 'AWS認定AIプラクティショナー試験模擬問題',
    noExplanation: '解説なし',
    tags: ['AWS', 'AI', 'ML', '認定試験']
  }
};

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 解析 MD 文件中的题目
 */
function parseQuestions(content, lang = 'zh') {
  const questions = [];
  const config = LANG_CONFIG[lang];

  // 匹配题目块: ### 题目 X 或 ### QX 或 ### 問題 X
  const questionBlocks = content.split(/###\s+(?:题目\s*|問題\s*|Q)(\d+)/);

  for (let i = 1; i < questionBlocks.length; i += 2) {
    const questionNum = questionBlocks[i];
    const block = questionBlocks[i + 1];

    if (!block) continue;

    try {
      const question = parseQuestionBlock(block, questionNum, lang);
      if (question) {
        questions.push(question);
      }
    } catch (e) {
      console.error(`解析题目 ${questionNum} 失败:`, e.message);
    }
  }

  return questions;
}

/**
 * 解析单个题目块
 */
function parseQuestionBlock(block, questionNum, lang = 'zh') {
  const config = LANG_CONFIG[lang];

  // 提取题目文本
  let questionText = '';

  // 格式1: **题目**：问题内容 / **問題**：問題内容
  const questionPatterns = [
    /\*\*题目\*\*[：:]\s*([\s\S]*?)(?=\n[A-F][.、)])/,
    /\*\*問題\*\*[：:]\s*([\s\S]*?)(?=\n[A-F][.、)])/
  ];

  for (const pattern of questionPatterns) {
    const match = block.match(pattern);
    if (match) {
      questionText = match[1].trim();
      break;
    }
  }

  // 格式2: **问题内容**
  if (!questionText) {
    const format2 = block.match(/^\s*\*\*([^*]+)\*\*/m);
    if (format2 && !format2[1].includes('答案') && !format2[1].includes('解答') &&
        !format2[1].includes('解析') && !format2[1].includes('解説')) {
      questionText = format2[1].trim();
    }
  }

  // 格式3: 直接的问题文本（在选项之前）
  if (!questionText) {
    const lines = block.split('\n').filter(l => l.trim() && !l.match(/^[A-F][.、)]/));
    for (const line of lines) {
      const cleaned = line.replace(/^\*\*|\*\*$/g, '').replace(/^(?:题目|問題)[：:]?\s*/, '').trim();
      if (cleaned && cleaned.length > 10 && !cleaned.includes('答案') &&
          !cleaned.includes('解答') && !cleaned.includes('解析') && !cleaned.includes('解説')) {
        questionText = cleaned;
        break;
      }
    }
  }

  if (!questionText) return null;

  // 提取选项
  const options = {};
  const optionRegex = /^([A-F])[.、)]\s*(.+?)(?:\s*$)/gm;
  let match;
  while ((match = optionRegex.exec(block)) !== null) {
    options[match[1]] = match[2].trim();
  }

  if (Object.keys(options).length === 0) return null;

  // 提取答案
  let answer = '';
  const answerPatterns = [
    /\*\*[✅✓]?\s*答案[：:]\s*([A-F](?:\s*[,、]\s*[A-F])*)/i,
    /\*\*[✅✓]?\s*解答[：:]\s*([A-F](?:\s*[,、]\s*[A-F])*)/i,
    /答案[：:]\s*([A-F](?:\s*[,、]\s*[A-F])*)/i,
    /解答[：:]\s*([A-F](?:\s*[,、]\s*[A-F])*)/i,
    /\*\*答案：([A-F])\*\*/,
    /\*\*解答：([A-F])\*\*/,
    /正确答案[是为]?\s*([A-F])/i
  ];

  for (const pattern of answerPatterns) {
    const answerMatch = block.match(pattern);
    if (answerMatch) {
      answer = answerMatch[1].trim();
      break;
    }
  }

  // 处理多选答案
  let answerType = 'single';
  let finalAnswer = answer;
  if (answer.includes(',') || answer.includes('、') || answer.includes(' ')) {
    const answers = answer.split(/[,、\s]+/).map(a => a.trim()).filter(a => /^[A-F]$/.test(a));
    if (answers.length > 1) {
      finalAnswer = answers;
      answerType = 'multiple';
    }
  }

  // 提取解析
  let explanation = '';
  const explanationPatterns = [
    /<details>[\s\S]*?<\/summary>\s*([\s\S]*?)<\/details>/,
    /\*\*解析\*\*[：:]\s*([\s\S]*?)(?=\n---|\n###|$)/i,
    /\*\*解説\*\*[：:]\s*([\s\S]*?)(?=\n---|\n###|$)/i,
    /\*\*解析[：:]\s*([\s\S]*?)(?=\n---|\n###|$)/i,
    /解析[：:]\s*([\s\S]*?)(?=\n---|\n###|$)/i,
    /解説[：:]\s*([\s\S]*?)(?=\n---|\n###|$)/i
  ];

  for (const pattern of explanationPatterns) {
    const explanationMatch = block.match(pattern);
    if (explanationMatch) {
      explanation = explanationMatch[1]
        .replace(/\*\*(?:答案|解答)[：:].*?\*\*/g, '')
        .replace(/\*\*/g, '')
        .trim();
      break;
    }
  }

  // 确定 Domain
  let domain = 1;
  const domainMatch = block.match(/Domain\s*(\d)/i);
  if (domainMatch) {
    domain = parseInt(domainMatch[1]);
  }

  return {
    id: `q${questionNum}`,
    domain,
    question: questionText,
    options,
    answer: finalAnswer,
    answerType,
    explanation: explanation || config.noExplanation,
    difficulty: 'medium'
  };
}

/**
 * 从文件名提取 set 编号
 */
function extractSetNumber(filename) {
  const match = filename.match(/set(\d+)/i);
  return match ? parseInt(match[1]) : 1;
}

/**
 * 处理指定语言的所有 MD 文件
 */
function processFilesForLang(lang) {
  const config = LANG_CONFIG[lang];

  if (!fs.existsSync(config.dir)) {
    console.log(`⚠️  ${lang} 目录不存在: ${config.dir}`);
    return;
  }

  const files = fs.readdirSync(config.dir).filter(f => f.endsWith('.md') && f.includes('answers'));

  console.log(`\n处理 ${lang.toUpperCase()} 版本...`);
  console.log(`目录: ${config.dir}`);
  console.log(`找到 ${files.length} 个答案文件`);

  if (files.length === 0) {
    console.log(`  ⚠️  未找到答案文件`);
    return;
  }

  // 每个文件生成一个独立的考试
  for (const file of files) {
    const setNumber = extractSetNumber(file);
    console.log(`\n  处理: ${file} (Set ${setNumber})`);

    const content = fs.readFileSync(path.join(config.dir, file), 'utf-8');
    const questions = parseQuestions(content, lang);
    console.log(`    解析到 ${questions.length} 道题`);

    if (questions.length === 0) {
      console.log(`    ⚠️  跳过空文件`);
      continue;
    }

    // 生成考试 ID 和文件名
    const langSuffix = lang === 'ja' ? '-ja' : '';
    const examId = `aws-aif-c01-set${setNumber}${langSuffix}`;

    const examData = {
      exam: {
        id: examId,
        name: `${config.examNamePrefix} #${setNumber}`,
        code: 'AIF-C01',
        provider: 'AWS',
        language: config.langCode,
        description: `${config.descriptionPrefix} - 第${setNumber}套`,
        totalQuestions: questions.length,
        passingScore: 70,
        examTime: 90,
        domains: lang === 'zh' ? [
          { id: 1, name: 'Fundamentals of AI and ML', weight: 20 },
          { id: 2, name: 'Fundamentals of Generative AI', weight: 24 },
          { id: 3, name: 'Applications of Foundation Models', weight: 28 },
          { id: 4, name: 'Guidelines for Responsible AI', weight: 14 },
          { id: 5, name: 'Security, Compliance, and Governance', weight: 14 }
        ] : [
          { id: 1, name: 'AIとMLの基礎', weight: 20 },
          { id: 2, name: '生成AIの基礎', weight: 24 },
          { id: 3, name: '基盤モデルのアプリケーション', weight: 28 },
          { id: 4, name: '責任あるAIのガイドライン', weight: 14 },
          { id: 5, name: 'セキュリティ、コンプライアンス、ガバナンス', weight: 14 }
        ],
        tags: config.tags
      },
      questions
    };

    // 写入文件
    const outputPath = path.join(OUTPUT_DIR, `${examId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(examData, null, 2), 'utf-8');

    console.log(`    ✅ 生成 ${outputPath}`);
  }
}

/**
 * 主函数
 */
function main() {
  console.log('=================================');
  console.log('MD 转 JSON 转换器');
  console.log('每套题 = 一个独立的模拟考试');
  console.log('=================================');

  // 清理旧的合并文件
  const oldFiles = ['aws-aif-c01.json', 'aws-aif-c01-ja.json'];
  for (const file of oldFiles) {
    const oldPath = path.join(OUTPUT_DIR, file);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
      console.log(`删除旧文件: ${file}`);
    }
  }

  if (allLangs) {
    for (const lang of Object.keys(LANG_CONFIG)) {
      processFilesForLang(lang);
    }
  } else {
    if (!LANG_CONFIG[targetLang]) {
      console.error(`不支持的语言: ${targetLang}`);
      process.exit(1);
    }
    processFilesForLang(targetLang);
  }

  console.log('\n=================================');
  console.log('转换完成!');
  console.log('=================================');
}

// 运行
main();

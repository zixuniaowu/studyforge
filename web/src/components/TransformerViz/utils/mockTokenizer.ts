// Simulated tokenizer for educational demonstration
import { Token } from '../types';

// Simulated vocabulary (small subset for demo)
const VOCAB: Record<string, number> = {
  // Chinese common characters/words
  '今': 1001, '天': 1002, '今天': 1003, '天气': 1004, '气': 1005,
  '很': 1006, '好': 1007, '我': 1008, '喜欢': 1009, '欢': 1010,
  '学': 1011, '习': 1012, '学习': 1013, 'AI': 1014, '机': 1015,
  '器': 1016, '机器': 1017, '有': 1018, '趣': 1019, '有趣': 1020,
  '的': 1021, '是': 1022, '不': 1023, '人': 1024, '工': 1025,
  '智': 1026, '能': 1027, '人工智能': 1028, '大': 1029, '模': 1030,
  '型': 1031, '大模型': 1032,

  // Japanese common characters/words
  '今日': 2001, 'は': 2002, 'が': 2003, 'いい': 2004, '良い': 2005,
  'を': 2006, '勉強': 2007, 'する': 2008, 'の': 2009, '面白い': 2010,
  'です': 2011, 'ます': 2012,

  // Punctuation
  '。': 3001, '、': 3002, '！': 3003, '？': 3004, '，': 3005,
  '.': 3006, ',': 3007, '!': 3008, '?': 3009,

  // Special tokens
  '<PAD>': 0, '<UNK>': 1, '<BOS>': 2, '<EOS>': 3,
};

// Common word patterns for better tokenization
const WORD_PATTERNS = [
  '今天', '天气', '喜欢', '学习', '机器', '有趣', '人工智能', '大模型',
  '今日', '勉強', '面白い',
];

/**
 * Simulates BPE-like tokenization
 * Uses greedy matching for known words, falls back to character-level
 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let remaining = text;
  let id = 0;

  while (remaining.length > 0) {
    let matched = false;

    // Try to match known word patterns (longest first)
    const sortedPatterns = [...WORD_PATTERNS].sort((a, b) => b.length - a.length);
    for (const pattern of sortedPatterns) {
      if (remaining.startsWith(pattern)) {
        tokens.push({
          id: id++,
          text: pattern,
          tokenId: VOCAB[pattern] || VOCAB['<UNK>'],
        });
        remaining = remaining.slice(pattern.length);
        matched = true;
        break;
      }
    }

    // If no pattern matched, take single character
    if (!matched) {
      const char = remaining[0];
      tokens.push({
        id: id++,
        text: char,
        tokenId: VOCAB[char] || VOCAB['<UNK>'],
      });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

/**
 * Get vocabulary size (for educational display)
 */
export function getVocabSize(): number {
  return 50257; // GPT-2 vocabulary size
}

/**
 * Get simulated token embedding dimension
 */
export function getEmbeddingDim(): number {
  return 768; // GPT-2 embedding dimension
}

/**
 * Format token for display (handles special characters)
 */
export function formatTokenDisplay(token: Token): string {
  if (token.text === ' ') return '␣';
  if (token.text === '\n') return '↵';
  if (token.text === '\t') return '→';
  return token.text;
}

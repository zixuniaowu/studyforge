// AI 训练器预设数据

export interface TrainingCategory {
  id: string;
  name: { zh: string; ja: string };
  emoji: string;
  color: string;
}

export interface TrainingSample {
  id: string;
  emoji: string;
  name: { zh: string; ja: string };
  categoryId: string;
}

export interface TrainerPreset {
  id: string;
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categories: TrainingCategory[];
  samples: TrainingSample[];
  testSamples: TrainingSample[];
  starsReward: number;
  minSamplesPerCategory: number;
}

// 预设场景
export const aiTrainerPresets: TrainerPreset[] = [
  // 1. 猫狗分类器 - 入门
  {
    id: 'cat-dog',
    name: { zh: '猫狗分类器', ja: '猫と犬の分類' },
    description: { zh: '训练AI区分猫和狗！', ja: 'AIに猫と犬を見分けさせよう！' },
    icon: '🐱',
    difficulty: 'beginner',
    starsReward: 15,
    minSamplesPerCategory: 3,
    categories: [
      { id: 'cat', name: { zh: '猫', ja: '猫' }, emoji: '🐱', color: '#F59E0B' },
      { id: 'dog', name: { zh: '狗', ja: '犬' }, emoji: '🐕', color: '#3B82F6' },
    ],
    samples: [
      { id: 's1', emoji: '🐱', name: { zh: '小猫', ja: '子猫' }, categoryId: 'cat' },
      { id: 's2', emoji: '😺', name: { zh: '开心猫', ja: '嬉しい猫' }, categoryId: 'cat' },
      { id: 's3', emoji: '😸', name: { zh: '微笑猫', ja: '笑う猫' }, categoryId: 'cat' },
      { id: 's4', emoji: '🙀', name: { zh: '惊讶猫', ja: '驚く猫' }, categoryId: 'cat' },
      { id: 's5', emoji: '😻', name: { zh: '爱心猫', ja: '愛猫' }, categoryId: 'cat' },
      { id: 's6', emoji: '🐕', name: { zh: '小狗', ja: '子犬' }, categoryId: 'dog' },
      { id: 's7', emoji: '🐶', name: { zh: '狗脸', ja: '犬の顔' }, categoryId: 'dog' },
      { id: 's8', emoji: '🐩', name: { zh: '贵宾犬', ja: 'プードル' }, categoryId: 'dog' },
      { id: 's9', emoji: '🦮', name: { zh: '导盲犬', ja: '盲導犬' }, categoryId: 'dog' },
      { id: 's10', emoji: '🐕‍🦺', name: { zh: '服务犬', ja: '介助犬' }, categoryId: 'dog' },
    ],
    testSamples: [
      { id: 't1', emoji: '😹', name: { zh: '哭笑猫', ja: '泣き笑い猫' }, categoryId: 'cat' },
      { id: 't2', emoji: '🐾', name: { zh: '脚印', ja: '足跡' }, categoryId: 'dog' },
    ],
  },

  // 2. 水果分类器 - 进阶
  {
    id: 'fruits',
    name: { zh: '水果分类器', ja: '果物の分類' },
    description: { zh: '训练AI识别不同水果！', ja: 'AIに色々な果物を見分けさせよう！' },
    icon: '🍎',
    difficulty: 'intermediate',
    starsReward: 20,
    minSamplesPerCategory: 3,
    categories: [
      { id: 'apple', name: { zh: '苹果', ja: 'りんご' }, emoji: '🍎', color: '#EF4444' },
      { id: 'citrus', name: { zh: '柑橘', ja: '柑橘類' }, emoji: '🍊', color: '#F59E0B' },
      { id: 'berry', name: { zh: '浆果', ja: 'ベリー' }, emoji: '🫐', color: '#8B5CF6' },
    ],
    samples: [
      { id: 's1', emoji: '🍎', name: { zh: '红苹果', ja: '赤りんご' }, categoryId: 'apple' },
      { id: 's2', emoji: '🍏', name: { zh: '青苹果', ja: '青りんご' }, categoryId: 'apple' },
      { id: 's9', emoji: '🍎', name: { zh: '大苹果', ja: '大きいりんご' }, categoryId: 'apple' },
      { id: 's10', emoji: '🍏', name: { zh: '小苹果', ja: '小さいりんご' }, categoryId: 'apple' },
      { id: 's3', emoji: '🍊', name: { zh: '橘子', ja: 'みかん' }, categoryId: 'citrus' },
      { id: 's4', emoji: '🍋', name: { zh: '柠檬', ja: 'レモン' }, categoryId: 'citrus' },
      { id: 's5', emoji: '🍋‍🟩', name: { zh: '青柠', ja: 'ライム' }, categoryId: 'citrus' },
      { id: 's11', emoji: '🍊', name: { zh: '小橘子', ja: '小みかん' }, categoryId: 'citrus' },
      { id: 's6', emoji: '🍇', name: { zh: '葡萄', ja: 'ぶどう' }, categoryId: 'berry' },
      { id: 's7', emoji: '🫐', name: { zh: '蓝莓', ja: 'ブルーベリー' }, categoryId: 'berry' },
      { id: 's8', emoji: '🍓', name: { zh: '草莓', ja: 'いちご' }, categoryId: 'berry' },
      { id: 's12', emoji: '🍒', name: { zh: '樱桃', ja: 'さくらんぼ' }, categoryId: 'berry' },
    ],
    testSamples: [
      { id: 't1', emoji: '🍎', name: { zh: '测试苹果', ja: 'テストりんご' }, categoryId: 'apple' },
      { id: 't2', emoji: '🍊', name: { zh: '测试橘子', ja: 'テストみかん' }, categoryId: 'citrus' },
      { id: 't3', emoji: '🍇', name: { zh: '测试葡萄', ja: 'テストぶどう' }, categoryId: 'berry' },
    ],
  },

  // 3. 表情识别器 - 挑战
  {
    id: 'emotions',
    name: { zh: '表情识别器', ja: '表情認識' },
    description: { zh: '训练AI识别不同表情！', ja: 'AIに色々な表情を見分けさせよう！' },
    icon: '😊',
    difficulty: 'advanced',
    starsReward: 25,
    minSamplesPerCategory: 3,
    categories: [
      { id: 'happy', name: { zh: '开心', ja: '嬉しい' }, emoji: '😊', color: '#FBBF24' },
      { id: 'sad', name: { zh: '难过', ja: '悲しい' }, emoji: '😢', color: '#60A5FA' },
      { id: 'angry', name: { zh: '生气', ja: '怒り' }, emoji: '😠', color: '#EF4444' },
      { id: 'surprised', name: { zh: '惊讶', ja: '驚き' }, emoji: '😲', color: '#A78BFA' },
    ],
    samples: [
      { id: 's1', emoji: '😊', name: { zh: '微笑', ja: '笑顔' }, categoryId: 'happy' },
      { id: 's2', emoji: '😄', name: { zh: '大笑', ja: '大笑い' }, categoryId: 'happy' },
      { id: 's3', emoji: '🤗', name: { zh: '拥抱', ja: 'ハグ' }, categoryId: 'happy' },
      { id: 's4', emoji: '😢', name: { zh: '哭泣', ja: '泣く' }, categoryId: 'sad' },
      { id: 's5', emoji: '😭', name: { zh: '大哭', ja: '号泣' }, categoryId: 'sad' },
      { id: 's6', emoji: '🥺', name: { zh: '可怜', ja: 'うるうる' }, categoryId: 'sad' },
      { id: 's7', emoji: '😠', name: { zh: '生气', ja: '怒り' }, categoryId: 'angry' },
      { id: 's8', emoji: '😤', name: { zh: '愤怒', ja: 'プンプン' }, categoryId: 'angry' },
      { id: 's9', emoji: '😡', name: { zh: '暴怒', ja: '激怒' }, categoryId: 'angry' },
      { id: 's10', emoji: '😲', name: { zh: '惊讶', ja: '驚き' }, categoryId: 'surprised' },
      { id: 's11', emoji: '😱', name: { zh: '震惊', ja: 'ショック' }, categoryId: 'surprised' },
      { id: 's12', emoji: '🤯', name: { zh: '爆炸', ja: '爆発' }, categoryId: 'surprised' },
    ],
    testSamples: [
      { id: 't1', emoji: '😁', name: { zh: '测试开心', ja: 'テスト嬉しい' }, categoryId: 'happy' },
      { id: 't2', emoji: '😿', name: { zh: '测试难过', ja: 'テスト悲しい' }, categoryId: 'sad' },
      { id: 't3', emoji: '👿', name: { zh: '测试生气', ja: 'テスト怒り' }, categoryId: 'angry' },
      { id: 't4', emoji: '😮', name: { zh: '测试惊讶', ja: 'テスト驚き' }, categoryId: 'surprised' },
    ],
  },
];

// 获取预设
export const getPresetById = (id: string) => aiTrainerPresets.find(p => p.id === id);

// 获取所有预设
export const getAllPresets = () => aiTrainerPresets;

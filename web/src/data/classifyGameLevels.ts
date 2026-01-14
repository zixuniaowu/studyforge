// 图片分类游戏关卡数据

export interface ClassifyCategory {
  id: string;
  name: { zh: string; ja: string };
  color: string;
  emoji: string;
}

export interface ClassifyItem {
  id: string;
  emoji: string;
  name: { zh: string; ja: string };
  categoryId: string;
}

export interface ClassifyLevel {
  id: string;
  name: { zh: string; ja: string };
  description: { zh: string; ja: string };
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // 秒
  categories: ClassifyCategory[];
  items: ClassifyItem[];
  starsReward: number;
  requiredCorrect: number; // 至少答对多少个才能通关
}

// 关卡数据
export const classifyGameLevels: ClassifyLevel[] = [
  // 关卡 1: 动物分类（陆地/水中）
  {
    id: 'level-1',
    name: { zh: '动物大分类', ja: '動物の分類' },
    description: { zh: '把动物分到陆地和水中！', ja: '動物を陸と水に分けよう！' },
    difficulty: 'easy',
    timeLimit: 60,
    starsReward: 10,
    requiredCorrect: 6,
    categories: [
      { id: 'land', name: { zh: '陆地动物', ja: '陸の動物' }, color: '#10B981', emoji: '🏔️' },
      { id: 'water', name: { zh: '水中动物', ja: '水の動物' }, color: '#3B82F6', emoji: '🌊' },
    ],
    items: [
      { id: 'dog', emoji: '🐕', name: { zh: '狗', ja: '犬' }, categoryId: 'land' },
      { id: 'cat', emoji: '🐱', name: { zh: '猫', ja: '猫' }, categoryId: 'land' },
      { id: 'elephant', emoji: '🐘', name: { zh: '大象', ja: '象' }, categoryId: 'land' },
      { id: 'lion', emoji: '🦁', name: { zh: '狮子', ja: 'ライオン' }, categoryId: 'land' },
      { id: 'rabbit', emoji: '🐰', name: { zh: '兔子', ja: 'うさぎ' }, categoryId: 'land' },
      { id: 'fish', emoji: '🐟', name: { zh: '鱼', ja: '魚' }, categoryId: 'water' },
      { id: 'dolphin', emoji: '🐬', name: { zh: '海豚', ja: 'イルカ' }, categoryId: 'water' },
      { id: 'octopus', emoji: '🐙', name: { zh: '章鱼', ja: 'タコ' }, categoryId: 'water' },
      { id: 'whale', emoji: '🐳', name: { zh: '鲸鱼', ja: 'クジラ' }, categoryId: 'water' },
      { id: 'crab', emoji: '🦀', name: { zh: '螃蟹', ja: 'カニ' }, categoryId: 'water' },
    ],
  },

  // 关卡 2: 水果和蔬菜
  {
    id: 'level-2',
    name: { zh: '水果蔬菜大作战', ja: '果物と野菜' },
    description: { zh: '区分水果和蔬菜！', ja: '果物と野菜を分けよう！' },
    difficulty: 'easy',
    timeLimit: 50,
    starsReward: 12,
    requiredCorrect: 7,
    categories: [
      { id: 'fruit', name: { zh: '水果', ja: '果物' }, color: '#F59E0B', emoji: '🍎' },
      { id: 'vegetable', name: { zh: '蔬菜', ja: '野菜' }, color: '#22C55E', emoji: '🥬' },
    ],
    items: [
      { id: 'apple', emoji: '🍎', name: { zh: '苹果', ja: 'りんご' }, categoryId: 'fruit' },
      { id: 'banana', emoji: '🍌', name: { zh: '香蕉', ja: 'バナナ' }, categoryId: 'fruit' },
      { id: 'orange', emoji: '🍊', name: { zh: '橘子', ja: 'みかん' }, categoryId: 'fruit' },
      { id: 'grape', emoji: '🍇', name: { zh: '葡萄', ja: 'ぶどう' }, categoryId: 'fruit' },
      { id: 'watermelon', emoji: '🍉', name: { zh: '西瓜', ja: 'すいか' }, categoryId: 'fruit' },
      { id: 'carrot', emoji: '🥕', name: { zh: '胡萝卜', ja: 'にんじん' }, categoryId: 'vegetable' },
      { id: 'broccoli', emoji: '🥦', name: { zh: '西兰花', ja: 'ブロッコリー' }, categoryId: 'vegetable' },
      { id: 'corn', emoji: '🌽', name: { zh: '玉米', ja: 'とうもろこし' }, categoryId: 'vegetable' },
      { id: 'pepper', emoji: '🫑', name: { zh: '青椒', ja: 'ピーマン' }, categoryId: 'vegetable' },
      { id: 'eggplant', emoji: '🍆', name: { zh: '茄子', ja: 'なす' }, categoryId: 'vegetable' },
    ],
  },

  // 关卡 3: 交通工具（陆/海/空）
  {
    id: 'level-3',
    name: { zh: '交通工具大分类', ja: '乗り物の分類' },
    description: { zh: '这些交通工具在哪里走？', ja: 'これらの乗り物はどこを走る？' },
    difficulty: 'medium',
    timeLimit: 45,
    starsReward: 15,
    requiredCorrect: 8,
    categories: [
      { id: 'land-transport', name: { zh: '陆地', ja: '陸' }, color: '#EF4444', emoji: '🛣️' },
      { id: 'sea-transport', name: { zh: '海上', ja: '海' }, color: '#3B82F6', emoji: '🌊' },
      { id: 'air-transport', name: { zh: '天空', ja: '空' }, color: '#8B5CF6', emoji: '☁️' },
    ],
    items: [
      { id: 'car', emoji: '🚗', name: { zh: '汽车', ja: '車' }, categoryId: 'land-transport' },
      { id: 'bus', emoji: '🚌', name: { zh: '公交车', ja: 'バス' }, categoryId: 'land-transport' },
      { id: 'train', emoji: '🚂', name: { zh: '火车', ja: '電車' }, categoryId: 'land-transport' },
      { id: 'bike', emoji: '🚲', name: { zh: '自行车', ja: '自転車' }, categoryId: 'land-transport' },
      { id: 'ship', emoji: '🚢', name: { zh: '轮船', ja: '船' }, categoryId: 'sea-transport' },
      { id: 'sailboat', emoji: '⛵', name: { zh: '帆船', ja: 'ヨット' }, categoryId: 'sea-transport' },
      { id: 'speedboat', emoji: '🚤', name: { zh: '快艇', ja: 'ボート' }, categoryId: 'sea-transport' },
      { id: 'airplane', emoji: '✈️', name: { zh: '飞机', ja: '飛行機' }, categoryId: 'air-transport' },
      { id: 'helicopter', emoji: '🚁', name: { zh: '直升机', ja: 'ヘリコプター' }, categoryId: 'air-transport' },
      { id: 'rocket', emoji: '🚀', name: { zh: '火箭', ja: 'ロケット' }, categoryId: 'air-transport' },
    ],
  },

  // 关卡 4: 天气分类
  {
    id: 'level-4',
    name: { zh: '天气小达人', ja: 'お天気マスター' },
    description: { zh: '这是什么天气的东西？', ja: 'これは何の天気のもの？' },
    difficulty: 'medium',
    timeLimit: 40,
    starsReward: 15,
    requiredCorrect: 7,
    categories: [
      { id: 'sunny', name: { zh: '晴天', ja: '晴れ' }, color: '#F59E0B', emoji: '☀️' },
      { id: 'rainy', name: { zh: '雨天', ja: '雨' }, color: '#6366F1', emoji: '🌧️' },
      { id: 'snowy', name: { zh: '雪天', ja: '雪' }, color: '#06B6D4', emoji: '❄️' },
    ],
    items: [
      { id: 'sunglasses', emoji: '🕶️', name: { zh: '墨镜', ja: 'サングラス' }, categoryId: 'sunny' },
      { id: 'icecream', emoji: '🍦', name: { zh: '冰淇淋', ja: 'アイス' }, categoryId: 'sunny' },
      { id: 'beach', emoji: '🏖️', name: { zh: '海滩', ja: 'ビーチ' }, categoryId: 'sunny' },
      { id: 'umbrella', emoji: '☂️', name: { zh: '雨伞', ja: '傘' }, categoryId: 'rainy' },
      { id: 'raincoat', emoji: '🧥', name: { zh: '雨衣', ja: 'レインコート' }, categoryId: 'rainy' },
      { id: 'boots', emoji: '🥾', name: { zh: '雨靴', ja: '長靴' }, categoryId: 'rainy' },
      { id: 'snowman', emoji: '⛄', name: { zh: '雪人', ja: '雪だるま' }, categoryId: 'snowy' },
      { id: 'scarf', emoji: '🧣', name: { zh: '围巾', ja: 'マフラー' }, categoryId: 'snowy' },
      { id: 'sled', emoji: '🛷', name: { zh: '雪橇', ja: 'そり' }, categoryId: 'snowy' },
    ],
  },

  // 关卡 5: 形状分类
  {
    id: 'level-5',
    name: { zh: '形状大挑战', ja: '形のチャレンジ' },
    description: { zh: '找出相同形状的东西！', ja: '同じ形のものを見つけよう！' },
    difficulty: 'hard',
    timeLimit: 35,
    starsReward: 20,
    requiredCorrect: 8,
    categories: [
      { id: 'circle', name: { zh: '圆形', ja: '丸' }, color: '#EC4899', emoji: '⭕' },
      { id: 'square', name: { zh: '方形', ja: '四角' }, color: '#8B5CF6', emoji: '⬜' },
      { id: 'triangle', name: { zh: '三角形', ja: '三角' }, color: '#F97316', emoji: '🔺' },
    ],
    items: [
      { id: 'ball', emoji: '⚽', name: { zh: '足球', ja: 'サッカーボール' }, categoryId: 'circle' },
      { id: 'cookie', emoji: '🍪', name: { zh: '饼干', ja: 'クッキー' }, categoryId: 'circle' },
      { id: 'clock', emoji: '⏰', name: { zh: '钟表', ja: '時計' }, categoryId: 'circle' },
      { id: 'moon', emoji: '🌕', name: { zh: '月亮', ja: '月' }, categoryId: 'circle' },
      { id: 'gift', emoji: '🎁', name: { zh: '礼物', ja: 'プレゼント' }, categoryId: 'square' },
      { id: 'tv', emoji: '📺', name: { zh: '电视', ja: 'テレビ' }, categoryId: 'square' },
      { id: 'book', emoji: '📕', name: { zh: '书本', ja: '本' }, categoryId: 'square' },
      { id: 'pizza', emoji: '🍕', name: { zh: '披萨', ja: 'ピザ' }, categoryId: 'triangle' },
      { id: 'tent', emoji: '⛺', name: { zh: '帐篷', ja: 'テント' }, categoryId: 'triangle' },
      { id: 'tree', emoji: '🎄', name: { zh: '圣诞树', ja: 'クリスマスツリー' }, categoryId: 'triangle' },
    ],
  },

  // 关卡 6: AI 分类挑战
  {
    id: 'level-6',
    name: { zh: 'AI大挑战', ja: 'AIチャレンジ' },
    description: { zh: '像AI一样分类这些东西！', ja: 'AIのように分類しよう！' },
    difficulty: 'hard',
    timeLimit: 30,
    starsReward: 25,
    requiredCorrect: 9,
    categories: [
      { id: 'living', name: { zh: '生物', ja: '生き物' }, color: '#22C55E', emoji: '🌱' },
      { id: 'machine', name: { zh: '机器', ja: '機械' }, color: '#6366F1', emoji: '⚙️' },
      { id: 'nature', name: { zh: '自然', ja: '自然' }, color: '#F59E0B', emoji: '🌍' },
    ],
    items: [
      { id: 'flower', emoji: '🌸', name: { zh: '花', ja: '花' }, categoryId: 'living' },
      { id: 'bird', emoji: '🐦', name: { zh: '鸟', ja: '鳥' }, categoryId: 'living' },
      { id: 'butterfly', emoji: '🦋', name: { zh: '蝴蝶', ja: '蝶' }, categoryId: 'living' },
      { id: 'bee', emoji: '🐝', name: { zh: '蜜蜂', ja: '蜂' }, categoryId: 'living' },
      { id: 'robot', emoji: '🤖', name: { zh: '机器人', ja: 'ロボット' }, categoryId: 'machine' },
      { id: 'computer', emoji: '💻', name: { zh: '电脑', ja: 'パソコン' }, categoryId: 'machine' },
      { id: 'phone', emoji: '📱', name: { zh: '手机', ja: 'スマホ' }, categoryId: 'machine' },
      { id: 'mountain', emoji: '🏔️', name: { zh: '山', ja: '山' }, categoryId: 'nature' },
      { id: 'rainbow', emoji: '🌈', name: { zh: '彩虹', ja: '虹' }, categoryId: 'nature' },
      { id: 'star', emoji: '⭐', name: { zh: '星星', ja: '星' }, categoryId: 'nature' },
      { id: 'sun', emoji: '☀️', name: { zh: '太阳', ja: '太陽' }, categoryId: 'nature' },
    ],
  },
];

// 获取关卡总数
export const getTotalLevels = () => classifyGameLevels.length;

// 根据ID获取关卡
export const getLevelById = (id: string) => classifyGameLevels.find(l => l.id === id);

// 获取下一关
export const getNextLevel = (currentId: string) => {
  const currentIndex = classifyGameLevels.findIndex(l => l.id === currentId);
  if (currentIndex < classifyGameLevels.length - 1) {
    return classifyGameLevels[currentIndex + 1];
  }
  return null;
};

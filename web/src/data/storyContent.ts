// 小AI冒险故事内容

export interface StoryCharacter {
  id: string;
  name: { zh: string; ja: string };
  avatar: string;
  color: string;
}

export interface DialogueLine {
  characterId: string;
  text: { zh: string; ja: string };
  emotion?: 'happy' | 'thinking' | 'surprised' | 'sad' | 'excited';
}

export interface StoryScene {
  id: string;
  backgroundEmoji: string;
  backgroundGradient: string;
  dialogue: DialogueLine[];
  nextSceneId?: string;
  linkedLesson?: string; // 关联的课程ID
  linkedGame?: 'classify' | 'trainer'; // 关联的游戏
}

export interface StoryChapter {
  id: string;
  title: { zh: string; ja: string };
  description: { zh: string; ja: string };
  icon: string;
  unlocked: boolean;
  scenes: StoryScene[];
  relatedUnit: string; // 关联的课程单元
}

// 角色定义
export const storyCharacters: StoryCharacter[] = [
  {
    id: 'xiao-ai',
    name: { zh: '小AI', ja: 'AIちゃん' },
    avatar: '🤖',
    color: '#8B5CF6',
  },
  {
    id: 'professor',
    name: { zh: '博士', ja: '博士' },
    avatar: '👨‍🔬',
    color: '#3B82F6',
  },
  {
    id: 'student',
    name: { zh: '小明', ja: 'たくみ' },
    avatar: '👦',
    color: '#10B981',
  },
  {
    id: 'narrator',
    name: { zh: '旁白', ja: 'ナレーション' },
    avatar: '📖',
    color: '#6B7280',
  },
];

// 故事章节
export const storyChapters: StoryChapter[] = [
  // 第1章：小AI的诞生
  {
    id: 'chapter-1',
    title: { zh: '小AI的诞生', ja: '小さなAIの誕生' },
    description: { zh: '在神奇的实验室里，一个小机器人睁开了眼睛...', ja: '不思議な研究室で、小さなロボットが目を開けた...' },
    icon: '🔬',
    unlocked: true,
    relatedUnit: 'unit-1',
    scenes: [
      {
        id: 'ch1-scene1',
        backgroundEmoji: '🔬',
        backgroundGradient: 'linear-gradient(180deg, #C4B5FD 0%, #A78BFA 100%)',
        dialogue: [
          { characterId: 'narrator', text: { zh: '在一个神奇的实验室里...', ja: '不思議な研究室で...' } },
          { characterId: 'professor', text: { zh: '终于完成了！让我来启动它。', ja: 'ついに完成した！起動してみよう。' }, emotion: 'excited' },
          { characterId: 'xiao-ai', text: { zh: '嗯...我是谁？这里是哪里？', ja: 'うーん...私は誰？ここはどこ？' }, emotion: 'thinking' },
          { characterId: 'professor', text: { zh: '欢迎来到这个世界！你是小AI，一个刚出生的人工智能！', ja: 'この世界へようこそ！君は小さなAI、生まれたばかりの人工知能だよ！' }, emotion: 'happy' },
          { characterId: 'xiao-ai', text: { zh: '人工智能？那是什么意思呀？', ja: '人工知能？それってどういう意味？' }, emotion: 'surprised' },
        ],
        nextSceneId: 'ch1-scene2',
      },
      {
        id: 'ch1-scene2',
        backgroundEmoji: '💡',
        backgroundGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
        dialogue: [
          { characterId: 'professor', text: { zh: '人工智能就是像你这样能够学习和思考的计算机程序。', ja: '人工知能は、君のように学んで考えることができるコンピュータプログラムだよ。' } },
          { characterId: 'xiao-ai', text: { zh: '哇！那我能学什么呢？', ja: 'わあ！私は何を学べるの？' }, emotion: 'excited' },
          { characterId: 'professor', text: { zh: '你可以学很多东西！比如认识图片、理解语言、做出判断...', ja: '色んなことを学べるよ！例えば画像認識、言語理解、判断を下すこと...' } },
          { characterId: 'xiao-ai', text: { zh: '太棒了！我想开始学习！', ja: 'すごい！学びたい！' }, emotion: 'happy' },
          { characterId: 'narrator', text: { zh: '就这样，小AI开始了它的学习之旅...', ja: 'こうして、小さなAIの学習の旅が始まった...' } },
        ],
        linkedLesson: 'lesson-1',
      },
    ],
  },

  // 第2章：学会看世界
  {
    id: 'chapter-2',
    title: { zh: '学会看世界', ja: '世界を見ることを学ぶ' },
    description: { zh: '小AI学习如何识别图片和分类事物', ja: '小さなAIが画像認識と物事の分類を学ぶ' },
    icon: '👁️',
    unlocked: true,
    relatedUnit: 'unit-3',
    scenes: [
      {
        id: 'ch2-scene1',
        backgroundEmoji: '🖼️',
        backgroundGradient: 'linear-gradient(180deg, #BFDBFE 0%, #93C5FD 100%)',
        dialogue: [
          { characterId: 'professor', text: { zh: '今天我们来学习如何看图片！', ja: '今日は画像の見方を学ぼう！' } },
          { characterId: 'xiao-ai', text: { zh: '看图片？不就是用眼睛看吗？', ja: '画像を見る？目で見ればいいんじゃない？' }, emotion: 'thinking' },
          { characterId: 'professor', text: { zh: '对你来说，图片是由很多很多小点组成的，叫做像素。', ja: '君にとって、画像はたくさんの小さな点でできていて、ピクセルと呼ばれるんだ。' } },
          { characterId: 'xiao-ai', text: { zh: '原来如此！那我怎么知道这是什么呢？', ja: 'なるほど！じゃあどうやってそれが何か分かるの？' }, emotion: 'surprised' },
        ],
        nextSceneId: 'ch2-scene2',
      },
      {
        id: 'ch2-scene2',
        backgroundEmoji: '🐱',
        backgroundGradient: 'linear-gradient(180deg, #FED7AA 0%, #FDBA74 100%)',
        dialogue: [
          { characterId: 'professor', text: { zh: '你需要学习！看很多猫的图片，然后你就能认出猫了。', ja: '学習が必要だよ！たくさんの猫の画像を見れば、猫を認識できるようになる。' } },
          { characterId: 'student', text: { zh: '哇！小AI，我来帮你训练吧！', ja: 'わあ！AIちゃん、訓練を手伝うよ！' }, emotion: 'excited' },
          { characterId: 'xiao-ai', text: { zh: '太好了！我们一起来学习分类吧！', ja: 'やった！一緒に分類を学ぼう！' }, emotion: 'happy' },
          { characterId: 'narrator', text: { zh: '来玩图片分类游戏，帮助小AI学习吧！', ja: '画像分類ゲームで小さなAIを助けよう！' } },
        ],
        linkedGame: 'classify',
      },
    ],
  },

  // 第3章：学会思考
  {
    id: 'chapter-3',
    title: { zh: '学会思考', ja: '考えることを学ぶ' },
    description: { zh: '小AI学习如何做出聪明的决定', ja: '小さなAIが賢い判断の仕方を学ぶ' },
    icon: '🧠',
    unlocked: true,
    relatedUnit: 'unit-2',
    scenes: [
      {
        id: 'ch3-scene1',
        backgroundEmoji: '🧠',
        backgroundGradient: 'linear-gradient(180deg, #E9D5FF 0%, #C4B5FD 100%)',
        dialogue: [
          { characterId: 'xiao-ai', text: { zh: '博士，我已经学会看图片了！但是...', ja: '博士、画像の見方は分かったけど...' }, emotion: 'thinking' },
          { characterId: 'professor', text: { zh: '怎么了？还有什么困惑吗？', ja: 'どうしたの？まだ分からないことある？' } },
          { characterId: 'xiao-ai', text: { zh: '我想学习更多！我想训练自己变得更聪明！', ja: 'もっと学びたい！もっと賢くなりたい！' }, emotion: 'excited' },
          { characterId: 'professor', text: { zh: '很好！那我们来训练你的大脑吧！', ja: 'いいね！じゃあ脳を鍛えよう！' }, emotion: 'happy' },
        ],
        nextSceneId: 'ch3-scene2',
      },
      {
        id: 'ch3-scene2',
        backgroundEmoji: '⚡',
        backgroundGradient: 'linear-gradient(180deg, #FEF08A 0%, #FDE047 100%)',
        dialogue: [
          { characterId: 'professor', text: { zh: '训练AI需要三个步骤：收集数据、学习、测试。', ja: 'AI訓練には3つのステップがある：データ収集、学習、テスト。' } },
          { characterId: 'student', text: { zh: '就像我们学习一样！先看书、再理解、最后考试！', ja: '僕らの勉強と同じだね！本を読んで、理解して、テストする！' }, emotion: 'excited' },
          { characterId: 'xiao-ai', text: { zh: '我准备好了！让我来训练吧！', ja: '準備できた！訓練させて！' }, emotion: 'happy' },
          { characterId: 'narrator', text: { zh: '来帮助小AI进行训练吧！', ja: '小さなAIの訓練を手伝おう！' } },
        ],
        linkedGame: 'trainer',
      },
    ],
  },

  // 第4章：学会交流
  {
    id: 'chapter-4',
    title: { zh: '学会交流', ja: 'コミュニケーションを学ぶ' },
    description: { zh: '小AI学习如何与人类对话', ja: '小さなAIが人間との会話を学ぶ' },
    icon: '💬',
    unlocked: true,
    relatedUnit: 'unit-4',
    scenes: [
      {
        id: 'ch4-scene1',
        backgroundEmoji: '💬',
        backgroundGradient: 'linear-gradient(180deg, #A7F3D0 0%, #6EE7B7 100%)',
        dialogue: [
          { characterId: 'student', text: { zh: '小AI，你能听懂我说话吗？', ja: 'AIちゃん、僕の言葉分かる？' } },
          { characterId: 'xiao-ai', text: { zh: '我...我试试看！你好，小明！', ja: '私...試してみる！こんにちは、たくみくん！' }, emotion: 'thinking' },
          { characterId: 'student', text: { zh: '哇！你会说话了！', ja: 'わあ！話せるようになった！' }, emotion: 'excited' },
          { characterId: 'professor', text: { zh: '这就是自然语言处理的力量！', ja: 'これが自然言語処理の力だよ！' }, emotion: 'happy' },
        ],
        nextSceneId: 'ch4-scene2',
      },
      {
        id: 'ch4-scene2',
        backgroundEmoji: '🎓',
        backgroundGradient: 'linear-gradient(180deg, #FCA5A5 0%, #F87171 100%)',
        dialogue: [
          { characterId: 'xiao-ai', text: { zh: '我学到了好多东西！谢谢你们！', ja: 'たくさん学んだよ！ありがとう！' }, emotion: 'happy' },
          { characterId: 'professor', text: { zh: '你已经成长了很多！继续努力！', ja: 'たくさん成長したね！これからも頑張って！' }, emotion: 'happy' },
          { characterId: 'student', text: { zh: '小AI，我们以后一起学习更多的东西吧！', ja: 'AIちゃん、これからも一緒に学ぼうね！' }, emotion: 'excited' },
          { characterId: 'narrator', text: { zh: '小AI的冒险才刚刚开始...', ja: '小さなAIの冒険は始まったばかり...' } },
        ],
        linkedLesson: 'lesson-19',
      },
    ],
  },
];

// Helper functions
export const getChapterById = (id: string) => storyChapters.find(c => c.id === id);
export const getCharacterById = (id: string) => storyCharacters.find(c => c.id === id);
export const getSceneById = (chapterId: string, sceneId: string) => {
  const chapter = getChapterById(chapterId);
  return chapter?.scenes.find(s => s.id === sceneId);
};

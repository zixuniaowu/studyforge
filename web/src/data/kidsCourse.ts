import { KidsCourseUnit, KidsBadge, KidsLevel } from '../types';

// 等级配置
export const kidsLevels: KidsLevel[] = [
  { level: 1, title: { zh: 'AI小萌新', ja: 'AI初心者' }, requiredStars: 0, reward: 'avatar-frame-1' },
  { level: 2, title: { zh: 'AI小学徒', ja: 'AI見習い' }, requiredStars: 50, reward: 'avatar-frame-2' },
  { level: 3, title: { zh: 'AI小助手', ja: 'AIアシスタント' }, requiredStars: 150, reward: 'special-animation' },
  { level: 4, title: { zh: 'AI小专家', ja: 'AI専門家' }, requiredStars: 300, reward: 'advanced-course' },
  { level: 5, title: { zh: 'AI小博士', ja: 'AI博士' }, requiredStars: 500, reward: 'certificate' },
];

// 学习徽章
export const learningBadges: KidsBadge[] = [
  {
    id: 'welcome',
    name: { zh: '欢迎徽章', ja: 'ようこそバッジ' },
    icon: '⭐',
    description: { zh: '完成首次登录', ja: '初めてのログイン完了' },
    condition: 'first-login'
  },
  {
    id: 'first-step',
    name: { zh: '第一步', ja: '最初の一歩' },
    icon: '🎯',
    description: { zh: '完成第1课', ja: '第1課完了' },
    condition: 'complete-lesson-1'
  },
  {
    id: 'streak-3',
    name: { zh: '小火苗', ja: '小さな炎' },
    icon: '🔥',
    description: { zh: '连续学习3天', ja: '3日連続学習' },
    condition: 'streak-3'
  },
  {
    id: 'streak-7',
    name: { zh: '坚持不懈', ja: '継続は力' },
    icon: '🔥',
    description: { zh: '连续学习7天', ja: '7日連続学習' },
    condition: 'streak-7'
  },
  {
    id: 'perfect-score',
    name: { zh: '满分王', ja: '満点王' },
    icon: '🏆',
    description: { zh: '单元测验满分', ja: 'ユニットテスト満点' },
    condition: 'perfect-quiz'
  }
];

// 技能徽章（单元完成）
export const skillBadges: KidsBadge[] = [
  {
    id: 'unit-1-complete',
    name: { zh: 'AI入门者', ja: 'AI入門者' },
    icon: '🤖',
    description: { zh: '完成第一单元', ja: '第1ユニット完了' },
    condition: 'complete-unit-1'
  },
  {
    id: 'unit-2-complete',
    name: { zh: 'Python新手', ja: 'Python初心者' },
    icon: '🐍',
    description: { zh: '完成第二单元', ja: '第2ユニット完了' },
    condition: 'complete-unit-2'
  },
  {
    id: 'unit-3-complete',
    name: { zh: '图像达人', ja: '画像マスター' },
    icon: '🖼️',
    description: { zh: '完成第三单元', ja: '第3ユニット完了' },
    condition: 'complete-unit-3'
  },
  {
    id: 'unit-4-complete',
    name: { zh: '对话高手', ja: '会話マスター' },
    icon: '💬',
    description: { zh: '完成第四单元', ja: '第4ユニット完了' },
    condition: 'complete-unit-4'
  },
  {
    id: 'graduate',
    name: { zh: '毕业证书', ja: '卒業証書' },
    icon: '🎓',
    description: { zh: '完成所有课程', ja: '全コース完了' },
    condition: 'complete-all'
  }
];

// 课程内容
export const kidsCourseUnits: KidsCourseUnit[] = [
  // ============================================
  // 第一单元：认识AI朋友
  // ============================================
  {
    id: 'unit-1',
    title: { zh: '认识AI朋友', ja: 'AIの友達を知ろう' },
    description: { zh: '了解什么是人工智能，AI能做哪些神奇的事情', ja: 'AIとは何か、AIができる不思議なことを学ぼう' },
    icon: '🤖',
    color: '#FF6B6B',
    badge: skillBadges[0],
    lessons: [
      // 第1课 - 丰富的30分钟课程
      {
        id: 'lesson-1',
        unitId: 'unit-1',
        order: 1,
        title: { zh: '什么是人工智能？', ja: '人工知能って何？' },
        duration: 30,
        type: 'video',
        starsReward: 15,
        sections: [
          // 开场介绍 (2分钟)
          {
            id: 'l1-s1',
            type: 'intro',
            content: {
              zh: '欢迎来到AI世界！🎉 今天我们要认识一个超级厉害的朋友——人工智能！准备好了吗？让我们开始神奇的AI探险之旅吧！',
              ja: 'AIの世界へようこそ！🎉 今日はすごい友達——人工知能を紹介するよ！準備はいい？さあ、AIの冒険を始めよう！'
            },
            duration: 2
          },
          // 视频学习 (5分钟)
          {
            id: 'l1-s2',
            type: 'video',
            content: {
              zh: '🎬 先来看一个有趣的视频，了解AI是什么吧！',
              ja: '🎬 まずは楽しい動画でAIについて学ぼう！'
            },
            videoUrl: 'https://www.youtube.com/embed/mJeNghZXtMo',
            duration: 5
          },
          // 核心概念1 (3分钟)
          {
            id: 'l1-s3',
            type: 'text',
            content: {
              zh: '🤔 什么是人工智能？\n\n你有没有想过：\n• 为什么手机可以认出你的脸？📱\n• 为什么智能音箱能听懂你说的话？🔊\n• 为什么推荐的视频总是你喜欢的？📺\n\n这些都是人工智能（AI）在帮忙！\n\nAI就像是电脑的大脑🧠，让机器变得越来越聪明，能够像人一样思考和学习！',
              ja: '🤔 人工知能って何？\n\n考えたことある？\n• なぜスマホは顔を認識できるの？📱\n• なぜスマートスピーカーは話を理解できるの？🔊\n• なぜおすすめの動画はいつも好きなもの？📺\n\nこれらは全部AI（人工知能）のおかげ！\n\nAIはコンピュータの脳🧠みたいなもので、機械を賢くして、人間みたいに考えたり学んだりできるようにするんだ！'
            },
            duration: 3
          },
          // 生活中的AI (3分钟)
          {
            id: 'l1-s4',
            type: 'text',
            content: {
              zh: '🌟 生活中的AI小伙伴\n\n其实，AI就在我们身边！看看这些例子：\n\n🏠 在家里：\n• 小爱同学、天猫精灵会和你聊天\n• 扫地机器人知道怎么打扫房间\n• 智能空调知道什么时候开关\n\n📱 在手机里：\n• 相册会自动整理你的照片\n• 输入法能猜到你想说什么\n• 美颜相机知道怎么让你更好看\n\n🎮 在游戏里：\n• 游戏里的敌人会追着你跑\n• NPC能和你对话\n• 推荐系统知道你喜欢什么游戏',
              ja: '🌟 生活の中のAI仲間\n\n実は、AIは私たちのそばにいるよ！これらの例を見てみよう：\n\n🏠 家では：\n• スマートスピーカーがおしゃべりしてくれる\n• お掃除ロボットが部屋を掃除してくれる\n• スマートエアコンがいつつけるか知ってる\n\n📱 スマホでは：\n• アルバムが自動で写真を整理\n• 予測変換が言いたいことを当てる\n• 美肌カメラがきれいに撮ってくれる\n\n🎮 ゲームでは：\n• 敵が追いかけてくる\n• NPCと話せる\n• おすすめシステムが好きなゲームを知ってる'
            },
            duration: 3
          },
          // 互动环节 (3分钟)
          {
            id: 'l1-s5',
            type: 'interactive',
            content: {
              zh: '🎯 互动时间！想一想，你今天用过哪些AI呢？\n\n可能是：\n• 早上让智能音箱放音乐 🎵\n• 用手机拍照 📸\n• 看视频网站推荐的内容 📺\n• 玩游戏 🎮\n\nAI无处不在，是不是很神奇？',
              ja: '🎯 インタラクティブタイム！今日どんなAIを使った？\n\n例えば：\n• 朝スマートスピーカーで音楽を流した 🎵\n• スマホで写真を撮った 📸\n• 動画サイトのおすすめを見た 📺\n• ゲームで遊んだ 🎮\n\nAIはどこにでもいるね、すごいでしょ？'
            },
            duration: 3
          },
          // AI的工作原理 (3分钟)
          {
            id: 'l1-s6',
            type: 'text',
            content: {
              zh: '🧩 AI是怎么工作的？\n\nAI就像一个超级学霸，它的学习方法是：\n\n1️⃣ 看很多例子 👀\n就像你学认字，要看很多字卡一样，AI也要看成千上万的例子！\n\n2️⃣ 找规律 🔍\n看多了之后，AI就能发现规律。比如看了1万张猫的图片，它就知道猫长什么样了！\n\n3️⃣ 做判断 ✅\n学会之后，AI就能自己判断了。看到新图片，它能说"这是一只猫！"\n\n这个过程叫做"机器学习"！',
              ja: '🧩 AIはどうやって働くの？\n\nAIはすごい勉強家みたい。学び方は：\n\n1️⃣ たくさんの例を見る 👀\n字を覚えるためにカードをたくさん見るように、AIも何千もの例を見るよ！\n\n2️⃣ パターンを見つける 🔍\nたくさん見ると、AIはパターンを見つけられる。1万枚の猫の写真を見たら、猫がどんな姿か分かるようになる！\n\n3️⃣ 判断する ✅\n学んだ後、AIは自分で判断できる。新しい写真を見て「これは猫だ！」と言えるよ！\n\nこのプロセスを「機械学習」というんだ！'
            },
            duration: 3
          },
          // AI的秘密 (2分钟)
          {
            id: 'l1-s7',
            type: 'text',
            content: {
              zh: '📚 AI的小秘密\n\n🔸 AI不会天生就聪明\n它需要人类当老师，教它很多东西！\n\n🔸 AI需要大量的数据\n就像你需要做很多练习题才能考高分，AI也需要很多例子才能学好！\n\n🔸 AI也会犯错\n就像我们学习时会犯错一样，AI有时候也会判断错误。不过它会从错误中学习，变得越来越准确！\n\n🔸 AI是人类的好帮手\nAI不是来取代人类的，而是帮助我们更好地生活和工作！',
              ja: '📚 AIの小さな秘密\n\n🔸 AIは生まれつき賢いわけじゃない\n人間が先生になって、たくさんのことを教えるんだ！\n\n🔸 AIはたくさんのデータが必要\n高得点を取るために練習問題をたくさんするように、AIもたくさんの例が必要！\n\n🔸 AIも間違える\n勉強中に間違えるように、AIも時々判断を間違える。でも間違いから学んで、どんどん正確になるよ！\n\n🔸 AIは人間の良い助手\nAIは人間の代わりじゃなくて、生活や仕事をもっと良くするために助けてくれるんだ！'
            },
            duration: 2
          },
          // 总结 (2分钟)
          {
            id: 'l1-s8',
            type: 'text',
            content: {
              zh: '🎓 今天学到了什么？\n\n✅ AI（人工智能）是让电脑变聪明的技术\n✅ AI就在我们身边，帮助我们的生活\n✅ AI通过看很多例子来学习\n✅ AI是人类的好帮手，不是敌人\n\n太棒了！你已经迈出了学习AI的第一步！🌟\n\n接下来，让我们做一些有趣的练习，看看你学会了多少吧！',
              ja: '🎓 今日何を学んだ？\n\n✅ AI（人工知能）はコンピュータを賢くする技術\n✅ AIは私たちのそばにいて、生活を助けてくれる\n✅ AIはたくさんの例を見て学ぶ\n✅ AIは人間の良い助手で、敵じゃない\n\nすごい！AIを学ぶ最初の一歩を踏み出したね！🌟\n\n次は楽しい練習をして、どれくらい学んだか見てみよう！'
            },
            duration: 2
          }
        ],
        exercises: [
          // 练习1：选择题
          {
            id: 'l1-e1',
            type: 'multiple-choice',
            question: {
              zh: '人工智能（AI）是什么？',
              ja: '人工知能（AI）とは何？'
            },
            options: [
              { id: 'a', text: { zh: '一种很好吃的糖果', ja: 'おいしいキャンディー' } },
              { id: 'b', text: { zh: '让电脑变聪明的技术', ja: 'コンピュータを賢くする技術' } },
              { id: 'c', text: { zh: '一种玩具机器人', ja: 'おもちゃのロボット' } },
              { id: 'd', text: { zh: '一种新的游戏', ja: '新しいゲーム' } }
            ],
            correctAnswer: 'b',
            hint: { zh: '想一想，AI能帮电脑做什么？', ja: 'AIはコンピュータに何をさせる？' },
            encouragement: { zh: '太棒了！你真聪明！🌟', ja: 'すごい！とっても賢いね！🌟' },
            explanation: { zh: 'AI就是让电脑和机器变得更聪明的技术，就像给电脑装上了大脑！', ja: 'AIはコンピュータや機械を賢くする技術だよ。コンピュータに脳をつけるようなもの！' }
          },
          // 练习2：选择题
          {
            id: 'l1-e2',
            type: 'multiple-choice',
            question: {
              zh: '下面哪个是生活中AI的例子？',
              ja: '次のうち、生活の中のAIの例はどれ？'
            },
            options: [
              { id: 'a', text: { zh: '智能音箱回答你的问题', ja: 'スマートスピーカーが質問に答える' } },
              { id: 'b', text: { zh: '普通的台灯开关', ja: '普通のデスクランプのスイッチ' } },
              { id: 'c', text: { zh: '一本书', ja: '本' } },
              { id: 'd', text: { zh: '一支铅笔', ja: '鉛筆' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '答对了！智能音箱用AI来理解你说的话！🎤', ja: '正解！スマートスピーカーはAIを使って話を理解するんだ！🎤' },
            explanation: { zh: '智能音箱能听懂你说话，还能回答问题，这就是AI在工作！', ja: 'スマートスピーカーは話を理解して質問に答えられる。これがAIの仕事だよ！' }
          },
          // 练习3：排序题
          {
            id: 'l1-e3',
            type: 'code-blocks',
            question: {
              zh: '请按顺序排列AI学习的步骤：',
              ja: 'AIの学習ステップを順番に並べてね：'
            },
            options: [
              { id: 'a', text: { zh: '做判断', ja: '判断する' } },
              { id: 'b', text: { zh: '看很多例子', ja: 'たくさんの例を見る' } },
              { id: 'c', text: { zh: '找规律', ja: 'パターンを見つける' } }
            ],
            correctAnswer: ['b', 'c', 'a'],
            encouragement: { zh: '完美！你已经理解AI的学习过程了！🧠', ja: 'パーフェクト！AIの学習プロセスを理解したね！🧠' },
            explanation: { zh: 'AI先看例子，然后找规律，最后就能做判断了！', ja: 'AIはまず例を見て、パターンを見つけて、最後に判断できるようになるよ！' }
          },
          // 练习4：选择题
          {
            id: 'l1-e4',
            type: 'multiple-choice',
            question: {
              zh: 'AI需要人类来教它吗？',
              ja: 'AIは人間に教えてもらう必要がある？'
            },
            options: [
              { id: 'a', text: { zh: '需要，人类是AI的老师', ja: '必要、人間はAIの先生' } },
              { id: 'b', text: { zh: '不需要，AI天生就很聪明', ja: '不要、AIは生まれつき賢い' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '答对了！人类是AI的好老师！👨‍🏫', ja: '正解！人間はAIの良い先生！👨‍🏫' },
            explanation: { zh: 'AI需要人类给它很多例子和数据，它才能学会！', ja: 'AIは人間からたくさんの例とデータをもらって学ぶんだ！' }
          },
          // 练习5：选择题
          {
            id: 'l1-e5',
            type: 'multiple-choice',
            question: {
              zh: 'AI和人类是什么关系？',
              ja: 'AIと人間の関係は？'
            },
            options: [
              { id: 'a', text: { zh: 'AI是人类的敌人', ja: 'AIは人間の敵' } },
              { id: 'b', text: { zh: 'AI是人类的老板', ja: 'AIは人間のボス' } },
              { id: 'c', text: { zh: 'AI是人类的好帮手', ja: 'AIは人間の良い助手' } },
              { id: 'd', text: { zh: 'AI和人类没有关系', ja: 'AIと人間は関係ない' } }
            ],
            correctAnswer: 'c',
            encouragement: { zh: '正确！AI是我们的好朋友和帮手！🤝', ja: '正解！AIは私たちの良い友達と助手！🤝' },
            explanation: { zh: 'AI帮助我们更好地生活和工作，是人类的好伙伴！', ja: 'AIは生活や仕事をもっと良くするために助けてくれる、人間の良いパートナーだよ！' }
          }
        ],
        quiz: {
          id: 'l1-quiz',
          passingScore: 3,
          maxStars: 5,
          questions: [
            {
              id: 'l1-q1',
              type: 'multiple-choice',
              question: { zh: 'AI是什么的缩写？', ja: 'AIは何の略？' },
              options: [
                { id: 'a', text: { zh: 'Artificial Intelligence（人工智能）', ja: 'Artificial Intelligence（人工知能）' } },
                { id: 'b', text: { zh: 'Apple iPhone（苹果手机）', ja: 'Apple iPhone（アップルの携帯）' } },
                { id: 'c', text: { zh: 'Amazing Internet（神奇网络）', ja: 'Amazing Internet（素晴らしいネット）' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '完美！AI = Artificial Intelligence = 人工智能！🌟', ja: 'パーフェクト！AI = Artificial Intelligence = 人工知能！🌟' }
            },
            {
              id: 'l1-q2',
              type: 'multiple-choice',
              question: { zh: '下面哪个不是AI的应用？', ja: '次のうち、AIの応用じゃないのはどれ？' },
              options: [
                { id: 'a', text: { zh: '人脸识别解锁手机', ja: '顔認証でスマホを解除' } },
                { id: 'b', text: { zh: '智能音箱播放音乐', ja: 'スマートスピーカーで音楽を流す' } },
                { id: 'c', text: { zh: '用钥匙开门', ja: '鍵でドアを開ける' } }
              ],
              correctAnswer: 'c',
              encouragement: { zh: '太厉害了！用钥匙开门不需要AI！🔑', ja: 'すごい！鍵でドアを開けるのはAIいらないね！🔑' }
            },
            {
              id: 'l1-q3',
              type: 'multiple-choice',
              question: { zh: 'AI学习需要什么？', ja: 'AIの学習には何が必要？' },
              options: [
                { id: 'a', text: { zh: '很多例子和数据', ja: 'たくさんの例とデータ' } },
                { id: 'b', text: { zh: '一本魔法书', ja: '魔法の本' } },
                { id: 'c', text: { zh: '什么都不需要', ja: '何もいらない' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '正确！AI需要大量的例子来学习！📚', ja: '正解！AIはたくさんの例が必要！📚' }
            },
            {
              id: 'l1-q4',
              type: 'multiple-choice',
              question: { zh: 'AI会犯错吗？', ja: 'AIは間違える？' },
              options: [
                { id: 'a', text: { zh: '不会，AI永远正确', ja: 'いいえ、AIは常に正しい' } },
                { id: 'b', text: { zh: '会，但它会从错误中学习', ja: 'はい、でも間違いから学ぶ' } },
                { id: 'c', text: { zh: 'AI不知道什么是错误', ja: 'AIは間違いを知らない' } }
              ],
              correctAnswer: 'b',
              encouragement: { zh: '答对了！AI也会犯错，但它会不断进步！💪', ja: '正解！AIも間違えるけど、どんどん上達するよ！💪' }
            },
            {
              id: 'l1-q5',
              type: 'multiple-choice',
              question: { zh: '今天的课程，你觉得AI是...', ja: '今日のレッスン、AIは...' },
              options: [
                { id: 'a', text: { zh: '人类的好帮手', ja: '人間の良い助手' } },
                { id: 'b', text: { zh: '可怕的机器', ja: '怖い機械' } },
                { id: 'c', text: { zh: '没有用的东西', ja: '役に立たないもの' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '🎉 恭喜你完成了第一课！AI是我们的好朋友！', ja: '🎉 おめでとう！第1課完了！AIは私たちの良い友達！' }
            }
          ]
        }
      },
      // 第2课
      {
        id: 'lesson-2',
        unitId: 'unit-1',
        order: 2,
        title: { zh: 'AI能做什么？', ja: 'AIは何ができる？' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l2-s1',
            type: 'intro',
            content: {
              zh: '今天让我们来看看AI在生活中的神奇表现吧！',
              ja: '今日は生活の中でAIができる不思議なことを見てみよう！'
            },
            duration: 2
          },
          {
            id: 'l2-s2',
            type: 'text',
            content: {
              zh: '🎮 AI可以做很多神奇的事情：\n\n📸 **看图识物** - AI可以认出照片里的猫、狗、花朵\n🎵 **听歌识曲** - AI可以听出是什么歌\n🗣️ **语音助手** - 小爱同学、Siri都是AI\n🎮 **玩游戏** - AI可以下棋、玩电子游戏\n🚗 **开车** - 自动驾驶汽车也是AI',
              ja: '🎮 AIができる不思議なこと：\n\n📸 **画像認識** - 猫、犬、花を見分ける\n🎵 **曲を聴いて認識** - 何の曲かわかる\n🗣️ **音声アシスタント** - SiriもAI\n🎮 **ゲーム** - 将棋やゲームができる\n🚗 **運転** - 自動運転車もAI'
            },
            duration: 5
          },
          {
            id: 'l2-s3',
            type: 'interactive',
            content: {
              zh: '来玩个游戏！把下面的东西分成"AI可以做"和"AI不能做"两类吧！',
              ja: 'ゲームをしよう！下のものを「AIにできる」と「AIにできない」に分けてね！'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l2-e1',
            type: 'drag-drop',
            question: {
              zh: '把下面的事情分类：AI可以做 vs AI做不到',
              ja: '分類しよう：AIにできる vs AIにできない'
            },
            options: [
              { id: 'a', text: { zh: '认出照片里的狗', ja: '写真の犬を認識する' } },
              { id: 'b', text: { zh: '真正地闻到花香', ja: '本当に花の香りを嗅ぐ' } },
              { id: 'c', text: { zh: '翻译外语', ja: '外国語を翻訳する' } },
              { id: 'd', text: { zh: '感受真正的饥饿', ja: '本当の空腹を感じる' } }
            ],
            correctAnswer: ['a', 'c'],
            hint: { zh: 'AI擅长处理信息，但不能真正体验感觉', ja: 'AIは情報処理が得意だけど、本当の感覚は体験できない' },
            encouragement: { zh: '你分得真好！🌈', ja: '上手に分けられたね！🌈' }
          },
          {
            id: 'l2-e2',
            type: 'multiple-choice',
            question: {
              zh: '手机上的语音助手（如Siri）是AI吗？',
              ja: 'スマホの音声アシスタント（Siriなど）はAI？'
            },
            options: [
              { id: 'a', text: { zh: '是的，它能听懂我们说话', ja: 'はい、話を理解できるから' } },
              { id: 'b', text: { zh: '不是，它只是录音', ja: 'いいえ、録音だけ' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '没错！语音助手是AI的好例子！🎤', ja: '正解！音声アシスタントはAIの良い例！🎤' }
          }
        ]
      },
      // 第3课
      {
        id: 'lesson-3',
        unitId: 'unit-1',
        order: 3,
        title: { zh: '聪明的机器人', ja: '賢いロボット' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l3-s1',
            type: 'intro',
            content: {
              zh: '机器人和AI是一回事吗？让我们来探索！',
              ja: 'ロボットとAIは同じ？探検してみよう！'
            },
            duration: 2
          },
          {
            id: 'l3-s2',
            type: 'text',
            content: {
              zh: '🤖 机器人 vs AI：\n\n**机器人**是有身体的机器，可以走路、抓东西\n**AI**是让机器变聪明的"大脑"\n\n有的机器人有AI（聪明机器人）\n有的机器人没有AI（只会按固定程序做事）\n有的AI没有机器人身体（比如手机里的Siri）',
              ja: '🤖 ロボット vs AI：\n\n**ロボット**は体を持つ機械、歩いたり物を掴んだり\n**AI**は機械を賢くする「脳」\n\nAI付きロボットもいる（賢いロボット）\nAIなしのロボットもいる（決まった動きだけ）\n体のないAIもある（スマホのSiriなど）'
            },
            duration: 5
          },
          {
            id: 'l3-s3',
            type: 'image',
            content: {
              zh: '看！这是一个有AI大脑的聪明机器人，它可以学习新技能！',
              ja: '見て！AIの脳を持つ賢いロボット、新しいことを学べるよ！'
            },
            imageUrl: '/images/kids/smart-robot.png',
            duration: 3
          }
        ],
        exercises: [
          {
            id: 'l3-e1',
            type: 'multiple-choice',
            question: {
              zh: '所有机器人都有AI吗？',
              ja: 'すべてのロボットにAIがある？'
            },
            options: [
              { id: 'a', text: { zh: '是的，机器人都很聪明', ja: 'はい、みんな賢い' } },
              { id: 'b', text: { zh: '不是，有的机器人只会做固定的事', ja: 'いいえ、決まったことしかできないロボットもいる' } }
            ],
            correctAnswer: 'b',
            encouragement: { zh: '完全正确！🎯', ja: '完全正解！🎯' }
          },
          {
            id: 'l3-e2',
            type: 'match',
            question: {
              zh: '连线：哪些是聪明的AI机器人？',
              ja: 'マッチング：賢いAIロボットはどれ？'
            },
            options: [
              { id: 'a', text: { zh: '会学习下棋的机器人', ja: '将棋を学ぶロボット' } },
              { id: 'b', text: { zh: '只会前后走的玩具车', ja: '前後に動くだけのおもちゃ車' } },
              { id: 'c', text: { zh: '能认出主人的机器狗', ja: '飼い主を認識できるロボット犬' } }
            ],
            correctAnswer: ['a', 'c'],
            encouragement: { zh: '你真是太棒了！🌟', ja: 'すごいね！🌟' }
          }
        ]
      },
      // 第4课
      {
        id: 'lesson-4',
        unitId: 'unit-1',
        order: 4,
        title: { zh: '教机器认图片', ja: '機械に画像を教えよう' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l4-s1',
            type: 'intro',
            content: {
              zh: '今天我们来当小老师，教AI认识图片！',
              ja: '今日は先生になって、AIに画像を教えよう！'
            },
            duration: 2
          },
          {
            id: 'l4-s2',
            type: 'text',
            content: {
              zh: '📸 AI怎么学认图片？\n\n就像你学认字一样！\n1. 看很多很多猫的图片 🐱🐱🐱\n2. 有人告诉它"这是猫"\n3. 看得越多，认得越准！\n\n这就叫"机器学习"！',
              ja: '📸 AIはどうやって画像を学ぶ？\n\n君が字を学ぶのと同じ！\n1. たくさんの猫の写真を見る 🐱🐱🐱\n2. 「これは猫」と教えてもらう\n3. たくさん見るほど正確になる！\n\nこれが「機械学習」！'
            },
            duration: 5
          },
          {
            id: 'l4-s3',
            type: 'interactive',
            content: {
              zh: '来！我们一起当AI的老师，教它认识动物吧！',
              ja: 'さあ！AIの先生になって、動物を教えよう！'
            },
            duration: 8
          }
        ],
        exercises: [
          {
            id: 'l4-e1',
            type: 'drag-drop',
            question: {
              zh: '帮AI分类：把动物拖到正确的类别',
              ja: 'AIを手伝おう：動物を正しいカテゴリーへ'
            },
            options: [
              { id: 'cat1', text: { zh: '橘猫', ja: 'オレンジ猫' } },
              { id: 'dog1', text: { zh: '金毛犬', ja: 'ゴールデン' } },
              { id: 'cat2', text: { zh: '黑猫', ja: '黒猫' } },
              { id: 'dog2', text: { zh: '哈士奇', ja: 'ハスキー' } }
            ],
            correctAnswer: ['cat1', 'cat2'],
            hint: { zh: '看看它们的特征！猫有什么特点？', ja: '特徴を見て！猫の特徴は？' },
            encouragement: { zh: '你是最棒的AI老师！🏆', ja: '最高のAI先生！🏆' }
          },
          {
            id: 'l4-e2',
            type: 'multiple-choice',
            question: {
              zh: 'AI学认图片需要什么？',
              ja: 'AIが画像を学ぶには何が必要？'
            },
            options: [
              { id: 'a', text: { zh: '只需要1张图片', ja: '1枚の写真だけ' } },
              { id: 'b', text: { zh: '需要很多很多图片', ja: 'たくさんの写真' } },
              { id: 'c', text: { zh: '不需要图片', ja: '写真は不要' } }
            ],
            correctAnswer: 'b',
            encouragement: { zh: '对！AI需要大量数据来学习！📚', ja: '正解！AIは大量のデータで学ぶ！📚' }
          }
        ]
      },
      // 第5课
      {
        id: 'lesson-5',
        unitId: 'unit-1',
        order: 5,
        title: { zh: '教机器听声音', ja: '機械に音を教えよう' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l5-s1',
            type: 'intro',
            content: {
              zh: 'AI不仅能看，还能听！让我们来探索语音识别！',
              ja: 'AIは見るだけじゃなく、聞くこともできる！音声認識を探検しよう！'
            },
            duration: 2
          },
          {
            id: 'l5-s2',
            type: 'text',
            content: {
              zh: '🎤 AI怎么听懂我们说话？\n\n1. 麦克风把声音变成"波形"📈\n2. AI分析这些波形的形状\n3. 找到和它学过的声音最像的\n4. 就知道你说了什么！\n\n这就是"语音识别"！',
              ja: '🎤 AIはどうやって話を理解する？\n\n1. マイクが音を「波形」に変える📈\n2. AIがこの波形の形を分析\n3. 学んだ音と一番似ているものを探す\n4. 何を言ったかわかる！\n\nこれが「音声認識」！'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l5-e1',
            type: 'multiple-choice',
            question: {
              zh: 'AI识别语音的第一步是什么？',
              ja: 'AI音声認識の最初のステップは？'
            },
            options: [
              { id: 'a', text: { zh: '把声音变成波形', ja: '音を波形に変える' } },
              { id: 'b', text: { zh: '直接理解意思', ja: '直接意味を理解する' } },
              { id: 'c', text: { zh: '画一幅画', ja: '絵を描く' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '太聪明了！🎵', ja: 'とても賢い！🎵' }
          },
          {
            id: 'l5-e2',
            type: 'order',
            question: {
              zh: '把语音识别的步骤排序',
              ja: '音声認識のステップを順番に並べよう'
            },
            options: [
              { id: 'a', text: { zh: 'AI分析波形', ja: 'AIが波形を分析' } },
              { id: 'b', text: { zh: '麦克风收集声音', ja: 'マイクが音を集める' } },
              { id: 'c', text: { zh: 'AI告诉你结果', ja: 'AIが結果を教える' } },
              { id: 'd', text: { zh: '声音变成波形', ja: '音が波形になる' } }
            ],
            correctAnswer: ['b', 'd', 'a', 'c'],
            encouragement: { zh: '排序完美！🌟', ja: '順番パーフェクト！🌟' }
          }
        ]
      },
      // 第6课 - 单元测验
      {
        id: 'lesson-6',
        unitId: 'unit-1',
        order: 6,
        title: { zh: '单元小测验', ja: 'ユニットテスト' },
        duration: 15,
        type: 'quiz',
        starsReward: 15,
        sections: [
          {
            id: 'l6-s1',
            type: 'intro',
            content: {
              zh: '恭喜你学完了第一单元！现在让我们来检验一下学习成果吧！',
              ja: '第1ユニット完了おめでとう！学んだことをテストしよう！'
            },
            duration: 2
          }
        ],
        exercises: [],
        quiz: {
          id: 'unit-1-quiz',
          passingScore: 3,
          maxStars: 5,
          questions: [
            {
              id: 'u1-q1',
              type: 'multiple-choice',
              question: { zh: '人工智能是什么？', ja: '人工知能とは？' },
              options: [
                { id: 'a', text: { zh: '让机器变聪明的技术', ja: '機械を賢くする技術' } },
                { id: 'b', text: { zh: '一种食物', ja: '食べ物の一種' } },
                { id: 'c', text: { zh: '一种玩具', ja: 'おもちゃの一種' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '正确！', ja: '正解！' }
            },
            {
              id: 'u1-q2',
              type: 'multiple-choice',
              question: { zh: 'AI学习需要什么？', ja: 'AIの学習に必要なのは？' },
              options: [
                { id: 'a', text: { zh: '大量的数据和例子', ja: '大量のデータと例' } },
                { id: 'b', text: { zh: '只需要1个例子', ja: '1つの例だけ' } },
                { id: 'c', text: { zh: '不需要任何东西', ja: '何も必要ない' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '太棒了！', ja: 'すごい！' }
            },
            {
              id: 'u1-q3',
              type: 'multiple-choice',
              question: { zh: '下面哪个是AI的应用？', ja: '次のうちAIの応用は？' },
              options: [
                { id: 'a', text: { zh: '语音助手', ja: '音声アシスタント' } },
                { id: 'b', text: { zh: '普通的灯泡', ja: '普通の電球' } },
                { id: 'c', text: { zh: '一块石头', ja: '石' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '完美！', ja: 'パーフェクト！' }
            },
            {
              id: 'u1-q4',
              type: 'multiple-choice',
              question: { zh: '机器人和AI是一回事吗？', ja: 'ロボットとAIは同じ？' },
              options: [
                { id: 'a', text: { zh: '不是，机器人是身体，AI是大脑', ja: '違う、ロボットは体、AIは脳' } },
                { id: 'b', text: { zh: '是的，完全一样', ja: 'はい、全く同じ' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '你理解得很透彻！', ja: 'よく理解してる！' }
            },
            {
              id: 'u1-q5',
              type: 'multiple-choice',
              question: { zh: 'AI是人类的...', ja: 'AIは人間の...' },
              options: [
                { id: 'a', text: { zh: '好帮手', ja: '良い助手' } },
                { id: 'b', text: { zh: '替代者', ja: '代わり' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '太对了！AI是我们的好朋友！🤝', ja: '正解！AIは良い友達！🤝' }
            }
          ]
        }
      }
    ]
  },

  // ============================================
  // 第二单元：Python小魔法师
  // ============================================
  {
    id: 'unit-2',
    title: { zh: 'Python小魔法师', ja: 'Python小さな魔法使い' },
    description: { zh: '学习Python编程基础，写出你的第一个程序', ja: 'Pythonプログラミングの基礎を学び、最初のプログラムを書こう' },
    icon: '🐍',
    color: '#4ECDC4',
    badge: skillBadges[1],
    lessons: [
      // 第7课
      {
        id: 'lesson-7',
        unitId: 'unit-2',
        order: 1,
        title: { zh: '认识Python', ja: 'Pythonを知ろう' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l7-s1',
            type: 'intro',
            content: {
              zh: '今天我们要认识一个神奇的编程语言——Python！',
              ja: '今日は不思議なプログラミング言語——Pythonを紹介するよ！'
            },
            duration: 2
          },
          {
            id: 'l7-s2',
            type: 'text',
            content: {
              zh: '🐍 为什么叫Python？\n\nPython是一种蟒蛇的名字！\n创造它的人很喜欢一个叫"Monty Python"的喜剧节目\n所以就用Python这个名字啦！\n\nPython语言简单易学，是小朋友学编程的最佳选择！',
              ja: '🐍 なぜPythonという名前？\n\nPythonは大蛇の名前！\n作った人が「モンティ・パイソン」というコメディ番組が好きで\nPythonという名前にしたんだ！\n\nPythonは簡単で学びやすい、子供がプログラミングを学ぶのに最適！'
            },
            duration: 5
          },
          {
            id: 'l7-s3',
            type: 'text',
            content: {
              zh: '💻 Python能做什么？\n\n🎮 做游戏\n🤖 创造AI\n📊 分析数据\n🌐 做网站\n🎨 画图画\n\n世界上很多厉害的程序都是用Python写的！',
              ja: '💻 Pythonで何ができる？\n\n🎮 ゲームを作る\n🤖 AIを作る\n📊 データを分析\n🌐 ウェブサイトを作る\n🎨 絵を描く\n\n世界中のすごいプログラムがPythonで書かれてる！'
            },
            duration: 3
          }
        ],
        exercises: [
          {
            id: 'l7-e1',
            type: 'multiple-choice',
            question: {
              zh: 'Python是什么？',
              ja: 'Pythonとは何？'
            },
            options: [
              { id: 'a', text: { zh: '一种编程语言', ja: 'プログラミング言語' } },
              { id: 'b', text: { zh: '一种宠物', ja: 'ペット' } },
              { id: 'c', text: { zh: '一种游戏', ja: 'ゲーム' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '正确！Python是一种很厉害的编程语言！🐍', ja: '正解！Pythonはすごいプログラミング言語！🐍' }
          }
        ]
      },
      // 第8课
      {
        id: 'lesson-8',
        unitId: 'unit-2',
        order: 2,
        title: { zh: '让电脑说话 (print)', ja: '電脑に話させよう (print)' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l8-s1',
            type: 'intro',
            content: {
              zh: '今天我们学习第一个Python魔法咒语——print！',
              ja: '今日は最初のPython魔法の呪文——printを学ぼう！'
            },
            duration: 2
          },
          {
            id: 'l8-s2',
            type: 'code',
            content: {
              zh: 'print 是"打印"的意思，可以让电脑显示文字：',
              ja: 'print は「印刷」という意味、コンピュータに文字を表示させる：'
            },
            codeExample: 'print("你好，世界！")\nprint("Hello, World!")',
            duration: 5
          },
          {
            id: 'l8-s3',
            type: 'text',
            content: {
              zh: '📝 记住这个格式：\n\n```python\nprint("要显示的内容")\n```\n\n注意：\n- print后面有括号 ()\n- 文字要用引号 "" 包起来',
              ja: '📝 この形式を覚えて：\n\n```python\nprint("表示したい内容")\n```\n\n注意：\n- printの後にカッコ ()\n- 文字は引用符 "" で囲む'
            },
            duration: 3
          }
        ],
        exercises: [
          {
            id: 'l8-e1',
            type: 'code-blocks',
            question: {
              zh: '拼出正确的代码，让电脑说"你好"',
              ja: '正しいコードを組み立てて、「こんにちは」と言わせよう'
            },
            options: [
              { id: 'a', text: { zh: 'print', ja: 'print' } },
              { id: 'b', text: { zh: '(', ja: '(' } },
              { id: 'c', text: { zh: '"你好"', ja: '"こんにちは"' } },
              { id: 'd', text: { zh: ')', ja: ')' } }
            ],
            correctAnswer: ['a', 'b', 'c', 'd'],
            encouragement: { zh: '太棒了！你写出了第一行代码！💻', ja: 'すごい！最初のコードが書けた！💻' }
          },
          {
            id: 'l8-e2',
            type: 'fill-blank',
            question: {
              zh: '补全代码：___("我爱编程")',
              ja: 'コードを完成させて：___("プログラミング大好き")'
            },
            correctAnswer: 'print',
            hint: { zh: '用什么命令让电脑显示文字？', ja: '何のコマンドで文字を表示する？' },
            encouragement: { zh: '答对了！print就是让电脑说话的魔法！✨', ja: '正解！printはコンピュータに話させる魔法！✨' }
          }
        ]
      },
      // 第9课
      {
        id: 'lesson-9',
        unitId: 'unit-2',
        order: 3,
        title: { zh: '给电脑取名字 (变量)', ja: '変数に名前をつけよう' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l9-s1',
            type: 'intro',
            content: {
              zh: '今天我们学习给东西取名字——变量！',
              ja: '今日はものに名前をつけることを学ぼう——変数！'
            },
            duration: 2
          },
          {
            id: 'l9-s2',
            type: 'text',
            content: {
              zh: '📦 变量就像一个小盒子：\n\n- 盒子有名字（变量名）\n- 盒子里装东西（值）\n\n比如：\nname = "小明"  # 创建一个叫name的盒子，里面放"小明"\nage = 8        # 创建一个叫age的盒子，里面放数字8',
              ja: '📦 変数は小さな箱のよう：\n\n- 箱には名前がある（変数名）\n- 箱の中に何かを入れる（値）\n\n例えば：\nname = "太郎"  # nameという箱を作り、"太郎"を入れる\nage = 8        # ageという箱を作り、数字8を入れる'
            },
            duration: 5
          },
          {
            id: 'l9-s3',
            type: 'code',
            content: {
              zh: '来看看变量怎么用：',
              ja: '変数の使い方を見てみよう：'
            },
            codeExample: 'name = "小明"\nprint("你好，" + name)\n# 输出：你好，小明',
            duration: 3
          }
        ],
        exercises: [
          {
            id: 'l9-e1',
            type: 'multiple-choice',
            question: {
              zh: '变量是什么？',
              ja: '変数とは何？'
            },
            options: [
              { id: 'a', text: { zh: '存放数据的小盒子', ja: 'データを入れる小さな箱' } },
              { id: 'b', text: { zh: '一种食物', ja: '食べ物の一種' } },
              { id: 'c', text: { zh: '一种游戏', ja: 'ゲーム' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '正确！变量就是装数据的盒子！📦', ja: '正解！変数はデータを入れる箱！📦' }
          },
          {
            id: 'l9-e2',
            type: 'code-blocks',
            question: {
              zh: '创建一个变量，把"苹果"放进去',
              ja: '変数を作って、"りんご"を入れよう'
            },
            options: [
              { id: 'a', text: { zh: 'fruit', ja: 'fruit' } },
              { id: 'b', text: { zh: '=', ja: '=' } },
              { id: 'c', text: { zh: '"苹果"', ja: '"りんご"' } }
            ],
            correctAnswer: ['a', 'b', 'c'],
            encouragement: { zh: '太厉害了！你会创建变量了！🎉', ja: 'すごい！変数が作れるようになった！🎉' }
          }
        ]
      },
      // 第10课
      {
        id: 'lesson-10',
        unitId: 'unit-2',
        order: 4,
        title: { zh: '加减乘除小计算', ja: '足し算引き算かけ算割り算' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l10-s1',
            type: 'intro',
            content: {
              zh: 'Python可以当计算器！让我们学习数学运算！',
              ja: 'Pythonは電卓になれる！数学の計算を学ぼう！'
            },
            duration: 2
          },
          {
            id: 'l10-s2',
            type: 'code',
            content: {
              zh: 'Python的数学运算符：',
              ja: 'Pythonの数学演算子：'
            },
            codeExample: '# 加法\nprint(5 + 3)   # 结果: 8\n\n# 减法\nprint(10 - 4)  # 结果: 6\n\n# 乘法\nprint(3 * 4)   # 结果: 12\n\n# 除法\nprint(15 / 3)  # 结果: 5',
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l10-e1',
            type: 'fill-blank',
            question: {
              zh: '5 + 7 = ___',
              ja: '5 + 7 = ___'
            },
            correctAnswer: '12',
            encouragement: { zh: '算得真准！🧮', ja: '計算正確！🧮' }
          },
          {
            id: 'l10-e2',
            type: 'multiple-choice',
            question: {
              zh: 'print(4 * 5) 会输出什么？',
              ja: 'print(4 * 5) は何を出力する？'
            },
            options: [
              { id: 'a', text: { zh: '20', ja: '20' } },
              { id: 'b', text: { zh: '9', ja: '9' } },
              { id: 'c', text: { zh: '45', ja: '45' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '正确！4乘5等于20！✨', ja: '正解！4かける5は20！✨' }
          }
        ]
      },
      // 第11课
      {
        id: 'lesson-11',
        unitId: 'unit-2',
        order: 5,
        title: { zh: '做个小程序', ja: '小さなプログラムを作ろう' },
        duration: 15,
        type: 'project',
        starsReward: 15,
        sections: [
          {
            id: 'l11-s1',
            type: 'intro',
            content: {
              zh: '今天我们来做一个完整的小程序！',
              ja: '今日は完全な小さなプログラムを作ろう！'
            },
            duration: 2
          },
          {
            id: 'l11-s2',
            type: 'code',
            content: {
              zh: '让我们做一个自我介绍程序：',
              ja: '自己紹介プログラムを作ろう：'
            },
            codeExample: '# 我的自我介绍程序\nname = "小明"\nage = 8\nhobby = "画画"\n\nprint("大家好！")\nprint("我叫" + name)\nprint("我今年" + str(age) + "岁")\nprint("我喜欢" + hobby)',
            duration: 8
          }
        ],
        exercises: [
          {
            id: 'l11-e1',
            type: 'code-blocks',
            question: {
              zh: '完成代码：创建你的名字变量',
              ja: 'コードを完成：あなたの名前変数を作ろう'
            },
            options: [
              { id: 'a', text: { zh: 'my_name', ja: 'my_name' } },
              { id: 'b', text: { zh: '=', ja: '=' } },
              { id: 'c', text: { zh: '"我的名字"', ja: '"私の名前"' } }
            ],
            correctAnswer: ['a', 'b', 'c'],
            encouragement: { zh: '太棒了！你做出了自己的程序！🎊', ja: 'すごい！自分のプログラムができた！🎊' }
          }
        ]
      },
      // 第12课 - 单元测验
      {
        id: 'lesson-12',
        unitId: 'unit-2',
        order: 6,
        title: { zh: '单元小测验', ja: 'ユニットテスト' },
        duration: 15,
        type: 'quiz',
        starsReward: 15,
        sections: [
          {
            id: 'l12-s1',
            type: 'intro',
            content: {
              zh: '太棒了！你已经学会了Python基础！来测验一下吧！',
              ja: 'すごい！Pythonの基礎を学んだ！テストしてみよう！'
            },
            duration: 2
          }
        ],
        exercises: [],
        quiz: {
          id: 'unit-2-quiz',
          passingScore: 3,
          maxStars: 5,
          questions: [
            {
              id: 'u2-q1',
              type: 'multiple-choice',
              question: { zh: 'print("你好") 会做什么？', ja: 'print("こんにちは") は何をする？' },
              options: [
                { id: 'a', text: { zh: '在屏幕上显示"你好"', ja: '画面に"こんにちは"を表示' } },
                { id: 'b', text: { zh: '打印一张纸', ja: '紙を印刷する' } },
                { id: 'c', text: { zh: '删除文件', ja: 'ファイルを削除' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '正确！', ja: '正解！' }
            },
            {
              id: 'u2-q2',
              type: 'multiple-choice',
              question: { zh: '变量是什么？', ja: '変数とは？' },
              options: [
                { id: 'a', text: { zh: '存放数据的盒子', ja: 'データを入れる箱' } },
                { id: 'b', text: { zh: '一种水果', ja: '果物' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '完美！', ja: 'パーフェクト！' }
            },
            {
              id: 'u2-q3',
              type: 'fill-blank',
              question: { zh: '3 * 4 = ___', ja: '3 * 4 = ___' },
              correctAnswer: '12',
              encouragement: { zh: '算得真好！', ja: '計算正確！' }
            },
            {
              id: 'u2-q4',
              type: 'multiple-choice',
              question: { zh: 'name = "小红" 这行代码做了什么？', ja: 'name = "花子" このコードは何をした？' },
              options: [
                { id: 'a', text: { zh: '创建了一个叫name的变量', ja: 'nameという変数を作った' } },
                { id: 'b', text: { zh: '打印了小红', ja: '花子を印刷した' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '你理解得很好！', ja: 'よく理解してる！' }
            },
            {
              id: 'u2-q5',
              type: 'multiple-choice',
              question: { zh: 'Python可以做什么？', ja: 'Pythonで何ができる？' },
              options: [
                { id: 'a', text: { zh: '做游戏、创造AI、分析数据', ja: 'ゲーム、AI、データ分析' } },
                { id: 'b', text: { zh: '只能做计算', ja: '計算だけ' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: 'Python真是太强大了！🐍', ja: 'Pythonはすごく強力！🐍' }
            }
          ]
        }
      }
    ]
  },

  // ============================================
  // 第三单元：AI画画和认图
  // ============================================
  {
    id: 'unit-3',
    title: { zh: 'AI画画和认图', ja: 'AIで絵を描いて認識しよう' },
    description: { zh: '探索AI如何看图片、画图片', ja: 'AIがどうやって画像を見て描くかを探検' },
    icon: '🖼️',
    color: '#A78BFA',
    badge: skillBadges[2],
    lessons: [
      // 第13课
      {
        id: 'lesson-13',
        unitId: 'unit-3',
        order: 1,
        title: { zh: 'AI怎么看图片', ja: 'AIはどうやって画像を見る？' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l13-s1',
            type: 'intro',
            content: {
              zh: '你知道吗？AI看图片和我们完全不一样！',
              ja: '知ってる？AIの画像の見方は私たちと全然違う！'
            },
            duration: 2
          },
          {
            id: 'l13-s2',
            type: 'text',
            content: {
              zh: '🎨 AI眼中的图片：\n\n对我们来说，图片是一幅美丽的画\n对AI来说，图片是一堆数字！\n\n每个小点（像素）都有一个数字\n这些数字告诉AI颜色是什么',
              ja: '🎨 AIから見た画像：\n\n私たちにとって、画像は美しい絵\nAIにとって、画像は数字の集まり！\n\n各小さな点（ピクセル）には数字がある\nこの数字が色を教える'
            },
            duration: 5
          },
          {
            id: 'l13-s3',
            type: 'text',
            content: {
              zh: '🔢 像素的秘密：\n\n- 0 = 黑色\n- 255 = 白色\n- 中间的数字 = 灰色\n\n彩色图片用三个数字：红、绿、蓝(RGB)',
              ja: '🔢 ピクセルの秘密：\n\n- 0 = 黒\n- 255 = 白\n- 中間の数字 = グレー\n\nカラー画像は3つの数字：赤、緑、青(RGB)'
            },
            duration: 3
          }
        ],
        exercises: [
          {
            id: 'l13-e1',
            type: 'multiple-choice',
            question: {
              zh: 'AI眼中的图片是什么？',
              ja: 'AIから見た画像は何？'
            },
            options: [
              { id: 'a', text: { zh: '一堆数字', ja: '数字の集まり' } },
              { id: 'b', text: { zh: '和我们看到的一样', ja: '私たちと同じ' } },
              { id: 'c', text: { zh: '文字', ja: '文字' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '正确！AI用数字来"看"图片！🔢', ja: '正解！AIは数字で画像を「見る」！🔢' }
          }
        ]
      },
      // 第14课
      {
        id: 'lesson-14',
        unitId: 'unit-3',
        order: 2,
        title: { zh: '教AI认猫狗', ja: 'AIに猫と犬を教えよう' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l14-s1',
            type: 'intro',
            content: {
              zh: '让我们来训练一个能分辨猫和狗的AI！',
              ja: '猫と犬を見分けるAIを訓練しよう！'
            },
            duration: 2
          },
          {
            id: 'l14-s2',
            type: 'text',
            content: {
              zh: '🐱🐕 训练AI的步骤：\n\n1. 收集很多猫和狗的图片\n2. 给每张图片贴标签（这是猫/这是狗）\n3. 让AI找规律（猫的特点、狗的特点）\n4. 用新图片测试AI学得怎么样',
              ja: '🐱🐕 AIを訓練するステップ：\n\n1. たくさんの猫と犬の写真を集める\n2. 各写真にラベルを付ける（これは猫/犬）\n3. AIにパターンを見つけさせる\n4. 新しい写真でAIをテスト'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l14-e1',
            type: 'drag-drop',
            question: {
              zh: '帮AI分类：这些是猫还是狗？',
              ja: 'AIを手伝おう：猫？犬？'
            },
            options: [
              { id: 'cat1', text: { zh: '喵喵叫的毛球', ja: 'ニャーと鳴く毛玉' } },
              { id: 'dog1', text: { zh: '汪汪叫的狗狗', ja: 'ワンと吠える犬' } },
              { id: 'cat2', text: { zh: '爱抓老鼠的动物', ja: 'ネズミを追う動物' } },
              { id: 'dog2', text: { zh: '爱摇尾巴的宠物', ja: 'しっぽを振るペット' } }
            ],
            correctAnswer: ['cat1', 'cat2'],
            encouragement: { zh: '分得太好了！🎉', ja: '上手に分けた！🎉' }
          }
        ]
      },
      // 第15-18课简化版
      {
        id: 'lesson-15',
        unitId: 'unit-3',
        order: 3,
        title: { zh: 'AI画家', ja: 'AI画家' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l15-s1',
            type: 'intro',
            content: {
              zh: 'AI不仅能看图，还能画图！',
              ja: 'AIは画像を見るだけじゃなく、描くこともできる！'
            },
            duration: 2
          },
          {
            id: 'l15-s2',
            type: 'text',
            content: {
              zh: '🎨 AI画图的秘密：\n\nAI学习了无数幅画之后\n就能创造出新的画作！\n\n你只需要告诉AI想画什么\n它就能帮你画出来！',
              ja: '🎨 AIが絵を描く秘密：\n\nAIはたくさんの絵を学んだ後\n新しい絵を作れる！\n\n描きたいものを伝えるだけ\nAIが描いてくれる！'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l15-e1',
            type: 'multiple-choice',
            question: {
              zh: 'AI怎么学会画画的？',
              ja: 'AIはどうやって絵を描くことを学んだ？'
            },
            options: [
              { id: 'a', text: { zh: '学习了很多画作', ja: 'たくさんの絵を学んだ' } },
              { id: 'b', text: { zh: '天生就会', ja: '生まれつきできる' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '对！AI需要学习很多例子！📚', ja: '正解！AIはたくさんの例を学ぶ！📚' }
          }
        ]
      },
      {
        id: 'lesson-16',
        unitId: 'unit-3',
        order: 4,
        title: { zh: '动手：图片分类器', ja: '実践：画像分類器' },
        duration: 15,
        type: 'project',
        starsReward: 15,
        sections: [
          {
            id: 'l16-s1',
            type: 'intro',
            content: {
              zh: '今天我们来体验做一个图片分类器！',
              ja: '今日は画像分類器を体験しよう！'
            },
            duration: 2
          }
        ],
        exercises: [
          {
            id: 'l16-e1',
            type: 'drag-drop',
            question: {
              zh: '把水果分到正确的类别',
              ja: '果物を正しいカテゴリーに分けよう'
            },
            options: [
              { id: 'apple', text: { zh: '苹果', ja: 'りんご' } },
              { id: 'banana', text: { zh: '香蕉', ja: 'バナナ' } },
              { id: 'orange', text: { zh: '橙子', ja: 'オレンジ' } },
              { id: 'grape', text: { zh: '葡萄', ja: 'ぶどう' } }
            ],
            correctAnswer: ['apple', 'orange'],
            hint: { zh: '哪些是圆形的水果？', ja: '丸い果物はどれ？' },
            encouragement: { zh: '你做到了！🍎', ja: 'できた！🍎' }
          }
        ]
      },
      {
        id: 'lesson-17',
        unitId: 'unit-3',
        order: 5,
        title: { zh: '动手：AI涂鸦', ja: '実践：AIお絵かき' },
        duration: 15,
        type: 'project',
        starsReward: 15,
        sections: [
          {
            id: 'l17-s1',
            type: 'intro',
            content: {
              zh: '让我们用AI来画画吧！',
              ja: 'AIで絵を描こう！'
            },
            duration: 2
          }
        ],
        exercises: [
          {
            id: 'l17-e1',
            type: 'multiple-choice',
            question: {
              zh: '如果你想让AI画一只猫，你会怎么告诉它？',
              ja: 'AIに猫を描かせたい時、どう伝える？'
            },
            options: [
              { id: 'a', text: { zh: '用文字描述想画的猫', ja: '描きたい猫を言葉で説明' } },
              { id: 'b', text: { zh: '不用说话，AI会读心术', ja: '何も言わない、AIは心を読める' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '对！我们用文字告诉AI想画什么！✏️', ja: '正解！言葉でAIに伝える！✏️' }
          }
        ]
      },
      // 第18课 - 单元测验
      {
        id: 'lesson-18',
        unitId: 'unit-3',
        order: 6,
        title: { zh: '单元小测验', ja: 'ユニットテスト' },
        duration: 15,
        type: 'quiz',
        starsReward: 15,
        sections: [
          {
            id: 'l18-s1',
            type: 'intro',
            content: {
              zh: '恭喜完成第三单元！来测验一下吧！',
              ja: '第3ユニット完了おめでとう！テストしよう！'
            },
            duration: 2
          }
        ],
        exercises: [],
        quiz: {
          id: 'unit-3-quiz',
          passingScore: 3,
          maxStars: 5,
          questions: [
            {
              id: 'u3-q1',
              type: 'multiple-choice',
              question: { zh: 'AI看图片时看到的是什么？', ja: 'AIが画像を見る時、何が見える？' },
              options: [
                { id: 'a', text: { zh: '数字', ja: '数字' } },
                { id: 'b', text: { zh: '和我们一样的画面', ja: '私たちと同じ画面' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '正确！', ja: '正解！' }
            },
            {
              id: 'u3-q2',
              type: 'multiple-choice',
              question: { zh: '像素是什么？', ja: 'ピクセルとは？' },
              options: [
                { id: 'a', text: { zh: '图片的最小点', ja: '画像の最小の点' } },
                { id: 'b', text: { zh: '一种水果', ja: '果物' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '完美！', ja: 'パーフェクト！' }
            },
            {
              id: 'u3-q3',
              type: 'multiple-choice',
              question: { zh: '训练AI认图需要什么？', ja: 'AIに画像を教えるには何が必要？' },
              options: [
                { id: 'a', text: { zh: '很多带标签的图片', ja: 'ラベル付きの写真をたくさん' } },
                { id: 'b', text: { zh: '只需要1张图', ja: '1枚の写真だけ' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: 'AI需要大量数据！', ja: 'AIは大量のデータが必要！' }
            },
            {
              id: 'u3-q4',
              type: 'multiple-choice',
              question: { zh: 'AI可以画画吗？', ja: 'AIは絵が描ける？' },
              options: [
                { id: 'a', text: { zh: '可以，学习后能创作', ja: 'できる、学習後に創作' } },
                { id: 'b', text: { zh: '不可以', ja: 'できない' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: 'AI画家真厉害！🎨', ja: 'AI画家はすごい！🎨' }
            },
            {
              id: 'u3-q5',
              type: 'multiple-choice',
              question: { zh: 'RGB代表什么？', ja: 'RGBは何を表す？' },
              options: [
                { id: 'a', text: { zh: '红、绿、蓝', ja: '赤、緑、青' } },
                { id: 'b', text: { zh: '大、中、小', ja: '大、中、小' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '颜色专家！🌈', ja: '色の専門家！🌈' }
            }
          ]
        }
      }
    ]
  },

  // ============================================
  // 第四单元：和AI聊天
  // ============================================
  {
    id: 'unit-4',
    title: { zh: '和AI聊天', ja: 'AIとおしゃべり' },
    description: { zh: '了解聊天机器人的原理，创建你的AI伙伴', ja: 'チャットボットの仕組みを学び、AI仲間を作ろう' },
    icon: '💬',
    color: '#10B981',
    badge: skillBadges[3],
    lessons: [
      // 第19课
      {
        id: 'lesson-19',
        unitId: 'unit-4',
        order: 1,
        title: { zh: '聊天机器人原理', ja: 'チャットボットの仕組み' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l19-s1',
            type: 'intro',
            content: {
              zh: '你好奇过智能音箱是怎么回答问题的吗？',
              ja: 'スマートスピーカーがどうやって質問に答えるか不思議に思ったことある？'
            },
            duration: 2
          },
          {
            id: 'l19-s2',
            type: 'text',
            content: {
              zh: '🗣️ 聊天机器人的工作流程：\n\n1. **听**：把你说的话变成文字\n2. **想**：理解你说的意思\n3. **找**：在"大脑"里找答案\n4. **说**：把答案说给你听',
              ja: '🗣️ チャットボットの仕組み：\n\n1. **聞く**：話を文字に変える\n2. **考える**：意味を理解する\n3. **探す**：「脳」の中で答えを探す\n4. **話す**：答えを伝える'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l19-e1',
            type: 'order',
            question: {
              zh: '把聊天机器人的工作步骤排序',
              ja: 'チャットボットの手順を順番に並べよう'
            },
            options: [
              { id: 'a', text: { zh: '理解意思', ja: '意味を理解' } },
              { id: 'b', text: { zh: '听你说话', ja: '話を聞く' } },
              { id: 'c', text: { zh: '回答你', ja: '答える' } },
              { id: 'd', text: { zh: '找答案', ja: '答えを探す' } }
            ],
            correctAnswer: ['b', 'a', 'd', 'c'],
            encouragement: { zh: '排序正确！🎯', ja: '順番正解！🎯' }
          }
        ]
      },
      // 第20课
      {
        id: 'lesson-20',
        unitId: 'unit-4',
        order: 2,
        title: { zh: '教AI说话', ja: 'AIに話を教えよう' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l20-s1',
            type: 'intro',
            content: {
              zh: '让我们来教AI一些简单的对话！',
              ja: 'AIに簡単な会話を教えよう！'
            },
            duration: 2
          },
          {
            id: 'l20-s2',
            type: 'text',
            content: {
              zh: '💬 简单的对话规则：\n\n如果用户说"你好" → AI回答"你好！有什么能帮你的吗？"\n如果用户说"再见" → AI回答"再见！下次见！"\n如果用户问"你叫什么" → AI回答"我是小AI！"',
              ja: '💬 簡単な会話ルール：\n\nユーザーが「こんにちは」→ AI「こんにちは！何かお手伝いしましょうか？」\nユーザーが「さようなら」→ AI「さようなら！また会おうね！」\nユーザーが「名前は？」→ AI「AIちゃんだよ！」'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l20-e1',
            type: 'match',
            question: {
              zh: '连线：用户说什么，AI应该回答什么？',
              ja: 'マッチング：ユーザーが言ったら、AIは何と答える？'
            },
            options: [
              { id: 'a', text: { zh: '用户："你好" → AI："你好！"', ja: 'ユーザー：「こんにちは」→ AI：「こんにちは！」' } },
              { id: 'b', text: { zh: '用户："你好" → AI："再见"', ja: 'ユーザー：「こんにちは」→ AI：「さようなら」' } }
            ],
            correctAnswer: ['a'],
            encouragement: { zh: '你懂得对话礼仪！👏', ja: '会話のマナーがわかってる！👏' }
          }
        ]
      },
      // 第21课
      {
        id: 'lesson-21',
        unitId: 'unit-4',
        order: 3,
        title: { zh: '问答小助手', ja: '質問応答アシスタント' },
        duration: 15,
        type: 'interactive',
        starsReward: 10,
        sections: [
          {
            id: 'l21-s1',
            type: 'intro',
            content: {
              zh: '让我们来做一个能回答问题的小助手！',
              ja: '質問に答える小さなアシスタントを作ろう！'
            },
            duration: 2
          },
          {
            id: 'l21-s2',
            type: 'text',
            content: {
              zh: '🤖 问答助手的设计：\n\n知识库：存放很多问题和答案\n问题："地球是什么形状？"\n答案："地球是球形的！🌍"\n\n问题："为什么天是蓝色的？"\n答案："因为阳光散射！☀️"',
              ja: '🤖 質問応答アシスタントの設計：\n\n知識ベース：質問と答えを保存\n質問：「地球の形は？」\n答え：「地球は丸い！🌍」\n\n質問：「空はなぜ青い？」\n答え：「太陽光の散乱！☀️」'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l21-e1',
            type: 'multiple-choice',
            question: {
              zh: '如果有人问AI"1+1等于几"，AI应该去哪里找答案？',
              ja: '「1+1は？」と聞かれたら、AIはどこで答えを探す？'
            },
            options: [
              { id: 'a', text: { zh: '在知识库里找', ja: '知識ベースで探す' } },
              { id: 'b', text: { zh: '随便猜一个', ja: '適当に推測' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '对！AI使用知识库来回答！📚', ja: '正解！AIは知識ベースを使う！📚' }
          }
        ]
      },
      // 第22课
      {
        id: 'lesson-22',
        unitId: 'unit-4',
        order: 4,
        title: { zh: '动手：我的聊天伙伴', ja: '実践：私のチャット仲間' },
        duration: 15,
        type: 'project',
        starsReward: 15,
        sections: [
          {
            id: 'l22-s1',
            type: 'intro',
            content: {
              zh: '今天我们来设计自己的聊天机器人角色！',
              ja: '今日は自分のチャットボットキャラを設計しよう！'
            },
            duration: 2
          },
          {
            id: 'l22-s2',
            type: 'text',
            content: {
              zh: '🎭 给你的AI伙伴设定：\n\n1. 名字是什么？\n2. 性格怎样？（活泼/温柔/搞笑）\n3. 特长是什么？（讲故事/回答问题/陪你玩）\n4. 喜欢的颜色？',
              ja: '🎭 AIの仲間を設定しよう：\n\n1. 名前は？\n2. 性格は？（元気/優しい/おもしろい）\n3. 得意なことは？（物語/質問回答/遊び）\n4. 好きな色は？'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l22-e1',
            type: 'multiple-choice',
            question: {
              zh: '设计聊天机器人时，最重要的是什么？',
              ja: 'チャットボットを設計する時、一番大切なのは？'
            },
            options: [
              { id: 'a', text: { zh: '让它能帮助用户', ja: 'ユーザーを助けること' } },
              { id: 'b', text: { zh: '让它看起来很吓人', ja: '怖く見えること' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '对！好的AI要能帮助人！🤝', ja: '正解！良いAIは人を助ける！🤝' }
          }
        ]
      },
      // 第23课
      {
        id: 'lesson-23',
        unitId: 'unit-4',
        order: 5,
        title: { zh: 'AI的未来', ja: 'AIの未来' },
        duration: 15,
        type: 'video',
        starsReward: 10,
        sections: [
          {
            id: 'l23-s1',
            type: 'intro',
            content: {
              zh: '让我们一起想象AI的未来世界！',
              ja: 'AIの未来を一緒に想像しよう！'
            },
            duration: 2
          },
          {
            id: 'l23-s2',
            type: 'text',
            content: {
              zh: '🚀 AI的未来可能：\n\n🏥 帮医生看病\n🎓 当个人老师\n🚗 自动开车\n🎨 创作艺术\n🌍 保护环境\n\n但最重要的是：AI是工具，人类才是主人！',
              ja: '🚀 AIの未来の可能性：\n\n🏥 医者を助ける\n🎓 個人教師になる\n🚗 自動運転\n🎨 アートを創る\n🌍 環境を守る\n\n一番大切なこと：AIは道具、人間が主人！'
            },
            duration: 5
          }
        ],
        exercises: [
          {
            id: 'l23-e1',
            type: 'multiple-choice',
            question: {
              zh: 'AI和人类的关系应该是？',
              ja: 'AIと人間の関係は？'
            },
            options: [
              { id: 'a', text: { zh: 'AI是工具，人类是主人', ja: 'AIは道具、人間が主人' } },
              { id: 'b', text: { zh: 'AI是老板', ja: 'AIがボス' } }
            ],
            correctAnswer: 'a',
            encouragement: { zh: '对！我们要善用AI这个好帮手！👍', ja: '正解！AIを上手に使おう！👍' }
          }
        ]
      },
      // 第24课 - 毕业典礼
      {
        id: 'lesson-24',
        unitId: 'unit-4',
        order: 6,
        title: { zh: '毕业典礼', ja: '卒業式' },
        duration: 15,
        type: 'quiz',
        starsReward: 20,
        sections: [
          {
            id: 'l24-s1',
            type: 'intro',
            content: {
              zh: '🎉 恭喜你！你已经完成了所有课程！\n现在让我们进行最终测验，获得毕业证书！',
              ja: '🎉 おめでとう！全コースを完了した！\n最終テストで卒業証書をもらおう！'
            },
            duration: 2
          }
        ],
        exercises: [],
        quiz: {
          id: 'final-quiz',
          passingScore: 4,
          maxStars: 5,
          questions: [
            {
              id: 'f-q1',
              type: 'multiple-choice',
              question: { zh: 'AI是什么？', ja: 'AIとは？' },
              options: [
                { id: 'a', text: { zh: '让机器变聪明的技术', ja: '機械を賢くする技術' } },
                { id: 'b', text: { zh: '一种玩具', ja: 'おもちゃ' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '基础扎实！', ja: '基礎がしっかり！' }
            },
            {
              id: 'f-q2',
              type: 'multiple-choice',
              question: { zh: 'print("你好")会做什么？', ja: 'print("こんにちは")は何をする？' },
              options: [
                { id: 'a', text: { zh: '显示"你好"', ja: '"こんにちは"を表示' } },
                { id: 'b', text: { zh: '打印纸张', ja: '紙を印刷' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: 'Python学得好！', ja: 'Pythonよく学んだ！' }
            },
            {
              id: 'f-q3',
              type: 'multiple-choice',
              question: { zh: 'AI看图片时看到的是？', ja: 'AIは画像で何を見る？' },
              options: [
                { id: 'a', text: { zh: '数字', ja: '数字' } },
                { id: 'b', text: { zh: '颜色', ja: '色' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '图像理解透彻！', ja: '画像理解完璧！' }
            },
            {
              id: 'f-q4',
              type: 'multiple-choice',
              question: { zh: '聊天机器人需要什么来回答问题？', ja: 'チャットボットは何で答える？' },
              options: [
                { id: 'a', text: { zh: '知识库', ja: '知識ベース' } },
                { id: 'b', text: { zh: '魔法', ja: '魔法' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '对话原理掌握！', ja: '会話の仕組みを理解！' }
            },
            {
              id: 'f-q5',
              type: 'multiple-choice',
              question: { zh: 'AI和人类的关系是？', ja: 'AIと人間の関係は？' },
              options: [
                { id: 'a', text: { zh: 'AI是人类的好帮手', ja: 'AIは人間の良い助手' } },
                { id: 'b', text: { zh: 'AI会取代人类', ja: 'AIは人間を置き換える' } }
              ],
              correctAnswer: 'a',
              encouragement: { zh: '🎓 恭喜毕业！你是AI小博士了！', ja: '🎓 卒業おめでとう！AI博士だ！' }
            }
          ]
        }
      }
    ]
  }
];

// 每日任务模板
export const dailyTaskTemplates = [
  {
    id: 'learn-lesson',
    type: 'lesson' as const,
    title: { zh: '今日学习 1 课', ja: '今日1レッスン学ぶ' },
    target: 1,
    stars: 10
  },
  {
    id: 'complete-exercises',
    type: 'exercise' as const,
    title: { zh: '完成 3 道练习', ja: '3問の練習を完了' },
    target: 3,
    stars: 5
  },
  {
    id: 'review-old',
    type: 'review' as const,
    title: { zh: '复习旧知识', ja: '復習する' },
    target: 1,
    stars: 5
  },
  {
    id: 'challenge-quiz',
    type: 'quiz' as const,
    title: { zh: '挑战小测验', ja: 'テストに挑戦' },
    target: 1,
    stars: 15
  }
];

// 获取所有课程
export const getAllLessons = (): { lesson: typeof kidsCourseUnits[0]['lessons'][0], unit: typeof kidsCourseUnits[0] }[] => {
  const lessons: { lesson: typeof kidsCourseUnits[0]['lessons'][0], unit: typeof kidsCourseUnits[0] }[] = [];
  for (const unit of kidsCourseUnits) {
    for (const lesson of unit.lessons) {
      lessons.push({ lesson, unit });
    }
  }
  return lessons;
};

// 获取课程总数
export const getTotalLessons = (): number => {
  return kidsCourseUnits.reduce((sum, unit) => sum + unit.lessons.length, 0);
};

// 根据ID获取课程
export const getLessonById = (lessonId: string) => {
  for (const unit of kidsCourseUnits) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return { lesson, unit };
    }
  }
  return null;
};

// 获取下一课
export const getNextLesson = (currentLessonId: string) => {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(l => l.lesson.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1];
  }
  return null;
};

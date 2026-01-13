import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

// Lottie动画URL配置 (使用LottieFiles CDN)
const LOTTIE_URLS = {
  // 可爱机器人
  robot: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571c01a65/AgWJdSmDdz.json',
  // 思考中的机器人
  robotThinking: 'https://lottie.host/e9c1f6c7-86ca-4b47-a60e-67f5d9f1c0ad/R3ADkDMq0h.json',
  // AI大脑
  aiBrain: 'https://lottie.host/8b6e89e3-f55c-4a54-a7e6-da7e6e9bffcd/DvTzJFRdLV.json',
  // 编程/代码
  coding: 'https://lottie.host/7c0eb4ea-a946-4c9d-a8c5-4f7af7f8aa15/wF0ELpxJhl.json',
  // 庆祝/成功
  celebration: 'https://lottie.host/fb3e13c6-d2b8-4e56-8c5e-d6d4c7ced3c3/7uPXVD4rYm.json',
  // 星星
  stars: 'https://lottie.host/c14a5de9-e78f-4e9f-a7b4-6d8d0d1c0edd/EjqKxFVj6b.json',
  // 可爱猫咪
  cat: 'https://lottie.host/d81e9f06-1ac7-467d-8e0c-f7e3e8e2f8ed/NNDUdKpAzL.json',
  // 可爱狗狗
  dog: 'https://lottie.host/e8f7a9c2-3b5d-4c6e-a1f2-d9e8c7b6a5f4/KLMnOpQrSt.json',
  // 挥手打招呼
  waving: 'https://lottie.host/a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d/WavingHello.json',
  // 加载中
  loading: 'https://lottie.host/5e8f6a7b-9c0d-1e2f-3a4b-5c6d7e8f9a0b/LoadingAnim.json',
};

// 备用动画数据 (简单的内联动画)
const FALLBACK_ANIMATIONS = {
  robot: {
    v: "5.5.7",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    layers: [{
      ty: 4,
      nm: "robot",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 30, s: [10] }, { t: 60, s: [0] }] },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 30, s: [110, 110, 100] }, { t: 60, s: [100, 100, 100] }] }
      },
      shapes: [{
        ty: "rc",
        d: 1,
        s: { a: 0, k: [80, 80] },
        p: { a: 0, k: [0, 0] },
        r: { a: 0, k: 20 }
      }, {
        ty: "fl",
        c: { a: 0, k: [0.6, 0.4, 0.8, 1] },
        o: { a: 0, k: 100 }
      }],
      ip: 0,
      op: 60
    }]
  }
};

interface LottieCharacterProps {
  type: keyof typeof LOTTIE_URLS;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

// 通用Lottie动画组件
export const LottieCharacter = ({
  type,
  size = 200,
  loop = true,
  autoplay = true,
  className = ''
}: LottieCharacterProps) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(LOTTIE_URLS[type]);
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        } else {
          throw new Error('Failed to load');
        }
      } catch {
        setError(true);
        // 使用备用动画
        if (FALLBACK_ANIMATIONS[type as keyof typeof FALLBACK_ANIMATIONS]) {
          setAnimationData(FALLBACK_ANIMATIONS[type as keyof typeof FALLBACK_ANIMATIONS]);
        }
      }
    };
    loadAnimation();
  }, [type]);

  if (error && !animationData) {
    // 显示emoji备用
    const emojiMap: Record<string, string> = {
      robot: '🤖',
      robotThinking: '🤔',
      aiBrain: '🧠',
      coding: '💻',
      celebration: '🎉',
      stars: '⭐',
      cat: '🐱',
      dog: '🐕',
      waving: '👋',
      loading: '⏳',
    };
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <span className="text-6xl animate-bounce">{emojiMap[type] || '🤖'}</span>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <div className="animate-pulse bg-purple-100 rounded-full" style={{ width: size * 0.8, height: size * 0.8 }} />
      </div>
    );
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// 讲解吉祥物组件 - 带对话气泡
export const TeachingMascot = ({
  message,
  characterType = 'robot',
  position = 'left',
  isZh: _isZh = true,
  className = ''
}: {
  message: string;
  characterType?: keyof typeof LOTTIE_URLS;
  position?: 'left' | 'right';
  isZh?: boolean;
  className?: string;
}) => {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [message]);

  return (
    <div className={`flex items-start gap-4 ${position === 'right' ? 'flex-row-reverse' : ''} ${className}`}>
      <div className="flex-shrink-0">
        <LottieCharacter type={characterType} size={120} />
      </div>
      <div className={`relative bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-100 max-w-lg ${
        position === 'left' ? 'rounded-tl-none' : 'rounded-tr-none'
      }`}>
        {/* 对话气泡箭头 */}
        <div className={`absolute top-4 w-4 h-4 bg-white border-purple-100 transform rotate-45 ${
          position === 'left'
            ? '-left-2 border-l-2 border-b-2'
            : '-right-2 border-r-2 border-t-2'
        }`} />
        <p className="text-lg text-gray-700 relative z-10 leading-relaxed">
          {displayedText}
          {isTyping && <span className="animate-blink ml-1">|</span>}
        </p>
      </div>
    </div>
  );
};

// 课程介绍动画组件
export const LessonIntroAnimation = ({
  lessonType,
  title,
  isZh = true
}: {
  lessonType: 'ai-intro' | 'python' | 'image' | 'chat';
  title: string;
  isZh?: boolean;
}) => {
  const typeConfig = {
    'ai-intro': { character: 'robot' as const, color: 'from-purple-400 to-pink-400' },
    'python': { character: 'coding' as const, color: 'from-green-400 to-teal-400' },
    'image': { character: 'cat' as const, color: 'from-orange-400 to-yellow-400' },
    'chat': { character: 'robot' as const, color: 'from-blue-400 to-indigo-400' },
  };

  const config = typeConfig[lessonType];

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.color} p-8 text-white`}>
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 opacity-20">
        <LottieCharacter type="stars" size={150} />
      </div>

      <div className="relative z-10 flex items-center gap-6">
        <LottieCharacter type={config.character} size={150} />
        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-white/80 text-lg">
            {isZh ? '让我们开始学习吧！' : 'さあ、学習を始めよう！'}
          </p>
        </div>
      </div>
    </div>
  );
};

// 成功庆祝动画
export const SuccessCelebration = ({
  show,
  message,
  onComplete
}: {
  show: boolean;
  message: string;
  onComplete?: () => void;
}) => {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 animate-bounceIn">
        <LottieCharacter type="celebration" size={200} loop={false} className="mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{message}</h2>
      </div>
    </div>
  );
};

// AI概念演示动画
export const AIConceptDemo = ({
  concept,
  isZh = true
}: {
  concept: 'recognition' | 'learning' | 'prediction';
  isZh?: boolean;
}) => {
  const conceptConfig = {
    recognition: {
      title: isZh ? 'AI如何认识图片' : 'AIが画像を認識する方法',
      description: isZh ? '就像你认识朋友的脸一样，AI通过学习很多图片来认识事物' : '友達の顔を覚えるように、AIは多くの画像を学習して物事を認識します',
      animation: 'aiBrain' as const,
    },
    learning: {
      title: isZh ? 'AI如何学习' : 'AIの学習方法',
      description: isZh ? 'AI通过看很多例子来学习，就像你练习写字一样' : 'AIは多くの例を見て学習します。あなたが字を練習するのと同じです',
      animation: 'robotThinking' as const,
    },
    prediction: {
      title: isZh ? 'AI如何预测' : 'AIの予測方法',
      description: isZh ? '根据学到的知识，AI可以猜测接下来会发生什么' : '学んだ知識に基づいて、AIは次に何が起こるかを予測できます',
      animation: 'robot' as const,
    },
  };

  const config = conceptConfig[concept];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-purple-100">
      <div className="flex items-start gap-6">
        <LottieCharacter type={config.animation} size={150} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-purple-700 mb-3">{config.title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed">{config.description}</p>
        </div>
      </div>
    </div>
  );
};

export default LottieCharacter;

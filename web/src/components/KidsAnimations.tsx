import { useEffect, useState } from 'react';

// 浮动装饰元素
export const FloatingDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 浮动星星 */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${10 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          <span className="text-2xl opacity-30">⭐</span>
        </div>
      ))}
      {/* 浮动云朵 */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`cloud-${i}`}
          className="absolute animate-float-slow"
          style={{
            right: `${5 + i * 20}%`,
            top: `${15 + i * 20}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <span className="text-4xl opacity-20">☁️</span>
        </div>
      ))}
    </div>
  );
};

// 可爱的吉祥物组件
export const Mascot = ({
  mood = 'happy',
  message,
  size = 'md'
}: {
  mood?: 'happy' | 'thinking' | 'excited' | 'encourage';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mascotEmoji = {
    happy: '🤖',
    thinking: '🤔',
    excited: '🎉',
    encourage: '💪',
  };

  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  return (
    <div className="flex items-start gap-4">
      <div
        className={`${sizeClasses[size]} ${isAnimating ? 'animate-wiggle' : ''} transition-transform cursor-pointer hover:scale-110`}
        onClick={() => setIsAnimating(true)}
      >
        {mascotEmoji[mood]}
      </div>
      {message && (
        <div className="relative bg-white rounded-2xl p-4 shadow-lg max-w-md animate-slideIn">
          <div className="absolute -left-3 top-4 w-4 h-4 bg-white transform rotate-45" />
          <p className="text-lg text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
};

// 庆祝烟花效果
export const Confetti = ({ show }: { show: boolean }) => {
  if (!show) return null;

  const confettiPieces = ['🎊', '✨', '⭐', '🌟', '💫', '🎉'];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        >
          <span className="text-2xl">
            {confettiPieces[Math.floor(Math.random() * confettiPieces.length)]}
          </span>
        </div>
      ))}
    </div>
  );
};

// 答对时的星星爆发效果
export const StarBurst = ({ show, onComplete }: { show: boolean; onComplete?: () => void }) => {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-star-burst"
          style={{
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <span className="text-3xl">⭐</span>
        </div>
      ))}
    </div>
  );
};

// 进度条动画组件
export const AnimatedProgressBar = ({
  progress,
  color
}: {
  progress: number;
  color: string;
}) => {
  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
        style={{ width: `${progress}%`, backgroundColor: color }}
      >
        {/* 闪光效果 */}
        <div className="absolute inset-0 animate-shimmer">
          <div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          />
        </div>
      </div>
      {/* 小星星在进度条末端 */}
      {progress > 0 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 animate-pulse"
          style={{ left: `calc(${Math.min(progress, 98)}% - 8px)` }}
        >
          <span className="text-sm">⭐</span>
        </div>
      )}
    </div>
  );
};

// 弹跳按钮组件
export const BouncyButton = ({
  children,
  onClick,
  disabled,
  variant = 'primary',
  size = 'md',
  className = ''
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    success: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        rounded-2xl font-bold transition-all duration-150
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${isPressed ? 'transform scale-95' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// 动画数字显示
export const AnimatedNumber = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 20;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="inline-block animate-pop">
      {displayValue}{suffix}
    </span>
  );
};

// 打字机效果
export const TypeWriter = ({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </span>
  );
};

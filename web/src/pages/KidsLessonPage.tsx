import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, CheckCircle, XCircle, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useKidsProgressStore } from '../stores/kidsProgressStore';
import { getLessonById, getNextLesson } from '../data/kidsCourse';
import { LessonSection, KidsExercise, KidsQuiz } from '../types';

// 儿童友好配色
const kidsColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  purple: '#A78BFA',
  green: '#10B981',
  bg: '#FFF8F0',
};

// 浮动背景装饰
const FloatingDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(6)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="absolute animate-float opacity-20"
        style={{
          left: `${10 + i * 15}%`,
          top: `${15 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${4 + (i % 3)}s`,
        }}
      >
        <span className="text-3xl">{['⭐', '🌟', '✨', '💫', '🎈', '🎀'][i]}</span>
      </div>
    ))}
    {[...Array(3)].map((_, i) => (
      <div
        key={`cloud-${i}`}
        className="absolute animate-float-slow opacity-15"
        style={{
          right: `${10 + i * 25}%`,
          top: `${20 + i * 25}%`,
          animationDelay: `${i * 2}s`,
        }}
      >
        <span className="text-5xl">☁️</span>
      </div>
    ))}
  </div>
);

// 彩带庆祝效果
const ConfettiEffect = ({ show }: { show: boolean }) => {
  if (!show) return null;
  const pieces = ['🎊', '✨', '⭐', '🌟', '💫', '🎉', '🎀', '💝'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.8}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        >
          <span className="text-2xl">{pieces[Math.floor(Math.random() * pieces.length)]}</span>
        </div>
      ))}
    </div>
  );
};

// 星星奖励动画组件
const StarReward = ({ stars, onComplete, isZh }: { stars: number; onComplete: () => void; isZh: boolean }) => {
  const [showConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <ConfettiEffect show={showConfetti} />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-10 text-center transform animate-bounceIn max-w-md mx-4 shadow-2xl">
          {/* 动画角色 */}
          <div className="text-8xl mb-4 animate-bounce">🎉</div>

          {/* 围绕的星星 */}
          <div className="relative">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute text-2xl animate-spin-star"
                style={{
                  left: `${50 + 40 * Math.cos(i * Math.PI / 3)}%`,
                  top: `${50 + 40 * Math.sin(i * Math.PI / 3)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                ⭐
              </span>
            ))}
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {isZh ? '太棒了！' : 'すごい！'}
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6 animate-heartbeat">
            <span className="text-5xl font-bold text-yellow-500">+{stars}</span>
            <Star className="w-14 h-14 text-yellow-400 fill-yellow-400" />
          </div>

          <p className="text-xl text-gray-600">
            {isZh ? '继续加油！你是最棒的！' : 'この調子で頑張って！'}
          </p>

          {/* 底部装饰 */}
          <div className="mt-6 flex justify-center gap-2">
            {['🌈', '🦄', '🎨', '🚀', '🌟'].map((emoji, i) => (
              <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// 内容区域组件
const SectionContent = ({ section, isZh }: { section: LessonSection; isZh: boolean }) => {
  const content = isZh ? section.content.zh : section.content.ja;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`bg-white rounded-3xl p-8 shadow-lg mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {section.type === 'intro' && (
        <div className="flex items-start gap-4">
          {/* 动画机器人 */}
          <div className="text-6xl animate-wave cursor-pointer hover:animate-wiggle">🤖</div>
          <div className="flex-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 relative">
            {/* 对话气泡尖角 */}
            <div className="absolute -left-3 top-6 w-4 h-4 bg-purple-50 transform rotate-45" />
            <p className="text-xl text-gray-700 leading-relaxed">{content}</p>
          </div>
        </div>
      )}

      {section.type === 'text' && (
        <div className="prose prose-lg max-w-none">
          {content.split('\n').map((line, i) => (
            <p
              key={i}
              className="text-lg text-gray-700 leading-relaxed mb-3 animate-slideIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {section.type === 'image' && section.imageUrl && (
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={section.imageUrl}
              alt=""
              className="max-w-full h-auto rounded-2xl mx-auto mb-4 hover:scale-105 transition-transform duration-300"
            />
            {/* 装饰角 */}
            <span className="absolute -top-2 -left-2 text-2xl animate-bounce">✨</span>
            <span className="absolute -top-2 -right-2 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</span>
          </div>
          <p className="text-gray-600">{content}</p>
        </div>
      )}

      {section.type === 'code' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl animate-bounce">💻</span>
            <p className="text-lg text-gray-700">{content}</p>
          </div>
          {section.codeExample && (
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 rounded-2xl p-6 overflow-x-auto text-lg font-mono animate-slideIn">
                {section.codeExample}
              </pre>
              {/* 代码装饰 */}
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                {isZh ? '代码' : 'コード'}
              </div>
            </div>
          )}
        </div>
      )}

      {section.type === 'video' && section.videoUrl && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 relative">
          <video
            src={section.videoUrl}
            controls
            className="w-full h-full"
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {isZh ? '视频' : 'ビデオ'}
          </div>
        </div>
      )}

      {section.type === 'interactive' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 relative overflow-hidden">
          {/* 动画背景 */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="absolute animate-float text-4xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                🎮
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-500 animate-spin-star" />
              <span className="text-xl font-bold text-purple-600 animate-rainbow">
                {isZh ? '互动时间！' : 'インタラクティブタイム！'}
              </span>
              <span className="text-2xl animate-bounce">🎯</span>
            </div>
            <p className="text-lg text-gray-700">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// 练习题组件
const ExerciseGame = ({
  exercise,
  isZh,
  onComplete
}: {
  exercise: KidsExercise;
  isZh: boolean;
  onComplete: (correct: boolean) => void;
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const exerciseIdRef = useRef(exercise.id);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // 当 exercise 变化时重置状态
  useEffect(() => {
    exerciseIdRef.current = exercise.id;
    setSelectedAnswers([]);
    setTextAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setWaitingForNext(false);

    // 清理旧的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [exercise.id]);

  // 组件卸载时清理
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSelect = (optionId: string) => {
    if (showResult || waitingForNext) return;

    if (exercise.type === 'multiple-choice') {
      // 单选
      setSelectedAnswers([optionId]);
    } else if (exercise.type === 'code-blocks') {
      // 代码拼图 - 按顺序添加
      if (selectedAnswers.includes(optionId)) {
        // 点击已选中的，移除它及之后的所有选择
        const index = selectedAnswers.indexOf(optionId);
        setSelectedAnswers(selectedAnswers.slice(0, index));
      } else {
        setSelectedAnswers([...selectedAnswers, optionId]);
      }
    } else if (exercise.type === 'drag-drop' || exercise.type === 'match') {
      // 多选
      if (selectedAnswers.includes(optionId)) {
        setSelectedAnswers(selectedAnswers.filter(id => id !== optionId));
      } else {
        setSelectedAnswers([...selectedAnswers, optionId]);
      }
    }
  };

  const handleSubmit = () => {
    if (showResult || waitingForNext) return; // 防止重复提交

    let correct = false;
    const correctAnswer = Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer
      : [exercise.correctAnswer];

    if (exercise.type === 'multiple-choice') {
      correct = selectedAnswers[0] === correctAnswer[0];
    } else if (exercise.type === 'code-blocks') {
      // 代码拼图 - 检查顺序
      correct = JSON.stringify(selectedAnswers) === JSON.stringify(correctAnswer);
    } else if (exercise.type === 'fill-blank') {
      // 填空题 - 检查文本答案
      correct = textAnswer.trim().toLowerCase() === (exercise.correctAnswer as string).toLowerCase();
    } else {
      // drag-drop, match - 检查是否包含所有正确答案（不考虑顺序）
      correct = JSON.stringify(selectedAnswers.sort()) === JSON.stringify(correctAnswer.sort());
    }

    setIsCorrect(correct);
    setShowResult(true);
    setWaitingForNext(true);

    // 保存当前 exercise.id 用于验证
    const currentExerciseId = exercise.id;

    // 清理旧的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // 只有当组件仍然挂载且 exercise 没有变化时才调用回调
      if (isMountedRef.current && exerciseIdRef.current === currentExerciseId) {
        onComplete(correct);
      }
    }, 2000);
  };

  const canSubmit = exercise.type === 'fill-blank'
    ? textAnswer.trim().length > 0
    : selectedAnswers.length > 0;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
      {/* 问题 */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {isZh ? exercise.question.zh : exercise.question.ja}
        </h3>
        {exercise.hint && !showResult && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mt-2"
          >
            <HelpCircle className="w-5 h-5" />
            {isZh ? '需要提示？' : 'ヒントが必要？'}
          </button>
        )}
        {showHint && exercise.hint && (
          <div className="mt-3 p-4 bg-blue-50 rounded-xl text-blue-700">
            💡 {isZh ? exercise.hint.zh : exercise.hint.ja}
          </div>
        )}
      </div>

      {/* 代码拼图 - 显示已选择的代码块 */}
      {exercise.type === 'code-blocks' && selectedAnswers.length > 0 && (
        <div className="mb-6 p-4 bg-gray-900 rounded-2xl">
          <div className="text-sm text-gray-400 mb-2">{isZh ? '你的代码：' : 'あなたのコード：'}</div>
          <div className="flex flex-wrap gap-2">
            {selectedAnswers.map((id, index) => {
              const option = exercise.options?.find(o => o.id === id);
              return (
                <span key={index} className="px-3 py-2 bg-green-500 text-white rounded-lg font-mono text-lg">
                  {option ? (isZh ? option.text.zh : option.text.ja) : id}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 填空题 - 输入框 */}
      {exercise.type === 'fill-blank' && (
        <div className="mb-6">
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={showResult}
            placeholder={isZh ? '在这里输入答案...' : 'ここに答えを入力...'}
            className="w-full p-4 text-xl border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
          />
        </div>
      )}

      {/* 选项 - 非填空题时显示 */}
      {exercise.type !== 'fill-blank' && (
        <div className={`gap-4 mb-6 ${exercise.type === 'code-blocks' ? 'flex flex-wrap' : 'grid'}`}>
          {exercise.options?.map(option => {
            const isSelected = selectedAnswers.includes(option.id);
            const selectionIndex = selectedAnswers.indexOf(option.id);
            const isAnswerCorrect = Array.isArray(exercise.correctAnswer)
              ? exercise.correctAnswer.includes(option.id)
              : exercise.correctAnswer === option.id;

            let optionStyle = 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200';
            if (isSelected && !showResult) {
              optionStyle = 'bg-purple-100 border-2 border-purple-400';
            }
            if (showResult) {
              if (isAnswerCorrect) {
                optionStyle = 'bg-green-100 border-2 border-green-400';
              } else if (isSelected && !isAnswerCorrect) {
                optionStyle = 'bg-red-100 border-2 border-red-400';
              }
            }

            // 代码块样式
            if (exercise.type === 'code-blocks') {
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showResult}
                  className={`px-6 py-4 rounded-2xl text-lg font-mono font-medium transition-all ${optionStyle} ${isSelected ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="w-6 h-6 bg-purple-500 text-white text-sm rounded-full flex items-center justify-center">
                        {selectionIndex + 1}
                      </span>
                    )}
                    <span>{isZh ? option.text.zh : option.text.ja}</span>
                  </div>
                </button>
              );
            }

            // 普通选项样式
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showResult}
                className={`p-5 rounded-2xl text-left text-lg font-medium transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    isSelected ? 'bg-purple-500' : 'bg-gray-300'
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span>{isZh ? option.text.zh : option.text.ja}</span>
                  {showResult && isAnswerCorrect && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                  )}
                  {showResult && isSelected && !isAnswerCorrect && (
                    <XCircle className="w-6 h-6 text-red-500 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 结果反馈 */}
      {showResult && (
        <div className={`relative p-6 rounded-2xl mb-6 overflow-hidden ${isCorrect ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-orange-50 to-amber-50'} ${isCorrect ? 'animate-bounceIn' : ''}`}>
          {/* 正确时的星星爆发效果 */}
          {isCorrect && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-star-burst"
                  style={{
                    left: '50%',
                    top: '50%',
                    '--rotation': `${i * 45}deg`,
                  } as React.CSSProperties}
                >
                  <span className="text-2xl">⭐</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 mb-2 relative z-10">
            {isCorrect ? (
              <>
                <div className="animate-heartbeat">
                  <span className="text-5xl">🎉</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-600 animate-rainbow block">
                    {isZh ? exercise.encouragement.zh : exercise.encouragement.ja}
                  </span>
                  <span className="text-green-500 text-sm flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    +10 {isZh ? '积分' : 'ポイント'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="animate-wiggle">
                  <span className="text-5xl">💪</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-orange-600">
                    {isZh ? '没关系，再试一次！' : '大丈夫、もう一回！'}
                  </span>
                  <span className="text-orange-500 text-sm block mt-1">
                    {isZh ? '错误是学习的一部分哦' : '間違いは学びの一部だよ'}
                  </span>
                </div>
              </>
            )}
          </div>
          {exercise.explanation && (
            <div className="bg-white/70 rounded-xl p-4 mt-4 animate-slideIn">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  {isZh ? exercise.explanation.zh : exercise.explanation.ja}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 提交按钮 */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-2xl text-xl font-bold text-white transition-all transform ${
            canSubmit
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] hover:shadow-lg active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {canSubmit && <Sparkles className="w-6 h-6 animate-pulse" />}
            {isZh ? '确认答案' : '回答を確認'}
            {canSubmit && <Sparkles className="w-6 h-6 animate-pulse" />}
          </span>
        </button>
      )}
    </div>
  );
};

// 测验组件
const QuizSection = ({
  quiz,
  isZh,
  onComplete,
  onFinish
}: {
  quiz: KidsQuiz;
  isZh: boolean;
  onComplete: (score: number, maxScore: number) => void;
  onFinish: () => void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleQuestionComplete = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setCompleted(true);
      onComplete(score + (correct ? 1 : 0), quiz.maxStars);
    }
  };

  if (completed) {
    const finalScore = score;
    const passed = finalScore >= quiz.passingScore;

    return (
      <div className="relative bg-white rounded-3xl p-8 shadow-lg text-center overflow-hidden animate-bounceIn">
        {/* 通过时的彩带庆祝 */}
        {passed && (
          <div className="absolute inset-0 pointer-events-none">
            {['🎊', '✨', '⭐', '🌟', '💫', '🎉'].map((emoji, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${15 + i * 15}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span className="text-3xl">{emoji}</span>
              </div>
            ))}
          </div>
        )}

        {/* 主图标 */}
        <div className={`text-7xl mb-4 ${passed ? 'animate-heartbeat' : 'animate-wiggle'}`}>
          {passed ? '🏆' : '💪'}
        </div>

        <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500' : 'text-orange-600'}`}>
          {passed ? (isZh ? '恭喜通过！' : 'おめでとう！') : (isZh ? '继续努力！' : 'もっと頑張ろう！')}
        </h2>

        {/* 分数展示 */}
        <div className="flex items-center justify-center gap-3 mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl py-4 px-6 mx-auto w-fit">
          <span className="text-5xl font-bold text-gray-800">{finalScore}</span>
          <span className="text-3xl text-gray-400">/</span>
          <span className="text-3xl text-gray-600">{quiz.questions.length}</span>
          <div className="flex gap-1 ml-2">
            {[...Array(quiz.questions.length)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 transition-all ${i < finalScore ? 'text-yellow-400 fill-yellow-400 animate-pop' : 'text-gray-300'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        <p className="text-gray-600 mb-8 text-lg">
          {passed
            ? (isZh ? '太棒了！你已经掌握了这些知识！🌟' : 'すごい！これらの知識をマスターした！🌟')
            : (isZh ? '不要灰心，多复习一下再来挑战！' : '落ち込まないで、復習してまた挑戦しよう！')
          }
        </p>

        <button
          onClick={onFinish}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-xl font-bold rounded-2xl hover:scale-105 hover:shadow-xl active:scale-95 transition-all transform"
        >
          <span className="flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            {isZh ? '完成课程' : 'レッスン完了'}
            <span className="text-2xl">🎓</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 进度指示 */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-bold text-gray-600">
          {isZh ? `问题 ${currentQuestion + 1}/${quiz.questions.length}` : `質問 ${currentQuestion + 1}/${quiz.questions.length}`}
        </span>
        <div className="flex gap-2">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < currentQuestion ? 'bg-green-400' :
                i === currentQuestion ? 'bg-purple-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <ExerciseGame
        key={`quiz-q-${currentQuestion}`}
        exercise={quiz.questions[currentQuestion]}
        isZh={isZh}
        onComplete={handleQuestionComplete}
      />
    </div>
  );
};

// 主页面组件
export default function KidsLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { startLesson, completeLesson, updateDailyTaskProgress } = useKidsProgressStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const startTimeRef = useRef(Date.now());

  const isZh = language === 'zh';

  // Memoize lessonData to avoid infinite re-renders
  const lessonData = useMemo(() => {
    return lessonId ? getLessonById(lessonId) : null;
  }, [lessonId]);

  useEffect(() => {
    if (lessonData) {
      startLesson(lessonData.lesson);
      startTimeRef.current = Date.now();
    }
  }, [lessonId, startLesson]);

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: kidsColors.bg }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-xl text-gray-600">{isZh ? '课程未找到' : 'レッスンが見つかりません'}</p>
          <button
            onClick={() => navigate('/kids-course')}
            className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold"
          >
            {isZh ? '返回课程列表' : 'コース一覧に戻る'}
          </button>
        </div>
      </div>
    );
  }

  const { lesson, unit } = lessonData;
  const allSteps = [
    ...lesson.sections.map(s => ({ type: 'section' as const, data: s })),
    ...lesson.exercises.map(e => ({ type: 'exercise' as const, data: e })),
    ...(lesson.quiz ? [{ type: 'quiz' as const, data: lesson.quiz }] : [])
  ];

  const currentStepData = allSteps[currentStep];
  const isLastStep = currentStep === allSteps.length - 1;
  const progress = ((currentStep + 1) / allSteps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      handleLessonComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExerciseComplete = async (correct: boolean) => {
    if (correct) {
      setEarnedStars(prev => prev + 2);
      await updateDailyTaskProgress('exercise');
    }
    handleNext();
  };

  const handleQuizComplete = async (score: number, maxScore: number) => {
    const quizStars = Math.round((score / maxScore) * lesson.starsReward);
    setEarnedStars(prev => prev + quizStars);
    await updateDailyTaskProgress('quiz');
  };

  const handleLessonComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 60000);
    const totalStars = earnedStars + lesson.starsReward;

    await completeLesson(lesson.id, totalStars, timeSpent);
    setEarnedStars(totalStars);
    setShowReward(true);
    setLessonCompleted(true);
  };

  const handleRewardComplete = () => {
    setShowReward(false);
    const next = getNextLesson(lesson.id);
    if (next) {
      navigate(`/kids-course/${next.lesson.id}`);
    } else {
      navigate('/kids-course');
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: kidsColors.bg }}>
      {/* 顶部导航 - 全宽 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/kids-course')}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 text-lg transition-colors group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              {isZh ? '返回' : '戻る'}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-float" style={{ animationDuration: '3s' }}>{unit.icon}</span>
              <span className="text-xl font-bold" style={{ color: unit.color }}>
                {isZh ? unit.title.zh : unit.title.ja}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span className="font-bold text-yellow-600 text-lg">{earnedStars}</span>
            </div>
          </div>

          {/* 进度条 - 增强版 */}
          <div className="relative w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${progress}%`, backgroundColor: unit.color }}
            >
              {/* 闪光效果 */}
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
            </div>
            {/* 进度条上的小星星 */}
            {progress > 5 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 animate-bounce"
                style={{ left: `calc(${Math.min(progress, 97)}% - 10px)` }}
              >
                <span className="text-base">⭐</span>
              </div>
            )}
            {/* 进度百分比 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-md">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 - 左右分栏布局 */}
      <div className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧边栏 - 步骤导航 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-32 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl animate-wave">👋</span>
                <h3 className="text-lg font-bold text-gray-700">
                  {isZh ? '课程步骤' : 'レッスンステップ'}
                </h3>
              </div>
              <div className="space-y-2">
                {allSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 animate-pulse-soft'
                        : index < currentStep
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-600'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-white'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">
                        {step.type === 'section' && (isZh ? '学习内容' : '学習内容')}
                        {step.type === 'exercise' && (isZh ? '互动练习' : '練習問題')}
                        {step.type === 'quiz' && (isZh ? '小测验' : 'クイズ')}
                      </span>
                      {index === currentStep && (
                        <span className="text-xs text-purple-500 flex items-center gap-1 mt-0.5">
                          <span className="animate-blink">●</span>
                          {isZh ? '进行中' : '進行中'}
                        </span>
                      )}
                    </div>
                    {index < currentStep && (
                      <span className="text-lg">⭐</span>
                    )}
                  </div>
                ))}
              </div>

              {/* 进度提示 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xl animate-heartbeat">💖</span>
                  <span className="text-gray-600">
                    {isZh ? '你做得很棒！' : 'がんばって！'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-9">
            {/* 课程标题 */}
            <div className="mb-8 animate-slideIn">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
                  {lesson.type === 'video' ? '🎬' : lesson.type === 'interactive' ? '🎮' : lesson.type === 'quiz' ? '📝' : '📖'}
                </span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                    {isZh ? `第${lesson.order}课` : `レッスン${lesson.order}`}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium flex items-center gap-1">
                    <span>⏱️</span>
                    {lesson.duration}{isZh ? '分钟' : '分'}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
                {isZh ? lesson.title.zh : lesson.title.ja}
              </h1>
            </div>

            {/* 当前步骤内容 */}
            {currentStepData?.type === 'section' && (
              <SectionContent
                section={currentStepData.data as LessonSection}
                isZh={isZh}
              />
            )}

            {currentStepData?.type === 'exercise' && (
              <ExerciseGame
                key={`exercise-${currentStep}`}
                exercise={currentStepData.data as KidsExercise}
                isZh={isZh}
                onComplete={handleExerciseComplete}
              />
            )}

            {currentStepData?.type === 'quiz' && (
              <QuizSection
                key={`quiz-${currentStep}`}
                quiz={currentStepData.data as KidsQuiz}
                isZh={isZh}
                onComplete={handleQuizComplete}
                onFinish={handleLessonComplete}
              />
            )}
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      {!lessonCompleted && currentStepData?.type === 'section' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t p-4 shadow-2xl">
          <div className="w-full px-6 lg:px-12 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 active:scale-95'
              }`}
            >
              <ArrowLeft className={`w-5 h-5 ${currentStep > 0 ? 'group-hover:-translate-x-1' : ''} transition-transform`} />
              {isZh ? '上一步' : '前へ'}
            </button>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              {allSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentStep
                      ? 'bg-purple-500 scale-125'
                      : i < currentStep
                      ? 'bg-green-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-all transform hover:scale-105 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: unit.color }}
            >
              {isLastStep ? (
                <>
                  <Trophy className="w-5 h-5 animate-bounce" />
                  {isZh ? '完成课程' : 'レッスン完了'}
                  <span className="text-xl">🎉</span>
                </>
              ) : (
                <>
                  {isZh ? '下一步' : '次へ'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 浮动背景装饰 */}
      <FloatingDecorations />

      {/* 星星奖励动画 */}
      {showReward && (
        <StarReward stars={earnedStars} onComplete={handleRewardComplete} isZh={isZh} />
      )}
    </div>
  );
}

/**
 * AI 拍照解题组件
 * 学生可以上传题目照片，AI 识别并解答
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  Camera,
  Upload,
  X,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ZoomIn,
  Image as ImageIcon,
  Bot,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SolutionStep {
  step: number;
  title: string;
  content: string;
  formula?: string;
}

interface AISolution {
  problemType: string;
  subject: string;
  difficulty: string;
  recognizedText: string;
  steps: SolutionStep[];
  answer: string;
  tips: string[];
  relatedConcepts: string[];
}

interface AIPhotoSolverProps {
  onClose?: () => void;
  subject?: string;
  apiKey?: string;
}

export const AIPhotoSolver: React.FC<AIPhotoSolverProps> = ({
  onClose,
  subject = 'math',
  apiKey
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<AISolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('ファイルサイズは10MB以下にしてください');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setError(null);
      setSolution(null);
    };
    reader.readAsDataURL(file);
  }, []);

  // Analyze image with AI
  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      // If API key is provided, use real AI analysis
      if (apiKey) {
        const response = await callVisionAPI(image, subject, apiKey);
        setSolution(response);
      } else {
        // Demo mode: simulate AI response
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSolution(generateDemoSolution(subject));
      }
    } catch (err) {
      setError('解析に失敗しました。もう一度お試しください。');
      console.error('AI analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Call actual Vision API (OpenAI GPT-4V or similar)
  const callVisionAPI = async (
    imageBase64: string,
    subjectHint: string,
    key: string
  ): Promise<AISolution> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `あなたは優秀な${getSubjectName(subjectHint)}の家庭教師です。
生徒が送った問題の画像を分析し、以下のJSON形式で回答してください：
{
  "problemType": "問題の種類",
  "subject": "科目",
  "difficulty": "easy/medium/hard",
  "recognizedText": "認識した問題文",
  "steps": [
    {"step": 1, "title": "ステップタイトル", "content": "詳しい説明", "formula": "数式（あれば）"}
  ],
  "answer": "最終的な答え",
  "tips": ["ポイント1", "ポイント2"],
  "relatedConcepts": ["関連する概念1", "関連する概念2"]
}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'この問題を解いてください。ステップバイステップで説明してください。'
              },
              {
                type: 'image_url',
                image_url: { url: imageBase64 }
              }
            ]
          }
        ],
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Invalid response format');
  };

  // Generate demo solution for testing
  const generateDemoSolution = (subjectType: string): AISolution => {
    const solutions: { [key: string]: AISolution } = {
      math: {
        problemType: '一次方程式',
        subject: '数学',
        difficulty: 'medium',
        recognizedText: '2x + 5 = 13 を解きなさい',
        steps: [
          {
            step: 1,
            title: '移項する',
            content: '等式の性質を使って、定数項を右辺に移動します。両辺から5を引きます。',
            formula: '2x + 5 - 5 = 13 - 5'
          },
          {
            step: 2,
            title: '簡略化',
            content: '計算を実行します。',
            formula: '2x = 8'
          },
          {
            step: 3,
            title: '係数で割る',
            content: 'xの係数である2で両辺を割ります。',
            formula: 'x = 8 ÷ 2 = 4'
          },
          {
            step: 4,
            title: '検算',
            content: '答えを元の式に代入して確認します。',
            formula: '2(4) + 5 = 8 + 5 = 13 ✓'
          }
        ],
        answer: 'x = 4',
        tips: [
          '移項するときは符号が変わることを忘れずに！',
          '最後に必ず検算しましょう',
          '等式の両辺に同じ操作をすることがポイント'
        ],
        relatedConcepts: ['等式の性質', '移項', '一次方程式の解法']
      },
      science: {
        problemType: '化学反応式',
        subject: '理科',
        difficulty: 'medium',
        recognizedText: '水の電気分解の化学反応式を書きなさい',
        steps: [
          {
            step: 1,
            title: '反応物と生成物を確認',
            content: '水（H₂O）が電気分解されて、水素（H₂）と酸素（O₂）が発生します。',
            formula: 'H₂O → H₂ + O₂'
          },
          {
            step: 2,
            title: '原子の数を数える',
            content: '左辺：H=2, O=1\n右辺：H=2, O=2\n酸素原子の数が合っていません。',
          },
          {
            step: 3,
            title: '係数をつけて調整',
            content: '水を2分子にすると、酸素原子が2つになります。',
            formula: '2H₂O → H₂ + O₂'
          },
          {
            step: 4,
            title: '水素原子も確認',
            content: '左辺のH=4なので、右辺のH₂を2分子にします。',
            formula: '2H₂O → 2H₂ + O₂'
          }
        ],
        answer: '2H₂O → 2H₂ + O₂',
        tips: [
          '化学反応式は原子の種類と数が左右で同じになる！',
          '係数は最も簡単な整数比にする',
          '電気分解では陰極から水素、陽極から酸素が発生'
        ],
        relatedConcepts: ['電気分解', '化学反応式', '質量保存の法則']
      },
      english: {
        problemType: '文法問題',
        subject: '英語',
        difficulty: 'easy',
        recognizedText: '次の文を過去形に直しなさい: I play tennis every day.',
        steps: [
          {
            step: 1,
            title: '動詞を見つける',
            content: 'この文の動詞は「play」です。',
          },
          {
            step: 2,
            title: '過去形のルールを確認',
            content: 'playは規則動詞なので、-edをつけます。',
            formula: 'play → played'
          },
          {
            step: 3,
            title: '時を表す語句も変える',
            content: '「every day」は現在の習慣を表すので、過去に変えると「yesterday」などになります。',
          },
          {
            step: 4,
            title: '完成',
            content: '過去形の文が完成しました。',
            formula: 'I played tennis yesterday.'
          }
        ],
        answer: 'I played tennis yesterday.',
        tips: [
          '規則動詞は-edをつける（play→played）',
          '不規則動詞は形が変わる（go→went, have→had）',
          '時を表す語句も一緒に変えよう'
        ],
        relatedConcepts: ['過去形', '規則動詞・不規則動詞', '時制']
      },
      japanese: {
        problemType: '文法問題',
        subject: '国語',
        difficulty: 'medium',
        recognizedText: '「美しい」を連用形にしなさい',
        steps: [
          {
            step: 1,
            title: '品詞を確認',
            content: '「美しい」は形容詞です。',
          },
          {
            step: 2,
            title: '形容詞の活用を確認',
            content: '形容詞の活用は「かろ・かっ/く・い・い・けれ・○」です。',
          },
          {
            step: 3,
            title: '連用形を特定',
            content: '連用形は「く」または「かっ」です。用言に続く場合は「く」、「た」に続く場合は「かっ」を使います。',
            formula: '美しい → 美しく / 美しかっ'
          }
        ],
        answer: '美しく（または「美しかっ」）',
        tips: [
          '形容詞の連用形は「く」と「かっ」の2種類ある',
          '「く」は用言に続く（美しくなる）',
          '「かっ」は「た」に続く（美しかった）'
        ],
        relatedConcepts: ['形容詞の活用', '連用形', '用言']
      },
      social: {
        problemType: '歴史問題',
        subject: '社会',
        difficulty: 'medium',
        recognizedText: '鎌倉幕府を開いた人物は誰か',
        steps: [
          {
            step: 1,
            title: '時代背景を確認',
            content: '1185年、壇ノ浦の戦いで平氏が滅亡しました。',
          },
          {
            step: 2,
            title: '武士政権の始まり',
            content: '源頼朝は征夷大将軍に任命され、鎌倉に幕府を開きました。',
          },
          {
            step: 3,
            title: '鎌倉幕府の成立',
            content: '1192年（または1185年説もあり）に鎌倉幕府が成立し、武家政権が始まりました。',
          }
        ],
        answer: '源頼朝（みなもとのよりとも）',
        tips: [
          '「いい国作ろう鎌倉幕府」（1192年）で覚えよう',
          '源頼朝は源義経の兄',
          '鎌倉幕府は約150年続いた'
        ],
        relatedConcepts: ['鎌倉時代', '武家政権', '源平合戦']
      }
    };

    return solutions[subjectType] || solutions.math;
  };

  const getSubjectName = (id: string): string => {
    const names: { [key: string]: string } = {
      math: '数学',
      english: '英語',
      japanese: '国語',
      science: '理科',
      social: '社会'
    };
    return names[id] || '学習';
  };

  const getDifficultyColor = (diff: string): string => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (diff: string): string => {
    switch (diff) {
      case 'easy': return '基礎';
      case 'medium': return '標準';
      case 'hard': return '発展';
      default: return '---';
    }
  };

  const resetAll = () => {
    setImage(null);
    setSolution(null);
    setError(null);
    setExpandedStep(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Camera size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI 問題解答</h1>
                <p className="text-white/80 text-sm">写真を撮って、AIに解いてもらおう</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload Section */}
        {!image && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-purple-500" />
              問題の写真をアップロード
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Camera Capture */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Camera size={32} className="text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-800">カメラで撮影</p>
                  <p className="text-sm text-gray-500">問題を撮影する</p>
                </div>
              </button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* File Upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload size={32} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-800">画像を選択</p>
                  <p className="text-sm text-gray-500">ファイルから選ぶ</p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Demo Notice */}
            {!apiKey && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lightbulb size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">デモモード</p>
                    <p>現在はサンプル解答が表示されます。実際のAI解析を使用するには、APIキーを設定してください。</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Preview */}
        {image && !solution && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ZoomIn size={20} className="text-purple-500" />
              アップロードした画像
            </h2>

            <div className="relative">
              <img
                src={image}
                alt="Uploaded problem"
                className="w-full rounded-xl border border-gray-200"
              />
              <button
                onClick={resetAll}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    AI が解析中...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    AI に解いてもらう
                  </>
                )}
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Solution Display */}
        {solution && (
          <div className="space-y-4">
            {/* Problem Recognition */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Bot size={20} className="text-purple-500" />
                  認識した問題
                </h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {solution.subject}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(solution.difficulty)}`}>
                    {getDifficultyLabel(solution.difficulty)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-800 font-medium">{solution.recognizedText}</p>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                問題タイプ: {solution.problemType}
              </div>
            </div>

            {/* Solution Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-green-500" />
                解き方（ステップバイステップ）
              </h2>

              <div className="space-y-3">
                {solution.steps.map((step, index) => (
                  <div
                    key={step.step}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <span className="font-medium text-gray-800">{step.title}</span>
                      </div>
                      {expandedStep === index ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </button>

                    {expandedStep === index && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <p className="text-gray-600 mt-3 whitespace-pre-line">{step.content}</p>
                        {step.formula && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <code className="text-blue-800 font-mono text-lg">{step.formula}</code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Expand All Button */}
              <button
                onClick={() => setExpandedStep(expandedStep === -1 ? null : -1)}
                className="mt-3 text-sm text-purple-600 hover:text-purple-800"
              >
                {expandedStep === -1 ? 'すべて折りたたむ' : 'すべて展開'}
              </button>
            </div>

            {/* Answer */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} />
                答え
              </h2>
              <div className="p-4 bg-white/20 rounded-xl">
                <p className="text-2xl font-bold">{solution.answer}</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-500" />
                ポイント
              </h2>
              <ul className="space-y-2">
                {solution.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-500 font-bold">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Concepts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">関連する概念</h2>
              <div className="flex flex-wrap gap-2">
                {solution.relatedConcepts.map((concept, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Try Another */}
            <button
              onClick={resetAll}
              className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              別の問題を解く
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPhotoSolver;

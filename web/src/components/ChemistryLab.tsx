/**
 * Chemistry Lab - Virtual Laboratory Style
 * Realistic lab equipment with guided experiments
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  X, RotateCcw, Play, Pause, ChevronRight,
  HelpCircle, Volume2, VolumeX, Flame, Droplets,
  FlaskConical, TestTubes, Beaker, Thermometer, Eye,
  CheckCircle2, AlertTriangle, Sparkles, GraduationCap
} from 'lucide-react';

// ============ Types ============
interface ExperimentStep {
  instruction: string;
  action: 'add' | 'heat' | 'observe' | 'wait' | 'collect';
  target?: string;
  result?: string;
  warning?: string;
}

interface Experiment {
  id: string;
  name: string;
  category: string;
  difficulty: 1 | 2 | 3;
  description: string;
  equipment: string[];
  chemicals: { id: string; name: string; color: string; formula: string }[];
  steps: ExperimentStep[];
  observation: string;
  equation: string;
  explanation: string;
}

interface Props {
  onClose?: () => void;
}

// ============ Experiment Data ============
const EXPERIMENTS: Experiment[] = [
  {
    id: 'neutralization',
    name: '中和反応',
    category: '酸・塩基',
    difficulty: 1,
    description: '塩酸と水酸化ナトリウムを混ぜて中和反応を観察',
    equipment: ['beaker', 'dropper', 'indicator'],
    chemicals: [
      { id: 'hcl', name: '塩酸', color: '#bef264', formula: 'HCl' },
      { id: 'naoh', name: '水酸化ナトリウム水溶液', color: '#c4b5fd', formula: 'NaOH' },
      { id: 'btb', name: 'BTB溶液', color: '#22c55e', formula: 'BTB' },
    ],
    steps: [
      { instruction: 'ビーカーに塩酸を入れる', action: 'add', target: 'hcl' },
      { instruction: 'BTB溶液を数滴加える', action: 'add', target: 'btb', result: '溶液が黄色になる' },
      { instruction: '水酸化ナトリウムを少しずつ加える', action: 'add', target: 'naoh' },
      { instruction: '色の変化を観察する', action: 'observe', result: '黄色→緑色→青色に変化' },
    ],
    observation: 'BTB溶液の色が黄色（酸性）から緑色（中性）を経て青色（塩基性）に変化する',
    equation: 'HCl + NaOH → NaCl + H₂O',
    explanation: '酸（H⁺）と塩基（OH⁻）が反応して水と塩ができる。これが中和反応です。',
  },
  {
    id: 'hydrogen-generation',
    name: '水素の発生',
    category: '気体の発生',
    difficulty: 2,
    description: '亜鉛に塩酸を加えて水素を発生させる',
    equipment: ['flask', 'testtube', 'burner'],
    chemicals: [
      { id: 'zn', name: '亜鉛粒', color: '#94a3b8', formula: 'Zn' },
      { id: 'hcl', name: '塩酸', color: '#bef264', formula: 'HCl' },
    ],
    steps: [
      { instruction: 'フラスコに亜鉛粒を入れる', action: 'add', target: 'zn' },
      { instruction: '塩酸をゆっくり加える', action: 'add', target: 'hcl', warning: '急に加えない' },
      { instruction: '気体の発生を観察', action: 'observe', result: '激しく泡が出る' },
      { instruction: '発生した気体を試験管に集める', action: 'collect' },
      { instruction: '火を近づけて確認', action: 'heat', result: 'ポンと音を立てて燃える', warning: '少量で試す' },
    ],
    observation: '亜鉛が溶けながら気体（水素）が発生。水素は火を近づけるとポンと音を立てて燃える。',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    explanation: '金属と酸が反応すると水素が発生します。水素は最も軽い気体で、燃えやすい性質があります。',
  },
  {
    id: 'co2-generation',
    name: '二酸化炭素の発生',
    category: '気体の発生',
    difficulty: 1,
    description: '石灰石に塩酸を加えて二酸化炭素を発生させる',
    equipment: ['flask', 'testtube', 'limewater'],
    chemicals: [
      { id: 'ite', name: '石灰石', color: '#f5f5f4', formula: 'CaCO₃' },
      { id: 'hcl', name: '塩酸', color: '#bef264', formula: 'HCl' },
      { id: 'limewater', name: '石灰水', color: '#f0f9ff', formula: 'Ca(OH)₂' },
    ],
    steps: [
      { instruction: 'フラスコに石灰石を入れる', action: 'add', target: 'cite' },
      { instruction: '塩酸を加える', action: 'add', target: 'hcl' },
      { instruction: '気体の発生を観察', action: 'observe', result: '泡が出てくる' },
      { instruction: '発生した気体を石灰水に通す', action: 'collect' },
      { instruction: '石灰水の変化を観察', action: 'observe', result: '白く濁る' },
    ],
    observation: '気体が発生し、石灰水が白く濁ることで二酸化炭素であることが確認できる。',
    equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    explanation: '�ite酸塩と酸が反応すると二酸化炭素が発生します。石灰水が白濁するのはCO₂との反応でCaCO₃ができるためです。',
  },
  {
    id: 'precipitation',
    name: '沈殿反応',
    category: '沈殿',
    difficulty: 2,
    description: '硝酸銀と食塩水で塩化銀の沈殿を作る',
    equipment: ['beaker', 'dropper', 'stirrer'],
    chemicals: [
      { id: 'agno3', name: '硝酸銀水溶液', color: '#e2e8f0', formula: 'AgNO₃' },
      { id: 'nacl', name: '食塩水', color: '#f0f9ff', formula: 'NaCl' },
    ],
    steps: [
      { instruction: 'ビーカーに硝酸銀水溶液を入れる', action: 'add', target: 'agno3' },
      { instruction: '食塩水を加える', action: 'add', target: 'nacl' },
      { instruction: '変化を観察', action: 'observe', result: '白い沈殿ができる' },
      { instruction: '静置して沈殿を確認', action: 'wait', result: '底に白い沈殿が溜まる' },
    ],
    observation: '白色の沈殿（塩化銀）ができて底に沈む。塩化銀は光で黒く変色する。',
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    explanation: '水に溶けにくい物質ができると沈殿になります。塩化銀は白い沈殿で、感光性があります。',
  },
];

// ============ Component ============
export const ChemistryLab: React.FC<Props> = ({ onClose }) => {
  // State
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [labState, setLabState] = useState({
    liquidLevel: 0,
    liquidColor: '#93c5fd',
    bubbles: false,
    precipitate: false,
    steam: false,
    flame: false,
    temperature: 25,
  });
  const [soundOn, setSoundOn] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Canvas dimensions
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 400;

  // Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bubblePositions: { x: number; y: number; r: number; speed: number }[] = [];
    let precipitatePositions: { x: number; y: number; r: number; vy: number }[] = [];
    let steamPositions: { x: number; y: number; opacity: number; vy: number }[] = [];

    // Initialize bubbles
    if (labState.bubbles) {
      for (let i = 0; i < 15; i++) {
        bubblePositions.push({
          x: 180 + Math.random() * 140,
          y: 280 + Math.random() * 60,
          r: 3 + Math.random() * 6,
          speed: 1 + Math.random() * 2,
        });
      }
    }

    // Initialize precipitate
    if (labState.precipitate) {
      for (let i = 0; i < 20; i++) {
        precipitatePositions.push({
          x: 180 + Math.random() * 140,
          y: 150 + Math.random() * 50,
          r: 4 + Math.random() * 4,
          vy: 0.5 + Math.random() * 1,
        });
      }
    }

    // Initialize steam
    if (labState.steam) {
      for (let i = 0; i < 10; i++) {
        steamPositions.push({
          x: 220 + Math.random() * 60,
          y: 130 - Math.random() * 30,
          opacity: 0.3 + Math.random() * 0.4,
          vy: -0.5 - Math.random() * 1,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw lab bench
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, 40);
      ctx.fillStyle = '#a0522d';
      ctx.fillRect(0, CANVAS_HEIGHT - 45, CANVAS_WIDTH, 8);

      // Draw beaker
      const beakerX = 150;
      const beakerY = 120;
      const beakerWidth = 200;
      const beakerHeight = 220;

      // Beaker glass effect
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY);
      ctx.lineTo(beakerX, beakerY + beakerHeight);
      ctx.quadraticCurveTo(beakerX, beakerY + beakerHeight + 15, beakerX + 20, beakerY + beakerHeight + 15);
      ctx.lineTo(beakerX + beakerWidth - 20, beakerY + beakerHeight + 15);
      ctx.quadraticCurveTo(beakerX + beakerWidth, beakerY + beakerHeight + 15, beakerX + beakerWidth, beakerY + beakerHeight);
      ctx.lineTo(beakerX + beakerWidth, beakerY);
      ctx.stroke();

      // Spout
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY);
      ctx.lineTo(beakerX - 15, beakerY - 10);
      ctx.moveTo(beakerX + beakerWidth, beakerY);
      ctx.lineTo(beakerX + beakerWidth + 15, beakerY - 10);
      ctx.stroke();

      // Liquid
      if (labState.liquidLevel > 0) {
        const liquidHeight = (labState.liquidLevel / 100) * (beakerHeight - 20);
        const liquidY = beakerY + beakerHeight - liquidHeight;

        // Liquid gradient
        const gradient = ctx.createLinearGradient(0, liquidY, 0, beakerY + beakerHeight);
        gradient.addColorStop(0, labState.liquidColor + 'cc');
        gradient.addColorStop(1, labState.liquidColor);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(beakerX + 4, liquidY);
        ctx.lineTo(beakerX + 4, beakerY + beakerHeight);
        ctx.quadraticCurveTo(beakerX + 4, beakerY + beakerHeight + 12, beakerX + 20, beakerY + beakerHeight + 12);
        ctx.lineTo(beakerX + beakerWidth - 20, beakerY + beakerHeight + 12);
        ctx.quadraticCurveTo(beakerX + beakerWidth - 4, beakerY + beakerHeight + 12, beakerX + beakerWidth - 4, beakerY + beakerHeight);
        ctx.lineTo(beakerX + beakerWidth - 4, liquidY);
        ctx.closePath();
        ctx.fill();

        // Liquid surface shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(beakerX + 10, liquidY + 2, beakerWidth - 20, 4);
      }

      // Bubbles animation
      if (labState.bubbles) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        bubblePositions = bubblePositions.map(b => {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();

          let newY = b.y - b.speed;
          if (newY < 150) {
            newY = 280 + Math.random() * 60;
          }
          return { ...b, y: newY };
        });
      }

      // Precipitate animation
      if (labState.precipitate) {
        ctx.fillStyle = '#f1f5f9';
        precipitatePositions = precipitatePositions.map(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1;
          ctx.stroke();

          let newY = p.y + p.vy;
          if (newY > 320) {
            newY = 320;
            p.vy = 0;
          }
          return { ...p, y: newY };
        });
      }

      // Steam animation
      if (labState.steam) {
        steamPositions = steamPositions.map(s => {
          ctx.fillStyle = `rgba(200, 200, 200, ${s.opacity})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
          ctx.fill();

          let newY = s.y + s.vy;
          let newOpacity = s.opacity - 0.005;
          if (newOpacity <= 0) {
            newY = 130 - Math.random() * 10;
            newOpacity = 0.3 + Math.random() * 0.4;
          }
          return { ...s, y: newY, opacity: newOpacity };
        });
      }

      // Bunsen burner
      if (labState.flame) {
        // Burner base
        ctx.fillStyle = '#374151';
        ctx.fillRect(220, CANVAS_HEIGHT - 80, 60, 40);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(230, CANVAS_HEIGHT - 85, 40, 8);

        // Flame
        const flameGradient = ctx.createRadialGradient(250, CANVAS_HEIGHT - 100, 5, 250, CANVAS_HEIGHT - 85, 30);
        flameGradient.addColorStop(0, '#fef3c7');
        flameGradient.addColorStop(0.3, '#fbbf24');
        flameGradient.addColorStop(0.6, '#f97316');
        flameGradient.addColorStop(1, '#dc2626');

        ctx.fillStyle = flameGradient;
        ctx.beginPath();
        ctx.moveTo(250, CANVAS_HEIGHT - 130 - Math.random() * 10);
        ctx.quadraticCurveTo(230, CANVAS_HEIGHT - 100, 235, CANVAS_HEIGHT - 85);
        ctx.lineTo(265, CANVAS_HEIGHT - 85);
        ctx.quadraticCurveTo(270, CANVAS_HEIGHT - 100, 250, CANVAS_HEIGHT - 130 - Math.random() * 10);
        ctx.fill();

        // Inner flame
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(250, CANVAS_HEIGHT - 110);
        ctx.quadraticCurveTo(242, CANVAS_HEIGHT - 95, 245, CANVAS_HEIGHT - 85);
        ctx.lineTo(255, CANVAS_HEIGHT - 85);
        ctx.quadraticCurveTo(258, CANVAS_HEIGHT - 95, 250, CANVAS_HEIGHT - 110);
        ctx.fill();
      }

      // Measurement lines on beaker
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#64748b';
      for (let i = 1; i <= 4; i++) {
        const y = beakerY + 40 + i * 45;
        ctx.beginPath();
        ctx.moveTo(beakerX + 5, y);
        ctx.lineTo(beakerX + 20, y);
        ctx.stroke();
        ctx.fillText(`${(5 - i) * 50}ml`, beakerX + 25, y + 4);
      }

      // Glass reflection
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerX + 15, beakerY + 20);
      ctx.lineTo(beakerX + 15, beakerY + beakerHeight - 20);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [labState]);

  // Execute step
  const executeStep = useCallback((step: ExperimentStep) => {
    switch (step.action) {
      case 'add':
        setLabState(prev => ({
          ...prev,
          liquidLevel: Math.min(80, prev.liquidLevel + 20),
        }));
        // Update color based on chemical
        if (step.target === 'hcl') {
          setLabState(prev => ({ ...prev, liquidColor: '#bef264' }));
        } else if (step.target === 'naoh') {
          setLabState(prev => ({ ...prev, liquidColor: '#c4b5fd' }));
        } else if (step.target === 'btb') {
          setLabState(prev => ({ ...prev, liquidColor: '#fef08a' })); // Yellow for acid + BTB
        } else if (step.target === 'zn') {
          setLabState(prev => ({ ...prev, bubbles: true }));
        } else if (step.target === 'agno3') {
          setLabState(prev => ({ ...prev, liquidColor: '#e2e8f0' }));
        } else if (step.target === 'nacl') {
          setLabState(prev => ({ ...prev, precipitate: true, liquidColor: '#f0f9ff' }));
        }
        break;
      case 'heat':
        setLabState(prev => ({
          ...prev,
          flame: true,
          temperature: prev.temperature + 30,
          steam: true,
        }));
        break;
      case 'observe':
        // Color change for neutralization
        if (selectedExperiment?.id === 'neutralization' && step.result?.includes('緑色')) {
          setLabState(prev => ({ ...prev, liquidColor: '#22c55e' }));
        }
        if (selectedExperiment?.id === 'neutralization' && step.result?.includes('青色')) {
          setLabState(prev => ({ ...prev, liquidColor: '#3b82f6' }));
        }
        break;
      case 'collect':
        // Gas collection animation could be added here
        break;
      case 'wait':
        // Already handled by precipitate settling
        break;
    }
  }, [selectedExperiment]);

  // Go to next step
  const nextStep = useCallback(() => {
    if (!selectedExperiment) return;

    if (currentStep < selectedExperiment.steps.length) {
      executeStep(selectedExperiment.steps[currentStep]);
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);

      if (currentStep + 1 >= selectedExperiment.steps.length) {
        setShowResult(true);
      }
    }
  }, [currentStep, selectedExperiment, executeStep]);

  // Auto play
  useEffect(() => {
    if (!isPlaying || !selectedExperiment) return;

    const interval = setInterval(() => {
      if (currentStep < selectedExperiment.steps.length) {
        nextStep();
      } else {
        setIsPlaying(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, selectedExperiment, nextStep]);

  // Reset experiment
  const resetExperiment = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setShowResult(false);
    setIsPlaying(false);
    setLabState({
      liquidLevel: 0,
      liquidColor: '#93c5fd',
      bubbles: false,
      precipitate: false,
      steam: false,
      flame: false,
      temperature: 25,
    });
  };

  // Select experiment
  const selectExperiment = (exp: Experiment) => {
    setSelectedExperiment(exp);
    resetExperiment();
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
            <FlaskConical className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">バーチャル化学実験室</h1>
            <p className="text-indigo-200 text-xs">安全に化学実験を体験しよう</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
          >
            {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
          >
            <HelpCircle size={20} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Experiment List */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <TestTubes className="text-indigo-500" size={18} />
              実験一覧
            </h2>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {EXPERIMENTS.map(exp => (
              <button
                key={exp.id}
                onClick={() => selectExperiment(exp)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedExperiment?.id === exp.id
                    ? 'bg-indigo-100 border-2 border-indigo-400'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{exp.name}</h3>
                  <span className="flex">
                    {[1, 2, 3].map(i => (
                      <Sparkles
                        key={i}
                        size={12}
                        className={i <= exp.difficulty ? 'text-yellow-400' : 'text-gray-200'}
                      />
                    ))}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{exp.description}</p>
                <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full">
                  {exp.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Lab Bench */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-200 to-slate-300">
          {selectedExperiment ? (
            <>
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="rounded-2xl shadow-2xl bg-gradient-to-b from-gray-100 to-gray-200"
              />

              {/* Controls */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={resetExperiment}
                  className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
                >
                  <RotateCcw size={18} />
                  リセット
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={showResult}
                  className={`px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg ${
                    showResult
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? '一時停止' : '自動実行'}
                </button>
                <button
                  onClick={nextStep}
                  disabled={showResult}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg ${
                    showResult
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  次のステップ
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Temperature display */}
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow">
                  <Thermometer size={16} className="text-red-500" />
                  <span className="font-mono font-bold">{labState.temperature}°C</span>
                </div>
                {labState.flame && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                    <Flame size={16} />
                    加熱中
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <Beaker className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500">左から実験を選んでください</p>
            </div>
          )}
        </div>

        {/* Right: Steps & Results */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          {selectedExperiment ? (
            <>
              {/* Experiment Info */}
              <div className="p-4 border-b border-gray-200 bg-indigo-50">
                <h3 className="font-bold text-indigo-800 mb-1">{selectedExperiment.name}</h3>
                <p className="text-sm text-indigo-600">{selectedExperiment.description}</p>
              </div>

              {/* Materials */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Droplets className="text-cyan-500" size={16} />
                  使用する薬品
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperiment.chemicals.map(chem => (
                    <span
                      key={chem.id}
                      className="px-2 py-1 rounded-lg text-xs font-medium text-gray-700 border"
                      style={{ backgroundColor: chem.color + '40', borderColor: chem.color }}
                    >
                      {chem.name} ({chem.formula})
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="flex-1 overflow-auto p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <GraduationCap className="text-purple-500" size={16} />
                  実験手順
                </h4>
                <div className="space-y-2">
                  {selectedExperiment.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl transition-all ${
                        idx === currentStep
                          ? 'bg-indigo-100 border-2 border-indigo-400'
                          : completedSteps.includes(idx)
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          completedSteps.includes(idx)
                            ? 'bg-green-500 text-white'
                            : idx === currentStep
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-300 text-white'
                        }`}>
                          {completedSteps.includes(idx) ? <CheckCircle2 size={14} /> : idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{step.instruction}</p>
                          {step.warning && (
                            <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                              <AlertTriangle size={12} />
                              {step.warning}
                            </p>
                          )}
                          {step.result && completedSteps.includes(idx) && (
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <Eye size={12} />
                              {step.result}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              {showResult && (
                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={16} />
                    実験完了！
                  </h4>
                  <div className="p-3 bg-white rounded-xl mb-2">
                    <p className="text-xs text-gray-500 mb-1">化学反応式</p>
                    <p className="font-mono font-bold text-gray-800">{selectedExperiment.equation}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl mb-2">
                    <p className="text-xs text-gray-500 mb-1">観察結果</p>
                    <p className="text-sm text-gray-700">{selectedExperiment.observation}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-600 mb-1">解説</p>
                    <p className="text-sm text-blue-800">{selectedExperiment.explanation}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FlaskConical className="mx-auto mb-2" size={40} />
                <p className="text-sm">実験を選択してください</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HelpCircle className="text-indigo-500" />
              使い方
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">1.</span>
                左のリストから実験を選ぶ
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">2.</span>
                「自動実行」または「次のステップ」で進める
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">3.</span>
                各ステップの結果を観察する
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">4.</span>
                完了後、反応式と解説を確認
              </li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistryLab;

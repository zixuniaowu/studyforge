/**
 * 物理实验室 & 数学可视化
 * 交互式物理模拟和数学图形
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap,
  Activity,
  Compass,
  X,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Move,
  Circle,
  Triangle,
  Square,
  Ruler
} from 'lucide-react';

// ================== Types ==================
interface Vector {
  x: number;
  y: number;
}

interface PhysicsObject {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  mass: number;
  color: string;
}

type ExperimentType = 'force' | 'pendulum' | 'circuit' | 'wave' | 'geometry' | 'graph';

// ================== Force Simulator ==================
const ForceSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [force, setForce] = useState({ x: 50, y: 0 });
  const [mass, setMass] = useState(5);
  const [friction, setFriction] = useState(0.1);
  const animationRef = useRef<number | undefined>(undefined);
  const objectRef = useRef<PhysicsObject>({
    position: { x: 100, y: 200 },
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    mass: 5,
    color: '#3b82f6'
  });

  const reset = useCallback(() => {
    objectRef.current = {
      position: { x: 100, y: 200 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      mass: mass,
      color: '#3b82f6'
    };
    setIsPlaying(false);
    draw();
  }, [mass]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const obj = objectRef.current;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 220, canvas.width, 80);

    // Draw grid
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 220);
      ctx.stroke();
    }

    // Draw object (box)
    const boxSize = 30 + obj.mass * 3;
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.position.x - boxSize / 2, obj.position.y - boxSize, boxSize, boxSize);

    // Draw force arrow
    if (force.x !== 0 || force.y !== 0) {
      const arrowScale = 2;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(obj.position.x, obj.position.y - boxSize / 2);
      ctx.lineTo(obj.position.x + force.x * arrowScale, obj.position.y - boxSize / 2 + force.y * arrowScale);
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(force.y, force.x);
      ctx.beginPath();
      ctx.moveTo(obj.position.x + force.x * arrowScale, obj.position.y - boxSize / 2 + force.y * arrowScale);
      ctx.lineTo(
        obj.position.x + force.x * arrowScale - 10 * Math.cos(angle - Math.PI / 6),
        obj.position.y - boxSize / 2 + force.y * arrowScale - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(obj.position.x + force.x * arrowScale, obj.position.y - boxSize / 2 + force.y * arrowScale);
      ctx.lineTo(
        obj.position.x + force.x * arrowScale - 10 * Math.cos(angle + Math.PI / 6),
        obj.position.y - boxSize / 2 + force.y * arrowScale - 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    }

    // Draw velocity indicator
    ctx.fillStyle = '#10b981';
    ctx.font = '14px sans-serif';
    ctx.fillText(`速度: ${obj.velocity.x.toFixed(1)} m/s`, 10, 30);
    ctx.fillText(`位置: ${obj.position.x.toFixed(0)} m`, 10, 50);
  }, [force, mass]);

  const update = useCallback(() => {
    const obj = objectRef.current;
    const dt = 0.016; // 60fps

    // F = ma -> a = F/m
    obj.acceleration.x = force.x / obj.mass;
    obj.acceleration.y = force.y / obj.mass;

    // Apply friction
    if (obj.velocity.x > 0) {
      obj.acceleration.x -= friction * 9.8;
    } else if (obj.velocity.x < 0) {
      obj.acceleration.x += friction * 9.8;
    }

    // Update velocity
    obj.velocity.x += obj.acceleration.x * dt;
    obj.velocity.y += obj.acceleration.y * dt;

    // Stop if very slow
    if (Math.abs(obj.velocity.x) < 0.1 && force.x === 0) {
      obj.velocity.x = 0;
    }

    // Update position
    obj.position.x += obj.velocity.x * dt * 10;
    obj.position.y += obj.velocity.y * dt * 10;

    // Boundary
    if (obj.position.x < 50) {
      obj.position.x = 50;
      obj.velocity.x = 0;
    }
    if (obj.position.x > 550) {
      obj.position.x = 550;
      obj.velocity.x = 0;
    }

    draw();
  }, [force, friction, draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        update();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, update]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full border border-gray-200 rounded-xl bg-white"
      />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">力 F (N)</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={force.x}
            onChange={(e) => setForce({ ...force, x: Number(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{force.x} N</span>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">質量 m (kg)</label>
          <input
            type="range"
            min="1"
            max="20"
            value={mass}
            onChange={(e) => {
              setMass(Number(e.target.value));
              objectRef.current.mass = Number(e.target.value);
            }}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{mass} kg</span>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">摩擦係数 μ</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={friction}
            onChange={(e) => setFriction(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{friction.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
            isPlaying
              ? 'bg-amber-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? '一時停止' : '開始'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center gap-2"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-medium text-blue-800 mb-2">運動の法則</h4>
        <p className="text-sm text-blue-700">
          <strong>F = ma</strong>（力 = 質量 × 加速度）<br />
          力を加えると物体が加速します。質量が大きいほど、同じ力でも加速度は小さくなります。
        </p>
      </div>
    </div>
  );
};

// ================== Pendulum Simulator ==================
const PendulumSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [length, setLength] = useState(150);
  const [gravity, setGravity] = useState(9.8);
  const animationRef = useRef<number | undefined>(undefined);
  const angleRef = useRef(Math.PI / 4);
  const angularVelocityRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = 50;
    const angle = angleRef.current;

    const bobX = centerX + length * Math.sin(angle);
    const bobY = centerY + length * Math.cos(angle);

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pivot point
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw string
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Draw bob
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw angle arc
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + 100);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw info
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText(`角度: ${(angle * 180 / Math.PI).toFixed(1)}°`, 10, 30);
    ctx.fillText(`周期: ${(2 * Math.PI * Math.sqrt(length / 100 / gravity)).toFixed(2)} s`, 10, 50);
  }, [length, gravity]);

  const update = useCallback(() => {
    const dt = 0.016;
    const g = gravity;
    const L = length / 100; // Convert to meters

    // Angular acceleration = -(g/L) * sin(θ)
    const angularAcceleration = -(g / L) * Math.sin(angleRef.current);

    // Damping
    const damping = 0.999;
    angularVelocityRef.current += angularAcceleration * dt;
    angularVelocityRef.current *= damping;

    angleRef.current += angularVelocityRef.current * dt;

    draw();
  }, [gravity, length, draw]);

  const reset = useCallback(() => {
    angleRef.current = Math.PI / 4;
    angularVelocityRef.current = 0;
    setIsPlaying(false);
    draw();
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        update();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, update]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full border border-gray-200 rounded-xl bg-gradient-to-b from-sky-50 to-white"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">紐の長さ (cm)</label>
          <input
            type="range"
            min="50"
            max="200"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{length} cm</span>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">重力加速度 (m/s²)</label>
          <input
            type="range"
            min="1"
            max="20"
            step="0.1"
            value={gravity}
            onChange={(e) => setGravity(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{gravity.toFixed(1)} m/s²</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
            isPlaying ? 'bg-amber-500 text-white' : 'bg-purple-500 text-white'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? '一時停止' : '開始'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
        <h4 className="font-medium text-purple-800 mb-2">単振り子の周期</h4>
        <p className="text-sm text-purple-700">
          <strong>T = 2π√(L/g)</strong><br />
          周期は紐の長さと重力加速度で決まります。質量には関係しません！
        </p>
      </div>
    </div>
  );
};

// ================== Circuit Simulator ==================
const CircuitSimulator: React.FC = () => {
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(3);
  const [isOn, setIsOn] = useState(false);

  const current = isOn ? voltage / resistance : 0;
  const power = voltage * current;

  return (
    <div className="space-y-4">
      {/* Circuit diagram */}
      <div className="relative bg-gray-50 rounded-xl p-8 h-64">
        {/* Battery */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <div className="text-center mb-2 text-sm font-medium text-gray-600">電池</div>
          <div className="w-12 h-24 border-2 border-gray-400 rounded bg-white flex flex-col items-center justify-center">
            <div className="w-8 h-1 bg-red-500 mb-1" />
            <span className="text-xs font-bold">{voltage}V</span>
            <div className="w-4 h-1 bg-blue-500 mt-1" />
          </div>
        </div>

        {/* Wires */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {/* Top wire */}
          <line x1="80" y1="100" x2="180" y2="100" stroke={isOn ? '#ef4444' : '#9ca3af'} strokeWidth="3" />
          <line x1="220" y1="100" x2="320" y2="100" stroke={isOn ? '#ef4444' : '#9ca3af'} strokeWidth="3" />

          {/* Bottom wire */}
          <line x1="80" y1="164" x2="320" y2="164" stroke={isOn ? '#3b82f6' : '#9ca3af'} strokeWidth="3" />

          {/* Vertical connections */}
          <line x1="80" y1="100" x2="80" y2="164" stroke={isOn ? '#ef4444' : '#9ca3af'} strokeWidth="3" />
          <line x1="320" y1="100" x2="320" y2="164" stroke={isOn ? '#3b82f6' : '#9ca3af'} strokeWidth="3" />

          {/* Current flow arrows */}
          {isOn && (
            <>
              <polygon points="150,95 160,100 150,105" fill="#ef4444" className="animate-pulse" />
              <polygon points="280,95 290,100 280,105" fill="#ef4444" className="animate-pulse" />
              <polygon points="200,169 190,164 200,159" fill="#3b82f6" className="animate-pulse" />
            </>
          )}
        </svg>

        {/* Switch */}
        <button
          onClick={() => setIsOn(!isOn)}
          className="absolute left-44 top-20 transform -translate-y-1/2"
        >
          <div className={`w-10 h-10 rounded-full border-4 ${isOn ? 'bg-green-500 border-green-600' : 'bg-gray-300 border-gray-400'} transition-colors`}>
            <span className="sr-only">{isOn ? 'ON' : 'OFF'}</span>
          </div>
          <div className="text-xs text-center mt-1">{isOn ? 'ON' : 'OFF'}</div>
        </button>

        {/* Resistor */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
          <div className="text-center mb-2 text-sm font-medium text-gray-600">抵抗</div>
          <div className={`w-16 h-8 ${isOn ? 'bg-amber-200' : 'bg-gray-200'} rounded flex items-center justify-center transition-colors`}>
            <span className="text-xs font-bold">{resistance}Ω</span>
          </div>
        </div>

        {/* Light bulb */}
        <div className="absolute right-20 top-4">
          <div className={`w-12 h-12 rounded-full ${isOn ? 'bg-yellow-300 shadow-lg shadow-yellow-300/50' : 'bg-gray-200'} flex items-center justify-center transition-all duration-300`}>
            <Lightbulb size={24} className={isOn ? 'text-yellow-600' : 'text-gray-400'} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">電圧 V (ボルト)</label>
          <input
            type="range"
            min="1"
            max="12"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{voltage} V</span>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">抵抗 R (オーム)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{resistance} Ω</span>
        </div>
      </div>

      {/* Calculations */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-blue-50 rounded-xl text-center">
          <div className="text-xs text-blue-600 mb-1">電流 I</div>
          <div className="text-xl font-bold text-blue-800">{current.toFixed(2)} A</div>
        </div>
        <div className="p-3 bg-green-50 rounded-xl text-center">
          <div className="text-xs text-green-600 mb-1">電圧 V</div>
          <div className="text-xl font-bold text-green-800">{voltage} V</div>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl text-center">
          <div className="text-xs text-amber-600 mb-1">電力 P</div>
          <div className="text-xl font-bold text-amber-800">{power.toFixed(1)} W</div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-medium text-blue-800 mb-2">オームの法則</h4>
        <p className="text-sm text-blue-700">
          <strong>V = IR</strong>（電圧 = 電流 × 抵抗）<br />
          <strong>P = VI</strong>（電力 = 電圧 × 電流）<br />
          スイッチをONにして、電圧と抵抗を変えてみよう！
        </p>
      </div>
    </div>
  );
};

// ================== Geometry Visualizer ==================
const GeometryVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<'triangle' | 'circle' | 'rectangle'>('triangle');
  const [size, setSize] = useState(100);
  const showFormula = true; // Always show formula for now

  const drawShape = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    ctx.fillStyle = '#8b5cf6';
    ctx.strokeStyle = '#6d28d9';
    ctx.lineWidth = 2;

    let area = 0;
    let perimeter = 0;

    if (shape === 'triangle') {
      // Equilateral triangle
      const height = size * Math.sqrt(3) / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - height / 2);
      ctx.lineTo(centerX - size / 2, centerY + height / 2);
      ctx.lineTo(centerX + size / 2, centerY + height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      area = (Math.sqrt(3) / 4) * size * size;
      perimeter = 3 * size;

      // Draw measurements
      ctx.fillStyle = '#374151';
      ctx.font = '14px sans-serif';
      ctx.fillText(`a = ${size}`, centerX + size / 4, centerY + size / 3 + 20);

    } else if (shape === 'circle') {
      const radius = size / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      area = Math.PI * radius * radius;
      perimeter = 2 * Math.PI * radius;

      // Draw radius line
      ctx.strokeStyle = '#ef4444';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#374151';
      ctx.font = '14px sans-serif';
      ctx.fillText(`r = ${Math.round(radius)}`, centerX + radius / 2, centerY - 10);

    } else if (shape === 'rectangle') {
      const width = size;
      const height = size * 0.6;
      ctx.fillRect(centerX - width / 2, centerY - height / 2, width, height);
      ctx.strokeRect(centerX - width / 2, centerY - height / 2, width, height);

      area = width * height;
      perimeter = 2 * (width + height);

      ctx.fillStyle = '#374151';
      ctx.font = '14px sans-serif';
      ctx.fillText(`${width}`, centerX, centerY + height / 2 + 20);
      ctx.fillText(`${Math.round(height)}`, centerX + width / 2 + 10, centerY);
    }

    // Draw area and perimeter
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`面積: ${area.toFixed(1)} cm²`, 10, 30);
    ctx.fillText(`周長: ${perimeter.toFixed(1)} cm`, 10, 55);

  }, [shape, size]);

  useEffect(() => {
    drawShape();
  }, [drawShape]);

  const formulas = {
    triangle: {
      area: 'S = (√3/4) × a²',
      perimeter: 'L = 3a'
    },
    circle: {
      area: 'S = πr²',
      perimeter: 'L = 2πr'
    },
    rectangle: {
      area: 'S = a × b',
      perimeter: 'L = 2(a + b)'
    }
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full border border-gray-200 rounded-xl bg-white"
      />

      <div className="flex gap-2">
        {(['triangle', 'circle', 'rectangle'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
              shape === s
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {s === 'triangle' && <Triangle size={20} />}
            {s === 'circle' && <Circle size={20} />}
            {s === 'rectangle' && <Square size={20} />}
            {s === 'triangle' && '三角形'}
            {s === 'circle' && '円'}
            {s === 'rectangle' && '長方形'}
          </button>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">サイズ</label>
        <input
          type="range"
          min="50"
          max="150"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {showFormula && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
            <Ruler size={18} />
            公式
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-600">面積: </span>
              <span className="font-mono font-medium">{formulas[shape].area}</span>
            </div>
            <div>
              <span className="text-purple-600">周長: </span>
              <span className="font-mono font-medium">{formulas[shape].perimeter}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ================== Main Component ==================
interface PhysicsLabProps {
  onClose?: () => void;
}

export const PhysicsLab: React.FC<PhysicsLabProps> = ({ onClose }) => {
  const [experiment, setExperiment] = useState<ExperimentType>('force');

  const experiments = [
    { id: 'force' as const, name: '力と運動', icon: Move, color: 'blue' },
    { id: 'pendulum' as const, name: '振り子', icon: Activity, color: 'purple' },
    { id: 'circuit' as const, name: '電気回路', icon: Zap, color: 'amber' },
    { id: 'geometry' as const, name: '図形', icon: Compass, color: 'pink' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">理科・数学ラボ</h1>
                <p className="text-white/80 text-sm">インタラクティブな実験で学ぼう</p>
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

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Experiment selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {experiments.map((exp) => {
            const Icon = exp.icon;
            return (
              <button
                key={exp.id}
                onClick={() => setExperiment(exp.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  experiment === exp.id
                    ? `bg-${exp.color}-500 text-white shadow-lg`
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={20} />
                {exp.name}
              </button>
            );
          })}
        </div>

        {/* Experiment content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {experiment === 'force' && <ForceSimulator />}
          {experiment === 'pendulum' && <PendulumSimulator />}
          {experiment === 'circuit' && <CircuitSimulator />}
          {experiment === 'geometry' && <GeometryVisualizer />}
        </div>
      </div>
    </div>
  );
};

export default PhysicsLab;

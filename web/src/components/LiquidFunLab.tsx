/**
 * LiquidFun Lab - Physics Simulation
 * Simplified version with better interaction
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, RotateCcw, Play, Pause, HelpCircle,
  Droplets, Circle, Square, Trash2, Atom
} from 'lucide-react';

interface Props {
  onClose?: () => void;
}

type Tool = 'pointer' | 'water' | 'ball' | 'box' | 'eraser';

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'ball' | 'box';
  radius?: number;
  width?: number;
  height?: number;
  color: string;
  rotation: number;
  angularVel: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

export const LiquidFunLab: React.FC<Props> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('ball');
  const [isRunning, setIsRunning] = useState(true);
  const [gravity, setGravity] = useState(980); // pixels per second^2
  const [showHelp, setShowHelp] = useState(false);

  // Physics state refs (to avoid re-renders)
  const bodiesRef = useRef<Body[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const isRunningRef = useRef(true);
  const gravityRef = useRef(980);

  // Keep refs in sync
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    gravityRef.current = gravity;
  }, [gravity]);

  // Get canvas coordinates considering scaling
  const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  // Add a ball
  const addBall = useCallback((x: number, y: number) => {
    const radius = 15 + Math.random() * 20;
    bodiesRef.current.push({
      x, y,
      vx: (Math.random() - 0.5) * 100,
      vy: 0,
      type: 'ball',
      radius,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: 0,
      angularVel: (Math.random() - 0.5) * 2
    });
  }, []);

  // Add a box
  const addBox = useCallback((x: number, y: number) => {
    const size = 25 + Math.random() * 25;
    bodiesRef.current.push({
      x, y,
      vx: (Math.random() - 0.5) * 100,
      vy: 0,
      type: 'box',
      width: size,
      height: size * (0.8 + Math.random() * 0.4),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: 0,
      angularVel: (Math.random() - 0.5) * 2
    });
  }, []);

  // Add water particles
  const addWater = useCallback((x: number, y: number) => {
    for (let i = 0; i < 10; i++) {
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 150,
        vy: (Math.random() - 0.5) * 150,
        radius: 4 + Math.random() * 3
      });
    }
  }, []);

  // Clear all
  const clearAll = useCallback(() => {
    bodiesRef.current = [];
    particlesRef.current = [];
  }, []);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);

    switch (tool) {
      case 'ball':
        addBall(x, y);
        break;
      case 'box':
        addBox(x, y);
        break;
      case 'water':
        addWater(x, y);
        break;
      case 'eraser':
        clearAll();
        break;
    }
  }, [tool, getCanvasCoords, addBall, addBox, addWater, clearAll]);

  // Handle mouse drag for water
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1 || tool !== 'water') return;
    const { x, y } = getCanvasCoords(e);
    addWater(x, y);
  }, [tool, getCanvasCoords, addWater]);

  // Physics and render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const FRICTION = 0.99;
    const BOUNCE = 0.7;
    const PARTICLE_BOUNCE = 0.3;

    const update = (dt: number) => {
      if (!isRunningRef.current) return;

      const g = gravityRef.current;

      // Update bodies
      for (const body of bodiesRef.current) {
        // Apply gravity
        body.vy += g * dt;

        // Apply velocity
        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.rotation += body.angularVel * dt;

        // Apply friction
        body.vx *= FRICTION;
        body.vy *= FRICTION;
        body.angularVel *= FRICTION;

        // Get bounds
        const halfW = body.type === 'ball' ? body.radius! : body.width! / 2;
        const halfH = body.type === 'ball' ? body.radius! : body.height! / 2;

        // Ground collision
        if (body.y + halfH > HEIGHT - 10) {
          body.y = HEIGHT - 10 - halfH;
          body.vy = -body.vy * BOUNCE;
          body.angularVel += body.vx * 0.01;
        }

        // Wall collisions
        if (body.x - halfW < 10) {
          body.x = 10 + halfW;
          body.vx = -body.vx * BOUNCE;
        }
        if (body.x + halfW > WIDTH - 10) {
          body.x = WIDTH - 10 - halfW;
          body.vx = -body.vx * BOUNCE;
        }

        // Ceiling
        if (body.y - halfH < 0) {
          body.y = halfH;
          body.vy = Math.abs(body.vy) * BOUNCE;
        }
      }

      // Simple body-body collision
      for (let i = 0; i < bodiesRef.current.length; i++) {
        for (let j = i + 1; j < bodiesRef.current.length; j++) {
          const a = bodiesRef.current[i];
          const b = bodiesRef.current[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const aR = a.type === 'ball' ? a.radius! : Math.max(a.width!, a.height!) / 2;
          const bR = b.type === 'ball' ? b.radius! : Math.max(b.width!, b.height!) / 2;
          const minDist = aR + bR;

          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            // Separate
            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;

            // Bounce
            const relVx = b.vx - a.vx;
            const relVy = b.vy - a.vy;
            const relVn = relVx * nx + relVy * ny;

            if (relVn < 0) {
              const impulse = relVn * BOUNCE;
              a.vx += impulse * nx;
              a.vy += impulse * ny;
              b.vx -= impulse * nx;
              b.vy -= impulse * ny;
            }
          }
        }
      }

      // Update particles
      for (const p of particlesRef.current) {
        p.vy += g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Boundaries
        if (p.y + p.radius > HEIGHT - 10) {
          p.y = HEIGHT - 10 - p.radius;
          p.vy = -p.vy * PARTICLE_BOUNCE;
        }
        if (p.x - p.radius < 10) {
          p.x = 10 + p.radius;
          p.vx = -p.vx * PARTICLE_BOUNCE;
        }
        if (p.x + p.radius > WIDTH - 10) {
          p.x = WIDTH - 10 - p.radius;
          p.vx = -p.vx * PARTICLE_BOUNCE;
        }
      }

      // Simple particle-particle repulsion
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.radius + b.radius + 2;

          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const push = (minDist - dist) * 0.5;

            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
          }
        }
      }

      // Limit particles
      if (particlesRef.current.length > 500) {
        particlesRef.current = particlesRef.current.slice(-500);
      }
    };

    const render = () => {
      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < WIDTH; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
      }

      // Walls
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 0, 10, HEIGHT);
      ctx.fillRect(WIDTH - 10, 0, 10, HEIGHT);
      ctx.fillRect(0, HEIGHT - 10, WIDTH, 10);

      // Particles (water)
      for (const p of particlesRef.current) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
        grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.7)');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0.3)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bodies
      for (const body of bodiesRef.current) {
        ctx.save();
        ctx.translate(body.x, body.y);
        ctx.rotate(body.rotation);

        if (body.type === 'ball' && body.radius) {
          // 3D ball effect
          const grad = ctx.createRadialGradient(
            -body.radius * 0.3, -body.radius * 0.3, 0,
            0, 0, body.radius
          );
          grad.addColorStop(0, lightenColor(body.color, 40));
          grad.addColorStop(0.7, body.color);
          grad.addColorStop(1, darkenColor(body.color, 30));

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, body.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = darkenColor(body.color, 40);
          ctx.lineWidth = 2;
          ctx.stroke();

        } else if (body.type === 'box' && body.width && body.height) {
          ctx.fillStyle = body.color;
          ctx.fillRect(-body.width / 2, -body.height / 2, body.width, body.height);

          ctx.strokeStyle = darkenColor(body.color, 30);
          ctx.lineWidth = 2;
          ctx.strokeRect(-body.width / 2, -body.height / 2, body.width, body.height);

          // Highlight
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(-body.width / 2, -body.height / 2, body.width, body.height / 4);
        }

        ctx.restore();
      }

      // Stats overlay
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(WIDTH - 120, 10, 110, 50);
      ctx.fillStyle = '#fff';
      ctx.font = '12px monospace';
      ctx.fillText(`物体: ${bodiesRef.current.length}`, WIDTH - 110, 28);
      ctx.fillText(`粒子: ${particlesRef.current.length}`, WIDTH - 110, 48);
    };

    const lightenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.min(255, (num >> 16) + amt);
      const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
      const B = Math.min(255, (num & 0x0000FF) + amt);
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };

    const darkenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, (num >> 16) - amt);
      const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
      const B = Math.max(0, (num & 0x0000FF) - amt);
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };

    const loop = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      update(dt);
      render();

      animationRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
            <Atom className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">物理シミュレーター</h1>
            <p className="text-blue-200 text-xs">クリックで物体を追加</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
        {/* Left Panel: Tools */}
        <div className="w-48 bg-slate-800 border-r border-slate-700 p-4 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-white mb-3">ツール</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ball' as Tool, icon: <Circle size={24} />, name: 'ボール', color: 'bg-blue-500' },
                { id: 'box' as Tool, icon: <Square size={24} />, name: '箱', color: 'bg-green-500' },
                { id: 'water' as Tool, icon: <Droplets size={24} />, name: '水', color: 'bg-cyan-500' },
                { id: 'eraser' as Tool, icon: <Trash2 size={24} />, name: 'クリア', color: 'bg-red-500' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${
                    tool === t.id
                      ? `${t.color} text-white shadow-lg scale-105`
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {t.icon}
                  <span className="text-xs font-medium">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white mb-3">設定</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 flex justify-between mb-1">
                  <span>重力</span>
                  <span>{Math.round(gravity / 98)} G</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="space-y-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full py-2 rounded-xl transition-all flex items-center justify-center gap-2 font-medium ${
                isRunning
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              {isRunning ? '停止' : '再生'}
            </button>
            <button
              onClick={clearAll}
              className="w-full py-2 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              リセット
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-950">
          <canvas
            ref={canvasRef}
            width={900}
            height={550}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            className="rounded-xl shadow-2xl border border-slate-700 cursor-crosshair max-w-full max-h-full"
            style={{ aspectRatio: '900/550' }}
          />
        </div>

        {/* Right Panel: Instructions */}
        <div className="w-48 bg-slate-800 border-l border-slate-700 p-4">
          <h2 className="text-sm font-bold text-white mb-3">操作方法</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="p-3 bg-slate-700 rounded-lg">
              <p className="font-medium text-white mb-1">🎱 ボール</p>
              <p className="text-xs">クリックで追加</p>
            </div>
            <div className="p-3 bg-slate-700 rounded-lg">
              <p className="font-medium text-white mb-1">📦 箱</p>
              <p className="text-xs">クリックで追加</p>
            </div>
            <div className="p-3 bg-slate-700 rounded-lg">
              <p className="font-medium text-white mb-1">💧 水</p>
              <p className="text-xs">クリック＆ドラッグ</p>
            </div>
            <div className="p-3 bg-slate-700 rounded-lg">
              <p className="font-medium text-white mb-1">🧹 クリア</p>
              <p className="text-xs">クリックで全消去</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md shadow-2xl text-white" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="text-cyan-400" />
              使い方
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• 左のパネルでツールを選択</li>
              <li>• キャンバスをクリックして物体を追加</li>
              <li>• 水ツールはドラッグで連続追加</li>
              <li>• 重力スライダーで落下速度を調整</li>
              <li>• 停止ボタンで一時停止</li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquidFunLab;

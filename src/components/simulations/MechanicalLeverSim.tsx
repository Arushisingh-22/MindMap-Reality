import React, { useState } from 'react';
import { RotateCcw, Wrench, Info, ArrowDown, ArrowUp } from 'lucide-react';

export const MechanicalLeverSim: React.FC = () => {
  const [effortArm, setEffortArm] = useState<number>(2.0); // meters (0.5 to 5.0)
  const [loadArm, setLoadArm] = useState<number>(0.5); // meters (0.1 to 3.0)
  const [effortForce, setEffortForce] = useState<number>(100); // Newtons (10 to 500)

  // Calculations
  const ima = Number((effortArm / loadArm).toFixed(2));
  const loadForce = Number((effortForce * ima).toFixed(1));
  const massKg = Number((loadForce / 9.81).toFixed(1));

  const handleReset = () => {
    setEffortArm(2.0);
    setLoadArm(0.5);
    setEffortForce(100);
  };

  // SVG coordinate calculations for dynamic lever bar:
  // Total virtual beam width = 400px.
  // Fulcrum position is proportional to loadArm vs effortArm.
  const totalLength = effortArm + loadArm;
  const fulcrumRatio = effortArm / totalLength; // between 0.1 and 0.9
  const fulcrumX = 60 + fulcrumRatio * 380; // maps to SVG range 60 to 440

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Wrench className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-brand-text">Mechanical Lever & Advantage Simulator</h3>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Discover how shifting fulcrum distance trades input stroke distance for massive mechanical lifting amplification.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-text bg-brand-surface hover:bg-brand-surface-hover rounded-lg transition-colors self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Lever
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Effort Arm Length */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="effort-arm-input" className="text-sm font-semibold text-brand-text">
                Effort Arm Length (L<sub>effort</sub>)
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="effort-arm-input"
                  type="number"
                  min={0.5}
                  max={5.0}
                  step={0.1}
                  value={effortArm}
                  onChange={(e) => setEffortArm(Math.max(0.5, Math.min(5.0, Number(e.target.value) || 0.5)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">m</span>
              </div>
            </div>
            <input
              type="range"
              min={0.5}
              max={5.0}
              step={0.1}
              value={effortArm}
              onChange={(e) => setEffortArm(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
              <span>0.5 m</span>
              <span>2.5 m</span>
              <span>5.0 m</span>
            </div>
          </div>

          {/* Load Arm Length */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="load-arm-input" className="text-sm font-semibold text-brand-text">
                Load Arm Length (L<sub>load</sub>)
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="load-arm-input"
                  type="number"
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  value={loadArm}
                  onChange={(e) => setLoadArm(Math.max(0.1, Math.min(3.0, Number(e.target.value) || 0.1)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">m</span>
              </div>
            </div>
            <input
              type="range"
              min={0.1}
              max={3.0}
              step={0.1}
              value={loadArm}
              onChange={(e) => setLoadArm(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
              <span>0.1 m</span>
              <span>1.5 m</span>
              <span>3.0 m</span>
            </div>
          </div>

          {/* Effort Force */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="effort-force-input" className="text-sm font-semibold text-brand-text">
                Applied Effort Force (F<sub>effort</sub>)
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="effort-force-input"
                  type="number"
                  min={10}
                  max={500}
                  step={10}
                  value={effortForce}
                  onChange={(e) => setEffortForce(Math.max(10, Math.min(500, Number(e.target.value) || 10)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400">N</span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={effortForce}
              onChange={(e) => setEffortForce(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
              <span>10 N (One hand)</span>
              <span>200 N (Body weight push)</span>
              <span>500 N (Heavy pry)</span>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800/60 p-4 rounded-xl">
              <span className="text-xs font-medium text-pink-700 dark:text-pink-300 block">Mechanical Advantage</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-pink-600 dark:text-pink-400 font-mono">{ima}x</span>
              </div>
              <span className="text-xs text-brand-muted block mt-1">IMA = {effortArm}m / {loadArm}m</span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 block">Ideal Lifted Force</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{loadForce}</span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">N</span>
              </div>
              <span className="text-xs text-brand-muted block mt-1">≈ {massKg} kg equivalent mass</span>
            </div>
          </div>
        </div>

        {/* Visual Diagram Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-brand-surface/30 p-6 rounded-2xl border border-brand-border">
          <div className="relative w-full aspect-[16/10] bg-brand-card rounded-xl border border-brand-border overflow-hidden p-4 flex items-center justify-center">
            {/* SVG Lever Schematic */}
            <svg viewBox="0 0 500 280" className="w-full h-full max-h-[250px]">
              {/* Ground Baseline */}
              <line x1="40" y1="210" x2="460" y2="210" stroke="var(--color-border)" strokeWidth="3" strokeDasharray="6 4" />

              {/* Fulcrum Triangle Pivot */}
              <polygon
                points={`${fulcrumX},150 ${fulcrumX - 25},210 ${fulcrumX + 25},210`}
                fill="#38A9F5"
                stroke="#17365D"
                strokeWidth="2"
              />
              <circle cx={fulcrumX} cy="150" r="5" fill="#FFFFFF" stroke="#17365D" strokeWidth="2" />
              <text x={fulcrumX} y="230" textAnchor="middle" fill="var(--color-text)" fontSize="12" fontWeight="bold">
                Fulcrum Pivot
              </text>

              {/* The Rigid Beam */}
              <rect
                x="60"
                y="142"
                width="380"
                height="16"
                rx="4"
                fill="#64748B"
                stroke="var(--color-text)"
                strokeWidth="2"
              />

              {/* Effort Force Arrow (Left End) */}
              <g transform="translate(80, 140)">
                <line x1="0" y1="-50" x2="0" y2="-6" stroke="#EC4899" strokeWidth="4" markerEnd="url(#arrow)" />
                <polygon points="0,-6 -6,-16 6,-16" fill="#EC4899" />
                <text x="-12" y="-30" textAnchor="end" fill="#EC4899" fontSize="13" fontWeight="bold">
                  Effort: {effortForce} N ↓
                </text>
              </g>

              {/* Load Crate (Right End) */}
              <g transform="translate(420, 142)">
                <rect x="-24" y="-48" width="48" height="48" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2" />
                <text x="0" y="-22" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  LOAD
                </text>
                <text x="0" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                  {loadForce} N
                </text>
                {/* Upward force arrow indicating support */}
                <line x1="0" y1="-54" x2="0" y2="-75" stroke="#10B981" strokeWidth="3" />
                <polygon points="0,-75 -5,-65 5,-65" fill="#10B981" />
              </g>

              {/* Dimension Annotations */}
              {/* Effort Arm Bracket */}
              <line x1="60" y1="180" x2={fulcrumX} y2="180" stroke="#EC4899" strokeWidth="1.5" />
              <line x1="60" y1="175" x2="60" y2="185" stroke="#EC4899" strokeWidth="1.5" />
              <line x1={fulcrumX} y1="175" x2={fulcrumX} y2="185" stroke="#EC4899" strokeWidth="1.5" />
              <text x={(60 + fulcrumX) / 2} y="196" textAnchor="middle" fill="#EC4899" fontSize="11" fontWeight="bold">
                Effort Arm: {effortArm} m
              </text>

              {/* Load Arm Bracket */}
              <line x1={fulcrumX} y1="180" x2="440" y2="180" stroke="#10B981" strokeWidth="1.5" />
              <line x1="440" y1="175" x2="440" y2="185" stroke="#10B981" strokeWidth="1.5" />
              <text x={(fulcrumX + 440) / 2} y="196" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">
                Load Arm: {loadArm} m
              </text>
            </svg>
          </div>

          {/* Educational Principle Callout */}
          <div className="mt-4 p-3 bg-brand-surface rounded-xl border border-brand-border/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-text">Conservation of Energy:</strong> Notice that Work In = Work Out. When you gain a {ima}x mechanical advantage, your hands must push through {ima} times more distance to lift the heavy crate. The lever does not create free energy; it trades distance for force.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

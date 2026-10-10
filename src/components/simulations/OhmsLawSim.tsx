import React, { useState } from 'react';
import { RotateCcw, Zap, Info, Gauge } from 'lucide-react';

export const OhmsLawSim: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(6); // 1 to 12 V
  const [resistance, setResistance] = useState<number>(3); // 1 to 12 Ω

  const current = Number((voltage / resistance).toFixed(2));
  const power = Number((voltage * current).toFixed(2));

  const handleReset = () => {
    setVoltage(6);
    setResistance(3);
  };

  // Calculate bulb brightness (0 to 1) based on current (max expected ~12A at 12V / 1Ω)
  const brightness = Math.min(Math.max(current / 4, 0.1), 1);
  const glowRadius = Math.round(brightness * 25);
  // Electron animation speed (seconds for full dash offset loop)
  const animDuration = Math.max(0.4, 4 - current * 0.3);

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Zap className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-brand-text">Ohm's Law Interactive Circuit Simulator</h3>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Experiment with electric potential (V) and resistance (R) to observe real-time current flow (I = V / R).
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-text bg-brand-surface hover:bg-brand-surface-hover rounded-lg transition-colors self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Lab
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Voltage slider */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="voltage-input" className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                <span>Voltage (V)</span>
                <span className="text-xs font-normal text-brand-muted">Electrical Push</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="voltage-input"
                  type="number"
                  min={1}
                  max={12}
                  step={0.5}
                  value={voltage}
                  onChange={(e) => setVoltage(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">V</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={0.5}
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
              <span>1.0 V (AA cell)</span>
              <span>6.0 V (Lantern)</span>
              <span>12.0 V (Car battery)</span>
            </div>
          </div>

          {/* Resistance slider */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="resistance-input" className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                <span>Resistance (R)</span>
                <span className="text-xs font-normal text-brand-muted">Charge Friction</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="resistance-input"
                  type="number"
                  min={1}
                  max={12}
                  step={0.5}
                  value={resistance}
                  onChange={(e) => setResistance(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">Ω</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={0.5}
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
              <span>1.0 Ω (Low choke)</span>
              <span>6.0 Ω (Moderate)</span>
              <span>12.0 Ω (High choke)</span>
            </div>
          </div>

          {/* Calculated Output Gauges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 p-4 rounded-xl">
              <span className="text-xs font-medium text-sky-700 dark:text-sky-300 block">Calculated Current (I)</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">{current}</span>
                <span className="text-sm font-bold text-sky-700 dark:text-sky-300">Amperes (A)</span>
              </div>
              <span className="text-xs text-brand-muted block mt-1">{(current * 1000).toFixed(0)} mA (milliamps)</span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 block">Dissipated Power (P = V×I)</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{power}</span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Watts (W)</span>
              </div>
              <span className="text-xs text-brand-muted block mt-1">Thermal & radiant output</span>
            </div>
          </div>
        </div>

        {/* Visual Schematic Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-brand-surface/30 p-6 rounded-2xl border border-brand-border">
          <div className="relative w-full aspect-[16/10] bg-brand-card rounded-xl border border-brand-border overflow-hidden p-4 flex items-center justify-center">
            {/* SVG Circuit Schematic */}
            <svg viewBox="0 0 500 300" className="w-full h-full max-h-[260px]">
              <style>{`
                @keyframes flowAnim {
                  from { stroke-dashoffset: 40; }
                  to { stroke-dashoffset: 0; }
                }
                .wire-electrons {
                  animation: flowAnim ${animDuration}s linear infinite;
                }
              `}</style>

              {/* Wire Path (Rectangle Loop) */}
              <rect
                x="60"
                y="50"
                width="380"
                height="200"
                rx="16"
                fill="none"
                stroke="currentColor"
                className="text-brand-border"
                strokeWidth="6"
              />

              {/* Animated Electron Current Dots */}
              <rect
                x="60"
                y="50"
                width="380"
                height="200"
                rx="16"
                fill="none"
                stroke="#38A9F5"
                strokeWidth="4"
                strokeDasharray="6 14"
                className="wire-electrons"
              />

              {/* DC Battery Symbol (Left side) */}
              <g transform="translate(60, 150)">
                <rect x="-24" y="-35" width="48" height="70" rx="6" fill="var(--color-card)" stroke="var(--color-border)" strokeWidth="2" />
                <line x1="-14" y1="-15" x2="14" y2="-15" stroke="#38A9F5" strokeWidth="4" strokeLinecap="round" />
                <line x1="-7" y1="-5" x2="7" y2="-5" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
                <line x1="-14" y1="5" x2="14" y2="5" stroke="#38A9F5" strokeWidth="4" strokeLinecap="round" />
                <line x1="-7" y1="15" x2="7" y2="15" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
                <text x="-32" y="-12" fill="#38A9F5" fontSize="14" fontWeight="bold">+</text>
                <text x="-32" y="20" fill="#64748B" fontSize="14" fontWeight="bold">-</text>
                <text x="32" y="5" fill="var(--color-text)" fontSize="12" fontWeight="bold">{voltage} V</text>
              </g>

              {/* Resistor Component (Top side) */}
              <g transform="translate(250, 50)">
                <rect x="-45" y="-18" width="90" height="36" rx="4" fill="var(--color-card)" stroke="var(--color-border)" strokeWidth="2" />
                {/* Zigzag resistor glyph */}
                <path
                  d="M -35 0 L -25 -10 L -15 10 L -5 -10 L 5 10 L 15 -10 L 25 10 L 35 0"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="0" y="-24" textAnchor="middle" fill="var(--color-text)" fontSize="12" fontWeight="bold">
                  Resistor: {resistance} Ω
                </text>
              </g>

              {/* Filament Bulb / Load (Right side) */}
              <g transform="translate(440, 150)">
                {/* Glow Filter */}
                <circle
                  cx="0"
                  cy="0"
                  r={20 + glowRadius}
                  fill={`rgba(250, 204, 21, ${0.15 + brightness * 0.4})`}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  fill={brightness > 0.4 ? '#FEF08A' : '#F1F5F9'}
                  stroke="#EAB308"
                  strokeWidth="2.5"
                />
                {/* Filament */}
                <path
                  d="M -8 10 L -4 -6 L 0 6 L 4 -6 L 8 10"
                  fill="none"
                  stroke={brightness > 0.4 ? '#CA8A04' : '#94A3B8'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <text x="-34" y="5" textAnchor="end" fill="var(--color-text)" fontSize="12" fontWeight="bold">
                  Bulb Load
                </text>
              </g>

              {/* Digital Ammeter (Bottom side) */}
              <g transform="translate(250, 250)">
                <circle cx="0" cy="0" r="26" fill="var(--color-card)" stroke="#38A9F5" strokeWidth="3" />
                <text x="0" y="-4" textAnchor="middle" fill="#38A9F5" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  {current}A
                </text>
                <text x="0" y="14" textAnchor="middle" fill="var(--color-muted)" fontSize="9" fontWeight="600">
                  AMMETER
                </text>
              </g>
            </svg>
          </div>

          {/* Explanation Footer */}
          <div className="mt-4 p-3 bg-brand-surface rounded-xl border border-brand-border/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-text">Physical Principle:</strong> Voltage pushes charge forward while resistance slows it down. Notice how increasing resistance to 12 Ω slows the electron flow and dims the lamp, while dialing voltage to 12 V surges current to { (12 / resistance).toFixed(1) } A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

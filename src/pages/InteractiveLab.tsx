import React, { useState } from 'react';
import {
  FlaskConical,
  Zap,
  Wrench,
  Dices,
  Flame,
  Info,
  CheckCircle,
} from 'lucide-react';
import { OhmsLawSim } from '../components/simulations/OhmsLawSim';
import { MechanicalLeverSim } from '../components/simulations/MechanicalLeverSim';
import { ProbabilitySim } from '../components/simulations/ProbabilitySim';
import { EnergyCalculatorSim } from '../components/simulations/EnergyCalculatorSim';

type SimId = 'ohms-law' | 'lever' | 'probability' | 'energy';

export const InteractiveLab: React.FC = () => {
  const [activeSim, setActiveSim] = useState<SimId>('ohms-law');

  const simTabs = [
    {
      id: 'ohms-law' as SimId,
      name: "Ohm's Law Circuit",
      subject: 'Physics',
      icon: Zap,
      desc: 'Voltage, Resistance & Electron Flow',
    },
    {
      id: 'lever' as SimId,
      name: 'Mechanical Lever',
      subject: 'Engineering',
      icon: Wrench,
      desc: 'Mechanical Advantage & Force Multiplication',
    },
    {
      id: 'probability' as SimId,
      name: 'Probability Dice Lab',
      subject: 'Mathematics',
      icon: Dices,
      desc: 'Monte Carlo Trials & Law of Large Numbers',
    },
    {
      id: 'energy' as SimId,
      name: 'Household Energy Calculator',
      subject: 'Everyday Science',
      icon: Flame,
      desc: 'Kilowatt-Hours & Utility Billing Projection',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Hands-On Virtual Laboratories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
          Interactive Experimentation Lab
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Test theoretical equations through real-time mathematical calculations and dynamic reactive SVG diagrams. Adjust variables to observe immediate outputs.
        </p>
      </div>

      {/* Lab Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {simTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSim === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSim(tab.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-500/10 border-brand-primary shadow-sm ring-1 ring-sky-400'
                  : 'bg-brand-card border-brand-border hover:bg-brand-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-brand-surface text-brand-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                  {tab.subject}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-text">{tab.name}</h3>
                <p className="text-[11px] text-brand-muted mt-0.5 line-clamp-1">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Simulation Container */}
      <div className="animate-in fade-in">
        {activeSim === 'ohms-law' && <OhmsLawSim />}
        {activeSim === 'lever' && <MechanicalLeverSim />}
        {activeSim === 'probability' && <ProbabilitySim />}
        {activeSim === 'energy' && <EnergyCalculatorSim />}
      </div>

      {/* Lab Scientific Standards Notice */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-brand-muted">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-primary shrink-0" />
          <span>All simulation models employ deterministic physics, standard SI units, and verified mathematical equations.</span>
        </div>
        <span className="font-mono text-brand-text font-semibold shrink-0">v2.4 Interactive Engine</span>
      </div>
    </div>
  );
};

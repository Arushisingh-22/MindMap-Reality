import React, { useState } from 'react';
import { RotateCcw, Dices, Play, RefreshCw, BarChart3, Info } from 'lucide-react';

export const ProbabilitySim: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]); // indices 0-5 for faces 1-6
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const totalRolls = counts.reduce((a, b) => a + b, 0);

  const theoreticalProb = 100 / 6; // 16.67%

  const performRolls = (n: number) => {
    setIsRolling(true);
    setTimeout(() => {
      const newCounts = [...counts];
      let finalFace = 1;

      for (let i = 0; i < n; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        newCounts[roll - 1]++;
        finalFace = roll;
      }

      setCounts(newCounts);
      setLastRoll(finalFace);
      setIsRolling(false);
    }, n > 100 ? 100 : 50);
  };

  const handleReset = () => {
    setCounts([0, 0, 0, 0, 0, 0]);
    setLastRoll(null);
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Dices className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-brand-text">Probability & Law of Large Numbers Simulator</h3>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Roll virtual fair 6-sided dice and observe empirical frequencies converge toward the theoretical 16.67% expectation.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-text bg-brand-surface hover:bg-brand-surface-hover rounded-lg transition-colors self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Rolls
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Roll Controls */}
          <div className="bg-brand-surface/60 p-5 rounded-xl border border-brand-border/60">
            <span className="text-sm font-semibold text-brand-text block mb-3">Roll Virtual Dice</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => performRolls(1)}
                disabled={isRolling}
                className="px-3 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-brand-primary-hover active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Roll 1x
              </button>
              <button
                onClick={() => performRolls(10)}
                disabled={isRolling}
                className="px-3 py-2.5 bg-brand-card border border-brand-border text-brand-text text-sm font-semibold rounded-xl hover:bg-brand-surface active:scale-95 transition-all disabled:opacity-50"
              >
                +10x
              </button>
              <button
                onClick={() => performRolls(100)}
                disabled={isRolling}
                className="px-3 py-2.5 bg-brand-card border border-brand-border text-brand-text text-sm font-semibold rounded-xl hover:bg-brand-surface active:scale-95 transition-all disabled:opacity-50"
              >
                +100x
              </button>
              <button
                onClick={() => performRolls(1000)}
                disabled={isRolling}
                className="px-3 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-50"
              >
                +1,000x
              </button>
            </div>

            {/* Total Trials & Last Outcome */}
            <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-muted block">Total Completed Rolls</span>
                <span className="text-2xl font-extrabold text-brand-text font-mono">
                  {totalRolls.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-brand-muted">Last Outcome:</span>
                <div className="w-12 h-12 bg-brand-card border-2 border-purple-500 rounded-xl flex items-center justify-center text-2xl font-black text-purple-600 dark:text-purple-400 shadow-sm">
                  {lastRoll ? lastRoll : '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Theoretical vs Experimental Table */}
          <div className="bg-brand-card border border-brand-border rounded-xl p-4 overflow-x-auto">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2.5">
              Outcome Frequency Table
            </span>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted">
                  <th className="pb-2 font-semibold">Face</th>
                  <th className="pb-2 font-semibold text-right">Count</th>
                  <th className="pb-2 font-semibold text-right">Experimental %</th>
                  <th className="pb-2 font-semibold text-right">Theory %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 font-mono">
                {[1, 2, 3, 4, 5, 6].map((face) => {
                  const count = counts[face - 1];
                  const expProb = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
                  const delta = expProb - theoreticalProb;
                  return (
                    <tr key={face} className="hover:bg-brand-surface/40">
                      <td className="py-2 font-bold text-brand-text">Face {face}</td>
                      <td className="py-2 text-right">{count.toLocaleString()}</td>
                      <td className="py-2 text-right font-bold text-sky-600 dark:text-sky-400">
                        {totalRolls > 0 ? expProb.toFixed(1) + '%' : '0.0%'}
                      </td>
                      <td className="py-2 text-right text-brand-muted">16.7%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Probability Chart Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-brand-surface/30 p-6 rounded-2xl border border-brand-border">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                <h4 className="text-sm font-bold text-brand-text">Experimental Probability Distribution</h4>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-brand-muted">
                  <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block"></span>
                  Experimental %
                </span>
                <span className="flex items-center gap-1.5 text-brand-muted">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-red-500 inline-block"></span>
                  Expected (16.7%)
                </span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="relative w-full h-64 bg-brand-card rounded-xl border border-brand-border p-4 flex flex-col justify-end">
              {/* Theoretical Expected Line at 16.67% (scale max 35%) */}
              <div
                className="absolute left-10 right-4 border-b-2 border-dashed border-red-500/80 z-10 pointer-events-none"
                style={{ bottom: `${(16.67 / 35) * 100}%` }}
              >
                <span className="absolute -top-5 right-0 text-[10px] font-bold text-red-500 bg-brand-card px-1 rounded">
                  Theory: 16.7%
                </span>
              </div>

              {/* Bars */}
              <div className="grid grid-cols-6 gap-3 sm:gap-6 h-48 items-end px-2 sm:px-6">
                {[1, 2, 3, 4, 5, 6].map((face) => {
                  const count = counts[face - 1];
                  const expProb = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
                  // normalize to 35% max scale
                  const barHeightPercent = Math.min((expProb / 35) * 100, 100);

                  return (
                    <div key={face} className="flex flex-col items-center h-full justify-end group">
                      <span className="text-[10px] font-mono font-bold text-brand-muted mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {totalRolls > 0 ? expProb.toFixed(1) + '%' : ''}
                      </span>
                      <div className="w-full bg-brand-surface rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-sky-400 rounded-t-lg transition-all duration-300 min-h-[4px]"
                          style={{ height: `${barHeightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-brand-text mt-2 font-mono">
                        {face}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Law of Large Numbers Note */}
          <div className="mt-4 p-3 bg-brand-surface rounded-xl border border-brand-border/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-text">The Law of Large Numbers:</strong> Notice that after only 5 or 10 rolls, the bars are uneven and erratic. But click <strong className="text-purple-600 dark:text-purple-400">+1,000x</strong> three or four times: as sample size grows into thousands, every single bar flattens out precisely onto the 16.7% red line!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

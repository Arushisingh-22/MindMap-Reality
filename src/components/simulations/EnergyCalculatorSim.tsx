import React, { useState } from 'react';
import { RotateCcw, Flame, Info, DollarSign, Leaf } from 'lucide-react';

interface PresetAppliance {
  name: string;
  watts: number;
  typicalHours: number;
}

const PRESETS: PresetAppliance[] = [
  { name: 'LED Light Bulb', watts: 10, typicalHours: 6 },
  { name: 'Laptop Computer', watts: 65, typicalHours: 8 },
  { name: 'Refrigerator', watts: 180, typicalHours: 24 },
  { name: 'Gaming Desktop PC', watts: 450, typicalHours: 4 },
  { name: 'Microwave Oven', watts: 1000, typicalHours: 0.5 },
  { name: 'Air Conditioner', watts: 1500, typicalHours: 8 },
  { name: 'Space Heater', watts: 2000, typicalHours: 6 },
];

export const EnergyCalculatorSim: React.FC = () => {
  const [watts, setWatts] = useState<number>(1500); // 1 to 5000 W
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // 0.5 to 24 hrs
  const [days, setDays] = useState<number>(30); // 1 to 365 days
  const [tariff, setTariff] = useState<number>(0.16); // $ per kWh

  // Calculations
  const energyKwh = Number(((watts * hoursPerDay * days) / 1000).toFixed(2));
  const estimatedCost = Number((energyKwh * tariff).toFixed(2));
  // Average US grid carbon intensity is ~0.85 lbs CO2 / kWh (~0.385 kg CO2 / kWh)
  const co2Kg = Number((energyKwh * 0.385).toFixed(1));

  const applyPreset = (preset: PresetAppliance) => {
    setWatts(preset.watts);
    setHoursPerDay(preset.typicalHours);
  };

  const handleReset = () => {
    setWatts(1500);
    setHoursPerDay(8);
    setDays(30);
    setTariff(0.16);
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <Flame className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-brand-text">Household Energy & Electricity Cost Calculator</h3>
          </div>
          <p className="text-sm text-brand-muted mt-1">
            Calculate appliance kilowatt-hour (kWh) electricity draw, utility billing costs, and carbon footprint.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-muted hover:text-brand-text bg-brand-surface hover:bg-brand-surface-hover rounded-lg transition-colors self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Values
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preset Buttons */}
          <div>
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2">
              Common Household Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                    watts === p.watts
                      ? 'bg-teal-500 text-white border-teal-500 font-semibold'
                      : 'bg-brand-surface text-brand-muted border-brand-border hover:text-brand-text'
                  }`}
                >
                  {p.name} ({p.watts}W)
                </button>
              ))}
            </div>
          </div>

          {/* Watts Input */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="power-input" className="text-sm font-semibold text-brand-text">Appliance Power Rating</label>
              <div className="flex items-center gap-1">
                <input
                  id="power-input"
                  type="number"
                  min={1}
                  max={6000}
                  step={10}
                  value={watts}
                  onChange={(e) => setWatts(Math.max(1, Math.min(6000, Number(e.target.value) || 1)))}
                  className="w-20 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">Watts (W)</span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={3000}
              step={10}
              value={watts}
              onChange={(e) => setWatts(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
          </div>

          {/* Hours per Day Input */}
          <div className="bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="hours-input" className="text-sm font-semibold text-brand-text">Daily Usage Duration</label>
              <div className="flex items-center gap-1">
                <input
                  id="hours-input"
                  type="number"
                  min={0.5}
                  max={24}
                  step={0.5}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Math.max(0.5, Math.min(24, Number(e.target.value) || 0.5)))}
                  className="w-16 px-2 py-1 text-right text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">hrs/day</span>
              </div>
            </div>
            <input
              type="range"
              min={0.5}
              max={24}
              step={0.5}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-brand-border rounded-lg"
            />
          </div>

          {/* Duration in Days & Electricity Tariff */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-surface/60 p-3.5 rounded-xl border border-brand-border/60">
              <label htmlFor="days-input" className="text-xs font-semibold text-brand-text block mb-1.5">Calculation Period</label>
              <div className="flex items-center gap-1">
                <input
                  id="days-input"
                  type="number"
                  min={1}
                  max={365}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Math.min(365, Number(e.target.value) || 1)))}
                  className="w-full px-2 py-1 text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text"
                />
                <span className="text-xs text-brand-muted">days</span>
              </div>
            </div>

            <div className="bg-brand-surface/60 p-3.5 rounded-xl border border-brand-border/60">
              <label htmlFor="tariff-input" className="text-xs font-semibold text-brand-text block mb-1.5">Utility Tariff ($/kWh)</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-brand-muted font-bold">$</span>
                <input
                  id="tariff-input"
                  type="number"
                  min={0.01}
                  max={1.0}
                  step={0.01}
                  value={tariff}
                  onChange={(e) => setTariff(Math.max(0.01, Math.min(1.0, Number(e.target.value) || 0.01)))}
                  className="w-full px-2 py-1 text-sm font-bold bg-brand-card border border-brand-border rounded-lg text-brand-text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Output Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-brand-surface/30 p-6 rounded-2xl border border-brand-border">
          <div className="space-y-4">
            <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wide block">
                Total Energy Consumed
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-black text-teal-600 dark:text-teal-400 font-mono">
                  {energyKwh.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-teal-800 dark:text-teal-300">Kilowatt-hours (kWh)</span>
              </div>
              <p className="text-xs text-brand-muted mt-2 font-mono">
                Formula: ({watts}W × {hoursPerDay}h × {days} days) / 1,000 = {energyKwh} kWh
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-card border border-brand-border p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-brand-muted mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-brand-text">Estimated Billing Cost</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    ${estimatedCost.toFixed(2)}
                  </span>
                </div>
                <span className="text-[11px] text-brand-muted block mt-1">
                  Based on ${tariff}/kWh over {days} days (estimate)
                </span>
              </div>

              <div className="bg-brand-card border border-brand-border p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-brand-muted mb-1">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-brand-text">Carbon Emissions</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-brand-text font-mono">
                    {co2Kg.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-brand-muted">kg CO₂</span>
                </div>
                <span className="text-[11px] text-brand-muted block mt-1">
                  Equivalent to driving {(co2Kg * 2.5).toFixed(0)} miles in a petrol car
                </span>
              </div>
            </div>
          </div>

          {/* Educational Formula Explanation */}
          <div className="mt-4 p-3 bg-brand-surface rounded-xl border border-brand-border/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-text">Why it matters:</strong> Power utilities do not bill for instantaneous watts, but for energy integrated over time (kilowatt-hours). Running a 2,000W electric space heater for 6 hours daily consumes 360 kWh per month, which at $0.16/kWh adds over $57 to your monthly electric bill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

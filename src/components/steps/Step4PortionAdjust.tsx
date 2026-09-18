import React, { useState } from 'react';
import { Sliders, CheckCircle2, RotateCcw } from 'lucide-react';
import { MealIntakeMath } from '../../types';

interface Step4PortionAdjustProps {
  mealMath: MealIntakeMath;
  onUpdateMealMath: (updated: Partial<MealIntakeMath>) => void;
  onNextStep: () => void;
}

export const Step4PortionAdjust: React.FC<Step4PortionAdjustProps> = ({
  mealMath,
  onUpdateMealMath,
  onNextStep,
}) => {
  const [portionGrams, setPortionGrams] = useState(mealMath.consumedWeightG);
  const [confirmed, setConfirmed] = useState(false);

  // Compute scaled macros proportionally from base 250g
  const scale = portionGrams / 250;
  const scaledCalories = Math.round(380 * scale);
  const scaledCarbs = Math.round(65 * scale);
  const scaledProtein = +(9 * scale).toFixed(1);
  const scaledFat = +(7 * scale).toFixed(1);
  const scaledSodium = Math.round(420 * scale);

  const handleApplyPreset = (grams: number) => {
    setPortionGrams(grams);
    setConfirmed(false);
  };

  const handleConfirmAdjustment = () => {
    onUpdateMealMath({
      consumedWeightG: portionGrams,
      consumedUnits: `${(portionGrams / 100).toFixed(1)} dosas (${portionGrams}g)`,
      calories: scaledCalories,
      carbsG: scaledCarbs,
      proteinG: scaledProtein,
      fatG: scaledFat,
      sodiumMg: scaledSodium,
    });
    setConfirmed(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">Portion Adjustment</h2>
              <p className="text-xs text-slate-500 font-medium">Step 4 of 8 · Human-in-the-Loop Portion Override</p>
            </div>
          </div>
          <button
            onClick={() => handleApplyPreset(250)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            title="Reset to AI Vision Detection (250g)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>AI Reset (250g)</span>
          </button>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Left Column: Quick Presets & Custom Grams Slider */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-4">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-800 block mb-2.5">
              One-Tap Quick Presets:
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Small */}
              <button
                type="button"
                onClick={() => handleApplyPreset(200)}
                className={`p-3 rounded-xl border text-center transition ${
                  portionGrams === 200
                    ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className="block text-xs sm:text-sm font-black">Small</span>
                <span className="text-[11px] opacity-85 font-medium">200g (2 units)</span>
              </button>

              {/* Medium (AI Detected) */}
              <button
                type="button"
                onClick={() => handleApplyPreset(250)}
                className={`p-3 rounded-xl border text-center transition relative ${
                  portionGrams === 250
                    ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-lime-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  AI Match
                </span>
                <span className="block text-xs sm:text-sm font-black">Medium</span>
                <span className="text-[11px] opacity-85 font-medium">250g (2.5 units)</span>
              </button>

              {/* Large */}
              <button
                type="button"
                onClick={() => handleApplyPreset(300)}
                className={`p-3 rounded-xl border text-center transition ${
                  portionGrams === 300
                    ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className="block text-xs sm:text-sm font-black">Large</span>
                <span className="text-[11px] opacity-85 font-medium">300g (Full)</span>
              </button>
            </div>
          </div>

          {/* Custom Grams Slider */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800">
                Fine-Tune Custom Grams:
              </label>
              <span className="text-base font-black text-lime-900 bg-lime-100 px-3 py-0.5 rounded-lg border border-lime-200 font-mono">
                {portionGrams}g
              </span>
            </div>

            <input
              type="range"
              min="100"
              max="450"
              step="10"
              value={portionGrams}
              onChange={(e) => {
                setPortionGrams(Number(e.target.value));
                setConfirmed(false);
              }}
              className="w-full accent-lime-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1.5">
              <span>100g (1 Dosa)</span>
              <span className="text-lime-800 font-bold">250g (AI Intake)</span>
              <span>450g (Full Feast)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Recalculated Macros & Confirmation */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
            <span>Live Recalculated Macros:</span>
            <span className="text-lime-800 bg-lime-50 px-2 py-0.5 rounded-md font-mono text-xs border border-lime-200">
              Scaled ×{scale.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 min-[420px]:grid-cols-4 gap-2.5 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Calories</span>
              <span className="text-lg font-black text-slate-800">{scaledCalories}</span>
              <span className="text-[10px] text-slate-400 block font-medium">kcal</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Carbs</span>
              <span className="text-lg font-black text-slate-800">{scaledCarbs}g</span>
              <span className="text-[10px] text-slate-400 block font-medium">dosa base</span>
            </div>
            <div className="bg-lime-50/80 p-3 rounded-xl border border-lime-200">
              <span className="text-[10px] uppercase font-bold text-lime-800 block">Protein</span>
              <span className="text-lg font-black text-lime-950">{scaledProtein}g</span>
              <span className="text-[10px] text-lime-700 block font-medium">intake</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Fat</span>
              <span className="text-lg font-black text-slate-800">{scaledFat}g</span>
              <span className="text-[10px] text-slate-400 block font-medium">oil/ghee</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirmAdjustment}
            className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              confirmed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            <span>{confirmed ? 'Portion Confirmed & Locked' : 'Confirm Portion Adjustment'}</span>
          </button>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={() => {
          if (!confirmed) handleConfirmAdjustment();
          onNextStep();
        }}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 5: Real-Time Nutrient Gap Analysis</span>
        <span>→</span>
      </button>
    </div>
  );
};

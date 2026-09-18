import React, { useState } from 'react';
import { Sliders, CheckCircle2, RotateCcw, Sparkles, Flame, Wheat, Drumstick } from 'lucide-react';
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

  const handleApplyPreset = (grams: number, label: string) => {
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
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Portion Adjustment</h2>
              <p className="text-xs text-slate-500">Step 4 of 8 · Human-in-the-Loop Override</p>
            </div>
          </div>
          <button
            onClick={() => handleApplyPreset(250, '2.5 dosas')}
            className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
            title="Reset to AI Vision Detection (250g)"
          >
            <RotateCcw className="w-3 h-3" />
            <span>AI Reset</span>
          </button>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 4: Keeps human-in-the-loop for quick portion adjustments."
        </div>
      </div>

      {/* Interactive Quick-Adjust Card / Modal Frame */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-4">
        {/* Presets Row */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">
            One-Tap Quick Presets:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Small */}
            <button
              type="button"
              onClick={() => handleApplyPreset(200, '2 dosas')}
              className={`p-2.5 rounded-xl border text-center transition ${
                portionGrams === 200
                  ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className="block text-xs font-bold">Small</span>
              <span className="text-[11px] opacity-80 font-medium">200g (2 units)</span>
            </button>

            {/* Medium (AI Detected) */}
            <button
              type="button"
              onClick={() => handleApplyPreset(250, '2.5 dosas')}
              className={`p-2.5 rounded-xl border text-center transition relative ${
                portionGrams === 250
                  ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-lime-700 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                AI Match
              </span>
              <span className="block text-xs font-bold">Medium</span>
              <span className="text-[11px] opacity-80 font-medium">250g (2.5 units)</span>
            </button>

            {/* Large */}
            <button
              type="button"
              onClick={() => handleApplyPreset(300, '3 dosas')}
              className={`p-2.5 rounded-xl border text-center transition ${
                portionGrams === 300
                  ? 'bg-lime-500 border-lime-600 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className="block text-xs font-bold">Large</span>
              <span className="text-[11px] opacity-80 font-medium">300g (Full plate)</span>
            </button>
          </div>
        </div>

        {/* Custom Grams Slider */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>Fine-Tune Custom Grams:</span>
            </label>
            <span className="text-sm font-extrabold text-lime-800 bg-lime-100/80 px-2 py-0.5 rounded-md border border-lime-200 font-mono">
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
            className="w-full accent-lime-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-600 font-medium mt-1">
            <span>100g (1 Dosa)</span>
            <span>250g (AI Estimated Intake)</span>
            <span>450g (Heavy)</span>
          </div>
        </div>

        {/* Live Scaled Nutrition Preview */}
        <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Live Recalculated Macros:</span>
            <span className="text-slate-700 font-mono text-[11px]">Scaled ×{scale.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-600 block">Calories</span>
              <span className="text-xs font-bold text-slate-800">{scaledCalories}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-600 block">Carbs</span>
              <span className="text-xs font-bold text-slate-800">{scaledCarbs}g</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-lime-200 bg-lime-50/50">
              <span className="text-[10px] text-lime-800 font-semibold block">Protein</span>
              <span className="text-xs font-extrabold text-lime-900">{scaledProtein}g</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-600 block">Fat</span>
              <span className="text-xs font-bold text-slate-800">{scaledFat}g</span>
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <button
          type="button"
          onClick={handleConfirmAdjustment}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
            confirmed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-lime-400" />
          <span>{confirmed ? 'Portion Confirmed & Locked' : 'Confirm Portion Adjustment'}</span>
        </button>
      </div>

      {/* Action to proceed */}
      <button
        onClick={() => {
          if (!confirmed) handleConfirmAdjustment();
          onNextStep();
        }}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 5: Real-Time Nutrient Gap Analysis</span>
        <span>→</span>
      </button>
    </div>
  );
};

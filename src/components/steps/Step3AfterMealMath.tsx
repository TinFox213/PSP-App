import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, AlertCircle, Scale, Sparkles } from 'lucide-react';
import { PlateVisualizer } from '../PlateVisualizer';
import { FoodDetection, MealIntakeMath } from '../../types';

interface Step3AfterMealMathProps {
  beforeDetections: FoodDetection[];
  afterDetections: FoodDetection[];
  mealMath: MealIntakeMath;
  onNextStep: () => void;
}

export const Step3AfterMealMath: React.FC<Step3AfterMealMathProps> = ({
  beforeDetections,
  afterDetections,
  mealMath,
  onNextStep,
}) => {
  const [activeView, setActiveView] = useState<'after' | 'before'>('after');

  // Calorie difference if we counted served vs actual
  const servedCalories = Math.round(mealMath.calories * (mealMath.servedWeightG / mealMath.consumedWeightG));
  const calorieSavedOvercount = servedCalories - mealMath.calories;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">After-Meal Capture & Math</h2>
              <p className="text-xs text-slate-500">Step 3 of 8 · Core Innovation</p>
            </div>
          </div>
          {/* View Toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setActiveView('after')}
              className={`px-2 py-1 rounded-md transition ${
                activeView === 'after'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              After (Leftover)
            </button>
            <button
              onClick={() => setActiveView('before')}
              className={`px-2 py-1 rounded-md transition ${
                activeView === 'before'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Before Plate
            </button>
          </div>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 3: Core Innovation — Logs actual intake (Served − Leftover) rather than what was merely served."
        </div>
      </div>

      {/* Visual Leftover Plate */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            {activeView === 'after'
              ? 'Leftover Plate: 0.5 Dosa remaining + Residual Sambar'
              : 'Original Served Plate: 3 Dosas + Sambar'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
            {activeView === 'after' ? 'Delta Computed' : 'Reference Base'}
          </span>
        </div>

        <PlateVisualizer
          mode={activeView}
          detections={activeView === 'after' ? afterDetections : beforeDetections}
        />
      </div>

      {/* Automated Calculation Box (Explicitly required by prompt) */}
      <div className="bg-gradient-to-br from-lime-50 to-white rounded-2xl p-4 border-2 border-lime-400 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-lime-900 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-lime-700" />
            Automated Intake Calculation Box
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-500 text-slate-950">
            Served − Leftover
          </span>
        </div>

        {/* 3 Step Formula Line (Responsive Flex) */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 text-center py-2">
          {/* Served */}
          <div className="flex-1 min-w-0 bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500 block truncate">Served</span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">{mealMath.servedWeightG}g</span>
            <span className="text-[9px] sm:text-[10px] text-slate-600 font-medium truncate block">{mealMath.servedUnits}</span>
          </div>

          <span className="text-slate-400 font-bold text-sm sm:text-base shrink-0 px-0.5">−</span>

          {/* Minus Leftover */}
          <div className="flex-1 min-w-0 bg-rose-50 p-2 sm:p-2.5 rounded-xl border border-rose-200 shadow-xs">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase text-rose-700 block truncate">Leftover</span>
            <span className="text-xs sm:text-sm font-extrabold text-rose-800 block">{mealMath.leftoverWeightG}g</span>
            <span className="text-[9px] sm:text-[10px] text-rose-600 font-medium truncate block">{mealMath.leftoverUnits}</span>
          </div>

          <span className="text-slate-900 font-bold text-sm sm:text-base shrink-0 px-0.5">=</span>

          {/* Equals Actual Intake */}
          <div className="flex-1 min-w-0 bg-lime-500 p-2 sm:p-2.5 rounded-xl shadow-xs text-slate-950">
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-slate-950 block truncate">Actual Intake</span>
            <span className="text-xs sm:text-sm font-black text-slate-950 block">{mealMath.consumedWeightG}g</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-900 truncate block">{mealMath.consumedUnits}</span>
          </div>
        </div>

        {/* Why this matters callout */}
        <div className="bg-white rounded-xl p-3 border border-lime-200 text-xs text-slate-700 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Traditional App Count (Served):</span>
            <span className="font-semibold line-through text-slate-400">{servedCalories} kcal</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-lime-900">AuraFix Precise Log (Actual Intake):</span>
            <span className="font-extrabold text-lime-700 text-sm">{mealMath.calories} kcal</span>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-emerald-700 border-t border-slate-100">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>Avoided <strong>+{calorieSavedOvercount} kcal overcounting error</strong> from unconsumed leftovers!</span>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 4: Portion Adjustment & Confirmation</span>
        <span>→</span>
      </button>
    </div>
  );
};

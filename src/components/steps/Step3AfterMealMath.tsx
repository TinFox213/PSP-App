import React, { useState } from 'react';
import { Calculator, Check, Scale, Sparkles } from 'lucide-react';
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
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">After-Meal Capture & Math</h2>
              <p className="text-xs text-slate-500 font-medium">Step 3 of 8 · Differential Intake Engine</p>
            </div>
          </div>
          {/* View Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold shadow-2xs">
            <button
              onClick={() => setActiveView('after')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeView === 'after'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              After (Leftover)
            </button>
            <button
              onClick={() => setActiveView('before')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeView === 'before'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Before Plate
            </button>
          </div>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Visual Leftover Plate */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lime-600" />
              {activeView === 'after'
                ? 'Leftover Plate: 0.5 Dosa remaining + Residual Sambar'
                : 'Original Served Plate: 3 Dosas + Sambar'}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              {activeView === 'after' ? 'Delta Computed' : 'Reference Base'}
            </span>
          </div>

          <PlateVisualizer
            mode={activeView}
            detections={activeView === 'after' ? afterDetections : beforeDetections}
          />
        </div>

        {/* Right Column (5 cols): Automated Calculation Box */}
        <div className="md:col-span-5 bg-gradient-to-br from-lime-50/70 to-white rounded-2xl p-4 sm:p-5 border-2 border-lime-400 shadow-md space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-lime-950 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-lime-700" />
              Automated Intake Calculation Box
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-lime-500 text-slate-950">
              Served − Leftover
            </span>
          </div>

          {/* 3 Step Formula Line */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 text-center py-1">
            {/* Served */}
            <div className="flex-1 min-w-0 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block truncate">Served</span>
              <span className="text-sm sm:text-base font-black text-slate-800 block">{mealMath.servedWeightG}g</span>
              <span className="text-[10px] text-slate-600 font-medium truncate block">{mealMath.servedUnits}</span>
            </div>

            <span className="text-slate-400 font-black text-lg shrink-0 px-0.5">−</span>

            {/* Minus Leftover */}
            <div className="flex-1 min-w-0 bg-rose-50 p-2.5 rounded-xl border border-rose-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-rose-700 block truncate">Leftover</span>
              <span className="text-sm sm:text-base font-black text-rose-800 block">{mealMath.leftoverWeightG}g</span>
              <span className="text-[10px] text-rose-600 font-medium truncate block">{mealMath.leftoverUnits}</span>
            </div>

            <span className="text-slate-900 font-black text-lg shrink-0 px-0.5">=</span>

            {/* Equals Actual Intake */}
            <div className="flex-1 min-w-0 bg-lime-500 p-2.5 rounded-xl shadow-2xs text-slate-950">
              <span className="text-[10px] font-black uppercase text-slate-950 block truncate">Actual Intake</span>
              <span className="text-sm sm:text-base font-black text-slate-950 block">{mealMath.consumedWeightG}g</span>
              <span className="text-[10px] font-bold text-slate-900 truncate block">{mealMath.consumedUnits}</span>
            </div>
          </div>

          {/* Why this matters callout */}
          <div className="bg-white rounded-xl p-3.5 border border-lime-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Traditional App Count (Served):</span>
              <span className="font-bold line-through text-slate-400">{servedCalories} kcal</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="font-black text-lime-900">AuraFix Precise Log (Actual Intake):</span>
              <span className="font-black text-lime-700 text-sm">{mealMath.calories} kcal</span>
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-emerald-800 border-t border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Avoided <strong>+{calorieSavedOvercount} kcal overcounting error</strong> from unconsumed leftovers!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 4: Portion Adjustment & Confirmation</span>
        <span>→</span>
      </button>
    </div>
  );
};

import React from 'react';
import { AlertTriangle, TrendingDown, ShieldAlert, Sparkles, PieChart, Activity, Zap } from 'lucide-react';
import { MealIntakeMath, UserProfile } from '../../types';

interface Step5NutrientGapProps {
  mealMath: MealIntakeMath;
  profile: UserProfile;
  totalProteinConsumedToday: number; // e.g. 55g
  onNextStep: () => void;
}

export const Step5NutrientGap: React.FC<Step5NutrientGapProps> = ({
  mealMath,
  profile,
  totalProteinConsumedToday = 55,
  onNextStep,
}) => {
  const proteinTarget = profile.targetProteinG || 80;
  const deficitProtein = Math.max(0, proteinTarget - totalProteinConsumedToday);
  const percentAchieved = Math.min(Math.round((totalProteinConsumedToday / proteinTarget) * 100), 100);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Real-Time Nutrient Gap Analysis</h2>
              <p className="text-xs text-slate-500">Step 5 of 8 · Macro & Micro Deficit Radar</p>
            </div>
          </div>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 5: Instantly calculates daily nutrient gaps to prevent deficiencies."
        </div>
      </div>

      {/* Nutritional Breakdown for the Meal (Required by prompt) */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-lime-600" />
            Meal Nutritional Breakdown (250g Dosa Meal)
          </span>
          <span className="text-[11px] font-semibold text-slate-500">Verified Intake</span>
        </div>

        {/* Macro Badges Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Calories</span>
            <span className="text-base font-extrabold text-slate-800">{mealMath.calories}</span>
            <span className="text-[10px] text-slate-400 font-medium">kcal</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Carbs</span>
            <span className="text-base font-extrabold text-slate-800">{mealMath.carbsG}g</span>
            <span className="text-[10px] text-slate-400 font-medium">high-carb</span>
          </div>

          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Protein</span>
            <span className="text-base font-extrabold text-amber-900">{mealMath.proteinG}g</span>
            <span className="text-[10px] text-amber-600 font-medium">low protein</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fat</span>
            <span className="text-base font-extrabold text-slate-800">{mealMath.fatG}g</span>
            <span className="text-[10px] text-slate-400 font-medium">moderate</span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Sodium</span>
            <span className="text-base font-extrabold text-slate-800">{mealMath.sodiumMg}</span>
            <span className="text-[10px] text-emerald-600 font-semibold font-mono">mg (Normal)</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
          <span>Dietary Fiber: <strong>{mealMath.fiberG}g</strong></span>
          <span className="text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Carb-Heavy Traditional Ratio
          </span>
        </div>
      </div>

      {/* Prominent Gap Alert Card (Explicitly required by prompt) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl p-4 border-2 border-amber-300 shadow-md space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                Nutrient Deficit Alert
              </span>
              <span className="text-xs font-bold text-slate-700">Protein Gap Flagged</span>
            </div>
            {/* Exact Gap Alert Quote Required by Prompt */}
            <p className="mt-1 text-sm font-extrabold text-amber-950">
              "Daily Protein: {totalProteinConsumedToday}g / {proteinTarget}g consumed. Deficit: {deficitProtein}g remaining today."
            </p>
          </div>
        </div>

        {/* Visual Progress Bar with Gap Marker */}
        <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">
              Achieved: <strong className="text-lime-800">{totalProteinConsumedToday}g</strong> ({percentAchieved}%)
            </span>
            <span className="text-rose-700 font-bold">
              Deficit: {deficitProtein}g Needed
            </span>
          </div>

          {/* Bar */}
          <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            {/* Achieved Portion */}
            <div
              className="h-full bg-lime-500 transition-all duration-700"
              style={{ width: `${percentAchieved}%` }}
            />
            {/* Deficit / Gap Portion */}
            <div
              className="h-full bg-rose-400 animate-pulse transition-all duration-700"
              style={{ width: `${100 - percentAchieved}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0g (Start)</span>
            <span className="font-semibold text-slate-700">{totalProteinConsumedToday}g Logged</span>
            <span className="font-bold text-slate-900">{proteinTarget}g Daily Target</span>
          </div>
        </div>

        {/* Clinical Note for Diabetic/Fitness Goal */}
        <div className="text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-tight">
            High carbohydrate-to-protein ratio in dosas can cause reactive glucose spikes. AuraFix recommends adding a protein-dense regional snack before dinner.
          </p>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 6: Regional Recommendations</span>
        <span>→</span>
      </button>
    </div>
  );
};

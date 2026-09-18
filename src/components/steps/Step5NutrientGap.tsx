import React from 'react';
import { AlertTriangle, ShieldAlert, PieChart, Activity } from 'lucide-react';
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
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
            <PieChart className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-lg font-black text-slate-800 truncate">Real-Time Nutrient Gap Analysis</h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Step 5 of 8 · Macro Deficit Radar</p>
          </div>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop (lg+) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Column: Meal Nutritional Breakdown */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-lime-600" />
              Meal Intake Breakdown (250g Dosa Meal)
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Verified Intake
            </span>
          </div>

          {/* Macro Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 text-center">
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Calories</span>
              <span className="text-base sm:text-lg font-black text-slate-800">{mealMath.calories}</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">kcal</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Carbs</span>
              <span className="text-base sm:text-lg font-black text-slate-800">{mealMath.carbsG}g</span>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-medium">high-carb</span>
            </div>

            <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Protein</span>
              <span className="text-base sm:text-lg font-black text-amber-950">{mealMath.proteinG}g</span>
              <span className="text-[9px] sm:text-[10px] text-amber-700 font-medium">low ratio</span>
            </div>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fat</span>
              <span className="text-base sm:text-lg font-black text-slate-800">{mealMath.fatG}g</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">moderate</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>
              <span className="text-slate-500 block text-[11px]">Sodium Level:</span>
              <span className="font-bold text-slate-800">{mealMath.sodiumMg} mg (Safe Threshold)</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">Dietary Fiber:</span>
              <span className="font-bold text-slate-800">{mealMath.fiberG} g</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-tight">
            Traditional dosa meals provide abundant carbohydrates but fall short of the required 25g+ protein per main meal threshold.
          </div>
        </div>

        {/* Right Column: Prominent Gap Alert Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950">
                  Nutrient Deficit Alert
                </span>
                <span className="text-xs font-bold text-slate-700">Urgent Protein Gap</span>
              </div>
              <p className="mt-1.5 text-sm sm:text-base font-black text-amber-950 leading-snug">
                "Daily Protein: {totalProteinConsumedToday}g / {proteinTarget}g consumed. Deficit: {deficitProtein}g remaining today."
              </p>
            </div>
          </div>

          {/* Visual Progress Bar with Gap Marker */}
          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2.5">
            <div className="flex justify-between text-xs sm:text-sm font-bold">
              <span className="text-slate-700">
                Achieved: <strong className="text-lime-800">{totalProteinConsumedToday}g</strong> ({percentAchieved}%)
              </span>
              <span className="text-rose-700 font-black">
                Deficit: {deficitProtein}g Needed
              </span>
            </div>

            {/* Bar */}
            <div className="relative h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-lime-500 transition-all duration-700"
                style={{ width: `${percentAchieved}%` }}
              />
              <div
                className="h-full bg-rose-400 animate-pulse transition-all duration-700"
                style={{ width: `${100 - percentAchieved}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>0g (Start)</span>
              <span className="font-bold text-slate-700">{totalProteinConsumedToday}g Logged</span>
              <span className="font-black text-slate-900">{proteinTarget}g Target</span>
            </div>
          </div>

          {/* Clinical Note for Diabetic/Fitness Goal */}
          <div className="text-xs text-amber-950 bg-amber-100/70 p-3 rounded-xl border border-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              High carbohydrate-to-protein ratio in dosas can cause reactive glucose spikes. AuraFix recommends adding a protein-dense regional snack before dinner.
            </p>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 6: Regional Recommendations</span>
        <span>→</span>
      </button>
    </div>
  );
};

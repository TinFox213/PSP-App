import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  TrendingUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RadialProgress } from '../RadialProgress';
import { UserProfile, LoggedMealItem } from '../../types';

interface Step8DashboardProps {
  profile: UserProfile;
  loggedMeals: LoggedMealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  onRestartWalkthrough: () => void;
}

export const Step8Dashboard: React.FC<Step8DashboardProps> = ({
  profile,
  loggedMeals,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  onRestartWalkthrough,
}) => {
  // Weekly trend dummy data (Mon to Sun)
  const weeklyTrend = [
    { day: 'Mon', cal: 2050, protein: 78, score: 94 },
    { day: 'Tue', cal: 2180, protein: 82, score: 96 },
    { day: 'Wed', cal: 1980, protein: 74, score: 88 },
    { day: 'Thu', cal: 2200, protein: 85, score: 98 },
    { day: 'Fri', cal: 2110, protein: 79, score: 92 },
    { day: 'Sat', cal: 2300, protein: 81, score: 90 },
    { day: 'Sun', cal: totalCalories, protein: totalProtein, score: 95 }, // Today
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-lg font-black text-slate-800 truncate">Daily Health Dashboard</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Step 8 of 8 · Longitudinal Radars</p>
            </div>
          </div>
          <button
            onClick={onRestartWalkthrough}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition shadow-2xs shrink-0 whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 text-lime-700" />
            <span>Restart Tour</span>
          </button>
        </div>
      </div>

      {/* Radial Progress Bars for Calories, Protein, Carbs, Fats */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-600" />
            Daily Macro Fulfillment Gauges
          </span>
          <span className="text-[11px] font-bold text-lime-800 bg-lime-100 px-2.5 py-0.5 rounded-md">
            Verified Today
          </span>
        </div>

        <div className="grid grid-cols-2 min-[420px]:grid-cols-4 gap-4 pt-1">
          {/* Calories */}
          <RadialProgress
            value={totalCalories}
            max={profile.targetCalories}
            label="Calories"
            unit="kcal"
            color="#84cc16"
            bgColor="#f1f5f9"
            sublabel={`/ ${profile.targetCalories}`}
          />

          {/* Protein */}
          <RadialProgress
            value={totalProtein}
            max={profile.targetProteinG}
            label="Protein"
            unit="g"
            color="#16a34a"
            bgColor="#f1f5f9"
            sublabel={`/ ${profile.targetProteinG}g`}
          />

          {/* Carbs */}
          <RadialProgress
            value={totalCarbs}
            max={profile.targetCarbsG}
            label="Carbs"
            unit="g"
            color="#0284c7"
            bgColor="#f1f5f9"
            sublabel={`/ ${profile.targetCarbsG}g`}
          />

          {/* Fats */}
          <RadialProgress
            value={totalFat}
            max={profile.targetFatG}
            label="Fat"
            unit="g"
            color="#f59e0b"
            bgColor="#f1f5f9"
            sublabel={`/ ${profile.targetFatG}g`}
          />
        </div>
      </div>

      {/* Preventive Health Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-lime-50 to-emerald-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-950">
              Preventive Health Status
            </span>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 shadow-2xs">
            Diabetic Safe
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
          <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Sodium</span>
            <span className="text-sm font-black text-emerald-800 block mt-0.5">Normal</span>
            <span className="text-[10px] text-slate-400 font-medium">1,420 / 2,000mg</span>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Sugar</span>
            <span className="text-sm font-black text-emerald-800 block mt-0.5">Controlled</span>
            <span className="text-[10px] text-slate-400 font-medium">24g / 40g Limit</span>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Fiber</span>
            <span className="text-sm font-black text-emerald-800 block mt-0.5">Good</span>
            <span className="text-[10px] text-slate-400 font-medium">28g / 30g Goal</span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid on Desktop (lg+): 7-Day Trend + Today's Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Weekly Intake Consistency Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-lime-600" />
              7-Day Protein & Consistency Trend
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              94% Adherence
            </span>
          </div>

          {/* Bar Sparkline */}
          <div className="grid grid-cols-7 gap-2 items-end h-32 pt-3">
            {weeklyTrend.map((d, idx) => {
              const heightPercent = Math.min(Math.round((d.protein / 90) * 100), 100);
              const isToday = idx === 6;

              return (
                <div key={d.day} className="flex flex-col items-center h-full justify-end">
                  <span className="text-[10px] font-black text-slate-700 mb-1">
                    {d.protein}g
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-20 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-lime-500 shadow-xs' : 'bg-lime-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-[11px] mt-1 font-bold ${isToday ? 'text-lime-800' : 'text-slate-500'}`}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logged Meals List for Today */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-lime-600" />
              Today's Verified Meals ({loggedMeals.length})
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Actual Intake</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {loggedMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-lime-50/40 transition"
              >
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{meal.name}</h4>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      meal.source === 'camera_intake'
                        ? 'bg-lime-100 text-lime-800'
                        : meal.source === 'voice'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {meal.source === 'camera_intake' ? 'Vision AI' : meal.source === 'voice' ? 'Voice' : 'Snack'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">{meal.time} · {meal.portion}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-black text-slate-900 block">
                    {meal.calories} kcal
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    +{meal.proteinG}g Protein
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      <div className="bg-gradient-to-r from-lime-500 to-emerald-600 rounded-2xl p-4 sm:p-5 text-slate-950 shadow-md flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-base text-slate-950">Walkthrough Completed!</h3>
          <p className="text-xs sm:text-sm text-slate-900/90 mt-0.5 font-medium">
            You have explored all 8 innovations of AuraFix Nutrition PWA.
          </p>
        </div>
        <button
          onClick={onRestartWalkthrough}
          className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs sm:text-sm font-black shrink-0 transition shadow-sm"
        >
          Restart Tour
        </button>
      </div>
    </div>
  );
};

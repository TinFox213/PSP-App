import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  CheckCircle,
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
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Daily Health Dashboard</h2>
              <p className="text-xs text-slate-500">Step 8 of 8 · Preventive Health & Radars</p>
            </div>
          </div>
          <button
            onClick={onRestartWalkthrough}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-lime-700" />
            <span>Restart Tour</span>
          </button>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 8: Consolidated daily and weekly health trends."
        </div>
      </div>

      {/* Radial Progress Bars for Calories, Protein, Carbs, Fats (Required by prompt) */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            Daily Macro Fulfillment Gauges
          </span>
          <span className="text-[11px] font-semibold text-lime-700">Live Intake</span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
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

      {/* Preventive Health Status Banner (Strictly required by prompt) */}
      <div className="bg-gradient-to-r from-emerald-50 via-lime-50 to-emerald-50 rounded-2xl p-4 border-2 border-emerald-300 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
              Preventive Health Status
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
            Diabetic Safe
          </span>
        </div>

        {/* Prompt requirement: "Sodium: Normal | Sugar: Controlled | Fiber: Good" */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-slate-500 font-bold block">Sodium</span>
            <span className="text-xs font-black text-emerald-700 block mt-0.5">Normal</span>
            <span className="text-[10px] text-slate-400">1,420 / 2,000mg</span>
          </div>

          <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-slate-500 font-bold block">Sugar</span>
            <span className="text-xs font-black text-emerald-700 block mt-0.5">Controlled</span>
            <span className="text-[10px] text-slate-400">24g / 40g Limit</span>
          </div>

          <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-slate-500 font-bold block">Fiber</span>
            <span className="text-xs font-black text-emerald-700 block mt-0.5">Good</span>
            <span className="text-[10px] text-slate-400">28g / 30g Goal</span>
          </div>
        </div>
      </div>

      {/* Weekly Intake Consistency Chart */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-lime-600" />
            7-Day Protein & Consistency Trend
          </span>
          <span className="text-[11px] font-semibold text-emerald-700">94% Adherence</span>
        </div>

        {/* Bar Sparkline */}
        <div className="grid grid-cols-7 gap-1.5 items-end h-24 pt-2">
          {weeklyTrend.map((d, idx) => {
            const heightPercent = Math.min(Math.round((d.protein / 90) * 100), 100);
            const isToday = idx === 6;

            return (
              <div key={d.day} className="flex flex-col items-center h-full justify-end">
                <span className="text-[9px] font-bold text-slate-600 mb-1">
                  {d.protein}g
                </span>
                <div className="w-full bg-slate-100 rounded-t-lg h-14 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday ? 'bg-lime-500' : 'bg-lime-300'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className={`text-[10px] mt-1 font-semibold ${isToday ? 'text-lime-800 font-bold' : 'text-slate-500'}`}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logged Meals List for Today */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-lime-600" />
            Today's Verified Meals ({loggedMeals.length})
          </span>
          <span className="text-[10px] font-medium text-slate-400">Actual Intake Logged</span>
        </div>

        <div className="space-y-2">
          {loggedMeals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-800">{meal.name}</h4>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    meal.source === 'camera_intake'
                      ? 'bg-lime-100 text-lime-800'
                      : meal.source === 'voice'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {meal.source === 'camera_intake' ? 'Vision AI' : meal.source === 'voice' ? 'Voice' : 'Snack'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{meal.time} · {meal.portion}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block">
                  {meal.calories} kcal
                </span>
                <span className="text-[10px] font-semibold text-emerald-700">
                  +{meal.proteinG}g Protein
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Banner */}
      <div className="bg-gradient-to-r from-lime-500 to-emerald-600 rounded-2xl p-4 text-slate-950 shadow-md flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-sm text-slate-950">Walkthrough Completed!</h3>
          <p className="text-xs text-slate-900/80 mt-0.5">
            You have explored all 8 innovations of AuraFix PWA.
          </p>
        </div>
        <button
          onClick={onRestartWalkthrough}
          className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold shrink-0 transition"
        >
          Restart Tour
        </button>
      </div>
    </div>
  );
};

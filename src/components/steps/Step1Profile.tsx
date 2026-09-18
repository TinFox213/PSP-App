import React, { useState } from 'react';
import { User, Activity, Heart, Target, ShieldCheck, Dumbbell, Edit3, Check } from 'lucide-react';
import { UserProfile } from '../../types';

interface Step1ProfileProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNextStep: () => void;
}

export const Step1Profile: React.FC<Step1ProfileProps> = ({
  profile,
  onUpdateProfile,
  onNextStep,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(profile.weightKg);
  const [targetProtein, setTargetProtein] = useState(profile.targetProteinG);
  const [goal, setGoal] = useState(profile.goal);

  // BMI Calculation
  const heightM = profile.heightCm / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  const handleSave = () => {
    onUpdateProfile({
      weightKg: weight,
      targetProteinG: targetProtein,
      goal,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-lg font-black text-slate-800 truncate">Health Profile & Context</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Step 1 of 8 · Baseline Targets</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition shadow-2xs shrink-0"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-lime-700" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-lime-700" />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop (lg+) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Vitals & Goal */}
        <div className="space-y-4">
          {/* User Vitals Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Metric 1: Age & Gender */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-lime-200/80 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-xs font-medium mb-1">
                <Activity className="w-3.5 h-3.5 text-lime-600" />
                <span>Age & Gender</span>
              </div>
              <p className="text-sm sm:text-lg font-black text-slate-800">{profile.age} yrs · {profile.gender}</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Active metabolic profile</p>
            </div>

            {/* Metric 2: Height & Weight */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-lime-200/80 shadow-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-xs font-medium mb-1">
                <Dumbbell className="w-3.5 h-3.5 text-lime-600" />
                <span>Height & Weight</span>
              </div>
              {isEditing ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-16 px-1.5 py-0.5 text-sm font-bold border border-lime-300 rounded bg-lime-50 text-slate-800"
                  />
                  <span className="text-xs text-slate-600">kg</span>
                </div>
              ) : (
                <p className="text-sm sm:text-lg font-black text-slate-800">{profile.heightCm} cm · {weight} kg</p>
              )}
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                BMI: <span className="font-bold text-emerald-700">{bmi} (Normal)</span>
              </p>
            </div>
          </div>

          {/* Primary Goal & Diabetic Focus */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                  <Target className="w-3.5 h-3.5 text-lime-600" />
                  <span>Target Lifestyle Goal</span>
                </div>
                {isEditing ? (
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="mt-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-lime-300 bg-lime-50 text-slate-800"
                  >
                    <option value="Lean Muscle & Diabetic-friendly">Lean Muscle & Diabetic-friendly</option>
                    <option value="Weight Loss & Low Carb">Weight Loss & Low Carb</option>
                    <option value="Cardio Fitness & High Fiber">Cardio Fitness & High Fiber</option>
                  </select>
                ) : (
                  <h3 className="text-sm sm:text-base font-black text-slate-800 mt-1">{goal}</h3>
                )}
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Diabetic Aware
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Health profile is configured to optimize glycemic control while supporting hypertrophy and metabolic recovery.
            </p>
          </div>
        </div>

        {/* Right Column: Daily Macro Targets & Clinical Guidance */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-slate-800">Automated Daily Macro Targets:</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-md border border-lime-200">
                Active Calibration
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 text-center pt-1">
              <div className="bg-lime-50/80 p-2.5 sm:p-3 rounded-xl border border-lime-200 shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-lime-800">Protein</span>
                <span className="text-base sm:text-lg font-black text-lime-950">{profile.targetProteinG}g</span>
                <span className="text-[9px] sm:text-[10px] text-lime-700 block font-medium">1.1g / kg</span>
              </div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Calories</span>
                <span className="text-base sm:text-lg font-black text-slate-800">{profile.targetCalories}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">kcal/day</span>
              </div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Carbs</span>
                <span className="text-base sm:text-lg font-black text-slate-800">{profile.targetCarbsG}g</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">complex base</span>
              </div>
              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="block text-[10px] uppercase font-bold text-slate-500">Fat</span>
                <span className="text-base sm:text-lg font-black text-slate-800">{profile.targetFatG}g</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium">healthy lipids</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Sodium Limit</span>
                <span className="text-xs font-bold text-slate-800">{profile.targetSodiumMg} mg/day</span>
              </div>
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Dietary Fiber Goal</span>
                <span className="text-xs font-bold text-slate-800">{profile.targetFiberG} g/day</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/80 rounded-2xl p-3.5 sm:p-4 border border-amber-200/80 flex items-start gap-3">
            <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-950">Clinical Baseline Recommendation</h4>
              <p className="text-xs text-amber-900 leading-relaxed mt-0.5">
                Target daily protein baseline is locked at <strong>80g</strong> to preserve lean muscle and buffer post-prandial glycemic spikes against carbohydrate-dense South Indian meals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 2: Capture Served Food</span>
        <span>→</span>
      </button>
    </div>
  );
};

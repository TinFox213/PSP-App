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
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Health Profile & Context</h2>
              <p className="text-xs text-slate-500">Step 1 of 8 · Baseline Targets</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition"
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

        {/* Highlight Callout Box */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 1: Health parameters establish baseline macro and micro-nutrient targets."
        </div>
      </div>

      {/* User Vitals Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Metric 1: Age & Gender */}
        <div className="bg-white p-3.5 rounded-2xl border border-lime-200/80 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
            <Activity className="w-3.5 h-3.5 text-lime-600" />
            <span>Age & Gender</span>
          </div>
          <p className="text-base font-bold text-slate-800">{profile.age} yrs · {profile.gender}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Active metabolic profile</p>
        </div>

        {/* Metric 2: Height & Weight */}
        <div className="bg-white p-3.5 rounded-2xl border border-lime-200/80 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
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
            <p className="text-base font-bold text-slate-800">{profile.heightCm} cm · {weight} kg</p>
          )}
          <p className="text-[11px] text-slate-500 mt-0.5">BMI: <span className="font-semibold text-emerald-700">{bmi} (Normal)</span></p>
        </div>
      </div>

      {/* Primary Goal & Diabetic Focus */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
              <Target className="w-3.5 h-3.5 text-lime-600" />
              <span>Target Lifestyle Goal</span>
            </div>
            {isEditing ? (
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-1 text-xs font-semibold px-2 py-1 rounded border border-lime-300 bg-lime-50 text-slate-800"
              >
                <option value="Lean Muscle & Diabetic-friendly">Lean Muscle & Diabetic-friendly</option>
                <option value="Weight Loss & Low Carb">Weight Loss & Low Carb</option>
                <option value="Cardio Fitness & High Fiber">Cardio Fitness & High Fiber</option>
              </select>
            ) : (
              <h3 className="text-sm font-bold text-slate-800 mt-0.5">{goal}</h3>
            )}
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Diabetic Aware
          </span>
        </div>

        {/* Daily Nutrition Baselines */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-700 mb-2">Automated Macro Targets:</p>
          <div className="grid grid-cols-2 min-[420px]:grid-cols-4 gap-2 text-center">
            <div className="bg-lime-50/70 p-2 rounded-xl border border-lime-100">
              <span className="block text-[10px] text-slate-500 font-medium">Protein</span>
              <span className="text-sm font-extrabold text-lime-900">{profile.targetProteinG}g</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="block text-[10px] text-slate-500 font-medium">Calories</span>
              <span className="text-sm font-bold text-slate-800">{profile.targetCalories}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="block text-[10px] text-slate-500 font-medium">Carbs</span>
              <span className="text-sm font-bold text-slate-800">{profile.targetCarbsG}g</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="block text-[10px] text-slate-500 font-medium">Fat</span>
              <span className="text-sm font-bold text-slate-800">{profile.targetFatG}g</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/80 flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-[11px] text-amber-900 leading-tight">
            Target daily protein baseline is locked at <strong>80g</strong> to preserve lean muscle and buffer post-prandial glycemic spikes.
          </p>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 2: Capture Served Food</span>
        <span>→</span>
      </button>
    </div>
  );
};

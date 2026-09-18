import React, { useState } from 'react';
import { Sparkles, MapPin, IndianRupee, Check, Plus, Filter, ShieldCheck } from 'lucide-react';
import { RegionalRecommendation } from '../../types';

interface Step6RegionalRecommendationsProps {
  recommendations: RegionalRecommendation[];
  addedRecommendations: string[];
  onAddRecommendation: (rec: RegionalRecommendation) => void;
  onNextStep: () => void;
}

export const Step6RegionalRecommendations: React.FC<Step6RegionalRecommendationsProps> = ({
  recommendations,
  addedRecommendations,
  onAddRecommendation,
  onNextStep,
}) => {
  const [filterDiet, setFilterDiet] = useState<'All' | 'Vegetarian' | 'Vegan' | 'Non-Vegetarian'>('All');

  const filtered = recommendations.filter((r) => {
    if (filterDiet === 'All') return true;
    return r.dietaryType === filterDiet;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Regional Recommendations</h2>
              <p className="text-xs text-slate-500">Step 6 of 8 · Tamil Nadu Context</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            25g Gap Solver
          </span>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 6: Context-aware recommendations based on regional availability, budget, and dietary preference."
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
        <div className="flex items-center gap-1.5">
          {(['All', 'Vegetarian', 'Vegan', 'Non-Vegetarian'] as const).map((diet) => (
            <button
              key={diet}
              onClick={() => setFilterDiet(diet)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition whitespace-nowrap ${
                filterDiet === diet
                  ? 'bg-lime-500 border-lime-600 text-slate-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations List (4 Options strictly mapped to prompt) */}
      <div className="space-y-2.5">
        {filtered.map((rec) => {
          const isAdded = addedRecommendations.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-2xl p-4 border transition-all duration-200 shadow-sm ${
                isAdded
                  ? 'border-emerald-400 bg-emerald-50/30 ring-1 ring-emerald-300'
                  : 'border-lime-200/90 hover:border-lime-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200">
                      {rec.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{rec.dietaryType}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mt-1">{rec.title}</h3>
                  <p className="text-[11px] text-slate-500 font-medium">{rec.tamilTitle}</p>
                </div>

                {/* Protein Booster Tag */}
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                    +{rec.proteinG}g Protein
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{rec.calories} kcal</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {rec.description}
              </p>

              {/* Price, Availability & Action Row */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="flex items-center text-slate-800 font-bold">
                    ₹{rec.priceInr}
                  </span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Avail: {rec.availabilityPercent}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddRecommendation(rec)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-lime-500 hover:bg-lime-600 active:scale-95 text-slate-900 shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Plan</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Combo Info */}
      <div className="bg-lime-50/90 rounded-xl p-3 border border-lime-300 text-xs text-lime-950 space-y-1">
        <span className="font-bold block text-lime-900">Recommended Gap Solution:</span>
        <p className="text-[11px] leading-relaxed">
          Adding <strong>1 Cup Sundal (+12g)</strong> + <strong>2 Boiled Eggs (+12g)</strong> closes <strong>24g</strong> of the 25g protein deficit for only ₹34 total cost.
        </p>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 7: Voice Meal Logging</span>
        <span>→</span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { MapPin, Check, Plus } from 'lucide-react';
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
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">Regional Recommendations</h2>
              <p className="text-xs text-slate-500 font-medium">Step 6 of 8 · Tamil Nadu Hyper-Local Dietary Substitution</p>
            </div>
          </div>
          <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            25g Gap Solver
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-lime-200 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          {(['All', 'Vegetarian', 'Vegan', 'Non-Vegetarian'] as const).map((diet) => (
            <button
              key={diet}
              onClick={() => setFilterDiet(diet)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition whitespace-nowrap ${
                filterDiet === diet
                  ? 'bg-lime-500 border-lime-600 text-slate-950 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline px-2">
          {filtered.length} Tamil Nadu Options
        </span>
      </div>

      {/* Recommendations in a 2-Column Responsive Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rec) => {
          const isAdded = addedRecommendations.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 shadow-sm flex flex-col justify-between ${
                isAdded
                  ? 'border-emerald-400 bg-emerald-50/25 ring-2 ring-emerald-300'
                  : 'border-lime-200/90 hover:border-lime-400'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-lime-100 text-lime-900 border border-lime-200">
                        {rec.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{rec.dietaryType}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 mt-1.5">{rec.title}</h3>
                    <p className="text-xs text-lime-800 font-bold">{rec.tamilTitle}</p>
                  </div>

                  {/* Protein Booster Tag */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block shadow-2xs">
                      +{rec.proteinG}g Protein
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{rec.calories} kcal</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              {/* Price, Availability & Action Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="text-slate-900 font-black text-sm">
                    ₹{rec.priceInr}
                  </span>
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Avail: {rec.availabilityPercent}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddRecommendation(rec)}
                  className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl transition ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-lime-500 hover:bg-lime-600 active:scale-95 text-slate-950 shadow-xs'
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
      <div className="bg-lime-50/90 rounded-2xl p-4 border border-lime-300 text-xs sm:text-sm text-lime-950 space-y-1 shadow-2xs">
        <span className="font-black text-lime-900 block text-xs uppercase tracking-wider">Recommended Gap Solution:</span>
        <p className="leading-relaxed">
          Adding <strong>1 Cup Sundal (+12g)</strong> + <strong>2 Boiled Eggs (+12g)</strong> closes <strong>24g</strong> of the 25g protein deficit for only ₹34 total cost.
        </p>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 7: Voice Meal Logging</span>
        <span>→</span>
      </button>
    </div>
  );
};

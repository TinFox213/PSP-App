import React from 'react';
import { Sparkles, X, Lightbulb } from 'lucide-react';
import { WalkthroughStep } from '../types';

interface TourCalloutHeroProps {
  step: WalkthroughStep;
  isTourMode: boolean;
  onDismiss: () => void;
}

export const TourCalloutHero: React.FC<TourCalloutHeroProps> = ({
  step,
  isTourMode,
  onDismiss,
}) => {
  if (!isTourMode) return null;

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-lime-400/40 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-500 text-slate-950 font-black text-xs shadow-xs shrink-0">
            {step.stepNumber}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold uppercase tracking-wider text-lime-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {step.aiFeatureTitle}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 hidden sm:inline">
              · Guided Walkthrough Innovation
            </span>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0"
          title="Minimize Tour Banner"
          aria-label="Minimize Tour Banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2 text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed">
        {step.callout}
      </p>

      <p className="mt-1 text-[11px] sm:text-xs text-lime-200/90 font-medium flex items-center gap-1.5">
        <Lightbulb className="w-3.5 h-3.5 text-lime-400 shrink-0" />
        <span>{step.tagline}</span>
      </p>
    </div>
  );
};

import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, X, Compass, CheckCircle2 } from 'lucide-react';
import { WALKTHROUGH_STEPS } from '../data/mockData';

interface WalkthroughControllerProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectStep: (step: number) => void;
  isTourMode: boolean;
  onToggleTourMode: () => void;
  containerMaxWidthClass?: string;
}

export const WalkthroughController: React.FC<WalkthroughControllerProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSelectStep,
  isTourMode,
  onToggleTourMode,
  containerMaxWidthClass = 'max-w-md',
}) => {
  const stepInfo = WALKTHROUGH_STEPS.find((s) => s.stepNumber === currentStep) || WALKTHROUGH_STEPS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none transition-all">
      <div className={`w-full ${containerMaxWidthClass} mx-auto pointer-events-auto flex flex-col gap-2`}>
        {/* Explanatory Callout Banner */}
        {isTourMode && (
          <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-lime-400/40 transition-all duration-300">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-slate-950 font-bold text-[10px]">
                  {stepInfo.stepNumber}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span className="truncate">{stepInfo.aiFeatureTitle}</span>
                </span>
              </div>
              <button
                onClick={onToggleTourMode}
                className="text-slate-400 hover:text-white p-1 rounded-md transition"
                title="Minimize Tour Banner"
                aria-label="Minimize Tour Banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-100 font-medium leading-relaxed">
              {stepInfo.callout}
            </p>
            <p className="mt-0.5 text-[11px] text-lime-200/80 font-normal">
              {stepInfo.tagline}
            </p>
          </div>
        )}

        {/* Bottom Controller Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-lime-300/80 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={currentStep <= 1}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
              currentStep <= 1
                ? 'text-slate-300 bg-slate-100/50 cursor-not-allowed'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Interactive Step Navigator / Indicator */}
          <div className="flex flex-col items-center justify-center px-1 min-w-0 flex-1">
            <div className="flex items-center gap-1 truncate max-w-full">
              <span className="text-xs font-bold text-slate-800 shrink-0">
                {currentStep}/{totalSteps}
              </span>
              <span className="text-[10px] text-slate-400 shrink-0">·</span>
              <span className="text-[11px] text-lime-700 font-semibold truncate max-w-[85px] min-[400px]:max-w-[140px]">
                {stepInfo.shortTitle}
              </span>
            </div>
            {/* Step Dots */}
            <div className="flex items-center gap-1 mt-1">
              {WALKTHROUGH_STEPS.map((s) => (
                <button
                  key={s.stepNumber}
                  onClick={() => onSelectStep(s.stepNumber)}
                  title={`Jump to Step ${s.stepNumber}: ${s.shortTitle}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s.stepNumber === currentStep
                      ? 'w-4 sm:w-5 bg-lime-600'
                      : s.stepNumber < currentStep
                      ? 'w-2 bg-lime-300 hover:bg-lime-400'
                      : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next / Finish & Mode Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={onToggleTourMode}
              className={`p-2 rounded-xl transition ${
                isTourMode ? 'bg-lime-100/80 text-lime-800' : 'text-slate-500 hover:bg-slate-100'
              }`}
              title={isTourMode ? 'Tour Active (Click to minimize banner)' : 'Show Tour Banner'}
            >
              <Compass className="w-4 h-4 text-lime-600" />
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={onNext}
                className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold bg-lime-500 hover:bg-lime-600 active:scale-95 text-slate-900 shadow-sm transition"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onSelectStep(1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-sm transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
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
  containerMaxWidthClass = 'max-w-6xl',
}) => {
  const stepInfo = WALKTHROUGH_STEPS.find((s) => s.stepNumber === currentStep) || WALKTHROUGH_STEPS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-3 sm:px-6 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-lime-200/80 shadow-lg pointer-events-auto transition-all">
      <div className={`w-full ${containerMaxWidthClass} mx-auto flex items-center justify-between gap-2 sm:gap-4`}>
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentStep <= 1}
          className={`flex items-center justify-center gap-1 p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            currentStep <= 1
              ? 'text-slate-300 bg-slate-100/50 cursor-not-allowed'
              : 'text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 shadow-2xs'
          }`}
          aria-label="Previous Step"
          title="Previous Step"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Interactive Step Navigator / Indicator */}
        <div className="flex flex-col items-center justify-center px-1 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 truncate max-w-full">
            <span className="text-xs font-black text-slate-800 shrink-0">
              {currentStep}/{totalSteps}
            </span>
            <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">·</span>
            <span className="text-[11px] text-lime-800 font-bold truncate max-w-[100px] sm:max-w-[220px]">
              {stepInfo.shortTitle}
            </span>
          </div>

          {/* Progress Bar on Mobile (< sm) */}
          <div className="w-full max-w-[100px] h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 sm:hidden">
            <div
              className="h-full bg-lime-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step Progress Dots on Desktop & Tablet (sm+) */}
          <div className="hidden sm:flex items-center gap-1.5 mt-1">
            {WALKTHROUGH_STEPS.map((s) => (
              <button
                key={s.stepNumber}
                onClick={() => onSelectStep(s.stepNumber)}
                title={`Jump to Step ${s.stepNumber}: ${s.shortTitle}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s.stepNumber === currentStep
                    ? 'w-6 bg-lime-600'
                    : s.stepNumber < currentStep
                    ? 'w-2.5 bg-lime-400 hover:bg-lime-500'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next / Finish & Tour Mode Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onToggleTourMode}
            className={`p-1.5 sm:p-2 rounded-xl transition ${
              isTourMode
                ? 'bg-lime-100 text-lime-800 border border-lime-300'
                : 'text-slate-500 hover:bg-slate-100 border border-transparent'
            }`}
            title={isTourMode ? 'Guided AI Tour Active' : 'Enable Guided Tour'}
            aria-label="Toggle Tour Mode"
          >
            <Compass className="w-4 h-4 text-lime-600" />
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={onNext}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-lime-500 hover:bg-lime-600 active:scale-95 text-slate-950 shadow-xs transition"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onSelectStep(1)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-xs transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Restart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

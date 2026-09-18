import React, { useEffect, useRef } from 'react';
import { WALKTHROUGH_STEPS } from '../data/mockData';
import { Check } from 'lucide-react';

interface StepNavigationBarProps {
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
}

export const StepNavigationBar: React.FC<StepNavigationBarProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentStep]);

  return (
    <nav className="w-full bg-white/95 border-b border-lime-200/80 px-2 sm:px-6 py-1.5 backdrop-blur-md">
      {/* Desktop Stepper View (lg+ / 1024px+) */}
      <div className="hidden lg:flex items-center justify-between gap-2 max-w-6xl mx-auto">
        {WALKTHROUGH_STEPS.map((s) => {
          const isActive = s.stepNumber === currentStep;
          const isPassed = s.stepNumber < currentStep;

          return (
            <button
              key={s.stepNumber}
              onClick={() => onSelectStep(s.stepNumber)}
              className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all text-left flex-1 min-w-0 ${
                isActive
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-xs'
                  : isPassed
                  ? 'hover:bg-lime-100/70 text-slate-700'
                  : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : isPassed
                    ? 'bg-lime-200 text-lime-900'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isPassed ? <Check className="w-3.5 h-3.5 text-lime-900" /> : s.stepNumber}
              </span>
              <div className="truncate min-w-0">
                <span className={`block text-xs truncate ${isActive ? 'font-black' : 'font-semibold'}`}>
                  {s.shortTitle}
                </span>
                <span className="block text-[9px] text-slate-400 group-hover:text-slate-600 truncate">
                  Step {s.stepNumber}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile & Tablet Horizontal Scroll View (< lg) */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto scrollbar-none py-0.5 px-1 max-w-6xl mx-auto">
        {WALKTHROUGH_STEPS.map((s) => {
          const isActive = s.stepNumber === currentStep;
          const isPassed = s.stepNumber < currentStep;

          return (
            <button
              key={s.stepNumber}
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectStep(s.stepNumber)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition shrink-0 ${
                isActive
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-xs'
                  : isPassed
                  ? 'bg-lime-100 text-lime-900 border border-lime-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="font-extrabold">{s.stepNumber}.</span>
              <span>{s.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

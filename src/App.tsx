import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { WalkthroughController } from './components/WalkthroughController';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Step1Profile } from './components/steps/Step1Profile';
import { Step2BeforeMeal } from './components/steps/Step2BeforeMeal';
import { Step3AfterMealMath } from './components/steps/Step3AfterMealMath';
import { Step4PortionAdjust } from './components/steps/Step4PortionAdjust';
import { Step5NutrientGap } from './components/steps/Step5NutrientGap';
import { Step6RegionalRecommendations } from './components/steps/Step6RegionalRecommendations';
import { Step7VoiceLogging } from './components/steps/Step7VoiceLogging';
import { Step8Dashboard } from './components/steps/Step8Dashboard';
import {
  INITIAL_USER_PROFILE,
  BEFORE_MEAL_DETECTIONS,
  AFTER_MEAL_LEFTOVER_DETECTIONS,
  DEFAULT_MEAL_MATH,
  REGIONAL_RECOMMENDATIONS,
  INITIAL_LOGGED_MEALS,
  WALKTHROUGH_STEPS,
} from './data/mockData';
import {
  UserProfile,
  MealIntakeMath,
  RegionalRecommendation,
  LoggedMealItem,
} from './types';
import { api, ApiStatus } from './services/api';

export default function App() {
  // Current Walkthrough Step (1 to 8)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isTourMode, setIsTourMode] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isLive: false,
    message: 'Checking Vercel API status...',
  });

  // Core Application State
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [mealMath, setMealMath] = useState<MealIntakeMath>(DEFAULT_MEAL_MATH);
  const [addedRecommendations, setAddedRecommendations] = useState<string[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMealItem[]>(() => [
    ...INITIAL_LOGGED_MEALS,
    {
      id: 'lunch-dosa-intake',
      time: '01:45 PM',
      name: 'Crispy Dosa + Sambar (Actual Intake)',
      portion: '2.5 dosas (250g)',
      calories: 380,
      proteinG: 9,
      carbsG: 65,
      fatG: 7,
      source: 'camera_intake',
    },
  ]);

  // Check REST API health and sync profile on initial load
  useEffect(() => {
    let isMounted = true;

    async function initApi() {
      const status = await api.checkHealth();
      if (isMounted) setApiStatus(status);

      try {
        const remoteProfile = await api.getProfile();
        if (isMounted && remoteProfile) setProfile(remoteProfile);
      } catch (err) {
        console.info('Using local profile baseline', err);
      }
    }

    initApi();
    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate dynamic totals
  const totalCalories = useMemo(() => {
    return loggedMeals.reduce((acc, m) => acc + m.calories, 0);
  }, [loggedMeals]);

  const totalProtein = useMemo(() => {
    return loggedMeals.reduce((acc, m) => acc + m.proteinG, 0);
  }, [loggedMeals]);

  const totalCarbs = useMemo(() => {
    return loggedMeals.reduce((acc, m) => acc + m.carbsG, 0);
  }, [loggedMeals]);

  const totalFat = useMemo(() => {
    return loggedMeals.reduce((acc, m) => acc + m.fatG, 0);
  }, [loggedMeals]);

  // Handlers for step progression
  const handleNext = () => {
    if (currentStep < WALKTHROUGH_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDemo = () => {
    setCurrentStep(1);
    setIsTourMode(true);
    setProfile(INITIAL_USER_PROFILE);
    setMealMath(DEFAULT_MEAL_MATH);
    setAddedRecommendations([]);
    setLoggedMeals([
      ...INITIAL_LOGGED_MEALS,
      {
        id: 'lunch-dosa-intake',
        time: '01:45 PM',
        name: 'Crispy Dosa + Sambar (Actual Intake)',
        portion: '2.5 dosas (250g)',
        calories: 380,
        proteinG: 9,
        carbsG: 65,
        fatG: 7,
        source: 'camera_intake',
      },
    ]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = async (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    try {
      const saved = await api.updateProfile(updated);
      setProfile(saved);
    } catch {}
  };

  const handleUpdateMealMath = async (updated: Partial<MealIntakeMath>) => {
    setMealMath((prev) => {
      const merged = { ...prev, ...updated };
      setLoggedMeals((meals) =>
        meals.map((m) =>
          m.id === 'lunch-dosa-intake'
            ? {
                ...m,
                portion: merged.consumedUnits,
                calories: merged.calories,
                proteinG: merged.proteinG,
                carbsG: merged.carbsG,
                fatG: merged.fatG,
              }
            : m
        )
      );
      return merged;
    });

    if (updated.consumedWeightG !== undefined) {
      try {
        const calculated = await api.calculateIntakeMath({
          servedWeightG: mealMath.servedWeightG,
          leftoverWeightG: Math.max(0, mealMath.servedWeightG - updated.consumedWeightG),
        });
        setMealMath(calculated);
      } catch {}
    }
  };

  const handleAddRecommendation = async (rec: RegionalRecommendation) => {
    if (addedRecommendations.includes(rec.id)) return;

    setAddedRecommendations((prev) => [...prev, rec.id]);
    const newItem: LoggedMealItem = {
      id: `rec-${rec.id}-${Date.now()}`,
      time: '04:00 PM',
      name: `${rec.title} (Regional Snack)`,
      portion: '1 portion',
      calories: rec.calories,
      proteinG: rec.proteinG,
      carbsG: Math.round(rec.calories * 0.1),
      fatG: Math.round(rec.calories * 0.03),
      source: 'recommendation',
    };

    setLoggedMeals((prev) => [...prev, newItem]);
    try {
      await api.logMeal(newItem);
    } catch {}
  };

  const handleAddVoiceItems = async (items: LoggedMealItem[]) => {
    setLoggedMeals((prev) => {
      const newItems = items.filter((item) => !prev.some((p) => p.name === item.name));
      return [...prev, ...newItems];
    });

    for (const item of items) {
      try {
        await api.logMeal(item);
      } catch {}
    }
  };

  const containerMaxWidthClass = viewMode === 'expanded' ? 'max-w-4xl' : 'max-w-md';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center selection:bg-lime-200 selection:text-lime-900 font-sans transition-colors duration-300">
      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Responsive App Frame */}
      <div
        className={`w-full ${containerMaxWidthClass} min-h-screen bg-lime-50/40 border-x border-lime-200/80 shadow-2xl flex flex-col relative transition-all duration-300 ${
          isTourMode ? 'pb-60 sm:pb-56' : 'pb-36 sm:pb-32'
        }`}
      >
        {/* Top Header Navigation */}
        <Header
          currentStep={currentStep}
          isTourMode={isTourMode}
          onToggleTourMode={() => setIsTourMode((prev) => !prev)}
          onResetDemo={handleResetDemo}
          apiStatus={apiStatus}
          viewMode={viewMode}
          onToggleViewMode={() =>
            setViewMode((prev) => (prev === 'mobile' ? 'expanded' : 'mobile'))
          }
        />

        {/* Step Navigation Tabs with smooth horizontal scrolling */}
        <div className="bg-white/90 border-b border-lime-200/80 px-2.5 sm:px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {WALKTHROUGH_STEPS.map((s) => {
            const isActive = s.stepNumber === currentStep;
            return (
              <button
                key={s.stepNumber}
                onClick={() => handleSelectStep(s.stepNumber)}
                className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition shrink-0 ${
                  isActive
                    ? 'bg-lime-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-lime-100/60 border border-slate-200'
                }`}
              >
                <span>{s.stepNumber}.</span>
                <span>{s.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content View Container */}
        <main className="flex-1 p-3 sm:p-4 space-y-4">
          {currentStep === 1 && (
            <Step1Profile
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 2 && (
            <Step2BeforeMeal
              detections={BEFORE_MEAL_DETECTIONS}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 3 && (
            <Step3AfterMealMath
              beforeDetections={BEFORE_MEAL_DETECTIONS}
              afterDetections={AFTER_MEAL_LEFTOVER_DETECTIONS}
              mealMath={mealMath}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 4 && (
            <Step4PortionAdjust
              mealMath={mealMath}
              onUpdateMealMath={handleUpdateMealMath}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 5 && (
            <Step5NutrientGap
              mealMath={mealMath}
              profile={profile}
              totalProteinConsumedToday={totalProtein}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 6 && (
            <Step6RegionalRecommendations
              recommendations={REGIONAL_RECOMMENDATIONS}
              addedRecommendations={addedRecommendations}
              onAddRecommendation={handleAddRecommendation}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 7 && (
            <Step7VoiceLogging
              onAddVoiceItems={handleAddVoiceItems}
              onNextStep={handleNext}
            />
          )}

          {currentStep === 8 && (
            <Step8Dashboard
              profile={profile}
              loggedMeals={loggedMeals}
              totalCalories={totalCalories}
              totalProtein={totalProtein}
              totalCarbs={totalCarbs}
              totalFat={totalFat}
              onRestartWalkthrough={() => handleSelectStep(1)}
            />
          )}
        </main>

        {/* Floating Walkthrough Controller Fixed at Bottom */}
        <WalkthroughController
          currentStep={currentStep}
          totalSteps={WALKTHROUGH_STEPS.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectStep={handleSelectStep}
          isTourMode={isTourMode}
          onToggleTourMode={() => setIsTourMode((prev) => !prev)}
          containerMaxWidthClass={containerMaxWidthClass}
        />
      </div>
    </div>
  );
}

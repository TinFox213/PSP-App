import { describe, it, expect } from 'vitest';
import { calculateBMI, computeTargets } from '../../api/profile';

describe('User Profile & Macro Baselines API', () => {
  it('correctly calculates BMI and classification', () => {
    // 74kg, 175cm -> 74 / (1.75^2) = 24.2
    const { bmi, category } = calculateBMI(74, 175);
    expect(bmi).toBe(24.2);
    expect(category).toBe('Normal');

    // Overweight test
    const overweight = calculateBMI(85, 175);
    expect(overweight.bmi).toBe(27.8);
    expect(overweight.category).toBe('Overweight');
  });

  it('computes diabetic-friendly macro targets according to user goals', () => {
    const targets = computeTargets(74, 'Lean Muscle & Diabetic-friendly');
    expect(targets.targetProteinG).toBeGreaterThanOrEqual(80);
    expect(targets.targetCalories).toBeGreaterThan(2000);
  });
});

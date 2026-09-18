import { describe, it, expect } from 'vitest';
import { calculateDifferentialIntake } from '../../api/intake-math';

describe('Differential Intake Math API', () => {
  it('correctly calculates actual intake from served and leftover portions', () => {
    const result = calculateDifferentialIntake({
      itemName: 'Crispy Dosa + Sambar Meal',
      servedWeightG: 300,
      leftoverWeightG: 50,
    });

    expect(result.servedWeightG).toBe(300);
    expect(result.leftoverWeightG).toBe(50);
    expect(result.consumedWeightG).toBe(250);
    expect(result.consumedFraction).toBe(0.83);
    // Avoided overcounting calculation
    expect(result.traditionalServedCalories).toBeGreaterThan(result.calories);
    expect(result.avoidedOvercountKcal).toBe(result.traditionalServedCalories - result.calories);
    expect(result.avoidedOvercountKcal).toBeGreaterThanOrEqual(70);
  });

  it('handles 100% clean plate (zero leftover)', () => {
    const result = calculateDifferentialIntake({
      servedWeightG: 200,
      leftoverWeightG: 0,
    });

    expect(result.consumedWeightG).toBe(200);
    expect(result.consumedFraction).toBe(1);
    expect(result.avoidedOvercountKcal).toBe(0);
    expect(result.calories).toBe(result.traditionalServedCalories);
  });

  it('handles 100% leftover (no food eaten)', () => {
    const result = calculateDifferentialIntake({
      servedWeightG: 300,
      leftoverWeightG: 300,
    });

    expect(result.consumedWeightG).toBe(0);
    expect(result.calories).toBe(0);
    expect(result.proteinG).toBe(0);
    expect(result.avoidedOvercountKcal).toBe(result.traditionalServedCalories);
  });

  it('safely clamps leftover to servedWeightG if leftover exceeds served', () => {
    const result = calculateDifferentialIntake({
      servedWeightG: 100,
      leftoverWeightG: 150, // anomaly/typo
    });

    expect(result.consumedWeightG).toBe(0);
    expect(result.calories).toBe(0);
  });
});

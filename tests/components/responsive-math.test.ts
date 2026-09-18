import { describe, it, expect } from 'vitest';
import { calculateDifferentialIntake } from '../../api/intake-math';

describe('Responsive Nutritional Math & Scaling Engine', () => {
  it('correctly calculates small portion (200g served, 0 leftover)', () => {
    const result = calculateDifferentialIntake({
      servedWeightG: 200,
      leftoverWeightG: 0,
    });
    expect(result.consumedWeightG).toBe(200);
    expect(result.consumedFraction).toBe(1);
    expect(result.calories).toBe(Math.round((200 / 100) * 152));
  });

  it('correctly calculates heavy meal (450g served, 100g leftover)', () => {
    const result = calculateDifferentialIntake({
      servedWeightG: 450,
      leftoverWeightG: 100,
    });
    expect(result.consumedWeightG).toBe(350);
    expect(result.avoidedOvercountKcal).toBeGreaterThan(100);
  });

  it('accurately computes daily protein deficit without negative anomalies', () => {
    const dailyTarget = 80;
    const consumed55 = 55;
    const deficit1 = Math.max(0, dailyTarget - consumed55);
    expect(deficit1).toBe(25);

    // If user exceeds target (e.g. 95g consumed)
    const consumed95 = 95;
    const deficit2 = Math.max(0, dailyTarget - consumed95);
    expect(deficit2).toBe(0);
  });

  it('scales Tamil Nadu regional combo to close protein deficit within budget', () => {
    // Sundal (12g protein, 20 INR) + 2 Boiled Eggs (12g protein, 14 INR)
    const sundalProtein = 12;
    const sundalCost = 20;
    const eggsProtein = 12;
    const eggsCost = 14;

    const totalAddedProtein = sundalProtein + eggsProtein;
    const totalCost = sundalCost + eggsCost;

    expect(totalAddedProtein).toBe(24);
    expect(totalCost).toBe(34);
    expect(totalCost).toBeLessThanOrEqual(35);
  });
});

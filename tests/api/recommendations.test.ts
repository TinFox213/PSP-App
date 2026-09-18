import { describe, it, expect } from 'vitest';
import { TN_RECOMMENDATIONS, filterRecommendations } from '../../api/recommendations';

describe('Tamil Nadu Regional Recommendations API', () => {
  it('returns all regional recommendations when filter is All', () => {
    const results = filterRecommendations(TN_RECOMMENDATIONS, { dietaryType: 'All' });
    expect(results.length).toBe(TN_RECOMMENDATIONS.length);
    expect(results.length).toBeGreaterThanOrEqual(4);
  });

  it('correctly filters for Vegan options', () => {
    const results = filterRecommendations(TN_RECOMMENDATIONS, { dietaryType: 'Vegan' });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((rec) => {
      expect(rec.dietaryType).toBe('Vegan');
    });
    // Check that Sundal is present
    const sundal = results.find((r) => r.id === 'sundal');
    expect(sundal).toBeDefined();
    expect(sundal?.proteinG).toBe(12);
  });

  it('correctly filters by maximum budget (price in INR)', () => {
    const results = filterRecommendations(TN_RECOMMENDATIONS, { maxPrice: 20 });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((rec) => {
      expect(rec.priceInr).toBeLessThanOrEqual(20);
    });
  });

  it('correctly filters by minimum protein threshold', () => {
    const results = filterRecommendations(TN_RECOMMENDATIONS, { minProtein: 12 });
    expect(results.length).toBeGreaterThan(0);
    results.forEach((rec) => {
      expect(rec.proteinG).toBeGreaterThanOrEqual(12);
    });
  });
});

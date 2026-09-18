import { describe, it, expect } from 'vitest';
import mealsHandler from '../../api/meals';

describe('Meals Management API', () => {
  it('handles GET request returning meals and accurate daily totals', () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = { method: 'GET', url: '/api/meals' };
    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
          },
        };
      },
    };

    mealsHandler(mockReq, mockRes);

    expect(statusCode).toBe(200);
    expect(responseData.success).toBe(true);
    expect(Array.isArray(responseData.meals)).toBe(true);
    expect(responseData.meals.length).toBeGreaterThanOrEqual(1);

    const calculatedCalories = responseData.meals.reduce((sum: number, m: any) => sum + m.calories, 0);
    expect(responseData.totals.totalCalories).toBe(calculatedCalories);
  });

  it('handles POST request to log a verified meal item', () => {
    let statusCode = 0;
    let responseData: any = null;

    const newMeal = {
      name: 'Evening Sundal Snack',
      portion: '1 cup (150g)',
      calories: 180,
      proteinG: 12,
      carbsG: 28,
      fatG: 3,
      source: 'recommendation',
    };

    const mockReq = { method: 'POST', body: newMeal };
    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
          },
        };
      },
    };

    mealsHandler(mockReq, mockRes);

    expect(statusCode).toBe(201);
    expect(responseData.success).toBe(true);
    expect(responseData.meal.name).toBe('Evening Sundal Snack');
    expect(responseData.meal.proteinG).toBe(12);
  });

  it('rejects POST request with missing meal name', () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockReq = { method: 'POST', body: { calories: 100 } };
    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
          },
        };
      },
    };

    mealsHandler(mockReq, mockRes);

    expect(statusCode).toBe(400);
    expect(responseData.error).toBeDefined();
  });
});

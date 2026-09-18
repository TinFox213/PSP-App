import {
  UserProfile,
  MealIntakeMath,
  RegionalRecommendation,
  LoggedMealItem,
} from '../types';
import {
  INITIAL_USER_PROFILE,
  DEFAULT_MEAL_MATH,
  REGIONAL_RECOMMENDATIONS,
  INITIAL_LOGGED_MEALS,
} from '../data/mockData';

const BASE_URL = '';

export interface ApiStatus {
  isLive: boolean;
  message: string;
}

class ApiService {
  private isServerAvailable: boolean = true;

  async checkHealth(): Promise<ApiStatus> {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isServerAvailable = true;
        return { isLive: true, message: 'Connected to Vercel Serverless REST API' };
      }
    } catch {
      this.isServerAvailable = false;
    }
    return { isLive: false, message: 'Offline Mode (Local Cache & Storage)' };
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const res = await fetch(`${BASE_URL}/api/profile`, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (data.profile) return data.profile;
      }
    } catch (e) {
      console.info('Using offline profile fallback');
    }
    const saved = localStorage.getItem('aurafix_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_USER_PROFILE;
  }

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    localStorage.setItem('aurafix_profile', JSON.stringify(profile));
    try {
      const res = await fetch(`${BASE_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.profile) return data.profile;
      }
    } catch (e) {
      console.info('Updated profile in offline storage');
    }
    return { ...INITIAL_USER_PROFILE, ...profile };
  }

  async calculateIntakeMath(params: {
    servedWeightG: number;
    leftoverWeightG: number;
    itemName?: string;
  }): Promise<MealIntakeMath> {
    try {
      const res = await fetch(`${BASE_URL}/api/intake-math`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.differentialConsumptionMath) {
          return data.differentialConsumptionMath;
        }
      }
    } catch (e) {
      console.info('Using local differential intake calculation');
    }

    // Local fallback calculation
    const served = params.servedWeightG;
    const leftover = params.leftoverWeightG;
    const consumed = Math.max(0, served - leftover);
    const scale = consumed / 250;

    return {
      itemName: params.itemName || DEFAULT_MEAL_MATH.itemName,
      servedWeightG: served,
      servedUnits: `${(served / 100).toFixed(1)} dosas (${served}g)`,
      leftoverWeightG: leftover,
      leftoverUnits: `${(leftover / 100).toFixed(1)} dosas (${leftover}g)`,
      consumedWeightG: consumed,
      consumedUnits: `${(consumed / 100).toFixed(1)} dosas (${consumed}g)`,
      calories: Math.round(380 * scale),
      carbsG: Math.round(65 * scale),
      proteinG: +(9 * scale).toFixed(1),
      fatG: +(7 * scale).toFixed(1),
      sodiumMg: Math.round(420 * scale),
      fiberG: +(4.2 * scale).toFixed(1),
    };
  }

  async getMeals(): Promise<LoggedMealItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/meals`, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.meals)) return data.meals;
      }
    } catch (e) {
      console.info('Using local meals storage');
    }
    const saved = localStorage.getItem('aurafix_meals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_LOGGED_MEALS;
  }

  async logMeal(meal: LoggedMealItem): Promise<LoggedMealItem> {
    try {
      const res = await fetch(`${BASE_URL}/api/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal),
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.meal) return data.meal;
      }
    } catch (e) {
      console.info('Logged meal stored locally');
    }
    return meal;
  }

  async getRecommendations(filters: {
    dietaryType?: string;
    maxPrice?: number;
    minProtein?: number;
  }): Promise<RegionalRecommendation[]> {
    try {
      const params = new URLSearchParams();
      if (filters.dietaryType && filters.dietaryType !== 'All') {
        params.set('dietaryType', filters.dietaryType);
      }
      if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
      if (filters.minProtein) params.set('minProtein', String(filters.minProtein));

      const res = await fetch(`${BASE_URL}/api/recommendations?${params.toString()}`, {
        signal: AbortSignal.timeout(3500),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.recommendations)) return data.recommendations;
      }
    } catch (e) {
      console.info('Using local recommendations fallback');
    }

    return REGIONAL_RECOMMENDATIONS.filter((r) => {
      if (filters.dietaryType && filters.dietaryType !== 'All') {
        return r.dietaryType.toLowerCase() === filters.dietaryType.toLowerCase();
      }
      return true;
    });
  }

  async parseVoice(transcript: string): Promise<LoggedMealItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/voice-parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items)) return data.items;
      }
    } catch (e) {
      console.info('Using local voice parsing fallback');
    }

    // Local deterministic fallback
    const lower = transcript.toLowerCase();
    const items: LoggedMealItem[] = [];
    if (lower.includes('curd') || lower.includes('dahi')) {
      items.push({
        id: `voice-curd-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: 'Fresh Curd (Dahi)',
        portion: '1 cup (200ml)',
        calories: 95,
        proteinG: 6,
        carbsG: 8,
        fatG: 4,
        source: 'voice',
      });
    }
    if (lower.includes('egg')) {
      items.push({
        id: `voice-egg-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: 'Boiled Country Egg',
        portion: '1 large unit (50g)',
        calories: 70,
        proteinG: 6,
        carbsG: 0.5,
        fatG: 5,
        source: 'voice',
      });
    }
    return items;
  }
}

export const api = new ApiService();

export interface UserProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  goal: string;
  activityLevel: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  targetSodiumMg: number;
  targetFiberG: number;
  diabeticFriendly: boolean;
}

export interface FoodDetection {
  id: string;
  name: string;
  tamilName?: string;
  quantity: string;
  estimatedWeightG: number;
  confidence: number;
  box: { x: number; y: number; width: number; height: number }; // percentage 0-100
  color: string;
}

export interface MealIntakeMath {
  itemName: string;
  servedWeightG: number;
  servedUnits: string;
  leftoverWeightG: number;
  leftoverUnits: string;
  consumedWeightG: number;
  consumedUnits: string;
  calories: number;
  carbsG: number;
  proteinG: number;
  fatG: number;
  sodiumMg: number;
  fiberG: number;
}

export interface RegionalRecommendation {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  proteinG: number;
  calories: number;
  priceInr: number;
  availabilityPercent: number;
  dietaryType: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  badge: string;
  imageUrl?: string;
}

export interface LoggedMealItem {
  id: string;
  time: string;
  name: string;
  portion: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  source: 'camera_intake' | 'voice' | 'manual' | 'recommendation';
}

export interface WalkthroughStep {
  stepNumber: number;
  title: string;
  shortTitle: string;
  aiFeatureTitle: string;
  callout: string;
  tagline: string;
}

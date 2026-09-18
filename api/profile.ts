export interface UserProfileData {
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

let storedProfile: UserProfileData = {
  name: 'Aravind Kumar',
  age: 28,
  gender: 'Male',
  heightCm: 175,
  weightKg: 74,
  goal: 'Lean Muscle & Diabetic-friendly',
  activityLevel: 'Moderate (Gym 4x/week)',
  targetCalories: 2150,
  targetProteinG: 80,
  targetCarbsG: 260,
  targetFatG: 65,
  targetSodiumMg: 2000,
  targetFiberG: 30,
  diabeticFriendly: true,
};

export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: string } {
  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';
  return { bmi, category };
}

export function computeTargets(weightKg: number, goal: string): Partial<UserProfileData> {
  let targetProteinG = 80;
  let targetCalories = 2150;
  let targetCarbsG = 260;
  let targetFatG = 65;

  if (goal.includes('Lean Muscle')) {
    targetProteinG = Math.round(weightKg * 1.1); // ~1.1g per kg
    targetCalories = Math.round(weightKg * 29);
  } else if (goal.includes('Weight Loss')) {
    targetProteinG = Math.round(weightKg * 1.2);
    targetCalories = Math.round(weightKg * 24);
    targetCarbsG = 180;
    targetFatG = 50;
  }

  return {
    targetProteinG,
    targetCalories,
    targetCarbsG,
    targetFatG,
  };
}

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const { bmi, category } = calculateBMI(storedProfile.weightKg, storedProfile.heightCm);
    return res.status(200).json({
      success: true,
      profile: storedProfile,
      vitals: { bmi, category },
    });
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const weightKg = Number(body.weightKg) || storedProfile.weightKg;
    const heightCm = Number(body.heightCm) || storedProfile.heightCm;
    const goal = body.goal || storedProfile.goal;

    const dynamicTargets = computeTargets(weightKg, goal);

    storedProfile = {
      ...storedProfile,
      ...body,
      weightKg,
      heightCm,
      goal,
      targetProteinG: body.targetProteinG || dynamicTargets.targetProteinG || storedProfile.targetProteinG,
      targetCalories: body.targetCalories || dynamicTargets.targetCalories || storedProfile.targetCalories,
      targetCarbsG: body.targetCarbsG || dynamicTargets.targetCarbsG || storedProfile.targetCarbsG,
      targetFatG: body.targetFatG || dynamicTargets.targetFatG || storedProfile.targetFatG,
    };

    const { bmi, category } = calculateBMI(storedProfile.weightKg, storedProfile.heightCm);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: storedProfile,
      vitals: { bmi, category },
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

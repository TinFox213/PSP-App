export interface IntakeCalculationInput {
  itemName?: string;
  servedWeightG: number;
  servedUnits?: string;
  leftoverWeightG: number;
  leftoverUnits?: string;
  consumedUnits?: string;
  baseCaloriesPer100g?: number; // default ~152 kcal / 100g for dosa + sambar
  baseCarbsPer100g?: number; // 26g
  baseProteinPer100g?: number; // 3.6g
  baseFatPer100g?: number; // 2.8g
  baseSodiumPer100g?: number; // 168mg
  baseFiberPer100g?: number; // 1.68g
}

export function calculateDifferentialIntake(input: IntakeCalculationInput) {
  const served = Math.max(0, Number(input.servedWeightG) || 0);
  const leftover = Math.max(0, Math.min(served, Number(input.leftoverWeightG) || 0));
  const consumed = Math.max(0, served - leftover);

  // Nutritional density defaults (based on Crispy Dosa + Sambar baseline)
  const cal100g = input.baseCaloriesPer100g ?? 152;
  const carb100g = input.baseCarbsPer100g ?? 26;
  const prot100g = input.baseProteinPer100g ?? 3.6;
  const fat100g = input.baseFatPer100g ?? 2.8;
  const sod100g = input.baseSodiumPer100g ?? 168;
  const fib100g = input.baseFiberPer100g ?? 1.68;

  const servedCalories = Math.round((served / 100) * cal100g);
  const consumedCalories = Math.round((consumed / 100) * cal100g);
  const avoidedOvercountKcal = servedCalories - consumedCalories;

  const carbsG = Math.round((consumed / 100) * carb100g);
  const proteinG = +((consumed / 100) * prot100g).toFixed(1);
  const fatG = +((consumed / 100) * fat100g).toFixed(1);
  const sodiumMg = Math.round((consumed / 100) * sod100g);
  const fiberG = +((consumed / 100) * fib100g).toFixed(1);

  const consumedFraction = served > 0 ? +(consumed / served).toFixed(2) : 0;
  const consumedDosas = +(consumed / 100).toFixed(1);

  return {
    itemName: input.itemName || 'Crispy Dosa + Sambar Meal',
    servedWeightG: served,
    servedUnits: input.servedUnits || `${(served / 100).toFixed(1)} dosas (${served}g)`,
    leftoverWeightG: leftover,
    leftoverUnits: input.leftoverUnits || `${(leftover / 100).toFixed(1)} dosas (${leftover}g)`,
    consumedWeightG: consumed,
    consumedUnits: input.consumedUnits || `${consumedDosas} dosas (${consumed}g)`,
    consumedFraction,
    traditionalServedCalories: servedCalories,
    calories: consumedCalories,
    avoidedOvercountKcal,
    carbsG,
    proteinG,
    fatG,
    sodiumMg,
    fiberG,
  };
}

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (body.servedWeightG === undefined) {
    return res.status(400).json({
      error: 'Missing required parameter: servedWeightG',
    });
  }

  const result = calculateDifferentialIntake(body);

  return res.status(200).json({
    success: true,
    differentialConsumptionMath: result,
  });
}

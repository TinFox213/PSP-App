export interface LoggedMeal {
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

let loggedMealsStore: LoggedMeal[] = [
  {
    id: 'meal-breakfast',
    time: '08:15 AM',
    name: 'Idli (3 pcs) + Vegetable Sambar',
    portion: '3 idlis (180g)',
    calories: 260,
    proteinG: 8,
    carbsG: 52,
    fatG: 2,
    source: 'camera_intake',
  },
  {
    id: 'meal-midmorning',
    time: '11:00 AM',
    name: 'Sprouted Green Gram (Pachai Payaru)',
    portion: '1 small bowl (100g)',
    calories: 140,
    proteinG: 9,
    carbsG: 24,
    fatG: 1,
    source: 'manual',
  },
  {
    id: 'meal-lunch-before',
    time: '01:30 PM',
    name: 'Brown Rice with Keerai Kootu & Rasam',
    portion: '1 plate (320g)',
    calories: 420,
    proteinG: 14,
    carbsG: 78,
    fatG: 5,
    source: 'camera_intake',
  },
  {
    id: 'meal-afternoon-snack',
    time: '04:30 PM',
    name: 'Roasted Chana (Pottukadalai)',
    portion: 'Handful (40g)',
    calories: 150,
    proteinG: 8,
    carbsG: 22,
    fatG: 3,
    source: 'manual',
  },
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
];

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const totalCalories = loggedMealsStore.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = loggedMealsStore.reduce((sum, m) => sum + m.proteinG, 0);
    const totalCarbs = loggedMealsStore.reduce((sum, m) => sum + m.carbsG, 0);
    const totalFat = loggedMealsStore.reduce((sum, m) => sum + m.fatG, 0);

    return res.status(200).json({
      success: true,
      count: loggedMealsStore.length,
      meals: loggedMealsStore,
      totals: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
      },
    });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    if (!body.name || body.calories === undefined) {
      return res.status(400).json({ error: 'Missing meal name or calories.' });
    }

    const newMeal: LoggedMeal = {
      id: body.id || `meal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      time: body.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: body.name,
      portion: body.portion || '1 serving',
      calories: Number(body.calories) || 0,
      proteinG: Number(body.proteinG) || 0,
      carbsG: Number(body.carbsG) || 0,
      fatG: Number(body.fatG) || 0,
      source: body.source || 'manual',
    };

    // Avoid duplicate names if requested
    const existingIndex = loggedMealsStore.findIndex((m) => m.id === newMeal.id);
    if (existingIndex >= 0) {
      loggedMealsStore[existingIndex] = newMeal;
    } else {
      loggedMealsStore.push(newMeal);
    }

    return res.status(201).json({
      success: true,
      message: 'Meal logged successfully',
      meal: newMeal,
    });
  }

  if (req.method === 'DELETE') {
    const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
    const id = url.searchParams.get('id');

    if (!id) {
      return res.status(400).json({ error: 'Missing meal id parameter.' });
    }

    loggedMealsStore = loggedMealsStore.filter((m) => m.id !== id);
    return res.status(200).json({
      success: true,
      message: `Meal ${id} deleted`,
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

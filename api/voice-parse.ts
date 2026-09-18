export interface ParsedVoiceItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  source: 'voice';
}

const COMMON_VOICE_FOODS: Record<string, { name: string; portion: string; calories: number; proteinG: number; carbsG: number; fatG: number }> = {
  'curd': { name: 'Fresh Curd (Dahi)', portion: '1 cup (200ml)', calories: 95, proteinG: 6, carbsG: 8, fatG: 4 },
  'dahi': { name: 'Fresh Curd (Dahi)', portion: '1 cup (200ml)', calories: 95, proteinG: 6, carbsG: 8, fatG: 4 },
  'yogurt': { name: 'Fresh Curd (Dahi)', portion: '1 cup (200ml)', calories: 95, proteinG: 6, carbsG: 8, fatG: 4 },
  'egg': { name: 'Boiled Country Egg', portion: '1 large unit (50g)', calories: 70, proteinG: 6, carbsG: 0.5, fatG: 5 },
  'boiled egg': { name: 'Boiled Country Egg', portion: '1 large unit (50g)', calories: 70, proteinG: 6, carbsG: 0.5, fatG: 5 },
  'sundal': { name: 'Black Chickpea Sundal', portion: '1 cup (150g)', calories: 180, proteinG: 12, carbsG: 28, fatG: 3 },
  'idli': { name: 'Steamed Rice Idli', portion: '2 pcs (120g)', calories: 160, proteinG: 5, carbsG: 32, fatG: 1 },
  'dosa': { name: 'Crispy Plain Dosa', portion: '1 unit (100g)', calories: 150, proteinG: 3.5, carbsG: 25, fatG: 3 },
  'sambar': { name: 'Vegetable Sambar', portion: '1 bowl (150ml)', calories: 90, proteinG: 3.5, carbsG: 14, fatG: 2 },
  'banana': { name: 'Robusta Banana', portion: '1 medium (100g)', calories: 89, proteinG: 1.1, carbsG: 23, fatG: 0.3 },
  'tea': { name: 'Masala Chai with Milk', portion: '1 cup (120ml)', calories: 75, proteinG: 2, carbsG: 11, fatG: 2.5 },
  'coffee': { name: 'Filter Coffee with Milk', portion: '1 tumbler (150ml)', calories: 85, proteinG: 2.5, carbsG: 12, fatG: 3 },
  'buttermilk': { name: 'Neer Mor (Spiced Buttermilk)', portion: '1 glass (200ml)', calories: 45, proteinG: 3, carbsG: 4, fatG: 1.5 },
  'almonds': { name: 'Raw Almonds', portion: 'Handful (25g)', calories: 145, proteinG: 5.5, carbsG: 5, fatG: 12 },
};

export function parseTranscriptDeterministically(transcript: string): ParsedVoiceItem[] {
  const lower = transcript.toLowerCase();
  const matched: ParsedVoiceItem[] = [];

  // Check for quantities
  const twoEggs = lower.includes('two eggs') || lower.includes('2 eggs') || lower.includes('2 boiled eggs');
  const twoIdlis = lower.includes('two idli') || lower.includes('2 idli') || lower.includes('2 idlis');

  for (const [key, val] of Object.entries(COMMON_VOICE_FOODS)) {
    if (lower.includes(key)) {
      // Check if already matched
      if (matched.some((m) => m.name === val.name)) continue;

      let multiplier = 1;
      let portionText = val.portion;

      if (key.includes('egg') && twoEggs) {
        multiplier = 2;
        portionText = '2 large units (100g)';
      }

      matched.push({
        id: `voice-${key}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: val.name,
        portion: portionText,
        calories: val.calories * multiplier,
        proteinG: +(val.proteinG * multiplier).toFixed(1),
        carbsG: +(val.carbsG * multiplier).toFixed(1),
        fatG: +(val.fatG * multiplier).toFixed(1),
        source: 'voice',
      });
    }
  }

  // Fallback if no exact keywords matched
  if (matched.length === 0) {
    matched.push({
      id: `voice-custom-${Date.now()}`,
      name: `Voice Logged: "${transcript.slice(0, 30)}..."`,
      portion: 'Estimated Serving',
      calories: 120,
      proteinG: 5,
      carbsG: 18,
      fatG: 3,
      source: 'voice',
    });
  }

  return matched;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const transcript = (body.transcript || '').trim();

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript string is required in request body.' });
  }

  let items = parseTranscriptDeterministically(transcript);

  // If GEMINI_API_KEY is available, we can optionally enhance using Gemini AI
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== '') {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Parse this voice diet log into JSON: "${transcript}".
Format: array of items: [{"name": string, "portion": string, "calories": number, "proteinG": number, "carbsG": number, "fatG": number}].
Return pure JSON only.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      const responseText = response.text?.trim() || '';
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const aiParsed = JSON.parse(cleanJson);
      if (Array.isArray(aiParsed) && aiParsed.length > 0) {
        items = aiParsed.map((item: any, idx: number) => ({
          id: `voice-ai-${idx}-${Date.now()}`,
          name: item.name,
          portion: item.portion || '1 serving',
          calories: Number(item.calories) || 100,
          proteinG: Number(item.proteinG) || 5,
          carbsG: Number(item.carbsG) || 15,
          fatG: Number(item.fatG) || 2,
          source: 'voice' as const,
        }));
      }
    } catch (e) {
      // Graceful fallback to deterministic parsing
      console.info('Gemini AI parsing fallback used:', e);
    }
  }

  const totalCalories = items.reduce((acc, i) => acc + i.calories, 0);
  const totalProtein = +items.reduce((acc, i) => acc + i.proteinG, 0).toFixed(1);

  return res.status(200).json({
    success: true,
    transcript,
    parsedCount: items.length,
    items,
    totals: {
      calories: totalCalories,
      proteinG: totalProtein,
    },
  });
}

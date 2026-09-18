export interface RegionalRecommendationItem {
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
}

export const TN_RECOMMENDATIONS: RegionalRecommendationItem[] = [
  {
    id: 'sundal',
    title: '1 Cup Sundal (Black Chickpeas)',
    tamilTitle: 'கொண்டைக்கடலை சுண்டல்',
    description: 'Tempered with mustard seeds, curry leaves & grated coconut. Low glycemic index & high fiber.',
    proteinG: 12,
    calories: 180,
    priceInr: 20,
    availabilityPercent: 95,
    dietaryType: 'Vegan',
    badge: 'Popular TN Snack',
  },
  {
    id: 'boiled-eggs',
    title: '2 Boiled Country Eggs',
    tamilTitle: 'வேகவைத்த முட்டை (2)',
    description: 'High biological value complete protein. Zero carbohydrates, ideal for diabetic blood sugar stability.',
    proteinG: 12,
    calories: 140,
    priceInr: 14,
    availabilityPercent: 95,
    dietaryType: 'Non-Vegetarian',
    badge: 'Fastest Prep',
  },
  {
    id: 'curd-buttermilk',
    title: '200ml Fresh Curd / Spiced Neer Mor',
    tamilTitle: 'தாளித்த மோர் / தயிர்',
    description: 'Spiced with ginger, green chili and asafoetida. Probiotic-rich gut booster with bioavailable casein.',
    proteinG: 6,
    calories: 95,
    priceInr: 15,
    availabilityPercent: 90,
    dietaryType: 'Vegetarian',
    badge: 'Cooling Gut Probiotic',
  },
  {
    id: 'moong-dal',
    title: '1 Cup Thick Moong Dal Tadka',
    tamilTitle: 'பாசிப்பருப்பு கடையல்',
    description: 'Light on stomach, rich in essential amino acids, cumin and garlic for optimal digestion.',
    proteinG: 14,
    calories: 210,
    priceInr: 25,
    availabilityPercent: 90,
    dietaryType: 'Vegetarian',
    badge: 'Traditional Comfort',
  },
  {
    id: 'paneer-tikka-tn',
    title: '100g Grilled Paneer with Curry Leaf Masala',
    tamilTitle: 'பன்னீர் மசாலா',
    description: 'High protein vegetarian option with south Indian curry leaf tempering.',
    proteinG: 18,
    calories: 260,
    priceInr: 45,
    availabilityPercent: 85,
    dietaryType: 'Vegetarian',
    badge: 'High Protein',
  },
  {
    id: 'fish-curry-meen',
    title: '1 Piece Tamil Nadu Meen Kuzhambu (Steamed Fish)',
    tamilTitle: 'மீன் குழம்பு மீன் துண்டு',
    description: 'Rich in Omega-3 fatty acids and lean protein. Low carb, heart-healthy option.',
    proteinG: 16,
    calories: 150,
    priceInr: 50,
    availabilityPercent: 80,
    dietaryType: 'Non-Vegetarian',
    badge: 'Heart Healthy & Lean',
  },
];

export function filterRecommendations(
  items: RegionalRecommendationItem[],
  filters: { dietaryType?: string; maxPrice?: number; minProtein?: number }
) {
  return items.filter((rec) => {
    if (filters.dietaryType && filters.dietaryType !== 'All') {
      if (rec.dietaryType.toLowerCase() !== filters.dietaryType.toLowerCase()) {
        return false;
      }
    }
    if (filters.maxPrice && rec.priceInr > filters.maxPrice) {
      return false;
    }
    if (filters.minProtein && rec.proteinG < filters.minProtein) {
      return false;
    }
    return true;
  });
}

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const dietaryType = url.searchParams.get('dietaryType') || 'All';
  const maxPrice = url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined;
  const minProtein = url.searchParams.get('minProtein') ? Number(url.searchParams.get('minProtein')) : undefined;

  const results = filterRecommendations(TN_RECOMMENDATIONS, {
    dietaryType,
    maxPrice,
    minProtein,
  });

  return res.status(200).json({
    success: true,
    region: 'Tamil Nadu, India',
    totalAvailable: TN_RECOMMENDATIONS.length,
    matchedCount: results.length,
    recommendations: results,
    suggestedCombo: {
      items: ['1 Cup Sundal (+12g)', '2 Boiled Eggs (+12g)'],
      totalProteinG: 24,
      totalPriceInr: 34,
      deficitsClosedSummary: 'Closes 24g of the 25g protein deficit for under ₹35.',
    },
  });
}

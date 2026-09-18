export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  return res.status(200).json({
    status: 'ok',
    service: 'AuraFix Nutrition PWA API',
    architecture: 'Vercel Serverless',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: [
      'Differential Consumption Engine',
      'Tamil Nadu Regional Recommendation Matcher',
      'Conversational Voice NLP Logging',
      'Offline-First PWA Support'
    ]
  });
}

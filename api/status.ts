import { getApiKey } from './_lib/gemini.ts';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = getApiKey();
  const hasGeminiKey = Boolean(apiKey && apiKey.length > 0);

  console.log(`[ToolNova Status] Vercel function /api/status invoked. hasGeminiKey: ${hasGeminiKey}`);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res.status(200).json({
    status: 'online',
    appName: 'ToolNova',
    hasGeminiKey,
    supportedToolsCount: 30,
    timestamp: new Date().toISOString()
  });
}

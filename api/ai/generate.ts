import { buildAiPrompts, createGeminiClient, getApiKey, ThinkingLevel } from '../_lib/gemini.ts';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST is supported' });
  }

  const startTime = Date.now();
  console.log('[ToolNova Generate] Invoked on Vercel runtime');

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn('[ToolNova Generate] Missing GEMINI_API_KEY in environment variables');
      return res.status(503).json({
        error: 'MISSING_API_KEY',
        message: 'GEMINI_API_KEY is not configured in Vercel Environment Variables. Please add GEMINI_API_KEY to your Vercel project settings.'
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { toolId, input, options = {} } = body;

    if (!input || typeof input !== 'string' || !input.trim()) {
      return res.status(400).json({
        error: 'INVALID_INPUT',
        message: 'Please provide valid text input.'
      });
    }

    const ai = createGeminiClient(apiKey);
    const speedMode: 'turbo' | 'precision' = options.speedMode || 'turbo';
    const { systemInstruction, userPrompt } = buildAiPrompts(toolId, input, options);

    const modelsToTry = speedMode === 'precision'
      ? ['gemini-3.8-flash', 'gemini-3.1-flash-lite']
      : ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    let lastError: any = null;
    let generatedText = '';
    let modelUsed = '';

    for (const model of modelsToTry) {
      try {
        const config: any = { systemInstruction };
        if (model === 'gemini-3.8-flash') {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        const response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config
        });

        if (response && response.text) {
          generatedText = response.text;
          modelUsed = model;
          break;
        }
      } catch (err: any) {
        console.warn(`[ToolNova Generate] Model ${model} attempt failed:`, err?.message || err);
        lastError = err;
      }
    }

    if (!generatedText) {
      console.error('[ToolNova Generate] All models failed. Last error:', lastError);
      throw lastError || new Error('All AI models were temporarily busy. Please retry.');
    }

    const latencyMs = Date.now() - startTime;
    console.log(`[ToolNova Generate] Success with ${modelUsed} in ${latencyMs}ms`);

    return res.status(200).json({
      success: true,
      result: generatedText,
      modelUsed,
      latencyMs,
      stats: {
        characters: generatedText.length,
        words: generatedText.trim().split(/\s+/).filter(Boolean).length
      }
    });

  } catch (error: any) {
    console.error('[ToolNova Generate Error]', error);
    return res.status(500).json({
      error: 'GENERATION_ERROR',
      message: error?.message || 'An error occurred while contacting the AI processing service.'
    });
  }
}

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
  console.log('[ToolNova Stream] Invoked on Vercel runtime');

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn('[ToolNova Stream] Missing GEMINI_API_KEY in environment variables');
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

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    if (typeof res.flushHeaders === 'function') {
      res.flushHeaders();
    }

    const modelsToTry = speedMode === 'precision'
      ? ['gemini-3.8-flash', 'gemini-3.1-flash-lite']
      : ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    let stream = null;
    let selectedModel = modelsToTry[0];
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const config: any = { systemInstruction };
        if (model === 'gemini-3.8-flash') {
          config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
        }

        stream = await ai.models.generateContentStream({
          model,
          contents: userPrompt,
          config
        });
        selectedModel = model;
        break;
      } catch (err: any) {
        console.warn(`[ToolNova Stream] Model ${model} stream attempt failed:`, err?.message || err);
        lastError = err;
      }
    }

    if (!stream) {
      console.error('[ToolNova Stream] Failed to initialize stream on all models', lastError);
      res.write(`event: error\ndata: ${JSON.stringify({ message: lastError?.message || 'AI service temporarily unavailable' })}\n\n`);
      return res.end();
    }

    let fullText = '';
    for await (const chunk of stream) {
      const text = chunk.text || '';
      if (text) {
        fullText += text;
        res.write(`event: chunk\ndata: ${JSON.stringify({ text })}\n\n`);
      }
    }

    const latencyMs = Date.now() - startTime;
    console.log(`[ToolNova Stream] Stream completed with ${selectedModel} in ${latencyMs}ms`);

    res.write(`event: done\ndata: ${JSON.stringify({
      done: true,
      modelUsed: selectedModel,
      latencyMs,
      stats: {
        characters: fullText.length,
        words: fullText.trim().split(/\s+/).filter(Boolean).length
      }
    })}\n\n`);

    res.end();
  } catch (error: any) {
    console.error('[ToolNova Stream Error]', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'STREAM_ERROR',
        message: error?.message || 'Error occurred while streaming AI response.'
      });
    } else {
      res.write(`event: error\ndata: ${JSON.stringify({ message: error?.message || 'Streaming interrupted' })}\n\n`);
      res.end();
    }
  }
}

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildAiPrompts, createGeminiClient, getApiKey, ThinkingLevel } from './api/_lib/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health / Status endpoint
app.get('/api/status', (req, res) => {
  const apiKey = getApiKey();
  const hasGeminiKey = Boolean(apiKey && apiKey.length > 0);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.json({
    status: 'online',
    appName: 'ToolNova',
    hasGeminiKey,
    supportedToolsCount: 30,
    timestamp: new Date().toISOString()
  });
});

// Dynamic SEO robots.txt
app.get('/robots.txt', (req, res) => {
  const host = process.env.APP_URL || `http://${req.headers.host || 'localhost:3000'}`;
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${host}/sitemap.xml
`);
});

// All 30 tool slugs for SEO sitemap
const TOOL_SLUGS = [
  'ai-humanizer',
  'ai-text-rewriter',
  'ai-paragraph-generator',
  'ai-email-writer',
  'ai-essay-writer',
  'ai-text-summarizer',
  'meta-tag-generator',
  'meta-description-checker',
  'keyword-density-checker',
  'robots-txt-generator',
  'xml-sitemap-generator',
  'serp-snippet-preview',
  'image-compressor',
  'image-resizer',
  'jpg-to-png-converter',
  'png-to-webp-converter',
  'image-cropper',
  'pdf-merger',
  'pdf-splitter',
  'pdf-compressor',
  'pdf-to-image',
  'image-to-pdf',
  'json-formatter',
  'json-validator',
  'base64-encoder-decoder',
  'url-encoder-decoder',
  'html-minifier',
  'css-minifier',
  'javascript-minifier',
  'uuid-generator'
];

// Dynamic XML Sitemap
app.get('/sitemap.xml', (req, res) => {
  const host = process.env.APP_URL || `http://${req.headers.host || 'localhost:3000'}`;
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    '',
    '/all-tools',
    '/ai-writing-tools',
    '/seo-tools',
    '/image-tools',
    '/pdf-tools',
    '/developer-tools',
    '/about-us',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/affiliate-disclosure',
    '/pricing',
    '/premium',
    '/faq'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach((p) => {
    xml += `
  <url>
    <loc>${host}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  TOOL_SLUGS.forEach((slug) => {
    xml += `
  <url>
    <loc>${host}/tools/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// Low-latency generator helper with automatic fallback & timeout protection
async function executeGeminiWithFallback(
  ai: ReturnType<typeof createGeminiClient>,
  systemInstruction: string,
  userPrompt: string,
  speedMode: 'turbo' | 'precision' = 'turbo'
) {
  // Speed-first hierarchy:
  // turbo: gemini-3.1-flash-lite (fastest TTFT ~1s, immune to 3.8-flash high-demand spikes)
  // precision: gemini-3.8-flash with ThinkingLevel.LOW (fast reasoning without stalling)
  const modelsToTry = speedMode === 'precision'
    ? ['gemini-3.8-flash', 'gemini-3.1-flash-lite']
    : ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const config: any = {
        systemInstruction,
      };

      // Apply low thinking level for 3.8-flash to prevent multi-minute reasoning stalls
      if (model === 'gemini-3.8-flash') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      }

      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config
      });

      if (response && response.text) {
        return {
          text: response.text,
          modelUsed: model
        };
      }
    } catch (err: any) {
      console.warn(`[AI Engine] Model ${model} failed or high demand, attempting fallback. Error:`, err?.message || err);
      lastError = err;
      // Continue to next model in chain immediately
    }
  }

  throw lastError || new Error('All AI models were temporarily busy. Please retry in a few moments.');
}

// AI Writing Tools Route - Streaming SSE Endpoint for Real-Time Speed
app.post('/api/ai/stream', async (req, res) => {
  const startTime = Date.now();
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(503).json({
        error: 'MISSING_API_KEY',
        message: 'GEMINI_API_KEY is not configured on the server. AI Writing Tools require a valid Gemini API key in environment variables or secrets settings.'
      });
    }

    const { toolId, input, options = {} } = req.body;
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
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    // Models to attempt for streaming
    const modelsToTry = speedMode === 'precision'
      ? ['gemini-3.8-flash', 'gemini-3.1-flash-lite']
      : ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    let stream = null;
    let selectedModel = modelsToTry[0];

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
        console.warn(`[AI Stream] Model ${model} streaming init failed:`, err?.message || err);
      }
    }

    if (!stream) {
      res.write(`event: error\ndata: ${JSON.stringify({ message: 'AI generation service is momentarily experiencing high demand. Please retry.' })}\n\n`);
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
    console.error('Error during AI streaming:', error);
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
});

// AI Writing Tools Route - Standard Fast JSON Endpoint
app.post('/api/ai/generate', async (req, res) => {
  const startTime = Date.now();
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(503).json({
        error: 'MISSING_API_KEY',
        message: 'GEMINI_API_KEY is not configured on the server. AI Writing Tools require a valid Gemini API key in environment variables or secrets settings.'
      });
    }

    const { toolId, input, options = {} } = req.body;
    if (!input || typeof input !== 'string' || !input.trim()) {
      return res.status(400).json({
        error: 'INVALID_INPUT',
        message: 'Please provide valid text input.'
      });
    }

    const ai = createGeminiClient(apiKey);

    const speedMode: 'turbo' | 'precision' = options.speedMode || 'turbo';
    const { systemInstruction, userPrompt } = buildAiPrompts(toolId, input, options);

    const { text, modelUsed } = await executeGeminiWithFallback(ai, systemInstruction, userPrompt, speedMode);
    const latencyMs = Date.now() - startTime;

    return res.json({
      success: true,
      result: text,
      modelUsed,
      latencyMs,
      stats: {
        characters: text.length,
        words: text.trim().split(/\s+/).filter(Boolean).length
      }
    });

  } catch (error: any) {
    console.error('Error generating AI text:', error);
    return res.status(500).json({
      error: 'GENERATION_ERROR',
      message: error?.message || 'An error occurred while contacting the AI processing service.'
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`ToolNova server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

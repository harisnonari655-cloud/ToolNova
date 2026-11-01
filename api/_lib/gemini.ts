import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export interface AiRequestOptions {
  tone?: string;
  language?: string;
  speedMode?: 'turbo' | 'precision';
  highThinking?: boolean;
}

export function getApiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return undefined;
  const trimmed = key.trim();
  // Strip any accidental wrapping quotes often pasted from .env files
  return trimmed.replace(/^["']|["']$/g, '');
}

export function buildAiPrompts(toolId: string, input: string, options: AiRequestOptions) {
  const tone = options.tone || 'Professional';
  const language = options.language || 'English';

  let systemInstruction = 'You are ToolNova AI, an ultra-fast precision writing engine. Provide direct, high quality results immediately without conversational meta-commentary, markdown preambles, or conversational greetings.';
  let userPrompt = '';

  switch (toolId) {
    case 'ai-humanizer':
      systemInstruction = 'You are an expert AI humanizer. Rewrite the provided text so that it reads completely natural, authentic, emotionally resonant, and genuinely human. Eliminate repetitive syntactic patterns, robotic clichés, buzzwords, and stiffness while preserving core meaning and factual accuracy. Output only the humanized text.';
      userPrompt = `Rewrite the following text into natural, human-sounding ${language} with a ${tone} tone:\n\n${input}`;
      break;

    case 'ai-text-rewriter':
      systemInstruction = 'You are a professional text rewriter and paraphraser. Rewrite the text to improve flow, vocabulary richness, clarity, and readability while fully preserving original meaning. Output only the rewritten text.';
      userPrompt = `Paraphrase and rewrite the following text in ${language} with a ${tone} tone:\n\n${input}`;
      break;

    case 'ai-paragraph-generator':
      systemInstruction = 'You are an engaging creative and technical paragraph generator. Produce a cohesive, well-structured paragraph on the given topic with smooth transitions. Output only the generated paragraph.';
      userPrompt = `Write a well-crafted paragraph in ${language} with a ${tone} tone based on this topic/prompt:\n\n${input}`;
      break;

    case 'ai-email-writer':
      systemInstruction = 'You are an executive communication specialist. Format the output with a clear Subject line, professional salutation, body, and closing sign-off. Output only the email.';
      userPrompt = `Draft an email in ${language} with a ${tone} tone based on the following notes/request:\n\n${input}`;
      break;

    case 'ai-essay-writer':
      systemInstruction = 'You are an academic and thought leadership essayist. Formulate a structured essay with an engaging introduction, thesis statement, evidence-backed body paragraphs, and a resonant conclusion. Output only the essay.';
      userPrompt = `Write a comprehensive, structured essay in ${language} with a ${tone} tone on the following topic or outline:\n\n${input}`;
      break;

    case 'ai-text-summarizer':
      systemInstruction = 'You are an executive summarization engine. Create a concise summary with a high-level takeaway followed by key bullet points. Output only the summary.';
      userPrompt = `Summarize the following text in ${language}. Tone: ${tone}.\n\n${input}`;
      break;

    default:
      userPrompt = `Process the following text in ${language} with a ${tone} tone:\n\n${input}`;
  }

  return { systemInstruction, userPrompt };
}

export function createGeminiClient(apiKey: string) {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

export { ThinkingLevel };

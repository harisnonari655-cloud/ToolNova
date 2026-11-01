import React, { useState, useRef, useEffect } from 'react';
import { useToolNova } from '../../../context/ToolNovaContext';
import { Copy, Trash2, Download, Sparkles, Zap, ShieldAlert, Check, RefreshCw, AlertCircle, Square, Clock } from 'lucide-react';

interface AiWritingToolProps {
  toolId: string;
  toolName: string;
  defaultPlaceholder: string;
  defaultSample: string;
}

export const AiWritingTool: React.FC<AiWritingToolProps> = ({
  toolId,
  toolName,
  defaultPlaceholder,
  defaultSample
}) => {
  const { showToast, hasGeminiKey, incrementAiUsage } = useToolNova();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Professional');
  const [language, setLanguage] = useState('English');
  const [speedMode, setSpeedMode] = useState<'turbo' | 'precision'>('turbo');
  const [lastStats, setLastStats] = useState<{ characters: number; words: number; modelUsed?: string; latencyMs?: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<any>(null);

  const inputCharCount = input.length;
  const inputWordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setLoading(false);
    showToast('Generation cancelled', 'info');
  };

  const handleProcess = async () => {
    if (!input.trim()) {
      showToast('Please enter some text to process.', 'warning');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setOutput('');
    setElapsedTime(0);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.round((Date.now() - startTime) / 100) / 10);
    }, 100);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Safety timeout: automatically abort after 20 seconds so user never waits 5 minutes
    const safetyTimeout = setTimeout(() => {
      controller.abort();
    }, 20000);

    try {
      // First attempt: Ultra-fast real-time SSE streaming
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          toolId,
          input,
          options: {
            tone,
            language,
            speedMode
          }
        })
      });

      clearTimeout(safetyTimeout);

      if (!response.ok || !response.body) {
        // If stream endpoint failed before streaming (e.g. 503 missing key), parse json error
        let errData: any = {};
        try {
          errData = await response.json();
        } catch {}

        if (errData.error === 'MISSING_API_KEY') {
          setErrorMessage('Server GEMINI_API_KEY is not configured. Add GEMINI_API_KEY to environment variables to enable live generation.');
          showToast('API key required', 'warning');
        } else {
          setErrorMessage(errData.message || 'AI generation encountered an issue. Retrying with standard mode...');
          // Fallback to standard fast endpoint
          await handleFallbackGenerate(controller.signal);
        }
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedOutput = '';
      let receivedDone = false;
      let finalModel = speedMode === 'turbo' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';
      let latencyMs = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        const lines = chunkText.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('data: ')) {
            const rawData = line.slice(6).trim();
            if (!rawData) continue;

            try {
              const parsed = JSON.parse(rawData);
              if (parsed.text) {
                streamedOutput += parsed.text;
                setOutput(streamedOutput);
              }
              if (parsed.done) {
                receivedDone = true;
                if (parsed.modelUsed) finalModel = parsed.modelUsed;
                if (parsed.latencyMs) latencyMs = parsed.latencyMs;
              }
              if (parsed.message && !parsed.text) {
                throw new Error(parsed.message);
              }
            } catch (err: any) {
              // Ignore non-json or chunk boundaries
            }
          }
        }
      }

      if (!streamedOutput.trim() && !receivedDone) {
        // Fallback to standard generate
        await handleFallbackGenerate(controller.signal);
        return;
      }

      const totalTime = latencyMs || (Date.now() - startTime);
      setLastStats({
        characters: streamedOutput.length,
        words: streamedOutput.trim().split(/\s+/).filter(Boolean).length,
        modelUsed: finalModel,
        latencyMs: totalTime
      });

      incrementAiUsage();
      showToast(`Generated in ${(totalTime / 1000).toFixed(1)}s!`, 'success');

    } catch (err: any) {
      clearTimeout(safetyTimeout);
      if (err.name === 'AbortError') {
        if (Date.now() - startTime >= 19000) {
          setErrorMessage('The request timed out after 20 seconds. Please switch to Turbo Speed Mode and try again.');
          showToast('Request timed out', 'error');
        }
      } else {
        console.error(err);
        setErrorMessage('Could not complete generation. Retrying with Turbo Fast Mode...');
        try {
          await handleFallbackGenerate();
        } catch {
          setErrorMessage('Could not connect to the ToolNova AI processing endpoint.');
          showToast('Generation error', 'error');
        }
      }
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  // Graceful fallback to /api/ai/generate
  const handleFallbackGenerate = async (signal?: AbortSignal) => {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        toolId,
        input,
        options: {
          tone,
          language,
          speedMode: 'turbo' // Force turbo for maximum speed
        }
      })
    });

    const data = await res.json();
    if (data.success && data.result) {
      setOutput(data.result);
      setLastStats({
        characters: data.result.length,
        words: data.result.trim().split(/\s+/).filter(Boolean).length,
        modelUsed: data.modelUsed,
        latencyMs: data.latencyMs
      });
      incrementAiUsage();
      setErrorMessage(null);
      showToast(`Generated in ${((data.latencyMs || 2000) / 1000).toFixed(1)}s!`, 'success');
    } else {
      setErrorMessage(data.message || 'Generation failed.');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast('Output copied to clipboard!', 'success');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setLastStats(null);
    setErrorMessage(null);
    showToast('Cleared input & output', 'info');
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolId}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded text file', 'success');
  };

  const handleLoadSample = () => {
    setInput(defaultSample);
    showToast('Loaded sample text', 'info');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 shadow-xl space-y-6">
      {/* Missing Key Honest Notice */}
      {hasGeminiKey === false && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block text-amber-300 font-semibold mb-0.5">
              Live AI Service Status: API Key Required
            </strong>
            <p className="text-amber-200/90 leading-relaxed">
              AI Writing tools execute securely on the server via the Google Gemini API. To enable live generation, add <code className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-amber-300">GEMINI_API_KEY</code> in your environment variables. No fake or canned AI text will be presented.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block text-rose-300 font-semibold mb-0.5">Notice</strong>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Control bar: Tone, Language, Speed Mode selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
        {/* Tone Selector */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Tone of Voice</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Professional">Professional & Polished</option>
            <option value="Casual">Casual & Conversational</option>
            <option value="Academic">Academic & Rigorous</option>
            <option value="Creative">Creative & Engaging</option>
            <option value="Concise">Direct & Concise</option>
            <option value="Persuasive">Persuasive & Compelling</option>
          </select>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Output Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="English">English (Global)</option>
            <option value="Spanish">Spanish (Español)</option>
            <option value="French">French (Français)</option>
            <option value="German">German (Deutsch)</option>
            <option value="Portuguese">Portuguese (Português)</option>
            <option value="Japanese">Japanese (日本語)</option>
            <option value="Hindi">Hindi (हिन्दी)</option>
          </select>
        </div>

        {/* Speed Mode Selector */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">Speed & Engine</label>
          <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-700/80">
            <button
              type="button"
              onClick={() => setSpeedMode('turbo')}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded-md font-medium text-[11px] transition-all ${
                speedMode === 'turbo'
                  ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-300" />
              Turbo (~1s)
            </button>
            <button
              type="button"
              onClick={() => setSpeedMode('precision')}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded-md font-medium text-[11px] transition-all ${
                speedMode === 'precision'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-indigo-300" />
              Precision
            </button>
          </div>
        </div>
      </div>

      {/* Input / Output Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              Source Input
              <span className="font-normal text-slate-500">
                ({inputWordCount} words, {inputCharCount} chars)
              </span>
            </span>
            <button
              onClick={handleLoadSample}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline-offset-2 hover:underline"
            >
              Insert Sample Text
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={defaultPlaceholder}
            rows={10}
            className="w-full flex-1 min-h-[220px] p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/80 resize-y"
          />

          <div className="flex items-center justify-between mt-3 gap-2">
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset
            </button>

            {loading ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Square className="w-3 h-3 fill-rose-300" />
                  Cancel
                </button>
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-indigo-600/50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-wait"
                >
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Streaming ({elapsedTime.toFixed(1)}s)...</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleProcess}
                disabled={!input.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Execute {toolName}</span>
              </button>
            )}
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              Result Output
              {lastStats && (
                <span className="font-normal text-slate-400">
                  ({lastStats.words} words, {lastStats.characters} chars)
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {lastStats?.latencyMs && (
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {(lastStats.latencyMs / 1000).toFixed(1)}s
                </span>
              )}
              {lastStats?.modelUsed && (
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-1.5 py-0.5 rounded">
                  {lastStats.modelUsed}
                </span>
              )}
            </div>
          </div>

          <div className="relative flex-1 min-h-[220px]">
            <textarea
              readOnly
              value={output}
              placeholder={loading ? 'Streaming output in real-time...' : 'Your refined result will appear here after clicking execute...'}
              rows={10}
              className={`w-full h-full min-h-[220px] p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-100 placeholder-slate-600 text-sm focus:outline-none resize-y font-normal leading-relaxed transition-all ${
                loading ? 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : ''
              }`}
            />
            {loading && output.length === 0 && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-center p-4">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
                <p className="text-sm font-semibold text-white">Connecting to High-Speed Engine</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  {speedMode === 'turbo'
                    ? 'Gemini 3.1 Flash Lite active • ultra-low latency response in ~1s'
                    : 'Gemini 3.8 Flash active • precision language synthesis'}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-500/30">
                  <Clock className="w-3 h-3 animate-pulse" />
                  Elapsed: {elapsedTime.toFixed(1)}s
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Streaming enabled • Zero lag</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 disabled:opacity-40 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Output
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 disabled:opacity-40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download .TXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

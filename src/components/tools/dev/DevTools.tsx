import React, { useState, useMemo } from 'react';
import { useToolNova } from '../../../context/ToolNovaContext';
import {
  Copy,
  Download,
  Trash2,
  Check,
  AlertTriangle,
  Code,
  FileCode,
  Braces,
  Binary,
  Link,
  Fingerprint,
  RefreshCw
} from 'lucide-react';

// -------------------------------------------------------------
// TOOL 23: JSON Formatter
// -------------------------------------------------------------
export const JsonFormatterTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [input, setInput] = useState(
    '{"service":"ToolNova","status":"active","stats":{"toolsCount":30,"pricing":"free","features":["AI Writing","Image Tools","PDF Suite","Dev Utils"]}}'
  );
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutput(formatted);
      setError(null);
      showToast(spaces === 0 ? 'Minified JSON!' : `Formatted with ${spaces} spaces!`, 'success');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
      showToast('Invalid JSON syntax', 'error');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    showToast('Copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(u);
    showToast('Downloaded formatted.json', 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Indentation:</span>
          <button
            onClick={() => {
              setIndent(2);
              formatJson(2);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              indent === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            2 Spaces
          </button>
          <button
            onClick={() => {
              setIndent(4);
              formatJson(4);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              indent === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            4 Spaces
          </button>
          <button
            onClick={() => {
              setIndent(0);
              formatJson(0);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              indent === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Compact / Minify
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => formatJson(indent)}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Format JSON
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-semibold text-slate-400">Raw Input JSON</span>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError(null);
              }}
              className="text-slate-500 hover:text-rose-400"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={14}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-semibold text-indigo-400">Formatted Output</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            rows={14}
            value={output}
            placeholder="Formatted JSON will appear here..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 24: JSON Validator
// -------------------------------------------------------------
export const JsonValidatorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [input, setInput] = useState(
    '{\n  "name": "ToolNova",\n  "status": "ready",\n  "tools": 30,\n  "supportedCategories": [\n    "AI Writing",\n    "SEO Tools",\n    "Image Studio",\n    "PDF Tools",\n    "Developer Utilities"\n  ]\n}'
  );
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    details?: { totalKeys: number; depth: number };
  } | null>(null);

  const validate = () => {
    try {
      if (!input.trim()) {
        setValidationResult(null);
        return;
      }
      const parsed = JSON.parse(input);

      // Inspect depth and key counts
      let totalKeys = 0;
      function countKeys(obj: any): number {
        if (typeof obj !== 'object' || obj === null) return 0;
        let c = Object.keys(obj).length;
        for (const k of Object.keys(obj)) {
          c += countKeys(obj[k]);
        }
        return c;
      }
      totalKeys = countKeys(parsed);

      setValidationResult({
        valid: true,
        message: 'Valid JSON! RFC 8259 compliant syntax confirmed.',
        details: { totalKeys, depth: 3 }
      });
      showToast('JSON is 100% valid!', 'success');
    } catch (err: any) {
      setValidationResult({
        valid: false,
        message: err.message || 'Syntax error in JSON string'
      });
      showToast('Invalid JSON syntax', 'error');
    }
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-300">Strict JSON Syntax Validator</span>
        <button
          onClick={validate}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
        >
          Validate Syntax
        </button>
      </div>

      <textarea
        rows={12}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON to validate..."
        className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
      />

      {validationResult && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
            validationResult.valid
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}
        >
          {validationResult.valid ? (
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <strong className="block font-bold mb-1">
              {validationResult.valid ? 'Syntax Status: Valid' : 'Syntax Status: Error Found'}
            </strong>
            <p className="leading-relaxed">{validationResult.message}</p>
            {validationResult.details && (
              <p className="mt-1 text-[11px] opacity-80">
                Total parsed keys / elements: {validationResult.details.totalKeys}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 25: Base64 Encoder/Decoder
// -------------------------------------------------------------
export const Base64Tool: React.FC = () => {
  const { showToast } = useToolNova();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('ToolNova: Powerful Tools. Smarter Work.');
  const [urlSafe, setUrlSafe] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return '';
    try {
      if (mode === 'encode') {
        // UTF-8 safe encode
        const bytes = new TextEncoder().encode(input);
        let binary = '';
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return b64;
      } else {
        // Decode
        let str = input.trim();
        if (urlSafe) {
          str = str.replace(/-/g, '+').replace(/_/g, '/');
          while (str.length % 4) str += '=';
        }
        const binary = atob(str);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
      }
    } catch (err: any) {
      return `Error: Malformed Base64 string (${err.message})`;
    }
  }, [input, mode, urlSafe]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    showToast('Copied output to clipboard!', 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${
              mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Encode to Base64
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${
              mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Decode from Base64
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          URL-Safe Mode (- and _ without padding)
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input String'}
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-indigo-400">
              {mode === 'encode' ? 'Base64 Result' : 'Decoded Text'}
            </span>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 disabled:opacity-40"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 26: URL Encoder/Decoder
// -------------------------------------------------------------
export const UrlEncoderDecoderTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [componentMode, setComponentMode] = useState(true);
  const [input, setInput] = useState('https://toolnova.app/search?query=AI tools & fast pdf=true');

  const output = useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        return componentMode ? encodeURIComponent(input) : encodeURI(input);
      } else {
        return componentMode ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch (err: any) {
      return `Error decoding URL: ${err.message}`;
    }
  }, [input, mode, componentMode]);

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${
              mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            URL Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${
              mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            URL Decode
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={componentMode}
            onChange={(e) => setComponentMode(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          Encode Special Symbols (&, =, ?, /)
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Input URL or Text</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-indigo-400">Processed Output</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(output);
                showToast('Copied URL to clipboard!', 'success');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <textarea
            readOnly
            rows={10}
            value={output}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 27: HTML Minifier
// -------------------------------------------------------------
export const HtmlMinifierTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [input, setInput] = useState(
    `<!DOCTYPE html>\n<!-- Page Header -->\n<html lang="en">\n  <head>\n    <title> Welcome to ToolNova </title>\n  </head>\n  <body>\n    <div class="hero container">\n      <h1> Powerful Tools. Smarter Work. </h1>\n    </div>\n  </body>\n</html>`
  );

  const minified = useMemo(() => {
    if (!input.trim()) return '';
    // Strip HTML comments (preserving conditional comments)
    let res = input.replace(/<!--(?!\s*\[if[\s\S]+?]|<!|>)(?:(?!-->)[\s\S])*-->/g, '');
    // Collapse multi-spaces & line breaks between tags
    res = res.replace(/>\s+</g, '><');
    res = res.replace(/\s{2,}/g, ' ');
    return res.trim();
  }, [input]);

  const bytesSaved = input.length - minified.length;
  const pctSaved = input.length > 0 ? Math.round((bytesSaved / input.length) * 100) : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Original: <span className="text-white font-mono">{input.length} B</span> → Minified:{' '}
          <span className="text-emerald-400 font-mono font-bold">{minified.length} B</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
          -{pctSaved}% Saved ({bytesSaved} bytes)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Original HTML</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-indigo-400">Minified HTML</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(minified);
                showToast('Copied minified HTML!', 'success');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <textarea
            readOnly
            rows={12}
            value={minified}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 28: CSS Minifier
// -------------------------------------------------------------
export const CssMinifierTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [input, setInput] = useState(
    `/* Navigation Header Styles */\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 2rem;\n  background-color: #0b0f19;\n}\n\n.navbar .brand {\n  font-weight: 700;\n  color: #ffffff;\n}`
  );

  const minified = useMemo(() => {
    if (!input.trim()) return '';
    let res = input;
    // Strip comments
    res = res.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove space around operators, braces, colons, semicolons
    res = res.replace(/\s*([\{\}:;,])\s*/g, '$1');
    // Remove trailing semicolons in blocks
    res = res.replace(/;}/g, '}');
    // Compress multiple spaces
    res = res.replace(/\s+/g, ' ');
    return res.trim();
  }, [input]);

  const bytesSaved = input.length - minified.length;
  const pctSaved = input.length > 0 ? Math.round((bytesSaved / input.length) * 100) : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Original: <span className="text-white font-mono">{input.length} B</span> → Minified:{' '}
          <span className="text-emerald-400 font-mono font-bold">{minified.length} B</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
          -{pctSaved}% Saved ({bytesSaved} bytes)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Source CSS</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-indigo-400">Minified CSS</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(minified);
                showToast('Copied minified CSS!', 'success');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <textarea
            readOnly
            rows={12}
            value={minified}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 29: JavaScript Minifier
// -------------------------------------------------------------
export const JsMinifierTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [input, setInput] = useState(
    `// Helper to compute discount\nfunction applyDiscount(price, discountPercent) {\n  /* Check validity */\n  if (discountPercent <= 0) {\n    return price;\n  }\n  const discountAmount = price * (discountPercent / 100);\n  return price - discountAmount;\n}`
  );

  const minified = useMemo(() => {
    if (!input.trim()) return '';
    let res = input;
    // Remove multi-line comments
    res = res.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove single line comments
    res = res.replace(/(^|[^\\])\/\/.*$/gm, '$1');
    // Remove superfluous spaces around operators and braces
    res = res.replace(/\s*([\{\}\(\)\=;,+\-*\/])\s*/g, '$1');
    // Collapse whitespace
    res = res.replace(/\s+/g, ' ');
    return res.trim();
  }, [input]);

  const bytesSaved = input.length - minified.length;
  const pctSaved = input.length > 0 ? Math.round((bytesSaved / input.length) * 100) : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Original: <span className="text-white font-mono">{input.length} B</span> → Minified:{' '}
          <span className="text-emerald-400 font-mono font-bold">{minified.length} B</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">
          -{pctSaved}% Saved ({bytesSaved} bytes)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Source JavaScript</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-indigo-400">Minified JavaScript</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(minified);
                showToast('Copied minified JS!', 'success');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <textarea
            readOnly
            rows={12}
            value={minified}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 30: UUID Generator
// -------------------------------------------------------------
export const UuidGeneratorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const createUuidBatch = (qty: number, upper: boolean, withHyphens: boolean): string[] => {
    const list: string[] = [];
    for (let i = 0; i < qty; i++) {
      let id: string = crypto.randomUUID();
      if (!withHyphens) id = id.replace(/-/g, '');
      if (upper) id = id.toUpperCase();
      list.push(id);
    }
    return list;
  };

  const [uuids, setUuids] = useState<string[]>(() => createUuidBatch(5, false, true));

  const generateUuids = (qty = count, upper = uppercase, withHyphens = hyphens) => {
    const list = createUuidBatch(qty, upper, withHyphens);
    setUuids(list);
    showToast(`Generated ${qty} cryptographically secure UUID(s)!`, 'success');
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    showToast(`Copied ${uuids.length} UUIDs to clipboard!`, 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Quantity (1 - 100)
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
          />
        </div>

        <div className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            id="hyphens"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          <label htmlFor="hyphens" className="text-xs text-slate-300 cursor-pointer">
            With Hyphens
          </label>
        </div>

        <div className="flex items-center gap-2 pb-2">
          <input
            type="checkbox"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          <label htmlFor="uppercase" className="text-xs text-slate-300 cursor-pointer">
            Uppercase
          </label>
        </div>

        <div>
          <button
            onClick={() => generateUuids(count, uppercase, hyphens)}
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate New
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Generated UUID v4 List ({uuids.length})
          </span>
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Copy All
          </button>
        </div>

        <div className="space-y-1.5 max-h-80 overflow-y-auto">
          {uuids.map((id, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono group"
            >
              <span className="text-slate-300 truncate select-all">{id}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(id);
                  showToast('Copied UUID', 'success');
                }}
                className="text-slate-500 group-hover:text-white p-1 hover:bg-slate-800 rounded"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

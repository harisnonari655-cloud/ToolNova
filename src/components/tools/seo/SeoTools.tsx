import React, { useState, useMemo } from 'react';
import { useToolNova } from '../../../context/ToolNovaContext';
import {
  Copy,
  Download,
  Trash2,
  Check,
  AlertTriangle,
  Monitor,
  Smartphone,
  Plus,
  Eye,
  FileText
} from 'lucide-react';

// Common stop words for keyword density checking
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t',
  'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each', 'few', 'for', 'from', 'further',
  'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself',
  'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
  'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such',
  'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t',
  'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

// -------------------------------------------------------------
// TOOL 7: Meta Tag Generator
// -------------------------------------------------------------
export const MetaTagGeneratorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [title, setTitle] = useState('ToolNova – Powerful Tools. Smarter Work.');
  const [description, setDescription] = useState('Access 30+ free high-performance tools for AI writing, SEO auditing, image editing, PDF workflows, and developers.');
  const [keywords, setKeywords] = useState('free online tools, ai writing, image compressor, pdf merger, json formatter');
  const [author, setAuthor] = useState('ToolNova');
  const [url, setUrl] = useState('https://toolnova.app');
  const [imageUrl, setImageUrl] = useState('https://toolnova.app/og-card.png');
  const [robotsIndex, setRobotsIndex] = useState('index, follow');
  const [twitterCard, setTwitterCard] = useState('summary_large_image');

  const generatedHtml = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="robots" content="${robotsIndex}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="${twitterCard}">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;
  }, [title, description, keywords, author, url, imageUrl, robotsIndex, twitterCard]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    showToast('Meta tags copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'meta-tags.html';
    a.click();
    URL.revokeObjectURL(u);
    showToast('Downloaded meta-tags.html', 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Page Title ({title.length} chars - optimal 40-60)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Meta Description ({description.length} chars - optimal 140-160)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Canonical URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Author / Brand</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">OpenGraph Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Robots Directive</label>
              <select
                value={robotsIndex}
                onChange={(e) => setRobotsIndex(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="index, follow">Index, Follow (Recommended)</option>
                <option value="noindex, follow">Noindex, Follow</option>
                <option value="index, nofollow">Index, Nofollow</option>
                <option value="noindex, nofollow">Noindex, Nofollow</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter Card</label>
              <select
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="summary_large_image">Summary with Large Image</option>
                <option value="summary">Summary Standard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Generated HTML Tags
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <pre className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-auto whitespace-pre-wrap leading-relaxed">
            {generatedHtml}
          </pre>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 8: Meta Description Checker
// -------------------------------------------------------------
export const MetaDescriptionCheckerTool: React.FC = () => {
  const [description, setDescription] = useState(
    'Explore 30+ free high-performance tools for AI writing, image optimization, PDF manipulation, and web development. Boost your productivity with ToolNova today!'
  );
  const [focusKeyword, setFocusKeyword] = useState('free online tools');

  const charCount = description.length;
  // Approximating pixel width (~6 pixels per character average in Arial/Roboto 14px)
  const estimatedPixelWidth = Math.round(charCount * 6.3);

  const isOptimalLength = charCount >= 140 && charCount <= 160;
  const isTruncated = charCount > 160 || estimatedPixelWidth > 960;

  const containsKeyword = focusKeyword.trim()
    ? description.toLowerCase().includes(focusKeyword.toLowerCase().trim())
    : true;

  const hasCallToAction = /explore|get|discover|start|try|boost|learn|find|shop|download|access/i.test(
    description
  );

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Focus Keyword (Optional)
            </label>
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="e.g. free online tools"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Meta Description</label>
              <span
                className={`text-xs font-mono font-bold ${
                  isTruncated
                    ? 'text-rose-400'
                    : isOptimalLength
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                {charCount} / 160 chars (~{estimatedPixelWidth}px / 960px)
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type or paste your meta description..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Real-time Audit Gauges */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Character & Pixel Length</span>
              <span
                className={`font-semibold ${
                  isOptimalLength
                    ? 'text-emerald-400'
                    : isTruncated
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }`}
              >
                {isOptimalLength
                  ? 'Optimal (140-160 chars)'
                  : isTruncated
                  ? 'Too Long (Will Truncate)'
                  : 'Too Short (<140 chars)'}
              </span>
            </div>

            {focusKeyword.trim() && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Target Keyword Inclusion</span>
                <span className={containsKeyword ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {containsKeyword ? 'Included in text' : 'Keyword not found'}
                </span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Call-to-Action (Action Verb)</span>
              <span className={hasCallToAction ? 'text-emerald-400 font-semibold' : 'text-slate-400 font-semibold'}>
                {hasCallToAction ? 'Active CTA Detected' : 'No strong CTA detected'}
              </span>
            </div>
          </div>
        </div>

        {/* Live SERP Mockup */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Simulated Google Search Result
          </span>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-sans space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-300 font-bold">
                T
              </div>
              <span className="text-slate-300 truncate">https://toolnova.app</span>
              <span>›</span>
              <span className="text-slate-400">tools</span>
            </div>
            <div className="text-base text-blue-400 font-medium hover:underline cursor-pointer truncate">
              ToolNova – Free Online Tools Platform
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {isTruncated ? `${description.slice(0, 155)}...` : description || 'No description provided.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 9: Keyword Density Checker
// -------------------------------------------------------------
export const KeywordDensityCheckerTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [text, setText] = useState(
    'Digital marketing requires regular search engine optimization. Modern SEO relies on quality content, technical performance, and high-value search visibility. With SEO tools, teams audit keyword rankings and search engine results effectively.'
  );
  const [excludeStopWords, setExcludeStopWords] = useState(true);

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return { totalWords: 0, uniqueWords: 0, readingTimeMinutes: 0, singleWords: [] };
    }

    const cleanTokens = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1 && !/^\d+$/.test(w));

    const totalWords = cleanTokens.length;
    const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

    const counts: Record<string, number> = {};
    cleanTokens.forEach((token) => {
      if (excludeStopWords && STOP_WORDS.has(token)) return;
      counts[token] = (counts[token] || 0) + 1;
    });

    const singleWords = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: Number(((count / totalWords) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    return {
      totalWords,
      uniqueWords: Object.keys(counts).length,
      readingTimeMinutes,
      singleWords
    };
  }, [text, excludeStopWords]);

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300">Input Text to Analyze</label>
            <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeStopWords}
                onChange={(e) => setExcludeStopWords(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
              />
              Filter Stop Words
            </label>
          </div>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article or copy here..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>Total Words: {analysis.totalWords}</span>
            <span>Est. Reading Time: ~{analysis.readingTimeMinutes} min</span>
          </div>
        </div>

        {/* Results Frequency Table */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Top Keyword Frequency & Density
          </span>
          <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950/70 p-2">
            {analysis.singleWords.length > 0 ? (
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Keyword</th>
                    <th className="p-2 text-right">Count</th>
                    <th className="p-2 text-right">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {analysis.singleWords.map((row) => (
                    <tr key={row.word} className="hover:bg-slate-900/60">
                      <td className="p-2 font-medium text-white">{row.word}</td>
                      <td className="p-2 text-right text-slate-400">{row.count}</td>
                      <td className="p-2 text-right font-semibold">
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            row.density > 3.5
                              ? 'bg-rose-950 text-rose-300'
                              : row.density >= 1.0
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {row.density}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 p-8">
                Enter text above to compute keyword densities.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 10: Robots.txt Generator
// -------------------------------------------------------------
export const RobotsTxtGeneratorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [defaultPolicy, setDefaultPolicy] = useState('Allow');
  const [sitemapUrl, setSitemapUrl] = useState('https://toolnova.app/sitemap.xml');
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/api/\n/checkout/\n/private/');
  const [blockAiBots, setBlockAiBots] = useState(false);

  const generatedRobots = useMemo(() => {
    let result = `User-agent: *\n`;
    if (defaultPolicy === 'Allow') {
      result += `Allow: /\n`;
    }

    const paths = disallowPaths
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    paths.forEach((p) => {
      result += `Disallow: ${p.startsWith('/') ? p : '/' + p}\n`;
    });

    if (blockAiBots) {
      result += `\n# AI Scraping Crawlers\n`;
      result += `User-agent: GPTBot\nDisallow: /\n\n`;
      result += `User-agent: ClaudeBot\nDisallow: /\n\n`;
      result += `User-agent: CCBot\nDisallow: /\n`;
    }

    if (sitemapUrl.trim()) {
      result += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }

    return result;
  }, [defaultPolicy, sitemapUrl, disallowPaths, blockAiBots]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRobots);
    showToast('Copied robots.txt to clipboard!', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(u);
    showToast('Downloaded robots.txt', 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Default Access Policy
            </label>
            <select
              value={defaultPolicy}
              onChange={(e) => setDefaultPolicy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Allow">Allow All Search Engines</option>
              <option value="Disallow">Disallow All (Staging / Private Sites)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Disallow Directories (One per line)
            </label>
            <textarea
              rows={4}
              value={disallowPaths}
              onChange={(e) => setDisallowPaths(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              XML Sitemap URL
            </label>
            <input
              type="url"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={blockAiBots}
              onChange={(e) => setBlockAiBots(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span className="text-xs text-slate-300 font-medium">
              Block AI Scraping Crawlers (GPTBot, ClaudeBot, CCBot)
            </span>
          </label>
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Generated robots.txt
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <pre className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-auto whitespace-pre-wrap leading-relaxed">
            {generatedRobots}
          </pre>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 11: XML Sitemap Generator
// -------------------------------------------------------------
export const XmlSitemapGeneratorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [urlsText, setUrlsText] = useState(
    'https://toolnova.app\nhttps://toolnova.app/all-tools\nhttps://toolnova.app/tools/image-compressor\nhttps://toolnova.app/tools/pdf-merger\nhttps://toolnova.app/pricing'
  );
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');

  const generatedSitemap = useMemo(() => {
    const lines = urlsText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('http'));
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    lines.forEach((url) => {
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }, [urlsText, changefreq, priority]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSitemap);
    showToast('XML sitemap copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedSitemap], { type: 'application/xml;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(u);
    showToast('Downloaded sitemap.xml', 'success');
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Website URLs to Include (One per line)
            </label>
            <textarea
              rows={8}
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Change Frequency
              </label>
              <select
                value={changefreq}
                onChange={(e) => setChangefreq(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Default Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="1.0">1.0 (Homepage)</option>
                <option value="0.8">0.8 (Key Landing Pages)</option>
                <option value="0.6">0.6 (Standard Posts)</option>
                <option value="0.4">0.4 (Archive Pages)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Valid sitemap.xml
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
          <pre className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-auto whitespace-pre-wrap leading-relaxed">
            {generatedSitemap}
          </pre>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 12: SERP Snippet Preview
// -------------------------------------------------------------
export const SerpSnippetPreviewTool: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [title, setTitle] = useState('ToolNova – Free All-in-One Online Tools Platform');
  const [url, setUrl] = useState('https://toolnova.app/tools/image-compressor');
  const [description, setDescription] = useState(
    'Compress, resize, and optimize images directly in your browser. 100% private with no server uploads. Fast, free, and secure.'
  );
  const [includeRating, setIncludeRating] = useState(true);

  const titleChars = title.length;
  const descChars = description.length;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {/* Device View Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          SERP Simulator Controls
        </span>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              device === 'desktop'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop View
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              device === 'mobile'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">SEO Page Title</label>
              <span className={`text-xs font-mono ${titleChars > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {titleChars} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Page URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Meta Description</label>
              <span className={`text-xs font-mono ${descChars > 160 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {descChars} / 160 chars
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeRating}
              onChange={(e) => setIncludeRating(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span className="text-xs text-slate-300 font-medium">
              Simulate Rich Snippet Stars (Rating: 4.9 ★★★★★)
            </span>
          </label>
        </div>

        {/* Live Rendering Display */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Google {device === 'desktop' ? 'Desktop' : 'Mobile'} Result Preview
          </span>

          <div
            className={`p-5 rounded-2xl bg-[#202124] text-[#bdc1c6] font-sans border border-slate-800 flex-1 flex flex-col justify-center ${
              device === 'mobile' ? 'max-w-sm mx-auto shadow-2xl' : 'w-full'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs text-[#9aa0a6] mb-1">
              <div className="w-5 h-5 rounded-full bg-[#303134] flex items-center justify-center text-[10px] text-white font-bold">
                TN
              </div>
              <div className="truncate">
                <span className="text-[#dadce0] font-medium block text-xs">ToolNova</span>
                <span className="text-[11px] text-[#9aa0a6] truncate">{url}</span>
              </div>
            </div>

            <div className="text-lg text-[#8ab4f8] font-normal hover:underline cursor-pointer leading-snug my-1">
              {title.length > 65 ? `${title.slice(0, 62)}...` : title}
            </div>

            {includeRating && (
              <div className="flex items-center gap-1.5 text-xs text-[#fbbc04] my-1">
                <span>★★★★★</span>
                <span className="text-[#9aa0a6]">Rating: 4.9 · 1,420 votes · Free</span>
              </div>
            )}

            <div className="text-xs text-[#bdc1c6] leading-relaxed mt-1">
              {description.length > 165
                ? `${description.slice(0, 160)}...`
                : description || 'No meta description configured.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

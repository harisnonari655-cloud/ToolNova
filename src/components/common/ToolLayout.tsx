import React, { useState } from 'react';
import { ToolDefinition } from '../../types/index.ts';
import { useToolNova } from '../../context/ToolNovaContext';
import { IconHelper } from './IconHelper';
import { AdBanner } from './AdBanner';
import { TOOLS } from '../../data/toolsData';
import {
  ChevronRight,
  Star,
  Share2,
  ShieldCheck,
  Zap,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Check
} from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, onNavigate, children }) => {
  const { isFavorite, toggleFavorite, showToast } = useToolNova();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);

  const favorited = isFavorite(tool.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tool link copied to clipboard!', 'success');
    }
  };

  const relatedTools = tool.relatedToolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean) as ToolDefinition[];

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap"
        >
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button
            onClick={() => onNavigate(`/${tool.category}-tools`)}
            className="hover:text-white transition-colors"
          >
            {tool.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-indigo-400 font-medium truncate max-w-[200px]">
            {tool.name}
          </span>
        </nav>

        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10 shrink-0">
                <IconHelper name={tool.iconName} className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {tool.name}
                  </h1>
                  {tool.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {tool.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    100% Free
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                onClick={() => toggleFavorite(tool.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  favorited
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
                }`}
                aria-label="Save to favorites"
              >
                <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{favorited ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                aria-label="Share tool"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Privacy badge indicator */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {tool.category === 'ai-writing'
                  ? 'Server-side ephemeral processing with zero text logging'
                  : 'Processed 100% locally on your device in browser memory'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant real-time execution • No account required</span>
            </div>
          </div>
        </div>

        {/* PRIMARY WORKING TOOL INTERFACE COMPONENT */}
        <div className="mb-10">
          {children}
        </div>

        {/* Ad Placement Below Tool */}
        <AdBanner format="horizontal" slotId={`tool-${tool.id}-bottom`} />

        {/* DETAILED SEO EDITORIAL & DOCUMENTATION SECTIONS */}
        <div className="space-y-8 mt-12 text-slate-300">
          {/* Section 1: What It Does & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-card">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-400" />
                What Does {tool.name} Do?
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 mb-4">
                {tool.whatItDoes}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200 block mb-1">Tool Category: {tool.categoryName}</strong>
                Engineered for speed, privacy, and precision on desktop and mobile browsers alike.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-card">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Key Advantages & Benefits
              </h2>
              <ul className="space-y-2.5 text-sm">
                {tool.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Step-by-Step Instructions */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
                i
              </span>
              How to Use {tool.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tool.howToUse.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="text-xs font-bold text-indigo-400 mb-2">Step {idx + 1}</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Practical Examples */}
          {tool.examples.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <h2 className="text-xl font-bold text-white mb-4">
                Practical Application Examples
              </h2>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {tool.examples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveExampleIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeExampleIndex === idx
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <p className="text-xs text-slate-400 mb-3 italic">
                  {tool.examples[activeExampleIndex].description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Input Sample
                    </span>
                    <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                      {tool.examples[activeExampleIndex].input}
                    </pre>
                  </div>
                  {tool.examples[activeExampleIndex].output && (
                    <div>
                      <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                        Expected Output
                      </span>
                      <pre className="p-3 rounded-lg bg-slate-900 border border-indigo-500/30 text-xs font-mono text-indigo-200 overflow-x-auto whitespace-pre-wrap">
                        {tool.examples[activeExampleIndex].output}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Limitations & Transparency Notice */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-amber-500/20 text-slate-300">
            <h3 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Technical Considerations & Honesty Guidelines
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {tool.limitations.map((limit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: FAQs Accordion */}
          {tool.faqs.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl glass-card">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {tool.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-semibold text-sm text-white flex items-center justify-between hover:text-indigo-300 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-90 text-indigo-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 6: Related Tools */}
          {relatedTools.length > 0 && (
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Related Tools You May Like</h2>
                <button
                  onClick={() => onNavigate(`/${tool.category}-tools`)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                >
                  View all {tool.categoryName} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((relTool) => (
                  <button
                    key={relTool.id}
                    onClick={() => {
                      onNavigate(`/tools/${relTool.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2.5 group-hover:scale-105 transition-transform">
                        <IconHelper name={relTool.iconName} className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {relTool.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {relTool.shortDescription}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1 mt-3">
                      Try tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

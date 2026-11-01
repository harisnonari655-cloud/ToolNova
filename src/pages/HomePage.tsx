import React, { useState } from 'react';
import { useToolNova } from '../context/ToolNovaContext';
import { TOOLS, CATEGORIES } from '../data/toolsData';
import { IconHelper } from '../components/common/IconHelper';
import { AdBanner } from '../components/common/AdBanner';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Layers,
  Lock,
  Smartphone
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openSearch, openUpgradeModal, isFavorite, toggleFavorite, recentTools } = useToolNova();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [quickSearch, setQuickSearch] = useState('');

  const popularTools = TOOLS.filter((t) => t.badge === 'Popular' || t.badge === 'Essential').slice(0, 8);

  const homeFaqs = [
    {
      q: 'Are all 30 tools really 100% free to use?',
      a: 'Yes! All 30 tools—including the Image Compressor, PDF Merger, JSON Formatter, and SEO utilities—are completely free with no mandatory account registration or hidden subscriptions.'
    },
    {
      q: 'How does ToolNova protect my data and document privacy?',
      a: 'All file processing (image compression, resizing, PDF merging, splitting, and developer transformations) occurs 100% locally on your computer or phone using modern browser APIs (HTML5 Canvas and WebAssembly). Your files never leave your device. AI Writing text is processed ephemerally in server memory via Google Gemini and is never saved to a database.'
    },
    {
      q: 'What is High Thinking Mode in the AI Writing tools?',
      a: 'High Thinking mode engages Google’s advanced Gemini 4 Argon model with extended reasoning capabilities. This enables nuanced text humanization, sophisticated essay development, and superior semantic restructuring.'
    },
    {
      q: 'Can I use ToolNova on my smartphone or tablet?',
      a: 'Absolutely! Every single tool in ToolNova is engineered with a mobile-first responsive architecture that runs smoothly on iPhones, Android phones, iPads, and desktops.'
    }
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* HERO SECTION */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-blue-600/15 via-indigo-600/20 to-purple-600/15 blur-3xl pointer-events-none -z-10" />

        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>30 Production-Ready Online Tools</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Zero Signup Required</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Powerful Tools. <span className="text-gradient">Smarter Work.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          The ultimate global all-in-one suite. Access high-performance AI writing, SEO auditing, browser-side image optimization, PDF workflows, and developer utilities in seconds.
        </p>

        {/* Interactive Instant Search Bar in Hero */}
        <div className="max-w-2xl mx-auto mb-6">
          <div
            onClick={openSearch}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-indigo-500 shadow-2xl flex items-center gap-3 cursor-pointer transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 text-left flex-1 truncate">
              Search any tool (e.g. AI Humanizer, PDF Merger, Image Compressor)...
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-400">
                Ctrl + K
              </kbd>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Quick jump category pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Quick jump:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.slug)}
              className="px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <IconHelper name={cat.iconName} className="w-3 h-3 text-indigo-400" />
              <span>{cat.navTitle}</span>
            </button>
          ))}
        </div>
      </section>

      {/* RECENTLY USED & FAVORITES BAR */}
      {recentTools.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Recently Accessed & Pinned Tools
              </span>
              <button
                onClick={() => onNavigate('/all-tools')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                View All 30 →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentTools.slice(0, 4).map((tool) => (
                <div
                  key={`home-rec-${tool.id}`}
                  onClick={() => onNavigate(`/tools/${tool.id}`)}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                    <IconHelper name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{tool.categoryName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEADERBOARD AD BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdBanner format="horizontal" slotId="home-leaderboard" />
      </section>

      {/* 5 CATEGORY CARDS SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Browse Tool Categories
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Engineered across five core disciplines for professionals, creators, and developers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/all-tools')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
          >
            Explore Directory <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.slug)}
              className="p-6 rounded-2xl glass-card hover:border-indigo-500/50 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-md">
                    <IconHelper name={cat.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {cat.count} Tools
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400">
                <span>View {cat.navTitle} Tools</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

          {/* 6th Card: All 30 Tools Banner */}
          <div
            onClick={() => onNavigate('/all-tools')}
            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 hover:border-indigo-500 cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                All 30 Online Tools
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter and sort the comprehensive collection of free AI writing, SEO, image, PDF, and code tools.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-indigo-500/20 flex items-center justify-between text-xs font-semibold text-indigo-300">
              <span>Browse Full Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR TOOLS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured & Most Popular Tools
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Fast, privacy-focused utilities trusted worldwide every day.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/all-tools')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
          >
            View all 30 tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => {
            const fav = isFavorite(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate(`/tools/${tool.id}`)}
                className="p-5 rounded-2xl glass-card hover:border-indigo-500/50 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <IconHelper name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        fav
                          ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                          : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-800'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {tool.name}
                    </h4>
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE TOOLNOVA (Honesty & Tech Architecture) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 block">
              Architected for Perfection
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Why Professionals & Teams Choose ToolNova
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We eliminate deceptive download counters, forced account registrations, and invasive privacy risks. Everything is built to respect your time and data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Images, PDFs, and source code are processed right inside your device’s browser memory via HTML5 Canvas and WASM. Your private files never touch our servers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Gemini 4 Argon High Thinking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our AI writing suite utilizes state-of-the-art server-side Gemini 4 Argon reasoning with high thinking enabled for genuinely humanized, nuanced prose.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Mobile-First Lightning Speed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built from the ground up for seamless operation on iPhones, Android phones, tablets, and laptops with zero bloat and near-instant load times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Clear answers regarding privacy, functionality, and tool limits.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
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
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-90 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PRO CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/50 to-purple-900/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Elevate Your Productivity
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need Higher Limits or Ad-Free Workspaces?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore ToolNova Pro for unlimited high-thinking AI reasoning tokens, dedicated high-priority servers, and an ad-free clean interface.
            </p>
          </div>
          <button
            onClick={openUpgradeModal}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 shrink-0"
          >
            Explore Pro Perks
          </button>
        </div>
      </section>
    </div>
  );
};

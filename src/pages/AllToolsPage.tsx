import React, { useState } from 'react';
import { useToolNova } from '../context/ToolNovaContext';
import { TOOLS, CATEGORIES } from '../data/toolsData';
import { ToolCategory } from '../types/index.ts';
import { IconHelper } from '../components/common/IconHelper';
import { AdBanner } from '../components/common/AdBanner';
import { Search, Star, ArrowRight, Layers, ChevronRight } from 'lucide-react';

interface AllToolsPageProps {
  onNavigate: (path: string) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({ onNavigate }) => {
  const { isFavorite, toggleFavorite } = useToolNova();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = TOOLS.filter((tool) => {
    const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.categoryName.toLowerCase().includes(q) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Layers className="w-3.5 h-3.5" />
          Complete Online Tools Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          All 30 Free Online Tools
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Search and filter across our full catalog of AI writing, SEO auditing, client-side image editing, PDF workflows, and developer utilities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-card space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, tag, or action (e.g. compress, merge, humanize, json)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Tools (30)
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <IconHelper name={cat.iconName} className="w-3.5 h-3.5" />
              <span>{cat.navTitle} ({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool) => {
            const fav = isFavorite(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => {
                  onNavigate(`/tools/${tool.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl glass-card hover:border-indigo-500/50 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-950/70 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform shadow">
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
                      aria-label="Toggle favorite"
                    >
                      <Star className={`w-4 h-4 ${fav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {tool.name}
                    </h3>
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <span className="text-[11px] text-slate-500">{tool.categoryName}</span>
                  <span className="flex items-center gap-1">
                    Launch <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 p-4 rounded-2xl glass-card">
          <p className="text-sm font-semibold text-white mb-1">No tools matched your search</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search query or reset your category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Ad Placement */}
      <AdBanner format="horizontal" slotId="all-tools-bottom" />
    </div>
  );
};

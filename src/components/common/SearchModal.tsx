import React, { useState, useEffect, useRef } from 'react';
import { useToolNova } from '../../context/ToolNovaContext';
import { TOOLS, CATEGORIES } from '../../data/toolsData';
import { ToolCategory } from '../../types/index.ts';
import { IconHelper } from './IconHelper';
import { Search, X, Star, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { isSearchOpen, closeSearch, favorites, toggleFavorite, isFavorite, recentTools } = useToolNova();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.categoryName.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const handleSelect = (toolId: string) => {
    closeSearch();
    onNavigate(`/tools/${toolId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 30+ tools by name, keyword, or action (e.g. compress, merge, humanize)..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 p-3 overflow-x-auto border-b border-slate-800/60 bg-slate-950/40 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All (30)
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <IconHelper name={cat.iconName} className="w-3.5 h-3.5" />
              {cat.navTitle} ({cat.count})
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {/* Quick Recents / Favorites when no query is typed */}
          {!query.trim() && selectedCategory === 'all' && (
            <div className="mb-4">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Recent & Recommended</span>
                <span className="text-[10px] text-indigo-400">Ctrl + K</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {recentTools.slice(0, 4).map((tool) => (
                  <button
                    key={`rec-${tool.id}`}
                    onClick={() => handleSelect(tool.id)}
                    className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700 text-left flex items-center gap-3 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <IconHelper name={tool.iconName} className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate group-hover:text-indigo-300">
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {tool.categoryName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filtered Tool Items */}
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {query ? `Found ${filteredTools.length} Tools` : 'Browse Tools'}
              </div>
              {filteredTools.map((tool) => {
                const fav = isFavorite(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleSelect(tool.id)}
                    className="p-3 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                        <IconHelper name={tool.iconName} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                            {tool.name}
                          </span>
                          {tool.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tool.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          fav
                            ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                            : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-700/50'
                        }`}
                        title={fav ? 'Favorited' : 'Add to favorites'}
                        aria-label="Toggle favorite"
                      >
                        <Star className={`w-3.5 h-3.5 ${fav ? 'fill-amber-400' : ''}`} />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-base mb-1">No matching tools found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                We couldn't find any tool matching "<span className="text-slate-200">{query}</span>". Try another keyword or browse our 5 categories.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              <CornerDownLeft className="w-3 h-3" /> Select
            </span>
            <span>ESC to close</span>
          </div>
          <span className="text-slate-400">30 Real Working Tools Ready</span>
        </div>
      </div>
    </div>
  );
};

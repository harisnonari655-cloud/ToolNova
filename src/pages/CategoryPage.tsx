import React from 'react';
import { CATEGORIES, getToolsByCategory } from '../data/toolsData';
import { ToolCategory } from '../types/index.ts';
import { useToolNova } from '../context/ToolNovaContext';
import { IconHelper } from '../components/common/IconHelper';
import { AdBanner } from '../components/common/AdBanner';
import { ChevronRight, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

interface CategoryPageProps {
  categoryId: ToolCategory;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onNavigate }) => {
  const { isFavorite, toggleFavorite } = useToolNova();
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const tools = getToolsByCategory(category.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button onClick={() => onNavigate('/all-tools')} className="hover:text-white transition-colors">
          All Tools
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-indigo-400 font-medium">{category.title}</span>
      </nav>

      {/* Hero Category Banner */}
      <div className="p-6 sm:p-10 rounded-2xl glass-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl shrink-0">
            <IconHelper name={category.iconName} className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {category.title}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {tools.length} Tools
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {category.id === 'ai-writing'
                ? 'Server-side ephemeral processing via Gemini 4 Argon'
                : '100% private browser-side execution with zero data leakage'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Zap className="w-4 h-4" />
            <span>Instant execution • Free forever</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
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
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
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

                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {tool.name}
                  </h3>
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

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ad Placement */}
      <AdBanner format="horizontal" slotId={`cat-${category.id}`} />
    </div>
  );
};

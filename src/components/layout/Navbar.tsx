import React, { useState } from 'react';
import { useToolNova } from '../../context/ToolNovaContext';
import { CATEGORIES } from '../../data/toolsData';
import { IconHelper } from '../common/IconHelper';
import {
  Search,
  Sparkles,
  Star,
  Menu,
  X,
  ChevronDown,
  Layers,
  Wrench,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { openSearch, openUpgradeModal, favorites } = useToolNova();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070a13]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {/* Geometric Nova Logo Symbol */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20" />
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Tool<span className="text-gradient">Nova</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-medium hidden sm:block">
              Powerful Tools. Smarter Work.
            </p>
          </div>
        </div>

        {/* Global Instant Search Bar Trigger */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={openSearch}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-between transition-all group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Search 30+ free tools (humanizer, pdf, json)...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
          <button
            onClick={() => handleNav('/all-tools')}
            className={`px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentPath === '/all-tools' ? 'text-indigo-400 bg-slate-800/80' : ''
            }`}
          >
            All 30 Tools
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  categoryDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {categoryDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav(cat.slug)}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-800/70 text-left flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <IconHelper name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                        {cat.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{cat.count} Real Tools</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('/pricing')}
            className={`px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentPath === '/pricing' ? 'text-indigo-400 bg-slate-800/80' : ''
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => handleNav('/faq')}
            className={`px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors ${
              currentPath === '/faq' ? 'text-indigo-400 bg-slate-800/80' : ''
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNav('/test-suite')}
            className={`px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 ${
              currentPath === '/test-suite' ? 'text-indigo-400 bg-slate-800/80' : ''
            }`}
            title="Automated 30-Tool QA Verification Suite"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>QA Suite</span>
          </button>
        </nav>

        {/* Right Action Icons: Search (mobile), Favorites, Pro */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={openSearch}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Search tools"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites shortcut */}
          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            title="Saved Favorite Tools"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden sm:inline">Favorites</span>
            <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full">
              {favorites.length}
            </span>
          </button>

          {/* Upgrade / Pro Button */}
          <button
            onClick={openUpgradeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Go Pro</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070a13] p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNav('/all-tools')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-bold text-white flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              All 30 Tools
            </button>
            <button
              onClick={() => handleNav('/pricing')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-bold text-white flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Pro Plans
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              Browse Categories
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNav(cat.slug)}
                className="w-full p-2.5 rounded-xl hover:bg-slate-800 text-left text-xs font-medium text-slate-300 hover:text-white flex items-center gap-3"
              >
                <IconHelper name={cat.iconName} className="w-4 h-4 text-indigo-400" />
                <span>{cat.title}</span>
                <span className="ml-auto text-[10px] text-slate-500">{cat.count} tools</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 grid grid-cols-4 gap-1 text-[11px] text-slate-400">
            <button onClick={() => handleNav('/about-us')} className="p-1 hover:text-white text-center">
              About
            </button>
            <button onClick={() => handleNav('/contact-us')} className="p-1 hover:text-white text-center">
              Contact
            </button>
            <button onClick={() => handleNav('/faq')} className="p-1 hover:text-white text-center">
              FAQ
            </button>
            <button onClick={() => handleNav('/test-suite')} className="p-1 text-indigo-400 hover:text-indigo-300 font-semibold text-center">
              QA Suite
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

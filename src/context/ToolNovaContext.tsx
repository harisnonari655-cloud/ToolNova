import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToolDefinition } from '../types/index.ts';
import { TOOLS } from '../data/toolsData';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface ToolNovaContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  recentTools: ToolDefinition[];
  recordToolUsage: (toolId: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  hasGeminiKey: boolean | null;
  checkServerStatus: () => Promise<void>;
  aiRequestsUsedToday: number;
  incrementAiUsage: () => void;
}

const ToolNovaContext = createContext<ToolNovaContextType | undefined>(undefined);

export const ToolNovaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolnova_favorites');
      return stored ? JSON.parse(stored) : ['ai-humanizer', 'image-compressor', 'pdf-merger', 'json-formatter'];
    } catch {
      return ['ai-humanizer', 'image-compressor', 'pdf-merger', 'json-formatter'];
    }
  });

  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('toolnova_recents');
      return stored ? JSON.parse(stored) : ['ai-humanizer', 'image-compressor', 'json-formatter', 'meta-tag-generator'];
    } catch {
      return ['ai-humanizer', 'image-compressor', 'json-formatter', 'meta-tag-generator'];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean | null>(null);

  const [aiRequestsUsedToday, setAiRequestsUsedToday] = useState<number>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const stored = localStorage.getItem(`toolnova_ai_usage_${today}`);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const checkServerStatus = async () => {
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setHasGeminiKey(Boolean(data.hasGeminiKey));
      } else {
        setHasGeminiKey(false);
      }
    } catch {
      setHasGeminiKey(false);
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      let next: string[];
      if (prev.includes(toolId)) {
        next = prev.filter((id) => id !== toolId);
        showToast('Removed from favorites', 'info');
      } else {
        next = [...prev, toolId];
        showToast('Saved to favorites', 'success');
      }
      try {
        localStorage.setItem('toolnova_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const recordToolUsage = (toolId: string) => {
    setRecentIds((prev) => {
      const next = [toolId, ...prev.filter((id) => id !== toolId)].slice(0, 8);
      try {
        localStorage.setItem('toolnova_recents', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const recentTools = recentIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean) as ToolDefinition[];

  const incrementAiUsage = () => {
    const today = new Date().toISOString().split('T')[0];
    setAiRequestsUsedToday((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(`toolnova_ai_usage_${today}`, String(next));
      } catch {}
      return next;
    });
  };

  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToolNovaContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        isFavorite,
        recentTools,
        recordToolUsage,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isUpgradeModalOpen,
        openUpgradeModal: () => setIsUpgradeModalOpen(true),
        closeUpgradeModal: () => setIsUpgradeModalOpen(false),
        toasts,
        showToast,
        removeToast,
        hasGeminiKey,
        checkServerStatus,
        aiRequestsUsedToday,
        incrementAiUsage
      }}
    >
      <div className={theme === 'dark' ? 'dark text-slate-100 bg-[#070a13]' : 'text-slate-800 bg-slate-50'}>
        {children}
        {/* Global Toast Container */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                toast.type === 'error'
                  ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                  : toast.type === 'info'
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                  : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <span>{toast.text}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto opacity-70 hover:opacity-100 text-xs px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolNovaContext.Provider>
  );
};

export const useToolNova = () => {
  const context = useContext(ToolNovaContext);
  if (!context) {
    throw new Error('useToolNova must be used within a ToolNovaProvider');
  }
  return context;
};

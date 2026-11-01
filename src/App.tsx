import React, { useState, useEffect } from 'react';
import { ToolNovaProvider, useToolNova } from './context/ToolNovaContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { UpgradeModal } from './components/common/UpgradeModal';
import { ToolLayout } from './components/common/ToolLayout';
import { ToolDispatcher } from './components/tools/ToolDispatcher';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { CategoryPage } from './pages/CategoryPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPages } from './pages/LegalPages';
import { TestSuitePage } from './pages/TestSuitePage';
import { getToolById, TOOLS } from './data/toolsData';
import { ToolCategory } from './types/index.ts';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { recordToolUsage } = useToolNova();

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO metadata updates based on route
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'ToolNova – Powerful Tools. Smarter Work. Free All-in-One Online Tools';
    } else if (currentPath === '/all-tools') {
      document.title = 'All 30 Free Online Tools – AI, SEO, Image, PDF & Dev | ToolNova';
    } else if (currentPath === '/ai-writing-tools') {
      document.title = 'Free AI Writing Tools Online – Humanizer, Rewriter, Essay | ToolNova';
    } else if (currentPath === '/seo-tools') {
      document.title = 'Free SEO Tools Online – Meta Tag, Keyword Density, Robots | ToolNova';
    } else if (currentPath === '/image-tools') {
      document.title = 'Free Image Tools Online – Compressor, Resizer, Converter | ToolNova';
    } else if (currentPath === '/pdf-tools') {
      document.title = 'Free PDF Tools Online – Merger, Splitter, Compressor | ToolNova';
    } else if (currentPath === '/developer-tools') {
      document.title = 'Free Developer Tools Online – JSON, Base64, Minifiers | ToolNova';
    } else if (currentPath === '/pricing' || currentPath === '/premium') {
      document.title = 'Pricing & Pro Plans – ToolNova Premium Features';
    } else if (currentPath === '/faq') {
      document.title = 'Frequently Asked Questions – ToolNova Knowledge Base';
    } else if (currentPath === '/test-suite') {
      document.title = 'Production QA Verification Suite (30 Tools & 150 Tests) – ToolNova';
    } else if (currentPath === '/about-us') {
      document.title = 'About Us – The ToolNova Mission & Technology';
    } else if (currentPath === '/contact-us') {
      document.title = 'Contact Support & Feedback – ToolNova';
    } else if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy – Zero File Logging | ToolNova';
    } else if (currentPath === '/terms-of-service') {
      document.title = 'Terms of Service – ToolNova';
    } else if (currentPath.startsWith('/tools/')) {
      const toolId = currentPath.replace('/tools/', '');
      const tool = getToolById(toolId);
      if (tool) {
        document.title = tool.seoTitle;
        recordToolUsage(tool.id);
      } else {
        document.title = '404 Tool Not Found – ToolNova';
      }
    }
  }, [currentPath]);

  // Route Resolver
  const renderCurrentView = () => {
    // Individual Tool Route e.g. /tools/ai-humanizer
    if (currentPath.startsWith('/tools/')) {
      const toolId = currentPath.replace('/tools/', '');
      const tool = getToolById(toolId);
      if (tool) {
        return (
          <ToolLayout tool={tool} onNavigate={navigate}>
            <ToolDispatcher toolId={tool.id} />
          </ToolLayout>
        );
      }
      return <LegalPages type="404" onNavigate={navigate} />;
    }

    switch (currentPath) {
      case '/':
      case '':
        return <HomePage onNavigate={navigate} />;

      case '/all-tools':
        return <AllToolsPage onNavigate={navigate} />;

      case '/ai-writing-tools':
        return <CategoryPage categoryId="ai-writing" onNavigate={navigate} />;

      case '/seo-tools':
        return <CategoryPage categoryId="seo" onNavigate={navigate} />;

      case '/image-tools':
        return <CategoryPage categoryId="image" onNavigate={navigate} />;

      case '/pdf-tools':
        return <CategoryPage categoryId="pdf" onNavigate={navigate} />;

      case '/developer-tools':
        return <CategoryPage categoryId="developer" onNavigate={navigate} />;

      case '/pricing':
      case '/premium':
        return <PricingPage onNavigate={navigate} />;

      case '/faq':
        return <FaqPage onNavigate={navigate} />;

      case '/test-suite':
        return <TestSuitePage onNavigate={navigate} />;

      case '/about-us':
        return <LegalPages type="about" onNavigate={navigate} />;

      case '/contact-us':
        return <LegalPages type="contact" onNavigate={navigate} />;

      case '/privacy-policy':
        return <LegalPages type="privacy" onNavigate={navigate} />;

      case '/terms-of-service':
        return <LegalPages type="terms" onNavigate={navigate} />;

      case '/cookie-policy':
        return <LegalPages type="cookies" onNavigate={navigate} />;

      case '/affiliate-disclosure':
        return <LegalPages type="affiliate" onNavigate={navigate} />;

      default:
        return <LegalPages type="404" onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer onNavigate={navigate} />

      <SearchModal onNavigate={navigate} />
      <UpgradeModal />
    </div>
  );
}

export default function App() {
  return (
    <ToolNovaProvider>
      <AppContent />
    </ToolNovaProvider>
  );
}

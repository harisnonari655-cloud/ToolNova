import React from 'react';
import { CATEGORIES, TOOLS } from '../../data/toolsData';
import { ShieldCheck, Zap, Heart, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#05070e] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Info (Span 2) */}
          <div className="col-span-2 space-y-4">
            <div
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Tool<span className="text-gradient">Nova</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              <strong className="text-slate-200">Powerful Tools. Smarter Work.</strong> The global all-in-one suite of 30+ free high-performance tools for AI writing, SEO auditing, browser-side image processing, PDF manipulation, and developer utilities.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Client-Side Privacy: Documents & images never leave your browser
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                <Zap className="w-3.5 h-3.5" /> High Thinking: Powered by Google Gemini 4 Argon
              </div>
            </div>
          </div>

          {/* Category Directories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              AI & SEO Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/tools/ai-humanizer')} className="hover:text-white transition-colors">
                  AI Humanizer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/ai-text-rewriter')} className="hover:text-white transition-colors">
                  AI Text Rewriter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/ai-email-writer')} className="hover:text-white transition-colors">
                  AI Email Writer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/meta-tag-generator')} className="hover:text-white transition-colors">
                  Meta Tag Generator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/keyword-density-checker')} className="hover:text-white transition-colors">
                  Keyword Density
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/robots-txt-generator')} className="hover:text-white transition-colors">
                  Robots.txt Generator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Image & PDF Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/tools/image-compressor')} className="hover:text-white transition-colors">
                  Image Compressor
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/png-to-webp-converter')} className="hover:text-white transition-colors">
                  PNG to WebP
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/image-cropper')} className="hover:text-white transition-colors">
                  Image Cropper
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/pdf-merger')} className="hover:text-white transition-colors">
                  PDF Merger
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/pdf-splitter')} className="hover:text-white transition-colors">
                  PDF Splitter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/image-to-pdf')} className="hover:text-white transition-colors">
                  Image to PDF
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Developer Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/tools/json-formatter')} className="hover:text-white transition-colors">
                  JSON Formatter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/json-validator')} className="hover:text-white transition-colors">
                  JSON Validator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/base64-encoder-decoder')} className="hover:text-white transition-colors">
                  Base64 Encode/Decode
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/html-minifier')} className="hover:text-white transition-colors">
                  HTML Minifier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/css-minifier')} className="hover:text-white transition-colors">
                  CSS Minifier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/tools/uuid-generator')} className="hover:text-white transition-colors">
                  UUID Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company Pages */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Platform & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/about-us')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/pricing')} className="hover:text-white transition-colors">
                  Pricing & Pro
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/faq')} className="hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/test-suite')} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-1">
                  <span>QA Test Suite</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300">150 Tests</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact-us')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms-of-service')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/cookie-policy')} className="hover:text-white transition-colors">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/affiliate-disclosure')} className="hover:text-white transition-colors">
                  Affiliate Disclosure
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} ToolNova. All rights reserved. Built for global speed, privacy & performance.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> English (Global)
            </span>
            <span>•</span>
            <button onClick={() => handleNav('/sitemap.xml')} className="hover:text-slate-300">
              XML Sitemap
            </button>
            <span>•</span>
            <button onClick={() => handleNav('/robots.txt')} className="hover:text-slate-300">
              Robots.txt
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

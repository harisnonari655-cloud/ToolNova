import React, { useState } from 'react';
import { ChevronRight, HelpCircle, ShieldCheck, Sparkles, FileText, Code } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<string | null>('ai-1');

  const categories = [
    {
      title: 'AI Writing & Text Processing',
      icon: Sparkles,
      items: [
        {
          id: 'ai-1',
          q: 'How does the AI Humanizer bypass robotic patterns?',
          a: 'The AI Humanizer analyzes syntactic predictability and burstiness in synthetic drafts, rephrasing clunky boilerplate vocabulary and smoothing robotic rhythm into natural, human cadence.'
        },
        {
          id: 'ai-2',
          q: 'Is my input text stored or used for model training?',
          a: 'No. Input text sent to ToolNova’s AI endpoints is held in server memory only for the duration of the API call to generate your result. We maintain zero database logs of user writing.'
        },
        {
          id: 'ai-3',
          q: 'What is Gemini 4 Argon High Thinking?',
          a: 'It is Google’s advanced reasoning mode that performs multi-pass reasoning on complex prompts before generating final output, yielding far higher nuance and structural cohesion.'
        }
      ]
    },
    {
      title: 'Image & PDF Document Privacy',
      icon: ShieldCheck,
      items: [
        {
          id: 'doc-1',
          q: 'Are my uploaded images and PDF documents uploaded to a remote server?',
          a: 'No. All image operations (compressing, resizing, cropping, format conversions) and PDF operations (merging, splitting, compression) happen 100% locally inside your device’s browser memory via HTML5 Canvas and pdf-lib.'
        },
        {
          id: 'doc-2',
          q: 'Can I compress or merge confidential legal contracts safely?',
          a: 'Yes, because your documents are never transmitted over the internet or written to remote cloud storage. You can even use ToolNova while offline after loading the page.'
        }
      ]
    },
    {
      title: 'SEO & Developer Utilities',
      icon: Code,
      items: [
        {
          id: 'seo-1',
          q: 'Do ToolNova SEO tools claim live search volume or Google rankings?',
          a: 'No. In alignment with our strict honesty standards, our SEO tools perform mathematical keyword density calculations, meta tag generation, pixel width simulation, and crawler syntax validation. We do not fabricate live search rankings or secret algorithm scores.'
        },
        {
          id: 'dev-1',
          q: 'Are the UUIDs generated cryptographically secure?',
          a: 'Yes. UUID generation uses the browser’s native crypto.randomUUID() Web Cryptography API, guaranteeing high-entropy RFC 4122 v4 identifiers.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Everything you need to know about ToolNova’s tools, client-side privacy architecture, and AI models.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <div key={catIdx} className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Icon className="w-5 h-5 text-indigo-400" />
                {cat.title}
              </h2>
              <div className="space-y-2.5">
                {cat.items.map((item) => {
                  const isOpen = activeFaq === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : item.id)}
                        className="w-full p-4 text-left font-semibold text-sm text-white flex items-center justify-between hover:text-indigo-300 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-90 text-indigo-400' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

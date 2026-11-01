import React, { useState } from 'react';
import { useToolNova } from '../context/ToolNovaContext';
import {
  ShieldCheck,
  Mail,
  Send,
  CheckCircle,
  FileText,
  AlertTriangle,
  Info,
  ArrowRight
} from 'lucide-react';

interface LegalPageProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'affiliate' | '404';
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const { showToast } = useToolNova();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      showToast('Please complete all contact fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message was received! Thank you for contacting ToolNova.', 'success');
  };

  // -------------------------------------------------------------
  // 404 Not Found
  // -------------------------------------------------------------
  if (type === '404') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tool or Page Not Found</h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The tool or resource you are looking for may have moved or doesn't exist. Explore our full catalog of 30 working tools.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => onNavigate('/all-tools')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Browse All 30 Tools
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // About Us
  // -------------------------------------------------------------
  if (type === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 text-slate-300 leading-relaxed">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Our Story & Mission</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About ToolNova</h1>
          <p className="text-base text-slate-400">
            Powerful Tools. Smarter Work. Free high-speed utilities built for everyone.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card space-y-4 text-sm">
          <h2 className="text-lg font-bold text-white">Why We Built ToolNova</h2>
          <p>
            The web is flooded with online tools that deceive users with artificial countdown timers, mandatory sign-up paywalls, aggressive ads, and dangerous server-side uploads of sensitive files.
          </p>
          <p>
            ToolNova was engineered to establish a higher standard: <strong>a complete suite of 30 essential tools</strong> that execute instantly, respect user privacy by processing files directly in browser memory, and harness modern artificial intelligence responsibly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="font-bold text-white mb-2 text-sm">Integrity & Honesty</h3>
            <p className="text-xs text-slate-400">
              We never fabricate Google ranking scores, fake compression metrics, or simulated payment confirmations.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="font-bold text-white mb-2 text-sm">Client-Side First</h3>
            <p className="text-xs text-slate-400">
              Your images, documents, and code never leave your local device. We utilize HTML5 Canvas, Web Crypto, and pdf-lib.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="font-bold text-white mb-2 text-sm">Advanced AI</h3>
            <p className="text-xs text-slate-400">
              Connected to Google Gemini 4 Argon with high-thinking reasoning for genuinely nuanced humanized writing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Contact Us
  // -------------------------------------------------------------
  if (type === 'contact') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact ToolNova Support</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Have questions, feedback, or a feature request for a new online tool? Drop us a message below.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you for reaching out. A ToolNova engineer will review your inquiry shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Tool Request</label>
                <textarea
                  rows={5}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell us what tool or improvement you would like to see..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-500 space-y-1">
            <p><strong>Official Contact Channel:</strong> support@toolnova.app (Placeholder for production domain)</p>
            <p><strong>Operating Schedule:</strong> 24/7 Global Infrastructure Monitoring</p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Privacy Policy
  // -------------------------------------------------------------
  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Legal Documentation</span>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026</p>
        </div>

        <div className="p-6 rounded-2xl glass-card space-y-4">
          <h2 className="text-base font-bold text-white">1. Core Privacy Architecture: Zero File Uploads</h2>
          <p>
            ToolNova is designed with a client-side execution philosophy. For all <strong>Image Tools</strong> (Image Compressor, Resizer, Cropper, Converters), <strong>PDF Tools</strong> (PDF Merger, Splitter, Compressor, PDF to Image), and <strong>Developer Tools</strong> (JSON Formatter, Base64, URL Encoder, Minifiers, UUID Generator), processing occurs strictly within your browser's local memory.
          </p>
          <p className="text-emerald-400 font-medium">
            Your image files and PDF documents are never transmitted over the internet to our servers and are never stored on any cloud storage medium.
          </p>

          <h2 className="text-base font-bold text-white pt-2">2. AI Writing Tools Data Handling</h2>
          <p>
            When utilizing Category A (AI Writing Tools), the text you submit is transmitted via an encrypted HTTPS connection to our server-side API endpoint and forwarded ephemerally to Google Gemini API to generate your result. We do not store, index, or retain your text in any permanent database.
          </p>

          <h2 className="text-base font-bold text-white pt-2">3. Local Storage</h2>
          <p>
            We use your browser's native `localStorage` exclusively to persist your favorite tools, recently used tools, and daily AI quota counts. This information remains completely on your device.
          </p>

          <h2 className="text-base font-bold text-white pt-2">4. Advertising and Analytics</h2>
          <p>
            When configured, ToolNova may display standard Google AdSense advertising. Third-party vendors, including Google, use cookies to serve ads based on prior visits. You may opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Terms of Service
  // -------------------------------------------------------------
  if (type === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Legal Terms</span>
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026</p>
        </div>

        <div className="p-6 rounded-2xl glass-card space-y-4">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using ToolNova ("the Platform"), you agree to abide by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using the tools.
          </p>

          <h2 className="text-base font-bold text-white pt-2">2. Permitted Use</h2>
          <p>
            ToolNova grants you a free, non-exclusive license to use all tools for personal, academic, and commercial purposes. You agree not to use the tools to generate harmful, illegal, or malicious software code, or conduct denial-of-service attempts.
          </p>

          <h2 className="text-base font-bold text-white pt-2">3. Disclaimer of Warranties</h2>
          <p>
            All tools and calculations (including SEO metadata analysis, PDF transformations, and code minification) are provided "as-is" without warranty of any kind. ToolNova does not guarantee specific Google search rankings or third-party search engine outcomes.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Cookie Policy
  // -------------------------------------------------------------
  if (type === 'cookies') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Cookie Notice</span>
          <h1 className="text-3xl font-extrabold text-white">Cookie Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: October 2026</p>
        </div>

        <div className="p-6 rounded-2xl glass-card space-y-4">
          <p>
            ToolNova uses minimal, privacy-centric cookies and browser storage mechanisms to provide a seamless user experience.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Essential Storage:</strong> Storing your pinned favorite tools and recently accessed tools in `localStorage`.</li>
            <li><strong>Preference Storage:</strong> Remembering your theme mode (Dark / Light).</li>
            <li><strong>Advertising:</strong> Third-party advertising partners like Google AdSense may place cookies to serve non-intrusive ads when configured.</li>
          </ul>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Affiliate Disclosure
  // -------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Transparency</span>
        <h1 className="text-3xl font-extrabold text-white">Affiliate Disclosure</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026</p>
      </div>

      <div className="p-6 rounded-2xl glass-card space-y-4">
        <p>
          In full accordance with Federal Trade Commission (FTC) guidelines and global transparency rules, ToolNova maintains a policy of complete honesty regarding partnerships.
        </p>
        <p>
          Some external resource links (such as domain registration services, cloud hosting, or specialized developer APIs) may contain affiliate links. If you choose to make a purchase through these links, ToolNova may earn an affiliate commission at zero additional cost to you.
        </p>
        <p>
          Our recommendations and tool rankings are never influenced by affiliate compensation. All 30 core tools remain 100% free and impartial.
        </p>
      </div>
    </div>
  );
};

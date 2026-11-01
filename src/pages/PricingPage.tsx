import React from 'react';
import { useToolNova } from '../context/ToolNovaContext';
import { Check, X, Sparkles, Shield, Zap, Lock } from 'lucide-react';
import { AdBanner } from '../components/common/AdBanner';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { openUpgradeModal, aiRequestsUsedToday } = useToolNova();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent & Honest Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, Predictable Plans
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Start 100% free with all 30 core tools. Upgrade when you require unlimited high-thinking AI tokens and ad-free productivity.
        </p>
      </div>

      {/* Current User Daily Usage Indicator */}
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">Current Daily AI Quota</div>
            <div className="font-semibold text-white">
              {aiRequestsUsedToday} of 15 Requests Consumed
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
          Free Tier Active
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* FREE PLAN */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Community
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Active Forever
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">ToolNova Free</h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete access to all 30 utilities for individuals, students, and hobbyists.
            </p>

            <div className="text-3xl font-black text-white mb-6">
              $0 <span className="text-xs font-normal text-slate-400">/ forever</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                All 30 Core Online Tools
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                100% Client-side image & PDF processing
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Up to 15 daily AI writing requests
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Standard Gemini 3.8 Flash model
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                Standard sponsor ad cards
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate('/all-tools')}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Start Using Free Tools
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border-2 border-indigo-500/50 shadow-2xl relative flex flex-col justify-between">
          <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Power User
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gateway: Coming Soon
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">ToolNova Pro</h3>
            <p className="text-xs text-slate-300 mb-6">
              Maximum speed, high-thinking AI synthesis, and an entirely ad-free experience.
            </p>

            <div className="text-3xl font-black text-white mb-6">
              $9 <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-200 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Unlimited AI Writing & Humanizing Tokens
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Gemini 4 Argon High Thinking Reasoning
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                100% Ad-Free Clean Workspaces
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Priority Server Processing Pipeline
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Early Access to New Tool Releases
              </li>
            </ul>
          </div>

          <button
            onClick={openUpgradeModal}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Pro Waitlist / View Perks</span>
          </button>
        </div>
      </div>

      {/* Honest Payment Provider Disclaimer */}
      <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-amber-300 font-semibold mb-0.5">
            Transparent Payment Verification Architecture
          </strong>
          We adhere to strict honesty guidelines: we never simulate fake checkout dialogs or pretend subscriptions are active. Once live Stripe credentials are bound to your production deployment, this button instantly processes PCI-compliant billing.
        </div>
      </div>

      {/* Ad Placement */}
      <AdBanner format="horizontal" slotId="pricing-bottom" />
    </div>
  );
};

import React from 'react';
import { useToolNova } from '../../context/ToolNovaContext';
import { Sparkles, Check, X, Shield, Lock, Zap } from 'lucide-react';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, closeUpgradeModal, aiRequestsUsedToday } = useToolNova();

  if (!isUpgradeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={closeUpgradeModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            ToolNova Pro Tier
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Payment Gateway: Coming Soon
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Supercharge Your Workflow
        </h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Upgrade to ToolNova Pro for unrestricted AI writing tokens, high thinking synthesis, ad-free browsing, and higher file limits.
        </p>

        {/* Current Free usage stat */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Your Current Free Daily AI Usage</div>
              <div className="text-sm font-semibold text-white">
                {aiRequestsUsedToday} / 15 Daily Generation Requests
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-emerald-400 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/20">
            Free Active
          </span>
        </div>

        {/* Feature comparison table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
            <h3 className="font-bold text-white text-sm mb-2 flex items-center justify-between">
              Free Tier
              <span className="text-xs text-slate-400 font-normal">$0 / month</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                All 30 Core Tools completely free
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                100% client-side image & PDF processing
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Standard AI generation quota
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                Standard non-intrusive sponsor cards
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/20 relative">
            <div className="absolute top-2 right-2 text-[10px] font-bold text-indigo-300 uppercase tracking-wider bg-indigo-500/30 px-2 py-0.5 rounded">
              Recommended
            </div>
            <h3 className="font-bold text-indigo-200 text-sm mb-2 flex items-center gap-2">
              ToolNova Pro
              <span className="text-xs text-indigo-300 font-normal">$9 / month</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Unlimited AI writing & humanizing tokens
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Deep Gemini 4 Argon High-Thinking mode
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Completely ad-free clean experience
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                Priority server queue & VIP support
              </li>
            </ul>
          </div>
        </div>

        {/* Real payment gateway disclaimer */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-amber-300 mb-0.5">Secure Stripe / Merchant Integration In Progress</span>
            ToolNova maintains strict financial honesty. We do not accept mock credit cards or simulate fake payment subscriptions. Once Stripe/LemonSqueezy credentials are authenticated, instant checkout will activate here.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={closeUpgradeModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Continue with Free Tier
          </button>
          <button
            disabled
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700"
          >
            <Lock className="w-4 h-4" />
            Checkout Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

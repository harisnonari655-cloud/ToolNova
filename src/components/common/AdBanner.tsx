import React, { useEffect } from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'responsive';
  className?: string;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = 'default-slot',
  format = 'responsive',
  className = '',
  label = 'Advertisement'
}) => {
  // Read configured publisher ID from client env
  const publisherId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_PUB_ID) || '';
  const isAdSenseConfigured = Boolean(publisherId && publisherId.startsWith('ca-pub-'));

  useEffect(() => {
    if (isAdSenseConfigured && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense load notice:', err);
      }
    }
  }, [isAdSenseConfigured, slotId]);

  // Dimension classes based on format
  const formatClasses = {
    horizontal: 'min-h-[90px] w-full max-w-4xl',
    rectangle: 'min-h-[250px] w-full max-w-sm',
    vertical: 'min-h-[600px] w-full max-w-[300px]',
    responsive: 'min-h-[100px] w-full'
  }[format];

  if (isAdSenseConfigured) {
    return (
      <div className={`my-6 mx-auto text-center ${className}`}>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-1">
          {label}
        </span>
        <div className={`overflow-hidden rounded-xl bg-slate-900/40 border border-slate-800/80 ${formatClasses}`}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Development & Unconfigured Placeholder (Clean, non-intrusive, honest)
  return (
    <div className={`my-6 mx-auto text-center ${className}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-1.5">
        Sponsored Space
      </span>
      <div
        className={`flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-700/50 bg-slate-900/20 text-slate-400 dark:text-slate-500 text-xs transition-colors hover:border-slate-600 ${formatClasses}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500/60 animate-pulse" />
          <span className="font-semibold text-slate-300 dark:text-slate-400">AdSense Ready Placement</span>
        </div>
        <p className="max-w-md text-[11px] text-slate-400 leading-relaxed">
          Configure <code className="px-1 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[10px]">VITE_ADSENSE_PUB_ID</code> to display certified Google advertising. No third-party scripts loaded without configuration.
        </p>
      </div>
    </div>
  );
};

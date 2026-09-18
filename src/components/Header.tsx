import React, { useState } from 'react';
import { Download, Sparkles, Wifi, WifiOff, RotateCcw, Smartphone, HelpCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface HeaderProps {
  currentStep: number;
  isTourMode: boolean;
  onToggleTourMode: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  isTourMode,
  onToggleTourMode,
  onResetDemo,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-lime-200/80 px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-lime-500 flex items-center justify-center text-white shadow-sm ring-2 ring-lime-200">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-800 text-sm tracking-tight">AuraFix</span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-300">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Consumption-Aware AI</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Online/Offline Status Indicator */}
          <span
            title={isOnline ? 'Online & Service Worker active' : 'Offline mode — Cached assets loaded'}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Wifi className="w-2.5 h-2.5" />
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <WifiOff className="w-2.5 h-2.5" />
                Offline
              </>
            )}
          </span>

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-1 bg-lime-500 hover:bg-lime-600 active:scale-95 text-slate-900 font-semibold text-xs px-2.5 py-1.5 rounded-lg shadow-sm transition"
              title="Install AuraFix as standalone mobile app"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSModal(true)}
              className="flex items-center gap-1 border border-lime-300 bg-lime-50 hover:bg-lime-100 text-lime-800 text-xs px-2 py-1 rounded-lg transition font-medium"
              title="Install on iOS"
            >
              <Smartphone className="w-3 h-3" />
              <span>iOS App</span>
            </button>
          )}

          {/* Reset Demo */}
          <button
            onClick={onResetDemo}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            title="Reset Demo to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Tour Mode Toggle */}
          <button
            onClick={onToggleTourMode}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
              isTourMode
                ? 'bg-lime-50 border-lime-300 text-lime-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-lime-600" />
            <span>{isTourMode ? `Step ${currentStep}/8` : 'Explore'}</span>
          </button>
        </div>
      </div>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-lime-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-lime-500 text-white flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 bg-lime-50/70 p-2.5 rounded-xl border border-lime-200">
                <span className="w-5 h-5 rounded-full bg-lime-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  1
                </span>
                <p>Tap the <strong>Share button</strong> in your Safari bottom toolbar.</p>
              </div>
              <div className="flex items-start gap-2.5 bg-lime-50/70 p-2.5 rounded-xl border border-lime-200">
                <span className="w-5 h-5 rounded-full bg-lime-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  2
                </span>
                <p>Scroll down the share sheet and tap <strong>Add to Home Screen</strong>.</p>
              </div>
              <div className="flex items-start gap-2.5 bg-lime-50/70 p-2.5 rounded-xl border border-lime-200">
                <span className="w-5 h-5 rounded-full bg-lime-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  3
                </span>
                <p>Launch AuraFix from your home screen for full-screen offline app experience.</p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-4 w-full rounded-xl bg-lime-500 text-slate-900 font-semibold py-2 text-xs hover:bg-lime-600 transition"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

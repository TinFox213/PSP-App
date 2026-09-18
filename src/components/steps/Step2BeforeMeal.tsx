import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { PlateVisualizer } from '../PlateVisualizer';
import { FoodDetection } from '../../types';

interface Step2BeforeMealProps {
  detections: FoodDetection[];
  onNextStep: () => void;
}

export const Step2BeforeMeal: React.FC<Step2BeforeMealProps> = ({
  detections,
  onNextStep,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-lg font-black text-slate-800 truncate">Before-Meal Capture (Served)</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Step 2 of 8 · Served Baseline Analysis</p>
            </div>
          </div>
          <button
            onClick={handleSimulateRescan}
            disabled={isScanning}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition shadow-2xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-lime-600' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
          </button>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop (lg+) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Simulated Plate Visualizer */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lime-600" />
              Simulated Plate: 3 Dosas + Sambar + Chutney
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Segmented (3 Items)
            </span>
          </div>

          <PlateVisualizer mode="before" detections={detections} />
        </div>

        {/* Right Column (5 cols): Detected Food Inventory Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
            <Layers className="w-4 h-4 text-lime-600" />
            <span>AI Multi-Label Segmentation</span>
          </div>

          <div className="space-y-2.5">
            {detections.map((det) => (
              <div
                key={det.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-lime-50/50 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: det.color }} />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">{det.name}</h4>
                    <p className="text-[11px] text-slate-500">{det.tamilName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 block">{det.quantity}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold font-mono">
                    ~{det.estimatedWeightG}g · {(det.confidence * 100).toFixed(0)}% conf
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-slate-600 text-xs flex justify-between items-center">
            <span className="font-semibold text-slate-700">Total Served Baseline:</span>
            <span className="font-black text-slate-900">495g Total Plate Mass</span>
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 3: Capture Leftover Plate</span>
        <span>→</span>
      </button>
    </div>
  );
};

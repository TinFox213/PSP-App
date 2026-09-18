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
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Before-Meal Capture (Served)</h2>
              <p className="text-xs text-slate-500">Step 2 of 8 · Baseline Serving Analysis</p>
            </div>
          </div>
          <button
            onClick={handleSimulateRescan}
            disabled={isScanning}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-lime-300 bg-lime-50 text-lime-800 hover:bg-lime-100 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-lime-600' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
          </button>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 2: Captures served portions before consumption."
        </div>
      </div>

      {/* Simulated Plate Card with AI Overlays */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            Simulated Plate: 3 Dosas + Sambar + Chutney
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Segmented (3 Items)
          </span>
        </div>

        <PlateVisualizer mode="before" detections={detections} />
      </div>

      {/* Detected Food Inventory Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Layers className="w-4 h-4 text-lime-600" />
          <span>Simulated AI Vision Overlays & Tags</span>
        </div>

        <div className="space-y-2">
          {detections.map((det) => (
            <div
              key={det.id}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-lime-50/40 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: det.color }} />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{det.name}</h4>
                  <p className="text-[11px] text-slate-500">{det.tamilName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-slate-900 block">{det.quantity}</span>
                <span className="text-[10px] text-emerald-600 font-semibold font-mono">
                  ~{det.estimatedWeightG}g · {(det.confidence * 100).toFixed(0)}% conf
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 text-slate-600 text-xs flex justify-between items-center">
          <span className="font-medium">Total Served Baseline:</span>
          <span className="font-extrabold text-slate-900">300g Dosa + 150g Sambar + 45g Chutney</span>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 3: Capture Leftover Plate</span>
        <span>→</span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Scale, Check } from 'lucide-react';
import { FoodDetection } from '../types';

interface PlateVisualizerProps {
  mode: 'before' | 'after';
  detections: FoodDetection[];
  showControls?: boolean;
}

export const PlateVisualizer: React.FC<PlateVisualizerProps> = ({
  mode,
  detections,
  showControls = true,
}) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [selectedDetection, setSelectedDetection] = useState<string | null>(null);

  const isBefore = mode === 'before';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-lime-200/80 shadow-md">
      {/* Visual Canvas / SVG Meal Representation */}
      <div className="relative aspect-[4/3] w-full flex items-center justify-center p-3 select-none">
        <svg
          viewBox="0 0 500 380"
          className="w-full h-full object-contain filter drop-shadow-xl"
        >
          <defs>
            {/* Stainless Steel Platter Rim Gradient */}
            <radialGradient id="platterMetal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f8fafc" />
              <stop offset="70%" stop-color="#e2e8f0" />
              <stop offset="92%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#94a3b8" />
            </radialGradient>
            {/* Banana Leaf Base */}
            <linearGradient id="bananaLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#15803d" />
              <stop offset="50%" stop-color="#16a34a" />
              <stop offset="100%" stop-color="#14532d" />
            </linearGradient>
            {/* Dosa Texture Gradients */}
            <linearGradient id="dosaGolden" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="25%" stop-color="#facc15" />
              <stop offset="50%" stop-color="#d97706" />
              <stop offset="75%" stop-color="#b45309" />
              <stop offset="100%" stop-color="#fde047" />
            </linearGradient>
            <linearGradient id="dosaCrisp" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stop-color="#ca8a04" />
              <stop offset="40%" stop-color="#92400e" />
              <stop offset="70%" stop-color="#b45309" />
              <stop offset="100%" stop-color="#eab308" />
            </linearGradient>
            {/* Sambar Gradient */}
            <radialGradient id="sambarGravy" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ea580c" />
              <stop offset="60%" stop-color="#c2410c" />
              <stop offset="100%" stop-color="#9a3412" />
            </radialGradient>
            {/* Coconut Chutney Gradient */}
            <radialGradient id="chutneyWhite" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="70%" stop-color="#f1f5f9" />
              <stop offset="100%" stop-color="#e2e8f0" />
            </radialGradient>
          </defs>

          {/* Platter Shadow */}
          <ellipse cx="250" cy="205" rx="220" ry="165" fill="#020617" opacity="0.6" />

          {/* Stainless Steel Thali Rim */}
          <ellipse cx="250" cy="190" rx="224" ry="160" fill="url(#platterMetal)" stroke="#64748b" strokeWidth="4" />
          <ellipse cx="250" cy="190" rx="208" ry="146" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />

          {/* Fresh Banana Leaf Insert */}
          <path
            d="M 68 190 C 68 120, 150 68, 250 68 C 350 68, 432 120, 432 190 C 432 260, 350 312, 250 312 C 150 312, 68 260, 68 190 Z"
            fill="url(#bananaLeaf)"
            opacity="0.95"
          />
          {/* Leaf rib lines */}
          <path d="M 75 190 L 425 190" stroke="#14532d" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.5" />
          <path d="M 160 110 L 250 190 L 160 270" stroke="#14532d" strokeWidth="1.5" opacity="0.3" fill="none" />
          <path d="M 280 100 L 330 190 L 280 280" stroke="#14532d" strokeWidth="1.5" opacity="0.3" fill="none" />

          {/* FOOD RENDERING: BEFORE MEAL */}
          {isBefore ? (
            <g id="before-food-group">
              {/* Dosa 1 (Bottom layer) */}
              <ellipse cx="190" cy="235" rx="115" ry="38" fill="url(#dosaGolden)" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 100 232 Q 190 220 280 234" stroke="#92400e" strokeWidth="2.5" opacity="0.7" fill="none" />
              <circle cx="160" cy="230" r="4" fill="#78350f" opacity="0.6" />
              <circle cx="210" cy="242" r="3" fill="#78350f" opacity="0.5" />

              {/* Dosa 2 (Middle layer) */}
              <ellipse cx="205" cy="195" rx="120" ry="40" fill="url(#dosaCrisp)" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 110 190 Q 205 178 300 192" stroke="#78350f" strokeWidth="2" opacity="0.7" fill="none" />
              <circle cx="170" cy="188" r="4" fill="#451a03" opacity="0.7" />
              <circle cx="230" cy="202" r="5" fill="#451a03" opacity="0.7" />
              <circle cx="260" cy="192" r="3" fill="#451a03" opacity="0.6" />

              {/* Dosa 3 (Top folded roll) */}
              <path
                d="M 115 155 Q 220 130 325 158 Q 230 185 115 155 Z"
                fill="url(#dosaGolden)"
                stroke="#78350f"
                strokeWidth="2"
              />
              <path d="M 140 152 Q 220 142 300 156" stroke="#451a03" strokeWidth="3" opacity="0.8" fill="none" />
              <circle cx="180" cy="150" r="3" fill="#451a03" opacity="0.7" />
              <circle cx="235" cy="153" r="4" fill="#451a03" opacity="0.8" />
              <circle cx="280" cy="154" r="3" fill="#451a03" opacity="0.7" />

              {/* Sambar Bowl (Top Right) */}
              <g transform="translate(325, 95)">
                <circle cx="45" cy="45" r="46" fill="#cbd5e1" stroke="#64748b" strokeWidth="3" />
                <circle cx="45" cy="45" r="41" fill="url(#sambarGravy)" />
                {/* Sambar Veggies (Drumstick, tomato, coriander) */}
                <rect x="25" y="38" width="22" height="7" rx="3" fill="#15803d" stroke="#14532d" strokeWidth="1" />
                <circle cx="55" cy="35" r="5" fill="#dc2626" />
                <circle cx="40" cy="55" r="3" fill="#eab308" />
                <circle cx="58" cy="52" r="2" fill="#1e293b" /> {/* Mustard seed */}
                <circle cx="34" cy="32" r="1.5" fill="#1e293b" />
                {/* Coriander leaf */}
                <path d="M 45 42 Q 52 38 48 46 Q 44 48 45 42" fill="#22c55e" />
              </g>

              {/* Coconut Chutney Cup (Bottom Left) */}
              <g transform="translate(75, 220)">
                <circle cx="35" cy="35" r="34" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
                <circle cx="35" cy="35" r="30" fill="url(#chutneyWhite)" />
                {/* Mustard seed & Curry Leaf tempering */}
                <circle cx="32" cy="30" r="2" fill="#1e293b" />
                <circle cx="42" cy="36" r="1.8" fill="#1e293b" />
                <circle cx="26" cy="40" r="1.5" fill="#1e293b" />
                <path d="M 33 34 Q 40 28 36 38 Z" fill="#15803d" />
              </g>
            </g>
          ) : (
            /* FOOD RENDERING: AFTER MEAL (LEFTOVER) */
            <g id="after-food-group">
              {/* Eaten Plate Smears & Oil Sheen */}
              <path
                d="M 120 170 Q 180 150 250 180 Q 200 230 130 200 Z"
                fill="#facc15"
                opacity="0.15"
              />
              <path
                d="M 140 210 Q 170 205 190 220"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="4 8"
                opacity="0.3"
                fill="none"
              />

              {/* 0.5 Dosa Leftover Fragment */}
              <g transform="translate(190, 160)">
                {/* Broken/eaten ragged edge */}
                <path
                  d="M 20 10 Q 70 5 110 35 Q 90 70 40 65 Q 10 50 15 30 Q 8 20 20 10 Z"
                  fill="url(#dosaGolden)"
                  stroke="#78350f"
                  strokeWidth="2"
                />
                {/* Crisp pores & toasted center */}
                <ellipse cx="60" cy="35" rx="35" ry="18" fill="url(#dosaCrisp)" opacity="0.8" />
                <circle cx="50" cy="32" r="3" fill="#451a03" opacity="0.8" />
                <circle cx="75" cy="40" r="3.5" fill="#451a03" opacity="0.8" />
                <path d="M 35 25 Q 60 20 85 28" stroke="#78350f" strokeWidth="2" opacity="0.7" fill="none" />
                {/* Bite marks indicator */}
                <path d="M 15 30 Q 25 35 20 45" stroke="#451a03" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
              </g>

              {/* Sambar Bowl (Top Right - Nearly empty residual) */}
              <g transform="translate(325, 95)">
                <circle cx="45" cy="45" r="46" fill="#cbd5e1" stroke="#64748b" strokeWidth="3" />
                <circle cx="45" cy="45" r="41" fill="#f8fafc" />
                {/* Residual thin pool at bottom */}
                <ellipse cx="46" cy="52" rx="25" ry="12" fill="url(#sambarGravy)" opacity="0.75" />
                <circle cx="48" cy="53" r="1.5" fill="#1e293b" />
                <circle cx="40" cy="50" r="1.5" fill="#1e293b" />
              </g>

              {/* Chutney Bowl (Bottom Left - Completely wiped clean) */}
              <g transform="translate(75, 220)">
                <circle cx="35" cy="35" r="34" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
                <circle cx="35" cy="35" r="30" fill="#f8fafc" />
                {/* Clean plate with small smear */}
                <path d="M 26 30 Q 35 34 42 28" stroke="#16a34a" strokeWidth="1.5" opacity="0.3" fill="none" />
              </g>
            </g>
          )}

          {/* AI COMPUTER VISION BOUNDING BOXES & LABELS */}
          {showOverlays && (
            <g id="ai-bounding-overlays">
              {detections.map((det) => {
                const isSelected = selectedDetection === det.id;
                // Convert percentage box to 500x380 SVG coordinates
                const x = (det.box.x / 100) * 500;
                const y = (det.box.y / 100) * 380;
                const w = (det.box.width / 100) * 500;
                const h = (det.box.height / 100) * 380;

                return (
                  <g
                    key={det.id}
                    onClick={() => setSelectedDetection(isSelected ? null : det.id)}
                    className="cursor-pointer transition-transform"
                  >
                    {/* Glowing Bounding Box */}
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="8"
                      fill={det.color}
                      fillOpacity={isSelected ? '0.25' : '0.12'}
                      stroke={det.color}
                      strokeWidth={isSelected ? '3' : '2'}
                      strokeDasharray={isSelected ? 'none' : '4 2'}
                    />

                    {/* Corner Reticles */}
                    <path
                      d={`M ${x} ${y + 12} L ${x} ${y} L ${x + 12} ${y}`}
                      stroke={det.color}
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d={`M ${x + w - 12} ${y} L ${x + w} ${y} L ${x + w} ${y + 12}`}
                      stroke={det.color}
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d={`M ${x} ${y + h - 12} L ${x} ${y + h} L ${x + 12} ${y + h}`}
                      stroke={det.color}
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d={`M ${x + w - 12} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - 12}`}
                      stroke={det.color}
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Tag Badge Clamped to SVG canvas */}
                    {(() => {
                      const badgeW = Math.min(Math.max(w * 0.9, 130), 160);
                      const badgeX = Math.min(Math.max(x, 8), 500 - badgeW - 8);
                      const badgeY = Math.max(y - 28, 10);
                      return (
                        <g transform={`translate(${badgeX}, ${badgeY})`}>
                          <rect
                            width={badgeW}
                            height="24"
                            rx="6"
                            fill="#0f172a"
                            stroke={det.color}
                            strokeWidth="1.5"
                            opacity="0.95"
                          />
                          <circle cx="10" cy="12" r="3.5" fill={det.color} />
                          <text
                            x="20"
                            y="15"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="system-ui"
                          >
                            {det.name.split(' ')[0]} · {det.quantity}
                          </text>
                          <text
                            x={badgeW - 6}
                            y="15"
                            fill={det.color}
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="end"
                            fontFamily="system-ui"
                          >
                            {Math.round(det.confidence * 100)}%
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* Live Camera Scanner Line (Simulation) */}
        <div className="absolute inset-x-4 top-4 bottom-4 pointer-events-none overflow-hidden rounded-xl">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent shadow-[0_0_12px_#84cc16] animate-pulse" />
        </div>
      </div>

      {/* Control Banner & Detections List */}
      {showControls && (
        <div className="bg-slate-900/95 border-t border-slate-800 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs font-bold text-slate-100">
                {isBefore ? 'Served Plate Detection' : 'Leftover Plate Detection'}
              </span>
            </div>
            <button
              onClick={() => setShowOverlays(!showOverlays)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md transition"
            >
              {showOverlays ? (
                <>
                  <EyeOff className="w-3 h-3 text-slate-400" />
                  <span>Hide Overlays</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 text-lime-400" />
                  <span>Show Overlays</span>
                </>
              )}
            </button>
          </div>

          {/* Detections Chips */}
          <div className="flex flex-wrap gap-1.5">
            {detections.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-semibold text-slate-100">{d.name}</span>
                <span className="text-[10px] text-lime-400 font-mono">({d.quantity})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

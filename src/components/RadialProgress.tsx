import React from 'react';

interface RadialProgressProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  bgColor?: string;
  size?: number;
  strokeWidth?: number;
  sublabel?: string;
}

export const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  max,
  label,
  unit,
  color,
  bgColor = '#e2e8f0',
  size = 80,
  strokeWidth = 7,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold tracking-tight text-slate-800">
            {Math.round(value)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium -mt-0.5">{unit}</span>
        </div>
      </div>
      <span className="mt-1.5 text-xs font-semibold text-slate-700">{label}</span>
      {sublabel && <span className="text-[10px] text-slate-400">{sublabel}</span>}
    </div>
  );
};

import React from "react";

export interface DonutChartProps {
  percentage: number;
}

export function DonutChart({ percentage }: DonutChartProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // ≈ 175.9
  const dashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-16 h-16 -rotate-90 absolute top-0 left-0">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke="var(--color-surface-container, #e5efff)"
          strokeWidth="6"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke="#0E7C86"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="text-sm font-bold text-text-primary z-10">{percentage}%</span>
    </div>
  );
}

import React from "react";
import { HeatmapCell } from "@/lib/data/dashboard-full";
import { getRiskRatingSolidColor } from "@/lib/data/risk-register";

export interface HeatmapGridProps {
  data: HeatmapCell[];
}

export function HeatmapGrid({ data }: HeatmapGridProps) {
  return (
    <div className="grid grid-cols-5 gap-1 w-full max-w-[400px] aspect-square">
      {data.map((cell, index) => (
        <div
          key={index}
          className={`flex items-center justify-center font-semibold text-sm ${getRiskRatingSolidColor(cell.rating)} risk-grid-item`}
        >
          {cell.count}
        </div>
      ))}
    </div>
  );
}

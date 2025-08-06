import React from "react";

interface LinePlotMockProps {
  width?: number;
  height?: number;
  phData: number[];
  doData: number[];
  className?: string;
}

const chartPadding = 32;
const chartWidth = 400;
const chartHeight = 160;

// Utility to scale data to chart Y-coord
function scale(value: number, [min, max]: [number, number], height: number) {
  return chartPadding + ((max - value) / (max - min)) * (height - 2 * chartPadding);
}

export default function LinePlotMock({ width = chartWidth, height = chartHeight, className = "", phData, doData }: LinePlotMockProps) {
  // Build points for each series
  const xStep = (width - 2 * chartPadding) / (phData.length - 1);
  const pHPoints = phData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [6.5, 7.3], height)}`
  ).join(" ");
  const doPoints = doData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [80, 100], height)}`
  ).join(" ");

  return (
    <div>
      <svg width={width} height={height} className="block mx-auto">
        {/* DO Line */}
        <polyline
          points={doPoints}
          fill="none"
          stroke="#173D3C"
          strokeWidth={2.5}
          opacity={0.9}
        />
        {/* pH Line */}
        <polyline
          points={pHPoints}
          fill="none"
          stroke="#26bfa6"
          strokeWidth={2.5}
          opacity={0.85}
        />
        {/* Optionally add points */}
        {doData.map((d, i) => (
          <circle key={i} cx={chartPadding + i * xStep} cy={scale(d, [80, 100], height)} r={2.5} fill="#173D3C" />
        ))}
        {phData.map((d, i) => (
          <circle key={i} cx={chartPadding + i * xStep} cy={scale(d, [6.5, 7.3], height)} r={2.5} fill="#26bfa6" />
        ))}
      </svg>
    </div>
  );
}

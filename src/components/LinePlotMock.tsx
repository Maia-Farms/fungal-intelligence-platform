import React from "react";

type LinePlotMockProps = {
  width?: number;
  height?: number;
  className?: string;
};

const pHData = [6.8, 7.0, 7.1, 7.2, 7.15, 7.0, 6.95, 7.05, 7.00, 6.97, 7.02, 7.01];
const doData = [95, 94, 92, 90, 88, 85, 87, 89, 91, 93, 90, 92];
const timeLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];

const chartPadding = 32;
const chartWidth = 400;
const chartHeight = 160;

// Utility to scale data to chart Y-coord
function scale(value: number, [min, max]: [number, number], height: number) {
  return chartPadding + ((max - value) / (max - min)) * (height - 2 * chartPadding);
}

export default function LinePlotMock({ width = chartWidth, height = chartHeight, className = "" }: LinePlotMockProps) {
  // Build points for each series
  const xStep = (width - 2 * chartPadding) / (pHData.length - 1);
  const pHPoints = pHData.map((d, i) =>
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
        {pHData.map((d, i) => (
          <circle key={i} cx={chartPadding + i * xStep} cy={scale(d, [6.5, 7.3], height)} r={2.5} fill="#26bfa6" />
        ))}
      </svg>
    </div>
  );
}

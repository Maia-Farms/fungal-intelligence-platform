import React from "react";

interface LinePlotMockProps {
  width?: number; // Logical width for viewBox math
  height?: number; // Logical height for viewBox math
  phData: number[];
  doData: number[];
  className?: string;
}

const chartPadding = 20; // Less for a closer-to-edge look
const chartWidth = 340;  // Logical width for viewBox, not rendered px
const chartHeight = 100; // Logical height

function scale(value: number, [min, max]: [number, number], height: number) {
  return chartPadding + ((max - value) / (max - min)) * (height - 2 * chartPadding);
}

export default function LinePlotMock({
  width = chartWidth,
  height = chartHeight,
  className = "",
  phData,
  doData
}: LinePlotMockProps) {
  const xStep = (width - 2 * chartPadding) / (phData.length - 1);

  const pHPoints = phData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [6.5, 7.3], height)}`
  ).join(" ");
  const doPoints = doData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [80, 100], height)}`
  ).join(" ");

  return (
    <div className={className} style={{ width: "100%" }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="block"
        style={{ display: "block" }}
      >
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
        {doData.map((d, i) => (
          <circle key={`do-${i}`}
            cx={chartPadding + i * xStep}
            cy={scale(d, [80, 100], height)}
            r={2.5} fill="#173D3C"
          />
        ))}
        {phData.map((d, i) => (
          <circle key={`ph-${i}`}
            cx={chartPadding + i * xStep}
            cy={scale(d, [6.5, 7.3], height)}
            r={2.5} fill="#26bfa6"
          />
        ))}
      </svg>
    </div>
  );
}

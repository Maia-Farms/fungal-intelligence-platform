import React from "react";

interface LinePlotMockProps {
  width?: number;
  height?: number;
  phData: number[];
  doData: number[];
  className?: string;
}

const chartPadding = 20;
const bottomLabelSpace = 20;
const chartWidth = 340;
// Add bottom space to the overall height, so e.g. 125 + 20 = 145
const chartHeight = 145;

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
  const numPoints = phData.length;
  const xStep = (width - 2 * chartPadding) / (numPoints - 1);

  const pHPoints = phData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [6.5, 7.3], height)}`
  ).join(" ");
  const doPoints = doData.map((d, i) =>
    `${chartPadding + i * xStep},${scale(d, [80, 100], height)}`
  ).join(" ");

  // Y positions for top and bottom lines
const topY = chartPadding;
const botY = height - chartPadding - bottomLabelSpace;
  const labelOffset = 2;
  const fontSize = 11;

  // Tick/label intervals (for 120 points, each 1min, 15min=every 15pts, 30min=every 30pts)
  const tickEvery = 15;
  const labelEvery = 30;
  const totalMinutes = numPoints - 1;

  // Helper to make time string, e.g., "0:00", "0:15", "0:30", "1:00"
  function minuteToLabel(min: number) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }

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
        {/* Top horizontal line */}
        <line
          x1={chartPadding}
          x2={width - chartPadding}
          y1={topY}
          y2={topY}
          stroke="#e5e7eb"
          strokeWidth={2}
        />
        {/* Bottom horizontal line */}
        <line
          x1={chartPadding}
          x2={width - chartPadding}
          y1={botY}
          y2={botY}
          stroke="#e5e7eb"
          strokeWidth={2}
        />

        {/* Top-left: DO max label */}
        <text
          x={chartPadding + labelOffset}
          y={topY - 4}
          fontSize={fontSize}
          fill="#173D3C"
          fontWeight={700}
          textAnchor="start"
        >
          DO 100
        </text>
        {/* Top-right: pH max label */}
        <text
          x={width - chartPadding - labelOffset}
          y={topY - 4}
          fontSize={fontSize}
          fill="#26bfa6"
          fontWeight={700}
          textAnchor="end"
        >
          pH 7.3
        </text>
        {/* Bottom-left: DO min label */}
        <text
          x={chartPadding + labelOffset}
          y={botY + fontSize + 2}
          fontSize={fontSize}
          fill="#173D3C"
          fontWeight={700}
          textAnchor="start"
        >
          DO 80
        </text>
        {/* Bottom-right: pH min label */}
        <text
          x={width - chartPadding - labelOffset}
          y={botY + fontSize + 2}
          fontSize={fontSize}
          fill="#26bfa6"
          fontWeight={700}
          textAnchor="end"
        >
          pH 6.5
        </text>

        {/* Tick marks and labels */}
        {Array.from({ length: numPoints }).map((_, i) => {
          if (i % tickEvery !== 0 && i % labelEvery !== 0) return null;
          const x = chartPadding + i * xStep;
          // Ticks every 15 mins, longer ticks for labels (every 30 mins)
          const isLabel = i % labelEvery === 0;
          return (
            <g key={`tick-${i}`}>
              {/* Tick line */}
              <line
                x1={x}
                x2={x}
                y1={botY}
                y2={botY + (isLabel ? 10 : 5)}
                stroke="#bdbdbd"
                strokeWidth={isLabel ? 1.5 : 1}
              />
              {/* Label (every 30 mins, skip the very last tick if you prefer) */}
              {isLabel && (
                <text
                  x={x}
                  y={botY + fontSize + 14}
                  fontSize={fontSize - 1}
                  fill="#555"
                  textAnchor="middle"
                  fontWeight={400}
                >
                  {minuteToLabel(i)}
                </text>
              )}
            </g>
          );
        })}

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
        {/* {doData.map((d, i) => (
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
        ))} */}
      </svg>
    </div>
  );
}

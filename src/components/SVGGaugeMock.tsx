import React from "react";

interface SVGGaugeProps {
  value: number;
  min?: number;
  max?: number;
  units?: string;
  title?: string;
  // size?: number; // REMOVE this prop
  className?: string;
  aspectRatio?: number; // Optional: lets you tweak the visual shape
}

const LOGICAL_SIZE = 120; // The virtual coordinate system for your gauge

const SVGGauge: React.FC<SVGGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  units,
  title,
  aspectRatio = 1, // 1 (circle), >1 (wide oval), <1 (tall oval)
  className = ""
}) => {
  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));
  // Color logic
let arcColor = "#26bfa6"; // green, default
if (percent < 0.15 || percent > 0.85) {
  arcColor = "#e53935"; // red
} else if ((percent >= 0.15 && percent < 0.3) || (percent > 0.7 && percent <= 0.85)) {
  arcColor = "#fdd835"; // yellow (amber)
}
  const radius = LOGICAL_SIZE / 2 - 12;
  const cx = LOGICAL_SIZE / 2, cy = LOGICAL_SIZE / 2;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ * (1 - percent);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${LOGICAL_SIZE * aspectRatio} ${LOGICAL_SIZE}`}
        style={{ maxWidth: "100px", height: "auto", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background arc */}
        <circle
          cx={cx * aspectRatio}
          cy={cy}
          r={radius}
          fill="none"
          stroke={"#D9D9D9"}
          strokeWidth="12"
        />
        {/* Value arc */}
        <circle
          cx={cx * aspectRatio}
          cy={cy}
          r={radius}
          fill="none"
          stroke={arcColor}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx * aspectRatio} ${cy})`}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,2,.1,1)" }}
        />
        {/* Value text */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="font-halvar-medium font-bold"
          style={{ fontSize: LOGICAL_SIZE * 0.28, fill: "#173D3C" }}
        >
          {value}
        </text>
        {/* Units */}
        {units &&
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="font-halvar"
            style={{ fontSize: LOGICAL_SIZE * 0.145, fill: "#262626" }}
          >
            {units}
          </text>
        }
      </svg>
      {title && (
        <span className="mt-1 text-xs font-halvar-medium text-[#262626]">{title}</span>
      )}
    </div>
  );
};

export default SVGGauge;

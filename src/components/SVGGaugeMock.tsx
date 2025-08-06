import React from "react";

type SVGGaugeProps = {
  value: number;       // Current value (e.g. 62)
  min?: number;        // Minimum (default 0)
  max?: number;        // Maximum (default 100)
  title?: string;      // Label or header for the gauge
  units?: string;      // (e.g. "°C", "pH")
  size?: number;       // SVG diameter in px (default 120)
  className?: string;
};

const SVGGauge: React.FC<SVGGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  title,
  units,
  size = 120,
  className = "",
}) => {
  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const radius = (size / 2) - 12;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ * (1 - percent);
  // Arc colors: adjust for your brand!
  const arcColor = "#26bfa6";
  const bgColor = "#D9D9D9";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {title && <div className="font-halvar mb-2 text-xs text-[#262626]">{title}</div>}
      <svg width={size} height={size} className="block">
        {/* Track (background arc) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth="12"
        />
        {/* Value arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={arcColor}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,2,.1,1)" }}
        />
        {/* Value text */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="font-halvar font-bold"
          style={{ fontSize: size * 0.25, fill: "#173D3C" }}
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
            style={{ fontSize: size * 0.14, fill: "#262626" }}
          >
            {units}
          </text>
        }
      </svg>
    </div>
  );
};

export default SVGGauge;

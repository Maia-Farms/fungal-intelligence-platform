import React from "react";

interface SiteOverviewCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  colorClass?: string;
  icon?: React.ReactNode;
  className?: string;
  delta?: number;          // <-- NEW
  deltaLabel?: string;     // <-- Optional extra
}

export const SiteOverviewCard: React.FC<SiteOverviewCardProps> = ({
  label,
  value,
  subtext,
  colorClass = "",
  icon,
  className = "",
  delta = undefined,
  deltaLabel = "7d", // Default to "7d"
}) => (
  <div
    className={`
      bg-white border border-black rounded-lg shadow-md
      p-4 flex flex-col items-center justify-center
      w-full
      ${className}
    `}
    style={{ minHeight: 100 }}
  >
    {icon && <div className="mb-3 text-2xl">{icon}</div>}
    <span className={`font-halvar-medium text-3xl text-[#173D3C] mb-1 ${colorClass}`}>{value}</span>
    {delta !== undefined && (
      <span
        className={`font-halvar-medium text-xs mb-1 ${
          delta > 0
            ? "text-green-600"
            : delta < 0
              ? "text-red-600"
              : "text-gray-400"
        }`}
      >
        {delta > 0 ? "+" : ""}
        {delta}
        <span className="text-xs font-halvar-medium ml-1">{deltaLabel}</span>
      </span>
    )}
    <span className="font-halvar-regular text-xs text-gray-800 mb-1 text-center">{label}</span>
    {subtext && (
      <span className="font-halvar-regular text-xs text-gray-400 text-center">{subtext}</span>
    )}
  </div>
);

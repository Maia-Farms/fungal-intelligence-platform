import React from "react";

interface SiteOverviewCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  colorClass?: string; // e.g. "text-[#26bfa6]"
  icon?: React.ReactNode;
  className?: string;
}

export const SiteOverviewCard: React.FC<SiteOverviewCardProps> = ({
  label,
  value,
  subtext,
  colorClass = "",
  icon,
  className = "",
}) => (
  <div
    className={`
      bg-white border border-black rounded-lg shadow-md
      p-4 flex flex-col items-center justify-center
      w-full
      ${className}
    `}
    style={{ minHeight: 100 }} // matches StatCard min height
  >
    {/* Icon (optional) */}
    {icon && <div className="mb-3 text-2xl">{icon}</div>}
    {/* Main Value */}
    <span className={`font-halvar font-bold text-3xl text-[#173D3C] mb-1 ${colorClass}`}>
      {value}
    </span>
    {/* Label */}
    <span className="font-halvar text-xs text-gray-800 mb-1 text-center">
      {label}
    </span>
    {/* Subtext (e.g. status or explanation) */}
    {subtext && (
      <span className="font-halvar text-xs text-gray-400 text-center">{subtext}</span>
    )}
  </div>
);

import React from "react";

const STAGES = [
  "Recipe Created",
  "Media Prepared",
  "Inoculum Prepared",
  "Inoculated",
  "Fermentation Complete",
  "Harvested",
];

interface StepProgressBarProps {
  currentStage: number; // 0-based index
  stages?: string[];
  className?: string;
  showLabels?: boolean;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStage,
  stages = STAGES,
  className = "",
  showLabels = false,
}) => (
  <div className={`w-full py-2 flex flex-col items-center ${className}`}>
    {/* Dots/Bars row */}
    <div className="flex items-center w-full px-2 md:px-4" style={{ position: 'relative' }}>
      {stages.map((_, idx) => (
        <React.Fragment key={idx}>
          {/* Dot */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`
                rounded-full w-4 h-4 border-2 transition
                ${idx <= currentStage
                  ? "bg-[#26bfa6] border-[#26bfa6]"
                  : "bg-white border-[#D9D9D9]"}
                ${idx === currentStage ? "slow-blink" : ""}
              `}
            />
          </div>
          {/* Bar, unless last dot */}
          {idx < stages.length - 1 && (
            <div
              className={`
                flex-1 h-1 mx-1 md:mx-2 transition
                ${idx < currentStage ? "bg-[#26bfa6]" : "bg-[#D9D9D9]"}
              `}
              style={{
                minWidth: 10,
                // Optional: Uncomment next line if you want to blink the bar as well.
                animation: idx === currentStage - 1 ? "slow-blink 1.5s infinite" : undefined
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
    {/* Conditionally render labels */}
    {showLabels && (
      <div
        className="relative w-full mt-3 h-5"
        style={{ minHeight: 18 }}
      >
        {stages.map((stage, idx) => {
          let transform =
            idx === 0
              ? "none"
              : idx === stages.length - 1
              ? "translateX(-100%)"
              : "translateX(-50%)";
          return (
            <span
              key={stage}
              className="absolute text-[10px] sm:text-xs text-center font-halvar whitespace-nowrap"
              style={{
                left: `${(idx / (stages.length - 1)) * 100}%`,
                transform,
                minWidth: 36,
              }}
            >
              {stage}
            </span>
          );
        })}
      </div>
    )}
  </div>
);

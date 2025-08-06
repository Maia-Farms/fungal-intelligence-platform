import React from "react";
import clsx from "clsx"; // (Optional, tailwind helper, or use string templates)

const STAGES = [
  "Recipe Created",
  "Media Prepared",
  "Inoculum Prepared",
  "Inoculated",
  "Fermentation Complete",
  "Harvested",
];

interface StepProgressBarProps {
  currentStage: number; // 0-based: 0="Recipe Created", 5="Harvested"
  stages?: string[];    // Optional to override
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStage,
  stages = STAGES,
}) => (
  <div className="w-full flex flex-col items-center pb-4">
    {/* Step Dots and Connecting Bars */}
    <div className="flex items-center w-full">
      {stages.map((stage, idx) => (
        <React.Fragment key={stage}>
          {/* Dot */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "rounded-full w-4 h-4 border-2",
                idx <= currentStage
                  ? "bg-[#26bfa6] border-[#26bfa6]"
                  : "bg-white border-[#D9D9D9]"
              )}
            />
          </div>
          {/* Connecting bar except after last dot */}
          {idx < stages.length - 1 && (
            <div
              className={clsx(
                "h-1 flex-1 mx-1 md:mx-2",
                idx < currentStage
                  ? "bg-[#26bfa6]"
                  : "bg-[#D9D9D9]"
              )}
              style={{ minWidth: 20 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
    {/* Step Labels */}
    {/* <div className="flex w-full justify-between mt-1">
      {stages.map((stage, idx) => (
        <div key={stage} className="w-1/6 text-xs text-center font-halvar" style={{minWidth: 60}}>
          {stage}
        </div>
      ))}
    </div> */}
  </div>
);

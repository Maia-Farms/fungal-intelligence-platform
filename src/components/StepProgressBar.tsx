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
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStage,
  stages = STAGES,
  className = "",
}) => (
  <div className={`w-full py-2 flex flex-col items-center ${className}`}>
    {/* Dots/Bars row: flex, will fill card width */}
    <div className="flex items-center w-full px-2 md:px-4">
      {stages.map((_, idx) => (
        <React.Fragment key={idx}>
          {/* Dot */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`rounded-full w-4 h-4 border-2 transition 
                ${idx <= currentStage
                  ? "bg-[#26bfa6] border-[#26bfa6]"
                  : "bg-white border-[#D9D9D9]"}
              `}
            />
          </div>
          {/* Bar, unless last dot */}
          {idx < stages.length - 1 && (
            <div
              className={`flex-1 h-1 mx-1 md:mx-2 transition 
                ${idx < currentStage ? "bg-[#26bfa6]" : "bg-[#D9D9D9]"}`}
              style={{ minWidth: 10 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
    {/* Labels under dots: will also stretch responsively */}
    {/* <div className="flex w-full justify-between mt-1 px-1">
      {stages.map((stage, idx) => (
        <div
          key={stage}
          className="text-[10px] sm:text-xs text-center font-halvar w-1/6 whitespace-nowrap px-[1px] truncate"
        >
          {stage}
        </div>
      ))}
    </div> */}
  </div>
);

import LinePlotMock from "./LinePlotMock";
import { StepProgressBar } from "./StepProgressBar";
import SVGGauge from "./SVGGaugeMock";

interface StatCardProps {
    title: string;
    temp: number;
    rpm: number;
    psi: number;
    phData: number[];    // Array of pH values for the line plot
    doData: number[];    // Array of DO (oxygen) values for the line plot
    currentStage: number; // Optional current stage for StepProgressBar
    height?: number;
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    temp,
    rpm,
    psi,
    phData,
    doData,
    currentStage,
    height = 240,
    className = "",
}) => {
    return (
        <div
            className={`bg-white border border-black rounded-lg shadow-md p-4 flex flex-col justify-between ${className}`}
            style={{ minHeight: height + 64 }}
        >
            <div className="flex-1">
                <StepProgressBar currentStage={currentStage} />
              <div className="flex flex-row items-end justify-center gap-6">
                {/* Left: Small dial for RPM */}
                <div className="flex flex-col items-center">
                    <SVGGauge value={rpm} min={0} max={1200} units="rpm" size={100} title="" />
                </div>
                {/* Center: Large temp dial */}
                <div className="flex flex-col items-center">
                    <SVGGauge value={temp} min={0} max={100} units="°C" size={125} title="" />
                </div>
                {/* Right: Small dial for PSI */}
                <div className="flex flex-col items-center">
                    <SVGGauge value={psi} min={0} max={30} units="psi" size={100} title="" />
                </div>
              </div>
              <LinePlotMock width={300} height={150} className="mt-4" phData={phData} doData={doData} />
            </div>
            <div className="mb-2">
                <h3 className="font-halvar text-lg font-semibold text-[#262626] mb-1 text-center">
                    {title}
                </h3>
            </div>
        </div>
    );
};

import LinePlotMock from "./LinePlotMock";
import SVGGauge from "./SVGGaugeMock";

interface StatCardProps {
  title: string;
  height?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  height = 240,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-black rounded-lg shadow-md p-4 flex flex-col justify-between ${className}`}
      style={{ minHeight: height + 64 }}
    >
      <div className="flex-1">
        <SVGGauge value={62} min={0} max={100} units="°C" />
        <LinePlotMock width={300} height={150} className="mt-4" />
      </div>
      <div className="mb-2">
        <h3 className="font-halvar text-lg font-semibold text-[#262626] mb-1 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

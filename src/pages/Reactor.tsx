import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SVGGauge from "../components/SVGGaugeMock";
import LinePlotMock from "../components/LinePlotMock";
import { StepProgressBar } from "../components/StepProgressBar";
import React from "react";

const STAGES = [
  "Recipe Created",
  "Media Prepared",
  "Inoculum Prepared",
  "Inoculated",
  "Fermentation Complete",
  "Harvested",
];

// Dummy fetch for initial values
function fetchReactor(reactorId: string) {
  return {
    id: reactorId,
    name: `Reactor ${reactorId}`,
    temp: +(Math.random() * 3.2 + 21.8).toFixed(1),
    rpm: 300,
    co2: Math.round(Math.random() * 200 + 300),
    psi: +(Math.random() * 10 + 10).toFixed(1),
    phData: Array.from({ length: 120 }, () => +(Math.random() * 1 + 5.5).toFixed(2)),
    doData: Array.from({ length: 120 }, () => +(Math.random() * 8 + 88).toFixed(1)),
    currentStage: 4,
    startedAt: Date.now() - Math.round(Math.random() * 72) * 3600 * 1000, // up to 3 days ago
    status: "active",
  };
}

// Helper functions for gentle nudges
function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}
function nudge(val: number, mag: number, min: number, max: number) {
  return clamp(val + (Math.random() * 2 - 1) * mag, min, max);
}

export default function Reactor() {
  const { reactorId } = useParams<{ reactorId: string }>();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(() => (reactorId ? fetchReactor(reactorId) : null));

  // Live data effect
  useEffect(() => {
    if (!reactorId) return;
    setMetrics(fetchReactor(reactorId)); // initial fetch

    const interval = setInterval(() => {
      setMetrics(curr => {
        if (!curr) return curr;
        const nextStage =
          Math.random() < 0.005 && curr.currentStage < STAGES.length - 1
            ? curr.currentStage + 1
            : curr.currentStage;
        return {
          ...curr,
          temp: +nudge(curr.temp, 0.06, 18, 32).toFixed(2),
          co2: Math.round(nudge(curr.co2, 2, 200, 600)),
          psi: +nudge(curr.psi as number, 0.08, 0, 30).toFixed(2),
          phData: [...curr.phData.slice(1), +(Math.random() * 1 + 5.5).toFixed(2)],
          doData: [...curr.doData.slice(1), +(Math.random() * 8 + 88).toFixed(1)],
          currentStage: nextStage,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [reactorId]);

  if (!metrics) return <div className="p-8">No reactor found.</div>;

  return (
    <div className="py-10 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center mb-8 gap-4">
        <button
          className="px-3 py-1 border rounded bg-white hover:bg-gray-200 text-[#173D3C] font-halvar font-semibold shadow"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="font-halvar-medium text-3xl font-semibold">
          {metrics.name}
        </h1>
        <span
          className={`ml-auto text-xs font-bold px-2.5 py-1 rounded
            ${metrics.status === "active" ? "bg-[#26bfa6]/10 text-[#26bfa6]" :
              metrics.status === "warning" ? "bg-yellow-300 text-yellow-900" :
                metrics.status === "error" ? "bg-red-200 text-red-700" : "bg-gray-200 text-gray-700"}
          `}
        >
          {metrics.status.toUpperCase()}
        </span>
      </div>
      <div className="flex-1 font-halvar-medium text-2xl text-gray-700 mb-4">
        <StepProgressBar currentStage={metrics.currentStage} showLabels={true} />
      </div>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Temperature */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <SVGGauge value={metrics.temp} min={18} max={32} units="°C" title="Temperature" />
          <div className="text-xs mt-2 text-gray-600">Temperature</div>
          <div className="font-halvar-regular text-xs text-gray-400 mt-1">Range: 18-32°C</div>
        </div>
        {/* RPM */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <SVGGauge value={metrics.rpm} min={0} max={900} units="rpm" title="RPM" />
          <div className="text-xs mt-2 text-gray-600">Impeller RPM</div>
          <div className="font-halvar-regular text-xs text-gray-400 mt-1">Range: 0-900</div>
        </div>
        {/* CO2 (ppm) */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <SVGGauge value={metrics.co2} min={200} max={600} units="CO₂ ppm" title="CO₂ (ppm)" />
          <div className="text-xs mt-2 text-gray-600">CO₂ Concentration</div>
          <div className="font-halvar-regular text-xs text-gray-400 mt-1">Range: 200-600 ppm</div>
        </div>
      </div>

      {/* Progress & history plots */}
      <div className="bg-white border border-black rounded-lg shadow-md p-6 flex flex-col mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="font-halvar text-sm text-[#173D3C]">Started At</div>
            <div className="font-halvar-medium text-lg text-gray-700">
              {new Date(metrics.startedAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <LinePlotMock
            width={600}
            height={140}
            phData={metrics.phData}
            doData={metrics.doData}
            className="mt-1"
          />
          <div className="flex mt-2 text-xs justify-between text-gray-500">
            <span className="ml-2">pH (last 120 measurements)</span>
            <span className="mr-2">DO (last 120 measurements)</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PSI / Compressed air */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <SVGGauge value={metrics.psi} min={0} max={30} units="PSI" title="Air Pressure" />
          <div className="text-xs mt-2 text-gray-600">Compressed Air PSI</div>
          <div className="font-halvar-regular text-xs text-gray-400 mt-1">Range: 0-30</div>
        </div>
        {/* pH mini */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <div className="text-4xl font-mono text-[#26bfa6]">
            {metrics.phData.length > 0 ? metrics.phData.at(-1) : "--"}
          </div>
          <div className="text-xs mt-2 text-gray-600">Last pH Value</div>
        </div>
        {/* DO mini */}
        <div className="bg-white border border-black rounded-lg shadow-md p-4 flex flex-col items-center">
          <div className="text-4xl font-mono text-[#173D3C]">
            {metrics.doData.length > 0 ? metrics.doData.at(-1) : "--"}
          </div>
          <div className="text-xs mt-2 text-gray-600">Last DO Value</div>
        </div>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";
import { SiteOverviewCard } from "../components/SiteOverviewCard";
import { DisplayReactor, ReactorStatusList } from "../components/ReactorStatusList";
import VideoFeed from "../components/VideoFeed";

// Six reactors
const reactorIds = [
  "CAN-123-12", "CAN-123-15", "CAN-123-19",
  "CAN-123-20", "CAN-123-21", "CAN-123-24"
];

const displayReactors: DisplayReactor[] = [
  { id: "CAN-123-12", status: "active", startedAt: new Date(Date.now() - 8 * 3600 * 5000) },
  { id: "CAN-123-15", status: "active", startedAt: new Date(Date.now() - 6.5 * 3600 * 20000) },
  { id: "CAN-123-19", status: "active", startedAt: new Date(Date.now() - 10 * 3600 * 300) },
  { id: "CAN-123-20", status: "active", startedAt: new Date(Date.now() - 12 * 3600 * 900) },
  { id: "CAN-123-21", status: "warning", startedAt: new Date(Date.now() - 4.25 * 300 * 100) },
  { id: "CAN-123-24", status: "error", startedAt: new Date(Date.now() - 2.1 * 3600 * 800) },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `CAN-124-${i + 1}`,
    status: "inactive" as const,
    startedAt: null
  }))
];

const reactorStages = [3, 4, 4, 2, 1, 3];

function randomPh() {
  return +(Math.random() * 0.3 + 6.8).toFixed(2);
}
function randomDO() {
  return +(Math.random() * 5 + 88).toFixed(1);
}
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}
function initialTemp() {
  return Math.random() * 3.2 + 21.8; // No rounding
}

function initialMetrics() {
  return reactorIds.map(() => ({
    temp: initialTemp(), // No rounding
    rpm: 300,
    psi: 13.0,
    phData: Array.from({ length: 12 }, randomPh),
    doData: Array.from({ length: 12 }, randomDO),
  }));
}

export default function Site() {
  const { siteId } = useParams<{ siteId: string }>();
  const [metrics, setMetrics] = useState(() => initialMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map((m) => {
          const tempDelta = Math.random() * 0.08 - 0.04; // smaller deltas: -0.04 to +0.04 per second
          const newTemp = clamp(m.temp + tempDelta, 21.0, 26.0);
          return {
            temp: newTemp, // keep as float
            rpm: m.rpm,
            psi: m.psi,
            phData: [...m.phData.slice(1), randomPh()],
            doData: [...m.doData.slice(1), randomDO()],
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleEdit(index: number, newRpm: number, newPsi: number) {
    setMetrics(prev =>
      prev.map((m, i) =>
        i === index ? { ...m, rpm: newRpm, psi: newPsi } : m
      )
    );
  }

  const yieldPrediction = 95;
  const siteHealthPercent = 97;

  return (
    <div className="py-10 px-6 max-w-8xl mx-auto">
      <h1 className="font-halvar-medium text-2xl font-semibold mb-8">
        SITE: {siteId?.toUpperCase() || "REACTORS"}
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full px-8">
        {/* MAIN CARDS COLUMN (65% on large screens) */}
        <div className="w-full lg:w-[75%]">
          {/* Overview cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <SiteOverviewCard
              label="Reactors"
              value={displayReactors.length}
              icon={<span role="img" aria-label="reactor">🧪</span>}
              delta={+3}
            />
            <SiteOverviewCard
              label="AI Yield"
              value={`${yieldPrediction}%`}
              colorClass="text-[#26bfa6]"
              subtext={yieldPrediction >= 90 ? "Excellent" : yieldPrediction >= 75 ? "Good" : "Low"}
              icon={<span role="img" aria-label="yield">🤖</span>}
              delta={-2.5}
              deltaLabel="7d"
            />
            <SiteOverviewCard
              label="Site Health"
              value={`${siteHealthPercent}%`}
              colorClass={
                siteHealthPercent >= 90 ? "text-[#26bfa6]" :
                  siteHealthPercent >= 75 ? "text-yellow-500" :
                    "text-red-500"
              }
              subtext={
                siteHealthPercent >= 90 ? "Healthy" :
                  siteHealthPercent >= 75 ? "Warning" :
                    "Critical"
              }
              icon={
                siteHealthPercent >= 90 ? <span role="img" aria-label="ok">✅</span> :
                  siteHealthPercent >= 75 ? <span role="img" aria-label="warn">⚠️</span> :
                    <span role="img" aria-label="err">❌</span>
              }
              delta={+1.3}
              deltaLabel="7d"
            />
          </div>
          {/* Stat cards grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {reactorIds.map((reactor, i) => (
              <StatCard
                key={reactor}
                title={`Reactor ${reactor}`}
                temp={reactor === `CAN-123-24` ? 30.8 : metrics[i] ? +metrics[i].temp.toFixed(1) : 0} // round only for display!
                rpm={metrics[i].rpm}
                psi={metrics[i].psi}
                phData={metrics[i].phData}
                doData={metrics[i].doData}
                currentStage={reactorStages[i]}
                onEdit={(newRpm, newPsi) => handleEdit(i, newRpm, newPsi)}
                reactorId={reactor}
              />
            ))}
          </div>
        </div>
        {/* SIDEBAR (35% on large screens) */}
        <div className="w-full h-full lg:w-[25%] flex flex-col gap-6">
          {/* Mock Camera Feed */}
          <VideoFeed />
          {/* Scrollable Reactors List */}
          <ReactorStatusList reactors={displayReactors} />
        </div>
      </div>
    </div>
  );
}
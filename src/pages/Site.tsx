import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";

// Realistic random generators
function randomTemp() {
  return +(Math.random() * 5 + 21).toFixed(1);  // 21.0 - 26.0
}
function randomRpm() {
  return +(Math.random() * 150 + 200).toFixed(0);  // 200 - 350
}
function randomPsi() {
  return +(Math.random() * 4 + 10).toFixed(1);  // 10.0 - 14.0
}
function randomPh() {
  return +(Math.random() * 0.3 + 6.8).toFixed(2); // 6.80 - 7.10
}
function randomDO() {
  return +(Math.random() * 5 + 88).toFixed(1);   // 88 - 93
}

// Six reactors
const reactorIds = [
  "CAN-123-12", "CAN-123-15", "CAN-123-19",
  "CAN-123-20", "CAN-123-21", "CAN-123-24"
];

const reactorStages = [3, 4, 4, 2, 1, 3]; // Example stages for each reactor

function initialMetrics() {
  return reactorIds.map(() => ({
    temp: randomTemp(),
    rpm: randomRpm(),
    psi: randomPsi(),
    phData: Array.from({ length: 12 }, randomPh),
    doData: Array.from({ length: 12 }, randomDO),
  }));
}

export default function Site() {
  const { id } = useParams<{ id: string }>();
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(m => ({
          temp: randomTemp(),
          rpm: randomRpm(),
          psi: randomPsi(),
          phData: [...m.phData.slice(1), randomPh()], // Remove oldest, add new
          doData: [...m.doData.slice(1), randomDO()],
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <h1 className="font-halvar text-2xl font-semibold mb-8 text-center">
        Site {id}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reactorIds.map((reactor, i) => (
          <StatCard
            key={reactor}
            title={`Reactor ${reactor}`}
            temp={metrics[i].temp}
            rpm={metrics[i].rpm}
            psi={metrics[i].psi}
            phData={metrics[i].phData}
            doData={metrics[i].doData}
            currentStage={reactorStages[i]}
          />
        ))}
      </div>
    </div>
  );
}

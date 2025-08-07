import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";

// Realistic random generators for temp, ph, DO (but NOT rpm/psi)
function randomTemp() {
  return +(Math.random() * 5 + 21).toFixed(1);  // 21.0 - 26.0
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
    rpm: 300,                // <--- Initial value (fixed)
    psi: 13.0,               // <--- Initial value (fixed)
    phData: Array.from({ length: 12 }, randomPh),
    doData: Array.from({ length: 12 }, randomDO),
  }));
}

export default function Site() {
  const { id } = useParams<{ id: string }>();
  const [metrics, setMetrics] = useState(() => initialMetrics());
;

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(m => ({
          temp: randomTemp(),
          rpm: m.rpm,   // Preserves current value (user or initial)
          psi: m.psi,
          phData: [...m.phData.slice(1), randomPh()],
          doData: [...m.doData.slice(1), randomDO()],
        }))
      );

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Edit handler for an individual card: only updates rpm/psi for that card
  function handleEdit(index: number, newRpm: number, newPsi: number) {
    setMetrics(prev =>
      prev.map((m, i) =>
        i === index ? { ...m, rpm: newRpm, psi: newPsi } : m
      )
    );
  }

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <h1 className="font-halvar text-2xl font-semibold mb-8 text-center">
        SITE: {id?.toUpperCase() || "REACTORS"}
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
            onEdit={(newRpm, newPsi) => handleEdit(i, newRpm, newPsi)}
            reactorId={reactor}
          />
        ))}
      </div>
    </div>
  );
}

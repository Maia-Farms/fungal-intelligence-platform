import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "../components/StatCard";

const Site = () => {
  const { id } = useParams<{ id: string }>();
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch data for this site
      fetch(`/api/site/${id}`)
        .then(res => res.json())
        .then(setSiteData);
    }
  }, [id]);

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
      <h1 className="font-halvar text-2xl font-semibold mb-8 text-center">
        Site {id}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Reactor CAN-123-12" />
        <StatCard title="Reactor CAN-123-15" />
        <StatCard title="Reactor CAN-123-19" />
        <StatCard title="Reactor CAN-123-20" />
        <StatCard title="Reactor CAN-123-21" />
        <StatCard title="Reactor CAN-123-24" />
      </div>
    </div>
  );
};

export default Site;

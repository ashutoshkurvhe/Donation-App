// src/components/landing/ImpactStats.jsx
import React from "react";

const ImpactStats = () => {
  // Example static stats; you can fetch real data from Redux
  const stats = [
    { title: "NGOs Supported", value: 120 },
    { title: "Campaigns Launched", value: 350 },
    { title: "Total Donations", value: "$1.2M" },
    { title: "People Impacted", value: 50000 },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded shadow">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="mt-2 text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;

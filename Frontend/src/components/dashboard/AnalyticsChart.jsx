import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsChart = ({ campaigns, donations }) => {
  // Simple example: total donation per campaign
  const data = campaigns.map((campaign) => {
    const totalDonations = donations
      .filter((d) => d.campaign._id === campaign._id)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: campaign.title, amount: totalDonations };
  });

  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <h3 className="text-lg font-bold mb-2">Donations per Campaign</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;

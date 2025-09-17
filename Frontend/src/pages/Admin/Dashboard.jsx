// src/pages/Admin/Dashboard.jsx
import React from "react";
import { FaUsers, FaBuilding, FaFlag, FaChartPie } from "react-icons/fa";
import AnalyticsCard from "../../components/Admin/AnalyticsCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { analytics } = useSelector((state) => state.admin);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          icon={<FaUsers />}
          title="Total Users"
          value={analytics.totalUsers}
        />
        <AnalyticsCard
          icon={<FaBuilding />}
          title="Total NGOs"
          value={analytics.totalNGOs}
        />
        <AnalyticsCard
          icon={<FaFlag />}
          title="Flagged Campaigns"
          value={analytics.flaggedCampaigns}
        />
        <AnalyticsCard
          icon={<FaChartPie />}
          title="Total Donations"
          value={`$${analytics.totalDonations}`}
        />
      </div>
    </div>
  );
};

export default Dashboard;

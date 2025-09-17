// src/pages/Admin/Analytics.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsCard from "../../components/Admin/AnalyticsCard";
import { fetchAnalytics } from "../../slices/adminSlice";
import { FaUsers, FaBuilding, FaChartLine, FaMoneyBill } from "react-icons/fa";

const Analytics = () => {
  const dispatch = useDispatch();
  const { analytics } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Platform Analytics</h1>
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
          icon={<FaChartLine />}
          title="Total Campaigns"
          value={analytics.totalCampaigns}
        />
        <AnalyticsCard
          icon={<FaMoneyBill />}
          title="Total Donations"
          value={`$${analytics.totalDonations}`}
        />
      </div>
    </div>
  );
};

export default Analytics;

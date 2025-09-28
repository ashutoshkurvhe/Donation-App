import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignsByNGO } from "../../features/campaigns/campaignThunks";
import CampaignCard from "../../components/dashboard/CampaignCard";
import DonationCard from "../../components/dashboard/DonationCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import NotificationItem from "../../components/dashboard/NotificationItems";

const NGODashboard = () => {
  const dispatch = useDispatch();
  const { campaigns } = useSelector((state) => state.campaigns);
  const { donations } = useSelector((state) => state.donations);
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getCampaignsByNGO());
    // You can add other thunks like fetching donations and notifications
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">NGO Dashboard</h1>

      {/* Analytics */}
      <div className="mb-6">
        <AnalyticsChart campaigns={campaigns} donations={donations} />
      </div>

      {/* Campaigns Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* Donations Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Donations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NGODashboard;

// src/pages/dashboard/UserDashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignCard from "../../components/dashboard/CampaignCard";
import DonationCard from "../../components/dashboard/DonationCard";
import NotificationItem from "../../components/dashboard/NotificationItems";
import Loader from "../../components/common/Loader";
import { getAllCampaigns } from "../../features/campaigns/campaignThunks";
import { getAllDonations } from "../../features/donations/donationThunks";
import { getAllNotifications } from "../../features/notifications/notificationThunks";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const { campaigns, loading: campaignsLoading } = useSelector(
    (state) => state.campaigns
  );
  const { donations, loading: donationsLoading } = useSelector(
    (state) => state.donations
  );
  const { notifications, loading: notificationsLoading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(getAllCampaigns());
    dispatch(getAllDonations());
    dispatch(getAllNotifications());
  }, [dispatch]);

  if (campaignsLoading || donationsLoading || notificationsLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>

      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        )}
      </section>

      {/* User Campaigns */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>You haven't created any campaigns yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        )}
      </section>

      {/* User Donations */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Donations</h2>
        {donations.length === 0 ? (
          <p>You haven't made any donations yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;

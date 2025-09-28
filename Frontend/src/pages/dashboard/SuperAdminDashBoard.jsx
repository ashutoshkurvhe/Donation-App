import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/users/userThunks";
import { getAllNGOs } from "../../features/ngos/ngoThunks";
import { getAllCampaigns } from "../../features/campaigns/campaignThunks";
import UserCard from "../../components/dashboard/UserCard";
import NGOCard from "../../components/dashboard/NGOCard";
import CampaignCard from "../../components/dashboard/CampaignCard";
import FlaggedContentCard from "../../components/dashboard/FlaggedContentCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import NotificationItem from "../../components/dashboard/NotificationItems";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { ngos } = useSelector((state) => state.ngos);
  const { campaigns } = useSelector((state) => state.campaigns);
  const { notifications } = useSelector((state) => state.notifications);
  const { flaggedContents } = useSelector((state) => state.admin); // Assuming flagged content is in admin slice

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllNGOs());
    dispatch(getAllCampaigns());
    // fetch notifications and flagged content if needed
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>

      {/* Analytics */}
      <div className="mb-6">
        <AnalyticsChart campaigns={campaigns} donations={[]} />
      </div>

      {/* Users Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </section>

      {/* NGOs Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">NGOs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ngos.map((ngo) => (
            <NGOCard key={ngo._id} ngo={ngo} />
          ))}
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* Flagged Content */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Flagged Content</h2>
        <div className="space-y-2">
          {flaggedContents.map((content) => (
            <FlaggedContentCard key={content._id} content={content} />
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

export default SuperAdminDashboard;

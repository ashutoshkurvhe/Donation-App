// src/pages/campaigns/CampaignList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignCard from "../../components/dashboard/CampaignCard";
import Loader from "../../components/common/Loader";
import { fetchAllCampaigns } from "../../features/campaigns/campaignThunks";

const CampaignList = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchAllCampaigns());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Campaigns</h1>
      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;

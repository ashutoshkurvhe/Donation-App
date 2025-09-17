// src/pages/Admin/FlaggedContent.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlaggedContent, removeCampaign } from "../../slices/adminSlice";
import CampaignCard from "../../components/Admin/CampaignCard";

const FlaggedContent = () => {
  const dispatch = useDispatch();
  const { flaggedCampaigns } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchFlaggedContent());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Flagged Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flaggedCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            onRemove={() => dispatch(removeCampaign(campaign._id))}
          />
        ))}
      </div>
    </div>
  );
};

export default FlaggedContent;

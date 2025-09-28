// src/pages/campaigns/CampaignDetails.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { fetchCampaignById } from "../../features/campaigns/campaignThunks";

const CampaignDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { campaign, loading } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaignById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>
        <strong>Goal:</strong> ${campaign.goal}
      </p>
      <p>
        <strong>Raised:</strong> ${campaign.raisedAmount}
      </p>
      <p>
        <strong>Created By:</strong> {campaign.createdBy.organizationName}
      </p>
      {/* Add donation button or comments section as needed */}
    </div>
  );
};

export default CampaignDetails;

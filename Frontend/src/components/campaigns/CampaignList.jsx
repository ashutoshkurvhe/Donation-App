import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../slices/campaignSlice";
import CampaignCard from "../components/CampaignCard";

const CampaignList = () => {
  const dispatch = useDispatch();
  const { campaigns, loading, error } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading campaigns...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Campaigns</h2>
      {campaigns?.length === 0 ? (
        <p>No campaigns found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;

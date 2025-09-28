// src/components/landing/FeaturedCauses.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignCard from "../dashboard/CampaignCard";
import { getAllCampaigns } from "../../features/campaigns/campaignThunks";
import Loader from "../common/Loader";

const FeaturedCauses = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(getAllCampaigns());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Causes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(0, 6).map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCauses;

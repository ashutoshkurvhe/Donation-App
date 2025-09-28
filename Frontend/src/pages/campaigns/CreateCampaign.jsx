// src/pages/campaigns/CreateCampaign.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CampaignForm from "../../components/forms/CampaignForm";
import { createCampaign } from "../../features/campaigns/campaignThunks";

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateCampaign = async (data) => {
    try {
      await dispatch(createCampaign(data)).unwrap();
      setSuccessMessage("Campaign created successfully!");
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      <CampaignForm onSubmit={handleCreateCampaign} />
    </div>
  );
};

export default CreateCampaign;

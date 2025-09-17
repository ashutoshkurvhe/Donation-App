// src/components/Admin/CampaignCard.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";

const CampaignCard = ({ campaign, onRemove }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      <h3 className="font-semibold">{campaign.title}</h3>
      <p className="text-gray-500">{campaign.description}</p>
      <p className="text-gray-400">
        Raised: ${campaign.raisedAmount} / Target: ${campaign.targetAmount}
      </p>
      {campaign.isFlagged && (
        <p className="text-red-500 mt-1">Flagged: {campaign.flagReason}</p>
      )}
      <div className="mt-2">
        <button
          onClick={() => onRemove(campaign._id)}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;

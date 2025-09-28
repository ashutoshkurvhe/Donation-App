import React from "react";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <h3 className="text-lg font-bold">{campaign.title}</h3>
      <p className="text-sm text-gray-600">{campaign.description}</p>
      <p className="mt-2 text-blue-600 font-semibold">
        Raised: ${campaign.amountRaised} / ${campaign.targetAmount}
      </p>
      <Link
        to={`/campaigns/${campaign._id}`}
        className="mt-3 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        View Campaign
      </Link>
    </div>
  );
};

export default CampaignCard;

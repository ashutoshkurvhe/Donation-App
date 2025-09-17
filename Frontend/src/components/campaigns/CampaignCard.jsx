import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaDonate } from "react-icons/fa";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {campaign.images?.[0]?.url && (
        <img
          src={campaign.images[0].url}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {campaign.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt /> {campaign.remainingDays} days left
          </span>
          <span>{campaign.progressPercentage}% raised</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${campaign.progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-semibold text-green-600">
            Raised: ₹{campaign.raisedAmount} / ₹{campaign.goalAmount}
          </span>
          <Link
            to={`/campaigns/${campaign._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
          >
            <FaDonate className="inline mr-1" /> Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

import React from "react";

const DonationCard = ({ donation }) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <p>
        <strong>Donor:</strong> {donation.donor.name}
      </p>
      <p>
        <strong>Amount:</strong> ${donation.amount}
      </p>
      <p>
        <strong>Campaign:</strong> {donation.campaign.title}
      </p>
      <p className="text-gray-500 text-sm">
        {new Date(donation.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default DonationCard;

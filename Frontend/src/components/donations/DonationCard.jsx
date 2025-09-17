import React from "react";
import { FaCertificate } from "react-icons/fa";

const DonationCard = ({ donation }) => {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">
        {donation.campaign?.title || "Campaign"}
      </h3>
      <p className="text-sm text-gray-600">
        Amount: <span className="font-bold">₹{donation.amount}</span>
      </p>
      <p className="text-xs text-gray-500">Status: {donation.paymentStatus}</p>
      {donation.certificate && (
        <a
          href={`/certificates/${donation.certificate}`}
          className="mt-2 inline-flex items-center gap-1 text-green-600 text-sm hover:underline"
        >
          <FaCertificate /> View Certificate
        </a>
      )}
    </div>
  );
};

export default DonationCard;

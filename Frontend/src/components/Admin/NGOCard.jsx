// src/components/Admin/NGOCard.jsx
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const NGOCard = ({ ngo, onApprove, onReject }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      <h3 className="font-semibold">{ngo.organizationName}</h3>
      <p className="text-gray-500">{ngo.description}</p>
      <p className="text-gray-400">Status: {ngo.status}</p>
      <div className="mt-2 flex space-x-2">
        {ngo.status === "pending" && (
          <>
            <button
              onClick={onApprove}
              className="text-green-500 hover:text-green-700"
            >
              <FaCheck /> Approve
            </button>
            <button
              onClick={onReject}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes /> Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NGOCard;

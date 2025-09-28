import React from "react";

const NGOCard = ({ ngo }) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <h3 className="text-lg font-bold">{ngo.organizationName}</h3>
      <p className="text-gray-600">Email: {ngo.contactEmail}</p>
      <p className="text-gray-600">Status: {ngo.status}</p>
    </div>
  );
};

export default NGOCard;

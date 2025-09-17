// src/components/Admin/AnalyticsCard.jsx
import React from "react";

const AnalyticsCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center">
      <div className="text-3xl text-blue-500">{icon}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-xl mt-1">{value}</p>
    </div>
  );
};

export default AnalyticsCard;

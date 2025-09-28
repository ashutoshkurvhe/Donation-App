import React from "react";

const FlaggedContentCard = ({ content }) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-red-300">
      <p className="text-red-600 font-semibold">Flagged Content</p>
      <p>{content.text || "No content text available"}</p>
      <p className="text-gray-500 text-xs">
        Reported by: {content.reportedBy.name} on{" "}
        {new Date(content.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default FlaggedContentCard;

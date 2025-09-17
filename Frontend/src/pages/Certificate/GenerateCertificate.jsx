// src/pages/Certificates/GenerateCertificate.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { generateCertificate } from "../../slices/certificateSlice";

const GenerateCertificate = ({ donationId }) => {
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(generateCertificate(donationId));
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Generate Certificate</h2>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Generate Certificate
      </button>
    </div>
  );
};

export default GenerateCertificate;

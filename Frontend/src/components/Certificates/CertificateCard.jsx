// src/components/Certificates/CertificateCard.jsx
import React from "react";
import { FaCertificate, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteCertificate } from "../../slices/certificateSlice";

const CertificateCard = ({ certificate }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      dispatch(deleteCertificate(certificate._id));
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{certificate.campaignTitle}</h3>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
      <p className="text-gray-500 mb-2">Donor: {certificate.donorName}</p>
      <p className="text-gray-500 mb-2">NGO: {certificate.ngoName}</p>
      <p className="text-gray-400 text-sm">
        {new Date(certificate.issuedAt).toLocaleDateString()}
      </p>
      <div className="mt-2 flex justify-center text-yellow-500">
        <FaCertificate size={40} />
      </div>
    </div>
  );
};

export default CertificateCard;

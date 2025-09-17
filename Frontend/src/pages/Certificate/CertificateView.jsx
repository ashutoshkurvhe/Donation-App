// src/pages/Certificates/CertificateView.jsx
import React from "react";

const CertificateView = ({ certificate }) => {
  if (!certificate) return <p>Certificate not found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Certificate of Appreciation
      </h2>
      <p className="text-center mb-4">{certificate.certificateText}</p>
      <p className="text-right text-gray-500 mt-6">
        Issued At: {new Date(certificate.issuedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CertificateView;

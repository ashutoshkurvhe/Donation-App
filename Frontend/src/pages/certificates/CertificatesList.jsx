// src/pages/certificates/CertificatesList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { fetchCertificates } from "../../features/certificates/certificateThunks";

const CertificatesList = () => {
  const dispatch = useDispatch();
  const { certificates, loading } = useSelector((state) => state.certificates);

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>
      {certificates.length === 0 ? (
        <p>No certificates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold">{cert.title}</h2>
              <p className="text-sm text-gray-500">
                Issued to: {cert.user.name}
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(cert.issueDate).toLocaleDateString()}
              </p>
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesList;

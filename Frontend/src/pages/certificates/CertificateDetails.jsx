// src/pages/certificates/CertificateDetails.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { fetchCertificateById } from "../../features/certificates/certificateThunks";

const CertificateDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { certificate, loading } = useSelector((state) => state.certificates);

  useEffect(() => {
    dispatch(fetchCertificateById(id));
  }, [dispatch, id]);

  if (loading || !certificate) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{certificate.title}</h1>
      <p className="mb-2">
        Issued to: <strong>{certificate.user.name}</strong>
      </p>
      <p className="mb-2">
        Date Issued:{" "}
        <strong>{new Date(certificate.issueDate).toLocaleDateString()}</strong>
      </p>
      <p className="mb-4">{certificate.description}</p>
      <a
        href={certificate.certificateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Certificate PDF
      </a>
    </div>
  );
};

export default CertificateDetails;

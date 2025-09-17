// src/pages/Certificates/CertificatesList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertificatesByUser } from "../../slices/certificateSlice";
import CertificateCard from "../../components/Certificates/CertificateCard";

const CertificatesList = ({ userId }) => {
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector(
    (state) => state.certificates
  );

  useEffect(() => {
    dispatch(getCertificatesByUser(userId));
  }, [dispatch, userId]);

  if (loading)
    return <p className="text-center mt-8">Loading certificates...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!certificates.length)
    return <p className="text-center mt-8">No certificates found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <CertificateCard key={cert._id} certificate={cert} />
      ))}
    </div>
  );
};

export default CertificatesList;

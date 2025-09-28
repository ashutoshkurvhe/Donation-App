// src/pages/donations/DonationReceipt.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { fetchDonationById } from "../../features/donations/donationThunks";

const DonationReceipt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { donation, loading } = useSelector((state) => state.donations);

  useEffect(() => {
    dispatch(fetchDonationById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (!donation) return <p>Donation not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Donation Receipt</h1>
      <p>
        <strong>Donor Name:</strong> {donation.donor.name}
      </p>
      <p>
        <strong>Campaign:</strong> {donation.campaign.title}
      </p>
      <p>
        <strong>NGO:</strong> {donation.campaign.createdBy.organizationName}
      </p>
      <p>
        <strong>Amount:</strong> ${donation.amount}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(donation.createdAt).toLocaleDateString()}
      </p>
      <a
        href={`${process.env.REACT_APP_FRONTEND_URL}/donations/${donation._id}/receipt/download`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Receipt
      </a>
    </div>
  );
};

export default DonationReceipt;

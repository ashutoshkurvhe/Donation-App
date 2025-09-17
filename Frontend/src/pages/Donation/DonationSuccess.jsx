// src/pages/Donations/DonationSuccess.jsx
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFileDownload, FaPrint, FaCheckCircle } from "react-icons/fa";

const DonationSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  // fallback to redux state if navigation state not present
  const reduxDonation = useSelector((s) => s.donations?.donation);
  const reduxCertificate = useSelector((s) => s.donations?.certificate);

  const donation = state?.donation || reduxDonation;
  const certificate = state?.certificate || reduxCertificate;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(
      `<html><head><title>Certificate</title></head><body>${printContents}</body></html>`
    );
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const handleDownloadJSON = () => {
    if (!certificate) return;
    const blob = new Blob([JSON.stringify(certificate, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate_${certificate._id || "unknown"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!donation && !certificate) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Donation completed</h2>
        <p className="mt-3">
          We couldn't find the donation details. You can view your donations
          list.
        </p>
        <div className="mt-4">
          <button
            onClick={() => navigate("/donations")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            My Donations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
        <h2 className="text-2xl font-bold mt-3">
          Thank you for your donation!
        </h2>

        {donation && (
          <div className="mt-4 text-left">
            <p>
              <strong>Amount:</strong> ₹{donation.amount}
            </p>
            <p>
              <strong>Campaign:</strong>{" "}
              {donation.campaign?.title || donation.campaign}
            </p>
            {donation.transactionId && (
              <p>
                <strong>Transaction ID:</strong> {donation.transactionId}
              </p>
            )}
            <p className="text-sm text-gray-500">
              A confirmation has been added to your account.
            </p>
          </div>
        )}

        {certificate && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Your Certificate</h3>
              <div
                ref={printRef}
                className="mt-3 p-4 border rounded-lg bg-gray-50 text-left"
              >
                <p className="text-sm">Certificate for donation</p>
                <p className="mt-2">
                  <strong>Donor:</strong> {certificate.donorName}
                </p>
                <p>
                  <strong>NGO:</strong> {certificate.ngoName}
                </p>
                <p>
                  <strong>Campaign:</strong> {certificate.campaignTitle}
                </p>
                <div className="mt-3 whitespace-pre-wrap">
                  {certificate.certificateText}
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Issued on:{" "}
                  {(certificate.createdAt &&
                    new Date(certificate.createdAt).toLocaleString()) ||
                    "—"}
                </p>
              </div>

              <div className="mt-4 flex gap-3 justify-center">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  <FaPrint /> Print
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                >
                  <FaFileDownload /> Download JSON
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate("/campaigns")}
            className="px-4 py-2 border rounded-lg"
          >
            Browse Campaigns
          </button>
          <button
            onClick={() => navigate("/donations")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            My Donations
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;

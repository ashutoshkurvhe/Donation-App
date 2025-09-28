// src/pages/donations/MyDonations.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationCard from "../../components/dashboard/DonationCard";
import Loader from "../../components/common/Loader";
import { fetchUserDonations } from "../../features/donations/donationThunks";

const MyDonations = () => {
  const dispatch = useDispatch();
  const { donations, loading } = useSelector((state) => state.donations);

  useEffect(() => {
    dispatch(fetchUserDonations());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Donations</h1>
      {donations.length === 0 ? (
        <p>You haven't made any donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDonations } from "../../slices/donationSlice";
import DonationCard from "../../components/donations/DonationCard";

const UserDonations = () => {
  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector((state) => state.donations);

  useEffect(() => {
    dispatch(getUserDonations());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading donations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDonations;

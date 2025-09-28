// src/pages/ngos/NGOProfile.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { fetchNGOById } from "../../features/ngos/ngoThunks";

const NGOProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ngo, loading } = useSelector((state) => state.ngos);

  useEffect(() => {
    dispatch(fetchNGOById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (!ngo) return <p>NGO not found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{ngo.organizationName}</h1>
      <p>
        <strong>Email:</strong> {ngo.contactEmail}
      </p>
      <p>
        <strong>Phone:</strong> {ngo.contactNumber}
      </p>
      <p>
        <strong>Address:</strong> {ngo.address}
      </p>
      <p>
        <strong>Verified:</strong> {ngo.isApproved ? "Yes" : "No"}
      </p>
      <p>
        <strong>Total Campaigns:</strong> {ngo.campaigns?.length || 0}
      </p>
      {/* Additional NGO info or actions */}
    </div>
  );
};

export default NGOProfile;

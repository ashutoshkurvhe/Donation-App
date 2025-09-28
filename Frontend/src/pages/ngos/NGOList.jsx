// src/pages/ngos/NGOList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NGOCard from "../../components/dashboard/NGOCard";
import Loader from "../../components/common/Loader";
import { fetchAllNGOs } from "../../features/ngos/ngoThunks";

const NGOList = () => {
  const dispatch = useDispatch();
  const { ngos, loading } = useSelector((state) => state.ngos);

  useEffect(() => {
    dispatch(fetchAllNGOs());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All NGOs</h1>
      {ngos.length === 0 ? (
        <p>No NGOs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ngos.map((ngo) => (
            <NGOCard key={ngo._id} ngo={ngo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NGOList;

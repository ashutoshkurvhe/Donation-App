// src/components/NGOList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNGOs } from "../slices/NGOSlice";

const NGOList = () => {
  const dispatch = useDispatch();
  const { ngos, loading, error } = useSelector((state) => state.ngos);

  useEffect(() => {
    dispatch(fetchNGOs());
  }, [dispatch]);

  if (loading) return <p className="text-blue-500">Loading NGOs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">NGO List</h2>
      {ngos.length === 0 ? (
        <p className="text-gray-600">No NGOs found.</p>
      ) : (
        <ul className="space-y-3">
          {ngos.map((ngo) => (
            <li
              key={ngo._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{ngo.name}</h3>
              <p className="text-sm text-gray-700">{ngo.description}</p>
              <p className="text-xs text-gray-500">📍 {ngo.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NGOList;

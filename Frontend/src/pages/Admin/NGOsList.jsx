// src/pages/Admin/NGOsList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNGOs, approveNGO, rejectNGO } from "../../slices/adminSlice";
import NGOCard from "../../components/Admin/NGOCard";
import Pagination from "../../components/Admin/Pagination";

const NGOsList = () => {
  const dispatch = useDispatch();
  const { ngos, pagination } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllNGOs({ page }));
  }, [dispatch, page]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">NGOs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ngos.map((ngo) => (
          <NGOCard
            key={ngo._id}
            ngo={ngo}
            onApprove={() => dispatch(approveNGO(ngo._id))}
            onReject={() => dispatch(rejectNGO(ngo._id))}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={pagination.total} />
    </div>
  );
};

export default NGOsList;

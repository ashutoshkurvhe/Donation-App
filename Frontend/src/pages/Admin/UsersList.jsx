// src/pages/Admin/UsersList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, blockUser, unblockUser } from "../../slices/adminSlice";
import UserCard from "../../components/Admin/UserCard";
import Pagination from "../../components/Admin/Pagination";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, pagination } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers({ page }));
  }, [dispatch, page]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onBlock={() => dispatch(blockUser(user._id))}
            onUnblock={() => dispatch(unblockUser(user._id))}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={pagination.total} />
    </div>
  );
};

export default UsersList;

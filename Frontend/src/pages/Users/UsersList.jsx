// src/pages/Users/UsersList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../slices/userSlice";
import UserCard from "../../components/Users/UserCard";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-8">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!users.length) return <p className="text-center mt-8">No users found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;

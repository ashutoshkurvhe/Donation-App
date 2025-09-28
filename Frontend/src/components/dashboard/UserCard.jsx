import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow rounded p-4 border border-gray-200">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Role: {user.role}</p>
    </div>
  );
};

export default UserCard;

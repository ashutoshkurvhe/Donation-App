// src/components/Admin/UserCard.jsx
import React from "react";
import { FaBan, FaUnlock } from "react-icons/fa";

const UserCard = ({ user, onBlock, onUnblock }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-gray-400">{user.role}</p>
      <div className="mt-2 flex space-x-2">
        {user.isBlocked ? (
          <button
            onClick={onUnblock}
            className="text-green-500 hover:text-green-700"
          >
            <FaUnlock /> Unblock
          </button>
        ) : (
          <button onClick={onBlock} className="text-red-500 hover:text-red-700">
            <FaBan /> Block
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;

// src/components/Users/UserCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
      ) : (
        <FaUser className="text-gray-400 text-4xl mb-2" />
      )}
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm mt-1 text-gray-400 capitalize">{user.role}</p>
      <button
        onClick={() => navigate(`/users/${user._id}`)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        View Profile
      </button>
    </div>
  );
};

export default UserCard;

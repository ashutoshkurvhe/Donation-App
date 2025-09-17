// src/pages/Users/UserProfile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../../redux/slices/userSlice";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!user) return <p className="text-center mt-8">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow mt-8">
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100">
            <span className="text-gray-400 text-4xl">{user.name[0]}</span>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-400 capitalize">{user.role}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/users/${user._id}/edit`)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate("/users")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

// src/pages/Users/EditUser.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../slices/userSlice";
import UserForm from "../../components/Users/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.users);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) reset({ name: user.name, avatar: user.avatar });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser({ id, data })).unwrap();
      navigate(`/users/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
      <UserForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        submitText="Update"
      />
    </div>
  );
};

export default EditUser;

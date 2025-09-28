// src/pages/ngos/RegisterNGO.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NGOForm from "../../components/forms/NGOForm";
import { registerNGO } from "../../features/ngos/ngoThunks";

const RegisterNGO = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegisterNGO = async (data) => {
    try {
      await dispatch(registerNGO(data)).unwrap();
      setSuccessMessage("NGO registered successfully!");
    } catch (error) {
      console.error("Failed to register NGO:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Register New NGO</h1>
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      <NGOForm onSubmit={handleRegisterNGO} />
    </div>
  );
};

export default RegisterNGO;

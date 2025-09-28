import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authThunks";
import Button from "../common/Button";
import Input from "../common/Input";

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Send Reset Link</Button>
    </form>
  );
};

export default PasswordResetForm;

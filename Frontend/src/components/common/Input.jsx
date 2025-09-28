// src/components/common/Input.jsx
import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <label className="block mb-4">
      {label}:
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="block mt-1 w-full border rounded p-2"
      />
    </label>
  );
};

export default Input;

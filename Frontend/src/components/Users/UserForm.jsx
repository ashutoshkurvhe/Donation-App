// src/components/Users/UserForm.jsx
import React from "react";

const UserForm = ({ register, handleSubmit, submitText }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register("name", { required: true, minLength: 2 })}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Avatar URL
        </label>
        <input
          type="text"
          {...register("avatar")}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
};

export default UserForm;

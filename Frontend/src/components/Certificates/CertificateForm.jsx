// src/components/Certificates/CertificateForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

const CertificateForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Donor Name
        </label>
        <input
          {...register("donorName")}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          NGO Name
        </label>
        <input
          {...register("ngoName")}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Campaign Title
        </label>
        <input
          {...register("campaignTitle")}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Certificate Text
        </label>
        <textarea
          {...register("certificateText")}
          rows={5}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save Certificate
      </button>
    </form>
  );
};

export default CertificateForm;

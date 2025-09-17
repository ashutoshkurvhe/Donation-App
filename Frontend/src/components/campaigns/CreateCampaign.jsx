import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createCampaign } from "../slices/campaignSlice";

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.campaign);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(createCampaign(data));
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-1">Goal Amount (₹)</label>
          <input
            type="number"
            {...register("goalAmount", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="environment">Environment</option>
            <option value="disaster-relief">Disaster Relief</option>
            <option value="poverty">Poverty</option>
            <option value="animal-welfare">Animal Welfare</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;

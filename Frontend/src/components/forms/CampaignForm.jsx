import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCampaign } from "../../features/campaigns/campaignThunks";
import Button from "../common/Button";
import Input from "../common/Input";

const CampaignForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", goalAmount);
    if (image) formData.append("image", image);

    dispatch(createCampaign(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
      <Input
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label className="block mb-4">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block mt-1 w-full border rounded p-2"
          rows={4}
          required
        />
      </label>
      <Input
        label="Goal Amount"
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        required
      />
      <label className="block mb-4">
        Campaign Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block mt-1 w-full"
        />
      </label>
      <Button type="submit">Create Campaign</Button>
    </form>
  );
};

export default CampaignForm;

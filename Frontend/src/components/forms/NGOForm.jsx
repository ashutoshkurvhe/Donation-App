import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerNGO } from "../../features/ngos/ngoThunks";
import Button from "../common/Button";
import Input from "../common/Input";

const NGOForm = () => {
  const dispatch = useDispatch();
  const [organizationName, setOrganizationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("organizationName", organizationName);
    formData.append("contactEmail", contactEmail);
    formData.append("contactPhone", contactPhone);
    formData.append("description", description);
    if (logo) formData.append("logo", logo);

    dispatch(registerNGO(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4">Register NGO</h2>
      <Input
        label="Organization Name"
        type="text"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        required
      />
      <Input
        label="Contact Email"
        type="email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        required
      />
      <Input
        label="Contact Phone"
        type="text"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
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
      <label className="block mb-4">
        Logo:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="block mt-1 w-full"
        />
      </label>
      <Button type="submit">Register NGO</Button>
    </form>
  );
};

export default NGOForm;

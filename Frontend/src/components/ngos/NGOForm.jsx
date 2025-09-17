import { useState } from "react";

const NGOForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    organizationName: initialData.organizationName || "",
    registrationNumber: initialData.registrationNumber || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    website: initialData.website || "",
    description: initialData.description || "",
    address: initialData.address || {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md rounded-xl p-6"
    >
      <div>
        <label className="block text-sm font-medium">Organization Name</label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          rows="4"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["street", "city", "state", "country", "postalCode"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field}
            </label>
            <input
              type="text"
              name={`address.${field}`}
              value={formData.address[field]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Save NGO
      </button>
    </form>
  );
};

export default NGOForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeDonation } from "../../slices/donationSlice";
import { FaDonate } from "react-icons/fa";

const DonationForm = ({ campaignId }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(makeDonation({ campaignId, amount }));
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded-lg space-y-3"
    >
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaDonate className="text-green-600" /> Make a Donation
      </h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Donate Now
      </button>
    </form>
  );
};

export default DonationForm;

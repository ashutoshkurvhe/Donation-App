// src/pages/Admin/Reports.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../../slices/adminSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { reportData } = useSelector((state) => state.admin);
  const [type, setType] = useState("donations");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFetch = () => {
    dispatch(fetchReport({ type, startDate, endDate }));
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">Export Data Reports</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="donations">Donations</option>
          <option value="campaigns">Campaigns</option>
          <option value="users">Users</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Report
        </button>
      </div>

      <div className="overflow-auto mt-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {reportData?.length > 0 &&
                Object.keys(reportData[0]).map((key) => (
                  <th key={key} className="border px-2 py-1 text-left">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {reportData?.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="border px-2 py-1">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

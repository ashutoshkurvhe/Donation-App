// src/pages/Admin/Notifications.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../slices/adminSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!title || !message) return alert("Title and message required");
    dispatch(sendNotification({ title, message }));
    setTitle("");
    setMessage("");
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Send System Notification</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="w-full border p-2 rounded"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Notification
      </button>
    </div>
  );
};

export default Notifications;

import React from "react";

const NotificationItem = ({ notification }) => {
  return (
    <div className="bg-white shadow p-3 rounded border border-gray-200">
      <p>{notification.message}</p>
      <p className="text-gray-400 text-xs">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NotificationItem;

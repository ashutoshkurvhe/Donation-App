// src/pages/notifications/Notifications.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "../../components/dashboard/NotificationItem";
import Loader from "../../components/common/Loader";
import { fetchNotifications } from "../../features/notifications/notificationThunks";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications at the moment.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

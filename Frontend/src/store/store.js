// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

// 🔹 Import slices
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import ngoReducer from "../features/ngos/ngoSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
import donationReducer from "../features/donations/donationSlice";
import commentReducer from "../features/comments/commentSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import certificateReducer from "../features/certificates/certificateSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    ngos: ngoReducer,
    campaigns: campaignReducer,
    donations: donationReducer,
    comments: commentReducer,
    notifications: notificationReducer,
    certificates: certificateReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To ignore non-serializable data in Redux (like Dates or complex objects)
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

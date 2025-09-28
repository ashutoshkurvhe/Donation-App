import { configureStore } from "@reduxjs/toolkit";

// 🔹 Import all slices
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import ngoReducer from "../features/ngos/ngoSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
import donationReducer from "../features/donations/donationSlice";
import commentReducer from "../features/comments/commentSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import certificateReducer from "../features/certificates/certificateSlice";
import adminReducer from "../features/admin/adminSlice";

const store = configureStore({
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
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

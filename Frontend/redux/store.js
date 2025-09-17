// frontend/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import certificateReducer from "./slices/certificateSlice";
import analyticsReducer from "./slices/analyticsSlice";
import commentReducer from "./slices/commentSlice";
import donationReducer from "./slices/donationSlice";
import notificationReducer from "./slices/notificationSlice";
import ngoReducer from "./slices/ngoSlice";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import campaignReducer from "./slices/campaignSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    certificates: certificateReducer,
    analytics: analyticsReducer,
    comments: commentReducer,
    donations: donationReducer,
    notifications: notificationReducer,
    ngos: ngoReducer,
    users: userReducer,
    admin: adminReducer,
    campaign: campaignReducer
  },
});

export default store;

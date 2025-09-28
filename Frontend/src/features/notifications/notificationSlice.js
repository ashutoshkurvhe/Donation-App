// src/features/notifications/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications, markAsRead } from "./notificationThunks";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get notifications
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark notification as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const id = action.meta.arg; // notificationId
        state.notifications = state.notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        );
      });
  },
});

// ✅ Export actions
export const { clearNotifications } = notificationSlice.actions;

// ✅ Export reducer as default (important for store.js)
export default notificationSlice.reducer;

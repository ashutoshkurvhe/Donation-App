import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ==================== Async Thunks ====================

// Create Notification
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.NOTIFICATIONS,
        notificationData
      );
      return data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Notifications
export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.NOTIFICATIONS);
      return data.notifications || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Mark As Read
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.NOTIFICATIONS}/${notificationId}/read`
      );
      return data.notification;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete Notification
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${API_PATHS.NOTIFICATIONS}/${notificationId}`
      );
      return { notificationId, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ==================== Slice ====================

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearNotificationState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled cases
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.unshift(action.payload);
        state.successMessage = "Notification created!";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.map((n) =>
          n._id === action.payload._id ? action.payload : n
        );
        state.successMessage = "Notification marked as read!";
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload.notificationId
        );
        state.successMessage = action.payload.message;
      })
      // Pending matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("notifications/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        }
      )
      // Rejected matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("notifications/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message ||
            action.error.message ||
            "Something went wrong";
        }
      );
  },
});

export const { clearNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;

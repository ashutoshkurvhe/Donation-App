import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ---------------------- Async Thunks ---------------------- //

// Approve NGO
export const approveNGO = createAsyncThunk(
  "admin/approveNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.ADMIN.NGO_APPROVE(ngoId)
      );
      return data.ngo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Reject NGO
export const rejectNGO = createAsyncThunk(
  "admin/rejectNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.ADMIN.NGO_REJECT(ngoId)
      );
      return data.ngo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Block User
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.ADMIN.USER_BLOCK(userId)
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Unblock User
export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.ADMIN.USER_UNBLOCK(userId)
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Remove Campaign
export const removeCampaign = createAsyncThunk(
  "admin/removeCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(API_PATHS.ADMIN.DELETE_CAMPAIGN(campaignId));
      return campaignId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Analytics
export const getPlatformAnalytics = createAsyncThunk(
  "admin/getPlatformAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_ANALYTICS);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_USERS, {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get All NGOs
export const getAllNGOs = createAsyncThunk(
  "admin/getAllNGOs",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.GET_NGOS, {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Flagged Content
export const getFlaggedContent = createAsyncThunk(
  "admin/getFlaggedContent",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.ADMIN.GET_FLAGGED_CONTENT
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Send Notification
export const sendSystemNotification = createAsyncThunk(
  "admin/sendSystemNotification",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.ADMIN.SEND_NOTIFICATION,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Export Data Report
export const exportDataReport = createAsyncThunk(
  "admin/exportDataReport",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ADMIN.EXPORT_REPORT, {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ---------------------- Slice ---------------------- //

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    ngos: [],
    users: [],
    flaggedContent: { flaggedCampaigns: [], flaggedComments: [] },
    analytics: {},
    notifications: [],
    loading: false,
    error: null,
    pagination: { current: 1, total: 1, totalRecords: 0 },
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update NGOs
      .addCase(approveNGO.fulfilled, (state, action) => {
        state.ngos = state.ngos.map((ngo) =>
          ngo._id === action.payload._id ? action.payload : ngo
        );
      })
      .addCase(rejectNGO.fulfilled, (state, action) => {
        state.ngos = state.ngos.map((ngo) =>
          ngo._id === action.payload._id ? action.payload : ngo
        );
      })
      // Update Users
      .addCase(blockUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      // Remove Campaign
      .addCase(removeCampaign.fulfilled, (state, action) => {
        state.flaggedContent.flaggedCampaigns =
          state.flaggedContent.flaggedCampaigns.filter(
            (c) => c._id !== action.payload
          );
      })
      // Analytics
      .addCase(getPlatformAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      // All Users
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users || [];
        state.pagination = action.payload.pagination || {
          current: 1,
          total: 1,
          totalRecords: 0,
        };
      })
      // All NGOs
      .addCase(getAllNGOs.fulfilled, (state, action) => {
        state.ngos = action.payload.ngos || [];
        state.pagination = action.payload.pagination || {
          current: 1,
          total: 1,
          totalRecords: 0,
        };
      })
      // Flagged Content
      .addCase(getFlaggedContent.fulfilled, (state, action) => {
        state.flaggedContent = action.payload;
      })
      // Notifications
      .addCase(sendSystemNotification.fulfilled, (state, action) => {
        state.notifications.push(action.payload);
      })
      // Export
      .addCase(exportDataReport.fulfilled, (state, action) => {
        // handle report export result if needed
      })
      // Handle Pending & Rejected
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("admin/") && action.type.endsWith("/rejected"),
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

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;

// src/redux/slices/analyticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// Fetch User Analytics by ID
export const getUserAnalytics = createAsyncThunk(
  "analytics/getUserAnalytics",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.ANALYTICS.GET_USER_ANALYTICS(userId)
      );
      return res.data.analytics;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch NGO Analytics by ID
export const getNGOAnalytics = createAsyncThunk(
  "analytics/getNGOAnalytics",
  async (ngoId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.ANALYTICS.GET_NGO_ANALYTICS(ngoId)
      );
      return res.data.analytics;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    userAnalytics: null,
    ngoAnalytics: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalytics: (state) => {
      state.userAnalytics = null;
      state.ngoAnalytics = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === USER ANALYTICS ===
      .addCase(getUserAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.userAnalytics = action.payload;
      })
      .addCase(getUserAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === NGO ANALYTICS ===
      .addCase(getNGOAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNGOAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.ngoAnalytics = action.payload;
      })
      .addCase(getNGOAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;

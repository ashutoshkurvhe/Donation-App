import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ==================== Async Thunks ====================

// Make a donation
export const makeDonation = createAsyncThunk(
  "donations/makeDonation",
  async ({ campaignId, amount }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.DONATIONS, {
        campaignId,
        amount,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get user donations
export const getUserDonations = createAsyncThunk(
  "donations/getUserDonations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.DONATIONS);
      return data.donations || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete donation (admin only)
export const deleteDonation = createAsyncThunk(
  "donations/deleteDonation",
  async (donationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${API_PATHS.DONATIONS}/${donationId}`
      );
      return { donationId, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ==================== Slice ====================

const donationSlice = createSlice({
  name: "donations",
  initialState: {
    donations: [],
    donation: null, // latest donation
    certificate: null, // certificate from donation
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearDonationState: (state) => {
      state.donation = null;
      state.certificate = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fulfilled cases first
    builder
      .addCase(makeDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donation = action.payload.donation || null;
        state.certificate = action.payload.certificate || null;
        state.successMessage = "Donation successful!";
        if (action.payload.donation)
          state.donations.push(action.payload.donation);
      })
      .addCase(getUserDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload || [];
      })
      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = state.donations.filter(
          (donation) => donation._id !== action.payload.donationId
        );
        state.successMessage =
          action.payload.message || "Donation deleted successfully";
      });

    // Matchers for all pending/rejected
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("donations/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("donations/") &&
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

export const { clearDonationState } = donationSlice.actions;
export default donationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "./campaignThunks";

const initialState = {
  campaigns: [],
  selectedCampaign: null,
  loading: false,
  error: null,
  successMessage: null,
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    clearCampaignState: (state) => {
      state.selectedCampaign = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all campaigns
      .addCase(getAllCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(getAllCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get campaign by ID
      .addCase(getCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCampaign = action.payload;
      })
      .addCase(getCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create campaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Campaign created successfully";
        state.campaigns.push(action.payload);
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update campaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Campaign updated successfully";
        const index = state.campaigns.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.campaigns[index] = action.payload;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete campaign
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Campaign deleted successfully";
        state.campaigns = state.campaigns.filter(
          (c) => c._id !== action.payload._id
        );
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCampaignState } = campaignSlice.actions;
export default campaignSlice.reducer;

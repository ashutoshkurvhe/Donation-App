import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getAllNGOs,
  approveNGO,
  approveCampaign,
} from "./adminThunks";

const initialState = {
  users: [],
  ngos: [],
  loading: false,
  error: null,
  successMessage: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch all NGOs
      .addCase(getAllNGOs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNGOs.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = action.payload;
      })
      .addCase(getAllNGOs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Approve NGO
      .addCase(approveNGO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "NGO approved successfully";
        // Update NGO status locally
        const index = state.ngos.findIndex(
          (ngo) => ngo._id === action.payload._id
        );
        if (index !== -1) state.ngos[index] = action.payload;
      })
      .addCase(approveNGO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Approve Campaign
      .addCase(approveCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Campaign approved successfully";
        // Update campaign status locally
        const index = state.campaigns.findIndex(
          (camp) => camp._id === action.payload._id
        );
        if (index !== -1) state.campaigns[index] = action.payload;
      })
      .addCase(approveCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;

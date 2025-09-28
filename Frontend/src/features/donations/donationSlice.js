import { createSlice } from "@reduxjs/toolkit";
import { getAllDonations, makeDonation, getDonationById } from "./donationThunks";

const initialState = {
  donations: [],
  selectedDonation: null,
  loading: false,
  error: null,
  successMessage: null,
};

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    clearDonationState: (state) => {
      state.selectedDonation = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all donations
      .addCase(getAllDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(getAllDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Make a donation
      .addCase(makeDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Donation successful!";
        state.donations.push(action.payload);
      })
      .addCase(makeDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch donation by ID (for receipt)
      .addCase(getDonationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDonation = action.payload;
      })
      .addCase(getDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearDonationState } = donationSlice.actions;
export default donationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNGOs,
  getNGOById,
  approveNGO,
  updateNGO,
  deleteNGO,
} from "./ngoThunks";

const initialState = {
  ngos: [],
  selectedNGO: null,
  loading: false,
  error: null,
  successMessage: null,
};

const ngoSlice = createSlice({
  name: "ngos",
  initialState,
  reducers: {
    clearNGOState: (state) => {
      state.selectedNGO = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all NGOs
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
      // Get NGO by ID
      .addCase(getNGOById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNGOById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNGO = action.payload;
      })
      .addCase(getNGOById.rejected, (state, action) => {
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
        const index = state.ngos.findIndex((n) => n._id === action.payload._id);
        if (index !== -1) state.ngos[index] = action.payload;
      })
      .addCase(approveNGO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update NGO
      .addCase(updateNGO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "NGO updated successfully";
        const index = state.ngos.findIndex((n) => n._id === action.payload._id);
        if (index !== -1) state.ngos[index] = action.payload;
      })
      .addCase(updateNGO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete NGO
      .addCase(deleteNGO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "NGO deleted successfully";
        state.ngos = state.ngos.filter((n) => n._id !== action.payload._id);
      })
      .addCase(deleteNGO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearNGOState } = ngoSlice.actions;
export default ngoSlice.reducer;

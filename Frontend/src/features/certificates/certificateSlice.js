import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCertificates,
  generateCertificate,
  getCertificateById,
} from "./certificateThunks";

const initialState = {
  certificates: [],
  selectedCertificate: null,
  loading: false,
  error: null,
  successMessage: null,
};

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    clearCertificateState: (state) => {
      state.error = null;
      state.successMessage = null;
      state.selectedCertificate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all certificates
      .addCase(getAllCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(getAllCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Generate certificate
      .addCase(generateCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
        state.successMessage = "Certificate generated successfully";
      })
      .addCase(generateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get certificate by ID
      .addCase(getCertificateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCertificateById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCertificate = action.payload;
      })
      .addCase(getCertificateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCertificateState } = certificateSlice.actions;
export default certificateSlice.reducer;

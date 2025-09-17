import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ------------------ Async Thunks ------------------ //

// Generate certificate
export const generateCertificate = createAsyncThunk(
  "certificates/generateCertificate",
  async (donationId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `${API_PATHS.CERTIFICATES.GENERATE}/${donationId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get certificates by user
export const getCertificatesByUser = createAsyncThunk(
  "certificates/getCertificatesByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.CERTIFICATES.BY_USER}/${userId}`
      );
      return res.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get certificates by NGO
export const getCertificatesByNGO = createAsyncThunk(
  "certificates/getCertificatesByNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.CERTIFICATES.BY_NGO}/${ngoId}`
      );
      return res.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete certificate
export const deleteCertificate = createAsyncThunk(
  "certificates/deleteCertificate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `${API_PATHS.CERTIFICATES.DELETE}/${id}`
      );
      return { id, ...res.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ------------------ Slice ------------------ //

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    certificates: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCertificateState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fulfilled cases first
    builder
      .addCase(generateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        if (action.payload.certificate)
          state.certificates.push(action.payload.certificate);
      })
      .addCase(getCertificatesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload || [];
      })
      .addCase(getCertificatesByNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload || [];
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.certificates = state.certificates.filter(
          (cert) => cert._id !== action.payload.id
        );
      });

    // Then add matchers
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("certificates/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("certificates/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || action.error.message;
        }
      );
  },
});

export const { clearCertificateState } = certificateSlice.actions;
export default certificateSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all certificates
export const getAllCertificates = createAsyncThunk(
  "certificates/getAllCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.certificates.getAll);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Generate a new certificate
export const generateCertificate = createAsyncThunk(
  "certificates/generateCertificate",
  async (certificateData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.certificates.generate,
        certificateData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get a certificate by ID
export const getCertificateById = createAsyncThunk(
  "certificates/getCertificateById",
  async (certificateId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.certificates.getById}/${certificateId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

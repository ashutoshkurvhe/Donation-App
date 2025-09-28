import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all NGOs
export const getAllNGOs = createAsyncThunk(
  "ngos/getNGOs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.ngos.getAll);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch NGO by ID
export const getNGOById = createAsyncThunk(
  "ngos/getNGOById",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.ngos.getById}/${ngoId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Approve NGO
export const approveNGO = createAsyncThunk(
  "ngos/approveNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.ngos.approve}/${ngoId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update NGO
export const updateNGO = createAsyncThunk(
  "ngos/updateNGO",
  async ({ ngoId, ngoData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.ngos.update}/${ngoId}`,
        ngoData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete NGO
export const deleteNGO = createAsyncThunk(
  "ngos/deleteNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${API_PATHS.ngos.delete}/${ngoId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

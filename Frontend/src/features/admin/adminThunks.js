import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.admin.getUsers);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all NGOs
export const getAllNGOs = createAsyncThunk(
  "admin/getAllNGOs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.admin.getNGOs);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Approve NGO
export const approveNGO = createAsyncThunk(
  "admin/approveNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `${API_PATHS.admin.approveNGO}/${ngoId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Approve Campaign
export const approveCampaign = createAsyncThunk(
  "admin/approveCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `${API_PATHS.admin.approveCampaign}/${campaignId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

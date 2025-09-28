import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all campaigns
export const getAllCampaigns = createAsyncThunk(
  "campaigns/getCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.campaigns.getAll);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch campaign by ID
export const getCampaignById = createAsyncThunk(
  "campaigns/getCampaignById",
  async (campaignId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.campaigns.getById}/${campaignId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch campaigns by NGO (missing one causing error)
export const getCampaignsByNGO = createAsyncThunk(
  "campaigns/getCampaignsByNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.campaigns.getByNGO(ngoId));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
    

// Create campaign
export const createCampaign = createAsyncThunk(
  "campaigns/createCampaign",
  async (campaignData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.campaigns.create,
        campaignData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update campaign
export const updateCampaign = createAsyncThunk(
  "campaigns/updateCampaign",
  async ({ campaignId, campaignData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.campaigns.update}/${campaignId}`,
        campaignData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete campaign
export const deleteCampaign = createAsyncThunk(
  "campaigns/deleteCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${API_PATHS.campaigns.delete}/${campaignId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

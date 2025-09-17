import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ------------------ Async Thunks ------------------ //

// Create Campaign
export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (campaignData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.CAMPAIGNS.CREATE,
        campaignData
      );
      return data.campaign;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get All Campaigns
export const getCampaigns = createAsyncThunk(
  "campaign/getCampaigns",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.CAMPAIGNS.GET_ALL, {
        params,
      });
      return data.campaigns;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Featured Campaigns
export const getFeaturedCampaigns = createAsyncThunk(
  "campaign/getFeaturedCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.CAMPAIGNS.GET_FEATURED
      );
      return data.campaigns;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Search Campaigns
export const searchCampaigns = createAsyncThunk(
  "campaign/searchCampaigns",
  async (queryParams = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.CAMPAIGNS.SEARCH, {
        params: queryParams,
      });
      return data.campaigns;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Campaign by ID
export const getCampaignById = createAsyncThunk(
  "campaign/getCampaignById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.CAMPAIGNS.GET_BY_ID(id)
      );
      return data.campaign;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Update Campaign
export const updateCampaign = createAsyncThunk(
  "campaign/updateCampaign",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.CAMPAIGNS.UPDATE(id),
        updates
      );
      return data.campaign;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Toggle Campaign Status
export const toggleCampaignStatus = createAsyncThunk(
  "campaign/toggleCampaignStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        API_PATHS.CAMPAIGNS.TOGGLE_STATUS(id),
        { status }
      );
      return data.campaign;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Donate to Campaign
export const donateToCampaign = createAsyncThunk(
  "campaign/donateToCampaign",
  async ({ id, amount }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.CAMPAIGNS.DONATE(id),
        { amount }
      );
      return data.campaign;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete Campaign
export const deleteCampaign = createAsyncThunk(
  "campaign/deleteCampaign",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(API_PATHS.CAMPAIGNS.DELETE(id));
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Campaign Stats
export const getCampaignStats = createAsyncThunk(
  "campaign/getCampaignStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.CAMPAIGNS.GET_STATS);
      return data.stats;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ------------------ Slice ------------------ //

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
    featured: [],
    searched: [],
    stats: null,
    currentCampaign: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearCampaignError: (state) => {
      state.error = null;
    },
    clearCampaignSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.push(action.payload);
        state.success = "Campaign created successfully";
      })
      // Get All
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      // Featured
      .addCase(getFeaturedCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      // Search
      .addCase(searchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.searched = action.payload;
      })
      // Get by ID
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      // Update
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        if (state.currentCampaign?._id === action.payload._id) {
          state.currentCampaign = action.payload;
        }
        state.success = "Campaign updated successfully";
      })
      // Toggle Status
      .addCase(toggleCampaignStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        if (state.currentCampaign?._id === action.payload._id) {
          state.currentCampaign = action.payload;
        }
        state.success = "Campaign status updated";
      })
      // Donate
      .addCase(donateToCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        if (state.currentCampaign?._id === action.payload._id) {
          state.currentCampaign = action.payload;
        }
        state.success = "Donation successful";
      })
      // Delete
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = state.campaigns.filter(
          (c) => c._id !== action.payload
        );
        state.success = "Campaign deleted successfully";
      })
      // Stats
      .addCase(getCampaignStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      // Handle Pending
      .addMatcher(
        (action) =>
          action.type.startsWith("campaign/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )
      // Handle Rejected
      .addMatcher(
        (action) =>
          action.type.startsWith("campaign/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || action.error.message;
        }
      );
  },
});

export const { clearCampaignError, clearCampaignSuccess } =
  campaignSlice.actions;
export default campaignSlice.reducer;

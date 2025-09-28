import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all donations
export const getAllDonations = createAsyncThunk(
  "donations/getDonations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.donations.getAll);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Make a donation
export const makeDonation = createAsyncThunk(
  "donations/makeDonation",
  async ({ campaignId, amount }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.donations.create, {
        campaignId,
        amount,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch donation by ID (for receipt)
export const getDonationById = createAsyncThunk(
  "donations/getDonationById",
  async (donationId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.donations.getById}/${donationId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

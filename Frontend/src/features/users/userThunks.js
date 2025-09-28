import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_PATHS } from "../../api/apiPaths";

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.users.getAll);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.users.getById}/${userId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.users.update}/${userId}`,
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${API_PATHS.users.delete}/${userId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

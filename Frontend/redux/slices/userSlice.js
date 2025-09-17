import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ==================== Async Thunks ==================== //

// 1) Get all users (super-admin only)
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      return data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// 2) Get user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.USERS.GET_SINGLE_USER(id)
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// 3) Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.USERS.UPDATE_USER(id),
        updates
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// 4) Delete user (super-admin only)
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        API_PATHS.USERS.DELETE_USER(id)
      );
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ==================== Slice ==================== //

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled cases
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
        state.successMessage = "User updated successfully";
        state.users = state.users.map((u) =>
          u._id === action.payload._id ? action.payload : u
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload.id);
        state.successMessage = action.payload.message;
      })
      // Pending matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("users/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        }
      )
      // Rejected matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("users/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message ||
            action.error.message ||
            "Something went wrong";
        }
      );
  },
});

export const { clearUserError, clearSuccessMessage } = userSlice.actions;
export default userSlice.reducer;

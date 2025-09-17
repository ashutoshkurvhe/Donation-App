import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";
// ==================== Async Thunks ====================

// Create NGO
export const createNGO = createAsyncThunk(
  "ngo/createNGO",
  async (ngoData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.NGOS, ngoData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return data.ngo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get All NGOs
export const getNGOs = createAsyncThunk(
  "ngo/getNGOs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.NGOS);
      return data.ngos || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get NGO by ID
export const getNGOById = createAsyncThunk(
  "ngo/getNGOById",
  async (ngoId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${API_PATHS.NGOS}/${ngoId}`);
      return data.ngo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Update NGO
export const updateNGO = createAsyncThunk(
  "ngo/updateNGO",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${API_PATHS.NGOS}/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return data.ngo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete NGO
export const deleteNGO = createAsyncThunk(
  "ngo/deleteNGO",
  async (ngoId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_PATHS.NGOS}/${ngoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return ngoId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ==================== Slice ====================

const ngoSlice = createSlice({
  name: "ngo",
  initialState: {
    ngos: [],
    currentNGO: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearNGOError: (state) => {
      state.error = null;
    },
    clearNGOSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fulfilled cases
      .addCase(createNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos.push(action.payload);
        state.success = "NGO created successfully";
      })
      .addCase(getNGOs.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = action.payload;
      })
      .addCase(getNGOById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNGO = action.payload;
      })
      .addCase(updateNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = state.ngos.map((ngo) =>
          ngo._id === action.payload._id ? action.payload : ngo
        );
        if (state.currentNGO?._id === action.payload._id) {
          state.currentNGO = action.payload;
        }
        state.success = "NGO updated successfully";
      })
      .addCase(deleteNGO.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = state.ngos.filter((ngo) => ngo._id !== action.payload);
        state.success = "NGO deleted successfully";
      })
      // Pending matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("ngo/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )
      // Rejected matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("ngo/") && action.type.endsWith("/rejected"),
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

export const { clearNGOError, clearNGOSuccess } = ngoSlice.actions;
export default ngoSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/utils/axiosInstance";
import { API_PATHS } from "../../src/utils/apiPaths";

// ------------------ Async Thunks ------------------ //

// Add Comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ campaignId, text }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API_PATHS.COMMENTS.ADD, {
        campaignId,
        text,
      });
      return res.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Get Comments by Campaign
export const getCommentsByCampaign = createAsyncThunk(
  "comments/getCommentsByCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.COMMENTS.BY_CAMPAIGN}/${campaignId}`
      );
      return res.data.comments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Update Comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `${API_PATHS.COMMENTS.UPDATE}/${id}`,
        { text }
      );
      return res.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_PATHS.COMMENTS.DELETE}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ------------------ Slice ------------------ //

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fulfilled cases first
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(getCommentsByCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload || [];
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.comments[index] = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((c) => c._id !== action.payload);
      });

    // Matchers for all pending/rejected
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("comments/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("comments/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || action.error.message;
        }
      );
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;

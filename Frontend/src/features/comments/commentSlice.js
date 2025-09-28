import { createSlice } from "@reduxjs/toolkit";
import { getAllComments, addComment, deleteComment } from "./commentThunks";

const initialState = {
  comments: [],
  loading: false,
  error: null,
  successMessage: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
        state.successMessage = "Comment added successfully!";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
        state.successMessage = "Comment deleted successfully!";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCommentState } = commentSlice.actions;
export default commentSlice.reducer;

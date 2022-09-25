import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchComments = createAsyncThunk(
  "comment/createComment",
  async (postId, comment) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchLastComments = createAsyncThunk(
  "comment/createLastComment",
  async () => {
    const { data } = await axios.get("/lastComments");
    return data;
  }
);

export const fetchCommentsOnPost = createAsyncThunk(
  "comment/createCommentsOnPost",
  async (postId) => {
    const { data } = await axios.get(`/comments/${postId}`);
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
  lastComments: {
    items: [],
    status: "loading",
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    //create comment
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments = [];
      state.comments.status = "error";
    },

    //last comments
    [fetchLastComments.pending]: (state) => {
      state.lastComments.items = [];
      state.lastComments.status = "loading";
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.status = "loaded";
    },
    [fetchLastComments.rejected]: (state) => {
      state.lastComments.items = [];
      state.lastComments.status = "error";
    },
    //comments
    [fetchCommentsOnPost.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchCommentsOnPost.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentsOnPost.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});

export const commentReducer = commentSlice.reducer;

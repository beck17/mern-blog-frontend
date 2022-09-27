import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPopulatePosts = createAsyncThunk(
  "posts/fetchPopulatePosts",
  async () => {
    const { data } = await axios.get("/posts/populate");
    return data;
  }
);

export const fetchPostsOnTag = createAsyncThunk(
  "posts/fetchPostsOnTag",
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

export const fetchLikePost = createAsyncThunk(
  "posts/fetchLikePost",
  async (id) => {
    const { data } = await axios.post(`/like/${id}`);
    return data.likes;
  }
);

export const fetchDislikePost = createAsyncThunk(
  "posts/fetchDislikePost",
  async (id) => {
    const { data } = await axios.post(`/dislike/${id}`);
    return data.likes;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  likes: {
    count: 0,
    isLike: false,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // получение постов
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // получение постов по просмотрам
    [fetchPopulatePosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPopulatePosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopulatePosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // получение постов по тэгу
    [fetchPostsOnTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsOnTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsOnTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // удаление постов
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    // // лайк
    // [fetchLikePost.pending]: (state) => {
    //   state.likes.count = 0;
    //   state.likes.isLike = false;
    // },
    // [fetchLikePost.fulfilled]: (state, action) => {
    //   state.likes.count = action.payload;
    //   state.likes.isLike = true;
    // },
    // [fetchLikePost.rejected]: (state) => {
    //   state.likes.count = 0;
    //   state.likes.isLike = false;
    // },
    // // дизлайк
    // [fetchDislikePost.pending]: (state) => {
    //   state.likes.count = 0;
    //   state.likes.isLike = true;
    // },
    // [fetchDislikePost.fulfilled]: (state, action) => {
    //   state.likes.count = action.payload;
    //   state.likes.isLike = false;
    // },
    // [fetchDislikePost.rejected]: (state) => {
    //   state.likes.count = 0;
    //   state.likes.isLike = true;
    // },
  },
});
export const postsReducer = postSlice.reducer;

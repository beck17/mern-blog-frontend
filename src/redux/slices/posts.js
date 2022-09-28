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
    return data;
  }
);

export const fetchLikesOnPost = createAsyncThunk(
  "posts/fetchLikesOnPost",
  async (id) => {
    const { data } = await axios.get(`/likes/${id}`);
    return data;
  }
);

export const fetchDislikePost = createAsyncThunk(
  "posts/fetchDislikePost",
  async (id) => {
    const { data } = await axios.post(`/dislike/${id}`);
    return data;
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
    count: [],
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
    // лайк
    [fetchLikePost.pending]: (state) => {
      // state.likes.count = state.likes.count;
      state.likes.isLike = false;
    },
    [fetchLikePost.fulfilled]: (state, action) => {
      state.likes.count = state.likes.count.concat(action.payload);
      state.likes.isLike = true;
    },
    [fetchLikePost.rejected]: (state) => {
      state.likes.count = [];
      state.likes.isLike = false;
    },
    // дизлайк
    [fetchDislikePost.pending]: (state) => {
      state.likes.isLike = true;
    },
    [fetchDislikePost.fulfilled]: (state, action) => {
      state.likes.isLike = false;
      const arr = action.payload;
      arr.pop();
      state.likes.count = arr;
    },
    [fetchDislikePost.rejected]: (state) => {
      state.likes.count = [];
      state.likes.isLike = true;
    },
    //получение всех лайков на пост
    [fetchLikesOnPost.pending]: (state) => {
      state.likes.count = [];
    },
    [fetchLikesOnPost.fulfilled]: (state, action) => {
      state.likes.count = action.payload;
    },
    [fetchLikesOnPost.rejected]: (state) => {
      state.likes.count = [];
    },
  },
});
export const postsReducer = postSlice.reducer;

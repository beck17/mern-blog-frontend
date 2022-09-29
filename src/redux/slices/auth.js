import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (params) => {
    const { data } = await axios.post("/auth/registerUser", params);
    return data;
  }
);

export const fetchRegisterPublish = createAsyncThunk(
  "auth/fetchRegisterPublish",
  async (params) => {
    const { data } = await axios.post("/auth/registerPublish", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegisterUser.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegisterUser.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegisterPublish.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegisterPublish.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegisterPublish.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

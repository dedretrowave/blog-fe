import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../Utils/axios";


export const fetchUser =
  createAsyncThunk('user/fetchUsers', async (loginData) => {
    const { data } = await axios.post(`/auth/login`, loginData);
    return data;
})

export const fetchToken =
  createAsyncThunk('user/fetchToken', async (authToken) => {
    const { data } = await axios.get('/auth/me');

    return data;
  })

const initialState = {
  data: null,
  status: 'loading',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'loaded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })


      .addCase(fetchToken.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'loaded';
      })
      .addCase(fetchToken.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
  }
})

export const isLoggedIn = state => !!state.user.data;
export const getUser = state => state.user;
export const getPosts = state => state.posts;

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../Utils/axios";


export const fetchUser =
  createAsyncThunk('user/fetchUser', async (loginData) => {
    const data =
      await axios.post(`/auth/login`, loginData)
        .then(response => response.data)
        .catch(err => err.response.data);
    return data;
});

export const createUser =
    createAsyncThunk('user/createUser', async (registerData) => {
      const data = await axios.post('/auth/register', registerData)
        .then(response => response.data)
        .catch(err => err.response.data);
      return data;
    });

export const fetchToken =
  createAsyncThunk('user/fetchToken', async (authToken) => {
    const data = await axios.get('/auth/me')
      .then(response => response.data)
      .catch(err => err.response.data);

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
      .addCase(fetchUser.rejected, (state, action) => {
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


      .addCase(createUser.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'loaded';
      })
      .addCase(createUser.rejected, (state) => {
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
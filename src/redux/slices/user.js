import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import globalSettings from "../../Settings/globalSettings";

export const fetchUser =
  createAsyncThunk('user/fetchUsers', async (loginData) => {
    let data = await fetch(`${globalSettings.BASE_URL}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json', // Set the content type in headers
      },
      body: JSON.stringify(loginData),
    });
    data = await data.json();
    return data;
})

const initialState = {
  data: null,
  status: 'loading',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
  }
})

export const isLoggedIn = state => !!state.user.data;
export const getUser = state => state.user.data;

export const userReducer = userSlice.reducer;
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../Utils/axios";

export const fetchPosts =
  createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');

  return data;
});

export const deletePost =
  createAsyncThunk('posts/deletePost', async (postId) => {
    const { data } = await axios.delete(`/posts/${postId}`);

    return data;
  })

export const fetchTags =
  createAsyncThunk('posts/getTags', async () => {
  const { data } = await axios.get(`/posts/tags`);

  return data;
})

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  }
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.posts.items = action.payload.posts;
        state.posts.status = 'loaded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload.tags;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      })
  }
});

export const postsReducer = postsSlice.reducer;
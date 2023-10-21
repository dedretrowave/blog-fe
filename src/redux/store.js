import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { userReducer } from "./slices/user";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export default store;
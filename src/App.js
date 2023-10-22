import React from "react";
import { Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { fetchToken, isLoggedIn } from "./redux/slices/user";

import { Container } from "@mui/material";
import { Header } from "./Components";
import {
  Home,
  PostPage,
  Register,
  AddPost,
  Login
} from "./Pages";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);

  React.useEffect(() => {
    dispatch(fetchToken());
  }, []);

  return (
    <>
      <Header/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<PostPage/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;

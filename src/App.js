import React from "react";
import { Routes, Route } from "react-router-dom";
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

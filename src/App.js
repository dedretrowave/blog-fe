import { Container } from "@mui/material";

import { Header } from "./Components";
import {
  Home,
  // PostPage,
  // Register,
  // AddPost,
  // Login
} from "./Pages";

function App() {
  return (
    <>
      <Header/>
      <Container maxWidth="lg">
        <Home/>

      </Container>
    </>
  );
}

export default App;

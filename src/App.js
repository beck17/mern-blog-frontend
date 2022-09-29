import React from "react";
import Container from "@mui/material/Container";

import { Header } from "./components";
import {
  Home,
  FullPost,
  RegistrationUser,
  RegistrationPublish,
  AddPost,
  Login,
  Register,
} from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerUser" element={<RegistrationUser />} />
          <Route path="/registerPublish" element={<RegistrationPublish />} />
          <Route path="/*" element={<h1>NOT FOUND 404</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

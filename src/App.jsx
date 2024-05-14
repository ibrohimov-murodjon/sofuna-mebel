import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RoutesLayout from "./Layout/RoutesLayout.jsx";
import { jwtDecode } from "jwt-decode";

import {
  ErrorPage,
  Home,
  Login,
  Message,
  Order,
  Product,
  Profile,
  Xodimlar,
} from "./Pages";
import { useSelector } from "react-redux";

function App() {
  // const token = useSelector((state) => state.userToken.token);
  let token =
    "eyJhbGciOiaIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1Njg4MTYyLCJpYXQiOjE3MTU2NzAxNjIsImp0aSI6IjAxODY1YTc4MmFiMjQyMWJiYjE5MzNmMGQ1OTYwZjA3IiwidXNlcl9pZCI6ImIzNzEzOWFhLTk3MTgtNGM0OC04MzYxLTQ1ZjdmNjk1YzY3YyJ9.rx7j3Xd4ki4lAwmRgpv63kNT4wqSSs0-wkcZJm2h85A";
  let userId = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.user_id;
    console.log(decodedToken);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    console.log(userId);
  }, []);

  function ProtectedRoute({
    children,
    redirectTo = "/login",
    isAuthentication,
  }) {
    useEffect(() => {
      if (!isAuthentication) {
        return navigate(redirectTo);
      }
    }, [isAuthentication, navigate, redirectTo]);

    return children;
  }
  let role = "admin";
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        {token !== null && role === "admin" && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Home />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuthentication={token ? true : false}
                ></ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

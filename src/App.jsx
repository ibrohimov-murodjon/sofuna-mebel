import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const token = useSelector((state) => state.userToken.token);
  let userId = "";
  const [role, setRole] = useState("");

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.user_id;
    fetch("https://custom.uz/users/" + userId)
      .then((res) => res.json())
      .then((data) => {
        setRole(data.user_roles);
      });
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
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

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        {token !== null && role == "admin" && (
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
              path="/product"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Product />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Order />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/message"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Message />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/xodimlar"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Xodimlar />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <RoutesLayout>
                    <Profile />
                  </RoutesLayout>
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

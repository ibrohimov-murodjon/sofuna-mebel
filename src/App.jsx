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
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchUserRole() {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        try {
          const response = await fetch(`https://custom.uz/users/${userId}`);
          const data = await response.json();
          setRole(data.user_roles);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUserRole();
  }, [token]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  function ProtectedRoute({
    children,
    redirectTo = "/login",
    isAuthentication,
  }) {
    useEffect(() => {
      if (!isAuthentication) {
        navigate(redirectTo);
      }
    }, [isAuthentication, navigate, redirectTo]);

    return children;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
      {token && role === "admin" && (
        <>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Home />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Product />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Order />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Message />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/xodimlar"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Xodimlar />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAuthentication={token ? true : false}
                redirectTo="/login"
              >
                <RoutesLayout>
                  <Profile />
                </RoutesLayout>
              </ProtectedRoute>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;

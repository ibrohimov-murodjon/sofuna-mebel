import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "./store/userToken";
import GlobalStyles from "./styles/GlobalStyles";
import WorkerOrder from "./Pages/WorkerOrder.jsx";

function App() {
  const token = useSelector((state) => state.userToken.token);
  const role = useSelector((state) => state.userToken.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function fetchUserRole() {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user_roles;
      const currentTime = Date.now() / 1000;
      dispatch(setRole(userRole));
      if (decodedToken.exp < currentTime) {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    fetchUserRole();
  }, [navigate, token]);

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
    <>
      <GlobalStyles />
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
        {token !== null && role == "worker" && (
          <>
             <Route
              path="/"
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
                 <Route
              path="/mahsulot/:id"
              element={
                <ProtectedRoute
                  isAuthentication={token ? true : false}
                  redirectTo="/login"
                >
                  <RoutesLayout>
                    <WorkerOrder />
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

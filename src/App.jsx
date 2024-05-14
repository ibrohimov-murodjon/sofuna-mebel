import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RoutesLayout from "./Layout/RoutesLayout.jsx";
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
import { AuthLogin } from "./Auth/Auth";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [role, setRole] = useState();

  const ProtectedRoute = ({ redirectTo = "/login", isAuthentication }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("roles")) {
        setIsUserAuthenticated(true);
        const roles = JSON.parse(localStorage.getItem("roles"));
        setRole(roles);
      } else {
        navigate(redirectTo);
      }
    }, [isUserAuthenticated, redirectTo]);

    const rols = (role) => {
      switch (role) {
        case "admin":
          return (
            <RoutesLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <>
                  <Route path="/product" element={<Product />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/message" element={<Message />} />
                  <Route path="/Xodimlar" element={<Xodimlar />} />
                  <Route path="/profile" element={<Profile />} />
                </>
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </RoutesLayout>
          );
        case "manager":
          return (
            <RoutesLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </RoutesLayout>
          );
        case "worker":
          return (
            <RoutesLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </RoutesLayout>
          );
        default:
          break;
      }
    };

    return isAuthentication ? rols(role) : null;
  };

  return (
    <AuthLogin.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute
              isAuthentication={isUserAuthenticated}
              redirectTo="/login"
            ></ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/errorPage" element={<ErrorPage />} />
      </Routes>
    </AuthLogin.Provider>
  );
}

export default App;

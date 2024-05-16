import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/userToken";
import Loader from "../components/Loader/index";
import { toast, ToastContainer } from "react-toastify";
import OutlinedInput from "../components/OutlineInput";
import { Logo } from "../assets";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const dispatch = useDispatch();
  const minPasswordLength = 5;

  function handleValidation() {
    const newErrors = {};

    if (!username.trim().length > 0) {
      newErrors.username = true;
    } else {
      newErrors.username = false;
    }

    if (!(password.trim().length >= 1 && password.length >= minPasswordLength)) {
      newErrors.password = true;
    } else {
      newErrors.password = false;
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      setLoading(true);

      let user = {
        username: username,
        password: password,
      };

      fetch("https://custom.uz/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            dispatch(setToken(data.access_token));
            localStorage.setItem("accessToken", JSON.stringify(data.access_token));
            navigate("/");
          } else if (!data.success) {
            toast.error("Login yoki paroldagi xatolik !!!", {
              position: "top-center",
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          toast.error("Serverdagi xatolik !!!", {
            position: "top-center",
            autoClose: 1500,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className="min-h-screen bg-login text-gray-900 flex justify-center">
      <div style={{ display: `${loading ? "block" : "none"}` }}>
        <Loader />
      </div>
      <div className="max-w-screen-xl m-0 sm:m-10 backdrop-blur-md drop-shadow-2xl bg-white/30 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="">
            <img src={Logo} className="w-[100px] mx-auto h-[100px] rounded-full" />
          </div>
          <div className="mt-12 flex flex-col items-center z-50">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Tizimga kirish</h1>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-[18px]">
                  Username <span className="text-red-600 text-[25px]">*</span>
                </label>
                <OutlinedInput
                  bgColor="white"
                  value={username}
                  onChange={setUsername}
                  placeholder="Username..."
                  isError={errors.username}
                  id="email"
                />
                <label htmlFor="password" className="text-[18px] mt-1 block">
                  Password <span className="text-red-600 text-[25px]">*</span>
                </label>
                <OutlinedInput
                  type="password"
                  bgColor="white"
                  value={password}
                  onChange={setPassword}
                  placeholder="Password..."
                  isError={errors.password}
                  id="password"
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Kirish
                </button>
              </form>
            </div>
          </div>
          <div className="top_login_img absolute top-[-36%] left-[20.8%]"></div>
          <div className="center_login_img absolute bottom-[-20px] left-[32%]"></div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="login-bg w-full bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

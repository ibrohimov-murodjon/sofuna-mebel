import { useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch  } from "react-redux";
import { setToken } from "../store/userToken";
import Loader from "../components/Loader/index";

function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const minPasswordLength = 8;
  function handleValidation() {
    const newErrors = {};

    // Username validation
    if (!username.current.value) {
      newErrors.username = "Username is required.";
    } else {
      newErrors.username = "Please enter a valid username.";
    }

    // Password validation
    if (!password.current.value) {
      newErrors.password = "Password is required.";
    } else if (password.current.value.length < minPasswordLength) {
      newErrors.password = `Password must be at least ${minPasswordLength} characters long.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }

  function hendalSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (handleValidation()) {
      // Proceed with login if no errors
      let user = {
        username: username.current.value,
        password: password.current.value,
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
            localStorage.setItem(
              "accessToken",
              JSON.stringify(data.access_token)
            );
            navigate("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Login error:", error);
        })
        .finally(() => {
          setLoading(false); // Ensure loading state is reset even on errors
        });
    } else {
      setLoading(false); // Reset loading state if validation fails
    }
  }

  return (
    <div className="min-h-screen bg-login text-gray-900 flex justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl m-0 sm:m-10 backdrop-blur-md drop-shadow-2xl bg-white/30 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className="w-32 mx-auto"
              />
            </div>
            <div className="mt-12 flex flex-col items-center z-50">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Tizimga kirish
              </h1>
              <div className="w-full flex-1 mt-8">
                <form className="mx-auto max-w-xs" onSubmit={hendalSubmit}>
                  <label htmlFor="email" className="text-[18px]">
                    Username *
                  </label>
                  <input
                    className={`w-full px-6 py-4 rounded-lg mb-2 font-medium bg-gray-100 border placeholder-gray-500 text-[16px] focus:outline-none focus:border-gray-400 focus:bg-white ${
                      errors.username ? " border-red-400" : "border-gray-200"
                    }`}
                    type="text"
                    placeholder="Username"
                    name="text"
                    ref={username}
                  />
                  {errors.username && (
                    <Typography color="red" className="text-sm mb-3">
                      {errors.username}
                    </Typography>
                  )}
                  <label htmlFor="password" className="text-[18px]">
                    Password *
                  </label>
                  <input
                    className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-[16px] focus:outline-none focus:border-gray-400 focus:bg-white my-2 ${
                      errors.password ? " border-red-400" : "border-gray-200"
                    }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={password}
                  />
                  {errors.password && (
                    <Typography color="red" className="text-sm">
                      {errors.password}
                    </Typography>
                  )}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    Kirish
                  </button>
                  <p className="mt-12 text-[16px] text-gray-600 text-center">
                    Разработчик программы:
                    <a
                      href="#"
                      className="border-b ml-2 border-blue-400 text-blue-500 border-dotted"
                    >
                      NTSoft
                    </a>
                  </p>
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
      )}
    </div>
  );
}

export default Login;

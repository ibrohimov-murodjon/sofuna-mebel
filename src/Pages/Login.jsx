import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Validate, Clear } from "../Functions/Function";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  function hendalSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (Validate(username, password)) {
      let user = {
        username: username.current.value,
        password: password.current.value,
      };
      fetch("https://custom.uz/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON formatida ma'lumot yuborish
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("accessToken", JSON.stringify(data.access_token));
            navigate("/");
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Login error:", error);
        });
    }
    Clear(username, password);
  }

  return (
    <div className="LoginPageWrapper bg-login">
      {loading ? (
        <Loader />
      ) : (
        <Card className="w-96 shadow-xl backdrop-blur-[10px] border bg-[rgb(255, 255, 255 / 20%)]">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <input
              className="LoginRefInput"
              type="text"
              ref={username}
              placeholder="Username"
              size="lg"
              style={{
                background: "transparent",
                outlineColor: "white",
                border: " 2px solid white",
                fontWeight: "700",
                color: "white",
              }}
            />
            <input
              className="LoginRefInput"
              type="password"
              ref={password}
              placeholder="Password"
              size="lg"
              style={{
                background: "transparent",
                outlineColor: "white",
                border: " 2px solid white",
                fontWeight: "700",
                color: "white",
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              onClick={hendalSubmit}
              disabled={loading}
              variant="gradient"
              fullWidth
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default Login;

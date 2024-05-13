import { useContext, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Validate, Clear } from "../Functions/Function";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "../Auth/Auth";

function Login() {
  const auth = useContext(AuthLogin);
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
            auth.setIsUserAuthenticated(true);
            navigate("/");
            console.log(data);
            localStorage.setItem("roles", JSON.stringify(data.roles));
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
    Clear(username, password);
  }

  return (
    <div className="LoginPageWrapper bg-login">
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
          />
          <input
            className="LoginRefInput"
            type="password"
            ref={password}
            placeholder="Password"
            size="lg"
          />
          <div className="-ml-2.5">
            <Checkbox  label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={hendalSubmit} variant="gradient" fullWidth>
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;

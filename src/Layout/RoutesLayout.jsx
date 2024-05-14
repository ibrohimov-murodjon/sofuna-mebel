import { Card, CardBody, Dialog, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { SideBar } from "../components";
import { Header } from "../Section";
import { useForm } from "react-hook-form";

function RoutesLayout({ children }) {
  const [activePage, setActivePage] = useState("Home");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const {
    handleSubmit,
    register,
    resetField,
  } = useForm({
    defaultValues: {
      user_role: "worker",
    },
  });
  function addUser(userr) {
    let { username, password, user_role } = userr;
    let userData = {
      username: username,
      password: password,
      user_roles: user_role,
      // profile_pic: ''
    };
    fetch("https://custom.uz/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON formatida ma'lumot yuborish
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Stack Added");
      })
      .catch((error) => {
        console.error("Login er", error.message);
      });
    resetField("username", { keepDirty: true });
    resetField("password", { keepDirty: true });
    resetField("profile_pic", { keepDirty: true });
  }
  function setActivePageName(name) {
    localStorage.setItem('activePage', name)
  }
  function getActivePageName() {
    return localStorage.getItem('activePage')
  }
  return (
    <div className="thum w-full flex gap-x-2">
      <SideBar setActivePage={setActivePageName} activePage={getActivePageName} />
      <div className="col w-full max-w-[1250px] ">
        <Header setActivePage={setActivePageName} activePage={getActivePageName} />
        {children}
      </div>
      <div
        onClick={handleOpen}
        className="createBtn w-full max-w-16 text-[40px] cursor-pointer text-white h-16 rounded-full flex items-center justify-center absolute bottom-6 right-6 bg-[#0e95d8]"
      >
        +
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <form
              onSubmit={handleSubmit((data) => addUser(data))}
              className="flex flex-col gap-6 p-4"
            >
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-center"
              >
                Add User
              </Typography>
              <input
                className="RefInput"
                type="text"
                {...register("username", { required: "Username required" })}
                placeholder="Username"
              />
              <input
                className="RefInput"
                type="password"
                {...register("password", { required: "password required" })}
                placeholder="Password"
              />
              <select
                label="Select Version"
                {...register("user_role", { required: "Role is required" })}
              >
                <option value="worker">worker</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>

              <button className="AddUserBtn">Send</button>
            </form>
          </CardBody>
        </Card>
        <h1>HELLo</h1>
      </Dialog>
    </div>
  );
}

export default RoutesLayout;

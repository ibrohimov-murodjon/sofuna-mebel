import React, { useRef } from "react";
import { CiSquareChevLeft } from "react-icons/ci";
import { Drawer, Button, Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

import { Avatar } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { RegisterValidate } from "../Functions/Function";
import { useState } from "react";
//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

function Sidebar() {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { dirtyFields, isDirty },
  } = useForm({
    defaultValues: {
      user_role: "worker",
    },
  });
  const [sidebar, setSidebar] = useState(true);
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [image, setImage] = useState("");
  function addUser(userr) {
    console.log(image);
    let { username, password, user_role, profile_pic } = userr;
    if (RegisterValidate(username, password, user_role)) {
      let userData = {
        username: username,
        password: password,
        user_roles: user_role,
        // profile_pic: ''
      };
      console.log(userData);
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
    }
    resetField("username", { keepDirty: true });
    resetField("password", { keepDirty: true });
    resetField("profile_pic", { keepDirty: true });
  }
  return (
    <>
      {sidebar && (
        <div className="w-80 min-h-screen rounded shadow-2xl py-6 px-4">
          <div className="flex">
            <ToastContainer autoClose={1000} />
            <div className="flex items-center gap-2">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="sm"
              />
              <h2 className="profilTitle">Profile</h2>
            </div>
          </div>

          <div className="w-scren mt-2">
            <React.Fragment>
              <Button id="btnAdd" onClick={openDrawer}>
                Xodim qo'shish
              </Button>
              <Drawer
                className=" border-r-4 border-black"
                open={open}
                onClose={closeDrawer}
              >
                <div className="flex items-center justify-between px-4 pb-2">
                  <button
                    className="text-[35px] absolute right-0 top-[10%]"
                    onClick={closeDrawer}
                  >
                    <CiSquareChevLeft />
                  </button>
                </div>
                <div className="mb-5 px-4"></div>
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
              </Drawer>
            </React.Fragment>
          </div>

          <div className="MainMeniu">
            <NavLink to="/">
              <img
                src="/homeF.png"
                alt="home"
                style={{ marginRight: "5px", width: "20px" }}
              />
              Home
            </NavLink>
            <NavLink to="/product">
              <img src="/prductIcon.png" alt="home" />
              Products
            </NavLink>
            <NavLink to="/order">
              <img src="/order.png" alt="home" />
              Order
            </NavLink>
            <NavLink to="/message">
              <img src="/message.png" alt="home" />
              Message
            </NavLink>
            <NavLink to="/Xodimlar">
              <img src="/calendar.png" alt="home" />
              Xodimlar
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;

import { Card, CardBody, Dialog, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { SideBar } from "../components";
import { Header } from "../Section";
import { useForm } from "react-hook-form";
import adduserIcon from "../../src/assets/user-plus-solid.svg";
import OutlineAdUserModal from "../components/OutlineAdUserModal/OutlineAdUserModal";
import { useSelector } from "react-redux";
function RoutesLayout({ children }) {
  const [activePage, setActivePage] = useState("Home");
  const [open, setOpen] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(true)
  const handleOpen = () => setOpen((cur) => !cur);
  const role = useSelector((state) => state.userToken.role);
  const { handleSubmit, register, resetField } = useForm({
    defaultValues: {
      user_role: "worker",
    },
  });
  localStorage.getItem("activePage") == null
    ? localStorage.setItem("activePage", "Home")
    : "";
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
    localStorage.setItem("activePage", name);
  }
  function getActivePageName() {
    return localStorage.getItem("activePage");
  }
  return (
    <div className="thum w-full flex gap-x-2">
      <SideBar
        sidebarSize={sidebarSize}
        setSidebarSize={setSidebarSize}
        setActivePage={setActivePageName}
        activePage={getActivePageName}
      />
      <div className="col w-full ">
        <Header
          setActivePage={setActivePageName}
          activePage={getActivePageName}
        />
        {children}
      </div>
      {role == 'admin' ? <div
        onClick={handleOpen}
        className="createBtn w-full max-w-16 text-[40px] cursor-pointer text-white h-16 rounded-full flex items-center justify-center absolute bottom-6 right-6 bg-[#0e95d8]"
      >
        <img width="25px" height="25px" src={adduserIcon} alt="" />
      </div> : null}
      <Dialog
        size="md"
        open={open}
        className="bg-transparent shadow-none"
      >
      <OutlineAdUserModal handleClose={handleOpen}/>
      </Dialog>
    </div>
  );
}

export default RoutesLayout;

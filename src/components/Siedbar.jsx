import React from "react";
import { NavLink } from "react-router-dom";
import { RegisterValidate } from "../Functions/Function";
import { useState } from "react";
//Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeBlack, EmployeeWhite, HomeBlack, HomeWhite, Logo, MessageBlack, MessageWhite, OrderBlack, OrderWhite, WarehouseBlack, WarehouseWhite } from "../assets";

const MenuItems = [
  { id: 1, name: "Home", unActive: HomeBlack, active: HomeWhite, link: "/" },
  {
    id: 2,
    name: "Warehouse",
    unActive: WarehouseBlack,
    active: WarehouseWhite,
    link: "/product",
  },
  {
    id: 3,
    name: "Order",
    unActive: OrderBlack,
    active: OrderWhite,
    link: "/order",
  },
  {
    id: 4,
    name: "Message",
    unActive: MessageBlack,
    active: MessageWhite,
    link: "/message",
  },
  {
    id: 5,
    name: "Employee",
    unActive: EmployeeBlack,
    active: EmployeeWhite,
    link: "/xodimlar",
  },
];
function Sidebar({setActivePage, activePage}) {
  const [activeEl, setActiveEl] = useState('/');
  const [sidebar, setSidebar] = useState(true);
  function addUser(userr) {
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
        <div className="w-80 bg-white min-h-screen flex flex-col items-center rounded py-6 px-4">
          <div className="mb-7 ">
            <img src={Logo} alt="logo" className="h-24 w-24 rounded-full" />
          </div>
          <nav className="MainMeniu">
            {MenuItems.map((item) => {
              return (
                <NavLink
                  onClick={() => {setActiveEl(item.link)
                  setActivePage(item.name)
                  }}
                  className={`${activePage() == item.name ? "MenuActive" : ""}`}
                  key={item.id}
                  to={item.link}
                >
                  <img
                    src={activePage() == item.name ? item.active : item.unActive}
                    className="w-7"
                    alt="home"
                  />
                  <p className={`${activePage() == item.name ? 'text-white text-[18px]' : 'text-black text-[18px]'}`}>{item.name}</p>
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  CostImg,
  EmployeeBlack,
  EmployeeWhite,
  HomeBlack,
  HomeWhite,
  Logo,
  MessageBlack,
  MessageWhite,
  OrderBlack,
  OrderWhite,
  WarehouseBlack,
  WarehouseWhite,
} from "../assets";
import { useSelector } from "react-redux";

const AdminMenuItems = [
  {
    id: 1,
    name: "Asosiy",
    unActive: HomeBlack,
    active: HomeWhite,
    link: "/",
  },
  {
    id: 2,
    name: "Ombor",
    unActive: WarehouseBlack,
    active: WarehouseWhite,
    link: "/product",
  },
  {
    id: 3,
    name: "Buyurtmalar",
    unActive: OrderBlack,
    active: OrderWhite,
    link: "/order",
  },
  // {
  //   id: 4,
  //   name: "Message",
  //   unActive: MessageBlack,
  //   active: MessageWhite,
  //   link: "/message",
  // },
  {
    id: 5,
    name: "Xodimlar",
    unActive: EmployeeBlack,
    active: EmployeeWhite,
    link: "/xodimlar",
  },
  {
    id: 6,
    name: "Xarajatlar",
    unActive: CostImg,
    active: CostImg,
    link: "/xarajatlar",
  },
  {
    id: 6,
    name: "Qo'shish",
    unActive: CostImg,
    active: CostImg,
    link: "/maxsulotQoshish",
  },
];
const WorkerMenuItems = [
  {
    id: 1,
    name: "Buyurtmalarim",
    unActive: HomeBlack,
    active: HomeWhite,
    link: "/",
  },
  {
    id: 2,
    name: "Qoshimcha ish",
    unActive: WarehouseBlack,
    active: WarehouseWhite,
    link: "/allOrders",
  },
  {
    id: 3,
    name: "Bajarilgan",
    unActive: OrderBlack,
    active: OrderWhite,
    link: "/successfulyWorks",
  },
  {
    id: 4,
    name: "Olingan Tovarlar",
    unActive: MessageBlack,
    active: MessageWhite,
    link: "/get-products",
  },
  {
    id: 5,
    name: "Mahsulotlar",
    unActive: EmployeeBlack,
    active: EmployeeWhite,
    link: "/product",
  },
];
function Sidebar({ setActivePage, activePage }) {
  const role = useSelector((state) => state.userToken.role);
  const [activeEl, setActiveEl] = useState("/");
  const navigate = useNavigate();
  return (
    <>
      <aside className="w-80  bg-white min-h-screen flex flex-col items-center rounded py-6 px-4">
        <div
          className="mb-7 cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="logo" className="h-24 w-24 rounded-full" />
        </div>
        <nav className="MainMeniu">
          {role == "admin"
            ? AdminMenuItems.map((item) => {
                return (
                  <NavLink
                    onClick={() => {
                      setActiveEl(item.link);
                      setActivePage(item.name);
                    }}
                    className={`${
                      activePage() == item.name ? "MenuActive" : ""
                    }`}
                    key={item.id}
                    to={item.link}
                  >
                    <img
                      src={
                        activePage() == item.name ? item.active : item.unActive
                      }
                      className="w-7"
                      alt="home"
                    />
                    <p
                      className={`${
                        activePage() == item.name
                          ? "text-white text-[18px]"
                          : "text-black text-[18px]"
                      }`}
                    >
                      {item.name}
                    </p>
                  </NavLink>
                );
              })
            : role == "worker"
            ? WorkerMenuItems.map((item) => {
                return (
                  <NavLink
                    onClick={() => {
                      setActiveEl(item.link);
                      setActivePage(item.name);
                    }}
                    className={`${
                      activePage() == item.name ? "MenuActive" : ""
                    }`}
                    key={item.id}
                    to={item.link}
                  >
                    <img
                      src={
                        activePage() == item.name ? item.active : item.unActive
                      }
                      className="w-7"
                      alt="home"
                    />
                    <p
                      className={`${
                        activePage() == item.name
                          ? "text-white text-[18px]"
                          : "text-black text-[18px]"
                      }`}
                    >
                      {item.name}
                    </p>
                  </NavLink>
                );
              })
            : null}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

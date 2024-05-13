import React from "react";
import { SideBar } from "../components";
import { Header } from "../Section";

function RoutesLayout({ children }) {
  return (
    <div className="thum w-full flex gap-12">
      <SideBar />
      <div className="col w-full mr-5">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default RoutesLayout;

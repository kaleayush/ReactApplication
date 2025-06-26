import React, { useState } from "react";
import { Logo, Logoutbtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "../index";
import DropdownUser from "./DropdownUser";

// import { useIsAuthenticated } from "@azure/msal-react";
function Header() {
  const { message, userData } = useSelector((state) => state?.auth);
  
  const navItems = [];
  return (
    <header className=" shadow bg-gray-100">
      {/* <Container> */}
      <nav className="flex flex-grow items-center justify-between px-4  shadow-2 md:px-6 2xl:px-11">
        <div className="mr-4 px-3">
          <Link to="/dashboard">
            <Logo width="100px" />
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
        <ul className="flex items-center gap-2 2xsm:gap-4">
          <li>
            <div className="relative  mt-2 w-10 h-10 overflow-hidden  rounded-full dark:bg-gray-600">

            </div>
          </li>
          <li>
            {/* <Logoutbtn /> */}
          </li>
        </ul>
        {/* <-- User Area--> */}
        <DropdownUser/>
        </div>
        {/* <-- User Area--> */}
      </nav>
    </header>
  );
}

export default Header;

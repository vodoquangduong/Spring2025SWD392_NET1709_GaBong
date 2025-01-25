import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import useAuthStore from "../stores/authStore";
import { Button } from "antd";

const HeaderLinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={href}
        className="group block py-2 pr-4 pl-3 text-emerald-500 hover:text-emerald-500 dark:text-emerald-400 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
        aria-current="page"
      >
        {children}
        <div
          className={`mt-1 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300 ${
            (location.pathname === href && href == "/") ||
            (location.pathname.startsWith(href) && href != "/")
              ? "w-full"
              : "w-0"
          }`}
        ></div>
      </Link>
    </li>
  );
};

export default function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="py-3 shadow-md dark:bg-zinc-900 bg-white fixed top-0 left-0 w-full z-30">
      <div className="flex flex-wrap items-center justify-between grow mx-72">
        <div className="flex flex-wrap justify-between items-center w-full h-12 container">
          <Logo />
          <div className="flex items-center lg:order-2 gap-4">
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to={"/login"} className="font-bold hover:text-blue-500">
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="font-bold hover:text-blue-500 mx-4"
                >
                  Register
                </Link>
                <Button
                  type="primary"
                  onClick={() => (window.location.href = "/register")}
                  className="font-bold py-4"
                >
                  Post a project
                </Button>
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <HeaderLinkItem href={"/projects"}>Projects</HeaderLinkItem>
              <HeaderLinkItem href={"/services"}>Services</HeaderLinkItem>
              <HeaderLinkItem href={"/news"}>News</HeaderLinkItem>
              <HeaderLinkItem href={"/about"}>About</HeaderLinkItem>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

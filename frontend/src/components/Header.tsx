import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import React from "react";

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
  return (
    <nav className="py-3 shadow-md dark:bg-zinc-900 fixed top-0 left-0 w-full">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex flex-wrap justify-between items-center w-full">
          <Logo />
          <div className="flex items-center lg:order-2 gap-4">
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
              <HeaderLinkItem href={"/"}>Home</HeaderLinkItem>
              <HeaderLinkItem href={"/jobs"}>Jobs</HeaderLinkItem>
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

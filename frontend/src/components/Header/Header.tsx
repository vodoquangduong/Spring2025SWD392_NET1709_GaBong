import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import React, { useState } from "react";
import ProfileDropdown from "../ProfileDropdown";
import useAuthStore from "../../stores/authStore";
import { Badge, Button } from "antd";
import { FaChevronDown } from "react-icons/fa";
import CreateModal from "../CreateModal";
import CreateProjectForm from "./forms/CreateProjectForm";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import { Role } from "@/types";
import { MdOutlineEmail } from "react-icons/md";
import useUiStore from "@/stores/uiStore";
import useChatStore from "../ChatPopup/stores/chatStore";
import { NotificationType } from "@/types/notification";

const HeaderLinkItem = ({
  href,
  children,
  subMenu,
}: {
  href: string;
  children: React.ReactNode;
  subMenu?: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="relative">
      <Link
        to={href}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        // onClick={() => navigate(href)}
        className="group block py-2 pr-4 pl-3 text-emerald-500 hover:text-emerald-500 dark:text-emerald-400 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
        aria-current="page"
      >
        <div className="flex gap-3 items-center">
          {children}
          {subMenu && (
            <FaChevronDown
              className={`transition-all ${isOpen && "rotate-180"}`}
            />
          )}
        </div>
        <div
          className={`mt-1 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300 ${
            (location.pathname === href && href == "/") ||
            (location.pathname.startsWith(href) && href != "/")
              ? "w-full"
              : "w-0"
          }`}
        ></div>
        {subMenu && isOpen && <MegaMenu subMenu={children as string} />}
      </Link>
    </li>
  );
};

export default function Header() {
  const { isAuthenticated, role } = useAuthStore();
  const { readNotification, hasNewChatNotification } = useChatStore();
  const { toogleChatPopup } = useUiStore();
  const navigate = useNavigate();

  return (
    <nav className="py-3 shadow-md bg-black fixed top-0 left-0 w-full z-30">
      <div className="flex flex-wrap items-center justify-between grow mx-container">
        <div className="flex flex-wrap justify-between items-center w-full h-12 gap-4">
          <Logo />
          <div
            className="ml-8 hidden justify-between items-center h-full w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {role != Role.FREELANCER && (
                <HeaderLinkItem href={"/search/freelancers"}>
                  Hire freelancers
                </HeaderLinkItem>
              )}
              {/* {role != Role.CLIENT && ( */}
              <HeaderLinkItem
                href={"/search/projects"}
                // subMenu={true}
              >
                Find works
              </HeaderLinkItem>
              {/* )} */}

              {/* <HeaderLinkItem href={"/news"}>News</HeaderLinkItem> */}
              {/* <HeaderLinkItem href={"/about"}>About</HeaderLinkItem> */}
              {isAuthenticated && (
                <HeaderLinkItem href={"/manage"}>Manage</HeaderLinkItem>
              )}
            </ul>
          </div>
          <div className="grow order-2"></div>
          <div className="flex items-center lg:order-3 gap-6">
            {isAuthenticated ? (
              <>
                <Badge dot={hasNewChatNotification}>
                  <MdOutlineEmail
                    className="text-2xl text-zinc-200 cursor-pointer"
                    onClick={() => {
                      readNotification(NotificationType.NEW_MESSAGE);
                      toogleChatPopup();
                    }}
                  />
                </Badge>
                <NotificationDropdown />
                {role == Role.CLIENT && (
                  <Button
                    type="primary"
                    className="font-semibold"
                    onClick={() => navigate("/post-project")}
                  >
                    Post a project
                  </Button>
                )}
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="font-semibold hover:text-emerald-500 text-white"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="font-semibold hover:text-emerald-500 text-white mx-4"
                >
                  Register
                </Link>
                {role == Role.CLIENT && (
                  <Button
                    type="primary"
                    onClick={() => navigate("/login")}
                    className="font-bold py-4"
                  >
                    Post a project
                  </Button>
                )}
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
        </div>
      </div>
    </nav>
  );
}

const MegaMenu = ({ subMenu }: { subMenu: string }) => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="mt-14 bg-transparent"></div>
      <div className="w-[900px] border-gray-500 shadow-xs bg-gray-50 md:bg-white border dark:bg-gray-800 dark:border-gray-600 rounded-xl -translate-x-36">
        <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6 gap-4">
          <MegaMenuItem subMenu={subMenu} />
          <MegaMenuItem subMenu={subMenu} />
          <MegaMenuItem subMenu={subMenu} />
          <MegaMenuItem subMenu={subMenu} />
        </div>
      </div>
    </div>
  );
};

const MegaMenuItem = ({ subMenu }: { subMenu: string }) => {
  const location = useLocation();
  return (
    <li>
      <a
        href="#"
        className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="font-semibold">{subMenu}</div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {subMenu} Connect with third-party tools that you're already using.
        </span>
      </a>
    </li>
  );
};

import { Role } from "@/types";
import { Dropdown } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { BiLogOut, BiMoneyWithdraw, BiSolidCategory } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoPieChart } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../modules/cookie";
import { defaultAvatar } from "../modules/default";
import useAuthStore from "../stores/authStore";
import useChatStore from "./ChatPopup/stores/chatStore";
import { RiHistoryFill } from "react-icons/ri";

const ProfileDropdown = () => {
  const { logout, email, name, avatar, role } = useAuthStore();
  const { setCurrentRoom } = useChatStore();
  const navigate = useNavigate();
  const items: ItemType[] = [
    {
      key: "0",
      label: (
        <Link
          to={
            role == Role.ADMIN
              ? "/admin/accounts"
              : role == Role.STAFF
              ? "/employee/freelancers"
              : "/profile"
          }
          className="flex font-semibold gap-2 items-center"
        >
          <BiSolidCategory />
          Dashboard
        </Link>
      ),
    },
    {
      key: "-1",
      label: (
        <Link
          to="/manage/projects"
          className="flex font-semibold gap-2 items-center"
        >
          <IoPieChart />
          Projects
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link to={`/profile`} className="flex font-semibold gap-2 items-center">
          <FaUserCircle />
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={`/payment`} className="flex font-semibold gap-2 items-center">
          <MdOutlinePayment />
          Add funds
        </Link>
      ),
    },
    {
      key: "withdraw",
      label: (
        <Link
          to={`/withdraw`}
          className="flex font-semibold gap-2 items-center"
        >
          <BiMoneyWithdraw />
          Withdraw
        </Link>
      ),
    },
    {
      key: "transaction",
      label: (
        <Link
          to={"/manage/transaction-history"}
          className="flex font-semibold gap-2 items-center"
        >
          <RiHistoryFill />
          Transaction History
        </Link>
      ),
    },
    {
      key: "4",
      onClick: () => {
        setCookie("accessToken", "", 0);
        setCurrentRoom(null);
        logout();
        navigate("/");
      },
      label: (
        <div className="flex font-semibold gap-2 items-center">
          <BiLogOut />
          Logout
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      className="flex font-bold items-center h-8 gap-3 group hover:scale-105 transition-all duration-200"
      menu={{ items }}
    >
      <span
        className="text-emerald-700 flex items-center cursor-pointer inter"
        onClick={() => navigate(`/profile`)}
      >
        <div
          style={{ backgroundImage: `url(${avatar || defaultAvatar})` }}
          className="h-10 aspect-square bg-cover bg-center rounded-full bg-white border border-emerald-500"
        />
        <div className="text-xs text-emerald-500">
          <div className="">{name}</div>
          <div className="">{email}</div>
        </div>
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;

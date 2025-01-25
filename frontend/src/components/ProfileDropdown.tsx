import { BiLogOut } from "react-icons/bi";
import { IoPieChart } from "react-icons/io5";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { defaultAvatar } from "../libs/default";
import { setCookie } from "../libs/cookie";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "0",
      label: (
        <Link to="/worker" className="flex font-semibold gap-2 items-center">
          <IoPieChart />
          Dashboard
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
        <Link
          to={`/profile/change-password`}
          className="flex font-semibold gap-2 items-center"
        >
          <FaLock />
          Change password
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link
          to="/profile/favorite"
          className="flex font-semibold gap-2 items-center"
        >
          <FaHeart />
          Favorite
        </Link>
      ),
    },
    {
      key: "4",
      onClick: () => {
        setCookie("accessToken", "", 0);
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
      menu={{
        items,
      }}
    >
      <span
        className="text-emerald-700 flex items-center cursor-pointer"
        onClick={() => navigate(`/profile`)}
      >
        <div
          style={{
            backgroundImage: `url(${defaultAvatar})`,
          }}
          className="h-10 aspect-square bg-cover bg-center rounded-full bg-white border border-emerald-500"
        />
        <div className="text-xs text-emerald-500">
          <div className="">Staff Name</div>
          <div className="">staff@gmail.com</div>
        </div>
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;

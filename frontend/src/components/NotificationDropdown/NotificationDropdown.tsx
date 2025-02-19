import { Badge, Dropdown, MenuProps, Space } from "antd";
import { FaRegBell } from "react-icons/fa";
import { getRandomInt } from "../../modules/random";
import { Link } from "react-router-dom";

const NotificationItem = () => {
  return (
    <div className="w-96 flex items-start gap-4 p-1">
      <img
        className="h-16 aspect-square mt-1 border"
        src={"https://robohash.org/mohamed"}
      />
      <div className="text-base">
        <div>
          <span className="font-bold">Muhamed</span> has completed the project.
          Please provide your feedback to Muhamed about the project.
        </div>
        <div className="mt-1 text-zinc-500">
          {getRandomInt(10, 60)} minutes ago
        </div>
      </div>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    label: <NotificationItem />,
    key: "0",
  },
  {
    label: <NotificationItem />,
    key: "1",
  },
  {
    label: <NotificationItem />,
    key: "2",
  },
  {
    label: (
      <Link to={"/manage/notifications"} className="flex justify-center">
        View all
      </Link>
    ),
    key: "-1",
  },
];

export default function NotificationDropdown() {
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottom"
      className="mr-2"
    >
      <Space>
        <Badge size="default">
          <FaRegBell size={20} className="text-white cursor-pointer" />
        </Badge>
      </Space>
    </Dropdown>
  );
}

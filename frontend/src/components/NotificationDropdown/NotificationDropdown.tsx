import { Badge, Dropdown, MenuProps, Space } from "antd";
import { FaRegBell } from "react-icons/fa";
import { getRandomInt } from "../../modules/random";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import useChatStore from "../ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";
import { formatTimeAgo } from "@/modules/formatTimeAgo";

const NotificationItem = ({ notification }: any) => {
  console.log(notification);
  return (
    <Link
      to={"/manage/notifications"}
      className="w-80 flex items-start gap-4 p-1"
      // onClick={() => {
      //   notification.status = NotificationStatus.READ;
      // }}
    >
      <div className="text-sm">
        <div
          className={
            notification.status == NotificationStatus.UNREAD
              ? "font-semibold"
              : ""
          }
        >
          {notification?.content}
        </div>
        <div className="mt-1 text-zinc-500">
          {formatTimeAgo(notification?.time)}
        </div>
      </div>
    </Link>
  );
};

export default function NotificationDropdown() {
  const { hasNewGlobalNotification, readNotification } = useChatStore();
  const [notifications] = useQueries({
    queries: [
      {
        queryKey: ["notifications", hasNewGlobalNotification],
        queryFn: async () =>
          await GET(`/api/Notification?pageNumber=${1}&pageSize=${5}`),
      },
    ],
  });

  console.log(notifications?.data?.items);
  const items = [
    ...(notifications?.data?.items?.map((notification: any, index: number) => ({
      label: <NotificationItem notification={notification} key={index} />,
      key: notification?.notificationId + "noti",
    })) || []),
    {
      label: (
        <Link to={"/manage/notifications"} className="flex justify-center">
          View all
        </Link>
      ),
      key: "view-all-noti",
    },
  ];
  console.log(items);

  return (
    <Dropdown
      onOpenChange={(open) => {
        readNotification(NotificationType.GENERAL_ANNOUNCEMENT);
      }}
      menu={{
        items,
      }}
      trigger={["click"]}
      placement="bottom"
      className="flex justify-between items-center mr-2"
    >
      {/* <Space> */}
      <Badge size="default" dot={hasNewGlobalNotification}>
        <FaRegBell size={20} className="text-white cursor-pointer" />
      </Badge>
      {/* </Space> */}
    </Dropdown>
  );
}

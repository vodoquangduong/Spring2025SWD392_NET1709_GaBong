import { Badge, Dropdown, Empty, MenuProps, Space } from "antd";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import useChatStore from "../ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import { ItemType } from "antd/es/menu/interface";

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

  const items: ItemType[] = [
    ...(notifications?.data?.items?.map((notification: any, index: number) => ({
      label: <NotificationItem notification={notification} key={index} />,
      key: notification?.notificationId + "noti",
    })) || []),
    notifications?.data?.items?.length == 0
      ? {
          disabled: true,
          label: (
            <Empty
              className="w-[300px] h-[400px] flex flex-col justify-center items-center"
              description="No notification"
            ></Empty>
          ),
          key: "empty",
        }
      : {
          label: (
            <Link to={"/manage/notifications"} className="flex justify-center">
              View all
            </Link>
          ),
          key: "view-all-noti",
        },
  ];

  return (
    <Dropdown
      onOpenChange={() =>
        readNotification(NotificationType.GENERAL_ANNOUNCEMENT)
      }
      menu={{
        items,
      }}
      trigger={["click"]}
      placement="bottom"
      className="flex justify-between items-center mr-2"
    >
      <Badge size="default" dot={hasNewGlobalNotification}>
        <FaRegBell size={20} className="text-white cursor-pointer" />
      </Badge>
    </Dropdown>
  );
}

const NotificationItem = ({ notification }: any) => {
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

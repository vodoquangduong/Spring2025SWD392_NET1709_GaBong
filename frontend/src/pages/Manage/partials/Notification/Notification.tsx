import SearchBox from "@/components/SearchBox";
import { GET } from "@/modules/request";
import { useQueries } from "@tanstack/react-query";
import { Table } from "antd";
import { tableColumns } from "./schemas";
import useAuthStore from "@/stores/authStore";

export default function Notification() {
  const { accountId } = useAuthStore();
  const [notification] = useQueries({
    queries: [
      {
        queryKey: ["notifications"],
        queryFn: async () => await GET(`/api/Notification?pageNumber=1`),
      },
    ],
  });
  console.log("🚀 ~ Notification ~ notification:", notification?.data?.items);

  return (
    <div>
      <div className="text-3xl font-bold mt-8 chivo">Notifications</div>
      <div className="flex items-center gap-4 mt-4">
        {/* <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        /> */}
      </div>
      <Table
        loading={notification.isLoading}
        className="mt-4"
        dataSource={notification?.data?.items?.filter(
          (item: any) => item.accountId == accountId
        )}
        columns={tableColumns()}
        // columns
      />
    </div>
  );
}

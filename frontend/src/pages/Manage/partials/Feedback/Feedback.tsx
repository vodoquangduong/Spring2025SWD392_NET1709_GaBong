import SearchBox from "@/components/SearchBox";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { useQueries } from "@tanstack/react-query";
import { Table } from "antd";
import { proposalColumns } from "./shemas";
import { FeedbackType } from "@/types/feedback";

export default function Feedback() {
  const { accountId } = useAuthStore();
  const [feedbacks] = useQueries({
    queries: [
      {
        queryKey: ["feedbacks"],
        queryFn: async (): Promise<FeedbackType[]> =>
          await GET(`/api/Feedback/freelancer/${accountId}`),
      },
    ],
  });

  return (
    <div>
      <div className="text-3xl font-bold mt-8 chivo">Feedbacks</div>

      <div className="flex items-center gap-4 mt-4">
        <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        />
      </div>
      <Table
        loading={feedbacks.isLoading}
        className="mt-4"
        dataSource={feedbacks?.data || []}
        columns={proposalColumns()}
        rowKey={(record: any) => record?.projectId + "ProjectId"}
      />
    </div>
  );
}

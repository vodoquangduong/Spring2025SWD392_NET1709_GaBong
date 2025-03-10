import SearchBox from "@/components/SearchBox";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { Bid } from "@/types/bid";
import { PaginatedResult } from "@/types/serverResponse";
import { useQueries } from "@tanstack/react-query";
import { Table } from "antd";
import { proposalColumns } from "./shemas";

export default function Proposal() {
  const { accountId } = useAuthStore();
  const [bids] = useQueries({
    queries: [
      {
        queryKey: ["bids"],
        queryFn: async (): Promise<PaginatedResult<Bid>> =>
          await GET(`/api/Bid/freelancer/${accountId}`),
      },
    ],
  });

  return (
    <div>
      <div className="text-3xl font-bold mt-8 chivo">My Proposals</div>

      <div className="flex items-center gap-4 mt-4">
        <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        />
      </div>
      <Table
        loading={bids.isLoading}
        className="mt-4"
        dataSource={bids?.data?.items || []}
        columns={proposalColumns()}
        rowKey={(record: any) => record?.projectId + "ProjectId"}
      />
    </div>
  );
}

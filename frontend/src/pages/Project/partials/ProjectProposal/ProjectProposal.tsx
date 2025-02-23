import { Pagination } from "antd";
import ProposalItem, { ProposalItemSkeleton } from "./partials/ProposalItem";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { useParams } from "react-router-dom";
import { Bid } from "@/types/bid";

export default function ProjectProposal() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["bids"],
    queryFn: async () => await GET(`/api/Bid/project/${id}`, false),
  });
  return (
    <>
      <div className="grid grid-cols-1 mb-8 shadow-md rounded-md dark:bg-white/5">
        {data?.map((item: Bid) => (
          <ProposalItem key={item.bidId} item={item} />
        ))}
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ProposalItemSkeleton key={index} />
          ))}
      </div>
      <div className="flex justify-end">
        <Pagination total={30} />
      </div>
    </>
  );
}

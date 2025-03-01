import { Empty, Pagination } from "antd";
import ProposalItem, { ProposalItemSkeleton } from "./partials/ProposalItem";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { useParams } from "react-router-dom";
import { Bid } from "@/types/bid";
import { useEffect } from "react";

export default function ProjectProposal() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["bids"],
    queryFn: async () => await GET(`/api/Project/${id}`, false),
  });
  const [projectDetail, bids] = useQueries({
    queries: [
      {
        queryKey: ["projectDetail", id],
        queryFn: async () => await GET(`/api/Project/${id}`, false),
      },
      {
        queryKey: ["bids", id],
        queryFn: async () => await GET(`/api/Bid/project/${id}`, false),
      },
    ],
  });

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* {!bids?.data?.code && */}
      {bids?.data?.map((item: Bid) => (
        <ProposalItem
          key={item.bidId}
          item={item}
          clientId={projectDetail?.data?.value?.clientId}
        />
      ))}
      <div className="grid grid-cols-1 mb-8 shadow-md rounded-md dark:bg-white/5">
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ProposalItemSkeleton key={index} />
          ))}
      </div>
      {!isLoading && data?.value?.bids?.length == 0 && (
        <Empty className="mt-10" description={"This project has no bids"} />
      )}
    </>
  );
}

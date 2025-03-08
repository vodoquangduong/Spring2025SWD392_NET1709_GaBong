import { Empty, Pagination } from "antd";
import ProposalItem, { ProposalItemSkeleton } from "./partials/ProposalItem";
import { useQueries } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { useOutletContext, useParams } from "react-router-dom";
import { Bid } from "@/types/bid";
import { useEffect } from "react";
import { ProjectDetail } from "@/types/project";
import { PaginatedResult } from "@/types/serverResponse";

export default function ProjectProposal() {
  const { id } = useParams();
  const [bids] = useQueries({
    queries: [
      {
        queryKey: ["bids", id],
        queryFn: async (): Promise<PaginatedResult<Bid>> =>
          await GET(`/api/Bid/project/${id}`),
        staleTime: 0,
      },
    ],
  });

  const context = useOutletContext<{
    project: ProjectDetail;
    isLoading: boolean;
  }>();
  console.log("🚀 ~ ProjectProposal ~ context:", context);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {bids?.data?.items?.map((item: Bid) => (
        <ProposalItem
          key={item.bidId}
          item={item}
          clientId={context?.project?.clientId + ""}
        />
      ))}
      <div className="grid grid-cols-1 mb-8 shadow-md rounded-md dark:bg-white/5">
        {context?.isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ProposalItemSkeleton key={index} />
          ))}
      </div>
      {!bids.isLoading && bids?.data?.items?.length == 0 && (
        <Empty className="mt-10" description={"This project has no bids"} />
      )}
    </>
  );
}

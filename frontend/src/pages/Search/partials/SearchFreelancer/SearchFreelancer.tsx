import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import FreelancerFilter from "./partials/FreelancerFilter";
import FreelancerListing from "./partials/FreelancerListing";
import { portfolioService } from "./services/freelancersService";
import SearchBox from "@/components/SearchBox";
import { useState } from "react";

export default function SearchFreelancer() {
  const [query, setQuery] = useState<any>({});
  const { data, isLoading } = useQuery({
    queryKey: ["verified-portfolios"],
    queryFn: async () => {
      try {
        const response = await portfolioService.getVerifiedPortfolios();
        return response?.value;
      } catch (error: any) {
        message.error(error.message || "Failed to fetch verified portfolios");
        throw error;
      }
    },
  });

  return (
    // =================================
    <div>
      <div
        className="relative w-full text-secondary dark:text-primary pb-6 h-[240px] flex items-center"
        // style={{
        //   backgroundImage: "url(/bg.jpg)",
        // }}
      >
        <div className="absolute bg-black top-0 left-0 w-full pb-6 h-full flex items-center z-10"></div>
        <div className="mx-container space-y-4 z-10">
          <div className="text-3xl font-bold">Browse</div>
          <div className="">
            <SearchBox
              placeholder="Search Freelancers ..."
              widthClass="w-full py-2"
              className="!bg-gray-100 py-2 dark:!bg-zinc-800"
              value={query?.keyword}
              onChange={(e) => {
                setQuery((prev: any) => ({ ...prev, keyword: e.target.value }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="mx-container my-6 gap-6 grid grid-cols-12 pb-4">
        <div className="col-span-3">
          <div className="sticky top-[80px]">
            <FreelancerFilter />
          </div>
        </div>
        <div className="col-span-9 rounded-md dark:bg-zinc-900 shadow-lg">
          <FreelancerListing
            portfolios={data?.items || []}
            totalCount={data?.totalCount || 0}
            pageNumber={data?.pageNumber || 1}
            pageSize={data?.pageSize || 10}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

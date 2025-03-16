import SearchBox from "@/components/SearchBox";
import useAuthStore from "@/stores/authStore";
import { Role } from "@/types";
import { message } from "antd";
import { useEffect, useState } from "react";
import { VerifiedPortfolio } from "./models/searchFreelancerModel";
import FreelancerFilter from "./partials/FreelancerFilter";
import FreelancerListing from "./partials/FreelancerListing";
import { portfolioService } from "./services/freelancersService";

const SearchFreelancer = () => {
  const [portfolios, setPortfolios] = useState<VerifiedPortfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [query, setQuery] = useState<any>({});
  const { role } = useAuthStore();

  const fetchFreelancers = async (page: number = 1, pageSize: number = 10) => {
    try {
      setLoading(true);
      const response = await portfolioService.getVerifiedPortfolios(
        page,
        pageSize
      );

      if (response && response.value) {
        setPortfolios(response.value.items);
        setPagination({
          current: response.value.currentPage || 1,
          pageSize: response.value.pageSize || 10,
          total: response.value.totalCount || 0,
        });
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load freelancers");
      console.error("Error fetching freelancers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers(pagination.current, pagination.pageSize);
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchFreelancers(page, pageSize);
  };

  if (role == Role.FREELANCER) {
    location.href = "/";
  }

  return (
    <div>
      <div className="relative w-full text-secondary dark:text-primary pb-6 h-[240px] flex items-center">
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
            portfolios={portfolios}
            totalCount={pagination.total}
            pageNumber={pagination.current}
            pageSize={pagination.pageSize}
            isLoading={loading}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFreelancer;

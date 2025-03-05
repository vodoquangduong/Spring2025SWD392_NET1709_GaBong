import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import FreelancerFilter from "./partials/FreelancerFilter";
import FreelancerListing from "./partials/FreelancerListing";
import { portfolioService } from "./services/freelancersService";

export default function SearchFreelancer() {
  const { data, isLoading } = useQuery({
    queryKey: ["verified-portfolios"],
    queryFn: async () => {
      try {
        const response = await portfolioService.getVerifiedPortfolios();
        return response?.value;
      } catch (error: any) {
        if (error?.message) {
          if (error.message.includes("System.InvalidOperationException")) {
            message.error("Remote database return 500 again 😥");
          } else {
            const errorMessage = error.message.replace("Error: ", "");
            message.error(errorMessage);
          }
        } else {
          message.error(
            "Failed to fetch verified portfolios. Please try again."
          );
        }
        throw error;
      }
    },
  });

  return (
    <div className="mx-container my-6 gap-6 grid grid-cols-12">
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
  );
}

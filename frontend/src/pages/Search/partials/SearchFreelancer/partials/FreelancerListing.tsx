import { Avatar, Button, Pagination, Space, Spin } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { FaChartLine, FaEye, FaGlobe, FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { VerifiedPortfolio } from "../services/freelancersService";

interface FreelancerListingProps {
  portfolios: VerifiedPortfolio[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
}

const FreelancerItem = ({ portfolio }: { portfolio: VerifiedPortfolio }) => {
  const navigate = useNavigate();

  return (
    <div className="py-6 px-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950">
      <div className="flex justify-between">
        <Space size="large">
          <Avatar size={80} src={portfolio.avatarURL} alt={portfolio.name}>
            {portfolio.name?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="mb-3">
              <div className="text-lg font-medium mb-1">{portfolio.title}</div>
              <Space>
                <span className="text-base">{portfolio.name}</span>
                <FaCheckCircle className="text-green-500" />
              </Space>
            </div>

            <div className="text-white-500 mb-3">{portfolio.email}</div>

            <Space size="large" className="text-white-600">
              <Space>
                <FaLocationDot />
                <span>{portfolio.address || "No address"}</span>
              </Space>
              <Space>
                <FaGlobe />
                <span>{portfolio.nationality}</span>
              </Space>
            </Space>
          </div>
        </Space>

        <div className="text-right">
          <div className="font-semibold text-lg mb-4">
            <FaChartLine className="text-yellow-500 mr-2 inline" />
            {portfolio.reputationPoint} Points
          </div>
          <Button
            type="primary"
            icon={<FaEye />}
            onClick={() => navigate(`/freelancers/${portfolio.portfolioId}`)}
          >
            View Portfolio
          </Button>
        </div>
      </div>

      <div className="mt-4 text-white-600">{portfolio.about}</div>
    </div>
  );
};

export default function FreelancerListing({
  portfolios,
  totalCount,
  pageNumber,
  pageSize,
  isLoading,
}: FreelancerListingProps) {
  return (
    <div>
      <div className="border-b w-full p-4 flex justify-between items-center dark:border-gray-500 shadow-md">
        <div>
          <span className="font-semibold text-xl mr-3">
            Available Freelancers
          </span>{" "}
          {totalCount} results
        </div>
        <Space>
          <span>Sort by</span>
          <select className="input-style py-2">
            <option value="desc">Reputation (High to Low)</option>
            <option value="asc">Reputation (Low to High)</option>
          </select>
        </Space>
      </div>

      <div>
        {isLoading ? (
          <div className="p-8 text-center">
            <Spin size="large" />
          </div>
        ) : (
          portfolios.map((portfolio: VerifiedPortfolio) => (
            <FreelancerItem key={portfolio.portfolioId} portfolio={portfolio} />
          ))
        )}
      </div>

      <div className="p-4 flex justify-end">
        <Pagination
          showTotal={(total) => `Total ${total} items`}
          current={pageNumber}
          pageSize={pageSize}
          total={totalCount}
        />
      </div>
    </div>
  );
}

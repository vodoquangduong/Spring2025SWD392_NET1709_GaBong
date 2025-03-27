import { Avatar, Button, Pagination, Space, Spin, Tag } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { FaChartLine, FaEye, FaGlobe, FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { VerifiedPortfolio } from "../models/searchFreelancerModel";

interface FreelancerListingProps {
  portfolios: VerifiedPortfolio[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
}

const FreelancerItem = ({ portfolio }: { portfolio: VerifiedPortfolio }) => {
  const navigate = useNavigate();

  // Extract skills from skillPerform or works data
  const skills =
    portfolio.skillPerform && portfolio.skillPerform.length > 0
      ? portfolio.skillPerform.map((skillItem) => {
          const skill = skillItem.skill || skillItem.skills;
          return {
            name: skill ? skill.skillName : "Unknown Skill",
            level: skillItem.skillLevel,
          };
        })
      : getSkillsFromWorks(portfolio.works);

  // Get skill level color based on level number
  const getSkillLevelColor = (level?: number): string => {
    switch (level) {
      case 0:
        return "red";
      case 1:
        return "gold";
      case 2:
        return "green";
      default:
        return "default";
    }
  };

  return (
    <div className="py-6 px-4 border-b dark:border-gray-700 hover:bg-black/10 dark:hover:bg-neutral-950">
      <div className="flex justify-between">
        <Space size="large">
          <Avatar
            shape="circle"
            size={150}
            src={portfolio.avatarURL}
            alt={portfolio.name}
          >
            {portfolio.name?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="mb-1">
              <Space>
                <span className="text-lg font-semibold">{portfolio.name}</span>
                <FaCheckCircle className="text-green-500" />
                <div className="text-white-500">{portfolio.email}</div>
              </Space>
            </div>
            <div className="text-base font-medium mb-1">{portfolio.title}</div>

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

            {/* Skills display */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Tag
                    key={index}
                    color={getSkillLevelColor(skill.level)}
                    className="px-2 py-1 rounded text-xs"
                  >
                    {skill.name}
                  </Tag>
                ))}
              </div>
            </div>
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
            onClick={() => navigate(`/freelancers/${portfolio.freelancerId}`)}
          >
            View Portfolio
          </Button>
        </div>
      </div>

      <div className="mt-4 text-white-600 line-clamp-2">{portfolio.about}</div>
    </div>
  );
};

// Helper function to parse skills from works JSON
function getSkillsFromWorks(works: string): { name: string; level?: number }[] {
  try {
    if (!works || works === "string") return [];
    const worksData = JSON.parse(works);
    return Array.isArray(worksData.skills) ? worksData.skills : [];
  } catch (e) {
    console.error("Error parsing works data:", e);
    return [];
  }
}

export default function FreelancerListing({
  portfolios,
  totalCount,
  pageNumber,
  pageSize,
  isLoading,
  onPageChange,
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
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}

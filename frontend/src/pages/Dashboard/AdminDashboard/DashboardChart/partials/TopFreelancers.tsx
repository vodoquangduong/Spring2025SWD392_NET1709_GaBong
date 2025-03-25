import { defaultAvatar } from "@/modules/default";
import { List, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { TopFreelancerWithReputation } from "../services/dashboardChartService";

interface TopFreelancersProps {
  topFreelancers: TopFreelancerWithReputation[];
  loading: boolean;
}

const TopFreelancers: React.FC<TopFreelancersProps> = ({
  topFreelancers,
  loading,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 h-[500px] bg-white">
      <List
        className="bg-white dark:bg-zinc-900 border-0 overflow-auto max-h-[460px] custom-scrollbar"
        header={
          <div className="text-xl font-bold sticky top-0 z-10 bg-white py-2">
            Top 10 Freelancers by Reputation
          </div>
        }
        bordered
        dataSource={topFreelancers}
        loading={loading}
        locale={{ emptyText: "No freelancers data available" }}
        renderItem={(item: TopFreelancerWithReputation) => (
          <List.Item className="flex flex-col items-start">
            <div className="flex w-full">
              <img
                className="mt-2 w-12 aspect-square rounded-xl object-cover object-center bg-white border"
                src={item.avatarURL || defaultAvatar}
                alt={item.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultAvatar;
                }}
              />
              <div className="flex-1 ml-4 w-3/4">
                <div
                  title={item?.name}
                  className="hover:text-emerald-400 cursor-pointer font-semibold w-full truncate mb-1"
                  onClick={() => navigate(`/admin/accounts/${item?.accountId}`)}
                >
                  {item?.name} - {item?.email}
                </div>
                <div className="flex gap-y-2">
                  <div className="flex gap-1 flex-wrap">
                    <Tag className="text-xs" color="blue-inverse">
                      {item?.reputationPoint} Points
                    </Tag>
                    {item.role === 2 ? (
                      <Tag className="text-xs" color="green-inverse">
                        Freelancer
                      </Tag>
                    ) : (
                      <Tag className="text-xs" color="purple-inverse">
                        Client
                      </Tag>
                    )}
                    <Tag className="text-xs" color="orange-inverse">
                      Credit: ${item.totalCredit.toFixed(2)}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
        style={{
          scrollBehavior: "smooth",
        }}
      />
    </div>
  );
};

export default TopFreelancers;

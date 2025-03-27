import { Progress } from "antd";

interface AccountStatsProps {
  accountStats: {
    total: number;
    clients: number;
    freelancers: number;
    staff: number;
    admin: number;
    active: number;
    suspended: number;
    banned: number;
  };
}

const AccountDistribution: React.FC<AccountStatsProps> = ({ accountStats }) => {
  // Helper function to safely calculate percentage and avoid NaN or division by zero
  const calculatePercentage = (value: number, total: number): number => {
    if (!total || value === undefined || value === null) return 0;
    const percentage = (value / total) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  const adjustedFreelancers =
    accountStats.freelancers > 0 ? accountStats.freelancers - 1 : 0;
  const adjustedTotal =
    accountStats.total > 0
      ? accountStats.total - (accountStats.freelancers > 0 ? 1 : 0)
      : 0;

  return (
    <div className="border p-4 h-full bg-white">
      <div className="text-xl font-bold mb-4">Account Distribution</div>

      {/* Role Distribution */}
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">Role Distribution</h3>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>Clients: {accountStats.clients}</span>
              <span>
                {calculatePercentage(accountStats.clients, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(accountStats.clients, adjustedTotal)}
              showInfo={false}
              strokeColor="#4096ff"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Freelancers: {adjustedFreelancers}</span>
              <span>
                {calculatePercentage(adjustedFreelancers, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(adjustedFreelancers, adjustedTotal)}
              showInfo={false}
              strokeColor="#52c41a"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Staff: {accountStats.staff}</span>
              <span>
                {calculatePercentage(accountStats.staff, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(accountStats.staff, adjustedTotal)}
              showInfo={false}
              strokeColor="#722ed1"
            />
          </div>

          {accountStats.admin > 0 && (
            <div>
              <div className="flex justify-between mb-1">
                <span>Admin: {accountStats.admin}</span>
                <span>
                  {calculatePercentage(accountStats.admin, adjustedTotal)}%
                </span>
              </div>
              <Progress
                percent={calculatePercentage(accountStats.admin, adjustedTotal)}
                showInfo={false}
                strokeColor="#f5222d"
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Distribution */}
      {/* <div>
        <h3 className="font-medium text-lg mb-2">Status Distribution</h3>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>Active: {accountStats.active}</span>
              <span>
                {calculatePercentage(accountStats.active, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(accountStats.active, adjustedTotal)}
              showInfo={false}
              strokeColor="#52c41a"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Suspended: {accountStats.suspended}</span>
              <span>
                {calculatePercentage(accountStats.suspended, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(
                accountStats.suspended,
                adjustedTotal
              )}
              showInfo={false}
              strokeColor="#faad14"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Banned: {accountStats.banned}</span>
              <span>
                {calculatePercentage(accountStats.banned, adjustedTotal)}%
              </span>
            </div>
            <Progress
              percent={calculatePercentage(accountStats.banned, adjustedTotal)}
              showInfo={false}
              strokeColor="#f5222d"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AccountDistribution;

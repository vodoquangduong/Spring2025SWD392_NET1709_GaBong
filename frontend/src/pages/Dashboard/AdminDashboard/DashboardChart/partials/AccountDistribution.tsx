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
  return (
    <div className="w-full grid grid-cols-2 gap-6 mt-8">
      {/* Role Distribution */}
      <div className="border p-4 h-[250px] bg-white">
        <div className="text-xl font-bold mb-4">Account Role Distribution</div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>Clients: {accountStats.clients}</span>
              <span>
                {accountStats.total
                  ? Math.round(
                      (accountStats.clients / accountStats.total) * 100
                    )
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? Math.round(
                      (accountStats.clients / accountStats.total) * 100
                    )
                  : 0
              }
              showInfo={false}
              strokeColor="#4096ff"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Freelancers: {accountStats.freelancers}</span>
              <span>
                {accountStats.total
                  ? Math.round(
                      (accountStats.freelancers / accountStats.total) * 100
                    )
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? Math.round(
                      (accountStats.freelancers / accountStats.total) * 100
                    )
                  : 0
              }
              showInfo={false}
              strokeColor="#52c41a"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Staff: {accountStats.staff}</span>
              <span>
                {accountStats.total
                  ? Math.round((accountStats.staff / accountStats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? Math.round((accountStats.staff / accountStats.total) * 100)
                  : 0
              }
              showInfo={false}
              strokeColor="#722ed1"
            />
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="border p-4 h-[250px] bg-white">
        <div className="text-xl font-bold mb-4">
          Account Status Distribution
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between mb-1">
              <span>Active: {accountStats.active}</span>
              <span>
                {accountStats.total
                  ? ((accountStats.active / accountStats.total) * 100).toFixed(
                      2
                    )
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? (accountStats.active / accountStats.total) * 100
                  : 0
              }
              showInfo={false}
              strokeColor="#52c41a"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Suspended: {accountStats.suspended}</span>
              <span>
                {accountStats.total
                  ? (
                      (accountStats.suspended / accountStats.total) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? (accountStats.suspended / accountStats.total) * 100
                  : 0
              }
              showInfo={false}
              strokeColor="#faad14"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Banned: {accountStats.banned}</span>
              <span>
                {accountStats.total
                  ? ((accountStats.banned / accountStats.total) * 100).toFixed(
                      2
                    )
                  : 0}
                %
              </span>
            </div>
            <Progress
              percent={
                accountStats.total
                  ? (accountStats.banned / accountStats.total) * 100
                  : 0
              }
              showInfo={false}
              strokeColor="#f5222d"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDistribution;

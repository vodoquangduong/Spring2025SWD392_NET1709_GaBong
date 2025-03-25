import { Button, DatePicker, Select, Spin } from "antd";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";
import { RevenueDataPoint } from "../services/dashboardChartService";

interface RevenueChartProps {
  startDate: string;
  endDate: string;
  groupBy: string;
  revenueGraphData: RevenueDataPoint[];
  loadingRevenue: boolean;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setGroupBy: (groupBy: string) => void;
  fetchRevenueData: () => void;
  revenueChartOptions: ApexOptions;
  revenueChartSeries: any[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  startDate,
  endDate,
  groupBy,
  revenueGraphData,
  loadingRevenue,
  setStartDate,
  setEndDate,
  setGroupBy,
  fetchRevenueData,
  revenueChartOptions,
  revenueChartSeries,
}) => {
  return (
    <div className="mt-8 border p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Revenue Overview</h2>
        <div className="flex gap-4">
          <DatePicker.RangePicker
            value={[dayjs(startDate), dayjs(endDate)]}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setStartDate(dates[0].format("YYYY-MM-DD"));
                setEndDate(dates[1].format("YYYY-MM-DD"));
              }
            }}
          />
          <Select
            value={groupBy}
            onChange={setGroupBy}
            options={[
              { value: "day", label: "Daily" },
              { value: "week", label: "Weekly" },
              { value: "month", label: "Monthly" },
              { value: "year", label: "Yearly" },
            ]}
            style={{ width: 120 }}
          />
          <Button
            type="primary"
            onClick={fetchRevenueData}
            loading={loadingRevenue}
          >
            Apply
          </Button>
        </div>
      </div>

      {loadingRevenue ? (
        <div className="flex justify-center items-center h-64">
          <Spin />
        </div>
      ) : revenueGraphData.length > 0 ? (
        <div className="h-[400px]">
          <ReactApexChart
            options={revenueChartOptions}
            series={revenueChartSeries}
            type="area"
            height={350}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>No revenue data available for the selected period</p>
        </div>
      )}
    </div>
  );
};

export default RevenueChart;

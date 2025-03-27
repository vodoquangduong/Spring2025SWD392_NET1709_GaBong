import { Button, DatePicker, Select, Spin, Table } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { RevenueDataPoint } from "../services/dashboardChartService";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
}) => {
  // Define columns for the data table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (text: number) => `$${text.toFixed(2)}`,
    },
  ];

  // Prepare data for Chart.js
  const chartData = {
    labels: revenueGraphData.map((item) => item.date),
    datasets: [
      {
        label: "Revenue",
        data: revenueGraphData.map((item) => item.revenue),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue Over Time",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value;
          },
        },
      },
    },
  };

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
        <div>
          {/* Chart component using Chart.js */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Revenue Chart</h3>
            <div className="h-[350px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Data table - More reliable display of data */}
          <div>
            <h3 className="text-lg font-medium mb-2">Revenue Data</h3>
            <Table
              dataSource={revenueGraphData.map((item, index) => ({
                key: index,
                date: item.date,
                revenue: item.revenue,
              }))}
              columns={columns}
              pagination={false}
              size="small"
            />
          </div>
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

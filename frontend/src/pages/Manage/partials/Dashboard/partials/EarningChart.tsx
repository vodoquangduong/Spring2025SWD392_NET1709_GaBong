import { ChartLineData } from "@/modules/dashboardDataHandler";
import useConfigStore from "@/stores/configStore";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import Chart from "react-apexcharts";

export default function EarningChart({ data }: { data: ChartLineData }) {
  // calculate total earnings group by createdAt

  const { isDarkMode } = useConfigStore();
  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      width: "100%",
      height: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Earning Chart",
      align: "left",
      style: {
        color: isDarkMode ? "white" : "black",
        fontSize: "20px",
        fontFamily: "sans-serif",
        fontWeight: "bold",
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return dayjs(val).format("DD-MM-YYYY");
        },
      },
      y: {
        formatter: function (val) {
          return val.toLocaleString() + " USD";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (val) {
          return dayjs(val).format("DD-MM-YYYY");
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toLocaleString() + " USD";
        },
      },
      title: {
        text: "USD",
      },
    },
    series: [
      {
        name: "Income",
        data: data,
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

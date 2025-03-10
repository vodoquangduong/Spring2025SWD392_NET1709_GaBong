import { BidSummaryData } from "@/modules/dashboardDataHandler";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export default function BidSummaryChart({
  bidSumData,
}: {
  bidSumData: BidSummaryData;
}) {
  const options: ApexOptions = {
    series: [bidSumData.unawardedBids, bidSumData.awardedBids],
    labels: ["Unawarded Proposals", "Awarded Proposals"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Proposals",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0),
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: (w) => w,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => val.toLocaleString() + " proposals",
      },
      x: {
        show: false,
      },
    },
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return <Chart options={options} series={options.series} type="donut" />;
}

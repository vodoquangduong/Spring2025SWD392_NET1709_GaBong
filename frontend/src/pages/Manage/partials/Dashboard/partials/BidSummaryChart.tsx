import React from "react";
import Chart from "react-apexcharts";

const options = {
  series: [44, 55, 41, 17, 15],
  options: {
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
  },
};

export default function BidSummaryChart() {
  return (
    <Chart
      options={{
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "Total Bids",
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
      }}
      series={options.series}
      type="donut"
    />
  );
}

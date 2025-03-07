import useConfigStore from "@/stores/configStore";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import React from "react";
import Chart from "react-apexcharts";

// create a new type for dates

type EarningMap = {
  [key: string]: number;
};

type Earning = [string, number][];
const dates = [
  ["2022-03-01", 100],
  ["2022-03-02", 110],
  ["2022-03-03", 120],
  ["2022-03-04", 130],
  ["2022-03-05", 140],
  ["2022-03-06", 150],
  ["2022-03-07", 160],
  ["2022-03-08", 170],
  ["2022-03-09", 180],
  ["2022-03-10", 190],
  ["2022-03-11", 200],
  ["2022-03-12", 210],
  ["2022-03-13", 220],
  ["2022-03-14", 230],
  ["2022-03-15", 240],
  ["2022-03-16", 250],
  ["2022-03-17", 260],
  ["2022-03-18", 270],
  ["2022-03-19", 280],
  ["2022-03-20", 290],
  ["2022-03-21", 300],
  ["2022-03-22", 310],
  ["2022-03-23", 320],
  ["2022-03-24", 330],
  ["2022-03-25", 340],
  ["2022-03-26", 350],
  ["2022-03-27", 360],
  ["2022-03-28", 370],
  ["2022-03-29", 380],
  ["2022-03-30", 390],
  ["2022-03-31", 400],
];

export default function EarningChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // calculate total earnings group by createdAt

  const totalEarningsMap = transactions
    .filter((item: Transaction) => item.type == TransactionType.EARNINGS)
    .reduce((a: EarningMap, b: Transaction) => {
      const date = dayjs(b.createdAt, "DD-MM-YYYY").format("YYYY-DD-MM");
      return {
        ...a,
        [date]: (a[date] || 0) + b.amount,
      };
    }, {});

  console.log("totalEarningsMap", totalEarningsMap);
  console.log("transactions", transactions.length);
  // convert totalEarningsMap to array
  let totalEarnings = Object.keys(totalEarningsMap).map((key) => ({
    x: key,
    y: totalEarningsMap[key],
  }));
  console.log("totalEarnings", totalEarnings);

  const { isDarkMode } = useConfigStore();
  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      // width: "100%",
      height: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "Price",
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
    series: [
      {
        name: "Income",
        data: totalEarnings,
      },
    ],
  };

  const options2 = {
    options: {
      chart: {
        id: "basic-bar",
        // width: "100%",
        height: "100%",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <Chart
      options={{
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
      }}
      series={options.series}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

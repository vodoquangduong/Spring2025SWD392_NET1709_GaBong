import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

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

var options = {
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

export default function EarningChart() {
  return (
    <Chart
      options={{
        title: {
          text: "Earning Chart",
          align: "left",
          style: {
            color: "green",
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

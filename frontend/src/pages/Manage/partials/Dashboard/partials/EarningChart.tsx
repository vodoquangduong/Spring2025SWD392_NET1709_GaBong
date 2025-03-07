import useConfigStore from "@/stores/configStore";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import Chart from "react-apexcharts";

// create a new type for dates

type EarningMap = {
  [key: string]: number;
};

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
  // let totalEarnings = Object.keys(totalEarningsMap).map((key) => ({
  //   x: key,
  //   y: totalEarningsMap[key],
  // }));
  // console.log("totalEarnings", totalEarnings);
  let totalEarnings = Object.keys(totalEarningsMap)
    .map((key) => ({
      x: key,
      y: totalEarningsMap[key],
    }))
    .sort((a, b) => {
      const dateA = new Date(a.x.split("-").reverse().join("-"));
      const dateB = new Date(b.x.split("-").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });




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

  return (
    <Chart
      options={{
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
      }}
      series={options.series}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
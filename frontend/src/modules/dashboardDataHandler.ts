import { Bid } from "@/types/bid";
import { ProjectDetail } from "@/types/project";
import { Transaction, TransactionType } from "@/types/transaction";
import dayjs from "dayjs";

export type DateMap = {
  [key: string]: number;
};

export type ChartLineData = {
  x: string;
  y: number;
}[];

export type BidSummaryData = {
  awardedBids: number;
  unawardedBids: number;
};

export function getBidSummaryData(
  bids: Bid[],
  projects: ProjectDetail[],
  freelancerId: number
): BidSummaryData {
  const totalProjects = projects?.filter(
    (p) => p.freelancerId == freelancerId
  ).length;
  return {
    awardedBids: totalProjects,
    unawardedBids: totalProjects - bids?.length,
  };
}

export function getEarningChartData(data: Transaction[]) {
  const totalEarningsMap = data
    .filter((item: Transaction) => item.type == TransactionType.EARNINGS)
    .reduce((a: DateMap, b: Transaction) => {
      const date = dayjs(b.createdAt, "DD/MM/YYYY HH:mm:ss").format(
        "YYYY-DD-MM"
      );
      return {
        ...a,
        [date]: (a[date] || 0) + b.amount,
      };
    }, {});
  console.log("totalEarningsMap", totalEarningsMap);

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
  console.log("totalEarnings", totalEarnings);

  return totalEarnings;
}

// code this function
export function getTotalEarningData(
  data: Transaction[],
  last30Days: boolean = false
): number {
  const now = dayjs();
  const totalEarningsData = data.reduce((a: number, b: Transaction) => {
    const date = dayjs(b.createdAt, "DD/MM/YYYY HH:mm:ss").format("YYYY-DD-MM");
    if (b.type == TransactionType.EARNINGS) {
      if (!last30Days || now.diff(date, "day") <= 30) {
        return a + b.amount;
      }
    }
    return a;
  }, 0);
  return totalEarningsData;
}

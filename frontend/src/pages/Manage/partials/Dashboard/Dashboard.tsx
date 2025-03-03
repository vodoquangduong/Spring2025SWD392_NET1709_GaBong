import React from "react";
import { ResponsiveLine } from "@nivo/line";
import data from "./data.json";

const Dashboard = () => {
  return (
    <div className="w-1/2 h-1/2">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
      <div>
        <div className="flex flex-col items-center mt-4">
          <div className="text-xl font-bold mb-2">Dashboard Overview</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-lg font-semibold">Total Projects</div>
              <div className="text-2xl">45</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-lg font-semibold">Active Users</div>
              <div className="text-2xl">128</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-lg font-semibold">Pending Tasks</div>
              <div className="text-2xl">12</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-lg font-semibold">New Messages</div>
              <div className="text-2xl">56</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

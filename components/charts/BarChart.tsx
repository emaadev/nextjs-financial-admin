"use client";

import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
  data: any;
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["incomes", "expenses", "savings", "investments"]}
      indexBy="type"
      margin={{ top: 30, right: 130, bottom: 70, left: 60 }}
      padding={0.2}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "spectral" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Type",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: -10,
        tickRotation: 0,
        legend: "Amount",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={5}
      labelSkipHeight={5}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
    />
  );
};

export default BarChart;

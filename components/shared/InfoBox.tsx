"use client";

import { useEffect, useState } from "react";
import { IoPieChartSharp } from "react-icons/io5";

import { PiChartLineDownLight, PiChartLineUpLight } from "react-icons/pi";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";

// Type of elements config
const infoBoxConfig = {
  incomes: {
    title: "Incomes",
    icon: <PiChartLineUpLight />,
    color: "#5a8c49", // green
  },
  expenses: {
    title: "Expenses",
    icon: <PiChartLineDownLight />,
    color: "#db3d3d", // red
  },
  savings: {
    title: "Savings",
    icon: <IoPieChartSharp />,
    color: "#2d7feb", // blue
  },
  investments: {
    title: "Investments",
    icon: <IoPieChartSharp />,
    color: "#ccab33", // yellow
  },
};

interface InfoBoxProps {
  type: keyof typeof infoBoxConfig;
  count: number;
}

const InfoBox = ({ type, count }: InfoBoxProps) => {
  const [lastCount, setLastCount] = useState<number>(count);
  const [arrowIcon, setArrowIcon] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Evaluate if the current count is different than last count
    // and render the correct icon
    if (count !== lastCount) {
      if (count > lastCount) {
        setArrowIcon(
          <RiArrowUpDoubleFill className="w-8 h-8 text-green-600" />
        );
      } else if (count < lastCount) {
        setArrowIcon(
          <RiArrowDownDoubleFill className="w-8 h-8 text-red-600" />
        );
      }
    }
    setLastCount(count);
  }, [count, lastCount]);

  // Set the element type
  const { title, icon, color } = infoBoxConfig[type];

  return (
    <div className="infobox">
      <div className="icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <div className="info">
        <h3>{title}</h3>
        <span>${count}</span>
      </div>

      <div className="status">{arrowIcon}</div>
    </div>
  );
};

export default InfoBox;

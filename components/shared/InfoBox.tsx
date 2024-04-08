"use client";

import { useEffect, useState } from "react";

import { LoadingComponent } from "@/components";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
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
    icon: <GiReceiveMoney />,
    color: "#2d7feb", // blue
  },
  investments: {
    title: "Investments",
    icon: <FaMoneyBillTrendUp />,
    color: "#ccab33", // yellow
  },
};

interface InfoBoxProps {
  type: keyof typeof infoBoxConfig;
  count: number;
  loading: boolean;
}

const InfoBox = ({ type, count, loading }: InfoBoxProps) => {
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
        {loading ? <LoadingComponent /> : <span>${count}</span>}
      </div>

      <div className="status">{arrowIcon}</div>
    </div>
  );
};

export default InfoBox;

import { FaMoneyBill } from "react-icons/fa";
import { IoAddCircleSharp, IoSettingsSharp } from "react-icons/io5";
import { RiDashboard2Fill } from "react-icons/ri";
import { BsSendArrowDownFill } from "react-icons/bs";

export const navLinks = [
  { href: "/dashboard/home", icon: RiDashboard2Fill, label: "Dashboard" },
  { href: "/dashboard/incomes", icon: FaMoneyBill, label: "Incomes" },
  {
    href: "/dashboard/expenses",
    icon: BsSendArrowDownFill,
    label: "Expenses",
  },
  { href: "/dashboard/create", icon: IoAddCircleSharp, label: "Create" },
];

export const accountLinks = [
  { href: "/dashboard/settings", icon: IoSettingsSharp, label: "Settings" },
];

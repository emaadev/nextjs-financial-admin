import Link from "next/link";

import { FaMoneyBill } from "react-icons/fa";
import { IoAddCircleSharp, IoSettingsSharp } from "react-icons/io5";
import { RiDashboard2Fill } from "react-icons/ri";
import { BsSendArrowDownFill } from "react-icons/bs";

const Navigation = () => {
  return (
    <aside className="dashboard-aside">
      <header className="dashboard-header">
        <Link href="/dashboard">
          Financial <br /> Admin
        </Link>
      </header>

      <div className="dashboard-links__container">
        <span>GENERAL</span>
        <ul>
          <li className="active">
            <Link href="/dashboard">
              <RiDashboard2Fill /> Dashboard
            </Link>
          </li>

          <li>
            <Link href="/incomes">
              <FaMoneyBill /> Incomes
            </Link>
          </li>

          <li>
            <Link href="/expenses">
              <BsSendArrowDownFill /> Expenses
            </Link>
          </li>

          <li>
            <Link href="/create">
              <IoAddCircleSharp /> Create
            </Link>
          </li>
        </ul>
      </div>

      <div className="dashboard-links__container">
        <span>ACCOUNT</span>
        <ul>
          <li>
            <Link href="/dashboard">
              <IoSettingsSharp /> Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Navigation;

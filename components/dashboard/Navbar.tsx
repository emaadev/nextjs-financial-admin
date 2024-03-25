import { IoIosInformationCircle, IoMdNotifications } from "react-icons/io";
import { IoCalendarClear, IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="dashboard-navbar">
      <section className="dashboard-navbar__user">
        {/* TODO: Change the name dinamically */}
        <h2>Welcome back, {`Emanuel`}!</h2>
        <p>You will see the total revenue of the month.</p>
      </section>

      <section className="dashboard-navbar__data">
        <div className="info">
          <div className="searchbar">
            <IoSearch />
            <input type="text" placeholder="Search..." />
          </div>

          <div className="navigation">
            <button type="button">
              <IoIosInformationCircle />
            </button>
            <button type="button">
              <IoMdNotifications />
            </button>
            <button type="button">
              <IoCalendarClear />
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;

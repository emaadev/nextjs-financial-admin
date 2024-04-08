interface FiltersProps {
  selectedMonth: any;
  setSelectedMonth: any;
  monthOptions: any;
}

const Filters = ({
  selectedMonth,
  setSelectedMonth,
  monthOptions,
}: FiltersProps) => {
  const [selectedYear, selectedMonthNumber] = selectedMonth.split("-");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedMonthName = monthNames[parseInt(selectedMonthNumber, 10) - 1];

  return (
    <div className="dashboard-filters">
      <label htmlFor="month">
        Movements in {selectedMonthName}, {selectedYear}
      </label>
      <select
        id="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {monthOptions.map((month: string) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;

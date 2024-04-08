const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, add 1 to get the correct month
  return `${currentYear}-${currentMonth}`;
};

export default getCurrentMonth;

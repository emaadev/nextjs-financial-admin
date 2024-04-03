import { format } from "date-fns";

export const getYear = (date: Date) => format(date, "yyyy");
export const getDayOfWeek = (date: Date) => format(date, "EEEE");
export const getDayOfMonth = (date: Date) => {
  const day = format(date, "do");
  return day.replace(/[0-9]+/, (match) => match);
};
export const getMonth = (date: Date) => format(date, "MMMM");

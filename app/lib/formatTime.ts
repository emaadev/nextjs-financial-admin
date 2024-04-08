import { format } from "date-fns";

export default function formatTime(date: string) {
  const formattedDate = format(new Date(date), "MM/dd/yyyy HH:mm");

  return formattedDate;
}

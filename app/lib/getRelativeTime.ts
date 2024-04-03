import { parseISO, formatDistanceToNow } from "date-fns";

export const toRelativeTime = (dateStr: string) => {
  const date = parseISO(dateStr);
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
};

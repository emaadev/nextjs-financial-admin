import { useEffect, useState } from "react";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

const useFilteredEntries = (selectedMonth: string) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    const filteredEntries = storedEntries.filter((entry: any) =>
      entry.date.startsWith(selectedMonth)
    );
    setEntries(filteredEntries);
  }, [selectedMonth]);

  return entries;
};

export default useFilteredEntries;

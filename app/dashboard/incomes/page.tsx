"use client";

import { useEffect, useState } from "react";

import { HistoryTable, PageHeader, LineChart } from "@/components";

interface Entry {
  id: string;
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function IncomesPage() {
  // All the entries in the local storage
  const [entries, setEntries] = useState<Entry[]>([]);

  // Filtered and sorted entries for the table and chart
  const filteredEntries = entries
    .filter((entry) => entry.entryType === "income")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(storedEntries);
  }, []);

  const onDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updatedEntries = entries.filter((entry) => entry.id !== id);
      setEntries(updatedEntries);
      localStorage.setItem("entries", JSON.stringify(updatedEntries));
    }
  };

  const lineChartData = [
    {
      id: "Incomes",
      data: filteredEntries.map((entry) => ({
        x: new Date(entry.date).toLocaleDateString("en-US", { month: "long" }), // Converts date to month name
        y: entry.amount,
      })),
    },
  ];

  return (
    <section className="incomes-expenses__page">
      <PageHeader title={"Incomes"} subtitle={"All incomes along the year."} />

      <div className="line-chart">
        <h2>Annual Analysis</h2>
        <LineChart data={lineChartData} />
      </div>

      <HistoryTable
        entries={filteredEntries}
        title={"All Incomes"}
        onDelete={onDelete}
      />
    </section>
  );
}

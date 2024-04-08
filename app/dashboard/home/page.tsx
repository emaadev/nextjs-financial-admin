"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Filters,
  HistorySummary,
  InfoBox,
  Navbar,
} from "@/components";
import formatTime from "@/app/lib/formatTime";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function DashboardPage() {
  // All the entries in the local storage
  const [entries, setEntries] = useState<Entry[]>([]);

  // Values of the actual entries
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [investments, setInvestments] = useState(0);

  // Filters for the entries
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const currentYear = new Date().getFullYear();

  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, "0");
    return `${currentYear}-${month}`;
  });

  // Type of the entries
  const data = [
    {
      type: "Incomes",
      incomes: incomes,
    },
    {
      type: "Expenses",
      expenses: expenses,
    },
    {
      type: "Savings",
      savings: savings,
    },
    {
      type: "Investments",
      investments: investments,
    },
  ];

  // Get the entries from the local storage
  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");

    const filteredEntries = entries.filter((entry) =>
      entry.date.startsWith(selectedMonth)
    );
    setEntries(filteredEntries);

    const totalIncomes = filteredEntries
      .filter((entry) => entry.entryType === "income")
      .reduce((acc, entry) => acc + Number(entry.amount), 0);

    const totalExpenses = filteredEntries
      .filter((entry) => entry.entryType === "expense")
      .reduce((acc, entry) => acc + Number(entry.amount), 0);

    const totalSavings =
      totalIncomes -
      totalExpenses +
      filteredEntries
        .filter((entry) => entry.entryType === "saving")
        .reduce((acc, entry) => acc + Number(entry.amount), 0);

    const totalInvestments = filteredEntries
      .filter((entry) => entry.entryType === "investment")
      .reduce((acc, entry) => acc + Number(entry.amount), 0);

    setIncomes(totalIncomes);
    setExpenses(totalExpenses);
    setSavings(totalSavings);
    setInvestments(totalInvestments);
  }, [selectedMonth]);

  return (
    <section className="dashboard-page">
      <Navbar />

      <Filters
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthOptions={monthOptions}
      />

      <div className="tracker-container">
        <InfoBox count={incomes} type={"incomes"} />
        <InfoBox count={expenses} type={"expenses"} />
        <InfoBox count={savings} type={"savings"} />
        <InfoBox count={investments} type={"investments"} />
      </div>

      <div className="bar-chart">
        <span>Movements Summary</span>
        <BarChart data={data} />
      </div>

      <HistorySummary entries={entries} />
    </section>
  );
}

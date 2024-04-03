"use client";

import { useEffect, useState } from "react";

import { InfoBox, Navbar } from "@/components";
import { toRelativeTime } from "@/app/lib/getRelativeTime";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [investments, setInvestments] = useState(0);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(entries);

    const totalIncomes = entries
      .filter((entry) => entry.entryType === "income")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalExpenses = entries
      .filter((entry) => entry.entryType === "expense")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalSavings = entries
      .filter((entry) => entry.entryType === "saving")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalInvestments = entries
      .filter((entry) => entry.entryType === "investment")
      .reduce((acc, entry) => acc + entry.amount, 0);

    setIncomes(totalIncomes);
    setExpenses(totalExpenses);
    setSavings(totalSavings);
    setInvestments(totalInvestments);
  }, []);

  return (
    <section className="dashboard-page">
      <Navbar />

      <div className="tracker-container">
        <InfoBox count={incomes} type={"incomes"} />
        <InfoBox count={expenses} type={"expenses"} />
        <InfoBox count={savings} type={"savings"} />
        <InfoBox count={investments} type={"investments"} />
      </div>

      <div className="history-summary">
        <span>History Summary</span>
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className={entry.entryType}>
                <td>{toRelativeTime(entry.date)}</td>
                <td>
                  {entry.entryType === "expense" ? "-" : "+"} ${entry.amount}
                </td>
                <td>{entry.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

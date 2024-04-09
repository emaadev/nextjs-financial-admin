"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart,
  Filters,
  HistorySummary,
  InfoBox,
  LoadingComponent,
  Navbar,
} from "@/components";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // All the entries in the local storage
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);

    try {
      const entries = JSON.parse(localStorage.getItem("entries") || "[]");

      const filteredEntries = entries.filter((entry: any) =>
        entry.date.startsWith(selectedMonth)
      );
      setEntries(filteredEntries);

      const totalIncomes = filteredEntries
        .filter((entry: any) => entry.entryType === "income")
        .reduce((acc: number, entry: any) => acc + Number(entry.amount), 0);

      const totalExpenses = filteredEntries
        .filter((entry: any) => entry.entryType === "expense")
        .reduce((acc: number, entry: any) => acc + Number(entry.amount), 0);

      const totalSavings =
        totalIncomes -
        totalExpenses +
        filteredEntries
          .filter((entry: any) => entry.entryType === "saving")
          .reduce((acc: number, entry: any) => acc + Number(entry.amount), 0);

      const totalInvestments = filteredEntries
        .filter((entry: any) => entry.entryType === "investment")
        .reduce((acc: number, entry: any) => acc + Number(entry.amount), 0);

      setIncomes(totalIncomes);
      setExpenses(totalExpenses);
      setSavings(totalSavings);
      setInvestments(totalInvestments);

      if (entries.length === 0) {
        toast("You have to add your first money movement!", {
          icon: "💰",
        });
        router.push("/dashboard/create");
      }
    } catch (error) {
      toast.error("An error has occured while retrieving entries.");
    } finally {
      setLoading(false);
    }
  }, [router, selectedMonth]);

  return (
    <section className="dashboard-page">
      <Navbar />

      {loading ? (
        <LoadingComponent />
      ) : (
        <Filters
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          monthOptions={monthOptions}
        />
      )}

      <div className="tracker-container">
        <InfoBox count={incomes} type={"incomes"} loading={loading} />
        <InfoBox count={expenses} type={"expenses"} loading={loading} />
        <InfoBox count={savings} type={"savings"} loading={loading} />
        <InfoBox count={investments} type={"investments"} loading={loading} />
      </div>

      <div className="flex gap-4 flex-wrap w-full">
        <div className="bar-chart">
          <span>Movements Summary</span>
          {loading ? <LoadingComponent /> : <BarChart data={data} />}
        </div>

        <div className="history-summary">
          <HistorySummary entries={entries} />
        </div>
      </div>
    </section>
  );
}

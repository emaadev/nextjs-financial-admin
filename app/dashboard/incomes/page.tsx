"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PageHeader } from "@/components";
import LineChart from "@/components/charts/LineChart";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
    <section className="incomes-page">
      <PageHeader title={"Incomes"} subtitle={"All incomes along the year."} />

      <div className="line-chart">
        <h2>Annual Analysis</h2>
        <LineChart data={lineChartData} />
      </div>

      <div className="incomes-table">
        <h2>All Incomes</h2>
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className={entry.entryType}>
                <td>{entry.date}</td>
                <td>${entry.amount}</td>
                <td>{entry.comments}</td>

                <td className="edit-buttons">
                  <Link
                    href={`/dashboard/history/edit/${entry.id}`}
                    className="edit"
                  >
                    <FaRegEdit />
                  </Link>
                  <button className="delete" onClick={() => onDelete(entry.id)}>
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

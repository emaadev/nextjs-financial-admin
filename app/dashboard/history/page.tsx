"use client";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components";
import { toRelativeTime } from "@/app/lib/getRelativeTime";
import {
  getYear,
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
} from "@/app/lib/getFormattedDate";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const today = new Date();

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(entries);
  }, []);

  return (
    <section className="history-page">
      <PageHeader
        title={"History"}
        subtitle={"You will see all your movements here."}
      />

      <div className="filters-container">
        <div>
          <span className="year">{getYear(today)}</span>
          <div className="date-container">
            <span>{getDayOfWeek(today)}</span>{" "}
            <span>{getDayOfMonth(today)}</span>, <span>{getMonth(today)}</span>
          </div>
        </div>

        <div className="filter-by-date">
          <span>Go To Date</span>
          <input type="date" name="year" id="year" />
        </div>
      </div>

      <div className="main-history">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className={entry.entryType}>
                <td>{entry.entryType}</td>
                <td>{toRelativeTime(entry.date)}</td>
                <td>
                  {entry.entryType === "expense" ? "-" : "+"} ${entry.amount}
                </td>
                <td>{entry.comments}</td>

                <td className="edit-buttons">
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

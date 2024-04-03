"use client";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components";
import { toRelativeTime } from "@/app/lib/getRelativeTime";

interface Entry {
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

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

      <div>
        <h2>Filters</h2>
      </div>

      <div className="main-history">
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

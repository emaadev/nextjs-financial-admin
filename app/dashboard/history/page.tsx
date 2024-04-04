"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { PageHeader } from "@/components";
import { toRelativeTime } from "@/app/lib/getRelativeTime";
import {
  getYear,
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
} from "@/app/lib/getFormattedDate";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Entry {
  id: any;
  date: string;
  entryType: string;
  amount: number;
  comments: string;
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [displayDate, setDisplayDate] = useState<string>("All Entries");

  // Filters to show all the entries in the history
  const [selectedDate, setSelectedDate] = useState<string>("");
  const filteredEntries = selectedDate
    ? entries.filter((entry) => entry.date.startsWith(selectedDate))
    : entries;

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(entries);
  }, []);

  // Delete de entry from the local storage
  const onDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      const newEntries = entries.filter((entry) => entry.id !== id);
      setEntries(newEntries);
      localStorage.setItem("entries", JSON.stringify(newEntries));
    }
  };

  // Show the date of the filtered entries selected
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    if (selectedDate) {
      const dateObj = new Date(`${selectedDate}T00:00`);
      const formattedDate = `${getDayOfWeek(dateObj)} ${getDayOfMonth(
        dateObj
      )}, ${getMonth(dateObj)} ${getYear(dateObj)}`;
      setDisplayDate(formattedDate);
    } else {
      setDisplayDate("All Entries");
    }
  };

  return (
    <section className="history-page">
      <PageHeader
        title={"History"}
        subtitle={"You will see all your movements here."}
      />

      <div className="filters-container">
        <div>
          <div className="date-container">
            <span>{displayDate}</span>
          </div>
        </div>

        <div className="filter-by-date">
          <span>Go To Date</span>
          <input
            type="date"
            name="year"
            id="year"
            onChange={(e) => {
              setSelectedDate(e.target.value);
              handleDateChange(e);
            }}
          />
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
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className={entry.entryType}>
                <td>{entry.entryType}</td>
                <td>{toRelativeTime(entry.date)}</td>
                <td>
                  {entry.entryType === "expense" ? "-" : "+"} ${entry.amount}
                </td>
                <td>{entry.comments}</td>

                <td className="edit-buttons">
                  <Link href={`history/edit/${entry.id}`} className="edit">
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

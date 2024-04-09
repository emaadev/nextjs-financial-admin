"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { entryTypes } from "@/app/constants/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PageHeader } from "@/components";
import { uuid } from "uuidv4";

interface Entry {
  id: string;
  entryType: string;
  amount: number;
  date: string;
  comments: string;
  frequency: string;
}

export default function Automatize() {
  const router = useRouter();
  const [existingData, setExistingData] = useState<Entry[]>([]);

  const [entryType, setEntryType] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("monthly");

  useEffect(() => {
    const data: Entry[] = JSON.parse(localStorage.getItem("entries") || "[]");
    setExistingData(data);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Entry = {
      id: uuid(),
      entryType: entryType,
      amount: amount,
      date: date,
      comments: comments,
      frequency: frequency,
    };

    try {
      existingData.push(formData);
      localStorage.setItem("entries", JSON.stringify(existingData));
      router.push("/dashboard/home");
    } catch (error) {
      console.log("An error has occurred while updating entry.");
    }
  };

  const handleEventClick = (info: any) => {
    const event = info.event;
    setDate(event.start.toISOString().split("T")[0]);
  };

  return (
    <section className="automatize-page">
      <PageHeader
        title={"Automatize an entry"}
        subtitle={"Create an automatic entry."}
      />

      <div className="form-calendar__container">
        <form className="entry-form" onSubmit={handleSubmit}>
          {/* Entry Type of the Amount */}
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <div id="type" className="type-selector">
              {entryTypes.map((item) => (
                <button
                  key={item.value}
                  className={entryType === item.value ? "active" : ""}
                  style={{
                    backgroundColor:
                      entryType === item.value ? item.color : "transparent",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEntryType(item.value);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inserted Amount */}
          <div className="form-group">
            <label htmlFor="amount">Amount (USD $)</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="20000"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>

          {/* Date of creation */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Description of the inserted amount */}
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              placeholder="Insert a description for the entry"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          {/* Frequency */}
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            <span>Create</span>
            <IoMdAddCircleOutline />
          </button>
        </form>

        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          events={existingData
            .filter((entry: any) => entry.entryType === "income")
            .map((entry: any) => ({
              title: entry.amount,
              start: entry.date,
            }))}
        />
      </div>
    </section>
  );
}

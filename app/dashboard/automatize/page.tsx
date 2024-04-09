"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { entryTypes } from "@/app/constants/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PageHeader } from "@/components";
import { uuid } from "uuidv4";

export default function Automatize() {
  const router = useRouter();
  const [entryType, setEntryType] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>();
  const [comments, setComments] = useState<string>();
  const [frequency, setFrequency] = useState<string>("monthly");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      id: uuid(),
      entryType,
      amount,
      date,
      comments,
      frequency,
    };

    try {
      const existingData = JSON.parse(localStorage.getItem("entries") || "[]");
      existingData.push(formData);
      localStorage.setItem("entries", JSON.stringify(existingData));

      router.push("/dashboard/home");
    } catch (error) {
      console.log("An error has occured while updating entry.");
    }
  };

  const handleEventClick = (info: any) => {
    // Access the event object
    const event = info.event;
    // You can use the event object to get the event details and perform actions
    console.log(event.title, event.start);
    // Set the date to the event's start date
    setDate(event.start.toISOString().split("T")[0]);
  };

  return (
    <section className="automatize-page">
      <PageHeader
        title={"Automatize an entry"}
        subtitle={"Create an automatical entry."}
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

          {/* <button type="submit" className="submit-button">
            <span>Create</span>
            <IoMdAddCircleOutline />
          </button> */}
        </form>

        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          events={JSON.parse(localStorage.getItem("entries") || "[]")
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

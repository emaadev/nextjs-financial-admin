"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { entryTypes } from "@/app/constants/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PageHeader } from "@/components";
import { uuid } from "uuidv4";


export default function CreatePage() {
  const router = useRouter();
  const [entryType, setEntryType] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>();
  const [comments, setComments] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      id: uuid(),
      entryType,
      amount,
      date,
      comments,
    };

    try {
      // Update the actual data if there is another existing data
      const existingData = JSON.parse(localStorage.getItem("entries") || "[]");

      existingData.push(formData);
      localStorage.setItem("entries", JSON.stringify(existingData));

      router.push("/dashboard/home");
    } catch (error) {
      console.log("An error has occured while updating entry.");
    }
  };

  return (
    <section className="create-page">
      <PageHeader
        title={"Create an entry"}
        subtitle={"Select the type of the entry and create it."}
      />

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
          <label htmlFor="amount">Amount ($ ARS / USD)</label>

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
            type="datetime-local"
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
            placeholder="Insert a description of the entry"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          <span>Create</span>
          <IoMdAddCircleOutline />
        </button>
      </form>
    </section>
  );
}

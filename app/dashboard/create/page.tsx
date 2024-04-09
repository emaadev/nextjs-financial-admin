"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { entryTypes } from "@/app/constants/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PageHeader, Spinner } from "@/components";
import { uuid } from "uuidv4";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();

  const [entryType, setEntryType] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>();
  const [comments, setComments] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

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

      toast.success("Amount created successfully!");
      router.push("/dashboard/home");
    } catch (error) {
      toast.error("An error has occured while updating entry.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (entryType && amount && date && comments) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [amount, comments, date, entryType]);

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
          <label htmlFor="amount">Amount ($ USD)</label>

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
            placeholder="Insert a description for the entry"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${isDisabled && "opacity-60"}`}
          disabled={isDisabled && isLoading}
        >
          <span>Create</span>
          {isLoading ? <Spinner /> : <IoMdAddCircleOutline />}
        </button>
      </form>
    </section>
  );
}

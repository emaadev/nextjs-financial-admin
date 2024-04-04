"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components";
import { entryTypes } from "@/app/constants/data";
import { IoMdAddCircleOutline, IoMdSave } from "react-icons/io";
import { ImExit } from "react-icons/im";
import Loading from "@/components/shared/Loading";

interface Entry {
  id: string;
  entryType: string;
  amount: number;
  date: string;
  comments: string;
}

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    const entryToEdit = entries.find((entry: Entry) => entry.id === id);
    setEntry(entryToEdit);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry) return;

    const updatedEntries = JSON.parse(
      localStorage.getItem("entries") || "[]"
    ).map((e: Entry) => (e.id === id ? entry : e));
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    router.push("/dashboard/home");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEntry((prevEntry) =>
      prevEntry ? { ...prevEntry, [name]: value } : null
    );
  };

  if (!entry) return <Loading />;

  return (
    <section className="edit-page">
      <PageHeader
        title={"Edit Movement"}
        subtitle={"Edit the entry selected."}
      />

      <form className="entry-form" onSubmit={handleSubmit}>
        {/* Entry Type of the Amount */}
        <div className="form-group">
          <label htmlFor="type">Type</label>

          <div id="type" className="type-selector">
            {entryTypes.map((item) => (
              <button
                key={item.value}
                className={entry.entryType === item.value ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setEntry((prevEntry) =>
                    prevEntry ? { ...prevEntry, entryType: item.value } : null
                  );
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
            name="amount"
            placeholder="20000"
            value={entry.amount}
            onChange={handleInputChange}
          />
        </div>

        {/* Date of creation */}
        <div className="form-group">
          <label htmlFor="date">Date</label>

          <input
            type="datetime-local"
            id="date"
            name="date"
            value={entry.date}
            onChange={handleInputChange}
          />
        </div>

        {/* Description of the inserted amount */}
        <div className="form-group">
          <label htmlFor="comments">Comments</label>

          <textarea
            id="comments"
            name="comments"
            placeholder="Insert a description of the entry"
            value={entry.comments}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-start items-center gap-4">
          <button type="submit" className="submit-button">
            <span>Save</span>
            <IoMdSave />
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={() => router.push("dashboard/history")}
          >
            Cancel
            <ImExit />
          </button>
        </div>
      </form>
    </section>
  );
}

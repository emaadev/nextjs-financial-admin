import formatTime from "@/app/lib/formatTime";
import Link from "next/link";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface HistoryTableProps {
  entries: any;
  title: string;
  onDelete: (id: string) => any;
}

const HistoryTable = ({ entries, onDelete, title }: HistoryTableProps) => {
  return (
    <div className="history-table">
      <h2>{title}</h2>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry: any) => (
            <tr key={entry.id} className={entry.entryType}>
              <td>{formatTime(entry.date)}</td>
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
  );
};

export default HistoryTable;

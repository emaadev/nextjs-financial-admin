import formatTime from "@/app/lib/formatTime";

const HistorySummary = ({ entries }: any) => {
  return (
    <div className="history-summary">
      <span>History Summary</span>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry: any, index: any) => (
            <tr key={index} className={entry.entryType}>
              <td>{formatTime(entry.date)}</td>
              <td>
                {entry.entryType === "expense" ? "-" : "+"} ${entry.amount}
              </td>
              <td>{entry.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorySummary;

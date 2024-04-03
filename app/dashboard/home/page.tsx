import { InfoBox, Navbar } from "@/components";

export default function DashboardPage() {
  return (
    <section className="dashboard-page">
      <Navbar />

      <div className="tracker-container">
        <InfoBox count={400} type={"incomes"} />
        <InfoBox count={50500} type={"expenses"} />
        <InfoBox count={12000} type={"savings"} />
        <InfoBox count={5050} type={"investments"} />
      </div>
    </section>
  );
}

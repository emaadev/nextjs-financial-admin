import { PageHeader } from "@/components";

export default function ExpensesPage() {
  return (
    <section className="expenses-page">
      <PageHeader
        title={"Expenses"}
        subtitle={"All expenses along the year."}
      />
    </section>
  );
}

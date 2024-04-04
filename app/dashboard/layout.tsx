"use client";

import { Navigation } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dashboard">
      <Navigation />

      <section className="dashboard-container">{children}</section>
    </main>
  );
}

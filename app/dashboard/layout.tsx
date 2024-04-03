"use client";

import ActiveNavbarContextProvider from "@/context/ActiveNavbarContext";

import { Navigation } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dashboard">
      <ActiveNavbarContextProvider>
        <Navigation />

        <section className="dashboard-container">{children}</section>
      </ActiveNavbarContextProvider>
    </main>
  );
}

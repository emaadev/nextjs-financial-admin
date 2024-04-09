"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import { Loading, Navigation } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <main className="dashboard">
      <Navigation />

      {loading ? (
        <Loading />
      ) : (
        <section className="dashboard-container">{children}</section>
      )}

      <Toaster />
    </main>
  );
}

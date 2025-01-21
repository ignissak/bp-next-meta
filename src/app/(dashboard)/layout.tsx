import DashboardNavbar from "@/components/new/layouts/dashboard-navbar";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Learn AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar items={[]} />
      {children}
    </>
  );
}

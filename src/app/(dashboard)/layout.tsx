import DashboardNavbar from "@/components/new/layouts/dashboard-navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Learn AI",
  description: "",
};

const items = [
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Glossary",
    href: "/glossary",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Homepage",
    href: "/",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <DashboardNavbar items={items} />
      {children}
    </TooltipProvider>
  );
}

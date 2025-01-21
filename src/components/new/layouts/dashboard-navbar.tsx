"use client";
import { observer } from "@legendapp/state/react";

export type DashboardNavbarItem = {
  title: string;
  href: string;
};

const DashboardNavbar = observer(
  ({ items }: { items: DashboardNavbarItem[] }) => {
    return <></>;
  }
);

export default DashboardNavbar;

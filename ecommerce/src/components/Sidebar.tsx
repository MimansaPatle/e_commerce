// src/components/SidebarLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const noSidebarRoutes = ["/login", "/register"];

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is one of the "no-sidebar" pages
  const hideSidebar = noSidebarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar children={undefined} />}
      <main className="flex-1 p-4 bg-gray-100 dark:bg-zinc-950 min-h-screen">
        {children}
      </main>
    </div>
  );
}

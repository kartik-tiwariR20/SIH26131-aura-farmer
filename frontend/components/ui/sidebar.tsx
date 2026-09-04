"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex min-h-screen w-full">{children}</div>;
};

export const SidebarContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <aside className={cn("w-64 border-r bg-background", className)} {...props}>
      {children}
    </aside>
  );
};

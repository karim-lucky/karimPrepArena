"use client";

import { ReactNode } from "react";
 
import Sidebar from "../../components/Sidebar";
import { Toaster } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main content area */}
      <main className="flex-1 p-6   overflow-y-auto">
        {children}
          <Toaster richColors position="top-right" />
      </main>
    </div>
  );
};

export default AdminLayout;

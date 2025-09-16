"use client";

import { ReactNode } from "react";
 
import Sidebar from "../../components/Sidebar";

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
      </main>
    </div>
  );
};

export default AdminLayout;

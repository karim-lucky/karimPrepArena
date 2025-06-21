"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
 import { cn } from "../app/lib/utils";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Award,
  User,
  Settings,
  Wallet,
  History,
  Users,
  BookCheck,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const studentItems: SidebarItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Available Tests", href: "/dashboard/student/avaliableTest", icon: FileText },
  { title: "My Enrollments", href: "/dashboard/student/enrolment", icon: CheckSquare },
  { title: "Test History", href: "/dashboard/studnet/history", icon: History },
  { title: "My Achievements", href: "/dashboard/studnet/achievements", icon: Award },
  { title: "Payments", href: "/dashboard/student/studentPayment", icon: Wallet },
  { title: "Profile", href: "/dashboard/student/profile", icon: User },
  { title: "Settings", href: "/dashboard/student/studentSetting", icon: Settings },
];

const adminItems: SidebarItem[] = [
  { title: "Admin Dashboard", href: "/dashboard/admin/admin-dashboard", icon: LayoutDashboard },
  { title: "Manage Tests", href: "/dashboard/admin/adminTests", icon: FileText },
  { title: "Enrollment Approvals", href: "/dashboard/admin/adminApprovals", icon: CheckSquare },
  { title: "Students", href: "/dashboard/admin/adminStudents", icon: Users },
  { title: "Results & Reports", href: "/dashboard/admin/adminReports", icon: BookCheck },
  { title: "Payments", href: "/dashboard/admin/adminPayments", icon: Wallet },
  { title: "Settings", href: "/dashboard/admin/adminSetting", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-[250px] flex-col border-r bg-background p-4">
      <div className="flex flex-col gap-2">
        {studentItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}

        <div className="mt-4 border-t pt-4 text-xs font-semibold text-muted-foreground uppercase">
          Admin Panel
        </div>

        {adminItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

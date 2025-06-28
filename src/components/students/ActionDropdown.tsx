"use client";
import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  User,
  FileText,
  Mail,
  BadgeCheck,
  Ban,
} from "lucide-react";

const ActionDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-muted rounded"
      >
        <MoreHorizontal className="w-4 h-4" />
        <span className="sr-only">Open menu</span>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-10">
          <li className="px-4 py-2 text-sm text-center text-muted-foreground font-semibold border-b">
            Actions
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            View Profile
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer">
            <FileText className="w-4 h-4" />
            Test History
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer">
            <Mail className="w-4 h-4" />
            Send Message
          </li>
          <li className="border-t" />
          <li className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer">
            <BadgeCheck className="w-4 h-4" />
            Verify Account
          </li>
          <li className="hover:bg-red-100 text-red-600 px-4 py-2 flex items-center gap-2 cursor-pointer">
            <Ban className="w-4 h-4" />
            Suspend Account
          </li>
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;

// src/app/components/ThemeProvider.tsx
"use client";

import { useTheme } from "@/app/lib/hooks/useTheme";

  // adjust path as needed


export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  return <>{children}</>;
}
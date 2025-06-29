import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./lib/auth-context";
import Navbar from "../components/Navbar";
// import "./globals.css";

 

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body
        
      >
        <AuthProvider>
          <Navbar></Navbar>

        {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import { Lato } from "next/font/google";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

const lato = Lato({
  weight: ["300", "400", "700", "900"], // Include multiple weights
  subsets: ["latin"], // Optimize character subset
  display: "swap", // Ensures text is visible during font loading
  variable: "--font-lato", // Optional: for Tailwind CSS integration
});
export const metadata: Metadata = {
  title: "Al Ghani Foundation",
  description: "Al Ghani Foundation is a non-profit organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased`}
        suppressHydrationWarning
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

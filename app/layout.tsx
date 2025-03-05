import type { Metadata } from "next";

import "./globals.css";
import { Lato, Raleway } from "next/font/google";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { TSetting } from "@/interfaces";

const lato = Raleway({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});
export const metadata: Metadata = {
  title: "Al Ghani Foundation",
  description: "Al Ghani Foundation is a non-profit organization.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await directus.request(readSingleton("settings"));

  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased `}
        suppressHydrationWarning
      >
        <NavBar settings={settings as TSetting} />
        <div className="min-h-[80vh]">{children}</div>
        <Footer settings={settings as TSetting} />
      </body>
    </html>
  );
}

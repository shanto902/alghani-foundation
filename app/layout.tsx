import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Lato, Raleway } from "next/font/google";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { TSetting } from "@/interfaces";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";
const lato = Raleway({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Al Ghani Foundation",
    default: "Al Ghani Foundation is a non-profit organization.", // a default is required when creating a template
  },
};
export const viewport: Viewport = {
  themeColor: "#045857",
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
        <NextTopLoader
          color="#045857"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />
        <NavBar settings={settings as TSetting} />

        <div className="min-h-[80vh]">{children}</div>
        <Footer settings={settings as TSetting} />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}

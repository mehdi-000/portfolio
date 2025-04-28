import type { Metadata } from "next";
import "./globals.css";
import { Heebo } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/app/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/app/utils/providers";
import { PostHogProvider } from "@/app/utils/ph-providers";

const heebo = Heebo({ subsets: ["latin"], variable: "--font-heebo" });
const iBMPlexSans = IBM_Plex_Sans({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-iBMPlexSans",
});
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-ubuntu",
});

const pPMonumentExtendedBlack = localFont({
  src: "./fonts/PPMonumentExtendedBlack.woff",
  variable: "--font-pPMonumentExtended-Black",
});

export const metadata: Metadata = {
  title: "Portfolio Page",
  description: "The interactive Portfolio Page by Mehdi Popal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pPMonumentExtendedBlack.variable} ${ubuntu.variable} ${heebo.variable} ${iBMPlexSans.variable} antialiased bg-black`}
      >
        <Providers>
          <PostHogProvider>{children}</PostHogProvider>
        </Providers>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}

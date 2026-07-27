import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "QuizGen",
  description: "Application Web AI Quiz Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning={true}
      lang="en"
      translate="no"
      className={`${poppins.variable} notranslate  h-full antialiased bg-brand-primary`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children} <Analytics />
      </body>
    </html>
  );
}

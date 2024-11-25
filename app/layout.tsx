import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Burger Xpress",
  description: "Fast food restaurant in the heart of the city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} ${geistSans.variable} ${geistMono.variable} flex justify-center bg-background px-12 py-6 antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

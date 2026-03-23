import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Bebas_Neue, Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ['400'],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apollo Fitness Studio — Your Strength, Our Focus",
  description: "Expert-led functional fitness in Maidenhead. Max 8 per class. No mirrors. No egos. Just progress. First week free.",
  keywords: ["fitness", "gym", "maidenhead", "functional fitness", "strength training", "personal training"],
  authors: [{ name: "Apollo Fitness Studio" }],
  openGraph: {
    title: "Apollo Fitness Studio — Your Strength, Our Focus",
    description: "Expert-led functional fitness in Maidenhead. Max 8 per class. No mirrors. No egos. Just progress. First week free.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${oswald.variable} ${bebasNeue.variable} min-h-screen bg-apollo-black font-sans text-apollo-text antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
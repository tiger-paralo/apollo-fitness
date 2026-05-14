import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Bebas_Neue } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SplashScreen } from "@/components/splash-screen";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical inline styles — renders before JS bundle, prevents FOUC */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { background: #0A0A0A; }
          .splash-noscript { position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#0A0A0A; }
          .splash-noscript img { width:80px;height:80px;animation:splash-pulse 2s ease-in-out infinite; }
          @keyframes splash-pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        `}} />
        {/* No-JS fallback splash — hidden once React hydrates */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `.splash-noscript{display:none!important}` }} />
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${bebasNeue.variable} min-h-screen bg-apollo-black font-sans text-apollo-text antialiased overflow-x-hidden`}
      >
        <SplashScreen>{children}</SplashScreen>
        <Analytics />
      </body>
    </html>
  );
}

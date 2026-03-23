import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhyDifferent } from "@/components/why-different";
import { Programs } from "@/components/programs";
import { Coaches } from "@/components/coaches";
import { Schedule } from "@/components/schedule";
import { Footer } from "@/components/footer";
import { MobileCTA } from "@/components/mobile-cta";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyDifferent />
        <Programs />
        <Coaches />
        <Schedule />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
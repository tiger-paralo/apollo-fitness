import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhyDifferent } from "@/components/why-different";
import { Marquee } from "@/components/marquee";
import { Programs } from "@/components/programs";
import { Coaches } from "@/components/coaches";
import { Schedule } from "@/components/schedule";
import { Pricing } from "@/components/pricing";
import { TrialForm } from "@/components/trial-form";
import { InstagramFeed } from "@/components/instagram-feed";
import { Location } from "@/components/location";
import { Footer } from "@/components/footer";
import { MobileCTA } from "@/components/mobile-cta";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  getHero,
  getCoaches,
  getPrograms,
  getSchedule,
  getPricing,
  getSiteInfo,
} from "@/lib/content";
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

export default async function HomePage(): Promise<ReactNode> {
  const [heroData, coaches, programs, scheduleData, pricingData, siteInfo] = await Promise.all([
    getHero(),
    getCoaches(),
    getPrograms(),
    getSchedule(),
    getPricing(),
    getSiteInfo(),
  ]);

  return (
    <>
      <Header siteInfo={siteInfo} />
      <main className="flex-1">
        <Hero data={heroData} />
        <WhyDifferent />
        <InstagramFeed siteInfo={siteInfo} />
        <Marquee />
        <Programs programs={programs} />
        <Coaches coaches={coaches} />
        <Schedule data={scheduleData} />
        <Pricing data={pricingData} />
        <Location siteInfo={siteInfo} />
        <TrialForm />
      </main>
      <Footer siteInfo={siteInfo} />
      <MobileCTA />
      <WhatsAppFloat siteInfo={siteInfo} />
    </>
  );
}

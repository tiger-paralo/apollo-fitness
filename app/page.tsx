import { About } from "@/components/apollo-about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/apollo-footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/apollo-header";
import { Hero } from "@/components/apollo-hero";
import { Services } from "@/components/apollo-services";
import { Video } from "@/components/video";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} - Your Strength, Our Focus`,
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <main id="main-content" className="lg:relative lg:z-10 flex-1 bg-background">
        <Hero />
        <About />
        <Gallery />
        <Video />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

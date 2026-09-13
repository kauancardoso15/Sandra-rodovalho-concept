import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { JourneySection } from "@/components/home/JourneySection";
import { OffersSection } from "@/components/home/OffersSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { AboutSection } from "@/components/home/AboutSection";
import { getCategories, getNewArrivals, getOffers, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Moda feminina com essência. Descubra vestidos, conjuntos, blusas e acessórios com elegância e sofisticação. Compre pelo WhatsApp.",
};

export default async function HomePage() {
  const [settings, newArrivals, offers, categories] = await Promise.all([
    getSettings(),
    getNewArrivals(8),
    getOffers(4),
    getCategories(),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <JourneySection />
      <NewArrivalsSection products={newArrivals} />
      <CategoriesSection categories={categories} />
      <OffersSection products={offers} />
      <InstagramSection settings={settings} />
      <AboutSection settings={settings} />
    </>
  );
}

import AccommodationsPreview from "@/components/sections/accommodations-preview";
import AboutTeaser from "@/components/sections/about-teaser";
import EventsTeaser from "@/components/sections/events-teaser";
import Hero from "@/components/sections/hero";
import IntroStrip from "@/components/sections/intro-strip";
import Location from "@/components/sections/location";
import SocialProofStrip from "@/components/sections/social-proof-strip";
import Testimonials from "@/components/sections/testimonials";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Estaleiro Village | Pousada à Beira-Mar em Balneário Camboriú",
  description:
    "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC. 30 anos de história, natureza e tranquilidade à beira-mar.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <IntroStrip />
      <AccommodationsPreview />
      <AboutTeaser />
      <EventsTeaser />
      <Testimonials />
      <Location />
    </>
  );
}
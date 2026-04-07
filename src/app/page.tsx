import AccommodationsPreview from "@/components/sections/accommodations-preview";
import AboutTeaser from "@/components/sections/about-teaser";
import EventsTeaser from "@/components/sections/events-teaser";
import Hero from "@/components/sections/hero";
import IntroStrip from "@/components/sections/intro-strip";
import Location from "@/components/sections/location";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStrip />
      <AccommodationsPreview />
      <AboutTeaser />
      <EventsTeaser />
      <Testimonials />
      <Location />
    </>
  );
}

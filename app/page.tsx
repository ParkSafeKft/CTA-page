import Nav from "./components/Nav";
import TopMarquee from "./components/TopMarquee";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import POITypes from "./components/POITypes";
import MapShowcase from "./components/MapShowcase";
import Features from "./components/Features";
import Fitness from "./components/Fitness";
import Social from "./components/Social";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <TopMarquee />
      <Hero />
      <Stats />
      <POITypes />
      <MapShowcase />
      <Features />
      <Fitness />
      <Social />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}

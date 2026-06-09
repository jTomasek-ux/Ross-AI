import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import PitchSection from "@/components/PitchSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Navbar variant="transparent" />
      <Hero />
      <FeatureSection />
      <PitchSection />
      <Footer />
    </div>
  );
}

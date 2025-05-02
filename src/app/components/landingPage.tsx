
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
 
import CallToAction from "./CallToAction";
 
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;

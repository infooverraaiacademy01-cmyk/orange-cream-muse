import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueSection from "@/components/ValueSection";
import WhoWeSupport from "@/components/WhoWeSupport";
import ServicesSection from "@/components/ServicesSection";
import LearningFormat from "@/components/LearningFormat";
import WhyChooseUs from "@/components/WhyChooseUs";
import ResultsSection from "@/components/ResultsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PrivacyPopup from "@/components/PrivacyPopup";
import Chatbot from "@/components/Chatbot";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ValueSection />
        <WhoWeSupport />
        <ServicesSection />
        <LearningFormat />
        <WhyChooseUs />
        <ResultsSection />
        <TestimonialsSection />
        <GallerySection />
        <TrustSection />
        <CTASection />
        <Footer />
        <PrivacyPopup />
        <Chatbot />
      </div>
    </PageTransition>
  );
};

export default Index;

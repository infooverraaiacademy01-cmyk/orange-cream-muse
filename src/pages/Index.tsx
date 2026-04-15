import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueSection from "@/components/ValueSection";
import WhoWeSupport from "@/components/WhoWeSupport";
import ServicesSection from "@/components/ServicesSection";
import LearningFormat from "@/components/LearningFormat";
import WhyChooseUs from "@/components/WhyChooseUs";
import ResultsSection from "@/components/ResultsSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PrivacyPopup from "@/components/PrivacyPopup";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValueSection />
      <WhoWeSupport />
      <ServicesSection />
      <LearningFormat />
      <WhyChooseUs />
      <ResultsSection />
      <TrustSection />
      <CTASection />
      <Footer />
      <PrivacyPopup />
      <Chatbot />
    </div>
  );
};

export default Index;

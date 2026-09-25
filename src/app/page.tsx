import HeroSection from "@/components/HeroSection";
import AboutStatsSection from "@/components/AboutStatsSection";
import TickerSection from "@/components/TickerSection";
import ServicesSection from "@/components/ServicesSection";
import InsideSection from "@/components/InsideSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DoctorsSection from "@/components/DoctorsSection";
import WhyDentelioSection from "@/components/WhyDentelioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutStatsSection />
      <TickerSection />
      <ServicesSection />
      <InsideSection />
      <HowItWorksSection />
      <DoctorsSection />
      <WhyDentelioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

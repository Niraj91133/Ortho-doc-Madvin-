import ServicesSection from "@/components/ServicesSection";
import WhyDentelioSection from "@/components/WhyDentelioSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <ServicesSection />
      <HowItWorksSection />
      <WhyDentelioSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

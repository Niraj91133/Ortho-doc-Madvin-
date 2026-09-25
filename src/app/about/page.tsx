import AboutStatsSection from "@/components/AboutStatsSection";
import WhyDentelioSection from "@/components/WhyDentelioSection";
import InsideSection from "@/components/InsideSection";
import DoctorsSection from "@/components/DoctorsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <AboutStatsSection />
      <WhyDentelioSection />
      <InsideSection />
      <DoctorsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

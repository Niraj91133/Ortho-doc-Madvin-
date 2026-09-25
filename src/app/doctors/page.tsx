import DoctorsSection from "@/components/DoctorsSection";
import WhyDentelioSection from "@/components/WhyDentelioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <DoctorsSection />
      <WhyDentelioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

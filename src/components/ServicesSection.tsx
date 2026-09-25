"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useModal } from "@/context/ModalContext";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Activity,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { openBooking } = useModal();
  const { services } = DENTELIO_DATA;
  const currentService = services[activeTab];

  return (
    <section id="services" className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Header with Scroll Motion Blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="space-y-3 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b5660]/10 text-[#0b5660] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>ORTHOPEDIC SPECIALTIES & SURGICAL EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold font-heading text-[#132424] tracking-tight leading-tight">
            Treatment plans made for active, painless living.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            From computer-assisted robotic joint replacements to minimally invasive keyhole spine surgeries, Dr. Vinod Kumar applies advanced orthopedic technology for rapid healing.
          </p>
        </motion.div>

        {/* Interactive Layout: Left Tabs & Right Service Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Tabs with Frame by Frame Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {services.map((service, index) => {
              const isActive = activeTab === index;
              return (
                <motion.button
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  onClick={() => setActiveTab(index)}
                  className={`w-full py-4 px-5 sm:px-6 rounded-2xl text-left font-heading text-base sm:text-lg font-bold flex items-center justify-between transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "bg-gradient-to-r from-[#0b5660] to-[#083c45] text-white shadow-xl scale-[1.02] border-l-4 border-[#a7e8ec]"
                      : "bg-white text-[#132424] hover:bg-[#eef3f4] hover:translate-x-1 border border-brand-border/80 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isActive ? "bg-white/15 text-[#a7e8ec]" : "bg-gray-100 text-gray-400 group-hover:text-[#0b5660]"
                    }`}>
                      0{index + 1}
                    </span>
                    <span>{service.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? "text-[#a7e8ec] translate-x-1" : "text-gray-400 group-hover:text-[#0b5660]"
                    }`}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right Service Content Preview with AnimatePresence Blur Transition */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 20, filter: "blur(12px)", scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xl flex flex-col gap-6"
              >
                {/* Image Container with Badges */}
                <div className="relative w-full h-64 sm:h-80 lg:h-[360px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner group">
                  <Image
                    src={currentService.image}
                    alt={currentService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-[#132424]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#a7e8ec] flex items-center gap-1.5 border border-white/10 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Robotic & Minimally Invasive Care</span>
                  </div>

                  {/* Bottom Surgeon in Charge Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-medium">
                      Lead Surgeon: <strong>Dr. Vinod Kumar (MS Ortho)</strong>
                    </span>
                    <span className="hidden sm:inline bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-bold">
                      Same-Day Rehab
                    </span>
                  </div>
                </div>

                {/* Service Details & Action */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#132424]">
                        {currentService.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#0b5660] mt-0.5">
                        {currentService.tagline}
                      </p>
                    </div>
                    <button
                      onClick={() => openBooking(currentService.title)}
                      className="px-6 py-3 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-bold rounded-full flex items-center gap-2 shadow-md hover:shadow-xl transition-all active:scale-95"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {currentService.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-3 border-t border-brand-border/60 space-y-2.5">
                    {currentService.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#132424] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0b5660] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust Footer */}
                  <div className="pt-2 flex items-center gap-4 text-xs text-brand-muted font-medium">
                    <span className="flex items-center gap-1 text-[#0b5660]">
                      <ShieldCheck className="w-4 h-4" /> Cashless TPA / Mediclaim Available
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" /> Prior Booking Recommended
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

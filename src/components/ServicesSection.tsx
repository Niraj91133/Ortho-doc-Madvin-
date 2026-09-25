"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useModal } from "@/context/ModalContext";
import { CornerDownRight, Check, ArrowRight, Sparkles } from "lucide-react";
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
          className="space-y-3"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            ORTHOPEDIC SPECIALTIES & SURGICAL EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold font-heading text-[#132424] tracking-tight">
            Treatment plans made for real life.
          </h2>
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
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="lg:col-span-5 flex flex-col gap-3.5"
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
                  className={`w-full py-4 sm:py-5 px-6 rounded-2xl text-left font-heading text-lg sm:text-xl font-bold flex items-center gap-3.5 transition-all duration-300 ${
                    isActive
                      ? "bg-[#0b5660] text-white shadow-lg scale-[1.02]"
                      : "bg-[#eef3f4] text-[#132424] hover:bg-[#e2eaec] hover:translate-x-1"
                  }`}
                >
                  <CornerDownRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isActive ? "text-[#a7e8ec] rotate-0" : "text-[#132424]/40"
                    }`}
                  />
                  <span>{service.title}</span>
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
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-md flex flex-col gap-6"
              >
                {/* Image Container */}
                <div className="relative w-full h-64 sm:h-80 lg:h-[380px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  <Image
                    src={currentService.image}
                    alt={currentService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#132424]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#a7e8ec] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Robotic & Minimally Invasive</span>
                  </div>
                </div>

                {/* Service Info */}
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
                      className="px-5 py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-semibold rounded-full flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95 hover:scale-105"
                    >
                      Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {currentService.description}
                  </p>

                  {/* Key Points */}
                  <div className="pt-3 border-t border-brand-border/60 space-y-2.5">
                    {currentService.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#132424] font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#0b5660]/10 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#0b5660]" />
                        </div>
                        <span>{pt}</span>
                      </div>
                    ))}
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

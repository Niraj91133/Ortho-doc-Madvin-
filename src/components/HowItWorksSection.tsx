"use client";

import React from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Stethoscope, Activity, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const { howItWorks } = DENTELIO_DATA;

  const iconMap: Record<string, React.ReactNode> = {
    calendar: <Stethoscope className="w-5 h-5 text-[#0b5660]" />,
    user: <Activity className="w-5 h-5 text-[#0b5660]" />,
    sparkles: <Sparkles className="w-5 h-5 text-[#0b5660]" />,
  };

  return (
    <section className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Title with Blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            {howItWorks.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold font-heading text-[#132424] tracking-tight leading-tight">
            {howItWorks.heading}
          </h2>
        </motion.div>

        {/* 3 Step Bento Grid with Staggered Frame-by-Frame Motion Blur */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.16, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {howItWorks.steps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 group cursor-default"
            >
              {/* Photo */}
              <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Card */}
              <div className="bg-[#0b5660] text-white p-7 sm:p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-md group-hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform">
                  {iconMap[step.icon]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

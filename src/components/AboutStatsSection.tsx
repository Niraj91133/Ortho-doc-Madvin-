"use client";

import React from "react";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Star, Award, Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutStatsSection() {
  const { approach } = DENTELIO_DATA;

  const statIcons = [
    <Star key="star" className="w-5 h-5 text-amber-500 fill-amber-500" />,
    <Activity key="activity" className="w-5 h-5 text-[#0b5660]" />,
    <Award key="award" className="w-5 h-5 text-[#0b5660]" />,
  ];

  return (
    <section id="about" className="bg-[#0b5660] text-white py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Approach Box with Scroll Blur Motion */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 p-8 sm:p-10 lg:p-12 rounded-3xl border border-white/20 bg-white/[0.04] backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a7e8ec]/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#a7e8ec] uppercase mb-4 block">
            {approach.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold font-heading leading-tight text-white max-w-xl">
            {approach.heading}
          </h2>
          <div className="pt-6 flex flex-wrap items-center gap-3 text-xs text-white/80">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a7e8ec]" /> NABH Standard Trauma Care
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Gaya, Bihar
            </span>
          </div>
        </motion.div>

        {/* Right Side: 3 Stacked White Metric Cards with Staggered Frame-by-Frame Blur */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {approach.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="bg-[#fafaf7] text-[#132424] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex items-center justify-between shadow-md hover:shadow-2xl transition-all duration-200 cursor-default border border-white/60"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#0b5660]/10">
                    {statIcons[idx]}
                  </div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0b5660]">
                    {stat.value}
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted text-right max-w-[150px] leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

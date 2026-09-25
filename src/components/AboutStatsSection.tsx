"use client";

import React from "react";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { motion } from "framer-motion";

export default function AboutStatsSection() {
  const { approach } = DENTELIO_DATA;

  return (
    <section id="about" className="bg-[#0b5660] text-white py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Approach Box with Scroll Blur Motion */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 p-8 sm:p-10 lg:p-12 rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-sm"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#a7e8ec] uppercase mb-4 block">
            {approach.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold font-heading leading-tight text-white max-w-xl">
            {approach.heading}
          </h2>
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
              transition: { staggerChildren: 0.18, delayChildren: 0.1 },
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
              className="bg-[#fafaf7] text-[#132424] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex items-center justify-between shadow-md hover:shadow-xl transition-all duration-200 cursor-default"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0b5660]">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base font-semibold text-brand-muted text-right max-w-[140px] sm:max-w-[160px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

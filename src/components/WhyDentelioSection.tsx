"use client";

import React from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Crosshair, Zap, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyDentelioSection() {
  const { whyDentelio } = DENTELIO_DATA;

  const iconMap: Record<string, React.ReactNode> = {
    heart: <Crosshair className="w-6 h-6 text-[#0b5660]" />,
    sparkles: <Zap className="w-6 h-6 text-[#0b5660]" />,
    shield: <ShieldAlert className="w-6 h-6 text-[#0b5660]" />,
  };

  return (
    <section className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Title with Motion Blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            {whyDentelio.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold font-heading text-[#132424] tracking-tight leading-tight">
            Advanced orthopedic care<br />designed around you.
          </h2>
        </motion.div>

        {/* 2x2 Photo Grid with Motion Blur */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {whyDentelio.images.map((imgUrl, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.94, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-md bg-gray-100 group"
            >
              <Image
                src={imgUrl}
                alt={`Why Madvin Hospital clinical infrastructure ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 3 Feature Benefit Cards Below with Frame-by-Frame Stagger */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {whyDentelio.features.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-brand-teal/15 shadow-sm hover:shadow-xl hover:border-brand-teal/35 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0b5660]/10 flex items-center justify-center">
                {iconMap[feat.icon]}
              </div>
              <div className="space-y-2.5">
                <h3 className="text-xl font-bold font-heading text-[#132424]">
                  {feat.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function InsideSection() {
  const { inside } = DENTELIO_DATA;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#fafaf7] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left Title with Motion Blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            {inside.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold font-heading text-[#132424] tracking-tight leading-[1.15]">
            World-class surgical care.<br />Comfort you can trust.
          </h2>
        </motion.div>

        {/* Right navigation / drag hint */}
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-semibold text-[#0b5660] tracking-wide hidden sm:inline">
            {inside.instruction}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-3 rounded-full border border-[#0b5660]/30 hover:bg-[#0b5660] text-[#0b5660] hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3 rounded-full border border-[#0b5660]/30 hover:bg-[#0b5660] text-[#0b5660] hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel with Motion Blur Stagger */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="flex gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-12 pb-6 cursor-grab active:cursor-grabbing select-none"
      >
        {inside.images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="relative shrink-0 w-[290px] sm:w-[390px] lg:w-[450px] h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
          >
            <Image
              src={img.url}
              alt={img.caption || `Inside Madvin Hospital facility ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 290px, (max-width: 1024px) 390px, 450px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
              <p className="text-white text-sm sm:text-base font-semibold leading-snug drop-shadow-md">
                {img.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

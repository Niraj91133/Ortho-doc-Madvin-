"use client";

import React from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useModal } from "@/context/ModalContext";
import { motion } from "framer-motion";

export default function CTASection() {
  const { cta } = DENTELIO_DATA;
  const { openBooking } = useModal();

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 flex items-center justify-center overflow-hidden">
      {/* Background Image Container with Motion Parallax / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cta.bgImage}
          alt="Madvin Hospital Orthopedic Care"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Deep teal overlay */}
        <div className="absolute inset-0 bg-[#0b5660]/85 backdrop-blur-[2px]" />
      </div>

      {/* Content with Scroll Motion Blur */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center text-white space-y-6"
      >
        <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#a7e8ec] uppercase block">
          {cta.badge}
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold font-heading leading-tight tracking-tight text-white">
          {cta.heading}
        </h2>

        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto font-normal leading-relaxed">
          {cta.description}
        </p>

        <div className="pt-2">
          <button
            onClick={() => openBooking()}
            className="px-8 py-4 bg-[#fafaf7] hover:bg-white text-[#132424] font-bold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 hover:scale-105"
          >
            {cta.buttonText}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

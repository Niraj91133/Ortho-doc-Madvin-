"use client";

import React from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useModal } from "@/context/ModalContext";
import { Phone, Calendar, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  const { cta, phone, address } = DENTELIO_DATA;
  const { openBooking } = useModal();

  return (
    <section className="relative py-24 sm:py-32 lg:py-36 flex items-center justify-center overflow-hidden">
      {/* Background Image Container with Motion Parallax / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cta.bgImage}
          alt="Madvin Hospital Orthopedic Care"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Deep teal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660]/95 via-[#0b5660]/90 to-[#083c45]/95" />
      </div>

      {/* Content with Scroll Motion Blur */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center text-white space-y-6"
      >
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider text-[#a7e8ec]">
          <ShieldCheck className="w-4 h-4" />
          <span>{cta.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold font-heading leading-tight tracking-tight text-white">
          {cta.heading}
        </h2>

        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto font-normal leading-relaxed">
          {cta.description}
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
          <button
            onClick={() => openBooking()}
            className="px-8 py-4 bg-[#fafaf7] hover:bg-white text-[#132424] font-bold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 hover:scale-105 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#0b5660]" />
            <span>{cta.buttonText}</span>
          </button>

          <a
            href={`tel:${phone}`}
            className="px-7 py-4 bg-red-600/90 hover:bg-red-600 text-white font-bold text-sm sm:text-base rounded-full shadow-xl transition-all duration-200 active:scale-95 hover:scale-105 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Emergency 24x7: {phone}</span>
          </a>
        </div>

        {/* Address Chip */}
        <div className="pt-2 text-xs text-white/75 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#a7e8ec]" />
          <span>{address}</span>
        </div>
      </motion.div>
    </section>
  );
}

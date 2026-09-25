"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Star, ShieldCheck, Activity, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { openBooking } = useModal();
  const { hero } = DENTELIO_DATA;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-32 pb-16 lg:py-0 overflow-hidden">
      {/* Background Image Container with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.bgImage}
          alt="Madvin Orthopedic Operation Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660]/92 via-[#0b5660]/75 to-transparent sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="max-w-2xl text-white space-y-6 lg:space-y-7"
        >
          {/* Badge with Motion Blur */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
            }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15"
          >
            <Activity className="w-3.5 h-3.5 text-[#a7e8ec]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#a7e8ec] uppercase">
              {hero.badge}
            </span>
          </motion.div>

          {/* Heading with Frame by Frame Motion Blur */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-4xl sm:text-5xl lg:text-[66px] font-extrabold font-heading tracking-tight leading-[1.08] text-white"
          >
            Pain-free movement,<br className="hidden sm:inline" /> in expert hands.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75 } },
            }}
            className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-xl"
          >
            {hero.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75 } },
            }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <button
              onClick={() => openBooking()}
              className="px-7 py-3.5 bg-[#fafaf7] hover:bg-white text-[#132424] font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-2xl transition-all duration-200 active:scale-95 hover:scale-105"
            >
              {hero.primaryCta}
            </button>
            <Link
              href="#services"
              className="px-7 py-3.5 bg-[#0b5660]/80 hover:bg-[#0b5660] text-white font-semibold text-sm sm:text-base rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 border border-white/20 hover:border-white/40"
            >
              {hero.secondaryCta}
            </Link>
          </motion.div>

          {/* Social Proof & Trust Badges */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
            }}
            className="flex flex-wrap items-center gap-6 pt-3 text-xs sm:text-sm text-white/90 font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-300 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span>{hero.trustText}</span>
            </div>

            <div className="flex items-center gap-2 text-white/80 border-l border-white/20 pl-4 hidden sm:flex">
              <ShieldCheck className="w-4 h-4 text-[#a7e8ec]" />
              <span>NABH Standards & Cashless TPA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

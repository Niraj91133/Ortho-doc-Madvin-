"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { 
  Star, 
  ShieldCheck, 
  Activity, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { openBooking } = useModal();
  const { hero, phone, address, doctors } = DENTELIO_DATA;
  const leadDoctor = doctors[0];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-36 pb-16 lg:pt-32 lg:pb-16 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660]/95 via-[#0b5660]/85 to-transparent sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text with Staggered Frame-by-Frame Blur */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
            className="lg:col-span-7 text-white space-y-6 lg:space-y-7"
          >
            {/* Badge with Motion Blur */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
              }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
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
              className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold font-heading tracking-tight leading-[1.08] text-white"
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
                className="px-7 py-3.5 bg-[#fafaf7] hover:bg-white text-[#132424] font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-2xl transition-all duration-200 active:scale-95 hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0b5660]" />
                <span>{hero.primaryCta}</span>
              </button>
              <Link
                href="#doctors"
                className="px-7 py-3.5 bg-[#0b5660]/80 hover:bg-[#0b5660] text-white font-semibold text-sm sm:text-base rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 border border-white/20 hover:border-white/40 flex items-center gap-2"
              >
                <span>{hero.secondaryCta}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Social Proof & Trust Badges */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
              }}
              className="flex flex-wrap items-center gap-5 sm:gap-6 pt-3 text-xs sm:text-sm text-white/90 font-medium"
            >
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <div className="flex items-center text-amber-300 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <span className="font-bold text-white">5.0 Star Google Rating</span>
              </div>

              <div className="flex items-center gap-2 text-white/85 border-l border-white/20 pl-4 hidden sm:flex">
                <ShieldCheck className="w-4 h-4 text-[#a7e8ec]" />
                <span>NABH Standard Modular OTs & Cashless TPA</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Luxury Medical Card (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="bg-[#132424]/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl text-white space-y-5 hover:border-white/35 transition-all">
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live OPD & Casualty Active
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#a7e8ec] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  Gaya, Bihar
                </span>
              </div>

              {/* Doctor Mini-Card */}
              <div className="flex items-center gap-3.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#a7e8ec]/40 shadow-sm">
                  <Image
                    src={leadDoctor.image}
                    alt={leadDoctor.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {leadDoctor.name}
                  </h4>
                  <p className="text-xs text-[#a7e8ec] font-semibold mt-0.5">
                    {leadDoctor.qualifications} • 18+ Yrs Exp
                  </p>
                  <p className="text-[11px] text-white/70">
                    Senior Chief Orthopedic Surgeon
                  </p>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-2 text-xs text-white/90">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-white/70">
                    <Clock className="w-3.5 h-3.5 text-[#a7e8ec]" /> Daily OPD Hours:
                  </span>
                  <span className="font-bold text-white">10 AM–2 PM | 4:30–8 PM</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-white/70">
                    <Activity className="w-3.5 h-3.5 text-red-400" /> Emergency Trauma:
                  </span>
                  <span className="font-bold text-red-300">24 Hours Open</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="flex items-center gap-1.5 text-white/70">
                    <MapPin className="w-3.5 h-3.5 text-[#a7e8ec]" /> Location:
                  </span>
                  <span className="font-semibold text-white/90 text-right truncate max-w-[200px]">
                    Jail Road, Opp S P Kothi
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => openBooking()}
                  className="w-full py-3 bg-[#a7e8ec] hover:bg-white text-[#083c45] rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get Instant OPD Token</span>
                </button>

                <a
                  href={`tel:${phone}`}
                  className="w-full py-3 bg-red-600/90 hover:bg-red-600 text-white rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>24x7 Emergency: {phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

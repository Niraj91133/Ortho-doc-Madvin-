"use client";

import React from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useModal } from "@/context/ModalContext";
import { 
  ArrowUpRight, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Star,
  Activity,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function DoctorsSection() {
  const { doctors, phone, address } = DENTELIO_DATA;
  const leadDoctor = doctors[0];
  const { openBooking } = useModal();

  return (
    <section id="doctors" className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header with Blur Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b5660]/10 border border-[#0b5660]/20 text-[#0b5660] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Senior Orthopedic Surgeon & Medical Director</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold font-heading text-[#132424] tracking-tight leading-tight">
            Meet Dr. Vinod Kumar
          </h2>
          <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto">
            Founder and Chief Orthopedic Surgeon at Mandvi Ortho Trauma Center (Madvin Hospital), dedicated to restoring painless mobility with precision surgical care in Gaya.
          </p>
        </motion.div>

        {/* Lead Doctor Spotlight Card with Frame-by-Frame Motion Blur */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#0b5660]/15 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#a7e8ec]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Doctor Portrait Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b5660] to-[#083c45] shadow-2xl border-4 border-white">
                <Image
                  src={leadDoctor.image}
                  alt={leadDoctor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-black/5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0b5660] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      18+
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-dark leading-tight">Years Surgical Care</p>
                      <p className="text-[10px] text-brand-muted">Gaya, Bihar & Beyond</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>

              {/* Verified Hospital Seal */}
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#0b5660] bg-[#0b5660]/5 px-4 py-1.5 rounded-full border border-[#0b5660]/15">
                <ShieldCheck className="w-4 h-4" />
                <span>Mandvi Ortho Trauma Center • Registered Hospital</span>
              </div>
            </div>

            {/* Doctor Details & Credentials Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white bg-[#0b5660] px-3 py-1 rounded-full uppercase tracking-wider">
                    Chief Consultant
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Daily OPD & Emergency
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#132424] pt-1">
                  {leadDoctor.name}
                </h3>
                <p className="text-sm sm:text-base font-bold text-[#0b5660] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{leadDoctor.qualifications}</span>
                  <span className="text-brand-muted font-normal">• {leadDoctor.role}</span>
                </p>
              </div>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {leadDoctor.bio}
              </p>

              {/* Specializations Tags */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                  Core Surgical Competencies:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {leadDoctor.specialties?.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-brand-dark">
                      <CheckCircle2 className="w-4 h-4 text-[#0b5660] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPD Schedule & Timings Card */}
              <div className="bg-[#fafaf7] rounded-2xl p-4 sm:p-5 border border-brand-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b5660] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> OPD Consultation Hours
                  </span>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    24x7 Trauma Emergency Open
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-dark">
                  <div className="p-2.5 bg-white rounded-xl border border-brand-border">
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Morning OPD</span>
                    <span className="font-bold text-sm text-[#083c45]">10:00 AM – 02:00 PM</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-brand-border">
                    <span className="text-brand-muted block text-[10px] uppercase font-bold">Evening OPD</span>
                    <span className="font-bold text-sm text-[#083c45]">04:30 PM – 08:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => openBooking("", leadDoctor.name)}
                  className="px-7 py-3.5 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book OPD with Dr. Vinod Kumar</span>
                </button>
                <a
                  href={`tel:${phone}`}
                  className="px-6 py-3.5 bg-[#0b5660]/10 hover:bg-[#0b5660]/20 text-[#0b5660] rounded-full font-bold text-xs sm:text-sm transition-all border border-[#0b5660]/30 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {phone}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

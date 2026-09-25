"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  HeartPulse, 
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    // Initialize immediately on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { 
      name: "About Hospital", 
      shortName: "About",
      href: pathname === "/" ? "#about" : "/#about" 
    },
    { 
      name: "Treatments", 
      shortName: "Treatments",
      href: pathname === "/" ? "#services" : "/#services" 
    },
    { 
      name: "Dr. Vinod Kumar", 
      shortName: "Dr. Vinod Kumar",
      href: pathname === "/" ? "#doctors" : "/#doctors",
      isDoctor: true
    },
    { 
      name: "Gallery", 
      shortName: "Gallery",
      href: "/gallery" 
    },
    { 
      name: "Ortho Journal", 
      shortName: "Journal",
      href: "/journal" 
    },
    { 
      name: "Contact & OPD", 
      shortName: "Contact",
      href: "/contact" 
    },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[90] w-full transition-all duration-200 bg-white ${
        scrolled 
          ? "shadow-[0_10px_30px_-5px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] border-b border-slate-300" 
          : "shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-b border-slate-200"
      }`}
    >
      {/* 100% Solid Opaque Container - Zero Background Bleed-Through on Scroll */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-[72px] sm:h-[76px] flex items-center justify-between gap-4">
        
        {/* 1. LEFT: Brand Logo & Hospital Name (100% High-Contrast) */}
        <Link 
          href="/" 
          className="flex items-center gap-3 shrink-0 group"
          aria-label="Madvin Hospital Homepage"
        >
          {/* Medical Icon Badge */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0b5660] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
            <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-[#a7e8ec]" />
          </div>

          {/* Clean Single-Line Typographic Lockup */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-lg sm:text-xl font-black font-heading tracking-tight text-[#083c45] whitespace-nowrap">
                Madvin
              </span>
              <span className="text-lg sm:text-xl font-extrabold font-heading tracking-tight text-[#0b5660] whitespace-nowrap">
                Hospital
              </span>
            </div>
            {/* Tagline: Bold & Crisp */}
            <span className="hidden xl:inline-block text-xs font-bold text-slate-600 pl-2.5 border-l border-slate-300 whitespace-nowrap">
              Mandvi Ortho Trauma Center
            </span>
          </div>
        </Link>

        {/* 2. CENTER: Clean Navigation Links (Bold High-Contrast Text) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-bold transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#0b5660] bg-[#0b5660]/10 shadow-xs"
                    : "text-slate-800 hover:text-[#0b5660] hover:bg-slate-100"
                }`}
              >
                {/* Full name on XL, Short name on LG */}
                <span className="hidden xl:inline">{link.name}</span>
                <span className="xl:hidden">{link.shortName}</span>

                {link.isDoctor && (
                  <span className="text-[10px] font-extrabold bg-amber-500/15 text-amber-800 px-1.5 py-0.2 rounded-full border border-amber-500/30">
                    ★
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT: Actions (Helpline + CTA Button) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* 24x7 Emergency Helpline Pill */}
          <a
            href={`tel:${DENTELIO_DATA.phone}`}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold transition-all shadow-xs active:scale-95 whitespace-nowrap"
            title="24x7 Emergency Trauma Helpline"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-800 font-semibold hidden 2xl:inline">24x7 Emergency:</span>
            <span className="tracking-tight">{DENTELIO_DATA.phone}</span>
          </a>

          {/* Quick Call Icon (Mobile Only) */}
          <a
            href={`tel:${DENTELIO_DATA.phone}`}
            className="md:hidden p-2.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center justify-center shadow-xs"
            title="Emergency Call"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
          </a>

          {/* Book Appointment CTA Button */}
          <button
            onClick={() => openBooking()}
            className="px-4 sm:px-5 py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(11,86,96,0.3)] hover:shadow-[0_6px_20px_rgba(11,86,96,0.4)] hover:-translate-y-0.5 transition-all duration-150 active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#a7e8ec] shrink-0" />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#083c45] hover:bg-slate-100 rounded-full transition-colors focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden bg-white border-b border-slate-300 px-5 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* 24x7 Live Trauma Status Chip */}
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-950">24x7 Trauma & Emergency Active</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Gaya, Bihar
              </span>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-3 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-[#0b5660] transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>{link.name}</span>
                    {link.isDoctor && (
                      <span className="text-[10px] font-bold bg-amber-500/15 text-amber-900 px-2 py-0.5 rounded-full border border-amber-500/30">
                        Chief Surgeon
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </nav>

            {/* Doctor Info Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b5660] text-white flex items-center justify-center font-bold text-sm shrink-0">
                VK
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Dr. Vinod Kumar</p>
                <p className="text-[11px] font-medium text-slate-600">MBBS, MS Ortho • 18+ Years Exp.</p>
                <p className="text-[10px] font-bold text-emerald-800 mt-0.5">● OPD Active: 09:00 AM – 08:00 PM</p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${DENTELIO_DATA.phone}`}
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Emergency 24x7: {DENTELIO_DATA.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3.5 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#a7e8ec]" />
                <span>Book OPD Consultation Token</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

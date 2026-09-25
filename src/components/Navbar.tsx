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
  MapPin, 
  Clock, 
  ChevronDown, 
  ArrowUpRight,
  ShieldCheck,
  Activity,
  HeartPulse
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
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
    { name: "About Hospital", href: pathname === "/" ? "#about" : "/#about" },
    { name: "Treatments", href: pathname === "/" ? "#services" : "/#services" },
    { name: "Dr. Vinod Kumar", href: pathname === "/" ? "#doctors" : "/#doctors", isDoctor: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Ortho Journal", href: "/journal" },
    { name: "Contact & OPD", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Utility / Emergency Ribbon (Disappears smoothly on deep scroll to maximize content view) */}
      <div 
        className={`bg-[#062c33] text-white border-b border-white/10 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 py-0 opacity-0 pointer-events-none" : "max-h-12 py-2 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] sm:text-xs">
          {/* Location & OPD Hours */}
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1.5 hidden md:inline-flex">
              <MapPin className="w-3.5 h-3.5 text-[#a7e8ec]" />
              <span>Opposite S.P. Kothi, Jail Road, Gewalbigha, Gaya, Bihar</span>
            </span>
            <span className="hidden lg:inline-block text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#a7e8ec]" />
              <span>OPD: 09:00 AM – 08:00 PM (Mon - Sun)</span>
            </span>
          </div>

          {/* 24x7 Emergency Contact Strip */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>24x7 Trauma & Casualty Active</span>
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <a 
              href={`tel:${DENTELIO_DATA.phone}`}
              className="font-bold text-white hover:text-[#a7e8ec] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#a7e8ec]" />
              <span>{DENTELIO_DATA.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean solid white, high contrast, fixed) */}
      <div 
        className={`bg-white transition-all duration-300 ${
          scrolled 
            ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-b border-slate-200/90 py-3" 
            : "border-b border-slate-200/70 py-3.5 sm:py-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Hospital Name */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group shrink-0"
            aria-label="Madvin Hospital Home"
          >
            {/* Medical Shield Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#083c45] to-[#0b5660] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-[#a7e8ec]" />
            </div>

            {/* Hospital Name Hierarchy */}
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-lg sm:text-xl font-black font-heading tracking-tight text-[#083c45]">
                  Madvin
                </span>
                <span className="text-lg sm:text-xl font-bold font-heading tracking-tight text-[#0b5660]">
                  Hospital
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 uppercase leading-none mt-1">
                Mandvi Ortho Trauma Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-150 relative py-1.5 flex items-center gap-1.5 group ${
                    isActive
                      ? "text-[#0b5660] font-bold"
                      : "text-slate-700 hover:text-[#0b5660]"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isDoctor && (
                    <span className="text-[9px] font-bold bg-[#0b5660]/10 text-[#0b5660] px-1.5 py-0.5 rounded-full border border-[#0b5660]/20">
                      MS Ortho
                    </span>
                  )}
                  {/* Subtle hover bottom border */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b5660] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full origin-left" />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 24x7 Helpline Call Chip (Desktop) */}
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/90 text-xs font-bold transition-all shadow-sm active:scale-95"
              title="24x7 Emergency Trauma Helpline"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 font-semibold">24x7:</span>
              <span className="tracking-tight">{DENTELIO_DATA.phone}</span>
            </a>

            {/* Quick Call Icon (Tablet & Mobile) */}
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="xl:hidden p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-sm"
              title="Emergency Call"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
            </a>

            {/* Book Appointment CTA Button */}
            <button
              onClick={() => openBooking()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-1.5 sm:gap-2"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a7e8ec]" />
              <span className="whitespace-nowrap">Book Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#083c45] hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Hospital status banner in menu */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-900">24x7 Trauma & Emergency Active</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
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
                  className="px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0b5660] transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>{link.name}</span>
                    {link.isDoctor && (
                      <span className="text-[10px] font-bold bg-[#0b5660]/10 text-[#0b5660] px-2 py-0.5 rounded-full">
                        Chief Surgeon
                      </span>
                    )}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </nav>

            {/* Doctor Info Card in Mobile Menu */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b5660] text-white flex items-center justify-center font-bold text-sm">
                VK
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Dr. Vinod Kumar</p>
                <p className="text-[11px] font-medium text-slate-500">MBBS, MS Ortho • 18+ Years Exp.</p>
                <p className="text-[10px] font-semibold text-emerald-700 mt-0.5">● OPD Active: 09:00 AM – 08:00 PM</p>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${DENTELIO_DATA.phone}`}
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
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
                <span>Book OPD Consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

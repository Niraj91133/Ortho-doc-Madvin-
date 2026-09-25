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
  ArrowUpRight, 
  Sparkles, 
  Stethoscope, 
  ChevronRight,
  ShieldCheck,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
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
    { 
      name: "About Hospital", 
      href: pathname === "/" ? "#about" : "/about",
      badge: null
    },
    { 
      name: "Treatments", 
      href: pathname === "/" ? "#services" : "/services",
      badge: null
    },
    { 
      name: "Dr. Vinod Kumar", 
      href: pathname === "/" ? "#doctors" : "/doctors",
      badge: "Lead Surgeon"
    },
    { 
      name: "Gallery", 
      href: "/gallery",
      badge: null
    },
    { 
      name: "Ortho Journal", 
      href: "/journal",
      badge: null
    },
    { 
      name: "Contact & OPD", 
      href: "/contact",
      badge: null
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Floating Capsule Bar */}
        <div
          className={`bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-slate-300/80 py-2 sm:py-2"
              : "shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Brand Logo Lockup */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            aria-label="Madvin Hospital Home"
          >
            {/* Custom Medical Hospital Icon Badge */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#083c45] to-[#0b5660] text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 border border-white/20">
              <svg 
                className="w-5 h-5 text-[#a7e8ec]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <circle cx="12" cy="12" r="3" fill="#a7e8ec" fillOpacity="0.3" stroke="none" />
              </svg>
              {/* Subtle Live Pulse Dot on Logo */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
              </span>
            </div>

            {/* Clean Typographic Hierarchy */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[15px] sm:text-[17px] font-black font-heading tracking-tight text-[#083c45]">
                  Madvin
                </span>
                <span className="text-[15px] sm:text-[17px] font-extrabold font-heading tracking-tight text-[#0b5660]">
                  Hospital
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 uppercase leading-none mt-1">
                Mandvi Ortho Trauma Center
              </span>
            </div>
          </Link>

          {/* Center Navigation Links - Desktop Pill Switcher */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-[#0b5660] shadow-sm font-extrabold"
                      : "text-slate-600 hover:text-[#083c45] hover:bg-white/70"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold bg-[#0b5660]/10 text-[#0b5660] px-1.5 py-0.2 rounded-full border border-[#0b5660]/20">
                      ★ {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Compact Navigation for Medium Screens (1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5 bg-slate-100/80 p-1 rounded-full border border-slate-200/70 shadow-inner">
            {navLinks.map((link) => {
              // Compact display name
              const shortName = link.name
                .replace("Hospital", "")
                .replace("Kumar", "")
                .replace("& OPD", "")
                .trim();
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#0b5660] shadow-sm"
                      : "text-slate-600 hover:text-[#083c45] hover:bg-white/70"
                  }`}
                >
                  {shortName}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 24x7 Emergency Trauma Helpline Pill */}
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/90 text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 group"
              title="24x7 Emergency Ortho & Trauma Helpline"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 font-semibold hidden lg:inline">24x7:</span>
              <span className="font-bold tracking-tight">{DENTELIO_DATA.phone}</span>
            </a>

            {/* Mobile Call Icon Quick Access */}
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="md:hidden p-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shadow-sm"
              title="Emergency Call"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
            </a>

            {/* Book Appointment CTA Button */}
            <button
              onClick={() => openBooking()}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#0b5660] to-[#083c45] hover:from-[#083c45] hover:to-[#05282e] text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(11,86,96,0.25)] hover:shadow-[0_6px_20px_rgba(11,86,96,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex items-center gap-1.5 sm:gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#a7e8ec]" />
              <span className="whitespace-nowrap">Book Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#083c45] hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Floating Card */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mt-2.5 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#0b5660] text-white flex items-center justify-center text-xs font-bold">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#083c45] leading-tight">Madvin Hospital</p>
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">Mandvi Ortho Center</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  24x7 Trauma Open
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0b5660] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold bg-[#0b5660]/10 text-[#0b5660] px-2 py-0.5 rounded-full">
                          ★ {link.badge}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0b5660] transition-colors" />
                  </Link>
                ))}
              </nav>

              {/* Doctor OPD Badge */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#0b5660]/10 flex items-center justify-center text-[#0b5660]">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Dr. Vinod Kumar</p>
                    <p className="text-[10px] font-medium text-slate-500">MBBS, MS Ortho • Chief Surgeon</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-1 rounded-lg border border-slate-200">
                  OPD Open
                </span>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <a
                  href={`tel:${DENTELIO_DATA.phone}`}
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call Emergency 24x7: {DENTELIO_DATA.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#0b5660] to-[#083c45] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#a7e8ec]" />
                  <span>Book OPD Token / Consultation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

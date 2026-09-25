"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Menu, X, Activity, PhoneCall, Calendar, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Hospital", href: pathname === "/" ? "#about" : "/about" },
    { name: "Treatments", href: pathname === "/" ? "#services" : "/services" },
    { name: "Dr. Vinod Kumar", href: pathname === "/" ? "#doctors" : "/doctors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Ortho Journal", href: "/journal" },
    { name: "Contact & OPD", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Top Emergency & Info Strip */}
      <div className="bg-[#083c45] text-white py-1.5 px-4 sm:px-8 lg:px-12 text-[11px] sm:text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-bold text-white uppercase tracking-wider">
              24x7 Trauma Casualty & Emergency OT Ready
            </span>
            <span className="hidden md:inline text-white/60">|</span>
            <span className="hidden md:inline text-white/80">
              Mandvi Ortho Trauma Center, Jail Road, Opp S P Kothi, Gaya
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90">
            <span className="hidden lg:flex items-center gap-1 text-[#a7e8ec]">
              <Clock className="w-3 h-3" /> OPD: 10 AM–2 PM | 4:30–8 PM
            </span>
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="font-bold text-white hover:text-[#a7e8ec] flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#a7e8ec]" />
              <span>Helpline: {DENTELIO_DATA.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Solid White & Frosted Glass for 100% Visibility */}
      <nav
        className={`bg-white/98 backdrop-blur-xl border-b border-gray-200/80 transition-all duration-200 ${
          scrolled ? "py-2.5 shadow-md" : "py-3.5 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Hospital Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0b5660] to-[#083c45] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-[#a7e8ec]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#083c45] block leading-none">
                Madvin<span className="text-[#0b5660]"> Hospital</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.14em] text-[#0b5660] uppercase block mt-0.5">
                Mandvi Ortho Trauma Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-150 relative py-1 ${
                    isActive
                      ? "text-[#0b5660] font-bold"
                      : "text-[#132424] hover:text-[#0b5660]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b5660] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons & Hotline */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${DENTELIO_DATA.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-[#0b5660] bg-[#0b5660]/10 border border-[#0b5660]/20 px-3.5 py-2 rounded-full hover:bg-[#0b5660] hover:text-white shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0b5660] group-hover:text-white" />
              <span>24x7: {DENTELIO_DATA.phone}</span>
            </a>

            <button
              onClick={() => openBooking()}
              className="px-5 py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#a7e8ec]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#083c45] hover:text-[#0b5660] rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 shadow-2xl space-y-4"
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-bold text-[#132424] hover:text-[#0b5660] transition-colors py-1.5 border-b border-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`tel:${DENTELIO_DATA.phone}`}
                  className="w-full py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>Emergency 24x7: {DENTELIO_DATA.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="w-full py-3.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#a7e8ec]" />
                  <span>Book OPD Consultation</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

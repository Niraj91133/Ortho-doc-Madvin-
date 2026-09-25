"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Menu, X, Activity, PhoneCall } from "lucide-react";
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
    { name: "About us", href: pathname === "/" ? "#about" : "/#about" },
    { name: "Treatments", href: pathname === "/" ? "#services" : "/#services" },
    { name: "Dr. Vinod Kumar", href: pathname === "/" ? "#doctors" : "/#doctors" },
    { name: "Hospital Gallery", href: "/gallery" },
    { name: "Ortho Journal", href: "/journal" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#fafaf7]/90 backdrop-blur-md shadow-sm py-3 border-b border-brand-teal/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0b5660] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4 text-[#a7e8ec]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-[#132424] block leading-none">
              Madvin<span className="text-[#0b5660]"> Hospital</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#0b5660] uppercase block">
              Ortho & Trauma Center
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#132424]/80 hover:text-[#0b5660] transition-colors duration-200 hover:-translate-y-0.5"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button & Hotline */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${DENTELIO_DATA.phone}`}
            className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-[#0b5660] bg-white/80 border border-[#0b5660]/20 px-3.5 py-2 rounded-full hover:bg-white shadow-sm transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#0b5660]" />
            <span>24x7: {DENTELIO_DATA.phone}</span>
          </a>
          <button
            onClick={() => openBooking()}
            className="px-5 py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-[#fafaf7] text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            Book an appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#132424] hover:text-[#0b5660] rounded-xl hover:bg-black/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#fafaf7] border-b border-brand-teal/10 px-6 py-6 shadow-xl space-y-4"
          >
            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#132424] hover:text-[#0b5660] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${DENTELIO_DATA.phone}`}
                className="w-full py-2.5 border border-[#0b5660] text-[#0b5660] rounded-full text-center text-xs font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Emergency Hotline: {DENTELIO_DATA.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3 bg-[#0b5660] hover:bg-[#083c45] text-[#fafaf7] text-sm font-bold rounded-full shadow-md transition-all active:scale-95"
              >
                Book an appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

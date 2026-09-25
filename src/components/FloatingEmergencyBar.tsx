"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, Calendar, X, Activity } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingEmergencyBar() {
  const { openBooking } = useModal();
  const { phone } = DENTELIO_DATA;
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#132424]/90 backdrop-blur-xl border border-white/20 p-3 sm:p-3.5 rounded-3xl shadow-2xl text-white flex items-center gap-2 sm:gap-3"
          >
            {/* 24x7 Pulse Indicator */}
            <div className="hidden sm:flex items-center gap-2 pl-2 pr-1 border-r border-white/15">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-red-200 whitespace-nowrap">
                24x7 Trauma
              </span>
            </div>

            {/* Quick Call Button */}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              title="Call Emergency Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>

            {/* WhatsApp Consultation */}
            <a
              href={`https://wa.me/917004803925?text=Hello%20Madvin%20Hospital,%20I%20need%20orthopedic%20OPD%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Book Token Button */}
            <button
              onClick={() => openBooking()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#a7e8ec] hover:bg-white text-[#083c45] rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Token</span>
            </button>

            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Minimize"
              aria-label="Minimize floating bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          /* Minimized Circular Floating Bubble */
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMinimized(false)}
            className="w-13 h-13 p-3.5 rounded-full bg-[#0b5660] hover:bg-[#083c45] text-white shadow-2xl border-2 border-white/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="Open Hospital Emergency Bar"
          >
            <Activity className="w-6 h-6 text-[#a7e8ec] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

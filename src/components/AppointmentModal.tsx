"use client";

import React, { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { useBooking } from "@/context/BookingContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { 
  X, 
  CheckCircle, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Activity, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  MapPin, 
  FileText 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AppointmentModal() {
  const { isBookingOpen: isModalOpen, closeBooking, preselectedService, preselectedDoctor } = useModal();
  const { 
    isBookingOpen: isSystemOpen, 
    closedNotice, 
    disabledSlots, 
    addAppointment,
    doctorSchedule
  } = useBooking();
  
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("Dr. Vinod Kumar");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedToken, setAssignedToken] = useState("");

  const timeSlots = [
    "10:00 AM (OPD)", 
    "11:30 AM (OPD)", 
    "01:00 PM (OPD)", 
    "04:30 PM (Evening)", 
    "06:00 PM (Evening)", 
    "07:30 PM (Evening)"
  ];

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
    if (preselectedDoctor) setDoctor(preselectedDoctor);
    else setDoctor("Dr. Vinod Kumar");
  }, [preselectedService, preselectedDoctor]);

  // Set default date to today or tomorrow
  useEffect(() => {
    if (!date) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [date]);

  if (!isModalOpen) return null;

  const handleResetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setAssignedToken("");
    closeBooking();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Please provide your Name and Phone Number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const record = addAppointment({
        patientName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        service: service || "General Orthopedic Consultation",
        doctor: "Dr. Vinod Kumar",
        date: date || new Date().toISOString().split("T")[0],
        timeSlot: time || "10:00 AM (OPD)",
        notes: formData.notes,
      });

      setAssignedToken(record.tokenNumber);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const leadDoctor = DENTELIO_DATA.doctors[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#132424]/80 backdrop-blur-md transition-opacity">
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl bg-[#fafaf7] rounded-3xl shadow-2xl border border-brand-teal/20 overflow-hidden text-[#132424]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0b5660] text-[#fafaf7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a7e8ec]/20 flex items-center justify-center text-[#a7e8ec]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">Book Orthopedic OPD Consultation</h3>
              <p className="text-xs text-white/80">Madvin Hospital • Mandvi Ortho Trauma Center</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[82vh] overflow-y-auto">
          {/* Check if system booking is toggled OFF by admin */}
          {!isSystemOpen && !isSubmitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  OPD Booking Suspended
                </span>
                <h4 className="text-2xl font-bold font-heading text-brand-dark pt-1">
                  Online Bookings Temporarily Closed
                </h4>
                <p className="text-sm text-brand-muted leading-relaxed bg-amber-50/80 p-4 rounded-2xl border border-amber-200/60 text-left">
                  {closedNotice}
                </p>
              </div>

              <div className="bg-[#0b5660]/5 border border-[#0b5660]/20 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0b5660]">
                  <Activity className="w-4 h-4" />
                  <span>24x7 Emergency Casualty & Trauma Services are Active</span>
                </div>
                <p className="text-xs text-brand-muted">
                  For emergency bone fractures, road accident poly-trauma, or urgent inpatient care, please contact our hospital emergency helpline directly:
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:+917004803925"
                    className="flex-1 py-3 px-4 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    Call Emergency: +91 70048 03925
                  </a>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : isSubmitted ? (
            /* Confirmation Screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#0b5660]/10 text-[#0b5660] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-[#0b5660]" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-brand-dark">OPD Consultation Confirmed!</h4>
              <p className="text-sm text-brand-muted max-w-md mx-auto">
                Thank you, <span className="font-semibold text-brand-dark">{formData.fullName}</span>. Your appointment has been registered at Mandvi Ortho Trauma Center.
              </p>

              {/* Token Card */}
              <div className="p-5 bg-gradient-to-br from-[#0b5660]/10 to-[#a7e8ec]/20 rounded-2xl max-w-md mx-auto text-left border border-[#0b5660]/20 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#0b5660]/15 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b5660]">OPD Token Number</span>
                  <span className="text-lg font-black font-mono text-[#083c45] bg-white px-3 py-1 rounded-lg border border-[#0b5660]/30 shadow-sm">
                    {assignedToken}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-brand-dark">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Consultant:</span>
                    <span className="font-bold text-[#0b5660]">Dr. Vinod Kumar (MS Ortho)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Department / Issue:</span>
                    <span className="font-semibold">{service || "Orthopedic Care"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Date & Slot:</span>
                    <span className="font-semibold">{date} • {time || "10:00 AM (OPD)"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Patient Mobile:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0b5660]/10 text-[11px] text-brand-muted flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0b5660] shrink-0 mt-0.5" />
                  <span>Mandvi Ortho Trauma Center, Jail Road, Opp S P Kothi, Gewalbigha, Gaya</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#0b5660] font-semibold flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Token sent to OPD Reception. Cashless TPA available.</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/917004803925?text=Hello%20Madvin%20Hospital,%20I%20have%20booked%20an%20OPD%20appointment.%20Token:%20${assignedToken},%20Name:%20${encodeURIComponent(formData.fullName)},%20Slot:%20${encodeURIComponent(time)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-xs transition-colors shadow-sm"
                >
                  WhatsApp Reception
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 bg-[#0b5660] text-white rounded-full font-semibold text-xs hover:bg-[#083c45] transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-brand-border pb-3.5">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#0b5660] text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                  <span className="text-xs font-medium">Treatment</span>
                </div>
                <div className="w-8 h-px bg-brand-border" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#0b5660] text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                  <span className="text-xs font-medium">Slot</span>
                </div>
                <div className="w-8 h-px bg-brand-border" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#0b5660] text-white' : 'bg-gray-200 text-gray-500'}`}>3</span>
                  <span className="text-xs font-medium">Patient Details</span>
                </div>
              </div>

              {/* Step 1: Specialty & Doctor */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Lead Doctor Card */}
                  <div className="p-4 bg-gradient-to-r from-[#0b5660]/10 via-[#0b5660]/5 to-transparent rounded-2xl border border-[#0b5660]/20 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#0b5660] shadow-sm">
                      <Image
                        src={leadDoctor.image}
                        alt="Dr. Vinod Kumar"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0b5660] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-[#0b5660]/20">
                        Senior Surgeon In-Charge
                      </span>
                      <h4 className="text-base font-bold text-brand-dark pt-1">
                        {leadDoctor.name} <span className="text-xs text-brand-muted font-normal">({leadDoctor.qualifications})</span>
                      </h4>
                      <p className="text-xs text-brand-muted">
                        OPD: 10:00 AM – 02:00 PM | 04:30 PM – 08:00 PM
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                      Select Department / Medical Issue
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DENTELIO_DATA.services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setService(s.title)}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-medium flex items-center justify-between ${
                            service === s.title 
                              ? 'border-[#0b5660] bg-[#0b5660]/5 text-[#0b5660] ring-1 ring-[#0b5660]' 
                              : 'border-brand-border bg-white hover:border-[#0b5660]/40'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-brand-dark">{s.title}</p>
                            <p className="text-[11px] text-brand-muted line-clamp-1">{s.tagline}</p>
                          </div>
                          {service === s.title && <CheckCircle className="w-4 h-4 text-[#0b5660] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-full font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                    >
                      Next: Choose Schedule <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                      Preferred Consultation Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3.5 bg-white border border-brand-border rounded-2xl text-sm focus:outline-none focus:border-[#0b5660] text-brand-dark"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                        Available OPD Timings
                      </label>
                      <span className="text-[11px] text-brand-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0b5660]" /> Tokens issued sequentially
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => {
                        const isSlotDisabled = disabledSlots.includes(slot);
                        const isSelected = time === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isSlotDisabled}
                            onClick={() => !isSlotDisabled && setTime(slot)}
                            className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all relative ${
                              isSlotDisabled
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                                : isSelected
                                ? "border-[#0b5660] bg-[#0b5660] text-white shadow-sm ring-2 ring-[#0b5660]/30"
                                : "border-brand-border bg-white text-brand-dark hover:border-[#0b5660]"
                            }`}
                          >
                            <div>{slot}</div>
                            {isSlotDisabled && (
                              <span className="text-[9px] font-bold text-red-500 block uppercase tracking-tight">
                                Full / Closed
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-full text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-full font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                    >
                      Next: Patient Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Patient Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-3.5 py-3 bg-white border border-brand-border rounded-xl text-sm focus:outline-none focus:border-[#0b5660]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-3 bg-white border border-brand-border rounded-xl text-sm focus:outline-none focus:border-[#0b5660]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patient@example.com"
                        className="w-full pl-10 pr-3.5 py-3 bg-white border border-brand-border rounded-xl text-sm focus:outline-none focus:border-[#0b5660]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                      Symptoms / Medical Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g., Severe right knee pain while walking, old fracture swelling..."
                      className="w-full p-3 bg-white border border-brand-border rounded-xl text-sm focus:outline-none focus:border-[#0b5660] resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 bg-brand-softBg rounded-xl border border-brand-border text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Consulting Doctor:</span>
                      <span className="font-bold text-[#0b5660]">Dr. Vinod Kumar (MS Ortho)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Selected Slot:</span>
                      <span className="font-semibold text-brand-dark">{date} at {time || "10:00 AM (OPD)"}</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-full text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Token...</span>
                        </>
                      ) : (
                        <span>Confirm OPD Appointment</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

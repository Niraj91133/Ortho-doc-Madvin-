"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useBooking, AppointmentRecord } from "@/context/BookingContext";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { 
  Activity, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  User, 
  Check, 
  ExternalLink,
  ChevronDown,
  Power,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const { 
    appointments, 
    isBookingOpen, 
    closedNotice, 
    disabledSlots, 
    doctorSchedule,
    updateAppointmentStatus, 
    deleteAppointment, 
    toggleBookingSystem, 
    toggleSlot, 
    addAppointment,
    updateDoctorSchedule,
    resetToDemoData 
  } = useBooking();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [isNoticeEditOpen, setIsNoticeEditOpen] = useState(false);
  const [tempNotice, setTempNotice] = useState(closedNotice);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);

  // Walk-in form state
  const [walkInForm, setWalkInForm] = useState({
    patientName: "",
    phone: "",
    service: "Robotic Joint Replacement",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM (OPD)",
    notes: "Walk-in OPD patient at hospital counter",
  });

  const allSlots = [
    "10:00 AM (OPD)", 
    "11:30 AM (OPD)", 
    "01:00 PM (OPD)", 
    "04:30 PM (Evening)", 
    "06:00 PM (Evening)", 
    "07:30 PM (Evening)"
  ];

  const todayStr = new Date().toISOString().split("T")[0];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = appointments.length;
    const todayCount = appointments.filter((a) => a.date === todayStr).length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;

    return { total, todayCount, pending, confirmed, completed };
  }, [appointments, todayStr]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesSearch = 
        app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm) ||
        app.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesDate = 
        dateFilter === "all" || 
        (dateFilter === "today" && app.date === todayStr) ||
        (dateFilter !== "all" && dateFilter !== "today" && app.date === dateFilter);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter, todayStr]);

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInForm.patientName || !walkInForm.phone) {
      alert("Please enter patient name and mobile number");
      return;
    }

    addAppointment({
      patientName: walkInForm.patientName,
      phone: walkInForm.phone,
      service: walkInForm.service,
      doctor: "Dr. Vinod Kumar",
      date: walkInForm.date,
      timeSlot: walkInForm.timeSlot,
      notes: walkInForm.notes,
    });

    setWalkInForm({
      patientName: "",
      phone: "",
      service: "Robotic Joint Replacement",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "10:00 AM (OPD)",
      notes: "Walk-in OPD patient at hospital counter",
    });
    setIsWalkInModalOpen(false);
  };

  const handleNoticeSave = () => {
    toggleBookingSystem(isBookingOpen, tempNotice);
    setIsNoticeEditOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ["Token Number", "Patient Name", "Phone", "Email", "Department", "Date", "Slot", "Status", "Notes"];
    const rows = filteredAppointments.map((a) => [
      a.tokenNumber,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email || ''}"`,
      `"${a.service}"`,
      a.date,
      `"${a.timeSlot}"`,
      a.status.toUpperCase(),
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `madvin_opd_appointments_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#132424] pb-20">
      {/* Top Admin Navbar */}
      <header className="bg-[#0b5660] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>

            <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#a7e8ec] text-[#083c45] flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight leading-tight">
                  Madvin Hospital <span className="text-[#a7e8ec] font-normal text-xs sm:text-sm">Admin Portal</span>
                </h1>
                <p className="text-[10px] text-white/70">Mandvi Ortho Trauma Center • Dr. Vinod Kumar</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#a7e8ec] text-[#083c45] rounded-xl text-xs font-bold hover:bg-white transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Walk-In Patient</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Status Alert Banner if Booking is CLOSED */}
        {!isBookingOpen && (
          <div className="bg-red-500 text-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-100">Patient Notice Active</p>
                <p className="text-sm font-semibold">{closedNotice}</p>
              </div>
            </div>
            <button
              onClick={() => toggleBookingSystem(true)}
              className="px-4 py-2 bg-white text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors shrink-0 shadow-sm"
            >
              Turn Online Booking ON
            </button>
          </div>
        )}

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Appointments</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#083c45]">{stats.total}</span>
              <span className="text-xs text-gray-400 font-medium">All Time</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today&apos;s OPD Queue</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#0b5660]">{stats.todayCount}</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Today</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Action</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-600">{stats.pending}</span>
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">Tokens</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-700">{stats.confirmed}</span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">Scheduled</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0b5660] to-[#083c45] text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a7e8ec]">System Status</span>
              <span className={`w-2.5 h-2.5 rounded-full ${isBookingOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <span className="text-lg font-black block leading-none">
                  {isBookingOpen ? "BOOKINGS OPEN" : "BOOKINGS PAUSED"}
                </span>
                <span className="text-[11px] text-white/70">
                  {isBookingOpen ? "Receiving live tokens" : "Notice displayed"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Master OPD & Doctor Management Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Master Booking Toggle & Notice Editor */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center font-bold">
                  <Power className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-dark">Online OPD Booking Switch</h3>
                  <p className="text-xs text-brand-muted">Control whether patients can book from the website</p>
                </div>
              </div>

              {/* Master Switch Button */}
              <button
                onClick={() => toggleBookingSystem(!isBookingOpen)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                  isBookingOpen
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isBookingOpen ? "Online Booking: OPEN" : "Online Booking: CLOSED"}</span>
              </button>
            </div>

            {/* Current Notice / Reason */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#0b5660]" />
                  Notice Displayed When Closed
                </span>
                <button
                  onClick={() => setIsNoticeEditOpen(!isNoticeEditOpen)}
                  className="text-xs text-[#0b5660] font-bold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isNoticeEditOpen ? "Cancel" : "Edit Message"}
                </button>
              </div>

              {isNoticeEditOpen ? (
                <div className="space-y-2.5 pt-1">
                  <textarea
                    rows={3}
                    value={tempNotice}
                    onChange={(e) => setTempNotice(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs text-brand-dark focus:outline-none focus:border-[#0b5660]"
                    placeholder="Enter message for patients..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleNoticeSave}
                      className="px-3 py-1.5 bg-[#0b5660] text-white rounded-lg text-xs font-bold hover:bg-[#083c45]"
                    >
                      Save Notice
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-brand-muted leading-relaxed italic bg-white p-3 rounded-xl border border-gray-200/60">
                  &ldquo;{closedNotice}&rdquo;
                </p>
              )}
            </div>

            {/* Emergency Hotline Info */}
            <div className="flex items-center justify-between text-xs text-gray-600 bg-[#0b5660]/5 p-3 rounded-xl border border-[#0b5660]/10">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0b5660]" />
                <span>Emergency 24x7 Hotline: <strong>+91 70048 03925</strong></span>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Always Active
              </span>
            </div>
          </div>

          {/* Right: Slot-by-Slot Availability Matrix */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-dark">Time Slot Availability Controller</h3>
                  <p className="text-xs text-brand-muted">Click a slot to toggle between Available and Closed / Full</p>
                </div>
              </div>

              {disabledSlots.length > 0 && (
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                  {disabledSlots.length} Slots Full
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {allSlots.map((slot) => {
                const isBlocked = disabledSlots.includes(slot);

                return (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isBlocked
                        ? "bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                        : "bg-emerald-50/70 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    }`}
                  >
                    <span className="text-xs font-bold">{slot}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isBlocked ? "bg-red-200 text-red-800" : "bg-emerald-200 text-emerald-900"
                    }`}>
                      {isBlocked ? "CLOSED / FULL" : "AVAILABLE"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
              <span>Doctor In-Charge: <strong>Dr. Vinod Kumar (MS Ortho)</strong></span>
              <button 
                onClick={resetToDemoData}
                className="text-[#0b5660] hover:underline flex items-center gap-1 font-semibold"
                title="Reset demo records & enable all slots"
              >
                <RotateCcw className="w-3 h-3" /> Reset Demo State
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table Section */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-6">
          {/* Controls Bar: Search, Status Tabs, Date Filter */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient name, mobile, token (e.g. MAD-084)..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0b5660] focus:bg-white transition-colors"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
              {[
                { id: "all", label: "All", count: stats.total },
                { id: "pending", label: "Pending", count: stats.pending },
                { id: "confirmed", label: "Confirmed", count: stats.confirmed },
                { id: "completed", label: "Completed", count: stats.completed },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    statusFilter === tab.id
                      ? "bg-white text-[#0b5660] shadow-sm"
                      : "text-gray-600 hover:text-brand-dark"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === tab.id ? "bg-[#0b5660]/10 text-[#0b5660]" : "bg-gray-200 text-gray-600"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Date filter dropdown */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0b5660]" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0b5660]"
              >
                <option value="all">All Dates</option>
                <option value="today">Today ({todayStr})</option>
              </select>
            </div>
          </div>

          {/* Table of Appointments */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3 px-3">Token #</th>
                  <th className="pb-3 px-3">Patient Details</th>
                  <th className="pb-3 px-3">Department / Concern</th>
                  <th className="pb-3 px-3">Date & Slot</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      <p className="text-sm font-semibold">No appointments match your search or filter.</p>
                      <button
                        onClick={() => { setSearchTerm(""); setStatusFilter("all"); setDateFilter("all"); }}
                        className="mt-2 text-xs text-[#0b5660] font-bold hover:underline"
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <tr 
                      key={app.id} 
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      onClick={() => setSelectedAppointment(app)}
                    >
                      {/* Token Column */}
                      <td className="py-4 px-3 font-mono font-bold text-sm text-[#083c45]">
                        <span className="bg-[#0b5660]/10 px-2.5 py-1 rounded-lg border border-[#0b5660]/20">
                          {app.tokenNumber}
                        </span>
                      </td>

                      {/* Patient Details Column */}
                      <td className="py-4 px-3">
                        <div className="font-bold text-sm text-brand-dark group-hover:text-[#0b5660] transition-colors">
                          {app.patientName}
                        </div>
                        <div className="text-brand-muted text-[11px] flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#0b5660]" />
                            {app.phone}
                          </span>
                          {app.email && (
                            <span className="hidden sm:inline text-gray-400">• {app.email}</span>
                          )}
                        </div>
                      </td>

                      {/* Specialty Column */}
                      <td className="py-4 px-3">
                        <span className="font-semibold text-brand-dark block">{app.service}</span>
                        <span className="text-[11px] text-brand-muted">Dr. Vinod Kumar</span>
                      </td>

                      {/* Date & Slot Column */}
                      <td className="py-4 px-3">
                        <div className="font-semibold text-brand-dark">{app.date}</div>
                        <div className="text-[11px] text-[#0b5660] font-medium flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {app.timeSlot}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                          app.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : app.status === "pending"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : app.status === "completed"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            app.status === "confirmed" ? "bg-emerald-600" :
                            app.status === "pending" ? "bg-amber-500 animate-ping" :
                            app.status === "completed" ? "bg-blue-600" : "bg-gray-400"
                          }`} />
                          {app.status}
                        </span>
                      </td>

                      {/* Action Buttons Column */}
                      <td className="py-4 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Confirm Button */}
                          {app.status === "pending" && (
                            <button
                              onClick={() => updateAppointmentStatus(app.id, "confirmed")}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                              title="Confirm OPD Appointment"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {/* Complete Button */}
                          {app.status === "confirmed" && (
                            <button
                              onClick={() => updateAppointmentStatus(app.id, "completed")}
                              className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                              title="Mark as Consultation Completed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* WhatsApp Patient */}
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(app.patientName)},%20your%20OPD%20appointment%20with%20Dr.%20Vinod%20Kumar%20at%20Madvin%20Hospital%20(Mandvi%20Ortho%20Trauma%20Center)%20is%20${app.status.toUpperCase()}.%20Token:%20${app.tokenNumber},%20Slot:%20${encodeURIComponent(app.timeSlot)}.%20Address:%20Jail%20Road,%20Opp%20S%20P%20Kothi,%20Gaya.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Call Patient */}
                          <a
                            href={`tel:${app.phone}`}
                            className="p-1.5 bg-[#0b5660]/10 hover:bg-[#0b5660]/20 text-[#0b5660] rounded-lg transition-colors"
                            title="Call Patient"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Delete Record */}
                          <button
                            onClick={() => {
                              if (confirm(`Remove appointment record for ${app.patientName}?`)) {
                                deleteAppointment(app.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Appointment Detail Modal Drawer */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-gray-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-black font-mono bg-[#0b5660] text-white px-2.5 py-1 rounded-lg">
                    {selectedAppointment.tokenNumber}
                  </span>
                  <h3 className="text-base font-bold text-brand-dark">Patient Appointment Slip</h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200/60">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Patient Name</span>
                    <span className="text-sm font-bold text-brand-dark">{selectedAppointment.patientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Mobile Number</span>
                    <span className="text-sm font-bold text-[#0b5660]">{selectedAppointment.phone}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Orthopedic Concern:</span>
                    <span className="font-semibold text-brand-dark">{selectedAppointment.service}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Consulting Surgeon:</span>
                    <span className="font-semibold text-[#0b5660]">Dr. Vinod Kumar (MS Ortho)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Appointment Date:</span>
                    <span className="font-semibold text-brand-dark">{selectedAppointment.date}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Time Slot:</span>
                    <span className="font-semibold text-brand-dark">{selectedAppointment.timeSlot}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Current Status:</span>
                    <span className="font-bold uppercase text-emerald-700">{selectedAppointment.status}</span>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block mb-0.5">Patient Notes / Symptoms:</span>
                    <p className="text-brand-dark leading-relaxed">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>

              {/* Status Update Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "confirmed");
                      setSelectedAppointment(null);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "completed");
                      setSelectedAppointment(null);
                    }}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, "cancelled");
                      setSelectedAppointment(null);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>

                <a
                  href={`tel:${selectedAppointment.phone}`}
                  className="px-4 py-1.5 bg-[#0b5660] text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Walk-In Patient Registration Modal */}
      <AnimatePresence>
        {isWalkInModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-gray-200 space-y-4 text-brand-dark"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0b5660] text-white flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-brand-dark">Register Walk-In Patient</h3>
                </div>
                <button
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleWalkInSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-gray-600 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={walkInForm.patientName}
                    onChange={(e) => setWalkInForm({ ...walkInForm, patientName: e.target.value })}
                    placeholder="e.g. Surendra Sharma"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-600 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={walkInForm.phone}
                    onChange={(e) => setWalkInForm({ ...walkInForm, phone: e.target.value })}
                    placeholder="+91 94312 00000"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-600 mb-1">Department</label>
                  <select
                    value={walkInForm.service}
                    onChange={(e) => setWalkInForm({ ...walkInForm, service: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                  >
                    <option value="Robotic Joint Replacement">Robotic Joint Replacement</option>
                    <option value="Fracture & Trauma Emergency">Fracture & Trauma Emergency</option>
                    <option value="Endoscopic Spine Surgery">Endoscopic Spine Surgery</option>
                    <option value="Sports Arthroscopy & Ligament">Sports Arthroscopy & Ligament</option>
                    <option value="Pediatric Orthopedics">Pediatric Orthopedics</option>
                    <option value="General Joint OPD Consultation">General Joint OPD Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={walkInForm.date}
                      onChange={(e) => setWalkInForm({ ...walkInForm, date: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-600 mb-1">Slot</label>
                    <select
                      value={walkInForm.timeSlot}
                      onChange={(e) => setWalkInForm({ ...walkInForm, timeSlot: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                    >
                      {allSlots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-600 mb-1">Clinical Notes</label>
                  <input
                    type="text"
                    value={walkInForm.notes}
                    onChange={(e) => setWalkInForm({ ...walkInForm, notes: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0b5660]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWalkInModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0b5660] hover:bg-[#083c45] text-white rounded-xl font-bold shadow-sm"
                  >
                    Assign Token & Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

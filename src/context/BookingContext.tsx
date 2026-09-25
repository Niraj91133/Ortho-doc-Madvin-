"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AppointmentRecord {
  id: string;
  tokenNumber: string;
  patientName: string;
  phone: string;
  email?: string;
  service: string;
  doctor: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface DoctorSchedule {
  morning: string;
  evening: string;
  emergency: string;
  isAvailableToday: boolean;
}

interface BookingContextType {
  appointments: AppointmentRecord[];
  isBookingOpen: boolean;
  closedNotice: string;
  disabledSlots: string[];
  doctorSchedule: DoctorSchedule;
  addAppointment: (data: {
    patientName: string;
    phone: string;
    email?: string;
    service: string;
    doctor: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => AppointmentRecord;
  updateAppointmentStatus: (id: string, status: AppointmentRecord["status"]) => void;
  deleteAppointment: (id: string) => void;
  toggleBookingSystem: (isOpen: boolean, notice?: string) => void;
  toggleSlot: (slot: string) => void;
  updateDoctorSchedule: (schedule: Partial<DoctorSchedule>) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEYS = {
  APPOINTMENTS: "madvin_appointments_v1",
  SETTINGS: "madvin_settings_v1",
  SLOTS: "madvin_disabled_slots_v1",
  SCHEDULE: "madvin_doctor_schedule_v1",
};

const DEFAULT_SCHEDULE: DoctorSchedule = {
  morning: "10:00 AM - 02:00 PM",
  evening: "04:30 PM - 08:00 PM",
  emergency: "24x7 Open (Jail Road, Gaya)",
  isAvailableToday: true,
};

const INITIAL_DEMO_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: "app-101",
    tokenNumber: "MAD-084",
    patientName: "Rameshwar Prasad",
    phone: "+91 94312 45890",
    email: "rameshwar.p@gmail.com",
    service: "Robotic Joint Replacement",
    doctor: "Dr. Vinod Kumar",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM (OPD)",
    notes: "Bilateral knee severe pain and difficulty walking for 2 years.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "app-102",
    tokenNumber: "MAD-085",
    patientName: "Pooja Kumari",
    phone: "+91 88771 23490",
    email: "pooja.ortho@yahoo.com",
    service: "Sports Injury & Arthroscopy",
    doctor: "Dr. Vinod Kumar",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:30 AM (OPD)",
    notes: "Twisted right knee during badminton, MRI shows suspected ACL tear.",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "app-103",
    tokenNumber: "MAD-086",
    patientName: "Md. Tariq Anwar",
    phone: "+91 99341 55670",
    email: "tariq.anwar@hotmail.com",
    service: "Spine & Disc Surgery",
    doctor: "Dr. Vinod Kumar",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "04:30 PM (Evening)",
    notes: "L4-L5 disc protrusion with radiating sciatica pain down left leg.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "app-104",
    tokenNumber: "MAD-087",
    patientName: "Vikas Kumar Singh",
    phone: "+91 70041 98210",
    service: "24x7 Emergency Trauma",
    doctor: "Dr. Vinod Kumar",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "01:00 PM (OPD)",
    notes: "Post-fall wrist Colles fracture; needs checkup and plaster review.",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(true);
  const [closedNotice, setClosedNotice] = useState<string>(
    "Online OPD appointments are temporarily closed. Dr. Vinod Kumar is currently in emergency OT surgery. For 24x7 Emergency Trauma care, call directly at +91 70048 03925."
  );
  const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
  const [doctorSchedule, setDoctorSchedule] = useState<DoctorSchedule>(DEFAULT_SCHEDULE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedApps = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (storedApps) {
        setAppointments(JSON.parse(storedApps));
      } else {
        setAppointments(INITIAL_DEMO_APPOINTMENTS);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_DEMO_APPOINTMENTS));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (typeof parsed.isOpen === "boolean") setIsBookingOpen(parsed.isOpen);
        if (parsed.notice) setClosedNotice(parsed.notice);
      }

      const storedSlots = localStorage.getItem(STORAGE_KEYS.SLOTS);
      if (storedSlots) {
        setDisabledSlots(JSON.parse(storedSlots));
      }

      const storedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      if (storedSchedule) {
        setDoctorSchedule(JSON.parse(storedSchedule));
      }
    } catch (e) {
      console.error("Error loading booking store:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen to window custom storage events to keep multi-tab state in sync
  useEffect(() => {
    const handleSync = () => {
      try {
        const storedApps = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        if (storedApps) setAppointments(JSON.parse(storedApps));

        const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings);
          setIsBookingOpen(parsed.isOpen);
          if (parsed.notice) setClosedNotice(parsed.notice);
        }

        const storedSlots = localStorage.getItem(STORAGE_KEYS.SLOTS);
        if (storedSlots) setDisabledSlots(JSON.parse(storedSlots));
      } catch (err) {
        console.error("Sync error:", err);
      }
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("madvin_sync", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("madvin_sync", handleSync);
    };
  }, []);

  const triggerSync = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("madvin_sync"));
    }
  };

  const addAppointment = (data: {
    patientName: string;
    phone: string;
    email?: string;
    service: string;
    doctor: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }): AppointmentRecord => {
    const nextTokenNum = (appointments.length + 88).toString().padStart(3, "0");
    const newRecord: AppointmentRecord = {
      id: "app-" + Date.now(),
      tokenNumber: `MAD-${nextTokenNum}`,
      patientName: data.patientName,
      phone: data.phone,
      email: data.email || "",
      service: data.service,
      doctor: data.doctor || "Dr. Vinod Kumar",
      date: data.date,
      timeSlot: data.timeSlot,
      notes: data.notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...appointments];
    setAppointments(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      triggerSync();
    }
    return newRecord;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentRecord["status"]) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status } : app
    );
    setAppointments(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      triggerSync();
    }
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((app) => app.id !== id);
    setAppointments(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      triggerSync();
    }
  };

  const toggleBookingSystem = (isOpen: boolean, notice?: string) => {
    setIsBookingOpen(isOpen);
    const newNotice = notice !== undefined ? notice : closedNotice;
    if (notice !== undefined) setClosedNotice(notice);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify({ isOpen, notice: newNotice })
      );
      triggerSync();
    }
  };

  const toggleSlot = (slot: string) => {
    let updated: string[];
    if (disabledSlots.includes(slot)) {
      updated = disabledSlots.filter((s) => s !== slot);
    } else {
      updated = [...disabledSlots, slot];
    }
    setDisabledSlots(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(updated));
      triggerSync();
    }
  };

  const updateDoctorSchedule = (scheduleUpdate: Partial<DoctorSchedule>) => {
    const updated = { ...doctorSchedule, ...scheduleUpdate };
    setDoctorSchedule(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(updated));
      triggerSync();
    }
  };

  const resetToDemoData = () => {
    setAppointments(INITIAL_DEMO_APPOINTMENTS);
    setIsBookingOpen(true);
    setDisabledSlots([]);
    setDoctorSchedule(DEFAULT_SCHEDULE);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_DEMO_APPOINTMENTS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ isOpen: true, notice: closedNotice }));
      localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(DEFAULT_SCHEDULE));
      triggerSync();
    }
  };

  return (
    <BookingContext.Provider
      value={{
        appointments,
        isBookingOpen,
        closedNotice,
        disabledSlots,
        doctorSchedule,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        toggleBookingSystem,
        toggleSlot,
        updateDoctorSchedule,
        resetToDemoData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

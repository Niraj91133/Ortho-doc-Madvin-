"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isBookingOpen: boolean;
  openBooking: (initialService?: string, initialDoctor?: string) => void;
  closeBooking: () => void;
  preselectedService: string;
  preselectedDoctor: string;
}

const ModalContext = createContext<ModalContextType>({
  isBookingOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
  preselectedService: "",
  preselectedDoctor: "",
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [preselectedDoctor, setPreselectedDoctor] = useState("");

  const openBooking = (initialService = "", initialDoctor = "") => {
    setPreselectedService(initialService);
    setPreselectedDoctor(initialDoctor);
    setIsBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        preselectedService,
        preselectedDoctor,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

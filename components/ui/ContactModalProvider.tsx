"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "./ContactModal";

interface ContactModalCtx {
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalCtx>({
  openModal: () => {},
  closeModal: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  );
}

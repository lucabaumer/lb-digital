"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import page from "@/data/page.json";
import { ArrowBtn } from "@/components/ui/ArrowBtn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [open,     setOpen]     = useState(false);
  const lastScrollY = useRef(0);

  // Lenis scroll — hide/show + scrolled state
  useEffect(() => {
    const handleScroll = ({ scroll }: { scroll: number }) => {
      const goingDown = scroll > lastScrollY.current;
      setScrolled(scroll > 40);
      setHidden(goingDown && scroll > 120);
      lastScrollY.current = scroll;
    };

    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      return () => lenis.off("scroll", handleScroll);
    }

    // Fallback: native scroll
    const onNative = () => {
      const scroll = window.scrollY;
      const goingDown = scroll > lastScrollY.current;
      setScrolled(scroll > 40);
      setHidden(goingDown && scroll > 120);
      lastScrollY.current = scroll;
    };
    window.addEventListener("scroll", onNative, { passive: true });
    return () => window.removeEventListener("scroll", onNative);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div className="container-xl">
          <nav
            className="flex items-center justify-between"
            style={{ height: "68px" }}
            aria-label="Hauptnavigation"
          >
            {/* Logo */}
            <Link href="/" aria-label="LB Digital – Startseite" className="flex-shrink-0">
              <Image
                src="/logo.png/Photoroom_20260401_151010.png"
                alt="LB Digital – Webdesign & SEO Agentur Freiburg"
                width={280}
                height={70}
                priority
                quality={90}
                sizes="280px"
                className="h-9 lg:h-14 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>

            {/* Desktop links — data-text hover */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {page.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
                    style={{ display: "block" }}
                  >
                    <span className="nav-link-hover" data-text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <ArrowBtn
                href="#kontakt"
                variant="primary"
                className="hidden lg:inline-flex"
                style={{ padding: "10px 20px", fontSize: "13px", whiteSpace: "nowrap" }}
              >
                {page.nav.cta}
              </ArrowBtn>
              <button
                className="lg:hidden w-9 h-9 flex flex-col justify-center gap-[5px] pl-1"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={open}
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="block h-px w-6 bg-white rounded"
                  style={{ transformOrigin: "center" }}
                />
                <motion.span
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block h-px w-6 bg-white rounded"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="block h-px w-6 bg-white rounded"
                  style={{ transformOrigin: "center" }}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile compact dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent="true"
            className="fixed top-[68px] right-4 z-40 lg:hidden"
            style={{
              background: "rgba(10,22,40,0.97)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              minWidth: "180px",
              overflow: "hidden",
            }}
            role="dialog"
            aria-modal="true"
          >
            <div style={{ padding: "8px" }}>
              {page.nav.links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      transition: "background 0.15s ease, color 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "6px 8px" }} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                style={{ padding: "6px 6px 2px" }}
              >
                <Link
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "#4F46E5",
                    textAlign: "center",
                  }}
                >
                  {page.nav.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

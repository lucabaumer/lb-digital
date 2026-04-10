"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import page from "@/data/page.json";

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
                className="h-16 w-auto"
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
              <Link
                href="#kontakt"
                className="hidden lg:inline-flex btn-primary"
                style={{ padding: "10px 20px", fontSize: "13px" }}
              >
                › {page.nav.cta}
              </Link>
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

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent="true"
            className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center"
            style={{ background: "#0A1628" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="container-xl" style={{ display: "flex", flexDirection: "column" }}>
              {page.nav.links.map((link, i) => (
                <div
                  key={link.href}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
                >
                  <motion.div
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "115%" }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.06,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-bricolage)",
                        fontSize: "clamp(36px, 8vw, 60px)",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        textDecoration: "none",
                        letterSpacing: "-0.03em",
                        padding: "18px 0",
                        lineHeight: 1,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#3B82F6")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.36 }}
                style={{ marginTop: "36px" }}
              >
                <Link
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                  style={{ display: "inline-flex" }}
                >
                  › {page.nav.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

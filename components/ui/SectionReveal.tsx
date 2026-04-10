"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Smaller values = triggers earlier. Default "-10px" */
  margin?: string;
}

/**
 * Wraps a section with a visible entrance: opacity + translateY.
 * Intentionally lightweight — sections have their own internal animations.
 */
export default function SectionReveal({ children, margin = "-10px" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 64 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

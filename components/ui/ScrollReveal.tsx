"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 52 : 0,
      x: direction === "left" ? -52 : direction === "right" ? 52 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.75,
        delay,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

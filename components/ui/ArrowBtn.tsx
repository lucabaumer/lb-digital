"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, ReactNode } from "react";
import { MagneticButton } from "./MagneticButton";

interface ArrowBtnProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost-light" | "ghost-dark";
  type?: "button" | "submit";
  disabled?: boolean;
  style?: React.CSSProperties;
}

function Arrow({ hovered }: { hovered: boolean }) {
  return (
    <motion.span
      animate={{ x: hovered ? 4 : 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 7h12M8 2l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

export function ArrowBtn({
  href,
  onClick,
  children,
  className = "",
  variant = "primary",
  type = "button",
  disabled,
  style,
}: ArrowBtnProps) {
  const [hovered, setHovered] = useState(false);
  const cls = `btn-${variant} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <Arrow hovered={hovered} />
    </>
  );

  if (href) {
    return (
      <MagneticButton>
        <Link
          href={href}
          className={cls}
          style={style}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {inner}
        </Link>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cls}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </button>
    </MagneticButton>
  );
}

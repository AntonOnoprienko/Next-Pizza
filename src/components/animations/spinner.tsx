'use client'

import { motion } from "motion/react";

export const Spinner = () => {
  return (
    <svg
      className="w-12 h-12"
      viewBox="22 22 44 44"
    >
      <motion.circle
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="126"
        strokeDashoffset="100"
        animate={{
          rotate: 360,
          strokeDashoffset: [126, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "easeInOut",
        }}
        transform="rotate(-90 44 44)"
      />
    </svg>
  );
};

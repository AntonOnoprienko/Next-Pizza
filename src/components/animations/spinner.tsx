'use client'

import { motion } from "motion/react";
import React from "react";

interface SpinnerProps {
  size?: 'sm' | 'lg';
  strokeColor?: string;
}

const sizeMap = {
  sm: 20,
  lg: 48,
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'lg',
  strokeColor = "#FF5E00",  // обновлённый цвет
}) => {
  const dimension = sizeMap[size] || sizeMap.lg;

  return (
    <svg
      className="inline-block"
      width={dimension}
      height={dimension}
      viewBox="22 22 44 44"
      role="status"
      aria-label="Loading"
    >
      <motion.circle
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        stroke={strokeColor}
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

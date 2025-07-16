'use client';

import { motion } from 'motion/react';
export const AnimatedSuccessCircle = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 46 46"
    width="40"
    height="40"
    fill="none"
    stroke="#22c55e"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <motion.path
      d="M28 12L17 23l-7-7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
    <motion.circle
      cx="18"
      cy="18"
      r="15"
      stroke="#22c55e"
      strokeWidth="2"
      fill="none"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  </motion.svg>
);

'use client';

import { motion } from 'motion/react';

export const AnimatedSuccessCheck = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="40"
    height="40"
    fill="none"
    stroke="#22c55e"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <motion.path
      d="M20 6L9 17l-5-5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  </motion.svg>
);

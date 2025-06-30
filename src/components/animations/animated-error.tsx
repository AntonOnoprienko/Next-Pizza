'use client';

import { motion } from 'motion/react';
import { X } from 'lucide-react';

export const AnimatedError = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0, rotate: -20 }}
      animate={{
        y: 0,
        opacity: 1,
        rotate: [0, -10, 10, -5, 5, 0],
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-md"
    >
      <X className="text-white w-6 h-6" />
    </motion.div>
  );
};

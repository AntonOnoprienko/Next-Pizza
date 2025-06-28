'use client';

import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DialogOverlay } from '../../ui/dialog';

export const ModalLoader: React.FC = () => {
  return (
    <>
      <DialogOverlay />
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",         
          "pointer-events-none"
        )}
        aria-label="Loading"
        role="status"
      >
        <Loader className="animate-spin text-white" size={64} />
      </div>
    </>
  );
};

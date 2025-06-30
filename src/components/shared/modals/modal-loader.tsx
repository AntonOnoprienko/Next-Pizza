// Only rendered on the server — safe to use in SSR layout files

import { Loader } from 'lucide-react';

export const ModalLoader = () => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center pointer-events-auto"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-2">
        <Loader className="animate-spin text-white" size={64} />
      </div>
    </div>
  );
};

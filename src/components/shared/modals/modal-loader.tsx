//only server component very Important

import { Loader } from "lucide-react";

export const ModalLoader: React.FC = () => {
  return (
    <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center pointer-events-none"
        aria-label="Loading"
        role="status"
      >
        <Loader className="animate-spin text-white" size={64} />
      </div>
  );
};
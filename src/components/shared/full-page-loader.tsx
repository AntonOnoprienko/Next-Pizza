import { Loader } from 'lucide-react';

export const FullPageLoader = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 220px)' }}
    >
      <Loader size={64} className="animate-spin mr-2" />
    </div>
  );
};

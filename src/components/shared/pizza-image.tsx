import React from 'react';
import { cn } from '@/src/lib/utils';
import dynamic from 'next/dynamic';

type Props = {
  publicId: string;
  alt: string;
  size: 20 | 30 | 40;
  className?: string;
};

const sizeMap = {
  20: 300,
  30: 400,
  40: 500,
} as const;

const CldImage = dynamic(() => import('next-cloudinary').then(mod => mod.CldImage), { ssr: false });
export const PizzaImage: React.FC<Props> = ({ publicId, size, alt, className }) => {
  const dimension = sizeMap[size];

  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <CldImage
        src={publicId}
        alt={alt}
        width={dimension}
        height={dimension}
        crop="fill"
        gravity="auto"
        quality="auto"
        format="auto"
        className="relative left-2 top-2 transition-all z-10 duration-300"
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};

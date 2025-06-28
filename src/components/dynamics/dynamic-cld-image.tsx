'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/src/lib/utils';

interface DynamicCldImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  crop?: "auto" | "crop" | "fill" | "fill_pad" | "fit" | "imagga_crop" | "imagga_scale" | "lfill" | "limit" | "lpad" | "mfit" | "mpad" | "pad" | "scale" | "thumb";
  gravity?: string;
  quality?: string | number;
  format?: string;
  loadMode?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackImage?: boolean;
}

export const DynamicCldImage: React.FC<DynamicCldImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
  format = 'auto',
  loadMode = 'lazy',
  priority = false,
  fallbackImage = false,
}) => {
  const DynamicCldImageComponent = dynamic(
    () => import('next-cloudinary').then(mod => mod.CldImage),
    {
      ssr: false,
      loading: () =>
        fallbackImage ? (
          <img
            src="/fallback.svg"
            alt="loading fallback"
            width={width}
            height={height}
            className={cn('object-cover', className)}
          />
        ) : null,
    }
  );

  return (
    <DynamicCldImageComponent
      src={src}
      alt={alt}
      width={width}
      height={height}
      crop={crop}
      gravity={gravity}
      quality={quality}
      format={format}
      loading={loadMode}
      priority={priority}
      className={cn(className, `w-[${width}px] h-[${height}px]`)}
    />
  );
};

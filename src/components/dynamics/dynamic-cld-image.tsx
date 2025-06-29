'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/src/lib/utils';

// Типы
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

// Компонент для fallback изображения
const LoaderFallback: React.FC<{ width: number; height: number }> = React.memo(({ width, height }) => (
  <img
    src="/fallback.svg"
    alt="loading fallback"
    className="object-cover"
    width={width}
    height={height}
    style={{ width, height }}
  />
));

// Кеш для компонентов с fallback
const fallbackComponentCache = new Map<string, React.ComponentType<any>>();

// Фабрика для динамического компонента с fallback
function getDynamicCldImageWithFallback(width: number, height: number) {
  const key = `${width}x${height}`;
  if (!fallbackComponentCache.has(key)) {
    const Component = dynamic(() => import('next-cloudinary').then(mod => mod.CldImage), {
      ssr: false,
      loading: () => <LoaderFallback width={width} height={height} />,
    });
    fallbackComponentCache.set(key, Component);
  }
  return fallbackComponentCache.get(key)!;
}

// Динамический компонент без fallback
const DynamicCldImageWithoutFallback = dynamic(
  () => import('next-cloudinary').then(mod => mod.CldImage),
  { ssr: false, loading: () => null }
);

// Основной компонент
export const DynamicCldImage: React.FC<DynamicCldImageProps> = ({
  fallbackImage = false,
  src,
  alt,
  width,
  height,
  className,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
  format = 'auto',
  loadMode,
  priority = false,
}) => {
  const Component = fallbackImage
    ? getDynamicCldImageWithFallback(width, height)
    : DynamicCldImageWithoutFallback;

  return (
    <Component
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
      className={cn(className)}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

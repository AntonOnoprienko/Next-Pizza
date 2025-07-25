'use client';

import React, { useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { DynamicCldImage } from '../dynamics';

type Props = {
  imageUrl: string;
  alt: string;
  className?: string;
};

export const ResponsiveImage: React.FC<Props> = ({
  imageUrl,
  alt,
  className,
}) => {
  const [initialWidth, setInitialWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    setInitialWidth(window.innerWidth);
  }, []);
  if (!initialWidth) return null;
  const imageSize = initialWidth - 40;
  return (
    <div
      className={cn('relative w-full', className)}
      style={{ aspectRatio: '1/1' }}
    >
      <DynamicCldImage
        src={imageUrl}
        alt={alt}
        width={imageSize}
        height={imageSize}
        crop="fill"
        gravity="auto"
        quality="auto"
        format="auto"
        className={cn(className)}
      />
    </div>
  );
};

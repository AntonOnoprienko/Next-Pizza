'use client';

import React, { useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { DynamicCldImage } from '../dynamics';
import { useWindowSize } from 'react-use';

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
  const { width } = useWindowSize();
  useEffect(() => {
    console.log(width, 'DEVICE WIDTH');
  }, [width]);
  console.log(width);
  return (
    <DynamicCldImage
      src={imageUrl}
      alt={alt}
      width={width}
      height={width}
      crop="fill"
      gravity="auto"
      quality="auto"
      format="auto"
      className={cn(className)}
    />
  );
};

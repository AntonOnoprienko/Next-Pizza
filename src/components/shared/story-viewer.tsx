'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { StoryItem } from '@prisma/client';
import { DynamicCldImage } from '../dynamics';
import Link from 'next/link';
import { Button } from '../ui';
import { Title } from '.';
import { cn } from '@/src/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: StoryItem[];
};
const textColorClasses: Record<string, string> = {
  LIGHT: 'text-white',
  DARK: 'text-black',
  ACCENT: 'text-[FF5E00]',
  MUTED: 'text-grey-400',
};

export const StoryViewer: React.FC<Props> = ({ open, onOpenChange, items }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    console.log(items, 'items viewer');
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev < items.length - 1) return prev + 1;
        onOpenChange(false);
        return prev;
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, open, items.length, onOpenChange, items]);

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= items.length - 1) {
        onOpenChange(false);
        return prev;
      }
      return prev + 1;
    });
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-black max-h-screen overflow-hidden flex items-center justify-center [&>button]:hidden">
        <div className="relative w-full max-w-lg flex flex-col bg-black rounded-lg overflow-hidden">
          {/* Прогресс-бары */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-20">
            {items.map((_, i) => (
              <div
                key={i}
                className="h-1 bg-white/40 rounded flex-1 overflow-hidden"
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>{currentItem.title}</DialogTitle>
                  <DialogDescription>
                    {currentItem.description}
                  </DialogDescription>
                </DialogHeader>
                <div
                  className={`h-full bg-white transition-all duration-[3000ms] ease-linear`}
                  style={{
                    width:
                      i === currentIndex
                        ? '100%'
                        : i < currentIndex
                          ? '100%'
                          : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="relative w-full h-[90vh] flex flex-col justify-between">
            {(currentItem.title || currentItem.description) && (
              <div
                className={cn(
                  'absolute top-[40px] left-0 right-0 z-10 px-4',
                  textColorClasses[currentItem.textColor],
                )}
              >
                {currentItem.title && (
                  <Title
                    size="md"
                    text={currentItem.title}
                    className="text-center"
                  />
                )}
                {currentItem.description && (
                  <p className="text-xl text-center mt-4">
                    {currentItem.description}
                  </p>
                )}
              </div>
            )}
            <DynamicCldImage
              src={currentItem.imageUrl}
              alt={`story-item-${currentItem.id}`}
              width={800}
              height={1200}
              className="w-full h-full object-contain"
              fallbackImage
            />

            {currentItem.linkUrl && (
              <Link href={currentItem.linkUrl}>
                <Button
                  className="absolute bottom-[20px] left-0 right-0 p-4 w-[200px] mx-auto"
                  onClick={() => onOpenChange(false)}
                >
                  {currentItem.buttonText}
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 disabled:opacity-30"
            aria-label="Previous story"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Next story"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

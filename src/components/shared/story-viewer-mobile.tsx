'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { Button } from '@/src/components/ui';
import { DynamicCldImage } from '../dynamics';
import { useSlideSize } from '@/src/hooks';
import { Loader, X } from 'lucide-react';
import { StoryItem } from '@prisma/client';

interface Props {
  items: StoryItem[];
  onClose: () => void;
}

export const StoryViewerMobile: React.FC<Props> = ({ items, onClose }) => {
  const { width, height } = useSlideSize(1, 9 / 16);
  if (!width || !height) {
    return <Loader size={40} className="animate-spin" />;
  }

  if (items.length === 0) return null;

  const renderStory = (item: Props['items'][0]) => (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ width, height }}
    >
      <DynamicCldImage
        src={item.imageUrlMobile}
        alt={`story-${item.id}`}
        width={width}
        height={height}
        fallbackImage
      />
      {(item.title || item.description) && (
        <div className="absolute top-14 left-4 right-4 text-white text-center z-20">
          {item.title && <h2 className="text-xl font-bold">{item.title}</h2>}
          {item.description && (
            <p className="text-lg mt-2">{item.description}</p>
          )}
        </div>
      )}
      {item.linkUrl && (
        <Link href={item.linkUrl}>
          <Button
            onClick={onClose}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            {item.buttonText}
          </Button>
        </Link>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center ">
      {items.length === 1 ? (
        renderStory(items[0])
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex === items.length - 1) {
              setTimeout(() => {
                onClose();
              }, 5000);
            }
          }}
          loop={false}
          className="w-full flex justify-center"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center">
              {renderStory(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-30"
      >
        <X size={32} />
      </button>
    </div>
  );
};

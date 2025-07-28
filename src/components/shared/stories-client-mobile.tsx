'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { cn } from '@/src/lib/utils';
import { Story, StoryItem } from '@prisma/client';
import { DynamicCldImage } from '../dynamics';
import { Container } from './container';
import { StoryViewer } from './story-viewer';
import { useSlideSize } from '@/src/hooks';

export type StoryWithItems = Story & {
  items: StoryItem[];
};

type Props = {
  stories: StoryWithItems[];
  className?: string;
};

export const StoriesClientMobile: React.FC<Props> = ({
  stories,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryWithItems | null>(
    null,
  );
  const { width: slideWidth, height: slideHeight } = useSlideSize(0.75, 2.7);

  const onClickStory = (story: StoryWithItems) => {
    setSelectedStory(story);
    if (story.items.length > 0) setOpen(true);
  };

  return (
    <>
      <Container className={cn('my-6', className)}>
        <Swiper slidesPerView="auto" spaceBetween={16} className="pb-6">
          {stories.map((story, index) => (
            <SwiperSlide key={story.id} style={{ width: `${slideWidth}px` }}>
              <div
                onClick={() => onClickStory(story)}
                className="relative rounded-md overflow-hidden cursor-pointer"
                style={{ height: `${slideHeight}px` }}
              >
                <DynamicCldImage
                  src={story.imageUrlMobile}
                  alt={`preview-${story.id}`}
                  width={slideWidth}
                  height={slideHeight}
                  className="w-full h-full object-cover"
                  quality="auto"
                  format="auto"
                  loadMode={index < 2 ? 'eager' : 'lazy'}
                  priority={index < 2}
                  fetchPriority={index < 2 ? 'high' : 'auto'}
                  fallbackImage
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-bold text-lg leading-none max-w-[110px]">
                  {story.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {open && selectedStory && (
        <StoryViewer
          open={open}
          onOpenChange={setOpen}
          items={selectedStory.items}
        />
      )}
    </>
  );
};

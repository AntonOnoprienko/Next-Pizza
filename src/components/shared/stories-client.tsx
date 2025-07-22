'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Story, StoryItem } from '@prisma/client';
import { DynamicCldImage } from '../dynamics';
import { Container } from './container';
import { StoryViewer } from './story-viewer';

type StoryWithItems = Story & {
  items: StoryItem[];
};

type Props = {
  stories: StoryWithItems[];
  className?: string;
};

export const StoriesClient: React.FC<Props> = ({ className, stories }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] =
    React.useState<StoryWithItems | null>(null);

  const onClickStory = (story: StoryWithItems) => {
    setSelectedStory(story);
    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className,
        )}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => onClickStory(story)}
            className="cursor-pointer relative w-[180px] h-[270px] rounded-md overflow-hidden"
          >
            <DynamicCldImage
              src={story.imageUrl}
              alt={`preview-${story.id}`}
              width={180}
              height={270}
              className="object-cover rounded-md"
              quality="auto"
              format="auto"
              fallbackImage
            />
            <div className="absolute bottom-0 left-0 right-0 text-white text-2xl text-center font-bold p-2">
              {story.title}
            </div>
          </div>
        ))}
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

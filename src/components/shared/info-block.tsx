import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';

interface Props {
  title: string;
  text: string;
  imageUrl: string;
  className?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:gap-12 w-full max-w-[840px] mx-auto',
        className,
      )}
    >
      <div className="flex flex-col text-center md:text-left items-center md:items-start">
        <div className="w-full max-w-md">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg mt-2">{text}</p>
        </div>

        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <Link href="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button
              variant="outline"
              className="text-gray-500 border-gray-400 hover:bg-gray-50 w-full sm:w-auto"
            >
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <div className="w-[260px] h-[260px] md:w-[300px] md:h-[300px] shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

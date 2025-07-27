import { getActiveStories } from '@/src/lib/get-active-stories';
import dynamic from 'next/dynamic';
import { Container } from './container';

const StoriesClient = dynamic(
  () =>
    import('@/src/components/shared/stories-client').then(
      (mod) => mod.StoriesClient,
    ),
  {
    ssr: false,
    loading: () => (
      <Container className="flex items-center justify-between gap-2 my-10">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="w-[180px] h-[270px] bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      </Container>
    ),
  },
);

const StoriesClientMobile = dynamic(
  () =>
    import('@/src/components/shared/stories-client-mobile').then(
      (mod) => mod.StoriesClientMobile,
    ),
  {
    ssr: false,
    loading: () => (
      <Container>
        <div className="overflow-hidden w-full my-6">
          <div className="flex gap-4 animate-scroll-left">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="w-[300px] h-[110px] bg-gray-200 rounded-md animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>
      </Container>
    ),
  },
);

interface Props {
  className?: string;
  isMobile?: boolean;
}

export async function Stories({ isMobile, className }: Props) {
  const stories = await getActiveStories();

  return isMobile ? (
    <StoriesClientMobile stories={stories} className={className} />
  ) : (
    <StoriesClient stories={stories} className={className} />
  );
}

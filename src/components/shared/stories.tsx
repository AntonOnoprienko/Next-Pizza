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

interface Props {
  className?: string;
}

export async function Stories({ className }: Props) {
  const stories = await getActiveStories();

  return <StoriesClient stories={stories} className={className} />;
}

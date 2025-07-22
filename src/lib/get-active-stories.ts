import { prisma } from '@/prisma/prisma-client';

export const getActiveStories = async () => {
  const now = new Date();

  return await prisma.story.findMany({
    where: {
      isActive: true,
      startDate: {
        lte: now,
      },
      endDate: {
        gte: now,
      },
    },
    orderBy: {
      priority: 'desc',
    },
    include: {
      items: true,
    },
  });
};

import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, FullPageLoader } from '@/src/components/shared';
import dynamic from 'next/dynamic';
import { logSizeTracker } from '@/src/lib/log-size-tracker';
import { getCookiesInfo } from '@/src/lib/getCookiesInfo';
import { cn } from '@/src/lib/utils';

type Props = {
  params: {
    id: string;
  };
};

const ChooseProductClientWrapper = dynamic(
  () =>
    import('@/src/components/shared/choose-product-client-wrapper').then(
      (mod) => mod.ChooseProductClientWrapper,
    ),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  },
);

const ProductPage = async ({ params }: Props) => {
  const { isMobile } = getCookiesInfo();
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {
        include: {
          extraIngredients: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  logSizeTracker('ProductPage', product);

  return (
    <Container className={cn(isMobile && 'px-0', 'flex flex-col my-2')}>
      <ChooseProductClientWrapper product={product} isMobile={isMobile} />
    </Container>
  );
};

export default ProductPage;

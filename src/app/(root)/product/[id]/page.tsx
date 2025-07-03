import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Container, FullPageLoader } from '@/src/components/shared';
import dynamic from 'next/dynamic';
import { logSizeTracker } from '@/src/lib/log-size-tracker';

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
    <Container className="flex flex-col my-2">
      <ChooseProductClientWrapper product={product} />
    </Container>
  );
};

export default ProductPage;

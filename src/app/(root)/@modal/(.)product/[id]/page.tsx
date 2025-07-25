import dynamic from 'next/dynamic';
import { prisma } from '@/prisma/prisma-client';
import { ModalLoader } from '@/src/components/shared';
import { notFound } from 'next/navigation';
import { getCookiesInfo } from '@/src/lib/getCookiesInfo';

const ChooseProductModal = dynamic(
  () =>
    import('@/src/components/shared/modals/choose-product-modal').then(
      (mod) => mod.ChooseProductModal,
    ),
  {
    ssr: false,
    loading: () => <ModalLoader />,
  },
);

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { isMobile } = getCookiesInfo();
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
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

  return <ChooseProductModal product={product} isMobile={isMobile} />;
}

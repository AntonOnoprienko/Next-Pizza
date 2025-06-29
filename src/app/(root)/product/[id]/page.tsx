
import React from "react";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container } from "@/src/components/shared";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";
import { logSizeTracker } from "@/src/lib/log-size-tracker";

type Props = {
  params: {
    id: string;
  };
};

const ChooseProductClientWrapper = dynamic(() => import('@/src/components/shared').then(mod => mod.ChooseProductClientWrapper), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 220px)' }}>
    <Loader size={64} className="animate-spin mr-2" />
  </div >
})

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
              ingredient: true
            }
          }
        }
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


import React from "react";
import { cn } from "@/src/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import {
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from "@/src/components/shared";

type Props = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage
          imageUrl={product.imageUrl}
          size={40}
          alt={product.name}
        />
        <div className="w-[490px] bg-[#F7F6F5] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolot. Ea distinctio, laborum perferendis libero
            voluptas, enim sequi fuga
          </p>
          {/* <GroupVariants
            value="2"
            items={[
              {
                name: "Маленькая",
                value: "1",
              },
              {
                name: "Средняя",
                value: "2",
              },
              { 
                name: "Большая",
                value: "3",
                disabled: true
              },
            ]}
            
          /> */}
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;

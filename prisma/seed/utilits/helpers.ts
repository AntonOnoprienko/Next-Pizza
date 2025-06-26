import { Product } from "@prisma/client";

export const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductItem = ({
  productId,
  pizzaType,
  size,
  imageUrl,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  imageUrl?: string;
}) => ({
  productId,
  price: randomDecimalNumber(50, 300),
  pizzaType,
  size,
  imageUrl,
});

type PizzaImageMap = {
  traditional: { [size: number]: string } ;
  thin: { [size: number]: string };
};

export function generatePizzaVariants(product: Product, images: PizzaImageMap) {
  const items = [];

  const traditionalSizes = [20, 30, 40] as const; 
  const thinSizes = [30, 40] as const;            

  for (const size of traditionalSizes) {
    const imageUrl = images.traditional[size];
    if (imageUrl) {
      items.push(
        generateProductItem({
          productId: product.id,
          pizzaType: 1,
          size,
          imageUrl,
        })
      );
    }
  }

  for (const size of thinSizes) {
    const imageUrl = images.thin[size];
    if (imageUrl) {
      items.push(
        generateProductItem({
          productId: product.id,
          pizzaType: 2,
          size,
          imageUrl,
        })
      );
    }
  }

  return items;
}

import { Product } from '@prisma/client';

export const categoryMap = {
  1: 'Пиццы',
  2: 'Комбо',
  3: 'Закуски',
  4: 'Коктейли',
  5: 'Кофе',
  6: 'Напитки',
  7: 'Десерты',
};

const pizzaPriceRangesUAH = {
  20: [130, 170],
  30: [300, 360],
  40: [400, 460],
};

const categoriesBasePriceRangeUAH: Record<string, [number, number]> = {
  Пиццы: [0, 0],
  Комбо: [250, 550],
  Закуски: [70, 120],
  Коктейли: [60, 90],
  Кофе: [70, 90],
  Напитки: [30, 90],
  Десерты: [50, 180],
};

function randomDecimalNumber(min: number, max: number, decimals = 0): number {
  const val = Math.random() * (max - min) + min;

  return parseFloat(val.toFixed(decimals));
}

export const generateProductItem = ({
  productId,
  pizzaType,
  size,
  imageUrl,
  category,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  imageUrl?: string;
  category?: string;
}) => {
  let price: number;

  if (category === 'Пиццы' && size) {
    const [min, max] = pizzaPriceRangesUAH[size];

    price = randomDecimalNumber(min, max);
  } else if (category && categoriesBasePriceRangeUAH[category]) {
    const [min, max] = categoriesBasePriceRangeUAH[category];

    price = randomDecimalNumber(min, max);
  } else {
    price = randomDecimalNumber(40, 150);
  }

  const variance = price * 0.05;

  price = price + (Math.random() * variance * 2 - variance);
  price = Math.round(price);

  return {
    productId,
    price,
    pizzaType,
    size,
    imageUrl,
  };
};

type PizzaImageMap = {
  traditional: { [size: number]: string };
  thin: { [size: number]: string };
};

export function generatePizzaVariants(product: Product, images: PizzaImageMap) {
  const items = [];

  const traditionalSizes = [20, 30, 40] as const;
  const thinSizes = [30, 40] as const;

  const sharedPrices: Record<number, number> = {};

  for (const size of traditionalSizes) {
    const imageUrl = images.traditional[size];

    if (!imageUrl) continue;

    const item = generateProductItem({
      productId: product.id,
      pizzaType: 1,
      size,
      imageUrl,
      category: 'Пиццы',
    });

    if (size === 30 || size === 40) {
      sharedPrices[size] = item.price;
    }

    items.push(item);
  }

  // Затем thin с той же ценой
  for (const size of thinSizes) {
    const imageUrl = images.thin[size];

    if (!imageUrl) continue;

    const item = {
      productId: product.id,
      price: sharedPrices[size],
      pizzaType: 2,
      size,
      imageUrl,
    };

    items.push(item);
  }

  return items;
}

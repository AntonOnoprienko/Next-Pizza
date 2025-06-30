import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      cartItems: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            select: {
              id: true,
              price: true,
              size: true,
              pizzaType: true,
              imageUrl: true,
              product: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          cartItemExtraIngredients: {
            include: {
              ingredient: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
          cartItemExcludedIngredients: {
            include: {
              ingredient: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  // 🔁 Обновляем totalPrice каждого cartItem
  await Promise.all(
    userCart.cartItems.map(async (item) => {
      const totalPrice = calcCartItemTotalPrice(item);

      await prisma.cartItem.update({
        where: { id: item.id },
        data: { totalPrice },
      });
    }),
  );

  // 🔢 Считаем totalAmount всей корзины на основе totalPrice
  const totalAmount = userCart.cartItems.reduce(
    (acc, item) => acc + calcCartItemTotalPrice(item),
    0,
  );

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      cartItems: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          quantity: true,
          totalPrice: true,
          productItem: {
            select: {
              id: true,
              price: true,
              size: true,
              pizzaType: true,
              imageUrl: true,
              product: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          cartItemExtraIngredients: {
            select: {
              ingredient: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
          cartItemExcludedIngredients: {
            select: {
              ingredient: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

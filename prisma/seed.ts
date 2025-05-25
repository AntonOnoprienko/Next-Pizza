import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, _ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  imageUrl,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  imageUrl?: string;
}) => {
  return {
    productId,
    price: randomDecimalNumber(50, 300),
    pizzaType,
    size,
    imageUrl,
  };
};

async function up() {
  await prisma.user.create({
    data: {
      fullName: "User TEST",
      email: "user@gmail.com",
      password: hashSync("111111", 10),
      verified: new Date(),
      role: "USER",
    },
  });
  await prisma.user.create({
    data: {
      fullName: "Admin TEST",
      email: "admin@gmail.com",
      password: hashSync("111111", 10),
      verified: new Date(),
      role: "ADMIN",
    },
  });
  await prisma.ingredient.createMany({
    data: _ingredients,
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/0196361e0a4973709768f45ffcc468de.avif",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d612fc7b7fca5be822752bee1e5.avif",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d612ff49f2c98064fb647c3aa86.avif",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d6130241e75b0ab33725248c0d0.avif",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d61304faf5a98a6958f2bb2d260.avif",
      }),

      // Пицца "Сырная"
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/01963620711970c7bd2e67ffaf21ee79.avif",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d610d2925109ab2e1c92cc5383c.avif",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d610d5dbb14a551b640b90776fc.avif",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d610d91679bb519f38c3f45880f.avif",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d610dbefef68ade96df563888b4.avif",
      }),

      // Пицца "Чоризо фреш"
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/0196361f5a95778db95f1c99c26cbf96.avif",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d61706d472f9a5d71eb94149304.avif",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d61709f9f34a0b85f25ecdb286d.avif",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d6170d5f99c89e91a2b3b91d16e.avif",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "https://media.dodostatic.net/image/r:760x760/11ee7d6171059e7d8d5af72d04721d66.avif",
      }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "123123123",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "111111111",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

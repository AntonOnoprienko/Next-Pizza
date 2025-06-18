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
        "pizza/kt55pnu34dwxvzpqqvcq",
      categoryId: 1,
      ingredients: {
        connect: [{ id: 9 }, { id: 12 }],
      },
      description: "Увеличенная порция моцареллы, фирменный томатный соус, "

    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "pizza/sducpzxocpaorkbnmvia",
      categoryId: 1,
      ingredients: {
        connect: [{ id: 3 },],
      },
      description: "Моцарелла, фирменный соус альфредо, "
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "pizza/crnuppteokh1sggodnik",
      categoryId: 1,
      ingredients: {
        connect: [{id: 10 },{id: 16 },],
      },
      description: "Моцарелла, фирменный томатный соус, "
    },
  });

    const pizza4 = await prisma.product.create({
    data: {
      name: "Аррива!",
      imageUrl:
        "pizza/nemo6xpot1p0bvfcss6y",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(11, 18),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Харьков 1654",
      imageUrl:
        "pizza/vsr7mtsxpsbosxuurcw8",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, 15),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Мясной микс с говядиной и колбасками",
      imageUrl:
        "pizza/wxne07l8sq8a4pioymrw",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(4, 9),
      },
    },
  });


  const productItemsData = [
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/od2r8urunijxigyb1dir",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/kt55pnu34dwxvzpqqvcq",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/qnbnvufd2piuamtrj6mr",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/b5dpfzx91176pcfmjtqk",
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/aofbu3gjsan7msa3e3wi",
      }),

      // Пицца "Сырная"
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/lm1rvjsigcehmkhtying",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/sducpzxocpaorkbnmvia",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/jfm1zb9ofcygoalkemnv",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/bfipqdqngzlfcprhvkcv",
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/dalakbgu6rbkdwped7e8",
      }),

      // Пицца "Чоризо фреш"
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/l4o0fy8femvpman1qv0r",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/crnuppteokh1sggodnik",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/d1gvofdif9vb5s0uhbjp",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/xtom0tlxr4elzpfkisp4",
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/dekitise03wo1mjxrr7z",
      }),


      //Пицца Аррива! 

      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/h1dwlixg2talrwgwhfup",
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/nemo6xpot1p0bvfcss6y",
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/t4svvooon0mq94rquopq",
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/m4z2hrgywfixjobbesbb",
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/eqgfmjzimx3n6usvezve",
      }),

      //Пицца Харьковская

      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/w3uyti46tbagypsurzv1",
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/vsr7mtsxpsbosxuurcw8",
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/rkeezkonura3ko4zbitq",
      }),

      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/skdsgtcytij6gdicw6mr",
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/arowjhjfzmgvdqr8qtpw",
      }),

      //Пицца Мясной микс

      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 20,
        imageUrl: "pizza/aiy0zbzz42jd5xunrgcg",
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 30,
        imageUrl: "pizza/wxne07l8sq8a4pioymrw",
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 40,
        imageUrl: "pizza/pxfguj9gqxp7lv5s221h",
      }),

      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 30,
        imageUrl: "pizza/mmti4kfzprhwiqqxo4qa",
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 40,
        imageUrl: "pizza/jwxe4dacsb59haok5p7y",
      }),
  ]

  const ingredientIds = Array.from({ length: 21 }, (_, i) => i + 1);

    for (const itemData of productItemsData) {
  const createdItem = await prisma.productItem.create({
    data: itemData,
  });

  // Удаляем id = 1, если размер пиццы 20
  const filteredIngredientIds =
    itemData.size === 20
      ? ingredientIds.filter((id) => id !== 1)
      : ingredientIds;

  await prisma.productItemExtraIngredient.createMany({
    data: filteredIngredientIds.map((ingredientId) => ({
      productItemId: createdItem.id,
      ingredientId,
    })),
  });
}

  await prisma.productItem.createMany({
    data: [


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
    cartItemExcludedIngredients: {
      create: [
        { ingredient: { connect: { id: 1 } } },
        { ingredient: { connect: { id: 2 } } },
        { ingredient: { connect: { id: 3 } } },
      ],
    },
    cartItemExtraIngredients: {
      create: [
        { ingredient: { connect: { id: 4 } } },
        { ingredient: { connect: { id: 5 } } },
        { ingredient: { connect: { id: 6 } } },
      ],
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
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItemExtraIngredient" RESTART IDENTITY CASCADE`;
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

import { prisma } from "../../prisma-client";
import { _ingredients } from "./ingredients";


export const seedPizzas = async () => {
  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'pizza/kt55pnu34dwxvzpqqvcq',
      categoryId: 1,
      description: 'Увеличенная порция моцареллы, фирменный томатный соус, ',
      ingredients: {
        connect: [{ id: 9 }, { id: 12 }],
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl: 'pizza/sducpzxocpaorkbnmvia',
      categoryId: 1,
      description: 'Моцарелла, фирменный соус альфредо, ',
      ingredients: {
        connect: [{ id: 3 }],
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: 'pizza/crnuppteokh1sggodnik',
      categoryId: 1,
      description: 'Моцарелла, фирменный томатный соус, ',
      ingredients: {
        connect: [{ id: 10 }, { id: 16 }],
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Аррива!',
      imageUrl: 'pizza/nemo6xpot1p0bvfcss6y',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(11, 18),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Харьков 1654',
      imageUrl: 'pizza/vsr7mtsxpsbosxuurcw8',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, 15),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'Мясной микс с говядиной и колбасками',
      imageUrl: 'pizza/wxne07l8sq8a4pioymrw',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(4, 9),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'Охотничья',
      imageUrl: "pizza/acjxblzhwovyrmljmggu",
      categoryId: 1,
      description: 'Cоус барбекю, моцарелла, фирменный томатный соус, ',
      ingredients: {
        connect: [{ id: 21 }, { id: 12 }, { id: 13 }],
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'Четыре сыра',
      imageUrl: "pizza/ui2li5g6mtywvcuffbtb",
      categoryId: 1,
      description: 'Сыр блю чиз, фирменный соус альфредо ',
      ingredients: {
        connect: [{ id: 2 }, { id: 3 }],
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: 'Креветки блю чиз',
      imageUrl: "pizza/gsdcexuv0lobrbbp2vnp",
      categoryId: 1,
      description: 'Сыр блю чиз, моцарелла, фирменный соус альфредо, ',
      ingredients: {
        connect: [{ id: 20 }],
      },
    },
  });

  return [pizza1, pizza2, pizza3, pizza4, pizza5, pizza6, pizza7, pizza8, pizza9];
};

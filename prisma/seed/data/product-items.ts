import { Product } from "@prisma/client";
import { categoryMap, generatePizzaVariants, generateProductItem } from "../utilits/helpers";

export const seedProductItems = async (pizzas: Product[]) => {
  const [pizza1, pizza2, pizza3, pizza4, pizza5, pizza6, pizza7, pizza8, pizza9] =
    pizzas;

  const productItemsData = [
    ...generatePizzaVariants(pizza1, {
      traditional: {
        20: "pizza/od2r8urunijxigyb1dir",
        30: "pizza/kt55pnu34dwxvzpqqvcq",
        40: "pizza/b5dpfzx91176pcfmjtqk",
      },
      thin: {
        30: "pizza/qnbnvufd2piuamtrj6mr",
        40: "pizza/aofbu3gjsan7msa3e3wi",
      },
    }),
    ...generatePizzaVariants(pizza2, {
      traditional: {
        20: "pizza/lm1rvjsigcehmkhtying",
        30: "pizza/sducpzxocpaorkbnmvia",
        40: "pizza/bfipqdqngzlfcprhvkcv",
      },
      thin: {
        30: "pizza/jfm1zb9ofcygoalkemnv",
        40: "pizza/dalakbgu6rbkdwped7e8",
      },
    }),
    ...generatePizzaVariants(pizza3, {
      traditional: {
        20: "pizza/l4o0fy8femvpman1qv0r",
        30: "pizza/crnuppteokh1sggodnik",
        40: "pizza/xtom0tlxr4elzpfkisp4",
      },
      thin: {
        30: "pizza/d1gvofdif9vb5s0uhbjp",
        40: "pizza/dekitise03wo1mjxrr7z",
      },
    }),
    ...generatePizzaVariants(pizza4, {
      traditional: {
        20: "pizza/h1dwlixg2talrwgwhfup",
        30: "pizza/nemo6xpot1p0bvfcss6y",
        40: "pizza/m4z2hrgywfixjobbesbb",
      },
      thin: {
        30: "pizza/t4svvooon0mq94rquopq",
        40: "pizza/eqgfmjzimx3n6usvezve",
      },
    }),
    ...generatePizzaVariants(pizza5, {
      traditional: {
        20: "pizza/w3uyti46tbagypsurzv1",
        30: "pizza/vsr7mtsxpsbosxuurcw8",
        40: "pizza/rkeezkonura3ko4zbitq",
      },
      thin: {
        30: "pizza/skdsgtcytij6gdicw6mr",
        40: "pizza/arowjhjfzmgvdqr8qtpw",
      },
    }),
    ...generatePizzaVariants(pizza6, {
      traditional: {
        20: "pizza/aiy0zbzz42jd5xunrgcg",
        30: "pizza/wxne07l8sq8a4pioymrw",
        40: "pizza/pxfguj9gqxp7lv5s221h",
      },
      thin: {
        30: "pizza/mmti4kfzprhwiqqxo4qa",
        40: "pizza/jwxe4dacsb59haok5p7y",
      },
    }),
    ...generatePizzaVariants(pizza7, {
      traditional: {
        20: "pizza/yz6fubjeewzbrntidphj",
        30: "pizza/acjxblzhwovyrmljmggu",
        40: "pizza/e3emk1mn9zinlhhwjdt1",
      },
      thin: {
        30: "pizza/vjkkyaxpbua0lgoh3etz",
        40: "pizza/y0qh69kjfv7kvjcj4tao",
      },
    }),

    ...generatePizzaVariants(pizza8, {
      traditional: {
        20: "pizza/aizi5jycj63aqgzapedi",
        30: "pizza/ui2li5g6mtywvcuffbtb",
        40: "pizza/pzli0yczchz1duinjg1z",
      },
      thin: {
        30: "pizza/sjovooxywc5sqq1grz9v",
        40: "pizza/nzpzyweclv2iepqo59tl",
      },
    }),

    ...generatePizzaVariants(pizza9, {
  traditional: {
    20: "pizza/e1ut4ksr5lxaegnh787k",
    30: "pizza/gsdcexuv0lobrbbp2vnp",
    40: "pizza/enea0lutval6tigpeiyy",
  },
  thin: {
    30: "pizza/tvda2rk01m1dolliq0ve",
    40: "pizza/zggaw5c6alk0iezkmepl",
  },
}),

    // Остальные продукты без размеров/типов
  generateProductItem({ productId: 1, category: categoryMap[3] }),
  generateProductItem({ productId: 2, category: categoryMap[3] }),
  generateProductItem({ productId: 3, category: categoryMap[5] }),
  generateProductItem({ productId: 4, category: categoryMap[3] }),
  generateProductItem({ productId: 5, category: categoryMap[3] }),
  generateProductItem({ productId: 6, category: categoryMap[3] }),
  generateProductItem({ productId: 7, category: categoryMap[3] }),
  generateProductItem({ productId: 8, category: categoryMap[3] }),
  generateProductItem({ productId: 9, category: categoryMap[4] }),
  generateProductItem({ productId: 10, category: categoryMap[4] }),
  generateProductItem({ productId: 11, category: categoryMap[4] }),
  generateProductItem({ productId: 12, category: categoryMap[4] }),
  generateProductItem({ productId: 13, category: categoryMap[5] }),
  generateProductItem({ productId: 14, category: categoryMap[5] }),
  generateProductItem({ productId: 15, category: categoryMap[5] }),
  generateProductItem({ productId: 16, category: categoryMap[5] }),
  generateProductItem({ productId: 17, category: categoryMap[5] }),
  generateProductItem({ productId: 18, category: categoryMap[7] }),
  generateProductItem({ productId: 19, category: categoryMap[7] }),
  generateProductItem({ productId: 20, category: categoryMap[7] }),
  generateProductItem({ productId: 21, category: categoryMap[7] }),
  generateProductItem({ productId: 22, category: categoryMap[7] }),
  generateProductItem({ productId: 23, category: categoryMap[7] }),
  generateProductItem({ productId: 24, category: categoryMap[3] }),
  generateProductItem({ productId: 25, category: categoryMap[3] }),
  generateProductItem({ productId: 26, category: categoryMap[4] }),
  generateProductItem({ productId: 27, category: categoryMap[4] }),
  ];

  return productItemsData;
};

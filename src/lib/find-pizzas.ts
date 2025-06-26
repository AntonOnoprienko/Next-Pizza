import { prisma  } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number).filter(n => !isNaN(n));
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number).filter(n => !isNaN(n));
  const ingredientsIdArr = params.ingredients?.split(",").map(Number).filter(n => !isNaN(n));

  const hasPriceFilter = params.priceFrom != null || params.priceTo != null;
  const minPrice = hasPriceFilter ? Number(params.priceFrom) || DEFAULT_MIN_PRICE : undefined;
  const maxPrice = hasPriceFilter ? Number(params.priceTo) || DEFAULT_MAX_PRICE : undefined;

  const orderBy = { id: "asc" as const };

  const productWhere = {
    ...(params.query && {
      name: {
        contains: params.query,
        mode: "insensitive" as const,
      },
    }),
    ...(ingredientsIdArr?.length && {
      ingredients: {
        some: {
          id: {
            in: ingredientsIdArr,
          },
        },
      },
    }),
    ...((sizes?.length || pizzaTypes?.length || hasPriceFilter) ? {
      items: {
        some: {
          ...(sizes?.length && {
            size: { in: sizes },
          }),
          ...(pizzaTypes?.length && {
            pizzaType: { in: pizzaTypes },
          }),
          ...(hasPriceFilter && {
            price: {
              gte: minPrice,
              lte: maxPrice,
            },
          }),
        },
      },
    } : {}),
  };

  const categories = await prisma.category.findMany({
    where: {
      products: {
        some: productWhere,
      },
    },
    include: {
      products: {
        where: productWhere,
        orderBy,
        select: {
          id: true,
          name: true,
          imageUrl: true,
          description: true,
          ingredients: {
            select: {
              id: true,
              name: true,
            },
          },
          items: {
            select: {
              size: true,
              id: true,
              price: true,
              pizzaType: true,
            },
          },
        },
      },
    },
  });

  return categories;
};

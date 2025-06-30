import { Cart, Product, ProductItem, Prisma } from '@prisma/client';

export type ProductItemDTO = ProductItem & {
  product: Product;
};

export type CartItemDTO = Prisma.CartItemGetPayload<{
  include: {
    productItem: {
      select: {
        id: true;
        price: true;
        size: true;
        pizzaType: true;
        imageUrl: true;
        product: {
          select: {
            name: true;
            imageUrl: true;
          };
        };
      };
    };
    cartItemExtraIngredients: {
      include: {
        ingredient: {
          select: {
            name: true;
            price: true;
          };
        };
      };
    };
    cartItemExcludedIngredients: {
      include: {
        ingredient: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}> & {
  totalPrice: number;
};

export interface CartDTO extends Cart {
  cartItems: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  excludedIngredients?: number[];
  extraIngredients?: number[];
}

export interface LightCartItemDTO {
  id: number;
  quantity: number;
  productItem: {
    price: number;
    size?: number | null;
    pizzaType?: number | null;
    imageUrl?: string | null;
    product: {
      name: string;
      imageUrl: string;
    };
  };
  cartItemExtraIngredients: {
    ingredient: {
      name: string;
      price: number;
    };
  }[];
}

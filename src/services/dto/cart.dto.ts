import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
  ProductItemExtraIngredient,
} from "@prisma/client";

export type ProductItemDTO = ProductItem & {
  product: Product;
    extraIngredients: (ProductItemExtraIngredient & {
      ingredient: Ingredient;
    })[];
};


export type CartItemDTO = CartItem & {
  productItem: ProductItemDTO;
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  cartItems: CartItemDTO[];
}

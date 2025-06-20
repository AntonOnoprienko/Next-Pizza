'use client'


import React from "react";
import { cn } from "@/src/lib/utils";
import { DescriptionAndIngredients, GroupVariants, IngredientsList, PizzaImage, Title } from ".";
import { Button } from "../ui";
import { Ingredient } from "@prisma/client";
import { PizzaSize, pizzaTypes, PizzaType } from "@/src/constants/pizza";
import { ProductItemWithExtras } from "@/src/@types/prisma";
import { usePizzaOption } from "@/src/hooks/use-pizza-options";
import { CreateCartItemValues } from "@/src/services/dto/cart.dto";
import { CartItemForToast } from "./modals/choose-product-modal";


type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItemWithExtras[];
  description?: string | null;
  loading?: boolean;
  onSubmit: (cartItem: CartItemForToast ) => void;
  className?: string;
};


export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  description,
  loading,
  onSubmit,
  className,
}) => {

  const {
    size,
    type,
    setSize,
    setType,
    selectedItem,
    selectedImg,
    totalPrice,
    selectedIngredients,
    addIngredient,
    excludedIngredients,
    excludeIngredient,
    availablePizzaSize,
    textDetails,
    filteredIngredients
  } = usePizzaOption(items, imageUrl);




  const handleClickAdd = () => {
    if (selectedItem) {
      const cartItem = {
      productItemId: selectedItem.id,
      excludedIngredients: Array.from(excludedIngredients),
      extraIngredients: filteredIngredients,
      name,                    
      imageUrl: selectedImg || './fallback.svg',    
      price: totalPrice,
    };
    onSubmit(cartItem);

    }
  }

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage publicId={selectedImg} size={size} alt={name} />
      <div className="w-[490px] bg-[rgb(252,252,252)] p-7">

        <Title text={name} size="md" className="font-extrabold mb-1" />

        <DescriptionAndIngredients
          description={description}
          ingredients={ingredients}
          excludedIngredients={excludedIngredients}
          onToggleExclude={excludeIngredient}
          textDetails={textDetails} />

        <GroupVariants
          items={availablePizzaSize}
          value={String(size)}
          onClick={value => setSize(Number(value) as PizzaSize)}
          className="mt-2" />

        <GroupVariants
          items={pizzaTypes}
          value={String(type)}
          onClick={value => setType(Number(value) as PizzaType)}
          className="mt-1" />

        <IngredientsList item={selectedItem}
          addIngredient={addIngredient}
          selectedIngredients={selectedIngredients} />

        <Button disabled={loading} onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          {loading? 'Идёт загрузка' : `Добавить в корзину за ${totalPrice} ₴`}
        </Button>
      </div>
    </div>
  );
};

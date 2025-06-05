'use client'


import React from "react";
import { cn } from "@/src/lib/utils";
import { DescriptionAndIngredients, GroupVariants, IngredientsList, PizzaImage, Title } from ".";
import { Button } from "../ui";
import { Ingredient } from "@prisma/client";
import { PizzaSize, pizzaTypes, PizzaType } from "@/src/constants/pizza";
import { ProductItemWithExtras } from "@/src/@types/prisma";
import { usePizzaOption } from "@/src/hooks/use-pizza-options";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItemWithExtras[];
  description?: string | null;
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
  onClickAddCart?: () => void
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
  onClickAddCart
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
    excludeIngredients,
    excludeIngredient,
    availablePizzaSize,
    textDetails
  } = usePizzaOption(items, imageUrl);



  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      selectedIngredients,
      selectedImg,
      totalPrice,
      selectedItem,
      ingredients
    })
  }

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage publicId={selectedImg} size={size} alt={name} />
      <div className="w-[490px] bg-[rgb(252,252,252)] p-7">

        <Title text={name} size="md" className="font-extrabold mb-1" />
        
        <DescriptionAndIngredients
          description={description}
          ingredients={ingredients}
          excludeIngredients={excludeIngredients}
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

        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};

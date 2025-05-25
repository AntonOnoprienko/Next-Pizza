'use client'


import React from "react";
import { cn } from "@/src/lib/utils";
import { GroupVariants, PizzaImage, Title } from ".";
import { Button } from "../ui";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, pizzaSizes, pizzaTypes, PizzaType } from "@/src/constants/pizza";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
};

const textDetails = "30см , традиционное тесто 30";
const totalPrice = 220;

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  
  const [size, setSize] = React.useState<PizzaSize>(30)
  const [type, setType] = React.useState<PizzaType>(1)
  const selectedImg = items.find(item => item.size === size && item.pizzaType === type)?.imageUrl || imageUrl

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={selectedImg} size={size} alt={name} />
      <div className="w-[490px] bg-[rgb(252,252,252)] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={pizzaSizes} value={String(size)} 
        onClick={value => setSize(Number(value) as PizzaSize )} className="mt-2" />

        <GroupVariants items={pizzaTypes} value={String(type)} 
        onClick={value => setType(Number(value) as PizzaType )} className="mt-1" />

        <div className="grid grid-cols-3 gap-3 mt-2">

        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

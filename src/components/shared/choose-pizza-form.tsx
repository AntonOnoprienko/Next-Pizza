'use client'


import React from "react";
import { cn } from "@/src/lib/utils";
import { GroupVariants, IngredientItem, PizzaImage, Title } from ".";
import { Button } from "../ui";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, pizzaSizes, pizzaTypes, PizzaType, mapPizzaType } from "@/src/constants/pizza";
import { useSet } from "react-use";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
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
  loading,
  onSubmit,
  className,
  onClickAddCart
}) => {

  const [size, setSize] = React.useState<PizzaSize>(30)
  const [type, setType] = React.useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))
  const selectedItem = items.find(item => item.size === size && item.pizzaType === type)
  const selectedImg = selectedItem?.imageUrl || imageUrl;
  const selectedPrice = selectedItem?.price || 180;
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)
  const textDetails = `${size}см , ${mapPizzaType[type]} тесто`;
  const totalPrice = selectedPrice + totalIngredientsPrice;

  const availableSizesSet = new Set(
    items
      .filter(item => item.pizzaType === type)
      .map(item => item.size)
  );

  const availablePizzaSize = pizzaSizes.map(item => ({
    ...item,
    disabled: !availableSizesSet.has(Number(item.value) as PizzaSize),
  }));


  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      selectedIngredients,
      selectedImg,
      totalPrice
    })
  }

  React.useEffect(() => {
    const availableSizes = items
      .filter(item => item.pizzaType === type)
      .map(item => item.size);

    if (!availableSizes.includes(size)) {
      setSize(availableSizes[0] as PizzaSize);
    }
  }, [type, items]);

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={selectedImg} size={size} alt={name} />
      <div className="w-[490px] bg-[rgb(252,252,252)] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={availablePizzaSize} value={String(size)}
          onClick={value => setSize(Number(value) as PizzaSize)} className="mt-2" />

        <GroupVariants items={pizzaTypes} value={String(type)}
          onClick={value => setType(Number(value) as PizzaType)} className="mt-1" />

        <div className="bg-gray-50 px-5 py-3 rounded-md h-[390px] overflow-auto scrollbar mt-2" >
          <div className="grid grid-cols-3 gap-3 mt-2">
            {ingredients.map((ing) => (
              <IngredientItem key={ing.id} name={ing.name}
                imageUrl={ing.imageUrl} price={ing.price} onClick={() => addIngredient(ing.id)}
                active={selectedIngredients.has(ing.id)} />
            ))}
          </div>
        </div>

        <Button onClick={handleClickAdd} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};

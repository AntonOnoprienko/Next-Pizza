import React from "react";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/src/lib/calc-total-pizza-price";
import { PizzaSize, PizzaType, mapPizzaType, pizzaSizes } from "@/src/constants/pizza";
import { ProductItemWithExtras } from "@/src/@types/prisma";

export const usePizzaOption = (
  items: ProductItemWithExtras[],
  imageUrl: string,
) => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>());
  const [excludedIngredients, { toggle: excludeIngredient }] = useSet(new Set<number>());

  const selectedItem = items.find(item => item.size === size && item.pizzaType === type);
  const selectedImg = selectedItem?.imageUrl || imageUrl;
  const selectedPrice = selectedItem?.price || 0;

  const totalPrice = calcTotalPizzaPrice(selectedPrice, selectedItem?.extraIngredients ?? [], selectedIngredients);
  const textDetails = `${size}см , ${mapPizzaType[type]} тесто.`;

  const availableSizesSet = new Set(
    items
      .filter(item => item.pizzaType === type)
      .map(item => item.size)
  );

  const availablePizzaSize = pizzaSizes.map(item => ({
    ...item,
    disabled: !availableSizesSet.has(Number(item.value) as PizzaSize),
  }));

  React.useEffect(() => {
    const availableSizes = items
      .filter(item => item.pizzaType === type)
      .map(item => item.size);

    if (!availableSizes.includes(size)) {
      setSize(availableSizes[0] as PizzaSize);
    }
  }, [type, items]);

  React.useEffect(() => {
  const availableExtras = selectedItem?.extraIngredients.map(e => e.ingredientId) ?? [];

  selectedIngredients.forEach(id => {
    if (!availableExtras.includes(id)) {
      addIngredient(id);
    }
  });
}, [selectedItem]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedItem,
    selectedImg,
    selectedPrice,
    totalPrice,
    selectedIngredients,
    addIngredient,
    excludedIngredients,
    excludeIngredient,
    availablePizzaSize,
    textDetails,
  };
};

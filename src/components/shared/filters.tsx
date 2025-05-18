"use client";
import React from "react";
import { cn } from "@/src/lib/utils";
import { Input } from "../ui";
import { RangeSlider, Title, CheckboxFiltersGroup } from ".";
import { useFilterIngredients } from "@/src/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    ingredients,
    isLoading,
    onAddId,
    selectedIngredients,
  } = useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>([])
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => {
      if (name === "priceFrom") {
        const newPriceFrom = Math.min(value, prev.priceTo);
        return {
          ...prev,
          priceFrom: newPriceFrom,
        };
      }

      if (name === "priceTo") {
        const newPriceTo = Math.max(value, prev.priceFrom);
        return {
          ...prev,
          priceTo: newPriceTo,
        };
      }

      return prev;
    });
  };

  return (
    <div className={cn("", className)}>
      <Title size="sm" className="mb-5 font-bold" text="Фильтрация" />

      <CheckboxFiltersGroup
        title="Тип теста"
        className="mt-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        name="sizes"
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mt-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        onClickCheckbox={toggleSizes}
        selected={sizes}
        name="sizes"
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />

          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrices({ priceFrom, priceTo })
          }
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        items={ingredients}
        loading={isLoading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};

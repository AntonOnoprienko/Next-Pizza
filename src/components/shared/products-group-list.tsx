'use client'

import React, { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { ProductCardWithCart, Title } from ".";
import { useIntersection } from 'react-use'
import { useCategoryStore } from "@/src/store/category";


interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  description: string | null;
  ingredients: { name: string }[];
  items: { price: number, pizzaType: number | null, id: number}[];
}

interface Props {
  title: string;
  items: ProductItem [];
  className?: string;
  categoryId: number;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  categoryId,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  })

  const getMinPrice = (items: { price: number }[]) => {
  return items.reduce((min, item) => (item.price < min ? item.price : min), items[0].price);
};

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, setActiveCategoryId, categoryId])
  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px] items-stretch">
        {items.map((product, i: number) => (
          <ProductCardWithCart
            key={product.id}
            id={product.id}
            productItemId={product.items[0].id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={getMinPrice(product.items)}
            ingredients={product.ingredients}
            description={product.description}
            isPizza={Boolean(product.items[0].pizzaType)}
          />
        ))}
      </div>
    </div>
  );
};

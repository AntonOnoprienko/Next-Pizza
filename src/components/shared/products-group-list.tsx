'use client'

import React, { useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { ProductCard, Title } from ".";
import { useIntersection } from 'react-use'
import { useCategoryStore } from "@/src/store/category";

interface Props {
  title: string;
  items: any;
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
  useEffect(()=>{
    if(intersection?.isIntersecting){
      setActiveCategoryId(categoryId)
    }
  },[intersection?.isIntersecting,setActiveCategoryId,categoryId])
  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px] items-stretch">
        {items.map((product: any, i: number) => (
           <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

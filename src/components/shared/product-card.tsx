'use client'

import React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { ProductCardActions, Title } from ".";
import { DynamicCldImage } from "../dynamics";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  ingredients: { name: string }[] | null;
  isPizza: boolean;
  count?: number;
  inCart: boolean;
  loading?: boolean;
  onAdd?: () => void;
  onQuantityChange?: (type: "plus" | "minus") => void;
  className?: string;
}

const ProductCardComponent: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  ingredients,
  isPizza,
  count,
  loading = false,
  onAdd,
  onQuantityChange,
  inCart,
  className,
}) => {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Link href={`/product/${id}`} className="flex flex-col h-full group">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <DynamicCldImage
            src={imageUrl}
            alt={name}
            width={215}
            height={215}
            crop="fill"
            loading="lazy"
            quality="auto"
            format="auto"
            fallbackImage={true}
            className="transition-transform duration-300 ease-in-out group-hover:translate-y-2"

          />
        </div>

        <Title text={name} size="md" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {description}

          {ingredients?.map((i) => i.name).join(", ")}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4">
          <span className="text-[20px]">
            от <span className="font-bold">{price} ₴</span>
          </span>

          <ProductCardActions
            inCart={inCart}
            count={count}
            isPizza={isPizza}
            loading={loading}
            onAdd={onAdd}
            onQuantityChange={onQuantityChange} />
        </div>
      </Link>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
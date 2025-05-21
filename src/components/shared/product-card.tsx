import React from "react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { Title } from ".";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  count?: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  count,
  imageUrl,
  className,
  ingredients
}) => {
  return (
    <div className={cn('h-full flex flex-col',className)}>
      <Link href={`/product/${id}`} className="flex flex-col h-full">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px] transition-transform duration-300 ease-in-out hover:translate-y-2" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4">
          <span className="text-[20px]">
            от <span className="font-bold">{price} ₴</span>
          </span>
          <Button variant="secondary">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

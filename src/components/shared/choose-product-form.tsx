import React from "react";
import { cn } from "@/src/lib/utils";
import { Title } from ".";
import { Button } from "../ui";
import { Ingredient, ProductItem } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { CreateCartItemValues } from "@/src/services/dto/cart.dto";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (values: CreateCartItemValues ) => void;
  className?: string;
  description: string | null;
};

const textDetails = '30см , традиционное тесто 30';
const totalPrice = 220;

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
  description,

}) => {

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <CldImage
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
        />
      </div>
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">
          {textDetails}
        </p>
        <p>{description}</p>
        <Button onClick={() => onSubmit({
          productItemId: items[0].id,
          excludedIngredients: [],
          extraIngredients: []
        })}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

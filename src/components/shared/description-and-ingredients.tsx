'use client'

import React from "react"
import { Ingredient } from "@prisma/client"
import { ExcludeIngredient } from "."

type Props = {
  description?: string | null;
  textDetails: string;
  ingredients: Ingredient[];
  excludedIngredients: Set<number>;
  onToggleExclude: (id: number) => void;
}

export const DescriptionAndIngredients: React.FC<Props> = ({
  description,
  ingredients,
  excludedIngredients,
  onToggleExclude,
  textDetails
}) => {
  return (
    <div className="text-gray-400">
      <p>{textDetails}</p>
      <div className="flex flex-wrap items-center gap-1 text-black">       
        {ingredients.map((ingredient, idx) => (
          <React.Fragment key={ingredient.id}>
            <ExcludeIngredient
              id={ingredient.id}
              name={ingredient.name}
              callback={onToggleExclude}
              isActive={excludedIngredients.has(ingredient.id)}
            />
            {idx < ingredients.length - 1 && <span>,&nbsp;</span>}
          </React.Fragment>
        ))}
        {description && <span>{description}</span>}
      </div>

    </div>
  )
}

'use client'

import React from "react";
import { Api } from "../services/api-client";
import { useSet } from "react-use";

type IngredientItem = Record<'text' | 'value', string>

interface UseFilterIngredientsResult {
  ingredients: IngredientItem[];
  isLoading: boolean;
  error: Error | null;
  selectedIngredients: Set<string>
  onAddId: (id: string) => void
}

export const useFilterIngredients = (): UseFilterIngredientsResult => {
  const [ingredients, setIngredients] = React.useState<UseFilterIngredientsResult['ingredients']>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const items = await Api.ingredients.getAll();
        setIngredients(
          items.map((ingredient) => ({value: String(ingredient.id), text: ingredient.name}))
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, isLoading, error, selectedIngredients: selectedIds , onAddId: toggle  };
};

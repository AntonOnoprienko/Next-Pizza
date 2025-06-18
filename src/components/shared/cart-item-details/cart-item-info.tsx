import { mapPizzaType, PizzaSize, PizzaType } from "@/src/constants/pizza";
import { cn } from "@/src/lib/utils";

interface Props {
  name: string;
  size?: PizzaSize ;
  type?: PizzaType;
  extraIngredients?: {name: string, price: number}[];
  excludedIngredients?: {name: string}[];
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({
  name,
  size,
  type,
  extraIngredients,
  excludedIngredients,
  className
}) => {
  const typeName = type !== undefined ? mapPizzaType[type] : undefined;

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>

      {size && typeName && (
        <p className="text-xs text-gray-400 mt-1">
          {size}см, {typeName} тесто
        </p>
      )}

      {extraIngredients && extraIngredients.length > 0 && (
        <p className="text-xs text-green-600 mt-1">
          + {extraIngredients.map(i => i.name).join(', ')}
        </p>
      )}

      {excludedIngredients && excludedIngredients.length > 0 && (
        <p className="text-xs text-red-500 mt-1">
          – {excludedIngredients.map(i => i.name).join(', ')}
        </p>
      )}
    </div>
  );
};

import { AnimatedError, Spinner, AnimatedSuccessCheck } from '../../animations';

import { CldImage } from 'next-cloudinary';
import { cn } from '@/src/lib/utils';
import { CartItemForToast } from './cart-item-details.types';

type Props = {
  item: CartItemForToast;
  isLoading: boolean;
  success: boolean;
  error?: boolean;
};


export const CartItemToast = ({ item, isLoading, success, error }: Props) => {

  const getTitle = () => {
  if (isLoading) return 'Добавляем...';
  if (error) return 'Ошибка при добавлении';
  if (success) return 'Добавлено в корзину';
  return 'Статус не известен';
}

  return (
    <div
    aria-live="polite"
    className={cn(
      "w-full min-w-[320px] max-w-sm rounded-xl shadow-md border flex items-center gap-4 p-4",
      "dark:border-zinc-800",
      {
        "bg-white border-zinc-200 dark:bg-zinc-900": !error,
        "bg-rose-50 border-rose-300 dark:bg-rose-900 dark:border-rose-700": error,
      }
    )}>

      <div className="flex-shrink-0">
        <CldImage
          src={item.imageUrl}
          alt={item.name}
          width={56}
          height={56}
          className="rounded-md object-cover"
        />
      </div>


      <div className="flex-1">
        <p
          className={cn(
            "text-sm font-semibold",
            {
              "text-gray-900 dark:text-white": isLoading,
              "text-green-600 dark:text-green-400": success,
              "text-rose-600 dark:text-rose-400": error,
            }
          )}
        >
          {getTitle()}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{item.name}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {item.price.toLocaleString('uk-UA', {
            style: 'currency',
            currency: 'UAH',
            minimumFractionDigits: 0,
          })}
        </p>
      </div>


      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : success ? (
          <AnimatedSuccessCheck />
        ) : error ? (
          <AnimatedError />
        ) : null}
      </div>
    </div>
  );
};



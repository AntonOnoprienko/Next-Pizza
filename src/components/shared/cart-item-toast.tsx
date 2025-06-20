import { Spinner } from '../animations';
import { AnimatedSuccessCheck } from '../animations/animated-success-check';
import { CartItemForToast } from './modals/choose-product-modal';
import { CldImage } from 'next-cloudinary';

type Props = {
  item: CartItemForToast;
  isLoading: boolean;
  success: boolean;
};


export const CartItemToast = ({ item, isLoading, success }: Props) => {
  return (
    <div className="w-full min-w-[320px] max-w-sm rounded-xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 p-4">
  {/* Картинка */}
  <div className="flex-shrink-0">
    <CldImage
      src={item.imageUrl}
      alt={item.name}
      width={56}
      height={56}
      className="rounded-md object-cover"
    />
  </div>

  {/* Описание */}
  <div className="flex-1">
    <p className="text-sm font-semibold text-gray-900 dark:text-white">
      {isLoading ? 'Добавляем...' : 'Добавлено в корзину'}
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

  {/* Спиннер / Успех */}
  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
    {isLoading ? <Spinner /> : success ? <AnimatedSuccessCheck /> : null}
  </div>
</div>


  );
};



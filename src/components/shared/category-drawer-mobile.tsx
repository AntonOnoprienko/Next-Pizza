import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/src/components/ui/sheet';
import { cn } from '@/src/lib/utils';
import { getAll } from '@/src/services/categories';
import { useCategoryStore } from '@/src/store';
import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { Title } from '.';

export const CategoryDrawerMobile: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const activeCategory = useCategoryStore((state) => state.activeId);

  React.useEffect(() => {
    const getCat = async () => {
      try {
        const data = await getAll();
        setCategories(data);
      } catch (error) {
        console.log('Ошибка загрузки категорий', error);
      }
    };
    getCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="p-4 bg-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Категории</SheetTitle>
          <SheetDescription className="sr-only">
            Выберите категорию товаров
          </SheetDescription>
        </SheetHeader>

        <Title
          size="lg"
          className="text-lg font-bold mb-4 text-center"
          text="Категории"
          id="category-heading"
        />

        <nav
          aria-labelledby="category-heading"
          className="flex flex-col gap-1 p-1 rounded-2xl bg-gray-50"
        >
          {categories.map(({ name, id }) => (
            <Link
              key={id}
              href={`/#${name}`}
              onClick={() => setOpen(false)}
              aria-current={activeCategory === id ? 'true' : undefined}
              className={cn(
                'flex items-center font-bold h-11 rounded-2xl px-5',
                activeCategory === id &&
                  'bg-white shadow-md shadow-gray-200 text-primary',
              )}
            >
              {name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

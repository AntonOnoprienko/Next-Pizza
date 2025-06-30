'use client';

import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  loading?: boolean;
  selected: Set<string>;
  name: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  onClickCheckbox,
  defaultValue,
  loading,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const defaultItems = items.slice(0, limit);

  const filteredItems = items.filter((item) =>
    item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );
  const list: Item[] = showAll ? filteredItems : defaultItems;

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            aria-label="Фильтрация по ингредиентам"
            placeholder={searchInputPlaceholder}
            value={searchQuery}
            className="bg-gray-50 border-none"
            onChange={onChangeSearchInput}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};

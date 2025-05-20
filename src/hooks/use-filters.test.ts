import { renderHook, act } from '@testing-library/react';
import { useFilters } from './use-filters'; 

// Мокаем useSearchParams из next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from 'next/navigation';

describe('useFilters hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен инициализировать фильтры из searchParams', () => {
    // Мокаем возвращаемое значение useSearchParams как Map
    (useSearchParams as jest.Mock).mockReturnValue(
      new Map([
        ['ingredients', '1,2,3'],
        ['sizes', '10,20'],
        ['pizzaTypes', '5'],
        ['priceFrom', '100'],
        ['priceTo', '500'],
      ])
    );

    const { result } = renderHook(() => useFilters());

    // Проверяем, что стейт инициализирован правильно
    expect(Array.from(result.current.selectedIngredients)).toEqual(['1', '2', '3']);
    expect(Array.from(result.current.sizes)).toEqual(['10', '20']);
    expect(Array.from(result.current.pizzaTypes)).toEqual(['5']);
    expect(result.current.prices.priceFrom).toBe(100);
    expect(result.current.prices.priceTo).toBe(500);
  });

  it('должен обновлять цены', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new Map());

    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPrices('priceFrom', 200);
      result.current.setPrices('priceTo', 400);
    });

    expect(result.current.prices.priceFrom).toBe(200);
    expect(result.current.prices.priceTo).toBe(400);
  });

  it('должен переключать pizzaTypes', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new Map([['pizzaTypes', '1']]));

    const { result } = renderHook(() => useFilters());

    act(() => {
      result.current.setPizzaTypes('2');  // добавляем 2
    });

    expect(Array.from(result.current.pizzaTypes)).toEqual(['1', '2']);

    act(() => {
      result.current.setPizzaTypes('1'); // убираем 1
    });

    expect(Array.from(result.current.pizzaTypes)).toEqual(['2']);
  });
});

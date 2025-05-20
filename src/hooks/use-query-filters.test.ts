import { renderHook } from '@testing-library/react';
import { useQueryFilters } from './use-query-filters'; // путь к твоему хуку
import { useRouter } from 'next/navigation';
import qs from 'qs';

// Мокаем useRouter и qs.stringify
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('qs', () => ({
  stringify: jest.fn(),
}));

describe('useQueryFilters', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (qs.stringify as jest.Mock).mockImplementation((params) => 'mocked=query');
  });

  it('не вызывает router.push при первом рендере', () => {
    const filters = {
      pizzaTypes: new Set(['pepperoni']),
      sizes: new Set(['medium']),
      selectedIngredients: new Set(['cheese']),
      prices: { priceFrom: 10, priceTo: 20 },
    };

    renderHook(() => useQueryFilters(filters));

    expect(pushMock).not.toHaveBeenCalled();
    expect(qs.stringify).not.toHaveBeenCalled();
  });

  it('вызывает router.push при обновлении filters после первого рендера', () => {
    let filters = {
      pizzaTypes: new Set(['pepperoni']),
      sizes: new Set(['medium']),
      selectedIngredients: new Set(['cheese']),
      prices: { priceFrom: 10, priceTo: 20 },
    };

    const { rerender } = renderHook(({ f }) => useQueryFilters(f), {
      initialProps: { f: filters },
    });

    // После первого рендера router.push не вызывается
    expect(pushMock).not.toHaveBeenCalled();

    // Меняем filters, имитируем обновление
    filters = {
      pizzaTypes: new Set(['pepperoni', 'mushrooms']),
      sizes: new Set(['medium']),
      selectedIngredients: new Set(['cheese']),
      prices: { priceFrom: 15, priceTo: 25 },
    };

    rerender({ f: filters });

    expect(qs.stringify).toHaveBeenCalledWith(
      {
        priceFrom: 15,
        priceTo: 25,
        pizzaTypes: ['pepperoni', 'mushrooms'],
        sizes: ['medium'],
        ingredients: ['cheese'],
      },
      { arrayFormat: 'comma' },
    );

    expect(pushMock).toHaveBeenCalledWith('?mocked=query', { scroll: false });
  });
});

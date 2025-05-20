import { renderHook, waitFor } from '@testing-library/react';
import { useIngredients } from './use-ingredients'; // скорректируй путь
import { Api } from '@/src/services/api-client';

jest.mock('@/src/services/api-client');

describe('useIngredients', () => {
  const mockGetAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    Api.ingredients = {
      getAll: mockGetAll,
    };
  });

  it('должен правильно загружать ингредиенты и переключать loading', async () => {
    const fakeIngredients = [
      { id: 1, name: 'Tomato', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Cheese', createdAt: new Date(), updatedAt: new Date() },
    ];

    mockGetAll.mockResolvedValueOnce(fakeIngredients);

    const { result } = renderHook(() => useIngredients());

    // loading должен быть true при старте
    expect(result.current.loading).toBe(true);
    expect(result.current.ingredients).toEqual([]);

    // Ждем, пока loading станет false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetAll).toHaveBeenCalledTimes(1);
    expect(result.current.ingredients).toEqual(fakeIngredients);
  });

  it('должен переключать loading в false при ошибке', async () => {
    mockGetAll.mockRejectedValueOnce(new Error('Fetch error'));

    const { result } = renderHook(() => useIngredients());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.ingredients).toEqual([]);
  });
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useFilterIngredients } from './useFilterIngredients';
import { Api } from '../services/api-client';

jest.mock('../services/api-client');

const mockedGetAll = Api.ingredients.getAll as jest.MockedFunction<typeof Api.ingredients.getAll>;

function TestComponent() {
  const { ingredients, isLoading, error, selectedIngredients, onAddId } = useFilterIngredients();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing.value}>
            <button
              data-testid={`ingredient-${ing.value}`}
              onClick={() => onAddId(ing.value)}
            >
              {ing.text}
            </button>
          </li>
        ))}
      </ul>
      <div data-testid="selected-count">{selectedIngredients.size}</div>
    </div>
  );
}

describe('useFilterIngredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockIngredients = [
    {
      id: 1,
      name: 'Cheese',
      price: 10,
      imageUrl: 'url-to-image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Tomato',
      price: 5,
      imageUrl: 'url-to-image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('loads and displays ingredients', async () => {
    mockedGetAll.mockResolvedValue(mockIngredients);

    render(<TestComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByTestId('selected-count')).toHaveTextContent('0');
  });

  it('handles error', async () => {
    mockedGetAll.mockRejectedValue(new Error('Failed to fetch'));

    render(<TestComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it('toggles selected ingredient ids', async () => {
    mockedGetAll.mockResolvedValue(mockIngredients);

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const cheeseButton = screen.getByTestId('ingredient-1');
    const selectedCount = screen.getByTestId('selected-count');

    expect(selectedCount).toHaveTextContent('0');

    fireEvent.click(cheeseButton);
    await waitFor(() => expect(selectedCount).toHaveTextContent('1'));

    fireEvent.click(cheeseButton);
    await waitFor(() => expect(selectedCount).toHaveTextContent('0'));
  });

  it('allows multiple ingredients to be selected', async () => {
    mockedGetAll.mockResolvedValue(mockIngredients);

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const cheeseButton = screen.getByTestId('ingredient-1');
    const tomatoButton = screen.getByTestId('ingredient-2');
    const selectedCount = screen.getByTestId('selected-count');

    fireEvent.click(cheeseButton);
    fireEvent.click(tomatoButton);

    await waitFor(() => {
      expect(selectedCount).toHaveTextContent('2');
    });
  });
});

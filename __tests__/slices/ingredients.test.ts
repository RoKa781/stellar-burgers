import {
  ingredientsSlice,
  initialState as initialIngredientsState,
  fetchIngredients
} from './../../src/services/slices/ingredientsSlice';

describe('Слайс ингредиентов', () => {
  test('Получение ингредиентов, отправка', () => {
    const result = ingredientsSlice.reducer(initialIngredientsState, {
      type: fetchIngredients.pending.type
    });
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('Получение ингредиентов, успешно', () => {
    const testPayload = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];

    const result = ingredientsSlice.reducer(initialIngredientsState, {
      type: fetchIngredients.fulfilled.type,
      payload: testPayload
    });

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(testPayload);
    expect(result.error).toBeNull();
  });

  test('Получение ингредиентов, неудача', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const result = ingredientsSlice.reducer(initialIngredientsState, {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    });

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual([]);
    expect(result.error).toBe(errorMessage);
  });
});

describe('Ингредиенты слайс селекторы', () => {
  test('selectIngredients', () => {
    const state = {
      ingredients: {
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          }
        ],
        isLoading: false,
        error: null
      }
    };

    const ingredients = ingredientsSlice.selectors.selectIngredients(state);
    expect(ingredients).toEqual(state.ingredients.ingredients);
  });

  test('selectIngredientsLoading', () => {
    const state = {
      ingredients: {
        ingredients: [],
        isLoading: true,
        error: null
      }
    };

    const isLoading =
      ingredientsSlice.selectors.selectIngredientsLoading(state);
    expect(isLoading).toBe(true);
  });
});

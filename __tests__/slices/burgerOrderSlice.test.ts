import {
  burgerOrderSlice,
  orderBurger,
  cleanOrderData,
  cleanConstructor,
  initialState as initialOrderBurgerState
} from './../../src/services/slices/burgerOrderSlice';

describe('Слайс заказа бургера', () => {
  test('Получение заказа, отправка', () => {
    const result = burgerOrderSlice.reducer(initialOrderBurgerState, {
      type: orderBurger.pending.type
    });
    expect(result.orderRequest).toBe(true);
  });

  test('Получение заказа, неудача', () => {
    const testPayload = {
      order: {
        _id: '66be1656119d45001b4ffd68',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-08-15T14:53:10.952Z',
        updatedAt: '2024-08-15T14:53:11.477Z',
        number: 49767,
        ingredients: ['1', '2', '3']
      }
    };

    const result = burgerOrderSlice.reducer(initialOrderBurgerState, {
      type: orderBurger.fulfilled.type,
      payload: testPayload
    });

    expect(result.ingredients).toEqual(testPayload.order.ingredients);
    expect(result.orderData).toEqual(testPayload.order);
    expect(result.orderRequest).toBe(false);
  });

  test('Отчистка', () => {
    const testState = {
      ingredients: ['1', '2', '3'],
      orderData: {
        _id: '66be1656119d45001b4ffd68',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-08-15T14:53:10.952Z',
        updatedAt: '2024-08-15T14:53:11.477Z',
        number: 49767,
        ingredients: ['1', '2', '3']
      },
      orderRequest: true
    };

    const result = burgerOrderSlice.reducer(testState, cleanOrderData());

    expect(result.orderData).toBeNull();
  });

  test('отчитска конструктора', () => {
    const testState = {
      ingredients: ['1', '2', '3'],
      orderData: null,
      orderRequest: false
    };

    const result = burgerOrderSlice.reducer(testState, cleanConstructor());

    expect(result.ingredients).toEqual([]);
  });
});

describe('Селекторы заказа бургера', () => {
  test('selectOrderData', () => {
    const state = {
      orderBurger: {
        ingredients: ['1', '2', '3'],
        orderData: {
          _id: '66be1656119d45001b4ffd68',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-15T14:53:10.952Z',
          updatedAt: '2024-08-15T14:53:11.477Z',
          number: 49767,
          ingredients: ['1', '2', '3']
        },
        orderRequest: false
      }
    };

    const orderData = burgerOrderSlice.selectors.selectOrderData(state);
    expect(orderData).toEqual(state.orderBurger.orderData);
  });

  test('selectIngredients', () => {
    const state = {
      orderBurger: {
        ingredients: ['1', '2', '3'],
        orderData: null,
        orderRequest: false
      }
    };

    const ingredients = burgerOrderSlice.selectors.selectIngredients(state);
    expect(ingredients).toEqual(state.orderBurger.ingredients);
  });

  test('selectOrderRequest', () => {
    const state = {
      orderBurger: {
        ingredients: ['1', '2', '3'],
        orderData: null,
        orderRequest: true
      }
    };

    const orderRequest = burgerOrderSlice.selectors.selectOrderRequest(state);
    expect(orderRequest).toBe(true);
  });
});

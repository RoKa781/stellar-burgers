import {
  orderReducer,
  initialState as initialOrderState,
  gerOrderByNumber,
  orderSlice
} from './../../src/services/slices/orderSlice';

describe('Слайс ордера', () => {
  test('Получения ордера по номеру, отправка', () => {
    const result = orderReducer(initialOrderState, {
      type: gerOrderByNumber.pending.type
    });
    expect(result.isLoading).toBe(true);
  });
  test('Получения ордера по номеру, успешно', () => {
    const testPayload = {
      orders: [
        {
          _id: '66be1656119d45001b4ffd68',
          owner: '658b0f2887899c001b8259e2',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-15T14:53:10.952Z',
          updatedAt: '2024-08-15T14:53:11.477Z',
          number: 49767,
          __v: 0,
          ingredients: ['1', '2', '3']
        }
      ]
    };
    const result = orderReducer(initialOrderState, {
      type: gerOrderByNumber.fulfilled.type,
      payload: testPayload
    });

    const { orderData, isLoading } = result;

    expect(isLoading).toBe(false);
    expect(orderData).toEqual(testPayload.orders[0]);
  });
});

describe('Селекторы слайс ордера', () => {
  test('selectOrder', () => {
    const state = {
      order: {
        ...initialOrderState,
        orderData: {
          _id: '66be1656119d45001b4ffd68',
          owner: '658b0f2887899c001b8259e2',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-15T14:53:10.952Z',
          updatedAt: '2024-08-15T14:53:11.477Z',
          number: 49767,
          __v: 0,
          ingredients: ['1', '2', '3']
        }
      }
    };

    const orderData = orderSlice.selectors.selectOrder(state);
    expect(orderData).toEqual(state.order.orderData);
  });

  test('selectIsLoading', () => {
    const state = {
      order: {
        ...initialOrderState,
        isLoading: true
      }
    };

    const isLoading = orderSlice.selectors.selectIsLoading(state);
    expect(isLoading).toBe(true);
  });
});

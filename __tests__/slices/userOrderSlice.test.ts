import {
  userOrdersReducer,
  initialState as initialUserOrdersState,
  getUserOrders
} from './../../src/services/slices/userOrdersSlice';

describe('Слайс userOrder', () => {
  test('Получение юзера', () => {
    const testPayload = {
      userOrders: [
        {
          _id: '66b538ae119d45001b4fe92e',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-08T21:29:18.589Z',
          updatedAt: '2024-08-08T21:29:19.035Z',
          number: 48923,
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ]
        }
      ]
    };
    const result = userOrdersReducer(initialUserOrdersState, {
      type: getUserOrders.fulfilled.type,
      payload: testPayload.userOrders
    });
    expect(result.userOrders).toEqual(testPayload.userOrders);
  });
});

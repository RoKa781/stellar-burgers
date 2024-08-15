import {
  feedReducer,
  initialState as initialFeedState,
  getFeed,
  clearFeed,
  feedSlice
} from './../../src/services/slices/feedSlice';

describe('Слайс feed', () => {
  test('Получение ленты, отправка', () => {
    const result = feedReducer(initialFeedState, {
      type: getFeed.pending.type
    });
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test('Получение ленты, успешно', () => {
    const testPayload = {
      orders: [
        {
          _id: '66be1656119d45001b4ffd68',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-15T14:53:10.952Z',
          updatedAt: '2024-08-15T14:53:11.477Z',
          number: 49767,
          ingredients: ['1', '2', '3']
        }
      ],
      total: 49393,
      totalToday: 140
    };

    const result = feedReducer(initialFeedState, {
      type: getFeed.fulfilled.type,
      payload: testPayload
    });

    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(testPayload.orders);
    expect(result.total).toBe(testPayload.total);
    expect(result.totalToday).toBe(testPayload.totalToday);
    expect(result.error).toBeUndefined();
  });

  test('Получение ленты, неудача', () => {
    const errorMessage = 'Failed to fetch feed';
    const result = feedReducer(initialFeedState, {
      type: getFeed.rejected.type,
      payload: errorMessage
    });

    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalToday).toBe(0);
    expect(result.error).toBe(errorMessage);
  });

  test('отчистка', () => {
    const testState = {
      orders: [
        {
          _id: '66be1656119d45001b4ffd68',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-08-15T14:53:10.952Z',
          updatedAt: '2024-08-15T14:53:11.477Z',
          number: 49767,
          ingredients: ['1', '2', '3']
        }
      ],
      isLoading: true,
      total: 49393,
      totalToday: 140,
      error: 'Some error'
    };

    const result = feedReducer(testState, clearFeed());

    expect(result).toEqual(initialFeedState);
  });
});

describe('Лента селекторы', () => {
  test('selectOrders', () => {
    const state = {
      feed: {
        orders: [
          {
            _id: '66be1656119d45001b4ffd68',
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-08-15T14:53:10.952Z',
            updatedAt: '2024-08-15T14:53:11.477Z',
            number: 49767,
            ingredients: ['1', '2', '3']
          }
        ],
        isLoading: false,
        total: 49393,
        totalToday: 140,
        error: undefined
      }
    };

    const orders = feedSlice.selectors.selectOrders(state);
    expect(orders).toEqual(state.feed.orders);
  });

  test('selectTotal', () => {
    const state = {
      feed: {
        orders: [],
        isLoading: false,
        total: 49393,
        totalToday: 140,
        error: undefined
      }
    };

    const total = feedSlice.selectors.selectTotal(state);
    expect(total).toBe(state.feed.total);
  });

  test('selectTotalToday', () => {
    const state = {
      feed: {
        orders: [],
        isLoading: false,
        total: 49393,
        totalToday: 140,
        error: undefined
      }
    };

    const totalToday = feedSlice.selectors.selectTotalToday(state);
    expect(totalToday).toBe(state.feed.totalToday);
  });

  test('selectData', () => {
    const state = {
      feed: {
        orders: [
          {
            _id: '66be1656119d45001b4ffd68',
            status: 'done',
            name: 'Флюоресцентный люминесцентный бургер',
            createdAt: '2024-08-15T14:53:10.952Z',
            updatedAt: '2024-08-15T14:53:11.477Z',
            number: 49767,
            ingredients: ['1', '2', '3']
          }
        ],
        isLoading: false,
        total: 49393,
        totalToday: 140,
        error: undefined
      }
    };

    const data = feedSlice.selectors.selectData(state);
    expect(data).toEqual(state.feed);
  });

  test('selectFeedIsLoading', () => {
    const state = {
      feed: {
        orders: [],
        isLoading: true,
        total: 49393,
        totalToday: 140,
        error: undefined
      }
    };

    const isLoading = feedSlice.selectors.selectFeedIsLoading(state);
    expect(isLoading).toBe(true);
  });

  test('selectFeedError', () => {
    const state = {
      feed: {
        orders: [],
        isLoading: false,
        total: 49393,
        totalToday: 140,
        error: 'Some error'
      }
    };

    const error = feedSlice.selectors.selectFeedError(state);
    expect(error).toBe(state.feed.error);
  });
});

import { burgerConstructorSlice } from '../src/services/slices/burgerConstructorSlice';
import { burgerOrderSlice } from '../src/services/slices/burgerOrderSlice';
import { userOrdersSlice } from '../src/services/slices/userOrdersSlice';
import { orderSlice } from '../src/services/slices/orderSlice';
import { feedSlice } from '../src/services/slices/feedSlice';
import { userSlice } from '../src/services/slices/userSlice';
import { ingredientsSlice } from '../src/services/slices/ingredientsSlice';
import rootReducer from '../src/services/rootReducer';

describe('Проверяем правильную инициализацию rootReducer', () => {
  test('Иницилизация с корректным стейтом', () => {
    const expectedState = {
      [ingredientsSlice.name]: ingredientsSlice.reducer(undefined, {
        type: '@@INIT'
      }),
      [userSlice.name]: userSlice.reducer(undefined, { type: '@@INIT' }),
      [feedSlice.name]: feedSlice.reducer(undefined, { type: '@@INIT' }),
      [orderSlice.name]: orderSlice.reducer(undefined, { type: '@@INIT' }),
      [userOrdersSlice.name]: userOrdersSlice.reducer(undefined, {
        type: '@@INIT'
      }),
      [burgerOrderSlice.name]: burgerOrderSlice.reducer(undefined, {
        type: '@@INIT'
      }),
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(undefined, {
        type: '@@INIT'
      })
    };

    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(expectedState);
  });
});

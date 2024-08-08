import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { userSlice } from './slices/userSlice';
import { feedSlice } from './slices/feedSlice';
import { orderSlice } from './slices/orderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import { burgerOrderSlice } from './slices/burgerOrderSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer,
  [burgerOrderSlice.name]: burgerOrderSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer
});

export default rootReducer;

import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TState = {
  ingredients: string[];
  orderData: null | TOrder;
  orderRequest: boolean;
};

export const initialState: TState = {
  ingredients: [],
  orderData: null,
  orderRequest: false
};

export const orderBurger = createAsyncThunk(
  'order/burger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const burgerOrderSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    cleanOrderData: (state) => {
      state.orderData = null;
    },
    cleanConstructor: (state) => {
      state.ingredients = [];
    }
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectIngredients: (state) => state.ingredients,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.ingredients = action.payload.order.ingredients;
        state.orderData = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const orderBurgerReducer = burgerOrderSlice.reducer;
export const { selectOrderData, selectIngredients, selectOrderRequest } =
  burgerOrderSlice.selectors;
export const { cleanOrderData, cleanConstructor } = burgerOrderSlice.actions;

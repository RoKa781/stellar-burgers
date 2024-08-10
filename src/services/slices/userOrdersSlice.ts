import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrderState = {
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TUserOrderState = {
  userOrders: [],
  isLoading: false,
  error: undefined
};

export const getUserOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: { clearUserOrders: () => initialState },
  selectors: {
    selectUserOrders: (state) => state.userOrders,
    selectUserOrdersIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearUserOrders } = userOrdersSlice.actions;
export const { selectUserOrders, selectUserOrdersIsLoading } =
  userOrdersSlice.selectors;
export const userOrdersReducer = userOrdersSlice.reducer;

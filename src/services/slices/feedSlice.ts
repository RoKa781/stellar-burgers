import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  isLoading: false,
  error: undefined,
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectData: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedReducer = feedSlice.reducer;
export const { selectOrders, selectTotal, selectTotalToday, selectData } =
  feedSlice.selectors;
export const { clearFeed } = feedSlice.actions;

import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
  total: number;
  totalToday: number;
};

export const initialState: TFeedState = {
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
    selectData: (state) => state,
    selectFeedIsLoading: (state) => state.isLoading,
    selectFeedError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectData,
  selectFeedIsLoading,
  selectFeedError
} = feedSlice.selectors;
export const { clearFeed } = feedSlice.actions;

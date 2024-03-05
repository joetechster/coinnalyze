import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {TickerOfficial} from '../__generated__/graphql';
import {client} from '../..';
import {SYMBOLS_QUERY} from '../globals';

// Define the initial state using that type
const initialState: {
  tickers: TickerOfficial[];
  updateState: 'idle' | 'pending';
} = {
  tickers: [],
  updateState: 'idle',
};

export const updateFavouritesWithString = createAsyncThunk(
  'favourites/addWithString',
  async (symbol: string, thunkAPI) => {
    const favourites = (<RootState>thunkAPI.getState()).favourites.tickers.map(
      ticker => ticker.symbol!,
    );
    if (favourites.includes(symbol)) return null;
    const ticker = (
      await client.query({
        query: SYMBOLS_QUERY,
        variables: {symbols: [symbol]},
      })
    ).data.symbols[0];
    return ticker;
  },
);

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFavourites: (state, action: PayloadAction<TickerOfficial[]>) => {
      state.tickers = action.payload;
      storage.save({key: 'favourites', data: state.tickers});
    },
  },
  extraReducers: builder => {
    builder.addCase(updateFavouritesWithString.fulfilled, (state, action) => {
      state.updateState = 'idle';
      if (action.payload) {
        state.tickers.unshift(action.payload);
        storage.save({key: 'favourites', data: state.tickers});
      }
    });
    builder.addCase(updateFavouritesWithString.pending, (state, action) => {
      state.updateState = 'pending';
    });
  },
});

export const {updateFavourites} = favouritesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFavourites = (state: RootState) => {
  return state.favourites.tickers;
};
export const selectFavouritesPreview = createSelector(
  selectFavourites,
  favourites => favourites.slice(0, 5),
);
export const selectFavouritesUpdateState = (state: RootState) =>
  state.favourites.updateState;

export default favouritesSlice.reducer;

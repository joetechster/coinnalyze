import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {Ticker, TickerOfficial} from '../__generated__/graphql';

// Define the initial state using that type
const initialState: TickerOfficial[] = [];

export const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSymbols: (state, action: PayloadAction<TickerOfficial[]>) => {
      state = action.payload;
      storage.save({key: 'symbols', data: state, expires: 1});
      return state;
    },
  },
});

export const {updateSymbols} = symbolsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectSymbols = (state: RootState) => state.symbols;

export const selectSymbolsPreview = createSelector(selectSymbols, symbols =>
  symbols.slice(0, 5),
);

export default symbolsSlice.reducer;

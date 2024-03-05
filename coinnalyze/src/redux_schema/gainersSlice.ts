import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {TickerOfficial} from '../__generated__/graphql';

// Define the initial state using that type
const initialState: TickerOfficial[] = [];

export const gainersSlice = createSlice({
  name: 'gainers',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateGainers: (state, action: PayloadAction<TickerOfficial[]>) => {
      state = action.payload;
      storage.save({key: 'gainers', data: state, expires: 1});
      return state;
    },
  },
});

export const {updateGainers} = gainersSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectGainers = ({gainers}: RootState) => gainers;

export default gainersSlice.reducer;

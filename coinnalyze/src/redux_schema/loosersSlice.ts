import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {TickerOfficial} from '../__generated__/graphql';

// Define the initial state using that type
const initialState: TickerOfficial[] = [];

export const loosersSlice = createSlice({
  name: 'loosers',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateLoosers: (state, action: PayloadAction<TickerOfficial[]>) => {
      state = action.payload;
      storage.save({key: 'loosers', data: state, expires: 1});
      return state;
    },
  },
});

export const {updateLoosers} = loosersSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectLoosers = ({loosers}: RootState) => loosers;

export default loosersSlice.reducer;

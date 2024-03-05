import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';

// Define the initial state using that type
const initialState: string[] = [];

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateCompare: (
      state,
      action: PayloadAction<{symbol: string; index: number} | string[]>,
    ) => {
      if (Array.isArray(action.payload)) {
        state = action.payload;
      } else {
        state[action.payload.index] = action.payload.symbol;
      }
      storage.save({key: 'compare', data: state, expires: null});
      return state;
    },
  },
});

export const {updateCompare} = compareSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCompare = (state: RootState) => state.compare;

export default compareSlice.reducer;

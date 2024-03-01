import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';

// Define the initial state using that type
const initialState: string[] = [];

export const featuredSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFeatured: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state = action.payload;
      } else {
        state.push(action.payload);
      }
      storage.save({key: 'featured', data: state});
      return state;
    },
  },
});

export const {updateFeatured} = featuredSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFeatured = (state: RootState) => state.featured;

export default featuredSlice.reducer;

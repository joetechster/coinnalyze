import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';

// Define the initial state using that type
const initialState: string[] = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFavourites: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state = action.payload;
      } else {
        state.push(action.payload);
      }
      // Update change in local storage to presist the user's change locally
      storage.save({key: 'favourites', data: state});
      return state;
    },
  },
});

export const {updateFavourites} = favouritesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFavourites = (state: RootState) => state.favourites;

export default favouritesSlice.reducer;

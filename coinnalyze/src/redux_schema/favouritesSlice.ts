import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {TickerOfficial} from '../__generated__/graphql';

// Define the initial state using that type
const initialState: TickerOfficial[] = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFavourites: (state, action: PayloadAction<TickerOfficial[]>) => {
      state = action.payload;
      storage.save({key: 'favourites', data: state, expires: 1});
      return state;
    },
  },
});

export const {updateFavourites} = favouritesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFavourites = (state: RootState) => state.favourites;
export const selectFavouritesPreview = createSelector(
  selectFavourites,
  favoutites => favoutites.slice(0, 5),
);

export default favouritesSlice.reducer;

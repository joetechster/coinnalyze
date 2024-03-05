import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import storage from '../storage';
import {TickerOfficial} from '../__generated__/graphql';

// Define the initial state using that type
const initialState: TickerOfficial[] = [];

export const featuredSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFeatured: (state, action: PayloadAction<TickerOfficial[]>) => {
      state = action.payload;
      storage.save({key: 'featured', data: state, expires: 1});
      return state;
    },
  },
});

export const {updateFeatured} = featuredSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFeatured = (state: RootState) => state.featured;
export const selectFeaturedPreview = createSelector(selectFeatured, featured =>
  featured.slice(0, 5),
);

export default featuredSlice.reducer;

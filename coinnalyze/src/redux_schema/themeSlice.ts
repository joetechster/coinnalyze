import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Theme, themes} from '../globals';
import {Appearance} from 'react-native';

// Define the initial state using that type
const initialState = Appearance.getColorScheme() || (themes.dark as Theme);

export const themeSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: state => (state === themes.dark ? themes.light : themes.dark),
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateTheme: (state, action: PayloadAction<Theme>) => {
      state = action.payload;
    },
  },
});

export const {toggleTheme, updateTheme} = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;

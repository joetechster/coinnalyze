import { createSlice } from "@reduxjs/toolkit";
import { ThemeKeys } from "@styles/themes";

const themeSlice = createSlice({
    name: "theme",
    initialState: ThemeKeys.Dark,
    reducers: {
        toggleTheme: (state) => {
            return state === ThemeKeys.Dark ? ThemeKeys.Light : ThemeKeys.Dark;
        },
    },
});

export const selectTheme = (state: { theme: ThemeKeys }) => {
    return state.theme as ThemeKeys;
};
export const { toggleTheme } = themeSlice.actions;
export default themeSlice;

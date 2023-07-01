import { createSlice, configureStore } from "@reduxjs/toolkit";
import { GlobalState } from "./state";
import { ThemeKeys } from "@styles/themes";

export const baseSlice = createSlice({
    name: "Base Reducer",
    initialState: GlobalState,
    reducers: {
        updataName: (state) => {
            state.user.name = Math.random().toString();
        },
        toggleTheme: (state) => {
            state.theme = state.theme === ThemeKeys.Dark ? ThemeKeys.Light : ThemeKeys.Dark;
        },
    },
});

export const store = configureStore({
    reducer: baseSlice.reducer,
});

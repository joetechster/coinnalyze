import { createSlice } from "@reduxjs/toolkit";
import { SharedValue } from "react-native-reanimated";

const initialState: { width: number; translateX: SharedValue<number> | null } = {
    width: 50,
    translateX: null,
};
const bottomTabSlice = createSlice({
    name: "bottomTab",
    initialState,
    reducers: {
        init: (state, action) => {
            state.translateX = action.payload.translateX;
        },
        updateActiveCase: (state, action) => {
            if (state.translateX) state.translateX.value = action.payload.translateX;
        },
    },
});

export const selectTranslateX = (state: { bottomTab: typeof initialState }) => {
    return state.bottomTab.translateX;
};
export const selectWidth = (state: { bottomTab: typeof initialState }) => {
    return state.bottomTab.width;
};

export const { init, updateActiveCase } = bottomTabSlice.actions;
export default bottomTabSlice;

import { configureStore } from "@reduxjs/toolkit";
import bottomTabSlice from "./bottomTab/bottomTabSlice";
import themeSlice from "./theme/themeSlice";
import tickerSlice from "./ticker/tickerSlice";

export const store = configureStore({
    reducer: {
        bottomTab: bottomTabSlice.reducer,
        theme: themeSlice.reducer,
        tickers: tickerSlice.reducer,
    },
});

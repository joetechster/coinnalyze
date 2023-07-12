import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Ticker } from "@utils/globals";

type TickerStateType = { [key in string]: Ticker };

const initialState: TickerStateType = {
    Eth: { open: "yes", symbol: "eth" },
    ssEth: { open: "yes", symbol: "sseth" },
    sssEth: { open: "yes", symbol: "sseth" },
    sssEtAh: { open: "yes", symbol: "sseth" },
    ssEath: { open: "yes", symbol: "sseth" },
    ssEtAh: { open: "yes", symbol: "sseth" },
    EtDGFh: { open: "yes", symbol: "eth" },
    ssEtFh: { open: "yes", symbol: "sseth" },
    sssEtFh: { open: "yes", symbol: "sseth" },
    sssEtAFDh: { open: "yes", symbol: "sseth" },
    ssEatXBh: { open: "yes", symbol: "sseth" },
    ssEtAREh: { open: "yes", symbol: "sseth" },
    EtCXh: { open: "yes", symbol: "eth" },
    ssEtCXh: { open: "yes", symbol: "sseth" },
    sssEthX: { open: "yes", symbol: "sseth" },
    sssEtAXh: { open: "yes", symbol: "sseth" },
    ssEatXh: { open: "yes", symbol: "sseth" },
    ssEtASh: { open: "yes", symbol: "sseth" },
};
const tickerSlice = createSlice({
    name: "tickers",
    initialState,
    reducers: {
        updateTickers: (state, { payload }) => {
            (payload.tickers as Array<Ticker>).forEach((ticker) => {
                state[ticker.symbol] = ticker;
            });
        },
    },
});

export const selectTickers = createSelector(
    (state: { tickers: TickerStateType }) => state.tickers,
    (tickers) => Object.values(tickers)
);

export default tickerSlice;

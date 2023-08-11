import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Ticker } from "@utils/globals";

type TickerStateType = {
    loading: boolean;
    tickers: {
        [key in string]: Ticker;
    };
};

const initialState: TickerStateType = {
    loading: true,
    tickers: {
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
    },
};

const tickerSlice = createSlice({
    name: "tickers",
    initialState,
    reducers: {
        updateTickers: (state, { payload }) => {
            (payload?.tickers as Array<Ticker>)?.forEach((ticker) => {
                state.tickers[ticker.symbol] = ticker;
            });
        },
        updateTickersLoading: (state, { payload: { loading } }) => {
            state.loading = loading;
        },
    },
});

type PartialStateForTicker = { tickerSlice: TickerStateType };

export const selectTickers = createSelector(
    (state: PartialStateForTicker) => state.tickerSlice.tickers,
    (tickers) => Object.values(tickers)
);

export const selectSymbols = createSelector(
    (state: PartialStateForTicker) => state.tickerSlice.tickers,
    (tickers) => Object.keys(tickers)
);

export const selectTickersLoading = (state: PartialStateForTicker) => state.tickerSlice.loading;

export const { updateTickers, updateTickersLoading } = tickerSlice.actions;
export default tickerSlice;

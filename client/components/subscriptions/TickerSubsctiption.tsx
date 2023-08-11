import { gql, useSubscription } from "@apollo/client";
import { selectSymbols, updateTickers, updateTickersLoading } from "@redux_schema/ticker/tickerSlice";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

const TICKER_SUBSCRIPTION = gql`
    subscription subscribeToTicks($symbols: [String!]!) {
        tickers(symbols: $symbols) {
            symbol
            curDayClose
            prevDayClose
        }
    }
`;

function TickerSubscription() {
    const symbolsWatched = useSelector(selectSymbols); // returns a list of symbols the user cares about
    const { data, loading, error } = useSubscription(TICKER_SUBSCRIPTION, {
        variables: { symbols: symbolsWatched },
        shouldResubscribe: true,
    });
    const dispatch = useDispatch();

    // dispatch action to add new tick to the store
    React.useEffect(() => {
        console.log("still loading tickers: ", loading);
        dispatch(updateTickersLoading({ loading }));
        dispatch(updateTickers(data));
    }, [data, loading, error]);
    return null;
}

export default TickerSubscription;

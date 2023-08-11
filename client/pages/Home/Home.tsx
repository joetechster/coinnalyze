import * as React from "react";
import { View, FlatList } from "react-native";
import HomeStyles from "./HomeStyles";
import useStyles from "@custom_hooks/useStyles";
import TextInput from "@components/TextInput/TextInput";
import SearchIcon from "@assets/icons/search_icon.svg";
import { useSelector } from "react-redux";
import { selectTickers, selectTickersLoading } from "@redux_schema/ticker/tickerSlice";
import Ticker from "./components/ticker/Ticker";
import { screenPaddingHorizontal } from "@styles/global";
import { TickerLoading } from "./components/ticker/Loading";
import LoadingSuspense from "@components/LoadingSuspense";
import TickerSubscription from "@components/subscriptions/TickerSubsctiption";

export default function Home() {
    const styles = useStyles(HomeStyles);
    const tickers = useSelector(selectTickers);
    const loading = useSelector(selectTickersLoading);

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{
                        ...screenPaddingHorizontal,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <TextInput icon={<SearchIcon width={20} height={20} />} />
                </View>
                <LoadingSuspense fallback={<TickerLoading />} loading={loading}>
                    <FlatList
                        data={tickers}
                        renderItem={({ item: ticker, index }) => <Ticker ticker={ticker} index={index} />}
                    />
                </LoadingSuspense>
            </View>
            <TickerSubscription />
        </>
    );
}

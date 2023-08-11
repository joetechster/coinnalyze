import useStyles from "@custom_hooks/useStyles";
import * as React from "react";
import { View } from "react-native";
import { TickerLoadingStyles } from "./TickerStyles";

export function TickerLoading() {
    const styles = useStyles(TickerLoadingStyles);

    const loadingTickers = React.useMemo(() => {
        const tickers: JSX.Element[] = [];
        for (let i = 0; i < 20; i++) {
            tickers.push(
                <View key={i} style={styles.container}>
                    <View style={styles.image} />
                    <View style={styles.nameWrapper}>
                        <View style={styles.name} />
                        <View style={styles.description} />
                    </View>
                    <View style={styles.priceWrapper}>
                        <View style={styles.price}></View>
                        <View style={styles.percentageChange}></View>
                    </View>
                </View>
            );
        }
        return tickers;
    }, []);

    return <View style={{ flex: 1, gap: 10 }}>{loadingTickers}</View>;
}

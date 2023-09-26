import useStyles from "@custom_hooks/useStyles";
import * as React from "react";
import { View } from "react-native";
import { TickerLoadingStyles } from "./TickerStyles";
import { FlatList } from "react-native-gesture-handler";

const TickerLoading = () => {
    const styles = useStyles(TickerLoadingStyles);
    const tickerLoaders: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
        tickerLoaders.push(
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

    return (
        <FlatList
            data={tickerLoaders}
            renderItem={({ item }) => item}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
    );
};

export default React.memo(TickerLoading);

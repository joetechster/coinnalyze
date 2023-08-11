import * as React from "react";
import useStyles from "@custom_hooks/useStyles";
import { Ticker as TickerType } from "@utils/globals";
import { Text, View } from "react-native";
import TickerStyles from "./TickerStyles";
import Events from "@assets/bottomTab/Events";
import RippleTouchable from "@components/RippleTouchable";

interface TickerProps {
    ticker: TickerType;
    index?: number;
}

function Ticker({ ticker }: TickerProps) {
    const styles = useStyles(TickerStyles);

    return (
        <RippleTouchable>
            <View style={styles.container}>
                <View style={styles.image}>
                    <Events
                        fill={"blue"}
                        stroke={"white"}
                        strokeWidth={1}
                        width={styles.image.width as number}
                        height={styles.image.height as number}
                        focused={false}
                        inActiveCase={false}
                    />
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.name} numberOfLines={1}>
                        {ticker.symbol}
                    </Text>
                    <Text style={styles.description} numberOfLines={1}>
                        Some random description thats too long
                    </Text>
                </View>
                <View style={styles.priceWrapper}>
                    <Text style={styles.price} numberOfLines={1}>
                        4.555
                    </Text>
                    <Text style={styles.percentageChange} numberOfLines={1}>
                        -212 -33%
                    </Text>
                </View>
            </View>
        </RippleTouchable>
    );
}

export default React.memo(Ticker);

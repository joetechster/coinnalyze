import * as React from "react";
import useStyles from "@custom_hooks/useStyles";
import { Ticker as TickerType } from "@utils/globals";
import { Modal, Text, TouchableNativeFeedback, View } from "react-native";
import TickerStyles from "./TickerStyles";
import Events from "@assets/bottomTab/Events";
import RippleTouchable from "@components/RippleTouchable";
import { useState } from "react";
import themes, { ThemeKeys } from "@styles/themes";
import { useSelector } from "react-redux";
import { selectTheme } from "@redux_schema/theme/themeSlice";

interface TickerProps {
    ticker: TickerType;
    index?: number;
}

function Ticker({ ticker }: TickerProps) {
    const styles = useStyles(TickerStyles);

    return (
        <RippleTouchable>
            <View style={styles.container}>
                <Events
                    fill={"blue"}
                    stroke={"white"}
                    strokeWidth={1}
                    width={40}
                    height={40}
                    focused={false}
                    inActiveCase={false}
                />
                <Text
                    style={[
                        styles.text,
                        {
                            alignSelf: "center",
                            fontSize: 20,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        },
                    ]}
                >
                    {ticker.symbol}
                </Text>
                <View style={{ marginLeft: "auto" }}>
                    <Text style={[styles.text, { marginLeft: "auto", fontWeight: "bold", fontSize: 22 }]}>
                        4.555
                    </Text>
                    <Text style={[styles.text, { marginLeft: "auto" }]}>-212 -33%</Text>
                </View>
            </View>
        </RippleTouchable>
    );
}

export default Ticker;

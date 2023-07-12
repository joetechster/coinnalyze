import useStyles from "@custom_hooks/useStyles";
import * as React from "react";
import { View } from "react-native";
import TickerStyles from "./TickerStyles";
import themes from "@styles/themes";
import { selectTheme } from "@redux_schema/theme/themeSlice";
import { useSelector } from "react-redux";
import { screenPaddingHorizontal } from "@styles/global";

export function TickerLoading() {
    const styles = useStyles(TickerStyles);
    const color = themes[useSelector(selectTheme)].drawer.background;

    return (
        <View style={{ flex: 1, gap: 10 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(() => (
                <View style={{ ...screenPaddingHorizontal, flexDirection: "row", gap: 10 }}>
                    <View style={{ width: 50, height: 50, backgroundColor: color, borderRadius: 5 }} />
                    <View style={{ gap: 5, width: "45%" }}>
                        <View
                            style={{
                                height: 20,
                                width: "60%",
                                backgroundColor: color,
                                borderRadius: 5,
                                marginTop: "auto",
                            }}
                        />
                        <View
                            style={{
                                height: 20,
                                width: "80%",
                                backgroundColor: color,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: "auto", gap: 5, flex: 1 }}>
                        <View
                            style={{
                                marginLeft: "auto",
                                height: 22,
                                width: "80%",
                                backgroundColor: color,
                                borderRadius: 5,
                                marginTop: "auto",
                            }}
                        ></View>
                        <View
                            style={{
                                marginLeft: "auto",
                                height: 16,
                                width: "60%",
                                backgroundColor: color,
                                borderRadius: 5,
                            }}
                        ></View>
                    </View>
                </View>
            ))}
        </View>
    );
}

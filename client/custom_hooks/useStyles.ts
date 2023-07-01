import * as React from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeKeys } from "../styles/themes";
import { selectTheme } from "@redux_store/selectors";
import { useSelector } from "react-redux";

export type StyleType = TextStyle | ViewStyle | ImageStyle;

export default function useStyles<T extends StyleSheet.NamedStyles<T>>(
    styleFormatter: (theme: ThemeKeys) => T
) {
    const theme = useSelector(selectTheme);
    return React.useMemo(() => StyleSheet.create(styleFormatter(theme)), [theme]);
}
